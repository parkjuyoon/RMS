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
	public List<HashMap<String, Object>> getParamInfo(HashMap<String, Object> param) {
		return dao.getParamInfo(param);
	}

	@Override
	public HashMap<String, Object> getSourceInfo(HashMap<String, Object> param) {
		return dao.getSourceInfo(param);
	}

	@Override
	public HashMap<String, Object> getFactorById(HashMap<String, Object> param) {
		return dao.getFactorById(param);
	}

	@Override
	public void addFunctionFactor(HashMap<String, Object> param) {
		dao.addFunctionFactor(param);
	}

	@Override
	public void addFunctionParameter(HashMap<String, Object> param) {
		dao.addFunctionParameter(param);
	}

	@Override
	public void addFunctionSource(HashMap<String, Object> param) {
		dao.addFunctionSource(param);
	}

	@Override
	public void updateFunctionFactor(HashMap<String, Object> param) {
		dao.updateFunctionFactor(param);
	}

	@Override
	public void updateFunctionParameter(HashMap<String, Object> param) {
		dao.updateFunctionParameter(param);
	}

	@Override
	public void updateFunctionSource(HashMap<String, Object> param) {
		dao.updateFunctionSource(param);
	}

}
