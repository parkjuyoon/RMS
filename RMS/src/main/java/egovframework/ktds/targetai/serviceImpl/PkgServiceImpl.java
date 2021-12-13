
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
	public HashMap<String, Object> getPkgVer(HashMap<String, Object> param) {
		return dao.getPkgVer(param);
	}

	@Override
	public int pkgNmCheck(HashMap<String, Object> param) {
		return dao.pkgNmCheck(param);
	}

	@Override
	public void addPkg(HashMap<String, Object> param) {
		param.put("currentTime", LocalDateTime.now());
		dao.addPkg(param);
		
		// PKG_VER 저장 (신규버전은 1 부터 시작하고, 개발버전('D')으로 생성)
		param.put("pkgId", param.get("PKG_ID"));	// updatePkg.do 에서도 사용
		param.put("VER", 1);
		String drlNm = param.get("pkgNm") + "_" + param.get("PKG_ID") + "_v" + param.get("VER") +".drl";
		param.put("DRL_NM", drlNm);
		param.put("PATH", "/drl_files");
		param.put("VER_STATUS", "D");
		
		dao.addPkgVer(param);
		
		// 연결된 Rule 맵핑 정보 삭제
		int delRes = dao.delRuleMappingByPkgId(param);
		// 새로운 Rule 맵핑 연결
		List<String> ruleIds = (List<String>) param.get("mappingRuleIds");
		if(ruleIds.size() > 0) {
			dao.addRuleMappingByPkgId(param);
			
			// DRL 파일 수정
			// RULE 파일 생성 및 PKG > DRL_SOURCE 업데이트
			saveDRL(param);
		}
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
		List<String> mappingRuleIds1= dao.getMappingRuleIdsByPkgId(param);
		Collections.sort(mappingRuleIds1);
		
		List<HashMap<String, Object>> param_mappingRules = (List<HashMap<String, Object>>) param.get("mappingRuleList");
		
		List<String> mappingRuleIds2 = new ArrayList<>();
		
		for(HashMap<String, Object> m : param_mappingRules) {
			mappingRuleIds2.add((int) m.get("RULE_ID") + "_" + (int) m.get("SALIENCE"));
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
			if(param_mappingRules.size() > 0) {
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
					ver = (int) pkgDevVer.get("VER");
					param.put("VER", ver);
					
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
	public List<HashMap<String, Object>> getConRuleList(HashMap<String, Object> param) {
		return dao.getConRuleList(param);
	}

	@Override
	public List<HashMap<String, Object>> getMappingRuleList(HashMap<String, Object> param) {
		return dao.getMappingRuleList(param);
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
		// 개발중인 패키지 버전이 있는지 확인
		param.put("VER_STATUS", "D");
		HashMap<String, Object> pkgDevVer = dao.getPkgVerByStatus(param);
		
		// 개발중인 패키지 버전이 없는 경우
		if(pkgDevVer == null) {
			param.put("rtnMsg", "개발중인 패키지 버전이 없습니다.");
			return param;
			
		// 개발중인 패키지 버전이 있는 경우	
		} else {
			// 개발중인 패키지의 연결된 RULE 이 있는지 확인
			int isConRuleCnt = dao.isConRuleCnt(param);
			
			// 연결된 RULE이 없을경우 배포할 수 없음
			if(isConRuleCnt < 1) {
				param.put("rtnMsg", "RULE 연결 없이 배포할 수 없습니다.");
				return param;
			}
			
			// 운영 배포버전 가동종료
			param.put("currentTime", LocalDateTime.now());
			dao.endDeployVer(param);
			// 개발 배포버전으로 가동시작
			dao.startDeployVer(param);
			param.put("rtnMsg", "개발중인 패키지로 배포완료 했습니다.");
			// PKG 테이블의 DRL_NM, VER, PATH을 운영 배포버전 정보로 업데이트
			pkgDevVer.put("currentTime", LocalDateTime.now());
			pkgDevVer.put("REG_USER_ID", param.get("REG_USER_ID"));
			dao.updatePkgRealVer(pkgDevVer);
		}
		
		return param;
	}

	@Override
	public HashMap<String, Object> getEventInfo(HashMap<String, Object> param) {
		HashMap<String, Object> rtnMap = new HashMap<>();
		
		// 해당 패키지 버전의 RULE(이벤트) 목록 조회
		List<HashMap<String, Object>> eventList = dao.getEventList(param);
		// 해당 패키지 버전의 RULE(이벤트) 목록 개수 조회
		int eventCount = dao.getEventListCount(param);
		
		rtnMap.put("eventList", eventList);
		rtnMap.put("eventCount", eventCount);
		
		return rtnMap;
	}
}
