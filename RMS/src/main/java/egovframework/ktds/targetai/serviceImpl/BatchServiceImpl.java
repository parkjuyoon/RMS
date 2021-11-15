package egovframework.ktds.targetai.serviceImpl;

import java.util.HashMap;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.ktds.targetai.mapper.BatchMapper;
import egovframework.ktds.targetai.service.BatchService;

@Service("batchService")
public class BatchServiceImpl implements BatchService {

	@Resource(name = "batchMapper")
	private BatchMapper dao;

	@Override
	public void addStatInfo() {
		dao.addStatInfo();		
	}
	
	@Override
	public void addInRealStat() {
		// STAT_INFO 기준 정보 조회
		HashMap<String, Object> statInfo = dao.getStatInfo();
		dao.addInRealStat(statInfo);
		// STAT_INFO 의 IB_APPLY_YN 업데이트
		dao.updateIbApplyYn(statInfo);		
	}

	@Override
	public void addObRealStat() {
		// STAT_INFO 기준 정보 조회
		HashMap<String, Object> statInfo = dao.getStatInfo();
		dao.addInRealStat(statInfo);
		// STAT_INFO 의 OB_APPLY_YN 업데이트
		dao.updateObApplyYn(statInfo);
	}
}
