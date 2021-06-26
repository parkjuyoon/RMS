package egovframework.ktds.targetai.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.kie.api.runtime.KieSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import egovframework.ktds.drools.config.DroolsUtil;
import egovframework.ktds.targetai.service.ApiService;
import egovframework.ktds.targetai.util.CommonUtil;

@RequestMapping("/targetai")
@Controller
public class ApiController {
	
	@Autowired
	private ApiService apiService;
	
	/**
	 * API 테스트 화면 이동
	 * @param model
	 * @return /targetai/api.jsp
	 */
	@RequestMapping(value = "/api.do")
	public String main(HttpServletRequest req, ModelMap model) {
		HttpSession session = req.getSession();
		String member_id = (String) session.getAttribute("member_id");
		
		if(member_id == null) {
			return "redirect:/targetai/main.do";
		}
		
		return "/targetai/api";
	}
	
	/**
	 * API Request
	 * @param type, value, svc_id
	 * @return json
	 */
	@ResponseBody
	@RequestMapping(value = "/reqUrl.do", method = RequestMethod.POST)
	public JSONObject request(@RequestBody JSONObject param) {
		JSONObject responseJSON = new JSONObject();
		String req_url = (String) param.get("req_url");
		
		// 해당 URL으로 API CALL 한다.
		responseJSON = CommonUtil.callApi(param, "POST", req_url);
		
		return responseJSON;
	}
	
	/**
	 * REQUEST REST API
	 * @param svc_id, cust_id
	 * @return JSONObject
	 * 			
	 */
	@RequestMapping(value = "/api/request.do", method = RequestMethod.POST)
	public void request(HttpServletResponse response, HttpServletRequest request) {
		response.setCharacterEncoding("UTF-8");
		response.setContentType("application/json");
		
		BufferedReader br = null;
		StringBuilder sb = null;
		
		try {
			
			long beforeTime = System.currentTimeMillis();
			
			br = new BufferedReader(new InputStreamReader(request.getInputStream()));
			
			sb = new StringBuilder();
		    String line = "";
			while ((line = br.readLine()) != null) {
			    sb.append(line);
			}
			
			JSONParser parse = new JSONParser();
			JSONObject params = (JSONObject) parse.parse(sb.toString());
			
			// 조회할 KEY 값
			String api_type = (String) params.get("api_type");
			// 조회할 VALUE 값
			String param_val = (String) params.get("param_val");
			// 서비스 아이디
			String svc_id = (String) params.get("svc_id");
			
			String table = "";
			String column = "";
			
			// RULE 테스트 할 객체 조회
			if("CUST".equals(api_type)) {
				table = "EV_CUST_ITEM1_TXN";
				column = "ACC_CUST_SROW_ID";
				
			} else if("CONT".equals(api_type)) {
				table = "EV_CONT_ITEM1_TXN";
				column = "ASSET_SROW_ID";
				
			} else if("COMB".equals(api_type)) {
				table = "EV_CAMP_COMB_ITEM1_TXN";
				column = "COMB_CONT_SBT_ID";
				
			} else {
				response.getWriter().print(new JSONObject());
				return;
			}
			
			// RULE 실행할 데이터 조회
			HashMap<String, Object> activeMap = getActiveMap(table, column, param_val);
			// PKG 내 DRL 파일 정보 조회
			HashMap<String, Object> pkg = apiService.getPkgBySvcId(svc_id);
			
			if(pkg == null) {
				response.getWriter().print(new JSONObject());
				return;
			}
			
			String path = (String) pkg.get("PATH");
			String pkgNm = (String) pkg.get("PKG_NM");
			String drlNm = (String) pkg.get("DRL_NM");
			
			// Drools Get Session
			String drlPath = path.replace("/", File.separator) + File.separator + pkgNm + File.separator + drlNm;
			drlPath = System.getProperty("user.home") + drlPath;
			
			// DRL의 RULE 실행 결과
			List<HashMap<String, Object>> resultList = getResultList(drlPath, activeMap);
			
			HashMap<String, Object> responseMap = new HashMap<>();
			
			long afterTime = System.currentTimeMillis();
			long diffTime = (afterTime - beforeTime)/1000;
			
			responseMap.put("RESULT", resultList);
			responseMap.put("EXE_TYPE", "TARGET_AI");
			responseMap.put("SVC_ID", svc_id);
			responseMap.put(api_type, param_val);
			responseMap.put("RUN_TIME", diffTime);
			responseMap.put("RUN_TIME_UNIT", "sec");
			
			// SVCLOG 저장(INPUT/OUTPUT)
			HashMap<String, Object> logMap = new HashMap<>();
			logMap.put("RESULT", resultList);
			logMap.put("SVC_ID", svc_id);
			logMap.put("PARAM", api_type);
			logMap.put("VAL", param_val);
			
			apiService.addSvclogIn(logMap);
			apiService.addSvclogOut(logMap);
			responseMap.put("TRANSACTION_ID", logMap.get("SVCLOG_ID"));
			
			response.getWriter().print(new JSONObject(responseMap));
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {br.close();} catch (IOException e) {e.printStackTrace();}
			sb.delete(0, sb.length());
		}
	}
	
