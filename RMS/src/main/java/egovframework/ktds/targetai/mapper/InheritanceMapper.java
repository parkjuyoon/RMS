package egovframework.ktds.targetai.mapper;

import java.util.HashMap;
import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("inheritanceMapper")
public interface InheritanceMapper {

	List<HashMap<String, Object>> getInheritanceList(HashMap<String, Object> param);

	int getInheritanceListCount(HashMap<String, Object> param);

}
