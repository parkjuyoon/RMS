package egovframework.ktds.targetai.controller;

import java.io.File;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import egovframework.ktds.drools.config.DroolsUtil;
import egovframework.ktds.targetai.service.PkgService;

/**
 * @since 2021.05.25
 * @author 박주윤 차장
 *
 */
@RequestMapping("/targetai")
@Controller
public class PkgController {

	@Resource(name = "pkgService")
	protected PkgService pkgService;
	
	/**
	 * package 관리 화면 이동
	 * @param model
	 * @return /targetai/pkg.jsp
	 */
	@RequestMapping(value = "/pkg.do")
	public String main(ModelMap model) {
		return "/targetai/pkg";
	}
	
	/**
	 * package 리스트 조회
	 * @param searchObj
	 * @return pkgList, pkgCount
	 */
	@ResponseBody
	@RequestMapping(value = "/getPkgList.do", method = RequestMethod.POST)
	public HashMap<String, Object> getPkgList(@RequestBody HashMap<String, Object> searchObj) {
		HashMap<String, Object> resultMap = null;

		try {
			
			resultMap = new HashMap<String, Object>();
			List<HashMap<String, Object>> pkgList = pkgService.getPkgList(searchObj);
			int pkgCount = pkgService.getPkgCount(searchObj);
			resultMap.put("pkgList", pkgList);
			resultMap.put("pkgCount", pkgCount);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return resultMap;
	}
	
	/**
	 * package 상세 조회
	 * @param PKG_ID
	 * @return pkg
	 */
	@ResponseBody
	@RequestMapping(value = "/getPkg.do", method = RequestMethod.POST)
	public HashMap<String, Object> getPkg(@RequestBody HashMap<String, Object> param) {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		HashMap<String, Object> pkg = pkgService.getPkg(param);
		resultMap.put("pkg", pkg);
		
		return resultMap;
	}
	
	/**
	 * package 명 중복 체크
	 * @param param
	 * @return boolean
	 */
	@ResponseBody
	@RequestMapping(value = "/pkgNmCheck.do", method = RequestMethod.POST)
	public boolean pkgNmCheck(@RequestBody HashMap<String, Object> map) {
		int pkgNameCnt = pkgService.pkgNmCheck(map);
		
		if(pkgNameCnt > 0) {
			return false;
		}
		
		return true;
	}
	
	/**
	 * PKG 저장
	 * @param param
	 * @return resultMap
	 */
	@ResponseBody
	@RequestMapping(value = "/pkgSave.do", method = RequestMethod.POST)
	public boolean pkgSave(@RequestBody HashMap<String, Object> param) {
		try {
		param.put("REG_USER_ID", 1);
		param.put("PATH", "/drl_files");
		
		// PKG 저장
		pkgService.pkgSave(param);
		// DRL 파일명 업데이트
		String drlNm = param.get("pkgNm") + "_" + param.get("PKG_ID") + ".drl";
		param.put("drlNm", drlNm);
		pkgService.updateDrlFileNm(param);
		
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return true;
	}
	
	/**
	 * Rule 리스트 조회
	 * @param searchObj
	 * @return ruleList, ruleCount
	 */
	@ResponseBody
	@RequestMapping(value = "/getRuleList.do", method = RequestMethod.POST)
	public HashMap<String, Object> getRuleList(@RequestBody HashMap<String, Object> searchObj) {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		List<HashMap<String, Object>> ruleList = pkgService.getRuleList(searchObj);
		int ruleCount = pkgService.getRuleCount(searchObj);
		resultMap.put("ruleList", ruleList);
		resultMap.put("ruleCount", ruleCount);
		
		return resultMap;
	}
	
	/**
	 * RULE 상세 조회
	 * @param RULE_ID
	 * @return rule
	 */
	@ResponseBody
	@RequestMapping(value = "/getRule.do", method = RequestMethod.POST)
	public HashMap<String, Object> getRule(@RequestBody HashMap<String, Object> param) {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		HashMap<String, Object> rule = pkgService.getRule(param);
		resultMap.put("rule", rule);
		
		return resultMap;
	}
	
	/**
	 * 속성 view 리스트 조회
	 * @param factor_grp_id
	 * @return factorGrpList
	 */
	@ResponseBody
	@RequestMapping(value = "/getFactorGrpList.do", method = RequestMethod.POST)
	public HashMap<String, Object> getFactorGrpList(@RequestBody HashMap<String, Object> param) {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		List<HashMap<String, Object>> factorGrpList = pkgService.getFactorGrpList();
		resultMap.put("factorGrpList", factorGrpList);
		
		return resultMap;
	}
	
	/**
	 * 속성 view 하위 요소 리스트 조회
	 * @param factor_grp_id
	 * @return factorList
	 */
	@ResponseBody
	@RequestMapping(value = "/getFactorList.do", method = RequestMethod.POST)
	public HashMap<String, Object> getFactorList(@RequestBody HashMap<String, Object> param) {
		HashMap<String, Object> factor = new HashMap<String, Object>();
		List<String> factorList = pkgService.getFactorList(param);
		
		factor.put("factorList", factorList);
			
		return factor;
	}
	
	/**
	 * Rule name 중복 체크
	 * @param param
	 * @return boolean
	 */
	@ResponseBody
	@RequestMapping(value = "/ruleNmCheck.do", method = RequestMethod.POST)
	public boolean ruleNmCheck(@RequestBody HashMap<String, Object> map) {
		int ruleNameCnt = pkgService.ruleNmCheck(map);
		
		if(ruleNameCnt > 0) {
			return false;
		}
		
		return true;
	}
	
	/**
	 * Factor Value 조회
	 * @param param
	 * @return factor, factorVal
	 */
	@ResponseBody
	@RequestMapping(value = "/getFactorVal.do", method = RequestMethod.POST)
	public HashMap<String, Object> getFactorVal(@RequestBody HashMap<String, Object> param) {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		HashMap<String, Object> factor = pkgService.getFactor(param);
		List<HashMap<String, Object>> factorVal = pkgService.getFactorVal(param);
		resultMap.put("factor", factor);
		resultMap.put("factorVal", factorVal);
			
		return resultMap;
	}
	
	/**
	 * RULE 저장
	 * @param param
	 * @return resultMap
	 */
	@ResponseBody
	@RequestMapping(value = "/ruleSave.do", method = RequestMethod.POST)
	public HashMap<String, Object> ruleSave(@RequestBody HashMap<String, Object> param) {
		param.put("REG_USER_ID", 1);
		
		// RULE 저장
		pkgService.ruleSave(param);
		// RULE_ATTR 저장
		pkgService.ruleAttrSave(param);
		// RULE 의 ATTR_WHEN 업데이트
		String attrThen = "$map.put(\"res_"+ param.get("RULE_ID") +"_"+ param.get("salience") +"\", \""+ param.get("ruleNm") +"\");";
		param.put("ATTR_THEN", attrThen);
		pkgService.updateAttrThen(param);
		
		// 해당 패키지에 등록된 RULE 개수 조회
		HashMap<String, Object> resultMap = new HashMap<>();
		resultMap.put("pkgId", param.get("pkgId"));
		int ruleCount = pkgService.getRuleCount(resultMap);
		resultMap.put("ruleCount", ruleCount);
		
		// RULE 파일 생성 및 PKG > DRL_SOURCE 업데이트
		String pkgId = (String) param.get("pkgId");
		saveDRL(pkgId);
		
		return resultMap;
	}
	
	/**
	 * RULE 파일 생성 및 PKG > DRL_SOURCE 업데이트
	 * @param pkgId
	 * @return
	 */
	public boolean saveDRL(String pkgId) {
		// PKG DRL_SOURCE 업데이트
		HashMap<String, Object> pkg = pkgService.getPkgById(pkgId);
		List<HashMap<String, Object>> ruleList = pkgService.getRuleListByPkgId(pkgId);
		
		String drlSource = "";
		
		drlSource += "package " + pkg.get("PKG_NM") + "\n";
		drlSource += "import java.util.Map\n\n";
		
		for(HashMap<String, Object> m : ruleList) {
			drlSource += "rule \"" + m.get("RULE_NM") + "\"\n";
			drlSource += "	no-loop " + m.get("NO_LOOP") + "\n";
			drlSource += "	lock-on-active " + m.get("LOCK_ON_ACTIVE") + "\n";
			drlSource += "	salience " + m.get("SALIENCE") + "\n";
			drlSource += "	when\n";
			drlSource += "		$map : Map(\n";
			
			int ruleId = (int) m.get("RULE_ID");
			List<HashMap<String, Object>> whenList = pkgService.getWhenList(ruleId);
			
			for(HashMap<String, Object> w : whenList) {
				drlSource += "		" + w.get("ATTR_WHEN");
			}
			
			drlSource += "	)\n";
			drlSource += "	then\n";
			drlSource += "		" + m.get("ATTR_THEN") + "\n";
			drlSource += "end\n\n";
		}
		
		pkg.put("DRL_SOURCE", drlSource);
		pkgService.updateDrlSource(pkg);
		
		// 물리 DRL파일 생성
		String path = (String) pkg.get("PATH");
		path = System.getProperty("user.home") + path;
		path = path.replace("/", File.separator).replace("\\", File.separator);
		String pkg_nm = (String) pkg.get("PKG_NM");
		String drl_nm = (String) pkg.get("DRL_NM");
		String drl_source = (String) pkg.get("DRL_SOURCE");
		
		DroolsUtil.outputDrl(path, pkg_nm, drl_nm, drl_source);
		
		return true;
	}
}
