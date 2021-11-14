package egovframework.ktds.targetai.serviceImpl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.ktds.targetai.mapper.DashboardMapper;
import egovframework.ktds.targetai.service.DashboardService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service("dashboardService")
public class DashboardServiceImpl extends EgovAbstractServiceImpl implements DashboardService {

	@Resource(name = "dashboardMapper")
	private DashboardMapper dbdao;
}
