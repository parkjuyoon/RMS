package egovframework.ktds.targetai.mapper;

import java.util.HashMap;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper
public interface BatchMapper {

	void addInRealStat(HashMap<String, Object> statInfo);

	void addObRealStat(HashMap<String, Object> statInfo);

	void addStatInfo();

	HashMap<String, Object> getStatInfo();
}
