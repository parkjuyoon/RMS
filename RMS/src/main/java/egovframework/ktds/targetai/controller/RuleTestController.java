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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import egovframework.ktds.drools.config.DroolsUtil;
import egovframework.ktds.targetai.service.RuleTestService;
import net.sf.json.JSONException;

/**
 * @since 2021.05.25
 * @author 박주윤 차장
 *
 */
@RequestMapping("/targetai")
@Controller
public class RuleTestController {

	@Resource(name = "ruleTestService")
	protected RuleTestService ruleTestService;
	
	/**
	 * 모든 Package List 조회
	 * @param param
	 * @return resultMap
	 */
	@ResponseBody
	@RequestMapping(value = "/getAllPkgList.do", method = RequestMethod.POST)
	public HashMap<String, Object> getAllPkgList(@RequestBody HashMap<String, Object> param) {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		
		List<HashMap<String, Object>> allPkgList = ruleTestService.getAllPkgList();
		resultMap.put("allPkgList", allPkgList);
		
		return resultMap;
	}
	
	/**
	 * 모든 Package List 조회
	 * @param param
	 * @return resultMap
	 */
	@ResponseBody
	@RequestMapping(value = "/getRuleAttrByPkgId.do", method = RequestMethod.POST)
	public HashMap<String, Object> getRuleAttrByPkgId(@RequestBody HashMap<String, Object> param) {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		
		List<HashMap<String, Object>> ruleAttrList = ruleTestService.getRuleAttrByPkgId(param);
		
		resultMap.put("ruleAttrList", ruleAttrList);
		
		return resultMap;
	}
	
	
	
	/**
	 * RULE 테스트
	 * @param param
	 * @return resultMap
	 */
	@ResponseBody
	@RequestMapping(value = "/ruleTest.do", method = RequestMethod.POST)
	public String ruleTest(@RequestBody HashMap<String, Object> param) {
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
		
		HashMap<String, Object> resultMap = new HashMap<>();
		
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
			sortResJsonArr.add(jsonValues.get(i));
		}
		
		return sortResJsonArr.toJSONString();
	}
}
