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

import egovframework.ktds.targetai.service.SettingService;
import egovframework.rte.fdl.property.EgovPropertyService;

/**
 * @since 2021.05.25
 * @author 박주윤 차장
 *
 */
@RequestMapping("/targetai")
@Controller
public class SettingController {

	@Resource(name = "settingService")
	protected SettingService settingService;
	
	@Resource(name = "applicationProperties")
	protected Properties applicationProperties;
	
	/**
	 * package 관리 화면 이동
	 * @param model
	 * @return /targetai/pkg.jsp
	 */
	@RequestMapping(value = "/setting.do")
	public String main(HttpSession session, ModelMap model) {
		String member_id = (String) session.getAttribute("member_id");
		
		if(member_id == null) {
			return "redirect:/targetai/main.do";
		}
		
		return "/targetai/setting";
	}
	
	@ResponseBody
	@RequestMapping(value = "/getFuncList.do", method = RequestMethod.POST)
	public HashMap<String, Object> getFuncList() {
		HashMap<String, Object> resultMap = new HashMap<>();
		
		List<HashMap<String, Object>> funcList = settingService.getFuncList();
		
		resultMap.put("funcList", funcList);
		
		return resultMap;
	}
	
	@ResponseBody
	@RequestMapping(value = "/getFuncRootPath.do", method = RequestMethod.POST)
	public HashMap<String, Object> getFuncRootPath() {
		HashMap<String, Object> resultMap = new HashMap<>();
		
		String funcRootPath = applicationProperties.getProperty("func.import.root_path");
		resultMap.put("funcRootPath", funcRootPath);
		
		return resultMap;
	}
	
	@ResponseBody
	@RequestMapping(value = "/getFuncInfo.do", method = RequestMethod.POST)
	public HashMap<String, Object> getFuncInfo(@RequestBody HashMap<String, Object> param) {
		HashMap<String, Object> resultMap = new HashMap<>();
		
		List<HashMap<String, Object>> importInfoList = settingService.getImportInfo(param);
		List<HashMap<String, Object>> paramInfoList = settingService.getParamInfo(param);
		HashMap<String, Object> sourceInfo = settingService.getSourceInfo(param);
		
		resultMap.put("importInfoList", importInfoList);
		resultMap.put("paramInfoList", paramInfoList);
		resultMap.put("sourceInfo", sourceInfo);
		
		return resultMap;
	}
	
}
