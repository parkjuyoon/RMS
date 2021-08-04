package main;

import java.io.File;

import org.kie.api.KieServices;
import org.kie.api.builder.KieBuilder;
import org.kie.api.builder.KieFileSystem;
import org.kie.api.builder.KieModule;
import org.kie.api.builder.KieRepository;
import org.kie.api.builder.ReleaseId;
import org.kie.api.io.ResourceType;
import org.kie.api.runtime.KieSession;

public class Util {
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
// 			kieFileSystem.write(kieServices.getResources().newFileSystemResource(file).setResourceType(ResourceType.DRL));
 			kieFileSystem.write(kieServices.getResources().newFileSystemResource(file, "UTF-8").setResourceType(ResourceType.DRL));	// UTF-8 설정
	        
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
}
