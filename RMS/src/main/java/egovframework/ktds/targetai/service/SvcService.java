package egovframework.ktds.targetai.service;

import java.util.HashMap;
import java.util.List;

public interface SvcService {

	List<HashMap<String, Object>> getSvcList(HashMap<String, Object> searchObj);

	int getSvcCount(HashMap<String, Object> searchObj);

	HashMap<String, Object> getSvc(HashMap<String, Object> param);

	int svcNmCheck(HashMap<String, Object> param);

	void addSvc(HashMap<String, Object> param);

	void updateSvc(HashMap<String, Object> param);

	void deleteSvcById(HashMap<String, Object> param);

}
