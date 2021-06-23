package egovframework.ktds.targetai.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.kie.api.runtime.KieSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import egovframework.ktds.drools.config.DroolsUtil;
import egovframework.ktds.targetai.service.PkgService;
import net.sf.json.JSONException;

/**
 * @since 2021.05.25
 * @author 박주윤 차장
 *
 */
@RequestMapping("/targetai")
@Controller
public class PkgController {

	@Resource(name = "pkgService")
	protected PkgService pkgService;
	
	/**
	 * package 관리 화면 이동
	 * @param model
	 * @return /targetai/pkg.jsp
	 */
	@RequestMapping(value = "/pkg.do")
	public String main(ModelMap model) {
		return "/targetai/pkg";
	}
	
	/**
	 * package 리스트 조회
	 * @param searchObj
	 * @return pkgList, pkgCount
	 */
	@ResponseBody
	@RequestMapping(value = "/getPkgList.do", method = RequestMethod.POST)
	public HashMap<String, Object> getPkgList(@RequestBody HashMap<String, Object> searchObj) {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		List<HashMap<String, Object>> pkgList = pkgService.getPkgList(searchObj);
		int pkgCount = pkgService.getPkgCount(searchObj);
		resultMap.put("pkgList", pkgList);
		resultMap.put("pkgCount", pkgCount);
			
		return resultMap;
	}
	
	/**
	 * package 상세 조회
	 * @param PKG_ID
	 * @return pkg
	 */
	@ResponseBody
	@RequestMapping(value = "/getPkg.do", method = RequestMethod.POST)
	public HashMap<String, Object> getPkg(@RequestBody HashMap<String, Object> param) {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		HashMap<String, Object> pkg = pkgService.getPkg(param);
		resultMap.put("pkg", pkg);
		
		return resultMap;
	}
	
	/**
	 * package 명 중복 체크
	 * @param param
	 * @return boolean
	 */
	@ResponseBody
	@RequestMapping(value = "/pkgNmCheck.do", method = RequestMethod.POST)
	public boolean pkgNmCheck(@RequestBody HashMap<String, Object> param) {
		int pkgNameCnt = pkgService.pkgNmCheck(param);
		
		if(pkgNameCnt > 0) {
			return false;
		}
		
		return true;
	}
	
	/**
	 * RULE TEST OPEN 팝업 내 RULE 속성
	 * @param param
	 * @return resultMap
	 */
	@ResponseBody
	@RequestMapping(value = "/getRuleAttrByPkgId.do", method = RequestMethod.POST)
	public HashMap<String, Object> getRuleAttrByPkgId(@RequestBody HashMap<String, Object> param) {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		
		List<HashMap<String, Object>> ruleAttrList = pkgService.getRuleAttrByPkgId(param);
		
		resultMap.put("ruleAttrList", ruleAttrList);
		
		return resultMap;
	}
	
