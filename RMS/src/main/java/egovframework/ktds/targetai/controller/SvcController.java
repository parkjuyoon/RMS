package egovframework.ktds.targetai.controller;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import egovframework.ktds.targetai.service.SvcService;

/**
 * @since 2021.06.16
 * @author 박주윤 차장
 *
 */
@RequestMapping("/targetai")
@Controller
public class SvcController {

	@Resource(name = "svcService")
	protected SvcService svcService;
	
	/**
	 * 서비스 관리 화면 이동
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/svc.do")
	public String main(ModelMap model) {
		return "/targetai/svc";
	}
	
	/**
	 * 서비스 리스트 조회
	 * @param searchObj
	 * @return pkgList, pkgCount
	 */
	@ResponseBody
	@RequestMapping(value = "/getSvcList.do", method = RequestMethod.POST)
	public HashMap<String, Object> getPkgList(@RequestBody HashMap<String, Object> searchObj) {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		List<HashMap<String, Object>> pkgList = svcService.getSvcList(searchObj);
		int pkgCount = svcService.getSvcCount(searchObj);
		resultMap.put("svcList", pkgList);
		resultMap.put("svcCount", pkgCount);
		
		return resultMap;
	}
	
	/**
	 * 서비스 상세 조회
	 * @param SVC_ID
	 * @return svc
	 */
	@ResponseBody
	@RequestMapping(value = "/getSvc.do", method = RequestMethod.POST)
	public HashMap<String, Object> getSvc(@RequestBody HashMap<String, Object> param) {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		HashMap<String, Object> svc = svcService.getSvc(param);
		resultMap.put("svc", svc);
		
		return resultMap;
	}
	
	/**
	 * 서비스명 중복체크
	 * @param param
	 * @return boolean
	 */
	@ResponseBody
	@RequestMapping(value = "/svcNmCheck.do", method = RequestMethod.POST)
	public boolean svcNmCheck(@RequestBody HashMap<String, Object> map) {
		int svcNameCnt = svcService.svcNmCheck(map);
		
		if(svcNameCnt > 0) {
			return false;
		}
		
		return true;
	}
	
	/**
	 * 서비스 저장
	 * @param param
	 * @return resultMap
	 */
	@ResponseBody
	@RequestMapping(value = "/addSvc.do", method = RequestMethod.POST)
	public HashMap<String, Object> addSvc(@RequestBody HashMap<String, Object> param) {
		param.put("EVENT_ID", 1);
		param.put("REG_USER_ID", 1);
		// 서비스 저장
		svcService.addSvc(param);
		HashMap<String, Object> svc = svcService.getSvc(param);
		
		return svc;
	}
	
	/**
	 * 서비스 수정
	 * @param param
	 * @return resultMap
	 */
	@ResponseBody
	@RequestMapping(value = "/updateSvc.do", method = RequestMethod.POST)
	public HashMap<String, Object> updateSvc(@RequestBody HashMap<String, Object> param) {
		param.put("REG_USER_ID", 1);
		// 서비스 저장
		svcService.updateSvc(param);
		HashMap<String, Object> svc = svcService.getSvc(param);
		
		return svc;
	}
	
	/**
	 * 서비스 삭제
	 * @param param
	 * @return resultMap
	 */
	@ResponseBody
	@RequestMapping(value = "/deleteSvcById.do", method = RequestMethod.POST)
	public boolean deleteSvcById(@RequestBody HashMap<String, Object> param) {
		// PKG 삭제
		svcService.deleteSvcById(param);
		
		return true;
	}
}
