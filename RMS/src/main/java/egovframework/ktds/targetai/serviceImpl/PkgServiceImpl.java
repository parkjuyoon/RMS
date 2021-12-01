
package egovframework.ktds.targetai.serviceImpl;

import java.time.LocalDateTime;
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
	public String getDrlSource(String pkgId) {
		return dao.getDrlSource(pkgId);
	}

	@Override
	public HashMap<String, Object> getPkgById(String pkgId) {
		return dao.getPkgById(pkgId);
	}

	@Override
	public void updateDrlSource(HashMap<String, Object> pkg) {
		dao.updateDrlSource(pkg);
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
	public void deletePkgById(HashMap<String, Object> param) {
		// PKG_VER 삭제
		dao.deletePkgVerById(param);
		// PKG 삭제
		dao.deletePkgById(param);		
		// 연결된 Rule 맵핑 정보 삭제
		dao.delRuleMappingByPkgIds(param);
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
	public List<HashMap<String, Object>> getConRuleList(HashMap<String, Object> param) {
		return dao.getConRuleList(param);
	}

	@Override
	public List<HashMap<String, Object>> getMappingRuleList(HashMap<String, Object> param) {
		return dao.getMappingRuleList(param);
	}

	@Override
	public int delRuleMappingByPkgId(HashMap<String, Object> param) {
		return dao.delRuleMappingByPkgId(param);
	}

	@Override
	public int addRuleMappingByPkgId(HashMap<String, Object> param) {
		return dao.addRuleMappingByPkgId(param);
	}

	@Override
	public int delRuleMappingByPkgIds(HashMap<String, Object> param) {
		return dao.delRuleMappingByPkgIds(param);
	}

	@Override
	public int addPkgVer(HashMap<String, Object> param) {
		return dao.addPkgVer(param);
	}

	@Override
	public List<Integer> getMappingRuleIdsByPkgId(HashMap<String, Object> param) {
		return dao.getMappingRuleIdsByPkgId(param);
	}

	@Override
	public List<HashMap<String, Object>> getDeployVerListByPkgId(HashMap<String, Object> param) {
		return dao.getDeployVerListByPkgId(param);
	}

	@Override
	public int getDeployVerCountByPkgId(HashMap<String, Object> param) {
		return dao.getDeployVerCountByPkgId(param);
	}

	@Override
	public HashMap<String, Object> deployVer(HashMap<String, Object> param) {
		HashMap<String, Object> res = new HashMap<>();
		
		// 변수 선언
		String pkgId = (String) param.get("pkgId");
		String ver = (String) param.get("ver");
		String pkgVerId = (String) param.get("pkgVerId");
		HashMap<String, Object> parameter = new HashMap<>();
		
		parameter.put("PKG_ID", pkgId);
		parameter.put("VER", ver);
		parameter.put("PKG_VER_ID", pkgVerId);
		parameter.put("NOW_DATE", LocalDateTime.now());
		
		// 기존 배포 가동종료
		dao.endDeployVer(parameter);
		
		// 선택된 배포버전으로 가동시작
		dao.startDeployVer(parameter);
		
		res = parameter;
		
		return res;
	}

	@Override
	public HashMap<String, Object> getPkgByVer(HashMap<String, Object> param) {
		return dao.getPkgByVer(param);
	}

}
