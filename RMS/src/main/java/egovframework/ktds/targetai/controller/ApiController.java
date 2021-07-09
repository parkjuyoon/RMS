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

import com.mysql.fabric.xmlrpc.base.Array;

import egovframework.ktds.drools.config.DroolsUtil;
import egovframework.ktds.targetai.service.ApiService;
import egovframework.ktds.targetai.service.PkgService;
import egovframework.ktds.targetai.util.CommonUtil;

@RequestMapping("/targetai")
@Controller
public class ApiController {
	
	@Autowired
	private ApiService apiService;
	@Autowired
	private PkgService pkgService;
	
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
		
		model.put("rootDomain", req.getRequestURL().toString().replace(req.getRequestURI(), ""));
		
		return "/targetai/api";
	}
	
	/**
	 * API Request
	 * @param type, value, svc_id
	 * @return json
	 */
	@ResponseBody
	@RequestMapping(value = "/reqUrl.do", method = RequestMethod.POST)
	public JSONObject reqUrl(@RequestBody JSONObject param) {
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
			String param_targetType = params.get("api_type") == null ? null : (String) params.get("api_type");
			// 조회할 VALUE 값
			String param_custId = (String) params.get("param_val");
			// 서비스 아이디
			String param_svcId = (String) params.get("svc_id");
			
			// PKG 내 DRL 파일 정보 조회
			HashMap<String, Object> pkg = apiService.getPkgBySvcId(param_svcId);
			
			if(pkg == null) {
				response.getWriter().print(new JSONObject());
				return;
			}
			
			String svcTargetType = (param_targetType == null ? (String) pkg.get("TARGET_TYPE") : param_targetType);
			Object numOfOffer = pkg.get("NUM_OF_OFFER") == null ? null : pkg.get("NUM_OF_OFFER");
			
			int pkgId = (int) pkg.get("PKG_ID");
			String path = (String) pkg.get("PATH");
			String pkgNm = (String) pkg.get("PKG_NM");
			String drlNm = (String) pkg.get("DRL_NM");
			
			// DRL 파일 선택
			String drlPath = path.replace("/", File.separator) + File.separator + pkgNm + File.separator + drlNm;
			drlPath = System.getProperty("user.home") + drlPath;
			
			// RULE 실행할 데이터 조회
			HashMap<String, Object> param = new HashMap<>();
			param.put("val", param_custId);
			
			List<HashMap<String, Object>> activeList = apiService.getActiveList(param);
			HashMap<String, Object> responseMap = new HashMap<>();
				
			long afterTime = System.currentTimeMillis();
			long diffTime = (afterTime - beforeTime)/1000;
			
			responseMap.put("EXE_TYPE", "TARGET_AI");
			responseMap.put("SVC_ID", param_svcId);
			responseMap.put("NUM_OF_OFFER", pkg.get("NUM_OF_OFFER"));
			responseMap.put("SVC_TARGET_TYPE", svcTargetType);
			responseMap.put("CUST_ID", param_custId);
			responseMap.put("NUM_OF_OFFER", numOfOffer == null ? "ALL" : (int) numOfOffer);	// ALL 이면 모든 RULE 표시, 제한있으면 제한된 만큼 RULE 표시
			responseMap.put("RUN_TIME", diffTime);
			responseMap.put("RUN_TIME_UNIT", "sec");
			
			List<Integer> ruleIds = apiService.getRuleIdsBySvcId(param_svcId);	// 등록된 모든 RULE 의 RULE_ID를 SALIENCE ASC, ORDER ASC 순으로 정렬하여 조회
			List<HashMap<String, Object>> resultTmp = new ArrayList<>();	// 계약건수마다 걸린 RULE 을 한군데 넣어놓을 임시 리스트
			List<HashMap<String, Object>> respList = new ArrayList<>();		// response 리스트
			List<Integer> respRuleIds = new ArrayList<>();					// response 할 RULE_ID 리스트
			
			for(HashMap<String, Object> activeMap : activeList) {
				// DRL의 RULE 실행 결과
				activeMap.put("SVC_TARGET_TYPE", svcTargetType);
				List<HashMap<String, Object>> resultList = getResultList(drlPath, activeMap);
				
				// DRL 파일이 존재하지 않을경우 resultList는 NULL 을 반환한다. 
				// DB에서 조회해서 파일을 생성한 후 다시 RULE 실행한다.
				if(resultList == null) {
					saveDRL(String.valueOf(pkgId));
					resultList = getResultList(drlPath, activeMap);
				}
				
				// 계약건수마다 걸린 RULE 을 임시리스트 한곳에 모아둔다.
				for(HashMap<String, Object> res : resultList) {
					resultTmp.add(res);
				}
			}
			
			// SVC TARGET TYPE 이 CUST 인경우
			if("CUST".equals(svcTargetType)) {	
				loopOut:
				for(int ruleId : ruleIds) {
					for(HashMap<String, Object> res : resultTmp) {
						int rid = (int) res.get("RULE_ID");
						
						if(ruleId == rid) {
							if(respRuleIds.contains(rid)) {
								break;
								
							} else {
								if(numOfOffer != null) {		// NUM_OF_OFFER 제한이 있을경우 제한된만큼만 저장
									int nof = (int) numOfOffer;
									
									if(respRuleIds.size() >= nof) {
										break loopOut;
										
									} else {
										respList.add(res);
										respRuleIds.add(rid);
									}
									
								} else {						// NUM_OF_OFFER 제한이 없을경우 모든 RULE 저장
									respList.add(res);
									respRuleIds.add(rid);
								}
							}
							
						}
					}
				}
				
			// SVC TARGET TYPE 이 CONT 인 경우
			} else if("CONT".equals(svcTargetType)) {	
				loopOut:
				for(int ruleId : ruleIds) {
					for(HashMap<String, Object> res : resultTmp) {
						int rid = (int) res.get("RULE_ID");
						String ruleTargetType = (String) res.get("TARGET_TYPE");
						
						if(ruleId == rid) {
							if(respRuleIds.contains(rid)) {
								if("CUST".equals(ruleTargetType)) {
									break;
									
								} else if("CONT".equals(ruleTargetType)) {
									respList.add(res);
									
								} else {
									response.getWriter().print(new JSONObject());
									return;
								}
								
							} else {
								if(numOfOffer != null) {		// NUM_OF_OFFER 제한이 있을경우 제한된만큼만 저장
									int nof = (int) numOfOffer;
									
									if(respRuleIds.size() >= nof) {
										break loopOut;
										
									} else {
										respList.add(res);
										respRuleIds.add(rid);
									}
									
								} else {						// NUM_OF_OFFER 제한이 없을경우 모든 RULE 저장
									respList.add(res);
									respRuleIds.add(rid);
								}
							}
						}
					}
				}
			}
			
			// ORDER 다시 매기기
			for(int i=0; i<respList.size(); i++) {
				respList.get(i).put("ORDER", i+1);
			}
			
			// RESULT OUTPUT
			responseMap.put("RESULT", respList);
			/*
			// SVCLOG 저장(INPUT/OUTPUT)
			HashMap<String, Object> logMap = new HashMap<>();
			logMap.put("RESULT", respList);
			logMap.put("SVC_ID", svc_id);
			logMap.put("PARAM", "CUST_NO");	// pk 중복 에러
			logMap.put("VAL", param_val);
			
			apiService.addSvclogIn(logMap);
			
			if(respList.size() > 0) {
				apiService.addSvclogOut(logMap);
			}
			
			responseMap.put("TRANSACTION_ID", logMap.get("SVCLOG_ID"));
			*/
			response.getWriter().print(new JSONObject(responseMap));
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {br.close();} catch (IOException e) {e.printStackTrace();}
			sb.delete(0, sb.length());
		}
	}
	
	/**
	 * RULE 실행 후 SALIENCE, ORDER 순으로 ASC 정렬하여 리턴
	 * @param path
	 * @param obj
	 * @return
	 */
	public static List<HashMap<String, Object>> getResultList(String path, HashMap<String, Object> activeMap) {
		List<HashMap<String, Object>> sortResList = new ArrayList<>();
		
		// Drools 실행
		KieSession kieSession = DroolsUtil.getKieSession(path);
		
		// 파일이 없을경우 또는 문법이 틀린 DRL 파일 경우 null 리턴
		if(kieSession == null) {
			return null;
		}
		
		kieSession.insert(activeMap);
		kieSession.fireAllRules();
		kieSession.dispose();
		
		// 결과화면에 정렬되게 보이기 위해 변환
		Iterator<String> iter = activeMap.keySet().iterator();
		
		// 실행된 RULE_ID 얻기
		List<Integer> ruleIdList = new ArrayList<>();
		while(iter.hasNext()) {
			String key = iter.next().toString();
			String value = String.valueOf(activeMap.get(key));
			
			if(key.startsWith("ruleId_")) {
				ruleIdList.add(Integer.parseInt(value));
			}
		}
		
		List<HashMap<String, Object>> resList = new ArrayList<>();
		
		for(Integer ruleId : ruleIdList) {
			HashMap<String, Object> resMap = new HashMap<>();
			String ruleNm = "ruleNm_" + ruleId;
			String campId = "campId_" + ruleId;
			String salience = "salience_" + ruleId;
			String targetType = "targetType_" + ruleId;
			
			resMap.put("RULE_ID", ruleId);
			resMap.put("RULE_NM", activeMap.get(ruleNm));
			resMap.put("CAMP_ID", activeMap.get(campId));
			resMap.put("SALIENCE", activeMap.get(salience));
			resMap.put("TARGET_TYPE", activeMap.get(targetType));
			if("CONT".equals((String) activeMap.get(targetType)) && "CONT".equals((String) activeMap.get("SVC_TARGET_TYPE"))) {
				resMap.put("SVC_CONT_ID", activeMap.get("SVC_CONT_ID"));
			}
			
			resList.add(resMap);
		}
		
		Collections.sort(resList, new Comparator<HashMap<String, Object>>() {

			@Override
			public int compare(HashMap<String, Object> a, HashMap<String, Object> b) {
				String valA = String.valueOf(a.get("SALIENCE"));
	            String valB = String.valueOf(b.get("SALIENCE"));
	            String varC = String.valueOf(a.get("RULE_ID"));
	            String varD = String.valueOf(b.get("RULE_ID"));
	            
	            if(valA.equals(valB)) {
	            	return varC.compareTo(varD);
	            }

	            return valA.compareTo(valB);
			}
		});
		
		for(int i=0; i<resList.size(); i++) {
			resList.get(i).put("ORDER", i+1);
			int salience = (int) resList.get(i).get("SALIENCE"); 
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
	
	/**
	 * RULE 파일 생성 및 PKG > DRL_SOURCE 업데이트
	 * @param pkgId
	 * @return
	 */
	public String saveDRL(String pkgId) {
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
		String realPath = (String) pkg.get("PATH");
		String path = realPath;
		realPath = System.getProperty("user.home") + path;
		realPath = realPath.replace("/", File.separator).replace("\\", File.separator);
		String pkg_nm = (String) pkg.get("PKG_NM");
		String drl_nm = (String) pkg.get("DRL_NM");
		String drl_source = (String) pkg.get("DRL_SOURCE");
		
		DroolsUtil.outputDrl(realPath, pkg_nm, drl_nm, drl_source);
		
		path += "/" + pkg_nm + "/" + drl_nm;
		
		return path;
	}
}
