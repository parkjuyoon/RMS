package egovframework.ktds.targetai.service;

import java.util.HashMap;

public interface ApiService {

	HashMap<String, Object> getActiveObj(HashMap<String, Object> param);

	HashMap<String, Object> getPkgBySvcId(String svc_id);

	void addSvclogIn(HashMap<String, Object> responseMap);

	void addSvclogOut(HashMap<String, Object> responseMap);

	void updateRspnsCd(HashMap<String, Object> param);

}
