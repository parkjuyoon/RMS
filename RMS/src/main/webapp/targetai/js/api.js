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
	
	// 서비스 선택 버튼 클릭
	$("#selectSvcBtn").click(function() {
		$("#selectSvcPop").show();
		// 서비스 목록 조회
		var searchObj = {};
		searchObj.svcNm_search = $("#selectSvcPop_svcNm").val();
		searchObj.currentPage = 1;
		fnGetSvcList(searchObj);
	});
});

/**
 * 서비스 리스트 조회
 * @param searchObj
 * @returns
 */
function fnGetSvcList(searchObj) {
	searchObj.limit = 10;
	searchObj.offset = searchObj.currentPage*searchObj.limit-searchObj.limit;
	
	$.ajax({
		method : "POST",
		url : "/targetai/getSvcListPop.do",
		traditional: true,
		data : JSON.stringify(searchObj),
		contentType:'application/json; charset=utf-8',
		dataType : "json",
		success : function(res) {
			var svcList = res.svcList;
			searchObj.totalCount = res.svcCount;
			
			var html = "";
			
			if(svcList.length == 0) {
				html += "<tr>";
				html += "	<td colspan='10' class='t_center'>조회된 내용이 없습니다.</td>";
				html += "</tr>";
				
			} else {
				$.each(svcList, function(idx, svc) {
					html += "<tr>";
					html += "	<td class='t_center'>";
					html += "		<div class='checkbox-container'>";
					html += "			<input type='checkbox' class='_svcListChkBox' data-svc_id='"+ svc.SVC_ID +"'/>";
					html += "			<label for='_svcListChkBox'></label>";
					html += "		</div>";
					html += "	</td>";
					html += "	<td class='t_center'>" + svc.SVC_ID + "</td>";
//					html += "	<td class='t_center'>" + (typeof svc.CHANNEL_NM == 'undefined' ? '-' : svc.CHANNEL_NM) + "</td>";
					html += "	<td class='t_center'><a href='#' class='_svcNmLink' data-svcId='"+ svc.SVC_ID +"'>" + svc.SVC_NM + "</a></td>";
					html += "	<td class='t_center'>" + (typeof svc.PKG_NM == 'undefined' ? '-' : svc.PKG_NM) + "</td>";
					html += "	<td class='t_center'>" + svc.SVC_ACT_YN + "</td>";
					html += "</tr>";
				});
			}
			
			$("#selectSvcPop_svcList").html(html);
//			$("#svcCountBySearch").text(searchObj.totalCount);
			fnPaging("#selectSvcPop_paging", searchObj);
			
			// 전체 체크 해제
//			$("#svcListAllChkBox").prop("checked", false);
			
		},
		beforeSend : function() {
			$("#selectSvcPop_Loading").show();
		},
		complete : function() {
			$("#selectSvcPop_Loading").hide();
		},
		error : function(jqXHR, textStatus, errorThrown) {
			messagePop("warning", "에러발생", "관리자에게 문의하세요", "");
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function fnRequestApi(param) {
	$.ajax({
		method : "POST",
		url : "/targetai/reqUrl.do",
		traditional: true,
		data : JSON.stringify(param),
		contentType:'application/json; charset=utf-8',
		dataType : "json",
		success : function(res) {
			var code = res.CODE;
			
			if(code == 404) {
				messagePop("warning", "유효한 서비스가 아닙니다.", "서비스 아이디를 확인하세요.", "");
				
			} else if(code == 501) {
				messagePop("warning", "DRL 문법에러", "DRL 문법에 오류가 있습니다. 확인하세요.", "");
				
			} else {	// code == 200 성공
				var jsonStr = JSON.stringify(res, null, 4);
				$("#resultArea").val(jsonStr);
			}
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