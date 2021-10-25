package egovframework.ktds.targetai.service;

import java.util.HashMap;
import java.util.List;

public interface RuleService {

	List<HashMap<String, Object>> getRuleList(HashMap<String, Object> searchObj);
	
	int getRuleCount(HashMap<String, Object> searchObj);
	
	HashMap<String, Object> getRule(HashMap<String, Object> param);
	
	List<HashMap<String, Object>> getWhenList(int ruleId);
}
