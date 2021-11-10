package egovframework.ktds.targetai.serviceImpl;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Properties;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.ktds.drools.config.DroolsUtil;
import egovframework.ktds.targetai.mapper.ApiMapper;
import egovframework.ktds.targetai.mapper.PkgMapper;
import egovframework.ktds.targetai.mapper.RuleMapper;
import egovframework.ktds.targetai.service.RuleService;

@Service("ruleService")
public class RuleServiceImpl implements RuleService {

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
	public int ruleNmCheck(HashMap<String, Object> param) {
		return ruleDao.ruleNmCheck(param);
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
	public String saveDRL(String pkgId) {
		// 함수 import 경로
		String funcRootPath = "import static " + applicationProperties.getProperty("func.import.root_path");
		
		// PKG DRL_SOURCE 업데이트
		HashMap<String, Object> pkg = pkgDao.getPkgById(pkgId);
		List<HashMap<String, Object>> ruleList = ruleDao.getRuleListByPkgId(pkgId);
		
		String drlImport = "";
		String drlSource = "";
		
		if(ruleList.size() > 0) {
			drlImport += "package " + pkg.get("PKG_NM") + ";\n";
			drlImport += "import java.util.Map;\n";
		}
		
		for(HashMap<String, Object> m : ruleList) {
			drlSource += "rule \"" + m.get("RULE_NM") + "\"\n";
			drlSource += "	no-loop " + m.get("NO_LOOP") + "\n";
			drlSource += "	lock-on-active " + m.get("LOCK_ON_ACTIVE") + "\n";
			drlSource += "	salience " + m.get("SALIENCE") + "\n";
			drlSource += "	when\n";
			drlSource += "		$map : Map(\n";
			drlSource += "		" + String.valueOf(m.get("RULE_WHEN")).replaceAll("\n", "\n" + "		");
			
			// 삭제
//			int ruleId = (int) m.get("RULE_ID");
//			List<HashMap<String, Object>> whenList = ruleDao.getWhenList(ruleId);
//			
//			for(HashMap<String, Object> w : whenList) {
//				drlSource += "		" + w.get("ATTR_WHEN");
//				
//				if("함수".equals(w.get("FACTOR_GRP_NM"))) {
//					String factorNmEn = (String) w.get("FACTOR_NM_EN");
//					String importTxt= funcRootPath + "." + factorNmEn + "." + factorNmEn.toLowerCase() + ";\n";
//					if(!drlImport.contains(importTxt)) {
//						drlImport += importTxt;
//					}
//				}
//			}
			
			drlSource += "	)\n";
			drlSource += "	then\n";
			drlSource += "		" + m.get("RULE_THEN") + "\n";
			drlSource += "end\n\n";
		}
		
		if(ruleList.size() > 0) {
			pkg.put("DRL_SOURCE", drlImport + "\n" + drlSource);
		} else {
			pkg.put("DRL_SOURCE", "");
		}
		
		pkgDao.updateDrlSource(pkg);
		
		// 물리 DRL파일 생성
		String realPath = (String) pkg.get("PATH");
		String path = realPath;
		realPath = System.getProperty("user.home") + path;
		realPath = realPath.replace("/", File.separator).replace("\\", File.separator);
		String pkg_nm = (String) pkg.get("PKG_NM");
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
}
