package egovframework.ktds.targetai.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

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
			
			System.out.println(path);
			
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
	public HashMap<String, Object> updatePkg(@RequestBody HashMap<String, Object> param, HttpSession session) {
		String regUserId = (String) session.getAttribute("member_id");
		
		param.put("REG_USER_ID", regUserId);
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
		
		try {
			List<HashMap<String, Object>> factorGrpList = pkgService.getFactorGrpList(param);
			resultMap.put("factorGrpList", factorGrpList);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
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
		HashMap<String, Object> factor = pkgService.getFactor(param);
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		List<HashMap<String, Object>> factorVal = new ArrayList<>();
		
		String factorType = (String) factor.get("FACTOR_TYPE");
		
		if("DATA".equals(factorType)) {
			factorVal = pkgService.getFactorVal(param);
			
		} else if("FUNC".equals(factorType)) {
			factorVal = pkgService.getFactorFuncArgs(param);
		} 
		
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
		HashMap<String, Object> ruleMap = pkgService.getRule(param);
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
		int ruleCount = pkgService.getRuleCount(resultMap);
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
	public String saveDRL(String pkgId) {
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
			List<HashMap<String, Object>> whenList = pkgService.getWhenList(ruleId);
			
			for(HashMap<String, Object> w : whenList) {
				drlSource += "		" + w.get("ATTR_WHEN");
				
				if("함수".equals(w.get("FACTOR_GRP_NM"))) {
					String importTxt= "import static egovframework.ktds.targetai.function." + w.get("FACTOR_NM_EN") + ".*;\n";
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
		
		pkg.put("DRL_SOURCE", drlImport + "\n" + drlSource);
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
