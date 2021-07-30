package egovframework.ktds.targetai.util;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.List;

public class FunctionUtil {

	private static final String packageName = "egovframework.ktds.targetai.function";
	
	public boolean result(String className, List<HashMap<String, Object>> argList) {
		
		boolean rs = false;
				
		try {
			Class<?> cls = Class.forName(packageName + "." + className);
			Object newObj = cls.newInstance();
			Method method = null;
			
			switch (argList.size()) {
			case 0:
				method = cls.getDeclaredMethod("main");
				rs = (boolean) method.invoke(newObj);
				break;
			case 1:
				method = cls.getDeclaredMethod("main", Object.class);
				rs = (boolean) method.invoke(newObj, argList.get(0));
				break;
			case 2:
				method = cls.getDeclaredMethod("main", Object.class, Object.class);
				rs = (boolean) method.invoke(newObj, argList.get(0), argList.get(1));
				break;
			case 3:
				method = cls.getDeclaredMethod("main", Object.class, Object.class, Object.class);
				rs = (boolean) method.invoke(newObj, argList.get(0), argList.get(1), argList.get(2));
				break;
			case 4:
				method = cls.getDeclaredMethod("main", Object.class, Object.class, Object.class, Object.class);
				rs = (boolean) method.invoke(newObj, argList.get(0), argList.get(1), argList.get(2), argList.get(3));
				break;
			case 5:
				method = cls.getDeclaredMethod("main", Object.class, Object.class, Object.class, Object.class, Object.class);
				rs = (boolean) method.invoke(newObj, argList.get(0), argList.get(1), argList.get(2), argList.get(3), argList.get(4));
				break;
			case 6:
				method = cls.getDeclaredMethod("main", Object.class, Object.class, Object.class, Object.class, Object.class, Object.class);
				rs = (boolean) method.invoke(newObj, argList.get(0), argList.get(1), argList.get(2), argList.get(3), argList.get(4), argList.get(5));
				break;
			case 7:
				method = cls.getDeclaredMethod("main", Object.class, Object.class, Object.class, Object.class, Object.class, Object.class, Object.class);
				rs = (boolean) method.invoke(newObj, argList.get(0), argList.get(1), argList.get(2), argList.get(3), argList.get(4), argList.get(5), argList.get(6));
				break;
			case 8:
				method = cls.getDeclaredMethod("main", Object.class, Object.class, Object.class, Object.class, Object.class, Object.class, Object.class, Object.class);
				rs = (boolean) method.invoke(newObj, argList.get(0), argList.get(1), argList.get(2), argList.get(3), argList.get(4), argList.get(5), argList.get(6), argList.get(7));
				break;
			case 9:
				method = cls.getDeclaredMethod("main", Object.class, Object.class, Object.class, Object.class, Object.class, Object.class, Object.class, Object.class, Object.class);
				rs = (boolean) method.invoke(newObj, argList.get(0), argList.get(1), argList.get(2), argList.get(3), argList.get(4), argList.get(5), argList.get(6), argList.get(7), argList.get(8));
				break;
			case 10:
				method = cls.getDeclaredMethod("main", Object.class, Object.class, Object.class, Object.class, Object.class, Object.class, Object.class, Object.class, Object.class, Object.class);
				rs = (boolean) method.invoke(newObj, argList.get(0), argList.get(1), argList.get(2), argList.get(3), argList.get(4), argList.get(5), argList.get(6), argList.get(7), argList.get(8), argList.get(9));
				break;
			case 11:
				method = cls.getDeclaredMethod("main", Object.class, Object.class, Object.class, Object.class, Object.class, Object.class, Object.class, Object.class, Object.class, Object.class, Object.class);
				rs = (boolean) method.invoke(newObj, argList.get(0), argList.get(1), argList.get(2), argList.get(3), argList.get(4), argList.get(5), argList.get(6), argList.get(7), argList.get(8), argList.get(9), argList.get(10));
				break;
			default:
				throw new Exception();
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return rs;
	}
}
