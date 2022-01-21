package egovframework.ktds.targetai.controller;

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

import egovframework.ktds.targetai.service.DashboardService;
import egovframework.ktds.targetai.service.InheritanceService;

/**
 * @since 2021.05.25
 * @author 박주윤 차장
 *
 */
@RequestMapping("/targetai")
@Controller
public class InheritanceController {
	
	@Resource(name = "inheritanceService")
	protected InheritanceService inheritanceService;

	/**
	 * RULE 상속 화면 이동
	 * @param model
	 * @return /targetai/inheritance.jsp
	 */
	@RequestMapping(value = "/inheritance.do")
	public String main(ModelMap model) {
		return "/targetai/inheritance";
	}
	
	/**
	 * 상속정보 목록 조회
	 * @param param
	 * @return resultMap
	 */
	@ResponseBody
	@RequestMapping(value = "/getIhList.do", method = RequestMethod.POST)
	public HashMap<String, Object> getInheritanceList(@RequestBody HashMap<String, Object> param, HttpSession session) {
		
		List<HashMap<String, Object>> ihList = inheritanceService.getInheritanceList(param);
		int ihListCount = inheritanceService.getInheritanceListCount(param);
		
		HashMap<String, Object> rtnMap = new HashMap<>();
		rtnMap.put("ihList", ihList);
		rtnMap.put("ihListCount", ihListCount);
		
		return rtnMap;
	}
	
	/**
	 * 상속정보 조회
	 * @param param
	 * @return resultMap
	 */
	@ResponseBody
	@RequestMapping(value = "/getSerializeInfo.do", method = RequestMethod.POST)
	public HashMap<String, Object> getSerializeInfo(@RequestBody HashMap<String, Object> param, HttpSession session) {
		
		HashMap<String, Object> serializeInfo = inheritanceService.getSerializeInfo(param);
		
		return serializeInfo;
	}
}
