package egovframework.ktds.targetai.serviceImpl;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.ktds.targetai.mapper.SettingMapper;
import egovframework.ktds.targetai.service.SettingService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service("settingService")
public class SettingServiceImpl extends EgovAbstractServiceImpl implements SettingService {
	
	@Resource(name = "settingMapper")
	private SettingMapper dao;

	@Override
	public List<HashMap<String, Object>> getFuncList() {
		return dao.getFuncList();
	}

	@Override
	public List<HashMap<String, Object>> getImportInfo(HashMap<String, Object> param) {
		return dao.getImportInfo(param);
	}

	@Override
	public List<HashMap<String, Object>> getParamInfo(HashMap<String, Object> param) {
		return dao.getParamInfo(param);
	}

	@Override
	public HashMap<String, Object> getSourceInfo(HashMap<String, Object> param) {
		return dao.getSourceInfo(param);
	}

}
