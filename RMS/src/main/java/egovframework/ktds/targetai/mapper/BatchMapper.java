package egovframework.ktds.targetai.mapper;

import java.util.HashMap;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper
public interface BatchMapper {

	int addInRealStat(HashMap<String, Object> statInfo);

	int addObRealStat(HashMap<String, Object> statInfo);

	void addStatInfo();

	HashMap<String, Object> getStatInfo();

	void updateIbApplyYn(HashMap<String, Object> statInfo);

	void updateObApplyYn(HashMap<String, Object> statInfo);
}
