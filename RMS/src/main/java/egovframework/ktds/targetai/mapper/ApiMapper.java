package egovframework.ktds.targetai.mapper;

import java.util.HashMap;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("apiMapper")
public interface ApiMapper {

	HashMap<String, Object> getActiveObj(HashMap<String, Object> param);

	HashMap<String, Object> getPkgBySvcId(String svc_id);

	void addSvclogIn(HashMap<String, Object> responseMap);

	void addSvclogOut(HashMap<String, Object> responseMap);

	void updateRspnsCd(HashMap<String, Object> param);

}
