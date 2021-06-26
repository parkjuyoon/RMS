package egovframework.ktds.targetai.controller;

import java.util.HashMap;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import egovframework.ktds.targetai.service.LoginService;

/**
 * @since 2021.06.26
 * @author 박주윤 차장
 *
 */
@RequestMapping("/targetai")
@Controller
public class LoginController {

	@Resource(name = "loginService")
	protected LoginService loginService;
	
	/**
	 * 로그인 처리 관리 화면 이동
	 * @param model
	 * @return /targetai/login.jsp
	 */
	@RequestMapping(value = "/main.do")
	public String main(ModelMap model) {
		return "/targetai/login";
	}
	
	/**
	 * 로그인
	 * @param model
	 * @return /targetai/login.jsp
	 */
	@RequestMapping(value = "/login.do")
	public String login(HttpServletRequest req, HttpServletResponse resp) {
		
		String id = req.getParameter("id");
		String passwd = req.getParameter("passwd");
		
		if("".equals(id) || "".equals(passwd)) {
			return "redirect:/targetai/login.do";
		}
		
		HashMap<String, Object> param = new HashMap<>();
		param.put("id", id);
		param.put("passwd", passwd);
		
		HashMap<String, Object> member = loginService.getMember(param);
		
		HttpSession session = req.getSession();
		session.setAttribute("member_id", member.get("MEMBER_ID"));
		session.setAttribute("member_name", member.get("MEMBER_NAME"));
		
		return "redirect:/targetai/svc.do";
	}
	
	/**
	 * 로그아웃
	 * @param model
	 * @return /targetai/login.jsp
	 */
	@RequestMapping(value = "/logout.do")
	public String logout(HttpServletRequest req, HttpServletResponse resp) {
		HttpSession session = req.getSession();
		session.invalidate();
		
		return "/targetai/login";
	}
	
}
