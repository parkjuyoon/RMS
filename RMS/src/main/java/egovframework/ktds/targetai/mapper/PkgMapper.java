package egovframework.ktds.targetai.mapper;

import java.util.HashMap;
import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("pkgMapper")
public interface PkgMapper {

	List<HashMap<String, Object>> getPkgList(HashMap<String, Object> searchObj);

	HashMap<String, Object> getPkg(HashMap<String, Object> param);

	int getPkgCount(HashMap<String, Object> searchObj);

	List<HashMap<String, Object>> getRuleList(HashMap<String, Object> searchObj);

	int getRuleCount(HashMap<String, Object> searchObj);

	HashMap<String, Object> getRule(HashMap<String, Object> param);

	List<HashMap<String, Object>> getFactorGrpList();

	List<String> getFactorList(HashMap<String, Object> param);

}
