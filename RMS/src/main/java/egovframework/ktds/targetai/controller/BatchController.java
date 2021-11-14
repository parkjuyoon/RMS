package egovframework.ktds.targetai.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import egovframework.ktds.targetai.service.BatchService;

@RequestMapping("/batch")
@Controller
public class BatchController {

	@Resource(name = "batchService")
	protected BatchService batchService;
	
	/**
	 * IB_REAL_STAT 저장
	 * @param model
	 */
	@RequestMapping(value = "/inBound.do")
	public void inRealStat(HttpServletRequest req, ModelMap model) {
		
	}
	
	/**
	 * OB_REAL_STAT 저장
	 * @param model
	 */
	@RequestMapping(value = "/outBound.do")
	public void obRearStat(HttpServletRequest req, ModelMap model) {
		
	}
}
