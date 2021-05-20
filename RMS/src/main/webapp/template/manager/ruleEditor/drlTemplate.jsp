<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
${param.header }
rule "${param.ruleName }"
    no-loop ${param.opt1 }
    lock-on-active ${param.opt2 }
    salience ${param.opt3 }
    when
        $map : Map(${param.whenMap_html })
    then
        $map.put("RESULT", "Y");
end

