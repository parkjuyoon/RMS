package egovframework.ktds.targetai.service;

import java.util.HashMap;
import java.util.List;

public interface ChannelService {

	List<HashMap<String, Object>> getChannelList(HashMap<String, Object> searchObj);

	int getChannelCount(HashMap<String, Object> searchObj);

}
