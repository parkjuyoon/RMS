package egovframework.ktds.targetai.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import egovframework.ktds.targetai.service.RuleService;

@RequestMapping("/targetai")
@Controller
public class RuleController {

	@Resource(name = "ruleService")
	protected RuleService ruleService;
	
	/**
	 * package 관리 화면 이동
	 * @param model
	 * @return /targetai/pkg.jsp
	 */
	@RequestMapping(value = "/rule.do")
	public String main(HttpSession session, ModelMap model) {
		String member_id = (String) session.getAttribute("member_id");
		
		if(member_id == null) {
			return "redirect:/targetai/main.do";
		}
		
		return "/targetai/rule";
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
		List<HashMap<String, Object>> ruleList = ruleService.getRuleList(searchObj);
		int ruleCount = ruleService.getRuleCount(searchObj);
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
		HashMap<String, Object> rule = ruleService.getRule(param);
		resultMap.put("rule", rule);
		
		int ruleId = (int) rule.get("RULE_ID");
		List<HashMap<String, Object>> ruleAttrList = ruleService.getWhenList(ruleId);
		resultMap.put("ruleAttrList", ruleAttrList);
		
		return resultMap;
	}
	
	/**
	 * Rule name 중복 체크
	 * @param param
	 * @return boolean
	 */
	@ResponseBody
	@RequestMapping(value = "/ruleNmCheck.do", method = RequestMethod.POST)
	public boolean ruleNmCheck(@RequestBody HashMap<String, Object> map) {
		int ruleNameCnt = ruleService.ruleNmCheck(map);
		
		if(ruleNameCnt > 0) {
			return false;
		}
		
		return true;
	}
	
	/**
	 * 속성 view 리스트 조회
	 * @return factorList
	 */
	@ResponseBody
	@RequestMapping(value = "/getFactorList.do", method = RequestMethod.POST)
	public HashMap<String, Object> getFactorList(@RequestBody HashMap<String, Object> param) {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		
		try {
			List<HashMap<String, Object>> factorList = ruleService.getFactorList(param);
			resultMap.put("factorList", factorList);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return resultMap;
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
		try {
		HashMap<String, Object> factor = ruleService.getFactorById(param);
		List<HashMap<String, Object>> factorVal = new ArrayList<>();
		String factorType = (String) factor.get("FACTOR_TYPE");

		if(factor != null) {
			factorVal = ruleService.getFactorVal(param);
		}
		
		if("FUNC".equals(factorType)) {
			factorVal = ruleService.getFactorFuncArgs(param);
		} 
		
		resultMap.put("factor", factor);
		resultMap.put("factorVal", factorVal);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return resultMap;
	}
	
	/**
	 * RULE 저장
	 * @param param
	 * @return resultMap
	 */
	@ResponseBody
	@RequestMapping(value = "/ruleSave.do", method = RequestMethod.POST)
	public HashMap<String, Object> ruleSave(@RequestBody HashMap<String, Object> param, HttpSession session) {
		String ruleId = (String) param.get("ruleId");
		String regUserId = (String) session.getAttribute("member_id");
		
		param.put("REG_USER_ID", regUserId);
		
		if("".equals(ruleId)) {	// 신규 등록
			// RULE 저장
			ruleService.ruleSave(param);
			ruleId = String.valueOf((int) param.get("RULE_ID"));
			param.put("ruleId", (int) param.get("RULE_ID"));
			// RULE_ATTR 저장
			ruleService.ruleAttrSave(param);
			
		} else {	// 수정
			param.put("ruleId", Integer.parseInt(ruleId));
			// RULE 수정
			ruleService.ruleUpdate(param);
			List<HashMap<String, Object>> ruleObjList = (List<HashMap<String, Object>>) param.get("ruleObjArr");
			
			if(ruleObjList.size() > 0) {
				// RULE_ATTR 삭제
				ruleService.deleteRuleAttrById(param);
				// RULE_ATTR 저장
				ruleService.ruleAttrSave(param);
			}
		}
		
		// RULE 의 ATTR_THEN 업데이트
		HashMap<String, Object> ruleMap = ruleService.getRule(param);
		String attrThen = "$map.put(\"res_"+ ruleMap.get("RULE_ID") +"_"+ ruleMap.get("CAMP_ID") +"_"+ ruleMap.get("SALIENCE") +"\", \""+ ruleMap.get("RULE_NM") +"\");\n";
		
		attrThen = "";
		attrThen += "$map.put(\"ruleId_"+ ruleMap.get("RULE_ID") + "\", " + ruleMap.get("RULE_ID") +");\n";
		attrThen += "		$map.put(\"campId_"+ ruleMap.get("RULE_ID") + "\", " + ruleMap.get("CAMP_ID") +");\n";
		attrThen += "		$map.put(\"salience_"+ ruleMap.get("RULE_ID") + "\", " + ruleMap.get("SALIENCE") +");\n";
		attrThen += "		$map.put(\"ruleNm_"+ ruleMap.get("RULE_ID") + "\", \"" + ruleMap.get("RULE_NM") +"\");\n";
		attrThen += "		$map.put(\"targetType_"+ ruleMap.get("RULE_ID") + "\", \"" + ruleMap.get("TARGET_TYPE") +"\");";
		
		param.put("ATTR_THEN", attrThen);
		ruleService.updateAttrThen(param);
		
		// 해당 패키지에 등록된 RULE 개수 조회
		HashMap<String, Object> resultMap = new HashMap<>();
		resultMap.put("pkgId", param.get("pkgId"));
		resultMap.put("ruleId", param.get("ruleId"));
		int ruleCount = ruleService.getRuleCount(resultMap);
		resultMap.put("ruleCount", ruleCount);
		
		// RULE 파일 생성 및 PKG > DRL_SOURCE 업데이트
		String pkgId = (String) param.get("pkgId");
		String path = ruleService.saveDRL(pkgId);
		
		resultMap.put("drlPath", path);
		
		return resultMap;
	}
}