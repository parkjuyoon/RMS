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
import egovframework.ktds.targetai.util.DynamicClassBuilder;

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
		
		int pid = settingService.getFuncPid();
		resultMap.put("PID", pid);
		
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
		
		String funcRootPath = "import static " + applicationProperties.getProperty("func.import.root_path");
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
		
		List<HashMap<String, Object>> paramInfoList = settingService.getParamInfo(param);
		HashMap<String, Object> factor = settingService.getFactorById(param);
		
		resultMap.put("factor", factor);
		resultMap.put("paramInfoList", paramInfoList);
		
		return resultMap;
	}
	
	/**
	 * FUNCTION 설정 > 저장 버튼 클릭 > 함수 저장
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/saveFuncSetting.do", method = RequestMethod.POST)
	public boolean saveFuncSetting(@RequestBody HashMap<String, Object> param) {
		
		try {
			HashMap<String, Object> paramMap = new HashMap<>();
			
			String factorId = (String) param.get("factorId");
			
			// factorId
			paramMap.put("pid", param.get("pid"));
			// factorId
			paramMap.put("factorId", factorId);
			// 함수명(한글)
			paramMap.put("funcNm", param.get("funcNm"));
			// 함수명(영문)
			paramMap.put("funcNmEn", param.get("funcNmEn"));
			// parameter 객체
			List<HashMap<String, Object>> parameterList = (List<HashMap<String, Object>>) param.get("paramArray");
			paramMap.put("parameterList", parameterList);
			// source code 내용
			String sourceCode = (String) param.get("sourceCode");
			paramMap.put("sourceCode", sourceCode);
	
			// CLASS 파일 생성
			String funcRootPath = applicationProperties.getProperty("func.import.root_path");
			DynamicClassBuilder dcb = new DynamicClassBuilder();
			Object instance = dcb.createInstance(funcRootPath, (String) param.get("funcNmEn"), sourceCode, parameterList);
			
			if(instance == null) {
				return false;
			}
			
			// 신규등록
			if("".equals(factorId)) {
				// factor 추가
				settingService.addFunctionFactor(paramMap);
				// 파라미터 추가
				settingService.addFunctionParameter(paramMap);
				
			// 수정
			} else {
				// factor 수정
				settingService.updateFunctionFactor(paramMap);
				// 파라미터 삭제
				settingService.delFunctionParameter(paramMap);
				// 파라미터 추가
				settingService.addFunctionParameter(paramMap);
			}
		
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return true;
	}
	
}
