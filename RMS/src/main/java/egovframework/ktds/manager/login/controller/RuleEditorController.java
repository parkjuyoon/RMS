package egovframework.ktds.manager.login.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import egovframework.example.sample.web.DroolsMapExample;
import egovframework.ktds.drools.config.DroolsUtil;
import egovframework.ktds.manager.login.service.RuleEditorService;

@RequestMapping("/ruleEditor")
@Controller
public class RuleEditorController {
	
	final static String schema = "rule_editor";
	
	@Resource(name = "ruleEditorService")
	protected RuleEditorService ruleEditorService;
	
	/**
	 * 속성 view 리스트 조회
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/main.do")
	public String main(ModelMap model) {
		List<HashMap<String, Object>> tableList = ruleEditorService.getFactorGrpList();
		
		model.addAttribute("factorGrpList", tableList);
		
		return "/ruleEditor/main";
	}
	
	/**
	 * 속성 view 하위 요소 리스트 조회
	 * @param factor_grp_id
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/getFactorList.do", method = RequestMethod.POST)
	public HashMap<String, Object> getFactorList(@RequestParam("factor_grp_id") String factor_grp_id) {
		HashMap<String, Object> factor = new HashMap<String, Object>();
		HashMap<String, Object> param = new HashMap<String, Object>();
		param.put("factor_grp_id", factor_grp_id);
		
		List<String> factorList = ruleEditorService.getFactorList(param);
		
		factor.put("factorList", factorList);
			
		return factor;
	}
	
	@ResponseBody
	@RequestMapping(value = "/getFactorVal.do", method = RequestMethod.POST)
	public HashMap<String, Object> getFactorVal(@RequestParam("factor_id") String factor_id) {
		
		HashMap<String, Object> dataInfo = new HashMap<String, Object>();
		HashMap<String, Object> param = new HashMap<String, Object>();
		param.put("factor_id", factor_id);
		
		HashMap<String, Object> factor = ruleEditorService.getFactor(param);
		List<HashMap<String, Object>> factorVal = ruleEditorService.getFactorVal(param);
		dataInfo.put("factor", factor);
		dataInfo.put("factorVal", factorVal);
			
		return dataInfo;
	}
	
	/**
	 * Rule name 중복 체크
	 * @param param
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/ruleNameCheck.do", method = RequestMethod.POST)
	public boolean ruleNameCheck(@RequestBody HashMap<String, Object> map) {
		HashMap param = new HashMap<>();
		
		String ruleName = (String) map.get("ruleName");
		String pkgId = (String) map.get("pkgId");
		param.put("RULE_NM", ruleName);
		param.put("PKG_ID", pkgId);
		int ruleNameCnt = ruleEditorService.getRuleNameCheck(param);
		
		if(ruleNameCnt > 0) {
			return false;
		}
		
		return true;
	}
	
	/**
	 * 룰 저장 (파일 및 DB) 
	 * @param custAccNo
	 * @param column_name
	 * @return
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping(value = "/ruleSave.do", method = RequestMethod.POST)
	public String ruleApply(@RequestBody HashMap param) {
		
		String pkgId = (String) param.get("pkgId");
		String ruleNm = (String) param.get("ruleNm");
		HashMap ruleOpt = (HashMap) param.get("ruleOpt");
		List<HashMap> ruleArr = (List<HashMap>) param.get("ruleArr");
		
		List<String> ruleAttr = new ArrayList<>();
		
		for(HashMap m : ruleArr) {
			String factor_nm_en = (String)m.get("factor_nm_en");
			String logical_txt = (String)m.get("logical_txt");
			String factorVal = (String)m.get("factorVal");
			String relation_txt = ("".equals((String)m.get("relation_txt"))) ? "" : " " + (String)m.get("relation_txt");
			
			String attr = "this[\""+ factor_nm_en +"\"]" + logical_txt + factorVal + relation_txt;
			ruleAttr.add(attr);
		}
		
		HashMap<String, Object> map = new HashMap<>();
		map.put("PKG_ID", pkgId);
		map.put("RULE_NM", ruleNm);
		map.put("NO_LOOP", ruleOpt.get("opt1"));
		map.put("LOCK_ON_ACTIVE", ruleOpt.get("opt2"));
		map.put("SALIENCE", ruleOpt.get("opt3"));
		map.put("ATTR_WHEN_LIST", ruleAttr);
		map.put("ATTR_THEN", "$map.put(\"RESULT\", \"Y\");");	// 차후 THEN 동적구문 필요
		map.put("FUNC_YN", "N");	// 차후 함수 적용 필요
		
		// RULE 저장
		ruleEditorService.insertRuleInfo(map);
		
		// RULE_ATTR 저장
		ruleEditorService.insertRuleAttr(map);
		
		// PKG DRL_SOURCE 업데이트
		HashMap pkg = ruleEditorService.getPkgById(pkgId);
		List<HashMap> ruleList = ruleEditorService.getRuleList(pkgId);
		
		String drlSource = "";
		
		drlSource += "package " + pkg.get("PKG_NM") + "\n";
		drlSource += "import java.util.Map\n\n";
		
		for(HashMap m : ruleList) {
			drlSource += "rule \"" + m.get("RULE_NM") + "\"\n";
			drlSource += "	no-loop " + m.get("NO_LOOP") + "\n";
			drlSource += "	lock-on-active " + m.get("LOCK_ON_ACTIVE") + "\n";
			drlSource += "	salience " + m.get("SALIENCE") + "\n";
			drlSource += "	when\n";
			
			int ruleId = (int) m.get("RULE_ID");
			List<HashMap> whenList = ruleEditorService.getWhenList(ruleId);
			
			for(HashMap w : whenList) {
				drlSource += "		" + w.get("ATTR_WHEN") + "\n";
			}
			
			drlSource += "	then\n";
			drlSource += "		" + m.get("ATTR_THEN") + "\n";
			drlSource += "end\n\n";
		}
		
		pkg.put("DRL_SOURCE", drlSource);
		ruleEditorService.updateDrlSource(pkg);
		
		// 물리 DRL파일 생성
		String path = (String) pkg.get("PATH");
		path = System.getProperty("user.home") + path;
		path = path.replace("/", File.separator).replace("\\", File.separator);
		String pkg_nm = (String) pkg.get("PKG_NM");
		String drl_nm = (String) pkg.get("DRL_NM");
		String drl_source = (String) pkg.get("DRL_SOURCE");
		
		DroolsUtil.outputDrl(path, pkg_nm, drl_nm, drl_source);
		
//		
//		String filePath = "C:\\work\\appdata\\drl";
//		String fileName = "MapExample.drl";
//		DroolsConfig config = new DroolsConfig();
//		
//		String drlToString = config.getDrlToString(filePath, fileName);
//		
//		System.out.println(drlToString);
//		
//		HashMap<String, Object> user = ruleEditorService.test("AKBL6Y2HQZY");
////		---------------------------
//		
//        KieSession kieSession = new DroolsConfig().getKieSession(filePath + File.separator + fileName);
//        
//        kieSession.insert(user);
//        kieSession.fireAllRules();
//        kieSession.dispose();
//		
//        System.out.println(user);
		
		return "true";
	}
}
