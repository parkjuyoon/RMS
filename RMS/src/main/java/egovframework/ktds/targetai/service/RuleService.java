package egovframework.ktds.targetai.service;

import java.util.HashMap;
import java.util.List;

public interface RuleService {

	List<HashMap<String, Object>> getRuleList(HashMap<String, Object> searchObj);
	
	int getRuleCount(HashMap<String, Object> searchObj);
	
	HashMap<String, Object> getRule(HashMap<String, Object> param);
	
	List<HashMap<String, Object>> getFactorList(HashMap<String, Object> param);
	
	HashMap<String, Object> getFactorById(HashMap<String, Object> param);
	
	List<HashMap<String, Object>> getFactorVal(HashMap<String, Object> param);
	
	List<HashMap<String, Object>> getFactorFuncArgs(HashMap<String, Object> param);

	String saveDRL(HashMap<String, Object> pkg);

	void ruleSave(HashMap<String, Object> param);

	int ruleUpdate(HashMap<String, Object> param);

	void updateAttrThen(HashMap<String, Object> param);

	void deleteRuleById(HashMap<String, Object> param);

	void delRuleMappingByRuleIds(HashMap<String, Object> param);

	HashMap<String, Object> ruleTest(HashMap<String, Object> param);

	int ruleNmDupCheck(HashMap<String, Object> param);

	List<HashMap<String, Object>> getRuleVerList(HashMap<String, Object> param);

	int getRuleVerCount(HashMap<String, Object> param);

	HashMap<String, Object> getConPkg(HashMap<String, Object> param);

	HashMap<String, Object> ruleDeploy(HashMap<String, Object> param);
}
