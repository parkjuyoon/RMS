package egovframework.ktds.targetai.serviceImpl;

import java.util.HashMap;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.ktds.targetai.mapper.LoginMapper;
import egovframework.ktds.targetai.service.LoginService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service("loginService")
public class LoginServiceImpl extends EgovAbstractServiceImpl implements LoginService {

	@Resource(name = "loginMapper")
	private LoginMapper dao;

	@Override
	public HashMap<String, Object> getMember(HashMap<String, Object> member) {
		return dao.getMember(member);
	}
}
