package main;

import java.util.Collection;
import java.util.HashMap;

import org.kie.api.runtime.KieSession;

public class DroolsTest {

	private static final String PATH = "C:\\work\\eGovFrameDev-3.9.0-64bit\\workspace\\droolsTest\\drl\\source.drl";
	
	public static void main(String[] args) {

		HashMap<String, Object> activeMap1 = new HashMap<>();
		HashMap<String, Object> activeMap2 = new HashMap<>();
		activeMap1.put("MPHON_SBSC_YN", "Y");
		activeMap1.put("CUST_AGE", 40);
		activeMap1.put("ENGT_YN", "Y");
		activeMap1.put("INET_COMB_YN", "N");
		activeMap1.put("NOW_HNDSET_USE_DAY_NUM", 20);
		
		// Drools 실행
		KieSession kieSession = Util.getKieSession(PATH);
		
		kieSession.insert(activeMap1);
		kieSession.insert(activeMap2);
		kieSession.fireAllRules();
		
//		Collection<? extends Object> a = kieSession.getObjects();
//		Collection<? extends Object> list = new ArrayList<>(a);
		
		System.out.println(activeMap1);
		System.out.println(activeMap2);
		
		kieSession.dispose();
		
		
		
	}
	
}
