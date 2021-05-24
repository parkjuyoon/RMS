package egovframework.ktds.manager.login.mapper;

import java.util.HashMap;
import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

//@Mapper("ruleEditorMapper")
public interface RuleEditorMapper {

	List<HashMap<String, Object>> getFactorGrpList();

	List<String> getFactorList(HashMap<String, Object> param);

	List<HashMap<String, Object>> getFactorVal(HashMap<String, Object> param);

	void insertRuleInfo(HashMap<String, Object> param);

	int getRuleNameCheck(HashMap param);

	HashMap<String, Object> getFactor(HashMap<String, Object> param);

	void insertRuleAttr(HashMap<String, Object> param);

	HashMap getPkgById(String pkgId);

	List<HashMap> getRuleList(String pkgId);

	List<HashMap> getWhenList(int ruleId);

	void updateDrlSource(HashMap drlSource);


}
