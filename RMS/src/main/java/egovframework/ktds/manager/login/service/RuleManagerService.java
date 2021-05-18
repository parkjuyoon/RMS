package egovframework.ktds.manager.login.service;

import java.util.HashMap;
import java.util.List;

public interface RuleManagerService {

	List<HashMap<String, Object>> getRuleList(HashMap<String, Object> param);

	int getRuleListTotalCnt(HashMap<String, Object> param);


}
