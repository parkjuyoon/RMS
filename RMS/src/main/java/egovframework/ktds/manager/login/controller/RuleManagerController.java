package egovframework.ktds.manager.login.controller;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import egovframework.ktds.manager.login.service.RuleManagerService;

@RequestMapping("/ruleManager")
@Controller
public class RuleManagerController {
	
	final static String schema = "rule_editor";
	
	@Resource(name = "ruleManagerService")
	protected RuleManagerService ruleManagerService;

	@RequestMapping("/ruleListView.do")
	public String ruleListView (ModelMap model) {
		return "/ruleList/listView";
	}
	
	@ResponseBody
	@RequestMapping(value = "/getRuleList.do", method = RequestMethod.POST)
	public HashMap<String, Object> getRuleList(@RequestParam HashMap<String, Object> pageInfo) {
		
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		
		HashMap<String, Object> param = new HashMap<String, Object>();
		param.put("schema", schema);
		param.put("pageInfo", pageInfo);

		List<HashMap<String, Object>> ruleList = ruleManagerService.getRuleList(param);
		int totalCnt = ruleManagerService.getRuleListTotalCnt(param);
		
		resultMap.put("ruleList", ruleList);
		resultMap.put("totalCnt", totalCnt);
		
		return resultMap;
	}
	
}
