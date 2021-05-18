package egovframework.example.sample.web;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;

public class DroolsScoreExample {

    public static void execute( KieContainer kc ) throws Exception{
        // From the container, a session is created based on
        // its definition and configuration in the META-INF/kmodule.xml file
        KieSession ksession = kc.newKieSession("point-rulesKS");

//        List<Order> orderList = getInitData();
//
//        for (int i = 0; i < orderList.size(); i++) {
//            Order o = orderList.get(i);
//            ksession.insert(o);
//            ksession.fireAllRules();
//            addScore(o);
//        }
        
        List<HashMap<String, Object>> orderList = new ArrayList<HashMap<String, Object>>();
        HashMap<String, Object> order = new HashMap<String, Object>();
        HashMap<String, Object> user = new HashMap<String, Object>();
        
        user.put("name", "Name1");
        order.put("amout", "80");
        order.put("score", "111");
        order.put("user", user);
        orderList.add(order);
        
        order = new HashMap<String, Object>();
        user = new HashMap<String, Object>();
        user.put("name", "Name2");
        order.put("amout", "200");
        order.put("user", user);
        orderList.add(order);
        
        order = new HashMap<String, Object>();
        user = new HashMap<String, Object>();
        user.put("name", "Name3");
        order.put("amout", "800");
        order.put("user", user);
        orderList.add(order);
        
        order = new HashMap<String, Object>();
        user = new HashMap<String, Object>();
        user.put("name", "Name4");
        order.put("amout", "1000");
        order.put("user", user);
        orderList.add(order);
        
        for (int i = 0; i < orderList.size(); i++) {
        	HashMap<String, Object> o = orderList.get(i);
        	ksession.insert(o);
        	ksession.fireAllRules();
        	addScore(o);
        }
        
        ksession.dispose();

    }

  
    private static void addScore(HashMap<String, Object> o){  
//        System.out.println("name : " + o.getUser().getName() + " score : " + o.getScore());  
        System.out.println("name : " + ((HashMap<String, Object>)o.get("user")).get("name") + " score : " + o.get("score"));  
    }  
      
    private static List<Order> getInitData() throws Exception {  
        List<Order> orderList = new ArrayList<Order>();
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        {  
            Order order = new Order();  
            order.setAmout(80);  
            order.setBookingDate(df.parse("2015-07-01"));  
            User user = new User();  
            user.setLevel(1);  
            user.setName("Name1");  
            order.setUser(user);
            order.setScore(111);
            orderList.add(order);  
        }  
        {  
            Order order = new Order();  
            order.setAmout(200);  
            order.setBookingDate(df.parse("2015-07-02"));  
            User user = new User();  
            user.setLevel(2);  
            user.setName("Name2");  
            order.setUser(user);  
            orderList.add(order);  
        }  
        {  
            Order order = new Order();  
            order.setAmout(800);  
            order.setBookingDate(df.parse("2015-07-03"));  
            User user = new User();  
            user.setLevel(3);  
            user.setName("Name3");  
            order.setUser(user);  
            orderList.add(order);  
        }  
        {  
            Order order = new Order();  
            order.setAmout(1500);  
            order.setBookingDate(df.parse("2015-07-04"));  
            User user = new User();  
            user.setLevel(4);  
            user.setName("Name4");  
            order.setUser(user);  
            orderList.add(order);  
        }  
        return orderList;  
    }  
}  