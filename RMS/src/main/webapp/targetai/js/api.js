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
		
		var svc_id = $("input[name='selectedSvcNm']").attr("data-svcId");
		
		if(typeof svc_id == 'undefined') {
			messagePop("warning","서비스를 선택하세요","","");
			return;
		}
		
		var param = {};
		param.req_url = req_url;
		param.api_type = api_type;
		param.param_val = param_val; 
		param.svc_id = svc_id;
		param.ver_status = $("select[name='selectVerStatus']").val();
		
		fnRequestApi(param);
	});
	
	// 서비스 선택 버튼 클릭
	$("#selectSvcBtn").click(function() {
		$("#selectSvcPop").show();
		// 서비스 목록 조회
		var searchObj = {};
		searchObj.svcNm_search = $("#selectSvcPop_svcNm").val();
		searchObj.verStatus = $("select[name='selectVerStatus']").val();
		searchObj.currentPage = 1;
		fnGetSvcList(searchObj);
	});
	
	// 서비스 리스트 페이지 번호 클릭
	$("#selectSvcPop_paging").on("click", "._paging", function(e) {
		var cls = $(this).attr("class");
		const pageNum = $(this).attr("data-page_num");
		
		var searchObj = {};
		searchObj.svcNm_search = $("#selectSvcPop_svcNm").val();
		searchObj.verStatus = $("select[name='selectVerStatus']").val();
		searchObj.currentPage = pageNum;
		
		fnGetSvcList(searchObj);
	});
	
	// 서비스 선택 팝업 > 조회버튼
	$("#selectSvcPop_SearchBtn").click(function() {
		var searchObj = {};
		searchObj.svcNm_search = $("#selectSvcPop_svcNm").val();
		searchObj.verStatus = $("select[name='selectVerStatus']").val();
		searchObj.currentPage = 1;
		
		fnGetSvcList(searchObj);
	});
	
	// 서비스 선택 팝업 > 적용버튼
	$("#selectSvcPop_saveBtn").click(function() {
		var selectedSvc = $("input[name='svcListRadio']:checked");
		var svcId = selectedSvc.attr("data-svcId") * 1;
		var svcNm = selectedSvc.closest("tr").find("._tdSvcNm").text();
		var pkgNm = selectedSvc.closest("tr").find("._tdPkgNm").text();
		var ver = selectedSvc.closest("tr").find("._tdVer").text();
		
		// 서비스 선택했는지 확인
		if(isNaN(svcId)) {
			messagePop("warning","서비스를 선택하세요.","","");
			return;
		}
		
		// 연결된 패키지 확인
		if(pkgNm == '-') {
			messagePop("warning","연결된 패키지가 없습니다.","","");
			return;
		}
		
		// 실행 버전 확인
		if(ver == '-') {
			messagePop("warning","실행할 수 있는 버전이 없습니다.","","");
			return;
		}
		
		$("input[name='selectedSvcNm']").val(svcNm);
		$("input[name='selectedSvcNm']").attr("data-svcId", svcId);
		close_layerPop('selectSvcPop');
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
				html += "	<td colspan='7' class='t_center'>조회된 내용이 없습니다.</td>";
				html += "</tr>";
				
			} else {
				$.each(svcList, function(idx, svc) {
					html += "<tr>";
					html += "	<td class='t_center'>";
					html += "		<div class='checkbox-container'>";
					html += "			<input type='radio' class='_svcListRadio' name='svcListRadio' data-svcId='"+ svc.SVC_ID +"'/>";
					html += "			<label for='_svcListRadio'></label>";
					html += "		</div>";
					html += "	</td>";
					html += "	<td class='t_center _tdSvcId'>" + svc.SVC_ID + "</td>";
					html += "	<td class='t_center _tdChannelNm'>" + (typeof svc.CHANNEL_NM == 'undefined' ? '-' : svc.CHANNEL_NM) + "</td>";
					html += "	<td class='t_center _tdSvcNm'>" + svc.SVC_NM + "</td>";
					html += "	<td class='t_center _tdPkgNm'>" + (typeof svc.PKG_NM == 'undefined' ? '-' : svc.PKG_NM) + "</td>";
					html += "	<td class='t_center _tdVer'>" + (typeof svc.VER == 'undefined' ? '-' : svc.VER) + "</td>";
					html += "	<td class='t_center _tdDrlNm'>" + (typeof svc.DRL_NM == 'undefined' ? '-' : "<a href='#' class='_drlNmLink' data-pkgId='"+ svc.PKG_ID +"' data-ver='"+ svc.VER +"'>" + svc.DRL_NM + "</a>") + "</td>";
					html += "</tr>";
				});
			}
			
			$("#selectSvcPop_svcList").html(html);
			fnPaging("#selectSvcPop_paging", searchObj);
			
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