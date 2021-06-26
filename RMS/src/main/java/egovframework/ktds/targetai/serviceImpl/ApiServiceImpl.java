package egovframework.ktds.targetai.serviceImpl;

import java.util.HashMap;

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
	public HashMap<String, Object> getActiveObj(HashMap<String, Object> param) {
		return dao.getActiveObj(param);
	}

	@Override
	public HashMap<String, Object> getPkgBySvcId(String svc_id) {
		return dao.getPkgBySvcId(svc_id);
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


}
