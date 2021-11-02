package egovframework.ktds.targetai.mapper;

import java.util.HashMap;
import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("ruleMapper")
public interface RuleMapper {

	List<HashMap<String, Object>> getRuleList(HashMap<String, Object> searchObj);
	
	int getRuleCount(HashMap<String, Object> searchObj);
	
	HashMap<String, Object> getRule(HashMap<String, Object> param);
	
	List<HashMap<String, Object>> getWhenList(int ruleId);
	
	int ruleNmCheck(HashMap<String, Object> param);
	
	List<HashMap<String, Object>> getFactorList(HashMap<String, Object> param);

	List<HashMap<String, Object>> getFactorFuncArgs(HashMap<String, Object> param);

	HashMap<String, Object> getFactorById(HashMap<String, Object> param);

	List<HashMap<String, Object>> getFactorVal(HashMap<String, Object> param);
	
	List<HashMap<String, Object>> getRuleListByPkgId(String pkgId);
	
	void updateDrlSource(HashMap<String, Object> pkg);
	
	void updateAttrThen(HashMap<String, Object> param);
	
	void ruleUpdate(HashMap<String, Object> param);

	void deleteRuleAttrById(HashMap<String, Object> param);
	
	void ruleSave(HashMap<String, Object> param);

	void ruleAttrSave(HashMap<String, Object> param);
}
