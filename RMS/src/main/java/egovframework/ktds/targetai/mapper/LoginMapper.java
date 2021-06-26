package egovframework.ktds.targetai.mapper;

import java.util.HashMap;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("loginMapper")
public interface LoginMapper {

	HashMap<String, Object> getMember(HashMap<String, Object> member);

}
