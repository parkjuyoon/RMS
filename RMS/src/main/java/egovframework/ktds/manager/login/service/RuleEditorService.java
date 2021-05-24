package egovframework.ktds.manager.login.service;

import java.util.HashMap;
import java.util.List;

public interface RuleEditorService {

	List<HashMap<String, Object>> getFactorGrpList();

	List<String> getFactorList(HashMap<String, Object> param);

	HashMap<String, Object> getFactor(HashMap<String, Object> param);

	List<HashMap<String, Object>> getFactorVal(HashMap<String, Object> param);

	int getRuleNameCheck(HashMap param);

	void insertRuleInfo(HashMap<String, Object> map);

	void insertRuleAttr(HashMap<String, Object> map);

	HashMap getPkgById(String pkgId);

	List<HashMap> getRuleList(String pkgId);

	List<HashMap> getWhenList(int ruleId);

	void updateDrlSource(HashMap pkg);
}
