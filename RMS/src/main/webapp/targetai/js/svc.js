/**
 * service 관리
 * @author 박주윤 차장
 * @since 2021.06.15
 */

$(document).ready(function() {
	// 서비스 리스트 조회
	var searchObj = {};
	searchObj.currentPage = 1;
	fnSvcList(searchObj);
	
	// 서비스 검색 > 조회 버튼 클릭
	$("#svcSearchBtn").click(function() {
		var searchObj = {};
		searchObj.svcId_search = $("#svcId_search").val();
		searchObj.svcActYn_search = $("#svcActYn_search option:selected").val();
		searchObj.svcRegUsrId_search = $("#svcRegUsrId_search").val();
		searchObj.svcNm_search = $("#svcNm_search").val();
		searchObj.currentPage = 1;
		
		fnSvcList(searchObj);
	});
	
	// 서비스 검색 > 초기화 버튼 클릭
	$("#svcResetBtn").click(function() {
		fnInitSvcSearch();
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
	$("#saveSvcBtn").on("click", function() {
		$(":focus").blur();
		// 서비스 명 중복 체크
		var isDup = $("#svcNmDupBtn").data("isDup");
		if(isDup != 'Y') {
			messagePop("warning", "서비스명 중복체크", "서비스명 중복체크를 먼저 하세요.", "#svcNm");
			return;
		}
		
		// 연결된 채널 체크
		var svcConnChannel = $("#svcConnChannel").val();
		if(svcConnChannel == '') {
			messagePop("warning", "서비스 연결 체크", "채널을 연결하세요.", "#svcConnChannel");
			return;
		}
		
		// 연결된 패키지 체크
		var svcConnPkg = $("#svcConnPkg").val();
		if(svcConnPkg == '') {
			messagePop("warning", "서비스 연결 체크", "패키지를 연결하세요.", "#svcConnPkg");
			return;
		}
		
		if(confirm("변경사항을 저장하시겠습니까?")) {
			var param = {};
			param.svcId = $("#svcId").text();
			param.svcNm = $("#svcNm").val();
			param.channelId = $("#svcConnChannel").attr("data-channel_id");
			param.pkgId = $("#svcConnPkg").attr("data-pkg_id");
			param.svcActYn = $("#svcActYn").val();
			param.svcDsc = $("#svcDsc").val();
			
			if(param.svcId != '') {
				// 수정
				fnUpdateSvc(param);
				
			} else {
				// 신규등록
				fnAddSvc(param);
			}
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
	
	// 서비스 상세 > 채널 연결 버튼 클릭
	$("#svcConnChannelBtn").click(function() {
		var searchObj = {};
		searchObj.currentPage = 1;
		fnChannelList(searchObj);
	});
	
	// 서비스 상세 > 채널 연결 > 팝업 조회 버튼
	$("#modal_channelSearchBtn").click(function() {
		var searchObj = {};
		searchObj.channelNm_search = $("#modal_channelNm_search").val();
		searchObj.currentPage = 1;
		fnChannelList(searchObj);
	});
	
	// 서비스 상세 > 패키지 연결 버튼 클릭
	$("#svcConnPkgBtn").click(function() {
		var searchObj = {};
		searchObj.currentPage = 1;
		fnPkgList(searchObj);
	});
	
	// 서비스 상세 > 패키지 연결 > 팝업 조회 버튼
	$("#modal_pkgSearchBtn").click(function() {
		var searchObj = {};
		searchObj.pkgNm_search = $("#modal_pkgNm_search").val();
		searchObj.currentPage = 1;
		fnPkgList(searchObj);
	});
	
	// 서비스 상세 > 채널 연결 > 팝업 적용 버튼
	$("#modal_svcConnChannelSaveBtn").click(function() {
		var channelId = $("._channelListRadio:checked").data("channel_id");
		channelId = (typeof channelId == 'undefined' ? "" : channelId);
		var channelNm = $("._channelListRadio:checked").data("channel_nm");
		channelNm = (typeof channelNm == 'undefined' ? "" : channelNm);
		
		$("#svcConnChannel").val(channelNm);
		$("#svcConnChannel").attr("data-channel_id", channelId);
		
		close_layerPop('modal_svcConnChannel');
	});
	
	// 서비스 상세 > 패키지 연결 > 팝업 적용 버튼
	$("#modal_svcConnPkgSaveBtn").click(function() {
		var pkgId = $("._pkgListRadio:checked").data("pkg_id");
		pkgId = (typeof pkgId == 'undefined' ? "" : pkgId);
		var pkgNm = $("._pkgListRadio:checked").data("pkg_nm");
		pkgNm = (typeof pkgId == 'undefined' ? "" : pkgNm);
		
		$("#svcConnPkg").val(pkgNm);
		$("#svcConnPkg").attr("data-pkg_id", pkgId);
		
		close_layerPop('modal_svcConnPkg');
	});
	
	// 서비스 삭제 버튼
	$("#deleteSvcBtn").click(function() {
		$(":focus").blur();
		var svcListChkBox = $("._svcListChkBox:checked");
		
		var svcIdArr = [];
		$.each(svcListChkBox, function(idx, svcChkBox){
			var svcId = svcListChkBox.eq(idx).attr("data-svc_id");
		
			svcIdArr.push(svcId);
		});
		
		if(svcIdArr.length > 0) {
			if(confirm(svcIdArr.length + "건의 서비스가 삭제됩니다.\n정말 삭제하시겠습니까?")) {
				var param = {};
				param.svcIdArr = svcIdArr;
				
				fnDeleteSvc(param);
			}
			
		} else {
			messagePop("warning", "서비스 삭제", "삭제할 서비스를 선택하세요.", "");
		}
	});
	
	// 서비스 목록 > 전체선택 체크박스
	$("#svcListAllChkBox").click(function() {
		var chked = $(this).prop("checked");
		
		if(chked) {
			$(this).closest("table").find("._svcListChkBox").prop("checked", true);
			
		} else {
			$(this).closest("table").find("._svcListChkBox").prop("checked", false);
		}
	});
	
	// 서비스 리스트 페이지 번호 클릭
	$("#svcListPaging").on("click", "._paging", function(e) {
		var cls = $(this).attr("class");
		const pageNum = $(this).attr("data-page_num");
		
		var searchObj = {};
		searchObj.svcId_search = $("#svcId_search").val();
		searchObj.svcActYn_search = $("#svcActYn_search option:selected").val();
		searchObj.svcRegUsrId_search = $("#svcRegUsrId_search").val();
		searchObj.svcNm_search = $("#svcNm_search").val();
		searchObj.currentPage = parseInt(pageNum);
		
		fnSvcList(searchObj);
	});
	
	// 채널 연결 팝업 > 리스트 페이지 번호 클릭
	$("#modal_svcConnChannelPaging").on("click", "._paging", function(e) {
		var cls = $(this).attr("class");
		const pageNum = $(this).attr("data-page_num");
		
		var searchObj = {};
		searchObj.channelNm_search = $("#modal_channelNm_search").val();
		searchObj.currentPage = parseInt(pageNum);
		
		fnChannelList(searchObj);
	});
	
	// 패키지 연결 팝업 > 리스트 페이지 번호 클릭
	$("#modal_svcConnPkgPaging").on("click", "._paging", function(e) {
		var cls = $(this).attr("class");
		const pageNum = $(this).attr("data-page_num");
		
		var searchObj = {};
		searchObj.pkgNm_search = $("#modal_pkgNm_search").val();
		searchObj.currentPage = parseInt(pageNum);
		
		fnPkgList(searchObj);
	});
});

/**
 * 서비스 리스트 조회
 * @param searchObj
 * @returns
 */
function fnSvcList(searchObj) {
	searchObj.limit = 10;
	searchObj.offset = searchObj.currentPage*searchObj.limit-searchObj.limit;
	
	$.ajax({
		method : "POST",
		url : "/targetai/getSvcList.do",
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
					html += "	<td class='t_center'>" + (typeof svc.CHANNEL_NM == 'undefined' ? '-' : svc.CHANNEL_NM) + "</td>";
					html += "	<td class='t_center'><a href='#' class='_svcNmLink' data-svcId='"+ svc.SVC_ID +"'>" + svc.SVC_NM + "</a></td>";
					html += "	<td class='t_center'>" + (typeof svc.PKG_NM == 'undefined' ? '-' : svc.PKG_NM) + "</td>";
					html += "	<td class='t_center'>" + svc.SVC_ACT_YN + "</td>";
					html += "	<td class='t_center'>" + (typeof svc.UDT_DT == 'undefined' ? '-' : svc.UDT_DT) + "</td>";
					html += "	<td class='t_center'>" + (typeof svc.UDT_USRNM == 'undefined' ? '-' : svc.UDT_USRNM) + "</td>";
					html += "	<td class='t_center'>" + svc.REG_DT + "</td>";
					html += "	<td class='t_center'>" + svc.REG_USRNM + "</td>";
					html += "</tr>";
				});
			}
			
			$("#svcList").html(html);
			$("#svcCountBySearch").text(searchObj.totalCount);
			fnPaging("#svcListPaging", searchObj);
			
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
			$("#svcConnChannel").attr("data-channel_id", svc.CHANNEL_ID);
			$("#svcConnPkg").val(svc.PKG_NM);
			$("#svcConnPkg").attr("data-pkg_id", svc.PKG_ID);
			$("#svcActYn").val(svc.SVC_ACT_YN);
			$("#svcDsc").val(svc.SVC_DSC);
			$("#svcRegDt").text(svc.REG_DT + "에 " + svc.REG_USRNM + "(님)이 등록함.");
			if(typeof svc.UDT_USRID == 'undefined') {
				$("#svcUdtDt").text("수정 이력이 없습니다.");
			} else {
				$("#svcUdtDt").text(svc.UDT_DT + "에 " + svc.UDT_USRNM + "(님)이 수정함.");
			}
			
			$("#svcCard").removeClass("card-collapsed");
			$("#svcCardBody").css("display", "");
			$("#svcNmDupBtn").data("isDup", "Y");
			
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
	$.ajax({
		method : "POST",
		url : "/targetai/addSvc.do",
		traditional: true,
		data : JSON.stringify(param),
		contentType:'application/json; charset=utf-8',
		dataType : "json",
		success : function(res) {
			var searchObj = {};
			searchObj.currentPage = 1;
			fnInitSvcSearch();
			fnSvcList(searchObj);
			
			messagePop("success", "서비스가 저장되었습니다.", "", "");
			$("#svcId").text(res.SVC_ID);
			$("#svcRegDt").text(res.REG_DT + "에 " + res.REG_USRID + "(님)이 등록함.");
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
 * 서비스 수정 > 서비스 상세 > 저장
 * @param param
 * @returns
 */
function fnUpdateSvc(param) {
	$.ajax({
		method : "POST",
		url : "/targetai/updateSvc.do",
		traditional: true,
		data : JSON.stringify(param),
		contentType:'application/json; charset=utf-8',
		dataType : "json",
		success : function(res) {
			var searchObj = {};
			searchObj.currentPage = 1;
			fnInitSvcSearch();
			fnSvcList(searchObj);
			
			messagePop("success", "서비스가 수정되었습니다.", "", "");
			$("#svcUdtDt").text(res.UDT_DT + "에 " + res.UDT_USRNM + "(님)이 수정함.");
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
 * 서비스 상세 > 패키지 연결 > 패키지 목록
 * @returns
 */
function fnPkgList(searchObj) {
	searchObj.limit = 10;
	searchObj.offset = searchObj.currentPage*searchObj.limit-searchObj.limit;
	
	$.ajax({
		method : "POST",
		url : "/targetai/getPkgList.do",
		traditional: true,
		data : JSON.stringify(searchObj),
		contentType:'application/json; charset=utf-8',
		dataType : "json",
		success : function(res) {
			var pkgList = res.pkgList;
			searchObj.totalCount = res.pkgCount;
			
			var html = "";
			
			if(pkgList.length == 0) {
				html += "<tr>";
				html += "	<td colspan='4' class='t_center'>조회된 내용이 없습니다.</td>";
				html += "</tr>";
				
			} else {
				$.each(pkgList, function(idx, pkg){
					html += "<tr>";
					html += "	<td class='t_center'>";
					html += "		<div class='checkbox-container'>";
					html += "			<input type='radio' class='_pkgListRadio' data-pkg_id='"+ pkg.PKG_ID +"' data-pkg_nm='"+ pkg.PKG_NM +"'/>";
					html += "			<label for='_pkgListRadio'></label>";
					html += "		</div>";
					html += "	</td>";
					html += "	<td class='t_center'>" + pkg.PKG_ID + "</td>";
					html += "	<td class='t_center'>" + pkg.PKG_NM + "</td>";
					html += "	<td class='t_center'>" + pkg.DRL_NM + "</td>";
					html += "</tr>";
				});
			}
			
			$("#modal_svcConnPkgList").html(html);
			fnPaging("#modal_svcConnPkgPaging", searchObj);
		},
		beforeSend : function() {
			$("#modal_svcConnPkgLoading").show();
		},
		complete : function() {
			$("#modal_svcConnPkgLoading").hide();
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
 * 서비스 상세 > 채널 연결 > 채널 목록
 * @returns
 */
function fnChannelList(searchObj) {
	searchObj.limit = 10;
	searchObj.offset = searchObj.currentPage*searchObj.limit-searchObj.limit;
	
	$.ajax({
		method : "POST",
		url : "/targetai/getChannelList.do",
		traditional: true,
		data : JSON.stringify(searchObj),
		contentType:'application/json; charset=utf-8',
		dataType : "json",
		success : function(res) {
			var channelList = res.channelList;
			searchObj.totalCount = res.channelCount;
			
			var html = "";
			
			if(channelList.length == 0) {
				html += "<tr>";
				html += "	<td colspan='4' class='t_center'>조회된 내용이 없습니다.</td>";
				html += "</tr>";
				
			} else {
				$.each(channelList, function(idx, channel){
					html += "<tr>";
					html += "	<td class='t_center'>";
					html += "		<div class='checkbox-container'>";
					html += "			<input type='radio' class='_channelListRadio' data-channel_id='"+ channel.CHANNEL_ID +"' data-channel_nm='"+ channel.CHANNEL_NM +"'/>";
					html += "			<label for='_channelListRadio'></label>";
					html += "		</div>";
					html += "	</td>";
					html += "	<td class='t_center'>" + channel.CHANNEL_ID + "</td>";
					html += "	<td class='t_center'>" + channel.CHANNEL_NM + "</td>";
					html += "	<td class='t_center'>" + channel.CHANNEL_DSC + "</td>";
					html += "</tr>";
				});
			}
			
			$("#modal_svcConnChannelList").html(html);
			fnPaging("#modal_svcConnChannelPaging", searchObj);
		},
		beforeSend : function() {
			$("#modal_svcConnChannelLoading").show();
		},
		complete : function() {
			$("#modal_svcConnChannelLoading").hide();
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
 * 서비스 목록 > 삭제
 * @returns
 */
function fnDeleteSvc(param) {
	$.ajax({
		method : "POST",
		url : "/targetai/deleteSvcById.do",
		traditional: true,
		data : JSON.stringify(param),
		contentType:'application/json; charset=utf-8',
		dataType : "json",
		success : function(res) {
			if(res) {
				var searchObj = {};
				searchObj.currentPage = 1;
				fnInitSvcSearch();
				fnSvcList(searchObj);
				
				messagePop("success", "서비스가 삭제되었습니다.", "", "");
				fnInitSvcDetail();
				$("#svcCard").addClass("card-collapsed");
				$("#svcCardBody").css("display", "none");
			}
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
 * 서비스 검색 초기화
 * @returns
 */
function fnInitSvcSearch() {
	$("#svcId_search").val("");
	$("#svcRegUsrId_search").val("");
	$("#svcActYn_search").val("Y");
	$("#svcNm_search").val("");
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