	/**
	 * RULE 테스트
	 * @param param
	 * @return resultMap
	 */
	@ResponseBody
	@RequestMapping(value = "/ruleTest.do", method = RequestMethod.POST, produces="application/text; charset=UTF-8")
	public String ruleTest(@RequestBody HashMap<String, Object> param) {
		
		try {
			
			HashMap<String, Object> paramMap = new HashMap<String, Object>();
			List<String> keyValueArr = (List<String>) param.get("keyValueArr");
			
			for(String s : keyValueArr) {
				String key = s.split(":")[0];
				String value = s.split(":")[1];
				paramMap.put(key, value);
			}
			
			// 물리 DRL파일 path
			String path = (String) param.get("drlPath");
			path = System.getProperty("user.home") + path;
			path = path.replace("/", File.separator).replace("\\", File.separator);
			
			// Drools 실행
			KieSession kieSession = DroolsUtil.getKieSession(path);
			
			kieSession.insert(paramMap);
			kieSession.fireAllRules();
			kieSession.dispose();
			
			// 결과화면에 정렬되게 보이기 위해 변환
			JSONArray resJsonArr = new JSONArray();
			
			Set<String> keySet = paramMap.keySet();
			Iterator<String> iter = keySet.iterator();
			
			while(iter.hasNext()) {
				String key = (String) iter.next();
				String value = (String) paramMap.get(key);
				
				if(key.startsWith("res_")) {
					key = key.replaceAll("res_", "");
					String ruleId = key.split("_")[0];
					String salience = key.split("_")[1];
					
					JSONObject resJson = new JSONObject();
	//				resJson.put("ruleId", ruleId);
					resJson.put("salience", salience);
					resJson.put("rule_name", value);
					
					resJsonArr.add(resJson);
				}
			}
			
			List<JSONObject> jsonValues = new ArrayList<>();
			for(int i=0; i<resJsonArr.size(); i++) {
				jsonValues.add((JSONObject)resJsonArr.get(i));
			}
			
			Collections.sort(jsonValues, new Comparator<JSONObject>() {
	
				@Override
				public int compare(JSONObject a, JSONObject b) {
					String valA = new String();
		            String valB = new String();
	
		            try {
		                valA = (String) a.get("salience");
		                valB = (String) b.get("salience");
		            } 
		            catch (JSONException e) {
		                e.printStackTrace();
		            }
	
		            return valA.compareTo(valB);
				}
			});
			
			JSONArray sortResJsonArr = new JSONArray();
			
			for(int i=0; i<resJsonArr.size(); i++) {
				jsonValues.get(i).put("order", i+1);
				String salience = (String) jsonValues.get(i).get("salience"); 
				jsonValues.get(i).put("salience", Integer.parseInt(salience));
				sortResJsonArr.add(jsonValues.get(i));
			}
			
			return sortResJsonArr.toJSONString();
		
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	/**
	 * PKG 저장
	 * @param param
	 * @return resultMap
	 */
	@ResponseBody
	@RequestMapping(value = "/addPkg.do", method = RequestMethod.POST)
	public HashMap<String, Object> addPkg(@RequestBody HashMap<String, Object> param) {
		param.put("REG_USER_ID", 1);
		param.put("PATH", "/drl_files");
		
		// PKG 저장
		pkgService.addPkg(param);
		// DRL 파일명 업데이트
		String drlNm = param.get("pkgNm") + "_" + param.get("PKG_ID") + ".drl";
		param.put("drlNm", drlNm);
		pkgService.updateDrlFileNm(param);
		
		param.put("pkgId", (int) param.get("PKG_ID"));
		HashMap<String, Object> pkg = pkgService.getPkg(param);
		
		return pkg;
	}
	
	/**
	 * PKG 수정
	 * @param param
	 * @return resultMap
	 */
	@ResponseBody
	@RequestMapping(value = "/updatePkg.do", method = RequestMethod.POST)
	public HashMap<String, Object> updatePkg(@RequestBody HashMap<String, Object> param) {
		param.put("REG_USER_ID", 1);
		// 서비스 저장
		pkgService.updatePkg(param);
		HashMap<String, Object> pkg = pkgService.getPkg(param);
		
		return pkg;
	}
	
	/**
	 * Rule 리스트 조회
	 * @param searchObj
	 * @return ruleList, ruleCount
	 */
	@ResponseBody
	@RequestMapping(value = "/getRuleList.do", method = RequestMethod.POST)
	public HashMap<String, Object> getRuleList(@RequestBody HashMap<String, Object> searchObj) {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		List<HashMap<String, Object>> ruleList = pkgService.getRuleList(searchObj);
		int ruleCount = pkgService.getRuleCount(searchObj);
		resultMap.put("ruleList", ruleList);
		resultMap.put("ruleCount", ruleCount);
		
		return resultMap;
	}
	
	/**
	 * RULE 상세 조회
	 * @param RULE_ID
	 * @return rule
	 */
	@ResponseBody
	@RequestMapping(value = "/getRule.do", method = RequestMethod.POST)
	public HashMap<String, Object> getRule(@RequestBody HashMap<String, Object> param) {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		HashMap<String, Object> rule = pkgService.getRule(param);
		resultMap.put("rule", rule);
		
		int ruleId = (int) rule.get("RULE_ID");
		List<HashMap<String, Object>> ruleAttrList = pkgService.getWhenList(ruleId);
		resultMap.put("ruleAttrList", ruleAttrList);
		
		return resultMap;
	}
	
	/**
	 * 속성 view 리스트 조회
	 * @param factor_grp_id
	 * @return factorGrpList
	 */
	@ResponseBody
	@RequestMapping(value = "/getFactorGrpList.do", method = RequestMethod.POST)
	public HashMap<String, Object> getFactorGrpList(@RequestBody HashMap<String, Object> param) {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		List<HashMap<String, Object>> factorGrpList = pkgService.getFactorGrpList();
		resultMap.put("factorGrpList", factorGrpList);
		
		return resultMap;
	}
	
	/**
	 * 속성 view 하위 요소 리스트 조회
	 * @param factor_grp_id
	 * @return factorList
	 */
	@ResponseBody
	@RequestMapping(value = "/getFactorList.do", method = RequestMethod.POST)
	public HashMap<String, Object> getFactorList(@RequestBody HashMap<String, Object> param) {
		HashMap<String, Object> factor = new HashMap<String, Object>();
		List<String> factorList = pkgService.getFactorList(param);
		
		factor.put("factorList", factorList);
			
		return factor;
	}
	
	/**
	 * Rule name 중복 체크
	 * @param param
	 * @return boolean
	 */
	@ResponseBody
	@RequestMapping(value = "/ruleNmCheck.do", method = RequestMethod.POST)
	public boolean ruleNmCheck(@RequestBody HashMap<String, Object> map) {
		int ruleNameCnt = pkgService.ruleNmCheck(map);
		
		if(ruleNameCnt > 0) {
			return false;
		}
		
		return true;
	}
	
	/**
	 * Factor Value 조회
	 * @param param
	 * @return factor, factorVal
	 */
	@ResponseBody
	@RequestMapping(value = "/getFactorVal.do", method = RequestMethod.POST)
	public HashMap<String, Object> getFactorVal(@RequestBody HashMap<String, Object> param) {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		HashMap<String, Object> factor = pkgService.getFactor(param);
		List<HashMap<String, Object>> factorVal = pkgService.getFactorVal(param);
		resultMap.put("factor", factor);
		resultMap.put("factorVal", factorVal);
			
		return resultMap;
	}
	
	/**
	 * RULE 상세 > 상세정보 조회
	 * @param param
	 * @return resultMap
	 */
	@ResponseBody
	@RequestMapping(value = "/getRuleAttrByRuleId.do", method = RequestMethod.POST)
	public HashMap<String, Object> getRuleAttrByRuleId(@RequestBody HashMap<String, Object> param) {
		
		HashMap<String, Object> resultMap = new HashMap<>();
		
		int ruleId = Integer.parseInt((String) param.get("ruleId"));
		List<HashMap<String, Object>> ruleAttrList = pkgService.getWhenList(ruleId);
		
		resultMap.put("ruleAttrList", ruleAttrList);
		
		return resultMap;
	}
	
	/**
	 * RULE 저장
	 * @param param
	 * @return resultMap
	 */
	@ResponseBody
	@RequestMapping(value = "/ruleSave.do", method = RequestMethod.POST)
	public HashMap<String, Object> ruleSave(@RequestBody HashMap<String, Object> param) {
		String ruleId = (String) param.get("ruleId");
		
		param.put("USER_ID", 1);
		
		if("".equals(ruleId)) {	// 신규 등록
			// RULE 저장
			pkgService.ruleSave(param);
			ruleId = String.valueOf((int) param.get("RULE_ID"));
			param.put("ruleId", (int) param.get("RULE_ID"));
			// RULE_ATTR 저장
			pkgService.ruleAttrSave(param);
			
		} else {	// 수정
			param.put("ruleId", Integer.parseInt(ruleId));
			// RULE 수정
			pkgService.ruleUpdate(param);
			List<HashMap<String, Object>> ruleObjList = (List<HashMap<String, Object>>) param.get("ruleObjArr");
			
			if(ruleObjList.size() > 0) {
				// RULE_ATTR 삭제
				pkgService.deleteRuleAttrById(param);
				// RULE_ATTR 저장
				pkgService.ruleAttrSave(param);
			}
		}
		
		// RULE 의 ATTR_WHEN 업데이트
		String attrThen = "$map.put(\"res_"+ ruleId +"_"+ param.get("salience") +"\", \""+ param.get("ruleNm") +"\");";
		param.put("ATTR_THEN", attrThen);
		pkgService.updateAttrThen(param);
		
		// 해당 패키지에 등록된 RULE 개수 조회
		HashMap<String, Object> resultMap = new HashMap<>();
		resultMap.put("pkgId", param.get("pkgId"));
		resultMap.put("ruleId", param.get("ruleId"));
		int ruleCount = pkgService.getRuleCount(resultMap);
		resultMap.put("ruleCount", ruleCount);
		
		// RULE 파일 생성 및 PKG > DRL_SOURCE 업데이트
		String pkgId = (String) param.get("pkgId");
		saveDRL(pkgId);
		
		return resultMap;
	}
	
	/**
	 * PKG 삭제
	 * @param param
	 * @return resultMap
	 */
	@ResponseBody
	@RequestMapping(value = "/deletePkgById.do", method = RequestMethod.POST)
	public boolean deletePkgById(@RequestBody HashMap<String, Object> param) {
		// PKG 삭제
		pkgService.deletePkgById(param);
		// PKG_ID에 속한 RULE_ID 조회
		List<String> ruleIds = pkgService.getRuleIdsByPkgId(param);
		if(ruleIds.size() > 0) {
			param.put("ruleIdArr", ruleIds);
			// RULE 삭제
			pkgService.deleteRuleById(param);
			// RULE_ATTR 삭제
			pkgService.deleteRuleAttrByIds(param);
		}
		
		return true;
	}
	
	/**
	 * RULE 삭제
	 * @param param
	 * @return resultMap
	 */
	@ResponseBody
	@RequestMapping(value = "/deleteRuleById.do", method = RequestMethod.POST)
	public HashMap<String, Object> deleteRuleById(@RequestBody HashMap<String, Object> param) {
		// RULE 삭제
		pkgService.deleteRuleById(param);
		// RULE_ATTR 삭제
		pkgService.deleteRuleAttrByIds(param);
		
		// 해당 패키지에 등록된 RULE 개수 조회
		HashMap<String, Object> resultMap = new HashMap<>();
		resultMap.put("pkgId", param.get("pkgId"));
		int ruleCount = pkgService.getRuleCount(resultMap);
		resultMap.put("ruleCount", ruleCount);
		
		// RULE 파일 생성 및 PKG > DRL_SOURCE 업데이트
		String pkgId = (String) param.get("pkgId");
		saveDRL(pkgId);
		
		return resultMap;
	}
	
	/**
	 * RULE 파일 생성 및 PKG > DRL_SOURCE 업데이트
	 * @param pkgId
	 * @return
	 */
	public boolean saveDRL(String pkgId) {
		// PKG DRL_SOURCE 업데이트
		HashMap<String, Object> pkg = pkgService.getPkgById(pkgId);
		List<HashMap<String, Object>> ruleList = pkgService.getRuleListByPkgId(pkgId);
		
		String drlSource = "";
		
		if(ruleList.size() > 0) {
			drlSource += "package " + pkg.get("PKG_NM") + "\n";
			drlSource += "import java.util.Map\n\n";
		}
		
		for(HashMap<String, Object> m : ruleList) {
			drlSource += "rule \"" + m.get("RULE_NM") + "\"\n";
			drlSource += "	no-loop " + m.get("NO_LOOP") + "\n";
			drlSource += "	lock-on-active " + m.get("LOCK_ON_ACTIVE") + "\n";
			drlSource += "	salience " + m.get("SALIENCE") + "\n";
			drlSource += "	when\n";
			drlSource += "		$map : Map(\n";
			
			int ruleId = (int) m.get("RULE_ID");
			List<HashMap<String, Object>> whenList = pkgService.getWhenList(ruleId);
			
			for(HashMap<String, Object> w : whenList) {
				drlSource += "		" + w.get("ATTR_WHEN");
			}
			
			drlSource += "	)\n";
			drlSource += "	then\n";
			drlSource += "		" + m.get("ATTR_THEN") + "\n";
			drlSource += "end\n\n";
		}
		
		pkg.put("DRL_SOURCE", drlSource);
		pkgService.updateDrlSource(pkg);
		
		// 물리 DRL파일 생성
		String path = (String) pkg.get("PATH");
		path = System.getProperty("user.home") + path;
		path = path.replace("/", File.separator).replace("\\", File.separator);
		String pkg_nm = (String) pkg.get("PKG_NM");
		String drl_nm = (String) pkg.get("DRL_NM");
		String drl_source = (String) pkg.get("DRL_SOURCE");
		
		DroolsUtil.outputDrl(path, pkg_nm, drl_nm, drl_source);
		
		return true;
	}
}
