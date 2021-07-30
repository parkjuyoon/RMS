package egovframework.ktds.targetai.function;

import java.util.HashMap;

public class DaySinceLastEvent {
	
	public boolean main(Object param1, Object param2) {

		boolean rt = false;
		
		HashMap<String, Object> pm1 = (HashMap<String, Object>) param1;
		HashMap<String, Object> pm2 = (HashMap<String, Object>) param2;
		
		String code = (String) pm1.get("ARG_VAL");
		int day = Integer.parseInt((String) pm2.get("ARG_VAL"));
		
		if("uninterested".equals(code) && day > 20) {
			rt = true;
			
		} else if("interested".equals(code) && day > 20) {
			rt = true;
			
		} else if("accepted".equals(code) && day > 20) {
			rt = true;
			
		} else if("secondTmAccepted".equals(code) && day > 20) {
			rt = true;
			
		} else {
			rt = true;
		}
		
		return rt;
	}

}
