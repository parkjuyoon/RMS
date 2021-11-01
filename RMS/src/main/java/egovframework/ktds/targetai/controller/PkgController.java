package egovframework.ktds.targetai.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Properties;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import egovframework.ktds.drools.config.DroolsUtil;
import egovframework.ktds.targetai.service.PkgService;
import egovframework.ktds.targetai.service.RuleService;

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
	
	@Resource(name = "ruleService")
	protected RuleService ruleService;
	
	@Resource(name = "applicationProperties")
	protected Properties applicationProperties;
	
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
			
			List<HashMap<String, Object>> getResultList = ApiController.getResultList(path, paramMap, new ArrayList<>());
			
			if(getResultList == null) {
				String pkgId = (String) param.get("pkgId");
				
				saveDRL(pkgId);
				getResultList = ApiController.getResultList(path, paramMap, new ArrayList<>());
			}
			
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
		
		// PKG 저장
		pkgService.addPkg(param);
		param.put("pkgId", param.get("PKG_ID"));
		
		// DRL 파일명 업데이트
		String drlNm = param.get("pkgNm") + "_" + param.get("PKG_ID") + ".drl";
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
			saveDRL(pkgId);
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
		String regUserId = (String) session.getAttribute("member_id");
		
		param.put("REG_USER_ID", regUserId);
		// 서비스 저장
		pkgService.updatePkg(param);
		
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
		saveDRL(pkgId);
		
		HashMap<String, Object> pkg = pkgService.getPkg(param);
		
		return pkg;
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
		List<HashMap<String, Object>> ruleAttrList = ruleService.getWhenList(ruleId);
		
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
	public HashMap<String, Object> ruleSave(@RequestBody HashMap<String, Object> param, HttpSession session) {
		String ruleId = (String) param.get("ruleId");
		String regUserId = (String) session.getAttribute("member_id");
		
		param.put("REG_USER_ID", regUserId);
		
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
		
		// RULE 의 ATTR_THEN 업데이트
		HashMap<String, Object> ruleMap = ruleService.getRule(param);
		String attrThen = "$map.put(\"res_"+ ruleMap.get("RULE_ID") +"_"+ ruleMap.get("CAMP_ID") +"_"+ ruleMap.get("SALIENCE") +"\", \""+ ruleMap.get("RULE_NM") +"\");\n";
		
		attrThen = "";
		attrThen += "$map.put(\"ruleId_"+ ruleMap.get("RULE_ID") + "\", " + ruleMap.get("RULE_ID") +");\n";
		attrThen += "		$map.put(\"campId_"+ ruleMap.get("RULE_ID") + "\", " + ruleMap.get("CAMP_ID") +");\n";
		attrThen += "		$map.put(\"salience_"+ ruleMap.get("RULE_ID") + "\", " + ruleMap.get("SALIENCE") +");\n";
		attrThen += "		$map.put(\"ruleNm_"+ ruleMap.get("RULE_ID") + "\", \"" + ruleMap.get("RULE_NM") +"\");\n";
		attrThen += "		$map.put(\"targetType_"+ ruleMap.get("RULE_ID") + "\", \"" + ruleMap.get("TARGET_TYPE") +"\");";
		
		param.put("ATTR_THEN", attrThen);
		pkgService.updateAttrThen(param);
		
		// 해당 패키지에 등록된 RULE 개수 조회
		HashMap<String, Object> resultMap = new HashMap<>();
		resultMap.put("pkgId", param.get("pkgId"));
		resultMap.put("ruleId", param.get("ruleId"));
		int ruleCount = ruleService.getRuleCount(resultMap);
		resultMap.put("ruleCount", ruleCount);
		
		// RULE 파일 생성 및 PKG > DRL_SOURCE 업데이트
		String pkgId = (String) param.get("pkgId");
		String path = saveDRL(pkgId);
		
		resultMap.put("drlPath", path);
		
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
		// 연결된 Rule 맵핑 정보 삭제
		int delRes = pkgService.delRuleMappingByPkgIds(param);
		
		return true;
	}
	
	/**
	 * RULE 파일 생성 및 PKG > DRL_SOURCE 업데이트
	 * @param pkgId
	 * @return
	 */
	public String saveDRL(String pkgId) {
		// 함수 import 경로
		String funcRootPath = "import static " + applicationProperties.getProperty("func.import.root_path");
		
		// PKG DRL_SOURCE 업데이트
		HashMap<String, Object> pkg = pkgService.getPkgById(pkgId);
		List<HashMap<String, Object>> ruleList = pkgService.getRuleListByPkgId(pkgId);
		
		String drlImport = "";
		String drlSource = "";
		
		if(ruleList.size() > 0) {
			drlImport += "package " + pkg.get("PKG_NM") + ";\n";
			drlImport += "import java.util.Map;\n";
		}
		
		for(HashMap<String, Object> m : ruleList) {
			drlSource += "rule \"" + m.get("RULE_NM") + "\"\n";
			drlSource += "	no-loop " + m.get("NO_LOOP") + "\n";
			drlSource += "	lock-on-active " + m.get("LOCK_ON_ACTIVE") + "\n";
			drlSource += "	salience " + m.get("SALIENCE") + "\n";
			drlSource += "	when\n";
			drlSource += "		$map : Map(\n";
			
			int ruleId = (int) m.get("RULE_ID");
			List<HashMap<String, Object>> whenList = ruleService.getWhenList(ruleId);
			
			for(HashMap<String, Object> w : whenList) {
				drlSource += "		" + w.get("ATTR_WHEN");
				
				if("함수".equals(w.get("FACTOR_GRP_NM"))) {
					String factorNmEn = (String) w.get("FACTOR_NM_EN");
					String importTxt= funcRootPath + "." + factorNmEn + "." + factorNmEn.toLowerCase() + ";\n";
					if(!drlImport.contains(importTxt)) {
						drlImport += importTxt;
					}
				}
			}
			
			drlSource += "	)\n";
			drlSource += "	then\n";
			drlSource += "		" + m.get("ATTR_THEN") + "\n";
			drlSource += "end\n\n";
		}
		
		if(ruleList.size() > 0) {
			pkg.put("DRL_SOURCE", drlImport + "\n" + drlSource);
		} else {
			pkg.put("DRL_SOURCE", "");
		}
		
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