	/**
	 * RULE 적용할 객체 조회
	 * @param source
	 * @param key
	 * @param val
	 * @return
	 * @throws SQLException
	 */
	private HashMap<String, Object> getActiveMap(String table, String column, String val) {
		HashMap<String, Object> param = new HashMap<>();
		param.put("table", table);
		param.put("column", column);
		param.put("val", val);
		
		return apiService.getActiveObj(param);
	}
	
	/**
	 * RULE 실행 후 SALIENCE, ORDER 순으로 ASC 정렬하여 리턴
	 * @param path
	 * @param obj
	 * @return
	 */
	public static List<HashMap<String, Object>> getResultList(String path, HashMap<String, Object> activeMap) {
		List<HashMap<String, Object>> sortResList = new ArrayList<>();
		
		if(activeMap == null) {
			return sortResList;
		}
		
		// Drools 실행
		KieSession kieSession = DroolsUtil.getKieSession(path);
		
		kieSession.insert(activeMap);
		kieSession.fireAllRules();
		kieSession.dispose();
		
		// 결과화면에 정렬되게 보이기 위해 변환
		List<HashMap<String, Object>> resList = new ArrayList<>();
		
		Iterator<String> iter = activeMap.keySet().iterator();
		
		while(iter.hasNext()) {
			String key = iter.next().toString();
			String value = String.valueOf(activeMap.get(key));
			
			if(key.startsWith("res_")) {
				key = key.replaceAll("res_", "");
				String ruleId = key.split("_")[0];
				String campId = key.split("_")[1];
				campId = "null".equals(campId) ? "" : campId;
				String salience = key.split("_")[2];
				
				HashMap<String, Object> resMap = new HashMap<>();
				resMap.put("SALIENCE", salience);
				resMap.put("RULE_ID", ruleId);
				resMap.put("CAMP_ID", campId);
				resMap.put("RULE_NAME", value);
				
				resList.add(resMap);
			}
		}
		
		Collections.sort(resList, new Comparator<HashMap<String, Object>>() {

			@Override
			public int compare(HashMap<String, Object> a, HashMap<String, Object> b) {
				String valA = (String) a.get("SALIENCE");
	            String valB = (String) b.get("SALIENCE");
	            String varC = (String) a.get("RULE_ID");
	            String varD = (String) b.get("RULE_ID");
	            
	            if(valA.equals(valB)) {
	            	return varC.compareTo(varD);
	            }

	            return valA.compareTo(valB);
			}
		});
		
		for(int i=0; i<resList.size(); i++) {
			resList.get(i).put("ORDER", i+1);
			String salience = (String) resList.get(i).get("SALIENCE"); 
			resList.get(i).put("SALIENCE", salience);
			sortResList.add(resList.get(i));
		}
		
		return sortResList;
	}
	
	/**
	 * RSPNS_CD 업데이트
	 * @param TRANSACTION_ID, RULE_ID, RSPNS_CD
	 * @return JSONObject
	 * 			
	 */
	@RequestMapping(value = "/api/updateRspnsCd.do", method = RequestMethod.POST)
	public void updateRspnsCd(HttpServletResponse response, HttpServletRequest request) {
		response.setCharacterEncoding("UTF-8");
		response.setContentType("application/json");
		
		try {
			
			HashMap<String, Object> result = new HashMap<>();
			
			String svclogId = request.getParameter("TRANSACTION_ID");
			String ruleId = request.getParameter("RULE_ID");
			String rspnsCd = request.getParameter("RSPNS_CD");
			
			result.put("TRANSACTION_ID", svclogId);
			result.put("RULE_ID", ruleId);
			result.put("RSPNS_CD", rspnsCd);
			apiService.updateRspnsCd(result);
			
			result.put("CODE", 200);
			response.getWriter().print(new JSONObject(result));
			
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
