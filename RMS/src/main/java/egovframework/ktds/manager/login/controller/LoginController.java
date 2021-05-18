package egovframework.ktds.manager.login.controller;

import javax.annotation.Resource;

import org.kie.api.KieServices;
import org.kie.api.runtime.KieContainer;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import egovframework.example.sample.web.DroolsMapExample;
import egovframework.ktds.manager.login.service.LoginService;

@Controller
public class LoginController {

	@Resource(name = "loginService")
	protected LoginService loginService;
	
	@RequestMapping("/login.do")
	public String login() throws Exception {
		
//		DroolsScoreExample dse = new DroolsScoreExample();
//		DroolsMapExample dse = new DroolsMapExample();
//		
//		// KieServices is the factory for all KIE services
//        KieServices ks = KieServices.Factory.get();
//
//        // From the kie services, a container is created from the classpath
//        KieContainer kc = ks.getKieClasspathContainer();
//
//        dse.execute( kc );
        
		return "login";
	}
}
