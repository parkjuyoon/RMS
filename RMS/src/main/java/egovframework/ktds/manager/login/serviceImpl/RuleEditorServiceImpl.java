package egovframework.ktds.manager.login.serviceImpl;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.ktds.manager.login.mapper.RuleEditorMapper;
import egovframework.ktds.manager.login.service.RuleEditorService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service("ruleEditorService")
public class RuleEditorServiceImpl extends EgovAbstractServiceImpl implements RuleEditorService {

//	@Resource(name = "ruleEditorMapper")
	private RuleEditorMapper dao;

	@Override
	public List<HashMap<String, Object>> getFactorGrpList() {
		return dao.getFactorGrpList();
	}

	@Override
	public List<String> getFactorList(HashMap<String, Object> param) {
		return dao.getFactorList(param);
	}

	@Override
	public List<HashMap<String, Object>> getFactorVal(HashMap<String, Object> param) {
		return dao.getFactorVal(param);
	}

	@Override
	public void insertRuleInfo(HashMap<String, Object> param) {
		dao.insertRuleInfo(param);
	}

	@Override
	public int getRuleNameCheck(HashMap param) {
		return dao.getRuleNameCheck(param);
	}

	@Override
	public HashMap<String, Object> getFactor(HashMap<String, Object> param) {
		return dao.getFactor(param);
	}

	@Override
	public void insertRuleAttr(HashMap<String, Object> param) {
		dao.insertRuleAttr(param);
	}

	@Override
	public HashMap getPkgById(String pkgId) {
		return dao.getPkgById(pkgId);
	}

	@Override
	public List<HashMap> getRuleList(String pkgId) {
		return dao.getRuleList(pkgId);
	}

	@Override
	public List<HashMap> getWhenList(int ruleId) {
		return dao.getWhenList(ruleId);
	}

	@Override
	public void updateDrlSource(HashMap drlSource) {
		dao.updateDrlSource(drlSource);
	}
}
