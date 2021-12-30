package egovframework.ktds.targetai.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

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
		
		try {
			// 맵핑된 RULE 목록 조회 
			List<HashMap<String, Object>> mappingRuleList = pkgService.getMappingRuleList(param);
			param.put("mappingRuleList", mappingRuleList);
			// 패키지와 연결 가능한 RULE 목록 조회(운영중인 RULE만 나온다)
			List<HashMap<String, Object>> conRuleList = pkgService.getConRuleList(param);
			// 최근 수정 중인 패키지 상세 조회
			HashMap<String, Object> pkg = pkgService.getPkg(param);
			
			resultMap.put("pkg", pkg);
			resultMap.put("conRuleList", conRuleList);
			resultMap.put("mappingRuleList", mappingRuleList);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return resultMap;
	}
	
	/**
	 * drl 소스 조회
	 * @param PKG_ID
	 * @return pkg
	 */
	@ResponseBody
	@RequestMapping(value = "/getDrlSouce.do", method = RequestMethod.POST)
	public HashMap<String, Object> getDrlSouce(@RequestBody HashMap<String, Object> param) {
		// DRL 소스 업데이트
		HashMap<String, Object> pkg = pkgService.getPkgVer(param);
		ruleService.saveDRL(pkg);
		
		return pkg;
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
	 * PKG 저장
	 * @param param
	 * @return resultMap
	 */
	@ResponseBody
	@RequestMapping(value = "/addPkg.do", method = RequestMethod.POST)
	public HashMap<String, Object> addPkg(@RequestBody HashMap<String, Object> param, HttpSession session) {
		String regUserId = (String) session.getAttribute("member_id");
		param.put("REG_USER_ID", regUserId);
		
		// PKG, PKG_VER, RULE_PKG 연결정보 저장
		pkgService.addPkg(param);
		
		return param;
	}
	
	/**
	 * PKG 수정
	 * @param param
	 * @return resultMap
	 */
	@ResponseBody
	@RequestMapping(value = "/updatePkg.do", method = RequestMethod.POST)
	public HashMap<String, Object> updatePkg(@RequestBody HashMap<String, Object> param, HttpSession session) {
		HashMap<String, Object> rtnMap = new HashMap<>();
		
		String regUserId = (String) session.getAttribute("member_id");
		
		param.put("REG_USER_ID", regUserId);
		param.put("PATH", "/drl_files");
		
		// 패키지 업데이트
		pkgService.updatePkg(param);
		
		return rtnMap;
	}
	
	/**
	 * 패키지 버전 목록 조회
	 * @param param
	 * @return resultMap
	 */
	@ResponseBody
	@RequestMapping(value = "/getPkgVerList.do", method = RequestMethod.POST)
	public HashMap<String, Object> getPkgVerList(@RequestBody HashMap<String, Object> param, HttpSession session) {
		HashMap<String, Object> resultMap = new HashMap<>();
		
		// 해당패키지의 버전목록 조회
		List<HashMap<String, Object>> verList = pkgService.getDeployVerListByPkgId(param);
		int verCount = pkgService.getDeployVerCountByPkgId(param);
		
		resultMap.put("verList", verList);
		resultMap.put("verCount", verCount);
		
		return resultMap;
	}
	
	/**
	 * 해당 패키지 버전의 이벤트 목록 조회
	 * @param param
	 * @return resultMap
	 */
	@ResponseBody
	@RequestMapping(value = "/getEventList.do", method = RequestMethod.POST)
	public HashMap<String, Object> getEventList(@RequestBody HashMap<String, Object> param, HttpSession session) {
		// 해당패키지의 버전목록 & 목록 개수 조회
		HashMap<String, Object> eventInfo = pkgService.getEventInfo(param);
		
		return eventInfo;
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
	
	/**
	 * 개발중인 패키지 배포
	 * @param param
	 * @return resultMap
	 */
	@ResponseBody
	@RequestMapping(value = "/deployVer.do", method = RequestMethod.POST)
	public HashMap<String, Object> deployVer(@RequestBody HashMap<String, Object> param, HttpSession session) {
		String regUserId = (String) session.getAttribute("member_id");
		param.put("REG_USER_ID", regUserId);
		// 운영중인 버전 종료하고 개발중인 버전을 운영버전으로 변경
		HashMap<String, Object> rtnMap = pkgService.deployVer(param);
		
		return rtnMap;
	}
}
