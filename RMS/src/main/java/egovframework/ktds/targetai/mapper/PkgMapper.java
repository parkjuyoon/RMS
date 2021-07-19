package egovframework.ktds.targetai.mapper;

import java.util.HashMap;
import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("pkgMapper")
public interface PkgMapper {

	List<HashMap<String, Object>> getPkgList(HashMap<String, Object> searchObj);

	HashMap<String, Object> getPkg(HashMap<String, Object> param);

	int getPkgCount(HashMap<String, Object> searchObj);

	List<HashMap<String, Object>> getRuleList(HashMap<String, Object> searchObj);

	int getRuleCount(HashMap<String, Object> searchObj);

	HashMap<String, Object> getRule(HashMap<String, Object> param);

	List<HashMap<String, Object>> getFactorGrpList();

	List<String> getFactorList(HashMap<String, Object> param);

	int ruleNmCheck(HashMap<String, Object> param);

	HashMap<String, Object> getFactor(HashMap<String, Object> param);

	List<HashMap<String, Object>> getFactorVal(HashMap<String, Object> param);

	void ruleSave(HashMap<String, Object> param);

	void ruleAttrSave(HashMap<String, Object> param);

	String getDrlSource(String pkgId);

	HashMap<String, Object> getPkgById(String pkgId);

	List<HashMap<String, Object>> getRuleListByPkgId(String pkgId);

	List<HashMap<String, Object>> getWhenList(int ruleId);

	void updateDrlSource(HashMap<String, Object> pkg);

	void updateAttrThen(HashMap<String, Object> param);

	int pkgNmCheck(HashMap<String, Object> param);

	void addPkg(HashMap<String, Object> param);

	void updateDrlFileNm(HashMap<String, Object> param);

	void ruleUpdate(HashMap<String, Object> param);

	void deleteRuleAttrById(HashMap<String, Object> param);

	void deleteRuleById(HashMap<String, Object> param);

	void deleteRuleAttrByIds(HashMap<String, Object> param);

	void deletePkgById(HashMap<String, Object> param);

	List<String> getRuleIdsByPkgId(HashMap<String, Object> param);

	void updatePkg(HashMap<String, Object> param);

	List<HashMap<String, Object>> getRuleAttrByPkgId(HashMap<String, Object> param);

	List<HashMap<String, Object>> getFactorFunc(HashMap<String, Object> param);

}
