package egovframework.ktds.manager.login.mapper;

import java.util.HashMap;
import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("ruleEditorMapper")
public interface RuleEditorMapper {

	public List<HashMap<String, Object>> getFactorGrpList();

	public List<String> getFactorList(HashMap<String, Object> param);

	public List<HashMap<String, Object>> getFactorVal(HashMap<String, Object> param);

	public String getColumnType(HashMap<String, Object> param);

	public HashMap<String, Object> test(String custAccNo);

	public void insertDrlInfo(HashMap<String, Object> drl_info);

	public void insertRuleInfo(HashMap<String, Object> param);

	public int gerLastRuleAddCnt(HashMap<String, Object> param);

	public int getRuleNameCheck(HashMap<String, Object> param);

	public HashMap<String, Object> getFactor(HashMap<String, Object> param);

}
