package egovframework.ktds.targetai.service;

import java.util.HashMap;
import java.util.List;

public interface RuleTestService {

	List<HashMap<String, Object>> getAllPkgList();

	List<HashMap<String, Object>> getRuleAttrByPkgId(HashMap<String, Object> param);

}
