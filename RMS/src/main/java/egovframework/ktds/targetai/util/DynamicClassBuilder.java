package egovframework.ktds.targetai.util;

import java.io.File;
import java.io.FileWriter;
import java.lang.reflect.Method;
import java.net.URL;
import java.net.URLClassLoader;
import java.util.HashMap;
import java.util.List;

import javax.tools.JavaCompiler;
import javax.tools.ToolProvider;

import egovframework.ktds.targetai.controller.SettingController;

public class DynamicClassBuilder {

	/**
	 * .class 파일 생성 후 Object 로 리턴
	 * @param body 메소드 안의 소스내용
	 * @return java->class->instance Object
	 */
	public Object createInstance(String funcRootPath, String funcNmEn, String body, List<HashMap<String, Object>> parameterList) {
		
		try {
			// 프로젝트(실행되는 main 소스)의 Home Directory 경로 조회
			String path = DynamicClassBuilder.class.getProtectionDomain().getCodeSource().getLocation().getPath();
			
			// source 만들고 java 파일 생성
			String classNm = funcNmEn;
			String packageNm = funcRootPath;
			String methodNm = funcNmEn.toLowerCase();
			String filePath = path + funcRootPath.replaceAll("\\.", "/") + "/" + classNm;
			
			File sourceFile = new File(filePath +".java");
			String source = this.getSource(packageNm, classNm, methodNm, parameterList, body);
			new FileWriter(sourceFile).append(source).close();
			
			// 만들어진 java 파일을 컴파일 한다.
			JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();
			int compileResult = compiler.run(null, System.out, System.out, sourceFile.getPath());
			
			if(compileResult != 0) {
				return null;
			} else {
				return new Object();
			}
			
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
	private String getSource(String packageNm, String classNm, String methodNm, List<HashMap<String, Object>> parameterList, String body) {

		StringBuffer sb = new StringBuffer();
		
		// java source를 생성한다.
		sb.append("package " + packageNm + ";\n\n");
		sb.append("public class " + classNm + "{\n");
		sb.append("	public static boolean " + methodNm);
		
		String paramTxt = "(";
		int cnt=0;
		for(HashMap<String, Object> pt : parameterList) {
			String paramType = (String) pt.get("paramType");
			String paramVal = (String) pt.get("paramVal");
			
			cnt ++;
			if(cnt == parameterList.size()) {
				paramTxt += paramType + " " + paramVal;
			} else {
				paramTxt += paramType + " " + paramVal + ", ";
			}
		}
		paramTxt += ") ";
		
		sb.append(paramTxt);
		sb.append("throws Exception {\n");
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
