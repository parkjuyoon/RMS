package egovframework.ktds.targetai.controller;

import java.io.File;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

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
import egovframework.ktds.targetai.service.RuleService;
import egovframework.ktds.targetai.service.SvcService;

/**
 * @since 2021.05.25
 * @author 박주윤 차장
 *
 */
@RequestMapping("/targetai")
@Controller
public class PkgController {

	@Resource(name = "svcService")
	protected SvcService svcService;
	
	@Resource(name = "pkgService")
	protected PkgService pkgService;
	
	@Resource(name = "ruleService")
	protected RuleService ruleService;
	
	/**
	 * package 관리 화면 이동
	 * @param model
	 * @return /targetai/pkg.jsp
	 */
	@RequestMapping(value = "/pkg.do")
	public String main(HttpSession session, ModelMap model) {
		String member_id = (String) session.getAttribute("member_id");
		
		if(member_id == null) {
			return "redirect:/targetai/main.do";
		}
		
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
		// 패키지 상세 정보 조회
		HashMap<String, Object> pkg = pkgService.getPkg(param);
		// 맵핑된 RULE 목록 조회 
		List<HashMap<String, Object>> mappingRuleList = pkgService.getMappingRuleList(param);
		param.put("mappingRuleList", mappingRuleList);
		// 패키지와 연결 가능한 RULE 목록 조회
		List<HashMap<String, Object>> conRuleList = pkgService.getConRuleList(param);
		
		resultMap.put("pkg", pkg);
		resultMap.put("conRuleList", conRuleList);
		resultMap.put("mappingRuleList", mappingRuleList);
		
		return resultMap;
	}
	
	/**
	 * package 상세 조회
	 * @param PKG_ID
	 * @return pkg
	 */
	@ResponseBody
	@RequestMapping(value = "/getDrlSouce.do", method = RequestMethod.POST)
	public HashMap<String, Object> getDrlSouce(@RequestBody HashMap<String, Object> param) {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		
		// DRL 소스 업데이트
		String pkgId = String.valueOf(param.get("pkgId"));
		ruleService.saveDRL(pkgId);
		
		// 패키지 상세 정보 조회
		HashMap<String, Object> pkg = pkgService.getPkgByVer(param);
		resultMap.put("pkg", pkg);
		
		return resultMap;
	}
	
