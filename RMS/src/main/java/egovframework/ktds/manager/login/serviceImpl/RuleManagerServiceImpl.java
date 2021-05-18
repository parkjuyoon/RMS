package egovframework.ktds.manager.login.serviceImpl;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.ktds.manager.login.mapper.RuleManagerMapper;
import egovframework.ktds.manager.login.service.RuleManagerService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service("ruleManagerService")
public class RuleManagerServiceImpl extends EgovAbstractServiceImpl implements RuleManagerService {

	@Resource(name = "ruleManagerMapper")
	private RuleManagerMapper dao;

	@Override
	public List<HashMap<String, Object>> getRuleList(HashMap<String, Object> param) {
		return dao.getRuleList(param);
	}

	@Override
	public int getRuleListTotalCnt(HashMap<String, Object> param) {
		return dao.getRuleListTotalCnt(param);
	}


}
