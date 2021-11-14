package egovframework.ktds.targetai.serviceImpl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.ktds.targetai.mapper.BatchMapper;
import egovframework.ktds.targetai.service.BatchService;

@Service("batchService")
public class BatchServiceImpl implements BatchService {

	@Resource(name = "batchMapper")
	private BatchMapper dao;

}
