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
	
	List<HashMap<String, Object>> getFactorList(HashMap<String, Object> param);

	List<HashMap<String, Object>> getFactorFuncArgs(HashMap<String, Object> param);

	HashMap<String, Object> getFactorById(HashMap<String, Object> param);

	List<HashMap<String, Object>> getFactorVal(HashMap<String, Object> param);
	
	List<HashMap<String, Object>> getRuleListByPkgVer(HashMap<String, Object> pkg);
	
	void updateDrlSource(HashMap<String, Object> pkg);
	
	void updateAttrThen(HashMap<String, Object> param);
	
	void ruleUpdate(HashMap<String, Object> param);

	void ruleSave(HashMap<String, Object> param);

	void deleteRuleById(HashMap<String, Object> param);

	void delRuleMappingByRuleIds(HashMap<String, Object> param);

	int ruleNmDupCheck(HashMap<String, Object> param);

	List<HashMap<String, Object>> getRuleVerList(HashMap<String, Object> param);

	int getRuleVerCount(HashMap<String, Object> param);

	int getRuleDevVer(HashMap<String, Object> param);

	List<HashMap<String, Object>> getConPkgList(HashMap<String, Object> param);

	int getConPkgListCnt(HashMap<String, Object> param);
}
