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

	@Override
	public List<HashMap<String, Object>> getFactorGrpList() {
		return dao.getFactorGrpList();
	}

	@Override
	public List<String> getFactorList(HashMap<String, Object> param) {
		return dao.getFactorList(param);
	}

	@Override
	public int ruleNmCheck(HashMap<String, Object> param) {
		return dao.ruleNmCheck(param);
	}

	@Override
	public HashMap<String, Object> getFactor(HashMap<String, Object> param) {
		return dao.getFactor(param);
	}

	@Override
	public List<HashMap<String, Object>> getFactorVal(HashMap<String, Object> param) {
		return dao.getFactorVal(param);
	}

	@Override
	public void ruleSave(HashMap<String, Object> param) {
		dao.ruleSave(param);
	}

	@Override
	public void ruleAttrSave(HashMap<String, Object> param) {
		dao.ruleAttrSave(param);
	}

	@Override
	public String getDrlSource(String pkgId) {
		return dao.getDrlSource(pkgId);
	}

	@Override
	public HashMap<String, Object> getPkgById(String pkgId) {
		return dao.getPkgById(pkgId);
	}

	@Override
	public List<HashMap<String, Object>> getRuleListByPkgId(String pkgId) {
		return dao.getRuleListByPkgId(pkgId);
	}

	@Override
	public List<HashMap<String, Object>> getWhenList(int ruleId) {
		return dao.getWhenList(ruleId);
	}

	@Override
	public void updateDrlSource(HashMap<String, Object> pkg) {
		dao.updateDrlSource(pkg);
	}

	@Override
	public void updateAttrThen(HashMap<String, Object> param) {
		dao.updateAttrThen(param);
	}

	@Override
	public int pkgNmCheck(HashMap<String, Object> param) {
		return dao.pkgNmCheck(param);
	}

	@Override
	public void addPkg(HashMap<String, Object> param) {
		dao.addPkg(param);		
	}

	@Override
	public void updateDrlFileNm(HashMap<String, Object> param) {
		dao.updateDrlFileNm(param);
	}

	@Override
	public void ruleUpdate(HashMap<String, Object> param) {
		dao.ruleUpdate(param);		
	}

	@Override
	public void deleteRuleAttrById(HashMap<String, Object> param) {
		dao.deleteRuleAttrById(param);		
	}

	@Override
	public void deleteRuleById(HashMap<String, Object> param) {
		dao.deleteRuleById(param);		
	}

	@Override
	public void deleteRuleAttrByIds(HashMap<String, Object> param) {
		dao.deleteRuleAttrByIds(param);		
	}

	@Override
	public void deletePkgById(HashMap<String, Object> param) {
		dao.deletePkgById(param);		
	}

	@Override
	public List<String> getRuleIdsByPkgId(HashMap<String, Object> param) {
		return dao.getRuleIdsByPkgId(param);	
	}

	@Override
	public void updatePkg(HashMap<String, Object> param) {
		dao.updatePkg(param);		
	}

	@Override
	public List<HashMap<String, Object>> getRuleAttrByPkgId(HashMap<String, Object> param) {
		return dao.getRuleAttrByPkgId(param);
	}

	@Override
	public List<HashMap<String, Object>> getFactorFunc(HashMap<String, Object> param) {
		return dao.getFactorFunc(param);
	}

	@Override
	public void ruleFuncSave(HashMap<String, Object> param) {
		dao.ruleFuncSave(param);
	}

	@Override
	public void deleteRuleFuncById(HashMap<String, Object> param) {
		dao.deleteRuleFuncById(param);
	}

	@Override
	public List<HashMap<String, Object>> getRuleFuncList(int ruleId) {
		return dao.getRuleFuncList(ruleId);
	}

	@Override
	public void ruleFuncArgsSave(HashMap<String, Object> param) {
		dao.ruleFuncArgsSave(param);
	}

	@Override
	public List<HashMap<String, Object>> getRuleFuncArgsList(int ruleFuncId) {
		return dao.getRuleFuncArgsList(ruleFuncId);
	}

	@Override
	public void deleteRuleFuncArgsById(HashMap<String, Object> param) {
		dao.deleteRuleFuncArgsById(param);
	}

	@Override
	public void deleteRuleFuncByIds(HashMap<String, Object> param) {
		dao.deleteRuleFuncByIds(param);
	}

	@Override
	public void deleteRuleFuncArgsByIds(HashMap<String, Object> param) {
		dao.deleteRuleFuncArgsByIds(param);
	}
}
