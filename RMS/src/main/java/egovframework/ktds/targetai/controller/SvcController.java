package egovframework.ktds.targetai.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import egovframework.ktds.targetai.service.SvcService;

/**
 * @since 2021.05.25
 * @author 박주윤 차장
 *
 */
@RequestMapping("/targetai")
@Controller
public class SvcController {

	@Resource(name = "svcService")
	protected SvcService svcService;
	
	/**
	 * 속성 view 리스트 조회
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/svc.do")
	public String main(ModelMap model) {
		
		System.out.println("hi?");
		
		return "/targetai/svc";
	}
}
