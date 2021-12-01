package egovframework.ktds.targetai.service;

import java.util.HashMap;
import java.util.List;

public interface PkgService {

	List<HashMap<String, Object>> getPkgList(HashMap<String, Object> searchObj);

	HashMap<String, Object> getPkg(HashMap<String, Object> param);

	int getPkgCount(HashMap<String, Object> searchObj);

	String getDrlSource(String pkgId);

	HashMap<String, Object> getPkgById(String pkgId);

	void updateDrlSource(HashMap<String, Object> pkg);

	int pkgNmCheck(HashMap<String, Object> map);

	void addPkg(HashMap<String, Object> param);

	void updateDrlFileNm(HashMap<String, Object> param);

	void deletePkgById(HashMap<String, Object> param);

	void updatePkg(HashMap<String, Object> param);

	List<HashMap<String, Object>> getRuleAttrByPkgId(HashMap<String, Object> param);

	List<HashMap<String, Object>> getConRuleList(HashMap<String, Object> param);

	List<HashMap<String, Object>> getMappingRuleList(HashMap<String, Object> param);

	int delRuleMappingByPkgId(HashMap<String, Object> param);

	int addRuleMappingByPkgId(HashMap<String, Object> param);

	int delRuleMappingByPkgIds(HashMap<String, Object> param);

	int addPkgVer(HashMap<String, Object> param);

	List<Integer> getMappingRuleIdsByPkgId(HashMap<String, Object> param);

	List<HashMap<String, Object>> getDeployVerListByPkgId(HashMap<String, Object> param);

	int getDeployVerCountByPkgId(HashMap<String, Object> param);

	HashMap<String, Object> deployVer(HashMap<String, Object> param);

	HashMap<String, Object> getPkgByVer(HashMap<String, Object> param);

}
