
package egovframework.ktds.targetai.serviceImpl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.ktds.targetai.mapper.PkgMapper;
import egovframework.ktds.targetai.service.PkgService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service("pkgService")
public class PkgServiceImpl extends RuleServiceImpl implements PkgService {

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
		// RULE 맵핑정보가 변경되었는지 확인
		List<Integer> mappingRuleIds1= dao.getMappingRuleIdsByPkgId(param);
		Collections.sort(mappingRuleIds1);
		List<Object> param_mappingRuleIds = (List<Object>) param.get("mappingRuleIds");
		List<Integer> mappingRuleIds2 = new ArrayList<>();
		
		for(Object id : param_mappingRuleIds) {
			mappingRuleIds2.add(Integer.parseInt(String.valueOf(id)));
		}
		Collections.sort(mappingRuleIds2);
		
		// RULE MAPPING 정보가 변경되었는지 확인
		boolean ruleMappingEditTF = Arrays.deepEquals(mappingRuleIds1.toArray(), mappingRuleIds2.toArray());
		
		// RULE 연결 정보가 변경되었으면 패키지 버전 업데이트
		if(!ruleMappingEditTF) {
			param.put("currentTime", LocalDateTime.now());
			// 개발중인 패키지가 있는지 확인
			param.put("VER_STATUS", "D");
			HashMap<String, Object> pkgDevVer = dao.getPkgVerByStatus(param);
			String drlNm = param.get("pkgNm") + "_" + param.get("pkgId") + "_v";
			int ver = 0;
					
			// 개발중인 패키지가 없는 경우(운영중과 종료만 있는 경우 또는 운영중만 있는 경우) 새로운 개발버전 추가
			if(pkgDevVer == null) {
				param.put("VER_STATUS", "R");
				HashMap<String, Object> pkgRealVer = dao.getPkgVerByStatus(param);
				
				ver = (int) pkgRealVer.get("VER") + 1;
				drlNm += ver + ".drl";
				param.put("DRL_NM", drlNm);
				param.put("VER_STATUS", "D");
				param.put("VER", ver);
				
				dao.addPkgVer(param);
			}
			
			// RULE 연결정보 수정
			// 새로운 RULE 연결 정보가 있을때
			if(param_mappingRuleIds.size() > 0) {
				// 개발중인 버전이 있을경우
				if(pkgDevVer != null) {
					ver = (int) pkgDevVer.get("VER");
					drlNm += ver + ".drl";
					param.put("DRL_NM", drlNm);
					param.put("VER", ver);
				}
				
				// 연결된 RULE 연결 정보 삭제
				dao.delRuleMappingByPkgId(param);
				// RULE 연결 정보 저장
				dao.addRuleMappingByPkgId(param);
				
			// 새로운 RULE 연결 정보가 없을때
			} else {
				// 개발중인 버전이 있을경우
				if(pkgDevVer != null) {
					// 연결된 RULE 연결 정보 삭제
					dao.delRuleMappingByPkgId(param);
				}
			}
			
			// DRL 소스 업데이트 및 파일 생성
			param.put("PKG_ID", param.get("pkgId"));
			saveDRL(param);
		}
		
		// 기본 패키지 정보 수정
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
	public int delRuleMappingByPkgIds(HashMap<String, Object> param) {
		return dao.delRuleMappingByPkgIds(param);
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

//	@Override
//	public void updateDrlFileNm(HashMap<String, Object> param) {
//		// TODO Auto-generated method stub
//		
//	}
//
//	@Override
//	public int delRuleMappingByPkgId(HashMap<String, Object> param) {
//		// TODO Auto-generated method stub
//		return 0;
//	}
//
//	@Override
//	public int addRuleMappingByPkgId(HashMap<String, Object> param) {
//		// TODO Auto-generated method stub
//		return 0;
//	}
//
//	@Override
//	public int addPkgVer(HashMap<String, Object> param) {
//		// TODO Auto-generated method stub
//		return 0;
//	}
//
//	@Override
//	public List<Integer> getMappingRuleIdsByPkgId(HashMap<String, Object> param) {
//		// TODO Auto-generated method stub
//		return null;
//	}
}
