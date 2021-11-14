package egovframework.ktds.targetai.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import egovframework.ktds.targetai.service.DashboardService;

/**
 * @since 2021.05.25
 * @author 박주윤 차장
 *
 */
@RequestMapping("/targetai")
@Controller
public class DashboardController {
	
	@Resource(name = "dashboardService")
	protected DashboardService dashboardService;

	/**
	 * package 관리 화면 이동
	 * @param model
	 * @return /targetai/pkg.jsp
	 */
	@RequestMapping(value = "/dashboard.do")
	public String main(ModelMap model) {
		return "/targetai/dashboard";
	}
}
