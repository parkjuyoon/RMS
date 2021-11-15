package egovframework.ktds.targetai.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import egovframework.ktds.targetai.service.BatchService;

@RequestMapping("/targetai/batch")
@Controller
public class BatchController {

	@Resource(name = "batchService")
	protected BatchService batchService;
	
	/**
	 * STAT_INFO 저장
	 * @param model
	 */
	@RequestMapping(value = "/addStatInfo.do")
	public void addStatInfo(HttpServletRequest req, ModelMap model) {
		// STAT_INFO 데이터 쌓음.
		batchService.addStatInfo();
	}
	
	/**
	 * IB_REAL_STAT 저장
	 * @param model
	 */
	@RequestMapping(value = "/addInRealStat.do")
	public void addInRealStat(HttpServletRequest req, ModelMap model) {
		// IB_REAL_STAT 데이터 쌓음.
		batchService.addInRealStat();
	}
	
	/**
	 * OB_REAL_STAT 저장
	 * @param model
	 */
	@RequestMapping(value = "/addObRealStat.do")
	public void addObRealStat(HttpServletRequest req, ModelMap model) {
		// IB_REAL_STAT 데이터 쌓음.
		batchService.addObRealStat();
	}
}
