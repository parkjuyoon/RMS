package egovframework.ktds.targetai.service;

import java.util.HashMap;
import java.util.List;

public interface ApiService {

	HashMap<String, Object> getPkgBySvcId(String svc_id);

	void addSvclogIn(HashMap<String, Object> responseMap);

	void addSvclogOut(HashMap<String, Object> responseMap);

	void updateRspnsCd(HashMap<String, Object> param);

	List<HashMap<String, Object>> getActiveList(HashMap<String, Object> param);

	List<Integer> getRuleIdsBySvcId(HashMap<String, Object> pkg);

	List<HashMap<String, Object>> getOutPutValList(String param_svcId);

	HashMap<String, Object> getSvcListPop(HashMap<String, Object> searchObj);

}
