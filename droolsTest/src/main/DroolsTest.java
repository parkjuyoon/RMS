package main;

import java.util.HashMap;

import org.kie.api.runtime.KieSession;

public class DroolsTest {

	private static final String PATH = "C:\\Users\\parkjy\\git\\repository\\droolsTest\\drl\\";
	
	public static void main(String[] args) throws Exception {

		HashMap<String, Object> activeMap1 = new HashMap<>();
		activeMap1.put("MPHON_SBSC_YN", "Y");
		activeMap1.put("CUST_AGE", 40);
		activeMap1.put("PARAM_VAL", 12);
		
		DynamicClassBuilder dcb = new DynamicClassBuilder();
		
//		String body = "Object[] result = new Object[1]; if(params[0] == 't') result[0] = 'a'; else result[0] = 'b'; return result;";
		
		String body = "";
		body += "		if (day > 20 && \"wa01\".equals(code)) {\n";
		body += "			return true;\n";
		body += "		}\n";
		body += "		return false;\n";
		
		// 실행할 Method에 전달할 파라미터 세팅. 테스트 데이터
//		Object[] params = new Object[] {"wa01", 10};
//		Object[] params = new Object[] {'t', 'e', 's', 't'};
		Object[] params = new Object[2];
		params[0] = "wa01";
		params[1] = 30;
		
//		String code = (String) params[0];
//		int day = (int) params[1];
//		
//		System.out.println(code);
//		System.out.println(day);
		
		// 위 문자열을 기준으로 생성된 class를 object로 생성
		
		Object obj = dcb.createInstance(body, params);
		
		// 실행 후 결과 전달 받음
//		boolean rst = dcb.runObject(obj, params);	// 원래는 이렇게 실행시키는데 drools 에서 실행시키기 위해 아래와 같이함.
		
		// 실행 결과 출력
//        System.out.print("Object result : " + rst);
		
		// Drools 실행
		KieSession kieSession = Util.getKieSession(PATH + "externalRools.drl");
		kieSession.insert(activeMap1);
		kieSession.fireAllRules();
		
		System.out.println(activeMap1);
		
		kieSession.dispose();
	}
}


/*
 * drl 내용
package drl;
import java.util.Map;
import static main.func.DaySinceLastEvent.run;

rule "CheckIsEmpty1"
	no-loop true
	lock-on-active true
	salience 1
	when
		$map : Map(
			this["INSUR_PROD_SBSC_YN"]=="Y" &&
			this["IPTV_SBSC_YN"]<"50" ||
		    eval(run(new Object[] {"wa01", 30}) == false)
		)
	then
	    $map.put("function_result1", "결과값");
end
 * 
 */
//$map.put("ruleId_156", 156);
//$map.put("campId_156", null);
//$map.put("salience_156", 1);
//$map.put("ruleNm_156", "bbb");
//$map.put("targetType_156", "CONT");