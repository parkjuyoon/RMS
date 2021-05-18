package egovframework.example.sample.web;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.kie.api.runtime.KieSession;

import egovframework.ktds.drools.config.DroolsUtil;

public class DroolsMapExample {
	
	public static HashMap<String, Object> ruleMap;
	
	public DroolsMapExample(HashMap<String, Object> map) {
		this.ruleMap = map;
	}

    public static List<String> execute() throws Exception{
    	
        KieSession ksession = DroolsUtil.getKieSession("rules/MapExample.drl");

    	ksession.insert(ruleMap);
    	ksession.fireAllRules();
    	
    	List<String> returnList = print(ruleMap);
        
        ksession.dispose();
        
        return returnList;
    }
    
    @SuppressWarnings("rawtypes")
	private static List<String> print(HashMap<String, Object> rtn){ 
    	Iterator<String> iter = rtn.keySet().iterator();
    	HashMap<String, Object> resultMap = new HashMap<>();
    	
    	List<String> returnList = new ArrayList<>();
    	
    	while(iter.hasNext()) {
    		String key = iter.next();
    		Object value = rtn.get(key);

    		if(key.contains("RuleName_")) {
    			resultMap.put(key, value);
    		}
    	}
    	
    	Iterator it = sortByValue(resultMap).iterator();
    	
    	while(it.hasNext()) {
    		String key = (String) it.next();
    		String printStr = key.replace("RuleName_", "") + " = Y";
    				
            System.out.println(printStr);
    		
            returnList.add(printStr);
    	}
    	
    	return returnList;
    }  
    
    @SuppressWarnings({ "unchecked", "rawtypes" })
	public static List sortByValue(final Map map) {
        List<String> list = new ArrayList();
        list.addAll(map.keySet());

        Collections.sort(list,new Comparator() {
            public int compare(Object o1,Object o2) {
                Object v1 = map.get(o1);
                Object v2 = map.get(o2);

                return ((Comparable) v2).compareTo(v1);

            }
        });

        Collections.reverse(list); // 주석시 오름차순

        return list;
    }
}  