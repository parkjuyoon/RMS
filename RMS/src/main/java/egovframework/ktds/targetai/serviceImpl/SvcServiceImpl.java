package egovframework.ktds.targetai.serviceImpl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.ktds.targetai.mapper.SvcMapper;
import egovframework.ktds.targetai.service.SvcService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service("svcService")
public class SvcServiceImpl extends EgovAbstractServiceImpl implements SvcService {

	@Resource(name = "svcMapper")
	private SvcMapper dao;

}
