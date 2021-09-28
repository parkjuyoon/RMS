package main.func;

public class DaySiceLastEvent{
	public static boolean run(Object[] params) throws Exception {
		String code = (String) params[0];
		int day = (int) params[1];
		if (day > 20 && "wa01".equals(code)) {
			return true;
		}
		return false;
	}
}