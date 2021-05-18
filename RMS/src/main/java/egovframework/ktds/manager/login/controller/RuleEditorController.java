package egovframework.ktds.manager.login.controller;

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
		try {
			
			HashMap<String, Object> param = new HashMap<String, Object>();
			param.put("factor_id", factor_id);
			
			HashMap<String, Object> factor = ruleEditorService.getFactor(param);
			List<HashMap<String, Object>> factorVal = ruleEditorService.getFactorVal(param);
			dataInfo.put("factor", factor);
			dataInfo.put("factorVal", factorVal);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
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
		// 값 받아올 수 있게 변경 필요 -----------------------------------
		String service_id = "SER_01";
		String root_path = "C:\\work\\appdata";
		String package_nm = "rule";
		String package_comment = "룰패키지";
		String drl_file_nm = "customerRule.drl";
		String drl_file_comment = "고객룰DRL";
		String reg_user_id = "user0001";
		HashMap<String, Object> param = new HashMap<>();
		param.put("schema", schema);
		param.put("SERVICE_ID", service_id);
		param.put("ROOT_PATH", root_path);
		param.put("PACKAGE_NM", package_nm);
		param.put("PACKAGE_COMMNET", package_comment);
		param.put("DRL_FILE_NM", drl_file_nm);
		param.put("DRL_FILE_COMMENT", drl_file_comment);
		param.put("REG_USER_ID", reg_user_id);
		// 값 받아올 수 있게 변경 필요 -----------------------------------
		
		String rule_name = (String) map.get("ruleName");
		param.put("RULE_NAME", rule_name);
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
	public String ruleApply(@RequestBody HashMap<String, Object> applyRuleObj) {
		try {
		// 저장될 DRL 파일 컨텐츠
		String drl_contents = (String) applyRuleObj.get("drl_html");
			
		// 값 받아올 수 있게 변경 필요 -----------------------------------
		String service_id = "SER_01";
		String root_path = "C:\\work\\appdata";
		String package_nm = "rule";
		String package_comment = "룰패키지";
		String drl_file_nm = "customerRule.drl";
		String drl_file_comment = "고객룰DRL";
		String reg_user_id = "user0001";
		// 값 받아올 수 있게 변경 필요 -----------------------------------
		
		// DRL_INFO 테이블에 저장될 데이터
		HashMap<String, Object> drl_info = new HashMap<>();
		drl_info.put("schema", schema);
		drl_info.put("SERVICE_ID", service_id);
		drl_info.put("ROOT_PATH", root_path);
		drl_info.put("PACKAGE_NM", package_nm);
		drl_info.put("PACKAGE_COMMNET", package_comment);
		drl_info.put("DRL_FILE_NM", drl_file_nm);
		drl_info.put("DRL_FILE_COMMENT", drl_file_comment);
		drl_info.put("REG_USER_ID", reg_user_id);

		// RULE_INFO 테이블에 저장될 데이터
		HashMap<String, Object> rule_info = new HashMap<>();
		
		String rule_name = (String) applyRuleObj.get("ruleName");
		String no_loop = (String) applyRuleObj.get("opt1");
		String lock_on_active = (String) applyRuleObj.get("opt2");
		String agenda_group = "";
		int salience = Integer.parseInt((String) applyRuleObj.get("opt3"));
		String enabled = "";
		String duration = "";
		String contents = (String) applyRuleObj.get("whenMap_html");
		
		rule_info.put("schema", schema);
		rule_info.put("RULE_NAME", rule_name);
		rule_info.put("NO_LOOP", no_loop);
		rule_info.put("LOCK_ON_ACTIVE", lock_on_active);
		rule_info.put("AGENDA_GROUP", null);
		rule_info.put("SALIANCE", salience);
		rule_info.put("ENABLED", null);
		rule_info.put("DURATION", null);
		rule_info.put("CONTENTS", contents);
		
		HashMap<String, Object> param = new HashMap<>();
		param.put("drl_info", drl_info);
		param.put("rule_info", rule_info);
		
		// RULE 추가 순서 저장 (같은 DRL 안의 RULE 중에 SALIANCE 가 같은 마지막 추가된 RULE의  RULE_ADD_CNT + 1 을 저장)
		int rule_add_cnt = ruleEditorService.gerLastRuleAddCnt(param);
		param.put("RULE_ADD_CNT", rule_add_cnt + 1);

		// DRL_INFO 저장
		ruleEditorService.insertDrlInfo(param);
		param.put("DRL_INFO_SEQ", (Integer) param.get("DRL_INFO_SEQ"));
		// RULE_INFO 저장
		ruleEditorService.insertRuleInfo(param);
		
		// DRL 파일 output
		DroolsUtil.outputDrl(root_path, package_nm, drl_file_nm, drl_contents);
		
		} catch (Exception e) {
			e.printStackTrace();
		}
		
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
	
	/**
	 * 테스트 url
	 * @param custAccNo
	 * @param column_name
	 * @return
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping(value = "/test.do", method = RequestMethod.GET)
	public List<String> test(@RequestParam("CUST_ACC_NO") String custAccNo) throws Exception {
		
		HashMap<String, Object> user = ruleEditorService.test(custAccNo);
		
		DroolsMapExample dse = new DroolsMapExample(user);
		
		return dse.execute();
	}

}
