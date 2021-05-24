package egovframework.ktds.manager.login.mapper;

import java.util.HashMap;
import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

//@Mapper("ruleManagerMapper")
public interface RuleManagerMapper {

	public List<HashMap<String, Object>> getRuleList(HashMap<String, Object> param);

	public int getRuleListTotalCnt(HashMap<String, Object> param);

}
