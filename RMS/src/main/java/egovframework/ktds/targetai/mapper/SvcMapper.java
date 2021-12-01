package egovframework.ktds.targetai.mapper;

import java.util.HashMap;
import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("svcMapper")
public interface SvcMapper {

	List<HashMap<String, Object>> getSvcList(HashMap<String, Object> searchObj);

	int getSvcCount(HashMap<String, Object> searchObj);

	HashMap<String, Object> getSvc(HashMap<String, Object> param);

	int svcNmCheck(HashMap<String, Object> param);

	void addSvc(HashMap<String, Object> param);

	void updateSvc(HashMap<String, Object> param);

	void deleteSvcById(HashMap<String, Object> param);

	void delSvcOutputValue(HashMap<String, Object> param);

	void addSvcOutputValue(HashMap<String, Object> param);

	List<HashMap<String, Object>> getOutputValueList(HashMap<String, Object> param);

	void updatePkgId(HashMap<String, Object> param);

	void delSvcOutputValues(HashMap<String, Object> param);

	List<HashMap<String, Object>> getConPkgList(HashMap<String, Object> param);

	int getConPkgCount(HashMap<String, Object> param);

}
