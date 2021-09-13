package main;

import java.util.HashMap;

import org.kie.api.runtime.KieSession;

public class DroolsTest {

	private static final String PATH = "C:\\Users\\parkjy\\git\\repository\\droolsTest\\drl\\source.drl";
	
	public static void main(String[] args) {

		HashMap<String, Object> activeMap1 = new HashMap<>();
		activeMap1.put("MPHON_SBSC_YN", "Y");
		activeMap1.put("CUST_AGE", 40);
		activeMap1.put("PARAM_VAL", 12);
		
		// Drools 실행
		KieSession kieSession = Util.getKieSession(PATH);
		
		kieSession.insert(activeMap1);
		kieSession.fireAllRules();
		
//		Collection<? extends Object> a = kieSession.getObjects();
//		Collection<? extends Object> list = new ArrayList<>(a);
		
		System.out.println(activeMap1);
		
		kieSession.dispose();
	}
}

//$map.put("ruleId_156", 156);
//$map.put("campId_156", null);
//$map.put("salience_156", 1);
//$map.put("ruleNm_156", "bbb");
//$map.put("targetType_156", "CONT");