package egovframework.ktds.targetai.function;

public class DaySinceLastCampaign {
	
	public static boolean main1(String code, int day) {
		boolean rt = false;
		
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
	
	public static boolean main(String param) {
        if (param == null || "".equals(param)) {
            return true;
        }
        return false;
    }
}
