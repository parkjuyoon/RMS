package egovframework.ktds.targetai.service;

import java.util.HashMap;
import java.util.List;

public interface InheritanceService {

	List<HashMap<String, Object>> getInheritanceList(HashMap<String, Object> param);

	int getInheritanceListCount(HashMap<String, Object> param);

}
