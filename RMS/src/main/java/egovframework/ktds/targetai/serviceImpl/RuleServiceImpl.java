package egovframework.ktds.targetai.serviceImpl;

import java.io.File;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Properties;

import javax.annotation.Resource;

import org.kie.api.runtime.KieSession;
import org.springframework.stereotype.Service;

import egovframework.ktds.drools.config.DroolsUtil;
import egovframework.ktds.targetai.mapper.PkgMapper;
import egovframework.ktds.targetai.mapper.RuleMapper;
import egovframework.ktds.targetai.service.RuleService;

@Service("ruleService")
public class RuleServiceImpl extends ApiServiceImpl implements RuleService {

	@Resource(name = "pkgMapper")
	private PkgMapper pkgDao;
	
	@Resource(name = "ruleMapper")
	private RuleMapper ruleDao;
	
	@Resource(name = "applicationProperties")
	protected Properties applicationProperties;
	
	@Override
	public List<HashMap<String, Object>> getRuleList(HashMap<String, Object> searchObj) {
		return ruleDao.getRuleList(searchObj);
	}
	
	@Override
	public int getRuleCount(HashMap<String, Object> searchObj) {
		return ruleDao.getRuleCount(searchObj);
	}
	
	@Override
	public HashMap<String, Object> getRule(HashMap<String, Object> param) {
		return ruleDao.getRule(param);
	}
	
	@Override
	public List<HashMap<String, Object>> getFactorList(HashMap<String, Object> param) {
		return ruleDao.getFactorList(param);
	}
	
	@Override
	public List<HashMap<String, Object>> getFactorFuncArgs(HashMap<String, Object> param) {
		return ruleDao.getFactorFuncArgs(param);
	}

	@Override
	public HashMap<String, Object> getFactorById(HashMap<String, Object> param) {
		return ruleDao.getFactorById(param);
	}
	
	@Override
	public List<HashMap<String, Object>> getFactorVal(HashMap<String, Object> param) {
		return ruleDao.getFactorVal(param);
	}
	
	@Override
	public void updateAttrThen(HashMap<String, Object> param) {
		ruleDao.updateAttrThen(param);
	}
	
	@Override
	public int ruleUpdate(HashMap<String, Object> param) {
		// 개발버전이 있는지 확인한다.
		int cnt = ruleDao.getRuleDevVer(param);
		int ruleVer = 0;
		// 개발버전이 있으면 개발버전을 수정하고
		if(cnt > 0) {
			ruleDao.ruleUpdate(param);	
			ruleVer = Integer.parseInt((String) param.get("ruleVer"));
			
		// 운영버전만 있을때 개발버전을 추가한다.
		} else {
			ruleVer = Integer.parseInt((String) param.get("ruleVer")) + 1;
			param.put("ruleVer", ruleVer);
			ruleDao.ruleSave(param);
		}
		
		return ruleVer;
	}

	@Override
	public void ruleSave(HashMap<String, Object> param) {
		// 마지막 RULE 아이디 조회해서 param 에 넣은 후 신규룰 저장한다.
		int lastRuleId = ruleDao.getLastRule();
		param.put("ruleId", lastRuleId + 1);
		ruleDao.ruleSave(param);
	}

