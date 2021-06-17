package egovframework.ktds.targetai.controller;

import java.io.File;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.kie.api.runtime.KieSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import egovframework.ktds.drools.config.DroolsUtil;
import net.sf.json.JSONException;

@RequestMapping("/targetai/api")
@Controller
public class ApiController {
	
	@Autowired
	private ApplicationContext context;
	
	/**
	 * REQUEST REST API
	 * @param svc_id, cust_id
	 * @return JSONObject
	 * 			
	 */
	@RequestMapping(value = "/request.do")
	public void result(HttpServletResponse response, HttpServletRequest request) {
		long beforeTime = System.currentTimeMillis();
		
		response.setCharacterEncoding("UTF-8");
		response.setContentType("application/json");
		
		// 데이터 조회할 위치
		String source = request.getParameter("source");	// EN_CUST_ITEM1_TXN, ......
		// 조회할 KEY 값
		String key = request.getParameter("key");		// ACC_CUST_SROW_ID
		// 조회할 VALUE 값
		String val = request.getParameter("val");		// ACC_CUST_SROW_ID_1, ACC_CUST_SROW_ID_2, ..... 
		// 서비스 아이디
		String svc_id = request.getParameter("svc_id");
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		
		try {
			// RULE 테스트 할 객체 조회
			JSONObject robj = getMap(source, key, val);
			
			DataSource dbSource = (DataSource) context.getBean("dataSource");
			conn = dbSource.getConnection();
			
			String sql = ""
					+ "SELECT "
					+ "		P.PATH, "
					+ "		P.PKG_NM, "
					+ "		P.DRL_NM "
					+ "FROM "
					+ "		targetai.SVC S "
					+ " 	LEFT JOIN targetai.PKG P ON (S.PKG_ID = P.PKG_ID) "
					+ "		WHERE "
					+ " 		S.SVC_ID = " + svc_id;
			
			pstmt = conn.prepareStatement(sql);
			rs = pstmt.executeQuery();
			
			while(rs.next()) {
				String path = rs.getString("PATH");
				String pkgNm = rs.getString("PKG_NM");
				String drlNm = rs.getString("DRL_NM");
				
				// Drools Get Session
				String drlPath = path.replace("/", File.separator) + File.separator + pkgNm + File.separator + drlNm;
				drlPath = System.getProperty("user.home") + drlPath;
				
				JSONArray jsonArr = resultJSON(drlPath, robj);
				response.getWriter().print(jsonArr);
				
				break;	// 어차피 결과는 한개이지만 혹시나 여러번 돌 경우를 대비하여 한번만 돌게한다.
			}
			
			
			long afterTime = System.currentTimeMillis();
			long diffTime = (afterTime - beforeTime)/1000;
			
			response.getWriter().print("\n\n\n걸린시간 : " + diffTime + " 초");
			
		} catch (Exception e) {
			try {e.printStackTrace(response.getWriter()); e.printStackTrace();} catch (IOException e1) {e1.printStackTrace();}
		} finally {
			if(pstmt != null) try {pstmt.close();} catch (SQLException e) {};
			if(rs != null) try {rs.close();} catch (SQLException e) {};
			if(conn != null) try {conn.close();} catch (SQLException e) {};
		}
	}
	
	private JSONObject getMap(String source, String key, String val) throws SQLException {
		JSONObject rsObj = new JSONObject();
		DataSource dbSource = (DataSource) context.getBean("dataSource");
		Connection conn = dbSource.getConnection();
		
		String sql = ""
				+ " SELECT "
				+ "		*"
				+ " FROM"
				+ "		targetai." + source
				+ "	WHERE"
				+ " 	" + key + " = '" + val + "'";
		
		PreparedStatement pstmt = conn.prepareStatement(sql);
		ResultSet rs = pstmt.executeQuery();
		
		int columns = rs.getMetaData().getColumnCount();
		
		while(rs.next()) {
			for(int i=1; i<=columns; i++) {
				String columnNm = rs.getMetaData().getColumnName(i);
				String columnType = rs.getMetaData().getColumnTypeName(i);
				
				if(columnType.contains("CHAR")) {
					rsObj.put(columnNm, rs.getString(i));
					
				} else if(columnType.contains("INT")) {
					rsObj.put(columnNm, rs.getInt(i));
					
				} else {
					rsObj.put(columnNm, rs.getObject(i));
				}
			}
		}
		
		return rsObj;
	}
	
	private JSONArray resultJSON(String path, JSONObject obj) {
		
		// Drools 실행
		KieSession kieSession = DroolsUtil.getKieSession(path);
		
		kieSession.insert(obj);
		kieSession.fireAllRules();
		kieSession.dispose();
		
		// 결과화면에 정렬되게 보이기 위해 변환
		List<JSONObject> resJsonArr = new ArrayList<>();
		
		Iterator<String> iter = obj.keySet().iterator();
		
		while(iter.hasNext()) {
			String key = iter.next().toString();
			String value = (String) obj.get(key);
			
			if(key.startsWith("res_")) {
				key = key.replaceAll("res_", "");
				String salience = key.split("_")[1];
				
				JSONObject resJson = new JSONObject();
				resJson.put("salience", salience);
				resJson.put("rule_name", value);
				
				resJsonArr.add(resJson);
			}
		}
		
		Collections.sort(resJsonArr, new Comparator<JSONObject>() {

			@Override
			public int compare(JSONObject a, JSONObject b) {
				String valA = new String();
	            String valB = new String();

	            try {
	                valA = (String) a.get("salience");
	                valB = (String) b.get("salience");
	            } 
	            catch (JSONException e) {
	                e.printStackTrace();
	            }

	            return valA.compareTo(valB);
			}
		});
		
		JSONArray sortResJsonArr = new JSONArray();
		
		for(int i=0; i<resJsonArr.size(); i++) {
			resJsonArr.get(i).put("order", i+1);
			String salience = (String) resJsonArr.get(i).get("salience"); 
			resJsonArr.get(i).put("salience", Integer.parseInt(salience));
			sortResJsonArr.add(resJsonArr.get(i));
		}
		
		return sortResJsonArr;
	}
}
