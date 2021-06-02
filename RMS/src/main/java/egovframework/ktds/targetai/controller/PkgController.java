package egovframework.ktds.targetai.controller;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

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
	 * @return
	 */
	@RequestMapping(value = "/pkg.do")
	public String main(ModelMap model) {
		return "/targetai/pkg";
	}
	
	/**
	 * package 리스트 조회
	 * @param searchObj
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/getPkgList.do", method = RequestMethod.POST)
	public HashMap<String, Object> getPkgList(@RequestBody HashMap<String, Object> searchObj) {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		List<HashMap<String, Object>> pkgList = pkgService.getPkgList(searchObj);
		int pkgCount = pkgService.getPkgCount(searchObj);
		resultMap.put("pkgList", pkgList);
		resultMap.put("pkgCount", pkgCount);
		
		return resultMap;
	}
	
	/**
	 * package 상세 조회
	 * @param PKG_ID
	 * @return
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
	 * Rule 리스트 조회
	 * @param searchObj
	 * @return
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
	 * @return
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
	 * @return
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
	 * @return
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
	 * @return
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
	 * @return
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
	
}
