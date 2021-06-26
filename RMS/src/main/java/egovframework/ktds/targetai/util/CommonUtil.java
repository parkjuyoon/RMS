package egovframework.ktds.targetai.util;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class CommonUtil {

	/**
	 * 
	 * @param param
	 * @param type
	 * @param urlStr
	 * @return 응답받은 JSON
	 */
	public static JSONObject callApi(JSONObject param, String type, String urlStr) {
		HttpURLConnection conn = null;
        JSONObject responseJSON = null;
        BufferedWriter bw = null;
        BufferedReader br = null;
        StringBuilder sb = null;
        
        try {
        	URL url = new URL(urlStr);
            conn = (HttpURLConnection) url.openConnection();
            
            // type의 경우 POST, GET, PUT, DELETE 가능
            conn.setRequestMethod(type);
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setRequestProperty("Transfer-Encoding", "chunked");
            conn.setRequestProperty("Connection", "keep-alive");
            conn.setDoOutput(true);
            
            bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            
            bw.write(param.toJSONString());	// JSON 형식의 message 전달
            bw.flush();
            bw.close();
            
            // message 보내고 결과값 받기
            int responseCode = conn.getResponseCode();
            
            if (responseCode == HttpURLConnection.HTTP_OK) {
            	br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"));
                sb = new StringBuilder();
                String line = "";
                while ((line = br.readLine()) != null) {
                    sb.append(line);
                }
                
                JSONParser parser = new JSONParser();
                responseJSON = (JSONObject) parser.parse(sb.toString());
            } 
            
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        } finally {
        	conn.disconnect();
			try {br.close();} catch (IOException e) {e.printStackTrace();}
			try {bw.close();} catch (IOException e) {e.printStackTrace();}
			sb.delete(0, sb.length());
		}
        
        return responseJSON;
	}
}
