package egovframework.ktds.targetai.mapper;

import java.util.HashMap;
import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("pkgMapper")
public interface PkgMapper {

	List<HashMap<String, Object>> getPkgList(HashMap<String, Object> searchObj);

	HashMap<String, Object> getPkg(HashMap<String, Object> param);

	int getPkgCount(HashMap<String, Object> searchObj);

	int getRuleCount(HashMap<String, Object> searchObj);

	List<HashMap<String, Object>> getFactorVal(HashMap<String, Object> param);

	void ruleSave(HashMap<String, Object> param);

	void ruleAttrSave(HashMap<String, Object> param);

	String getDrlSource(String pkgId);

	HashMap<String, Object> getPkgById(String pkgId);

	void updateDrlSource(HashMap<String, Object> pkg);

	void updateAttrThen(HashMap<String, Object> param);

	int pkgNmCheck(HashMap<String, Object> param);

	void addPkg(HashMap<String, Object> param);

	void updateDrlFileNm(HashMap<String, Object> param);

	void ruleUpdate(HashMap<String, Object> param);

	void deleteRuleAttrById(HashMap<String, Object> param);

	void deletePkgById(HashMap<String, Object> param);

	List<HashMap<String, Object>> getRuleListByPkgId(String pkgId);

	void updatePkg(HashMap<String, Object> param);

	List<HashMap<String, Object>> getRuleAttrByPkgId(HashMap<String, Object> param);

	List<HashMap<String, Object>> getFactorFuncArgs(HashMap<String, Object> param);

	HashMap<String, Object> getFactorById(HashMap<String, Object> param);

	List<HashMap<String, Object>> getConRuleList(HashMap<String, Object> param);

	List<HashMap<String, Object>> getMappingRuleList(HashMap<String, Object> param);

	int delRuleMappingByPkgId(HashMap<String, Object> param);

	int addRuleMappingByPkgId(HashMap<String, Object> param);

	int delRuleMappingByPkgIds(HashMap<String, Object> param);
}