	/**
	 * package 상세 조회
	 * @param PKG_ID
	 * @return pkg
	 */
	@ResponseBody
	@RequestMapping(value = "/getConRuleList.do", method = RequestMethod.POST)
	public HashMap<String, Object> getConRuleList(@RequestBody HashMap<String, Object> param) {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		param.put("mappingRuleList", new ArrayList<>());
		// 패키지와 연결 가능한 RULE 목록 조회
		List<HashMap<String, Object>> conRuleList = pkgService.getConRuleList(param);
		
		resultMap.put("conRuleList", conRuleList);
		
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
		
		try {
			List<HashMap<String, Object>> ruleAttrList = pkgService.getRuleAttrByPkgId(param);
			resultMap.put("ruleAttrList", ruleAttrList);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
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
			
			String pkgId = (String) param.get("pkgId");
			
			ruleService.saveDRL(pkgId);
			
			// Drools 세션 생성
			KieSession kieSession = DroolsUtil.getKieSession(path);
						
			List<HashMap<String, Object>> getResultList = ApiController.getResultList(kieSession, paramMap, new ArrayList<>());
			
			// drools 세션 dispose
			kieSession.dispose();
			
			HashMap<String, Object> resultMap = new HashMap<>();
			resultMap.put("RESULT", getResultList);
			JSONObject resultJSON = new JSONObject(resultMap);
			
			return resultJSON.toJSONString();
	}
	
	/**
	 * PKG 저장
	 * @param param
	 * @return resultMap
	 */
	@ResponseBody
	@RequestMapping(value = "/addPkg.do", method = RequestMethod.POST)
	public HashMap<String, Object> addPkg(@RequestBody HashMap<String, Object> param, HttpSession session) {
		String regUserId = (String) session.getAttribute("member_id");
		
		param.put("REG_USER_ID", regUserId);
		param.put("PATH", "/drl_files");
		// 신규패키지는 자동배포
		param.put("STATUS", "Y");
		param.put("RUN_START_DATE", LocalDateTime.now());
		
		// PKG 저장
		pkgService.addPkg(param);
		param.put("pkgId", param.get("PKG_ID"));
		// PKG_VER 저장
		String status = (String) param.get("status");
		
		if("Y".equals(status)) {
			param.put("RUN_START_DATE", LocalDateTime.now());
		}
		
		pkgService.addPkgVer(param);
		
		// DRL 파일명 업데이트
		String drlNm = param.get("pkgNm") + "_" + param.get("PKG_ID") + "_v" + param.get("VER") +".drl";
		param.put("drlNm", drlNm);
		pkgService.updateDrlFileNm(param);
		
		// 연결된 Rule 맵핑 정보 삭제
		int delRes = pkgService.delRuleMappingByPkgId(param);
		// 새로운 Rule 맵핑 연결
		List<String> ruleIds = (List<String>) param.get("mappingRuleIds");
		if(ruleIds.size() > 0) {
			int addRes = pkgService.addRuleMappingByPkgId(param);
			
			// DRL 파일 수정
			// RULE 파일 생성 및 PKG > DRL_SOURCE 업데이트
			String pkgId = String.valueOf(param.get("pkgId"));
			ruleService.saveDRL(pkgId);
		}
		
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
	public HashMap<String, Object> updatePkg(@RequestBody HashMap<String, Object> param, HttpSession session) {
		try {
			String regUserId = (String) session.getAttribute("member_id");
			
			param.put("REG_USER_ID", regUserId);
			param.put("PATH", "/drl_files");
			
			// 패키지 저장
			pkgService.updatePkg(param);
			// 배포버전 변경
			HashMap<String, Object> rtnVerInfo = pkgService.deployVer(param);
			
			List<Integer> mappingRuleIds1= pkgService.getMappingRuleIdsByPkgId(param);
			Collections.sort(mappingRuleIds1);
			List<Object> param_mappingRuleIds = (List<Object>) param.get("mappingRuleIds");
			List<Integer> mappingRuleIds2 = new ArrayList<>();
			
			for(Object id : param_mappingRuleIds) {
				mappingRuleIds2.add(Integer.parseInt(String.valueOf(id)));
			}
			Collections.sort(mappingRuleIds2);
			
			// RULE MAPPING 정보가 변경되었는지 확인
			boolean ruleMappingEditTF = Arrays.deepEquals(mappingRuleIds1.toArray(), mappingRuleIds2.toArray());
			
			if(!ruleMappingEditTF) {
				// PKG_VER 저장
				param.put("PKG_ID", param.get("pkgId"));
				param.put("status", "N");
				pkgService.addPkgVer(param);
				
				// DRL 파일명 업데이트
				String drlNm = param.get("pkgNm") + "_" + param.get("PKG_ID") + "_v" + param.get("VER") +".drl";
				param.put("drlNm", drlNm);
				pkgService.updateDrlFileNm(param);
				
				// 연결된 Rule 맵핑 정보 삭제
				int delRes = pkgService.delRuleMappingByPkgId(param);
				// 새로운 Rule 맵핑 연결
				List<String> ruleIds = (List<String>) param.get("mappingRuleIds");
				if(ruleIds.size() > 0) {
					int addRes = pkgService.addRuleMappingByPkgId(param);
				}
				
				// DRL 파일 수정
				// RULE 파일 생성 및 PKG > DRL_SOURCE 업데이트
				String pkgId = (String) param.get("pkgId");
				ruleService.saveDRL(pkgId);
			}
		
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		HashMap<String, Object> pkg = pkgService.getPkg(param);
		
		return pkg;
	}
	
	/**
	 * 패키지 배포버전 목록 조회
	 * @param param
	 * @return resultMap
	 */
	@ResponseBody
	@RequestMapping(value = "/getDeployVerList.do", method = RequestMethod.POST)
	public HashMap<String, Object> getDeployVerList(@RequestBody HashMap<String, Object> param, HttpSession session) {
		HashMap<String, Object> resultMap = new HashMap<>();
		
		// 해당패키지의 버전목록 조회
		List<HashMap<String, Object>> verList = pkgService.getDeployVerListByPkgId(param);
		int verCount = pkgService.getDeployVerCountByPkgId(param);
		
		resultMap.put("verList", verList);
		resultMap.put("verCount", verCount);
		
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
		// 연결된 서비스의 PKG 아이디 삭제
		svcService.updatePkgId(param);
		
		return true;
	}
}
