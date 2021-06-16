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

}
