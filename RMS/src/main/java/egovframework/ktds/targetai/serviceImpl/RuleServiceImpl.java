package egovframework.ktds.targetai.serviceImpl;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.ktds.targetai.mapper.ApiMapper;
import egovframework.ktds.targetai.mapper.RuleMapper;
import egovframework.ktds.targetai.service.RuleService;

@Service("ruleService")
public class RuleServiceImpl implements RuleService {

	@Resource(name = "ruleMapper")
	private RuleMapper dao;
	
	@Override
	public List<HashMap<String, Object>> getRuleList(HashMap<String, Object> searchObj) {
		return dao.getRuleList(searchObj);
	}
	
	@Override
	public int getRuleCount(HashMap<String, Object> searchObj) {
		return dao.getRuleCount(searchObj);
	}
}
