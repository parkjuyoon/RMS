package egovframework.ktds.targetai.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Properties;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import egovframework.ktds.targetai.service.InheritanceService;
import egovframework.ktds.targetai.service.RuleService;

/**
 * @since 2021.05.25
 * @author 박주윤 차장
 *
 */
@RequestMapping("/targetai")
@Controller
public class InheritanceController {
	
	@Resource(name = "applicationProperties")
	protected Properties applicationProperties;
	
	@Resource(name = "inheritanceService")
	protected InheritanceService inheritanceService;
	
	@Resource(name = "ruleService")
	protected RuleService ruleService;

	/**
	 * RULE 상속 화면 이동
	 * @param model
	 * @return /targetai/inheritance.jsp
	 */
	@RequestMapping(value = "/inheritance.do")
	public String main(ModelMap model) {
		return "/targetai/inheritance";
	}
	
	/**
	 * 상속정보 목록 조회
	 * @param param
	 * @return resultMap
	 */
	@ResponseBody
	@RequestMapping(value = "/getIhList.do", method = RequestMethod.POST)
	public HashMap<String, Object> getInheritanceList(@RequestBody HashMap<String, Object> param, HttpSession session) {
		
		List<HashMap<String, Object>> ihList = inheritanceService.getInheritanceList(param);
		int ihListCount = inheritanceService.getInheritanceListCount(param);
		
		HashMap<String, Object> rtnMap = new HashMap<>();
		rtnMap.put("ihList", ihList);
		rtnMap.put("ihListCount", ihListCount);
		
		return rtnMap;
	}
	
	/**
	 * 상속정보 조회
	 * @param param
	 * @return resultMap
	 */
	@ResponseBody
	@RequestMapping(value = "/getSerializeInfo.do", method = RequestMethod.POST)
	public HashMap<String, Object> getSerializeInfo(@RequestBody HashMap<String, Object> param, HttpSession session) {
		
		HashMap<String, Object> serializeInfo = inheritanceService.getSerializeInfo(param);
		
		return serializeInfo;
	}
	
	/**
	 * 현행화 처리
	 * @param param
	 * @return resultMap
	 */
	@ResponseBody
	@RequestMapping(value = "/serialize.do", method = RequestMethod.POST)
	public HashMap<String, Object> serialize(@RequestBody HashMap<String, Object> param, HttpSession session) {
		
		HashMap<String, Object> resultMap = new HashMap<>();
		
		String ruleId = (String) param.get("ruleId");
		
		// RULE 의 RULE_WHEN 업데이트
		List<HashMap<String, Object>> ruleObjList = (List<HashMap<String, Object>>) param.get("ruleObjArr");
		String ruleWhen = "";
		String ruleWhenKor = "";
		
		// 함수 import 경로
		String importRootPath = applicationProperties.getProperty("func.import.root_path");
				
		String funcImports = "";
		String funcNms = "";
		
		for(int i=0; i<ruleObjList.size(); i++) {
			String factorGrpNm = String.valueOf(ruleObjList.get(i).get("factorGrpNm"));
			
			if("함수".equals(factorGrpNm)) {
				String factorNmEn = (String) ruleObjList.get(i).get("factorNmEn");
				
				funcImports += "import static " + importRootPath + "." + factorNmEn + "." + factorNmEn.toLowerCase() + ";\n";
				
				if(i < ruleObjList.size()-1) {
					funcNms += (String) ruleObjList.get(i).get("factorNmEn") + ",";
					
				} else {
					funcNms += (String) ruleObjList.get(i).get("factorNmEn");
				}
			}
			
			if(i < ruleObjList.size()-1) {
				ruleWhen += ruleObjList.get(i).get("ruleAttr_source") + "\n";
				ruleWhenKor += ruleObjList.get(i).get("ruleAttr_txt") + "\n";
				
			} else {
				ruleWhen += ruleObjList.get(i).get("ruleAttr_source");
				ruleWhenKor += ruleObjList.get(i).get("ruleAttr_txt");
			}
		}
				
		param.put("FUNC_IMPORTS", "".equals(funcImports) ? null : funcImports);
		param.put("FUNC_NMS", "".equals(funcNms) ? null : funcNms);
		param.put("RULE_WHEN", ruleWhen);
		param.put("RULE_WHEN_KOR", ruleWhenKor);
		param.put("ruleId", Integer.parseInt(ruleId));
		
		HashMap<String, Object> ruleMap = ruleService.getRule(param);
		param.put("refRuleId", ruleMap.get("REF_RULE_ID"));
		param.put("refRuleVer", param.get("masterRuleRealVer"));
		param.put("ruleNm", ruleMap.get("RULE_NM"));
		param.put("ruleVer", String.valueOf(ruleMap.get("RULE_VER")));
		param.put("dfltSalience", ruleMap.get("DFLT_SALIENCE"));
		param.put("noLoop", ruleMap.get("NO_LOOP"));
		param.put("lockOnActive", ruleMap.get("LOCK_ON_ACTIVE"));
		param.put("targetType", ruleMap.get("TARGET_TYPE"));
		param.put("REG_USER_ID", ruleMap.get("REG_USRID"));
		
		// RULE 수정
		ruleService.ruleUpdate(param);
		
		// RULE 의 RULE_THEN 업데이트
		String attrThen = "";
		attrThen += "$map.put(\"ruleId_"+ ruleMap.get("RULE_ID") + "\", " + ruleMap.get("RULE_ID") +");\n";
		attrThen += "		$map.put(\"campId_"+ ruleMap.get("RULE_ID") + "\", " + ruleMap.get("CAMP_ID") +");\n";
		attrThen += "		$map.put(\"ruleNm_"+ ruleMap.get("RULE_ID") + "\", \"" + ruleMap.get("RULE_NM") +"\");\n";
		attrThen += "		$map.put(\"targetType_"+ ruleMap.get("RULE_ID") + "\", \"" + ruleMap.get("TARGET_TYPE") +"\");";
		
		param.put("RULE_THEN", attrThen);
		ruleService.updateAttrThen(param);
		
		return resultMap;
	}
}