	@Override
	public String saveDRL(HashMap<String, Object> pkg) {
		// PKG DRL_SOURCE 업데이트
		String pkg_nm = (String) pkg.get("PKG_NM");
		pkg_nm = (pkg_nm == null ? (String) pkg.get("pkgNm") : pkg_nm);
		
		String apicall = (String) pkg.get("apicall");
		
		if(apicall == null) {
			List<HashMap<String, Object>> ruleList = ruleDao.getRuleListByPkgVer(pkg);
			
			String drlImport = "";
			String drlSource = "";
			
			if(ruleList.size() > 0) {
				drlImport += "package " + pkg_nm + ";\n";
				drlImport += "import java.util.Map;\n";
			}
			
			for(HashMap<String, Object> m : ruleList) {
				
				drlSource += "rule \"" + m.get("RULE_NM") + "\"\n";
				drlSource += "	no-loop " + m.get("NO_LOOP") + "\n";
				drlSource += "	lock-on-active " + m.get("LOCK_ON_ACTIVE") + "\n";
				drlSource += "	salience " + m.get("SALIENCE") + "\n";
				drlSource += "	when\n";
				drlSource += "		$map : Map(\n";
				
				String ruleWhen = String.valueOf(m.get("RULE_WHEN")).replaceAll("\n", "\n" + "		");
				ruleWhen = ruleWhen.replaceAll("#\\{", "\\$map.get(\"").replaceAll("\\}", "\")");
				
				drlSource += "		" + ruleWhen;
				
				// 함수 import 정보 추가
				if(m.get("FUNC_IMPORTS") != null) {
					String funcImport = (String) m.get("FUNC_IMPORTS");
					String[] funcImports = funcImport.split("\n");
					
					for(String s : funcImports) {
						if(!drlImport.contains(s)) {
							drlImport += s + "\n";
						}
					}
				}
				
				drlSource += "	)\n";
				drlSource += "	then\n";
				drlSource += "		" + m.get("RULE_THEN") + "\n";
				drlSource += "		$map.put(\"salience_"+ m.get("RULE_ID") + "\", " + m.get("SALIENCE") +");\n";
				drlSource += "end\n\n";
			}
			
			if(ruleList.size() > 0) {
				pkg.put("DRL_SOURCE", drlImport + "\n" + drlSource);
			} else {
				pkg.put("DRL_SOURCE", "");
			}
		}
		
		pkgDao.updateDrlSource(pkg);
		
		// 물리 DRL파일 생성
		String realPath = (String) pkg.get("PATH");
		String path = realPath;
		realPath = System.getProperty("user.home") + path;
		realPath = realPath.replace("/", File.separator).replace("\\", File.separator);
		
		String drl_nm = (String) pkg.get("DRL_NM");
		String drl_source = (String) pkg.get("DRL_SOURCE");
		
		DroolsUtil.outputDrl(realPath, pkg_nm, drl_nm, drl_source);
		
		path += "/" + pkg_nm + "/" + drl_nm;
		
		return path;
	}

	@Override
	public void deleteRuleById(HashMap<String, Object> param) {
		ruleDao.deleteRuleById(param);
	}

	@Override
	public void delRuleMappingByRuleIds(HashMap<String, Object> param) {
		ruleDao.delRuleMappingByRuleIds(param);
	}

