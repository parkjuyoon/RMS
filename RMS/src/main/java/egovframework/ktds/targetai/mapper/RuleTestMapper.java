package egovframework.ktds.targetai.mapper;

import java.util.HashMap;
import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("ruleTestMapper")
public interface RuleTestMapper {

	List<HashMap<String, Object>> getAllPkgList();

	List<HashMap<String, Object>> getRuleAttrByPkgId(HashMap<String, Object> param);

}
