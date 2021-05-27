package egovframework.ktds.targetai.service;

import java.util.HashMap;
import java.util.List;

public interface PkgService {

	List<HashMap<String, Object>> getPkgList(HashMap<String, Object> searchObj);

	HashMap<String, Object> getPkg(HashMap<String, Object> param);

	int getPkgCount(HashMap<String, Object> searchObj);

	List<HashMap<String, Object>> getRuleList(HashMap<String, Object> searchObj);

	int getRuleCount(HashMap<String, Object> searchObj);

	HashMap<String, Object> getRule(HashMap<String, Object> param);

	List<HashMap<String, Object>> getFactorGrpList();

	List<String> getFactorList(HashMap<String, Object> param);

}
