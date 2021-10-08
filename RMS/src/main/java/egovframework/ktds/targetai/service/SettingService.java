package egovframework.ktds.targetai.service;

import java.util.HashMap;
import java.util.List;

public interface SettingService {

	List<HashMap<String, Object>> getFuncList();

	List<HashMap<String, Object>> getParamInfo(HashMap<String, Object> param);

	HashMap<String, Object> getFactorById(HashMap<String, Object> param);

	void addFunctionFactor(HashMap<String, Object> param);

	void addFunctionParameter(HashMap<String, Object> param);

	void updateFunctionFactor(HashMap<String, Object> param);

	void updateFunctionParameter(HashMap<String, Object> param);

	int getFuncPid();

}
