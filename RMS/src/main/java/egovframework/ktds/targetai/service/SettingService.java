package egovframework.ktds.targetai.service;

import java.util.HashMap;
import java.util.List;

public interface SettingService {

	List<HashMap<String, Object>> getFuncList();

	List<HashMap<String, Object>> getImportInfo(HashMap<String, Object> param);

	List<HashMap<String, Object>> getParamInfo(HashMap<String, Object> param);

	HashMap<String, Object> getSourceInfo(HashMap<String, Object> param);

}
