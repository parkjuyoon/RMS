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

/**
 * @since 2021.05.25
 * @author 박주윤 차장
 *
 */
@RequestMapping("/targetai")
@Controller
public class InheritanceController {
	
	@Resource(name = "dashboardService")
	protected DashboardService dashboardService;

	/**
	 * package 관리 화면 이동
	 * @param model
	 * @return /targetai/pkg.jsp
	 */
	@RequestMapping(value = "/inheritance.do")
	public String main(ModelMap model) {
		return "/targetai/inheritance";
	}
	
	/**
	 * 상속정보 조회
	 * @param param
	 * @return resultMap
	 */
	@ResponseBody
	@RequestMapping(value = "/getInheritanceList.do", method = RequestMethod.POST)
	public HashMap<String, Object> getInheritanceList(@RequestBody HashMap<String, Object> param, HttpSession session) {
		HashMap<String, Object> resultMap = new HashMap<>();
		
		return resultMap;
	}
}
