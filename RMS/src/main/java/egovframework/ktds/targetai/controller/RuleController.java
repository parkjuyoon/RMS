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
}
