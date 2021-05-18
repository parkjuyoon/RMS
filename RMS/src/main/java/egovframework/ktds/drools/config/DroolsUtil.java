package egovframework.ktds.drools.config;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.kie.api.KieServices;
import org.kie.api.builder.KieBuilder;
import org.kie.api.builder.KieFileSystem;
import org.kie.api.builder.KieModule;
import org.kie.api.builder.KieRepository;
import org.kie.api.builder.ReleaseId;
import org.kie.api.io.ResourceType;
import org.kie.api.runtime.KieSession;
import org.kie.internal.io.ResourceFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;

public class DroolsUtil {

	/**
	 * DRL 파일을 KieSession 에 담아 리턴
	 * @param RULES_PATH
	 * @return kieSession
	 */
	public static KieSession getKieSession (String RULES_PATH) {
		KieServices kieServices = null;
		KieFileSystem kieFileSystem = null;
		KieBuilder kieBuilder = null;
		KieSession kieSession = null;
		
		try {
			kieServices = KieServices.Factory.get();
	        kieFileSystem = kieServices.newKieFileSystem();
	        
	        // 1. package 내 모든 drl 파일 LOAD
//	        for (org.springframework.core.io.Resource file : new PathMatchingResourcePatternResolver().getResources("classpath*:" + RULES_PATH + "**/*.*")) {
//	            kieFileSystem.write(org.kie.internal.io.ResourceFactory.newClassPathResource(RULES_PATH + file.getFilename(), "UTF-8"));
//	        }
	        
	        // 2. drl 파일 직접 지정
//	        for (Resource file : new PathMatchingResourcePatternResolver().getResources("classpath*:" + RULES_PATH)) {
//	        	kieFileSystem.write(ResourceFactory.newClassPathResource(RULES_PATH, "UTF-8"));
//	        }
	        
	        // 3. 외부 지정위치 package drl 파일 직접 지정
 			File file = new File(RULES_PATH);
 			kieFileSystem.write(kieServices.getResources().newFileSystemResource(file).setResourceType(ResourceType.DRL));
	        
	        final KieRepository kieRepository = KieServices.Factory.get().getRepository();
	        kieRepository.addKieModule(new KieModule() {
	            @Override
	            public ReleaseId getReleaseId() {
	                return kieRepository.getDefaultReleaseId();
	            }
	        });
	        kieBuilder = KieServices.Factory.get().newKieBuilder(kieFileSystem);
	        kieBuilder.buildAll();
	        
	        kieSession = KieServices.Factory.get().newKieContainer(kieRepository.getDefaultReleaseId()).newKieSession().getKieBase().newKieSession();
        
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return kieSession;
	}
	
	/**
	 * DRL 파일을 읽어서 String 형태로 리턴
	 * @param filePath
	 * @param fileName
	 * @return drlToString
	 */
	public static String getDrlToString (String filePath, String fileName) {
		String drlToString = "";
		//파일 객체 생성
        Path path = Paths.get(filePath + File.separator + fileName);
        // 캐릭터셋 지정
        Charset cs = StandardCharsets.UTF_8;
        //파일 내용담을 리스트
        List<String> list = new ArrayList<String>();
        try{
            list = Files.readAllLines(path,cs);
        }catch(IOException e){
            e.printStackTrace();
        }
        
        for(String readLine : list){
        	drlToString += readLine + "\n";
        }
        
        return drlToString;
	}
	
	/**
	 * DRL 파일 쓰기
	 * @param root_path
	 * @param package_nm
	 * @param drl_file_nm
	 * @param contents
	 * @return
	 */
	public static boolean outputDrl(String root_path, String package_nm, String drl_file_nm, String drl_data) {
		String drl_output_path = root_path + File.separator + package_nm + File.separator + drl_file_nm;
		File folder = new File(root_path + File.separator + package_nm);
		File drlFile = null;
		
		try {
			if(!folder.exists()) {
				folder.mkdir();
			} 
			
			drlFile = new File(drl_output_path);
			BufferedWriter bw = new BufferedWriter(new FileWriter(drlFile));
			
			bw.write(drl_data);
			bw.close();
			
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return true;
	}
}
