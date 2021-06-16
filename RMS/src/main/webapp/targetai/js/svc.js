/**
 * service 관리
 * @author 박주윤 차장
 * @since 2021.06.15
 */

$(document).ready(function() {
	// 서비스 리스트 조회
	var searchObj = {};
	fnSvcList(searchObj);
	
	// 서비스 검색 > 조회 버튼 클릭
	$("#svcSearchBtn").click(function() {
		var searchObj = {};
		searchObj.svcId_search = $("#svcId_search").val();
		searchObj.svcActYn_search = $("#svcActYn_search option:selected").val();
		searchObj.svcRegUsrId_search = $("#svcRegUsrId_search").val();
		searchObj.svcNm_search = $("#svcNm_search").val();
		
		fnSvcList(searchObj);
	});
	
	// 서비스 목록 > 서비스명 링크 클릭
	$(document).on("click", "._svcNmLink", function(e) {
		e.preventDefault();	// a링크 클릭이벤트 제거
		var param = {};
		param.svcId = $(this).attr("data-svcId");
		
		fnSvcDetail(param);
	});
	
	// 신규 서비스 생성 버튼
	$("#addNewSvcBtn").click(function() {
		// SVC 관련 초기화
		fnInitSvcDetail();	// SVC 상세 초기화
		
		$("#svcCard").removeClass("card-collapsed");
		$("#svcCardBody").css("display", "");
		$("#svcNm").focus();
	});
	
	// 신규 서비스 생성 > 서비스 상세 > 저장 버튼
	$("#saveSvcBtn").click(function() {
		// 서비스 명 중복 체크
		var isDup = $("#svcNmDupBtn").data("isDup");
		if(isDup != 'Y') {
			messagePop("warning", "서비스명 중복체크", "서비스명 중복체크를 먼저 해주세요.", "#svcNm");
			return;
		}
		
		if(confirm("변경사항을 저장하시겠습니까?")) {
			var param = {};
			param.svcNm = $("#svcNm").val();
			param.svcActYn = $("#svcActYn").val();
			param.svcDsc = $("#svcDsc").val();
			
			fnAddSvc(param);
		}
	});
	
	// 서비스 상세 > 중복체크 버튼 클릭
	$("#svcNmDupBtn").click(function(){
		var svcNm = $("#svcNm").val();
		var svcId = $("#svcId").text();
		
		if(svcNm == '') {
			messagePop("warning", "서비스명 공백체크.", "서비스명을 입력하세요.", "#svcNm");
			return;
		}
		
		var param = {};
		param.svcId = svcId;
		param.svcNm = svcNm;
		
		fnSvcNmCheck(param);
	});
	
	// 서비스명 변경시 중복체크  요청
	$("#svcNm").change(function() {
		$("#svcDupY").hide();
		$("#svcNmDupBtn").data("isDup", "N");
	});
});

/**
 * 서비스 리스트 조회
 * @param searchObj
 * @returns
 */
