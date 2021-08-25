package egovframework.ktds.targetai.function;

public class DaySinceLastEvent {
	
	public static boolean main(String code, int day) {
		boolean rt = false;
		
		if("uninterested".equals(code) && day > 20) {
			rt = true;
			
		} else if("interested".equals(code) && day > 20) {
			rt = false;
			
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
