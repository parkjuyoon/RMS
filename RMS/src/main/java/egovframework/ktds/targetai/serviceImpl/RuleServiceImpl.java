package egovframework.ktds.targetai.serviceImpl;

import java.io.File;
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
	public void ruleUpdate(HashMap<String, Object> param) {
		ruleDao.ruleUpdate(param);		
	}

	@Override
	public void ruleSave(HashMap<String, Object> param) {
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
}
