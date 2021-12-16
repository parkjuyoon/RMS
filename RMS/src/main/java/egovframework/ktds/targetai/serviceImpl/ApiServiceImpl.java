package egovframework.ktds.targetai.serviceImpl;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.ktds.targetai.mapper.ApiMapper;
import egovframework.ktds.targetai.service.ApiService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service("apiService")
public class ApiServiceImpl extends EgovAbstractServiceImpl implements ApiService {

	@Resource(name = "apiMapper")
	private ApiMapper dao;

	@Override
	public HashMap<String, Object> getPkgBySvcId(HashMap<String, Object> param) {
		return dao.getPkgBySvcId(param);
	}

	@Override
	public void addSvclogIn(HashMap<String, Object> responseMap) {
		dao.addSvclogIn(responseMap);
	}

	@Override
	public void addSvclogOut(HashMap<String, Object> responseMap) {
		dao.addSvclogOut(responseMap);
		
	}

	@Override
	public void updateRspnsCd(HashMap<String, Object> param) {
		dao.updateRspnsCd(param);
	}

	@Override
	public List<HashMap<String, Object>> getActiveList(HashMap<String, Object> param) {
		return dao.getActiveList(param);
	}

	@Override
	public List<Integer> getRuleIdsBySvcId(HashMap<String, Object> param) {
		return dao.getRuleIdsBySvcId(param);
	}

	@Override
	public List<HashMap<String, Object>> getOutPutValList(String param_svcId) {
		return dao.getOutPutValList(param_svcId);
	}

	@Override
	public HashMap<String, Object> getSvcListPop(HashMap<String, Object> searchObj) {
		HashMap<String, Object> rtnMap = new HashMap<>();
		List<HashMap<String, Object>> svcList = dao.getSvcList(searchObj);
		int totalCount = dao.getSvcCount(searchObj);
		rtnMap.put("svcList", svcList);
		rtnMap.put("svcCount", totalCount);
		
		return rtnMap;
	}

}
