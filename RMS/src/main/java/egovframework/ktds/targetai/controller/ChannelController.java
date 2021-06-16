package egovframework.ktds.targetai.controller;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import egovframework.ktds.targetai.service.ChannelService;

@RequestMapping("/targetai")
@Controller
public class ChannelController {

	@Resource(name = "channelService")
	protected ChannelService channelService;
	
	/**
	 * 채널 목록
	 * @param CHANNEL_ID
	 * @return channel
	 */
	@ResponseBody
	@RequestMapping(value = "/getChannelList.do", method = RequestMethod.POST)
	public HashMap<String, Object> getChannelList(@RequestBody HashMap<String, Object> searchObj) {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		List<HashMap<String, Object>> pkgList = channelService.getChannelList(searchObj);
		int pkgCount = channelService.getChannelCount(searchObj);
		resultMap.put("channelList", pkgList);
		resultMap.put("channelCount", pkgCount);
			
		return resultMap;
	}
}
