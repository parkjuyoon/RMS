package egovframework.ktds.targetai.service;

import java.util.HashMap;
import java.util.List;

public interface RuleService {

	List<HashMap<String, Object>> getRuleList(HashMap<String, Object> searchObj);
	
	int getRuleCount(HashMap<String, Object> searchObj);
	
	HashMap<String, Object> getRule(HashMap<String, Object> param);
	
	List<HashMap<String, Object>> getWhenList(int ruleId);
	
	int ruleNmCheck(HashMap<String, Object> param);
	
	List<HashMap<String, Object>> getFactorList(HashMap<String, Object> param);
	
	HashMap<String, Object> getFactorById(HashMap<String, Object> param);
	
	List<HashMap<String, Object>> getFactorVal(HashMap<String, Object> param);
	
	List<HashMap<String, Object>> getFactorFuncArgs(HashMap<String, Object> param);

	String saveDRL(String pkgId);
	
	void ruleSave(HashMap<String, Object> param);

	void ruleAttrSave(HashMap<String, Object> param);
	
	void ruleUpdate(HashMap<String, Object> param);

	void deleteRuleAttrById(HashMap<String, Object> param);
	
	void updateAttrThen(HashMap<String, Object> param);
}
