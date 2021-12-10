package egovframework.ktds.targetai.controller;

import java.util.HashMap;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

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
	@RequestMapping(value = "/login/login.do", method = RequestMethod.POST)
	public String login(HttpServletRequest req) {
		try {
			String id = req.getParameter("id");
			String passwd = req.getParameter("passwd");
			
			HashMap<String, Object> param = new HashMap<>();
			param.put("id", id);
			param.put("passwd", passwd);
			
			HashMap<String, Object> member = loginService.getMember(param);
			
			HttpSession session = req.getSession();
			session.setAttribute("member_id", member.get("MEMBER_ID"));
			session.setAttribute("member_name", member.get("MEMBER_NAME"));
			session.setAttribute("office_number", member.get("OFFICE_NUMBER"));
		} catch (Exception e) {
			e.printStackTrace();
			return "redirect:/targetai/login/loginCheck.do";
		}
		
		return "redirect:/targetai/dashboard.do";
	}
	
	/**
	 * 
	 * @param param
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/login/loginCheck.do", method = RequestMethod.POST)
	public boolean loginCheck(HttpServletRequest req) {
		try {
			String id = req.getParameter("id");
			String passwd = req.getParameter("passwd");
			
			HashMap<String, Object> param = new HashMap<>();
			param.put("id", id);
			param.put("passwd", passwd);
			
			HashMap<String, Object> member = loginService.getMember(param);
			
			if(member == null) {
				return false;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		
		return true;
	}
	
	/**
	 * 로그아웃
	 * @param model
	 * @return /targetai/login.jsp
	 */
	@RequestMapping(value = "/login/logout.do")
	public String logout(HttpServletRequest req, HttpServletResponse resp) {
		HttpSession session = req.getSession();
		session.invalidate();
		
		return "/targetai/login";
	}
	
}
