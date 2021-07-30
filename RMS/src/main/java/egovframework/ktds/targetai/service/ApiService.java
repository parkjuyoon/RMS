package egovframework.ktds.targetai.service;

import java.util.HashMap;
import java.util.List;

public interface ApiService {

	HashMap<String, Object> getPkgBySvcId(String svc_id);

	void addSvclogIn(HashMap<String, Object> responseMap);

	void addSvclogOut(HashMap<String, Object> responseMap);

	void updateRspnsCd(HashMap<String, Object> param);

	List<HashMap<String, Object>> getActiveList(HashMap<String, Object> param);

	List<Integer> getRuleIdsBySvcId(String svc_id);

	List<HashMap<String, Object>> getFunctionByPkgId(int pkgId);

}
