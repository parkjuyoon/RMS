package egovframework.ktds.targetai.serviceImpl;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.ktds.targetai.mapper.SvcMapper;
import egovframework.ktds.targetai.service.SvcService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service("svcService")
public class SvcServiceImpl extends EgovAbstractServiceImpl implements SvcService {

	@Resource(name = "svcMapper")
	private SvcMapper dao;

	@Override
	public List<HashMap<String, Object>> getSvcList(HashMap<String, Object> searchObj) {
		return dao.getSvcList(searchObj);
	}

	@Override
	public int getSvcCount(HashMap<String, Object> searchObj) {
		return dao.getSvcCount(searchObj);
	}

	@Override
	public HashMap<String, Object> getSvc(HashMap<String, Object> param) {
		return dao.getSvc(param);
	}

	@Override
	public int svcNmCheck(HashMap<String, Object> param) {
		return dao.svcNmCheck(param);
	}

}
