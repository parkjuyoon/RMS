package egovframework.ktds.targetai.serviceImpl;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.ktds.targetai.mapper.DashboardMapper;
import egovframework.ktds.targetai.service.DashboardService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service("dashboardService")
public class DashboardServiceImpl extends EgovAbstractServiceImpl implements DashboardService {

	@Resource(name = "dashboardMapper")
	private DashboardMapper dao;

	@Override
	public List<String> getChannelNmList(HashMap<String, Object> param) {
		return dao.getChannelNmList(param);
	}

	@Override
	public List<HashMap<String, Object>> ibCharDataListByChannelNm(HashMap<String, Object> param) {
		return dao.ibCharDataListByChannelNm(param);
	}

	@Override
	public List<HashMap<String, Object>> obCharDataListByChannelNm(HashMap<String, Object> param) {
		return dao.obCharDataListByChannelNm(param);
	}
}
