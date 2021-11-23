package egovframework.ktds.targetai.mapper;

import java.util.HashMap;
import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("dashboardMapper")
public interface DashboardMapper {

	List<String> getChannelNmList(HashMap<String, Object> param);

	List<HashMap<String, Object>> ibCharDataListByChannelNm(HashMap<String, Object> param);

	List<HashMap<String, Object>> obCharDataListByChannelNm(HashMap<String, Object> param);

}
