package egovframework.ktds.targetai.serviceImpl;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.ktds.targetai.mapper.ChannelMapper;
import egovframework.ktds.targetai.service.ChannelService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service("channelService")
public class ChannelServiceImpl extends EgovAbstractServiceImpl implements ChannelService{

	@Resource(name = "channelMapper")
	private ChannelMapper dao;
	
	@Override
	public List<HashMap<String, Object>> getChannelList(HashMap<String, Object> searchObj) {
		return dao.getChannelList(searchObj);
	}

	@Override
	public int getChannelCount(HashMap<String, Object> searchObj) {
		return dao.getChannelCount(searchObj);
	}

}
