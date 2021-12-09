package egovframework.ktds.targetai.util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class AuthInterceptor extends HandlerInterceptorAdapter{
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		
		boolean rs = true;
		
		try {
			HttpSession session = request.getSession();
			String member_id = (String) session.getAttribute("member_id");
		
			if(member_id == null) {
				response.sendRedirect("/targetai/login/logout.do");
			}
		
        } catch (Exception e) {
        	response.sendRedirect("/targetai/login/logout.do");
        }
		
		return rs;
	}
}
