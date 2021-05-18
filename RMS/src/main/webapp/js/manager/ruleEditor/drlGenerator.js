/**
 * Rule Add 할 때 개별 Rule when문장 생성
 */
var header = "package rule";
header += "\n";
header += "import java.util.Map";

function whenGenerator(applyRuleObj) {
	var returnVal = "";
	
	$.ajax({
		url : "/template/manager/ruleEditor/whenTemplate.jsp",
		dataType : "html",
		type :"POST",
		data : applyRuleObj,
		async:false	// ajax 통신 완료 후 return 해주기 위해 비동기 false
		
	}).done(function(res) {
		returnVal = res;
		
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.log("에러")
		console.log(jqXHR)
		console.log(textStatus)
		console.log(errorThrown)
	});
	
	return returnVal;
}

function ruleGenerator(applyRuleObj) {
	var returnVal = "";
	
	var whenMapArr_html = applyRuleObj.whenMapAttr_html;
	var whenMap_html = "";
	
	for(var i in whenMapArr_html) {
		whenMap_html += whenMapArr_html[i];
	}
	
	// 룰 속성이 추가 되어 있지 않을 경우 취소
	if(typeof(whenMapArr_html) == "undefined" || whenMap_html == "") {
		return returnVal;
	}
	
	// 관계연산이 NONE 이 아닌경우 취소
	if(whenMap_html.endsWith("&&") || whenMap_html.endsWith("||")) {
		return "-1";
	}
	
	applyRuleObj.whenMap_html = whenMap_html;
	
	$.ajax({
		url : "/template/manager/ruleEditor/ruleTemplate.jsp",
		dataType : "html",
		type :"POST",
		data : applyRuleObj,
		async:false	// ajax 통신 완료 후 return 해주기 위해 비동기 false
		
	}).done(function(res) {
		returnVal = res;
		
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.log("에러")
		console.log(jqXHR)
		console.log(textStatus)
		console.log(errorThrown)
	});
	
	return returnVal;
}

/**
 * Rule Generate 할 때 최종 DRL 파일 내용 생성
 */
function drlGenerator(applyRuleObj) {
	applyRuleObj.header = header;
	
	$.ajax({
		url : "/template/manager/ruleEditor/drlTemplate.jsp",
		dataType : "html",
		type :"POST",
		data : applyRuleObj,
		async:false	// ajax 통신 완료 후 return 해주기 위해 비동기 false
		
	}).done(function(res) {
		returnVal = res;
		
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.log("에러")
		console.log(jqXHR)
		console.log(textStatus)
		console.log(errorThrown)
	});
	
	return returnVal;
}