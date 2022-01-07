package egovframework.ktds.targetai.serviceImpl;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.ktds.targetai.mapper.InheritanceMapper;
import egovframework.ktds.targetai.service.InheritanceService;

@Service("inheritanceService")
public class InheritanceServiceImpl implements InheritanceService {
	
	@Resource(name = "inheritanceMapper")
	private InheritanceMapper ihDao;

	@Override
	public List<HashMap<String, Object>> getInheritanceList(HashMap<String, Object> param) {
		return ihDao.getInheritanceList(param);
	}

	@Override
	public int getInheritanceListCount(HashMap<String, Object> param) {
		return ihDao.getInheritanceListCount(param);
	}
}
