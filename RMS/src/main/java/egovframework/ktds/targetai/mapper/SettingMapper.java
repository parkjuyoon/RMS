package egovframework.ktds.targetai.mapper;

import java.util.HashMap;
import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("settingMapper")
public interface SettingMapper {

	List<HashMap<String, Object>> getFuncList();

	List<HashMap<String, Object>> getParamInfo(HashMap<String, Object> param);

	HashMap<String, Object> getFactorById(HashMap<String, Object> param);

	void addFunctionFactor(HashMap<String, Object> param);

	void addFunctionParameter(HashMap<String, Object> param);

	void updateFunctionFactor(HashMap<String, Object> param);

	void delFunctionParameter(HashMap<String, Object> param);

	int getFuncPid();

}
