/**
 * API
 */

$(document).ready(function() {
	
	// Request 버튼 클릭
	$("#apiRequestBtn").click(function() {
		var req_url = $("#req_url").text();
		var api_type = $("select[name='api_type']").val();
		
		if(api_type == '') {
			messagePop("warning","Type을 선택하세요.","API Request시 Input 데이터 타입을 선택하세요.","select[name='api_type']");
			return;
		}
		
		var param_val = $("input[name='param_val']").val();
		
		if(param_val == '') {
			messagePop("warning","parameter 값을 입력하세요.","응답받을 서비스 아이디를 입력하세요.","input[name='param_val']");
			return;
		}
		
		var svc_id = $("input[name='svc_id']").val();
		
		if(svc_id == '') {
			messagePop("warning","서비스 아이디를 입력하세요.","응답받을 서비스 아이디를 입력하세요.","input[name='svc_id']");
			return;
		}
		
		var param = {};
		param.req_url = req_url;
		param.api_type = api_type;
		param.param_val = param_val;
		param.svc_id = svc_id;
		
		fnRequestApi(param);
	});
});

function fnRequestApi(param) {
	$.ajax({
		method : "POST",
		url : "/targetai/reqUrl.do",
		traditional: true,
		data : JSON.stringify(param),
		contentType:'application/json; charset=utf-8',
		dataType : "json",
		success : function(res) {
			var jsonStr = JSON.stringify(res, null, 4);
			
			$("#resultArea").val(jsonStr);
		},
		beforeSend : function() {
			$("#apiLoading").show();
		},
		complete : function() {
			$("#apiLoading").hide();
		},
		error : function(jqXHR, textStatus, errorThrown) {
			messagePop("warning", "에러발생", "관리자에게 문의하세요", "");
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}