package egovframework.ktds.targetai.serviceImpl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.ktds.targetai.mapper.ApiMapper;
import egovframework.ktds.targetai.mapper.RuleMapper;
import egovframework.ktds.targetai.service.RuleService;

@Service("ruleService")
public class RuleServiceImpl implements RuleService {

	@Resource(name = "ruleMapper")
	private RuleMapper dao;
}
