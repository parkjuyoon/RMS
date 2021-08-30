package egovframework.ktds.targetai.mapper;

import java.util.HashMap;
import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("apiMapper")
public interface ApiMapper {

	HashMap<String, Object> getPkgBySvcId(String svc_id);

	void addSvclogIn(HashMap<String, Object> responseMap);

	void addSvclogOut(HashMap<String, Object> responseMap);

	void updateRspnsCd(HashMap<String, Object> param);

	List<HashMap<String, Object>> getActiveList(HashMap<String, Object> param);

	List<Integer> getRuleIdsBySvcId(String svc_id);

	List<HashMap<String, Object>> getOutPutValList(String param_svcId);

}
