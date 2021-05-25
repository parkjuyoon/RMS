package egovframework.ktds.targetai.serviceImpl;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.ktds.targetai.mapper.PkgMapper;
import egovframework.ktds.targetai.service.PkgService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service("pkgService")
public class PkgServiceImpl extends EgovAbstractServiceImpl implements PkgService {

	@Resource(name = "pkgMapper")
	private PkgMapper dao;

	@Override
	public List<HashMap<String, Object>> getPkgList(HashMap<String, Object> searchObj) {
		return dao.getPkgList(searchObj);
	}

	@Override
	public HashMap<String, Object> getPkg(HashMap<String, Object> param) {
		return dao.getPkg(param);
	}

	@Override
	public int getPkgCount(HashMap<String, Object> searchObj) {
		return dao.getPkgCount(searchObj);
	}

	@Override
	public List<HashMap<String, Object>> getRuleList(HashMap<String, Object> searchObj) {
		return dao.getRuleList(searchObj);
	}

	@Override
	public int getRuleCount(HashMap<String, Object> searchObj) {
		return dao.getRuleCount(searchObj);
	}

	@Override
	public HashMap<String, Object> getRule(HashMap<String, Object> param) {
		return dao.getRule(param);
	}
}
