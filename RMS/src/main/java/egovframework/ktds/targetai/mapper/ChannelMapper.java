package egovframework.ktds.targetai.mapper;

import java.util.HashMap;
import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("channelMapper")
public interface ChannelMapper {

	List<HashMap<String, Object>> getChannelList(HashMap<String, Object> searchObj);

	int getChannelCount(HashMap<String, Object> searchObj);

}