	@Override
	public HashMap<String, Object> ruleTest(HashMap<String, Object> param) {
		// 단위테스트 할 RULE DRL 소스 만듦.
		HashMap<String, Object> rule = ruleDao.getRule(param);
		
		String drlSource = "";
		
		drlSource += "package " + param.get("rootPath") + ";\n";
		drlSource += "import java.util.Map;\n";
		if(rule.get("FUNC_IMPORTS") != null) {
			drlSource += (String) rule.get("FUNC_IMPORTS");
		}
		
		drlSource += "\n";

		drlSource += "rule \"" + rule.get("RULE_NM") + "\"\n";
		drlSource += "	no-loop " + rule.get("NO_LOOP") + "\n";
		drlSource += "	lock-on-active " + rule.get("LOCK_ON_ACTIVE") + "\n";
		drlSource += "	salience 1\n";
		drlSource += "	when\n";
		drlSource += "		$map : Map(\n";
		
		String ruleWhen = String.valueOf(rule.get("RULE_WHEN")).replaceAll("\n", "\n" + "		");
		ruleWhen = ruleWhen.replaceAll("#\\{", "\\$map.get(\"").replaceAll("\\}", "\")");
		
		drlSource += "		" + ruleWhen;
		
		drlSource += "	)\n";
		drlSource += "	then\n";
		drlSource += "		$map.put(\"result\", \"Y\");\n";
		
		drlSource += "end\n\n";
		
		// DRL 파일 물리적으로 생성
		// 사번으로 임시 DRL 파일 물리적 생성
		String realPath = (String) param.get("realPath");
		String package_nm = (String) param.get("package_nm");
		String drl_file_nm = (String) param.get("drl_file_nm");
		DroolsUtil.outputDrl(realPath, package_nm, drl_file_nm, drlSource);
		
		// Drools 세션 생성
		KieSession kieSession = DroolsUtil.getKieSession(realPath += "/" + package_nm + "/" + drl_file_nm);
		
		// 테스트 할 고객 정보 조회
		HashMap<String, Object> custInfo = new HashMap<>();
		String custNo = (String) param.get("custNo");
		custInfo.put("val", custNo);
		List<HashMap<String, Object>> activeList = getActiveList(custInfo);
		
		int cnt = 0;
		try {
		for(HashMap<String, Object> activeMap : activeList) {
			kieSession.insert(activeMap);
			kieSession.fireAllRules();
			
			if(activeMap.get("result") != null) {
				cnt++;
			}
		}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		// drools 세션 dispose
		kieSession.dispose();
		
		HashMap<String, Object> rtnMap = new HashMap<>();
		String resMsg = "고객의 " + activeList.size() + "개 계약정보 중 " + cnt + "건에 대하여 추천";
		rtnMap.put("resMsg", resMsg);
		
		return rtnMap;
	}

	@Override
	public int ruleNmDupCheck(HashMap<String, Object> param) {
		return ruleDao.ruleNmDupCheck(param);
	}

	@Override
	public List<HashMap<String, Object>> getRuleVerList(HashMap<String, Object> param) {
		return ruleDao.getRuleVerList(param);
	}

	@Override
	public int getRuleVerCount(HashMap<String, Object> param) {
		return ruleDao.getRuleVerCount(param);
	}

	@Override
	public HashMap<String, Object> getConPkg(HashMap<String, Object> param) {
		// 현재 RULE 의 운영버전이 패키지에 연결되어있는지 확인하고 연결되어 있으면 연결정보 조회한다.
		List<HashMap<String, Object>> conPkgList = ruleDao.getConPkgList(param);
		int conPkgListCnt = ruleDao.getConPkgListCnt(param);
		
		HashMap<String, Object> rtnMap = new HashMap<>();
		rtnMap.put("conPkgList", conPkgList);
		rtnMap.put("conPkgListCnt", conPkgListCnt);
		
		return rtnMap;
	}

	@Override
	public HashMap<String, Object> ruleDeploy(HashMap<String, Object> param) {
		try {
			// ----------------------- RULE 에 대한 처리 -----------------------
			// 운영 배포버전 가동종료
			param.put("VER_STATUS", "D");
			param.put("currentTime", LocalDateTime.now());
			ruleDao.endRuleDeploy(param);
			// 개발 배포버전으로 가동시작,  selectKey 해서 param 안에 ruleDeployVer 이 들어옴.
			ruleDao.startRuleDeploy(param);
	
			
			// ----------------------- 패키지에 대한 처리 -----------------------
			// 연결된 패키지가 있는 RULE의 배포
			if(param.get("conPkgList") == null) {
				return param;
			}
			
			List<HashMap<String, Object>> conPkgList = (List<HashMap<String, Object>>) param.get("conPkgList");
			
			for(HashMap<String, Object> conPkg : conPkgList) {
				
				HashMap<String, Object> pMap = new HashMap<>();
				// 운영중인 패키지에 적용
				// 기존 운영중인 패키지 종료처리
				int pkgId = (int) conPkg.get("PKG_ID");
				int ruleId = (int) conPkg.get("RULE_ID");
				
				// 패키지 버전이 1(integer) 일경우와 1.01(double)형일 경우 두개다 오기때문에 아래와 같이 처리함.
				String pkgVerType = conPkg.get("PKG_VER").getClass().getName();
				if("java.lang.Double".equals(pkgVerType)) {
					double pkgMinerVer = (double) conPkg.get("PKG_VER")  + 0.01;
					pMap.put("pkgMinerVer", pkgMinerVer);
					
				} else {
					double pkgMinerVer = (int) conPkg.get("PKG_VER")  + 0.01;
					pMap.put("pkgMinerVer", pkgMinerVer);
				}
				
				pMap.put("pkgId", pkgId);
				pMap.put("ruleId", ruleId);
				pMap.put("pkgVer", conPkg.get("PKG_VER"));
				pMap.put("ruleDeployVer", param.get("ruleDeployVer"));
				pMap.put("currentTime", LocalDateTime.now());
				pMap.put("REG_USER_ID", param.get("REG_USER_ID"));
				
				String pkgVerStatus = (String) conPkg.get("PKG_VER_STATUS");
				
				// 운영중인 패키지에 연결되어있을 경우
				if("운영중".equals(pkgVerStatus)) {
					// 기존 운영중인 패키지를 종료처리한다
					pkgDao.endDeployVer(pMap);
					// 패키지 운영버전을 마이너 +0.1로 추가한다.
					pkgDao.saveDeployMinerVer(pMap);
					
					// 수정해줘야함
					// RULE_PKG 에 RULE 과 PKG 의 연결정보도 저장한다
					pkgDao.saveRulePkgConInfo(pMap);
					
					// PKG 의 VER(현재 운영중인 버전) 을 마이너 버전으로 업데이트 한다.
					pkgDao.updatePkgMinerVer(pMap);
					
				// 개발중인 패키지에 연결되어있을 경우
				} else {
					// RULE_PKG 의 RULE 버전을 운영중인 RULE 버전으로 변경한다.
					ruleDao.updateRuleVerInRulePkg(pMap);
				}
			}
		
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return param;
	}
}