function fnSvcList(searchObj) {
	$.ajax({
		method : "POST",
		url : "/targetai/getSvcList.do",
		traditional: true,
		data : JSON.stringify(searchObj),
		contentType:'application/json; charset=utf-8',
		dataType : "json",
		success : function(res) {
			var svcList = res.svcList;
			var svcCount = res.svcCount;
			
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
					html += "			<input type='checkbox' class='_svcListChkBox' data-svcId='"+ svc.SVC_ID +"'/>";
					html += "			<label for='_svcListChkBox'></label>";
					html += "		</div>";
					html += "	</td>";
					html += "	<td class='t_center'>" + svc.SVC_ID + "</td>";
					html += "	<td class='t_center'>" + svc.CHANNEL_NM + "</td>";
					html += "	<td class='t_center'><a href='#' class='_svcNmLink' data-svcId='"+ svc.SVC_ID +"'>" + svc.SVC_NM + "</a></td>";
					html += "	<td class='t_center'>" + svc.PKG_NM + "</td>";
					html += "	<td class='t_center'>" + svc.SVC_ACT_YN + "</td>";
					html += "	<td class='t_center'>" + (typeof svc.UDT_DT == 'undefined' ? '-' : svc.UDT_DT) + "</td>";
					html += "	<td class='t_center'>" + (typeof svc.UDT_USRID == 'undefined' ? '-' : svc.UDT_USRID) + "</td>";
					html += "	<td class='t_center'>" + svc.REG_DT + "</td>";
					html += "	<td class='t_center'>" + svc.REG_USRID + "</td>";
					html += "</tr>";
				});
			}
			
			$("#svcList").html(html);
			$("#svcCountBySearch").text(svcCount);
			
			// 전체 체크 해제
			$("#svcListAllChkBox").prop("checked", false);
			
		},
		beforeSend : function() {
			$("#svcLoading").show();
		},
		complete : function() {
			$("#svcLoading").hide();
		},
		error : function(jqXHR, textStatus, errorThrown) {
			messagePop("warning", "에러발생", "관리자에게 문의하세요", "");
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

/**
 * 서비스 상세
 * @param param
 * @returns
 */
function fnSvcDetail(param) {
	$.ajax({
		method : "POST",
		url : "/targetai/getSvc.do",
		traditional: true,
		data : JSON.stringify(param),
		contentType:'application/json; charset=utf-8',
		dataType : "json",
		success : function(res) {
			var svc = res.svc;
			$("#svcId").text(svc.SVC_ID);
			$("#svcNm").val(svc.SVC_NM);
			$("#svcConnChannel").val(svc.CHANNEL_NM);
			$("#svcConnChannel").attr("data-channelId", svc.CHANNEL_ID);
			$("#svcConnPkg").val(svc.PKG_NM);
			$("#svcConnPkg").attr("data-pkgId", svc.PKG_ID);
			$("#svcActYn").val(svc.SVC_ACT_YN);
			$("#svcDsc").val(svc.SVC_DSC);
			$("#svcRegDt").text(svc.REG_DT + "에 " + svc.REG_USRID + "(님)이 등록함.");
			if(typeof svc.UDT_USRID == 'undefined') {
				$("#svcUdtDt").text("수정 이력이 없습니다.");
			} else {
				$("#svcUdtDt").text(svc.UDT_DT + "에 " + svc.UDT_USRID + "(님)이 수정함.");
			}
			
			$("#svcCard").removeClass("card-collapsed");
			$("#svcCardBody").css("display", "");
			
		},
		beforeSend : function() {
			$("#svcLoading").show();
		},
		complete : function() {
			$("#svcLoading").hide();
		},
		error : function(jqXHR, textStatus, errorThrown) {
			messagePop("warning", "에러발생", "관리자에게 문의하세요", "");
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

/**
 * 신규 서비스 생성 > 서비스 상세 > 저장
 * @param param
 * @returns
 */
function fnAddSvc(param) {
	
}

/**
 * 서비스 수정 > 서비스 상세 > 저장
 * @param param
 * @returns
 */
function fnUpdateSvc(param) {
	
}

/**
 * 서비스 상세 > 서비스명 중복체크
 * @param param
 * @returns
 */
function fnSvcNmCheck(param) {
	$.ajax({
		method : "POST",
		url : "/targetai/svcNmCheck.do",
		traditional: true,
		data : JSON.stringify(param),
		contentType:'application/json; charset=utf-8',
		dataType : "json",
		success : function(res) {
			if(res == false) {	// 서비스명 중복
				$("#svcDupY").css("display", "none");
				$("#svcDupN").css("display", "");
				$("#svcNmDupBtn").data("isDup", "N");
				$("#svcNm").focus();
				return;
			}
			
			$("#svcDupY").css("display", "");
			$("#svcDupN").css("display", "none");
			$("#svcNmDupBtn").data("isDup", "Y");
		}
	});
}

/**
 * 서비스 상세 초기화
 * @returns
 */
function fnInitSvcDetail() {
	$("#svcId").text("");
	$("#svcNm").val("");
	$("#svcDsc").val("");
	$("#svcConnChannel").val("");
	$("#svcConnPkg").val("");
	$("#svcRegDt").text("");
	$("#svcUdtDt").text("");
	$("#svcDupY").css("display", "none");
	$("#svcDupN").css("display", "none");
	$("#svcNmDupBtn").data("isDup", "N");
}