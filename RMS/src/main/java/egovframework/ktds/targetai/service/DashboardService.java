package egovframework.ktds.targetai.service;

import java.util.HashMap;
import java.util.List;

public interface DashboardService {

	List<String> getChannelNmList(HashMap<String, Object> param);

	List<HashMap<String, Object>> ibCharDataListByChannelNm(HashMap<String, Object> param);

	List<HashMap<String, Object>> obCharDataListByChannelNm(HashMap<String, Object> param);

}
