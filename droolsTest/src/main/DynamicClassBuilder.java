package main;

import java.io.File;
import java.io.FileWriter;
import java.lang.reflect.Method;
import java.net.URL;
import java.net.URLClassLoader;
import java.util.ArrayList;

import javax.tools.JavaCompiler;
import javax.tools.ToolProvider;

public class DynamicClassBuilder {

	/**
	 * .class 파일 생성 후 Object 로 리턴
	 * @param body 메소드 안의 소스내용
	 * @return java->class->instance Object
	 */
	public Object createInstance(String body, Object[] params) {
		
		try {
			// 프로젝트(실행되는 main 소스)의 Home Directory 경로 조회
			String path = DynamicClassBuilder.class.getProtectionDomain().getCodeSource().getLocation().getPath();
			
			// source 만들고 java 파일 생성
			String classNm = "DaySinceLastEvent";
			String packageNm = "main.func";
			String methodNm = "run";
			
			File sourceFile = new File(path + "main/func/"+ classNm +".java");
			String source = this.getSource(packageNm, classNm, methodNm, params, body);
			System.out.println(path);
			System.out.println(source);
			new FileWriter(sourceFile).append(source).close();
			
			// 만들어진 java 파일을 컴파일 한다.
			JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();
			compiler.run(null, System.out, System.out, sourceFile.getPath());
			
			// 컴파일된 class를 load 한다.
			URL[] urls = new URL[] {
					new File(path + "main/func").toURI().toURL()
			};
			URLClassLoader classLoader = URLClassLoader.newInstance(urls);
			
			Class<?> cls = Class.forName(packageNm + "." + classNm, true, classLoader);
			return cls.newInstance();
		
		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;
	}
	
	/**
	 * 소스를 string으로 만들어 리턴
	 * @param classNm
	 * @param packageNm
	 * @param methodNm
	 * @param body
	 * @return
	 */
	private String getSource(String packageNm, String classNm, String methodNm, Object[] params, String body) {

		StringBuffer sb = new StringBuffer();
		
		// java source를 생성한다.
		sb.append("package " + packageNm + ";\n\n");
		sb.append("public class " + classNm + "{\n");
		sb.append("	public static boolean " + methodNm + "(Object[] params) throws Exception {\n");
		for(int i=0; i<params.length; i++) {
			switch (params[i].getClass().getSimpleName()) {
			case "String":
				sb.append("		String code = (String) params["+ i +"];\n");
				break;
			case "Integer":
				sb.append("		int day = (int) params["+ i +"];\n");
				break;

			default:
				break;
			}
		}
		sb.append(body);
		sb.append("	}\n}");
		
		return sb.toString();
	}

	/**
	 * 
	 * @param obj
	 * @param params
	 * @return
	 */
	public boolean runObject(Object obj, Object[] params) throws Exception {
		
		String methodName = "run";
		Class[] arguments = new Class[] {params.getClass()};
		
		// source를 만들때 지정한 method를 실행
		Method objMethod = obj.getClass().getMethod(methodName, arguments);
		Object result = objMethod.invoke(obj, new Object[] {params});
		
		return (boolean) result;
	}
}
