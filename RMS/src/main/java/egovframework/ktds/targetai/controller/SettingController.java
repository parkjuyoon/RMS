package egovframework.ktds.targetai.controller;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Properties;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import egovframework.ktds.targetai.service.SettingService;

/**
 * @since 2021.09.01
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
	
	/**
	 * FUNCTION 설정 > 함수명 SELECT BOX 전환시 리스트 조회
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/getFuncList.do", method = RequestMethod.POST)
	public HashMap<String, Object> getFuncList() {
		HashMap<String, Object> resultMap = new HashMap<>();
		
		List<HashMap<String, Object>> funcList = settingService.getFuncList();
		
		resultMap.put("funcList", funcList);
		
		return resultMap;
	}
	
	/**
	 * 함수 CLASS 가 저장되는 경로 조회
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/getFuncRootPath.do", method = RequestMethod.POST)
	public HashMap<String, Object> getFuncRootPath() {
		HashMap<String, Object> resultMap = new HashMap<>();
		
		String funcRootPath = applicationProperties.getProperty("func.import.root_path");
		resultMap.put("funcRootPath", funcRootPath);
		
		return resultMap;
	}
	
	/**
	 * FUNCTION 설정 > SELECT BOX 에서 함수 선택했을때 상세 내용 조회
	 * @param param
	 * @return
	 */
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
	
	/**
	 * FUNCTION 설정 > 저장 버튼 클릭 > 함수 저장
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/saveFuncSetting.do", method = RequestMethod.POST)
	public String saveFuncSetting(MultipartHttpServletRequest request) {
		
		try {
			List<MultipartFile> fileList = request.getFiles("sourceFile");
			
			for(MultipartFile mf : fileList) {
				System.out.println(mf.getOriginalFilename());
			}
			
			String sourceCode = request.getParameter("sourceCode");
			
			System.out.println(sourceCode);
			
			String importArray = request.getParameter("importArray");
			String paramArrayStr = request.getParameter("paramArray");
	
			JSONParser parser = new JSONParser();
			List<String> importList = (List<String>) parser.parse(importArray);
			List<HashMap<String, Object>> parameterList = (List<HashMap<String, Object>>) parser.parse(paramArrayStr);
			
			for(String s : importList) {
				System.out.println(s);
			}
			
			for(HashMap m : parameterList) {
				System.out.println(m);
			}
			
			
		} catch (ParseException e) {
			e.printStackTrace();
		}
		
		return "true";
	}
	
}
