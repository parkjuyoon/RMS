package egovframework.ktds.manager.login.serviceImpl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.ktds.manager.login.mapper.LoginMapper;
import egovframework.ktds.manager.login.service.LoginService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service("loginService")
public class LoginServiceImpl extends EgovAbstractServiceImpl implements LoginService {

	@Resource(name="loginMapper")
	private LoginMapper loginDao;

	@Override
	public String selctTestString() {
		return loginDao.selectTestString();
	}
}
