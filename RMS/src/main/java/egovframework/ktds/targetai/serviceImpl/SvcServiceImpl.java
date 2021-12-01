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

	@Override
	public void addSvc(HashMap<String, Object> param) {
		dao.addSvc(param);		
	}

	@Override
	public void updateSvc(HashMap<String, Object> param) {
		dao.updateSvc(param);		
	}

	@Override
	public void deleteSvcById(HashMap<String, Object> param) {
		dao.deleteSvcById(param);		
	}

	@Override
	public void addSvcOutputValue(HashMap<String, Object> param) {
		dao.addSvcOutputValue(param);		
	}

	@Override
	public void delSvcOutputValue(HashMap<String, Object> param) {
		dao.delSvcOutputValue(param);		
	}

	@Override
	public List<HashMap<String, Object>> getOutputValueList(HashMap<String, Object> param) {
		return dao.getOutputValueList(param);
	}

	@Override
	public void updatePkgId(HashMap<String, Object> param) {
		dao.updatePkgId(param);
	}

	@Override
	public void delSvcOutputValues(HashMap<String, Object> param) {
		dao.delSvcOutputValues(param);
	}

	@Override
	public List<HashMap<String, Object>> getConPkgList(HashMap<String, Object> param) {
		return dao.getConPkgList(param);
	}

	@Override
	public int getConPkgCount(HashMap<String, Object> param) {
		return dao.getConPkgCount(param);
	}

}
