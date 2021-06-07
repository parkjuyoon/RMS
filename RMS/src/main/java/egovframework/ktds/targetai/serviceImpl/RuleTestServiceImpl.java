package egovframework.ktds.targetai.serviceImpl;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.ktds.targetai.mapper.RuleTestMapper;
import egovframework.ktds.targetai.service.RuleTestService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service("ruleTestService")
public class RuleTestServiceImpl extends EgovAbstractServiceImpl implements RuleTestService {

	@Resource(name = "ruleTestMapper")
	private RuleTestMapper dao;

	@Override
	public List<HashMap<String, Object>> getAllPkgList() {
		return dao.getAllPkgList();
	}

	@Override
	public List<HashMap<String, Object>> getRuleAttrByPkgId(HashMap<String, Object> param) {
		return dao.getRuleAttrByPkgId(param);
	}

}
