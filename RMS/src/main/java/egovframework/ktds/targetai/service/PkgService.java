package egovframework.ktds.targetai.service;

import java.util.HashMap;
import java.util.List;

public interface PkgService {

	int getPkgCount(HashMap<String, Object> searchObj);

	List<HashMap<String, Object>> getPkgList(HashMap<String, Object> searchObj);

	List<HashMap<String, Object>> getMappingRuleList(HashMap<String, Object> param);

	List<HashMap<String, Object>> getConRuleList(HashMap<String, Object> param);

	HashMap<String, Object> getPkg(HashMap<String, Object> param);

	HashMap<String, Object> getPkgVer(HashMap<String, Object> param);

	int pkgNmCheck(HashMap<String, Object> param);

	void addPkg(HashMap<String, Object> param);

	List<HashMap<String, Object>> getDeployVerListByPkgId(HashMap<String, Object> param);

	int getDeployVerCountByPkgId(HashMap<String, Object> param);

	HashMap<String, Object> getEventInfo(HashMap<String, Object> param);

	void deletePkgById(HashMap<String, Object> param);

	HashMap<String, Object> deployVer(HashMap<String, Object> param);

	void updatePkg(HashMap<String, Object> param);
}
