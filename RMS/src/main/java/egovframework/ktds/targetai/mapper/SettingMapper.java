package egovframework.ktds.targetai.mapper;

import java.util.HashMap;
import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("settingMapper")
public interface SettingMapper {

	List<HashMap<String, Object>> getFuncList();

	List<HashMap<String, Object>> getImportInfo(HashMap<String, Object> param);

	List<HashMap<String, Object>> getParamInfo(HashMap<String, Object> param);

	HashMap<String, Object> getSourceInfo(HashMap<String, Object> param);

}
