package egovframework.ktds.targetai.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Properties;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.ktds.targetai.mapper.InheritanceMapper;
import egovframework.ktds.targetai.mapper.RuleMapper;
import egovframework.ktds.targetai.service.InheritanceService;

@Service("inheritanceService")
public class InheritanceServiceImpl implements InheritanceService {
	
	@Resource(name = "inheritanceMapper")
	private InheritanceMapper ihDao;
	
	@Resource(name = "ruleMapper")
	private RuleMapper ruleDao;
	
	@Override
	public List<HashMap<String, Object>> getInheritanceList(HashMap<String, Object> param) {
		return ihDao.getInheritanceList(param);
	}

	@Override
	public int getInheritanceListCount(HashMap<String, Object> param) {
		return ihDao.getInheritanceListCount(param);
	}

	@Override
	public HashMap<String, Object> getSerializeInfo(HashMap<String, Object> param) {
		HashMap<String, Object> serializeInfo = new HashMap<>();
		HashMap<String, Object> pMap = new HashMap<>();
		
		// Master Rule (상속중인 RULE)
		pMap.put("ruleId", param.get("masterRuleId"));
		pMap.put("ruleVer", param.get("masterRuleVer"));
		HashMap<String, Object> masterRule = ruleDao.getRule(pMap);
		
		// Slave Rule (상속받은 RULE)
		pMap.put("ruleId", param.get("slaveRuleId"));
		pMap.put("ruleVer", param.get("slaveRuleVer"));
		HashMap<String, Object> realMasterRule = ruleDao.getRule(pMap);
		
		// Master Rule (현재 운영중인 RULE)
		pMap.put("ruleId", param.get("masterRuleId"));
		pMap.put("ruleVer", param.get("masterRuleRealVer"));
		HashMap<String, Object> slaveRule = ruleDao.getRule(pMap);
		
		serializeInfo.put("masterRule", masterRule);
		serializeInfo.put("realMasterRule", realMasterRule);
		serializeInfo.put("slaveRule", slaveRule);
		
		return serializeInfo;
	}

}
