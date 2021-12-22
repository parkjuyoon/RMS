/**
 * package 관리
 * @author 박주윤 차장
 * @since 2021.05.25
 */

// Rule 연결 목록 저장될 배열
var conRuleList = [];
var mappingRuleList = [];

$(document).ready(function() {
	// 패키지 리스트 조회
	var searchObj = {};
	searchObj.currentPage = 1;
	getPkgList(searchObj);
	fnSortableOption();
	
	// 패키지 검색 > 조회 버튼 클릭
	$("#pkgSearchBtn").click(function() {
		var searchObj = {};
		searchObj.pkgId_search = $("#pkgId_search").val();
		searchObj.pkgRegUsrId_search = $("#pkgRegUsrId_search").val();
		searchObj.pkgNm_search = $("#pkgNm_search").val();
		searchObj.currentPage = 1;
		
		getPkgList(searchObj);
	});
	
	// 패키지 목록 > 패키지명 링크 클릭
	$(document).on("click", "._pkgNmLink", function(e) {
		// 이벤트 목록 초기화
		fnInitEventList();
		// RULE 조건 초기화
		fnInitRuleCondition();
		// 패키지 상세 > RULE 연결 팝업 > WHEN 컨디션 부분 초기화
		fnInitRuleMappingPopDetail();
		
		var param = {};
		param.pkgId = $(this).attr("data-pkgId");
		
		// 패키지 상세 열림
		$("#pkgCard").removeClass("card-collapsed");
		$("#pkgCardBody").css("display", "block");
		
		// 패키지 버전 목록 열림
		$("#pkgVerCardList").removeClass("card-collapsed");
		$("#pkgVerCardListBody").css("display", "block");
		fnGetPkg(param);
		
		// 패키지 버전 목록 조회
		var searchObj = {};
		searchObj.currentPage = 1;
		searchObj.pkgId = param.pkgId;
		fnGetPkgVerList(searchObj);
	});
	
	// DRL 파일명 클릭
	$(document).on("click", "._drlNmLink", function(e) {
		e.preventDefault();	// a링크 클릭이벤트 제거
		var param = {};
		param.pkgId = $(this).attr("data-pkgId");
		param.ver = $(this).attr("data-ver");
		
		$("#drlSourcePop_contents").text("");
		$("#drlSourcePop").show();
		fnGetDrlSouce(param);
	});
	
	// PKG 삭제 버튼
	$("#deletePkgBtn").click(function() {
		$(":focus").blur();
		var pkgListChkBox = $("._pkgListChkBox:checked");
		
		var pkgIdArr = [];
		$.each(pkgListChkBox, function(idx, pkgChkBox){
			var pkgId = pkgListChkBox.eq(idx).attr("data-pkgId");
		
			pkgIdArr.push(pkgId);
		});
		
		if(pkgIdArr.length > 0) {
			if(confirm(pkgIdArr.length + "건의 Package가 삭제됩니다.\n정말 삭제하시겠습니까?")) {
				var param = {};
				param.pkgIdArr = pkgIdArr;
				
				fnDeletePkg(param);
			}
			
		} else {
			messagePop("warning", "Package 삭제", "삭제할 Package를 선택하세요.", "");
		}
	});
	
	// 신규 PKG 생성 버튼
	$("#addNewPkgBtn").click(function() {
		// PKG 관련 초기화
		initPkgDetail();	// PKG 상세 초기화
		
		// RULE 연결 버튼 속성 초기화
		fnInitRuleMappingList();
		
		// 패키지 버전목록 초기화
		fnInitPkgVerList();
		// 이벤트 목록 초기화
		fnInitEventList();
		// RULE 조건 초기화
		fnInitRuleCondition();
		
		$("#pkgCard").removeClass("card-collapsed");
		$("#pkgCardBody").css("display", "");
		$("#pkgNm").focus();
	});
	
	// PKG 상세 > PKG 명 변경시 중복체크  요청
	$("#pkgNm").change(function() {
		$("#pkgDupY").hide();
		$("#pkgNmDupBtn").attr("data-isDup", "N");
	});
	
	// PKG 상세 > 중복체크 버튼 클릭
	$("#pkgNmDupBtn").click(function(){
		var pkgNm = $("#pkgNm").val();
		var pkgId = $("#pkgId").text();
		
		if(pkgNm == '') {
			messagePop("warning", "Package 명 공백체크.", "Package 명을 입력하세요.", "#pkgNm");
			return;
		}
		
		// PKG 명은 영문만 가능
		var pattern = /^[a-z]+[A-Za-z0-9+]*$/;
		
		if(!pattern.test(pkgNm)) {
			messagePop("warning", "Package 명 정합성 체크", "1. 영문소문자로 시작해야합니다.<br/>2. 공백을 포함할 수 없습니다.<br/>3. 한글 및 특수문자를 사용할 수 없습니다.", "#pkgNm");
			return;
		}
		
		var param = {};
		param.pkgNm = pkgNm;
		param.pkgId = pkgId;
		
		fnPkgNmCheck(param);
	});
	
	// 신규 패키지 생성 > PKG 상세 > 저장 버튼
	$("#savePkgBtn").click(function() {
		$(":focus").blur();
		// PKG 명 중복 체크
		var isDup = $("#pkgNmDupBtn").attr("data-isDup");
		
		if(isDup != 'Y') {
			messagePop("warning", "Package 명 중복체크", "Package 명 중복체크를 먼저 해주세요.", "#pkgNm");
			return;
		}
		
		if(confirm("변경사항을 저장하시겠습니까?")) {
			var param = {};
			param.pkgId = $("#pkgId").text();
			param.pkgNm = $("#pkgNm").val();
			param.pkgDsc = $("#pkgDsc").val();
			param.mappingRuleList = mappingRuleList;
			
			if(param.pkgId != '') {
				// 수정
				fnUpdatePkg(param);
				
			} else {
				// 신규등록
				fnAddPkg(param);
			}
			
			$(this).removeClass("btn-green");
			$(this).addClass("btn-gray");
		}
	});
	
	// PKG 목록 > 전체선택 버튼 클릭
	$("#pkgListAllChkBox").click(function() {
		var chked = $(this).prop("checked");
		
		if(chked) {
			$(this).closest("table").find("._pkgListChkBox").prop("checked", true);
			
		} else {
			$(this).closest("table").find("._pkgListChkBox").prop("checked", false);
		}
	});
	
	// 패키지 리스트 페이지 번호 클릭
	$("#pkgListPaging").on("click", "._paging", function(e) {
		var cls = $(this).attr("class");
		const pageNum = $(this).attr("data-page_num");
		
		var searchObj = {};
		searchObj.pkgId_search = $("#pkgId_search").val();
		searchObj.pkgActYn_search = $("#pkgActYn_search option:selected").val();
		searchObj.pkgRegUsrId_search = $("#pkgRegUsrId_search").val();
		searchObj.pkgNm_search = $("#pkgNm_search").val();
		searchObj.currentPage = pageNum;
		
		getPkgList(searchObj);
	});
	
	// 이벤트 리스트 페이지 번호 클릭
	$("#eventListPaging").on("click", "._paging", function(e) {
		var cls = $(this).attr("class");
		const pageNum = $(this).attr("data-page_num");
		var pkgId = $("#eventListPaging").attr("data-pkgId");
		var ver = $("#eventListPaging").attr("data-ver");
		
		var searchObj = {};
		searchObj.currentPage = pageNum;
		searchObj.pkgId = pkgId;
		searchObj.ver = ver;
		
		fnGetEventList(searchObj);
	});
	
	// 패키지 검색 > 초기화 버튼 클릭
	$("#pkgResetBtn").click(function() {
		fnInitPkgSearch();
	});
	
	// 패키지 관리 > 패키지 상세 > RULE 연결 버튼 클릭
	$("#ruleMappingBtn").click(function() {
		var isUpdate = $("#ruleMappingSaveBtn").attr("data-update");
		if(isUpdate == 'Y') {
			return;
		}
		
		// 적용될 배열에 있는 값으로 리스트 갱신
		drawGridMappingRuleList(mappingRuleList);
		drawGridConRuleList(conRuleList);
		
		$("#modal_ruleMappingLoading").hide();
	});
	
	// 패키지 관리 > 패키지 상세 > RULE 연결 팝업 ADD 버튼
	$(document).on("click", "._ruleAdd", function() {
		var ruleNm = $(this).closest("tr").find("a").text();
		var ruleId = $(this).closest("tr").find("a").attr("data-ruleId");
		var dfltSalience = $(this).closest("tr").find("input").val();
		
		var rule = {};
		rule.RULE_ID = ruleId * 1;
		rule.RULE_NM = ruleNm;
		rule.SALIENCE = dfltSalience * 1;
		
		// 선택된 index
		var idx = $(this).closest("tr").index();
		conRuleList.splice(idx, 1);	// 연결 가능한 RULE 목록에서 삭제
		mappingRuleList.push(rule);	// 연결 예정중인 RULE 목록에 추가
		
		// 적용될 배열에 있는 값으로 리스트 갱신
		drawGridMappingRuleList(mappingRuleList);
		drawGridConRuleList(conRuleList);
	});
	
	// 패키지 관리 > 패키지 상세 > RULE 연결 팝업 DEL 버튼
	$(document).on("click", "._ruleDel", function(e) {
		var ruleNm = $(this).closest("tr").find("a").text();
		var ruleId = $(this).closest("tr").find("a").attr("data-ruleId");
		var salience = $(this).closest("tr").find("input").val();
		
		var rule = {};
		rule.RULE_ID = ruleId * 1;
		rule.RULE_NM = ruleNm;
		rule.DFLT_SALIENCE = salience * 1;
		
		// 선택된 index
		var idx = $(this).closest("tr").index();
		mappingRuleList.splice(idx, 1);	// 연결 가능한 RULE 목록에서 삭제
		conRuleList.push(rule);	// 연결 예정중인 RULE 목록에 추가
		
		// 적용될 배열에 있는 값으로 리스트 갱신
		drawGridMappingRuleList(mappingRuleList);
		drawGridConRuleList(conRuleList);
	});
	
	// 패키지 관리 > 패키지 상세 > RULE 연결 적용버튼
	var mappingRuleIds = [];
	$("#ruleMappingSaveBtn").click(function() {
		var salienceArr = $("._salience");
		
		var isOk = true;
		$.each(salienceArr, function(idx, salience) {
			if(salienceArr.eq(idx).val() === '' || isNaN(salienceArr.eq(idx).val() * 1)) {
				messagePop("warning","연결 순서를 확인하세요.","","");
				isOk = false;
			}
		});
		
		if(isOk) {
			$.each(mappingRuleList, function(idx, mappingRule) {
				mappingRule.SALIENCE = salienceArr.eq(idx).val() * 1;
			});
			
			close_layerPop('modal_ruleMapping');
			$(this).attr("data-update", "Y");
			$("#savePkgBtn").removeClass("btn-gray");
			$("#savePkgBtn").addClass("btn-green");
		}
	});
	
	// 패키지 버전 목록 > 페이징 버튼 클릭이벤트
	$("#pkgVerListPaging").on("click", "._paging", function(e) {
		var cls = $(this).attr("class");
		const pageNum = $(this).attr("data-page_num");
		
		var searchObj = {};
		searchObj.currentPage = 1;
		searchObj.pkgId = $("#pkgId").text();
		searchObj.currentPage = pageNum;
		
		fnGetPkgVerList(searchObj);
	});
	
	// 패키지 상세  > 패키지 버전 목록 > 개발중인 패키지 배포 버튼
	$("#deployBtn").click(function() {
		var param = {};
		param.pkgId = $("#pkgId").text();
		fnDeployVer(param);
	});
	
	// 패키지 버전 목록 > 상태링크
	$(document).on("click", "._showEventLink", function(e) {
		// 이벤트 목록 초기화
		fnInitEventList();
		// RULE 조건 초기화
		fnInitRuleCondition();
		
		$("#eventCardList").removeClass("card-collapsed");
		$("#eventCardListBody").show();
		$("#eventCard").removeClass("card-collapsed");
		$("#eventCardBody").show();
		
		var pkgId = $(this).attr("data-pkgId");
		var ver = $(this).attr("data-ver");
		
		var searchObj = {};
		searchObj.currentPage = 1;
		searchObj.pkgId = pkgId;
		searchObj.ver = ver;
		// 해당 패키지 버전의 이벤트 목록 조회
		fnGetEventList(searchObj);
	});
	
	// 이벤트 목록 > 이벤트명 링크
	$(document).on("click", "._eventNmLink", function(e) {
		var pkgId = $(this).attr("data-pkgId");
		var ruleId = $(this).attr("data-ruleId");
		var ver = $(this).attr("data-ver");
		
		var param = {};
		param.pkgId = pkgId;
		param.ruleId = ruleId;
		param.ver = ver;
		
		// 해당 이벤트(RULE)의 상세내용 조회
		fnGetEvent(param);
	});
	
	// 패키지 상세 > RULE 연결 팝업 > RULE 명 클릭시 WHEN 컨디션 확인
	// _cmRuleLink = conRule + mappingRule + Link
	$(document).on("click", "._cmRuleLink", function() {
		var param = {};
		param.ruleId = $(this).attr("data-ruleId");
		
		$.ajax({
			method : "POST",
			url : "/targetai/getRule.do",
			traditional: true,
			data : JSON.stringify(param),
			contentType:'application/json; charset=utf-8',
			dataType : "json",
			success : function(res) {
				var rule = res.rule;
				
				$("#ruleMappingRuleNm").text(rule.RULE_NM);
				$("#ruleMappingWhen").val(rule.RULE_WHEN_KOR);
			},
			beforeSend : function() {
				$("#eventLoading").show();
			},
			complete : function() {
				$("#eventLoading").hide();
			},
			error : function(jqXHR, textStatus, errorThrown) {
				messagePop("warning", "에러발생", "관리자에게 문의하세요", "");
				console.log(jqXHR);
				console.log(textStatus);
				console.log(errorThrown);
			}
		});
	});
});

/**
 * 적용될 배열에 있는 값으로 리스트 갱신
 * @param conRuleList
 * @param mappingRuleList
 * @returns
 */
function drawGridConRuleList(conRuleList) {
	// 패키지와 연결 가능한 RULE 목록
	var html = "";
	if(conRuleList.length == 0) {
		html += "<tr>";
		html += "	<td colspan='4' class='t_center'>조회된 내용이 없습니다.</td>";
		html += "</tr>";
		
	} else {
		$.each(conRuleList, function(idx, rule){
			html += "<tr>";
			html += "	<td class='t_center'><button type='button' class='btn-add _ruleAdd' data-bs-dismiss='alert' aria-label='Close'></button></td>";
			html += "	<td class='t_center'><input type='text' class='_dfltSalience' value='"+ (typeof rule.DFLT_SALIENCE == 'undefined' ? '' : rule.DFLT_SALIENCE) +"' /></td>";
			html += "	<td class='t_center'>" + rule.RULE_ID + "</td>";
			html += "	<td class='t_center'><a href='#' class='_cmRuleLink' data-ruleId='"+ rule.RULE_ID +"'>" + rule.RULE_NM + "</a></td>";
			html += "</tr>";
		});
	}
	
	$("#conRuleList").html(html);
}

/**
 * 적용될 배열에 있는 값으로 리스트 갱신
 * @param conRuleList
 * @param mappingRuleList
 * @returns
 */
function drawGridMappingRuleList(mappingRuleList) {
	// 맵핑된 RULE 목록
	var html = "";
	if(mappingRuleList.length == 0) {
		html += "<tr>";
		html += "	<td colspan='4' class='t_center'>조회된 내용이 없습니다.</td>";
		html += "</tr>";
		
	} else {
		$.each(mappingRuleList, function(idx, rule){
			html += "<tr>";
			html += "	<td class='t_center'><button type='button' class='btn-del _ruleDel' data-bs-dismiss='alert' aria-label='Close'></button></td>";
			html += "	<td class='t_center'><input type='text' class='_salience' value='"+ (typeof rule.SALIENCE == 'undefined' ? '' : rule.SALIENCE) +"' /></td>";
			html += "	<td class='t_center'>" + rule.RULE_ID + "</td>";
			html += "	<td class='t_center'><a href='#' class='_cmRuleLink' data-ruleId='"+ rule.RULE_ID +"'>" + rule.RULE_NM + "</a></td>";
			html += "</tr>";
		});
	}
	
	$("#mappingRuleList").html(html);
}

/**
 * 해당 이벤트(RULE)의 상세내용 조회
 * @param param
 * @returns
 */
function fnGetEvent(param) {
	$.ajax({
		method : "POST",
		url : "/targetai/getRule.do",
		traditional: true,
		data : JSON.stringify(param),
		contentType:'application/json; charset=utf-8',
		dataType : "json",
		success : function(res) {
			var rule = res.rule;
			
			$("#eventNm").text(rule.RULE_NM);
			$("#eventDsc").val(rule.RULE_WHEN_KOR);
		},
		beforeSend : function() {
			$("#eventLoading").show();
		},
		complete : function() {
			$("#eventLoading").hide();
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
 * 해당 패키지 버전의 이벤트 목록 조회
 * @param param
 * @returns
 */
function fnGetEventList(searchObj) {
	searchObj.limit = 10;
	searchObj.offset = searchObj.currentPage*searchObj.limit-searchObj.limit;
	
	$.ajax({
		method : "POST",
		url : "/targetai/getEventList.do",
		traditional: true,
		data : JSON.stringify(searchObj),
		contentType:'application/json; charset=utf-8',
		dataType : "json",
		success : function(res) {
			var eventList = res.eventList;
			searchObj.totalCount = res.eventCount;
			
			var html = "";
			
			if(eventList.length == 0) {
				html += "<tr>";
				html += "	<td colspan='5' class='t_center'>조회된 내용이 없습니다.</td>";
				html += "</tr>";
				
			} else {
				$.each(eventList, function(idx, event){
					html += "<tr>";
					html += "	<td class='t_center'>" + event.RULE_ID + "</td>";
					html += "	<td class='t_center'><a href='#' class='_eventNmLink' data-ruleId='"+ event.RULE_ID +"' data-pkgId='"+ event.PKG_ID +"' data-ver='"+ event.VER +"'>" + event.RULE_NM + "</a></td>";
					html += "	<td class='t_center'>" + event.SALIENCE + "</td>";
					html += "	<td class='t_center'>" + event.REG_DT + "</td>";
					html += "	<td class='t_center'>" + event.MEMBER_NAME + "</td>";
					html += "</tr>";
				});
			}
			
			$("#eventList").html(html);
			$("#eventCount").text(res.eventCount);
			fnPaging("#eventListPaging", searchObj);
			$("#eventListPaging").attr("data-pkgId", searchObj.pkgId);
			$("#eventListPaging").attr("data-ver", searchObj.ver);
		},
		beforeSend : function() {
			$("#eventListLoading").show();
		},
		complete : function() {
			$("#eventListLoading").hide();
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
 * 개발중인 패키지 배포
 * @param param
 * @returns
 */
function fnDeployVer(param) {
	$.ajax({
		method : "POST",
		url : "/targetai/deployVer.do",
		traditional: true,
		data : JSON.stringify(param),
		contentType:'application/json; charset=utf-8',
		dataType : "json",
		success : function(res) {
			messagePop("success",res.rtnMsg,"","");
			
			// 패키지 버전 목록 갱신
			var searchObj = {};
			searchObj.currentPage = 1;
			searchObj.pkgId = param.pkgId;
			fnGetPkgVerList(searchObj);
			
			// 패키지 목록 갱신
			getPkgList(searchObj);
		},
		beforeSend : function() {
			$("#pkgVerListLoading").show();
		},
		complete : function() {
			$("#pkgVerListLoading").hide();
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
 * 배포버전 조회
 * @returns
 */
function fnGetPkgVerList(searchObj) {
	searchObj.limit = 10;
	searchObj.offset = searchObj.currentPage*searchObj.limit-searchObj.limit;
	
	$.ajax({
		method : "POST",
		url : "/targetai/getPkgVerList.do",
		traditional: true,
		data : JSON.stringify(searchObj),
		contentType:'application/json; charset=utf-8',
		dataType : "json",
		success : function(res) {
			var verList = res.verList;
			searchObj.totalCount = res.verCount;
			
			var html = "";
			
			if(verList.length == 0) {
				html += "<tr>";
				html += "	<td colspan='5' class='t_center'>조회된 내용이 없습니다.</td>";
				html += "</tr>";
				
			} else {
				$.each(verList, function(idx, ver){
					html += "<tr>";
					html += "	<td class='t_center'>" + ver.VER + "</td>";
					html += "	<td class='t_center'><a href='#' class='_drlNmLink' data-ver='"+ ver.VER +"' data-pkgId='"+ ver.PKG_ID +"'>" + ver.DRL_NM + "</a></td>";
					html += "	<td class='t_center'><a href='#' class='_showEventLink' data-ver='"+ ver.VER +"' data-pkgId='"+ ver.PKG_ID +"'>" + ver.VER_STATUS + "</td>";
					html += "	<td class='t_center'>" + (typeof ver.RUN_START_DATE == "undefined" ? "-" : ver.RUN_START_DATE) + "</td>";
					html += "	<td class='t_center'>" + (typeof ver.RUN_END_DATE == "undefined" ? "-" : ver.RUN_END_DATE) + "</td>";
					html += "</tr>";
				});
			}
			
			$("#pkgVerList").html(html);
			$("#pkgVerCount").text(res.verCount);
			fnPaging("#pkgVerListPaging", searchObj);
			
			// RULE 조건 초기화
			fnInitEventList();
			// 이벤트 목록 초기화
			fnInitRuleCondition();
		},
		beforeSend : function() {
			$("#pkgVerListLoading").show();
		},
		complete : function() {
			$("#pkgVerListLoading").hide();
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
 * Package 리스트 조회
 * @param searchObj
 * @returns
 */
function getPkgList(searchObj) {
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
				html += "	<td colspan='8' class='t_center'>조회된 내용이 없습니다.</td>";
				html += "</tr>";
				
			} else {
				for(var i=0; i<pkgList.length; i++) {
					html += "<tr>";
					html += "	<td class='t_center'>";
					html += "		<div class='checkbox-container'>";
					html += "			<input type='checkbox' class='_pkgListChkBox' data-pkgId='"+ pkgList[i].PKG_ID +"'/>";
					html += "			<label for='_pkgListChkBox'></label>";
					html += "		</div>";
					html += "	</td>";
					html += "	<td class='t_center'>" + pkgList[i].PKG_ID + "</td>";
					html += "	<td class='t_center'><a href='#' class='_pkgNmLink' data-pkgId='"+ pkgList[i].PKG_ID +"'>" + pkgList[i].PKG_NM + "</a></td>";
					if(typeof pkgList[i].DRL_NM == 'undefined') {
						html += "	<td class='t_center'>-</td>";
						
					} else {
						html += "	<td class='t_center'><a href='#' class='_drlNmLink' data-pkgId='"+ pkgList[i].PKG_ID +"' data-ver='"+ pkgList[i].VER +"'>" + pkgList[i].DRL_NM + "</a></td>";
					}
					if(typeof pkgList[i].DEV_DRL_NM == 'undefined') {
						html += "	<td class='t_center'>-</td>";
						
					} else {
						html += "	<td class='t_center'><a href='#' class='_drlNmLink' data-pkgId='"+ pkgList[i].PKG_ID +"' data-ver='"+ pkgList[i].DEV_VER +"'>" + pkgList[i].DEV_DRL_NM + "</a></td>";
					}
					html += "	<td class='t_center'>" + (typeof pkgList[i].UDT_DT == 'undefined' ? '-' : pkgList[i].UDT_DT) + "</td>";
					html += "	<td class='t_center'>" + (typeof pkgList[i].UDT_USRNM == 'undefined' ? '-' : pkgList[i].UDT_USRNM) + "</td>";
					html += "	<td class='t_center'>" + pkgList[i].REG_DT + "</td>";
					html += "	<td class='t_center'>" + pkgList[i].REG_USRNM + "</td>";
					html += "</tr>";
				}
			}
			
			$("#pkgList").html(html);
			$("#pkgCountBySearch").text(searchObj.totalCount);
			fnPaging("#pkgListPaging", searchObj);
			
			// 전체 체크 해제
			$("#pkgListAllChkBox").prop("checked", false);
		},
		beforeSend : function() {
			$("#pkgListLoading").show();
		},
		complete : function() {
			$("#pkgListLoading").hide();
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
 * 패키지 상세 조회
 * @param param
 * @returns
 */
function fnGetPkg(param) {
	$.ajax({
		method : "POST",
		url : "/targetai/getPkg.do",
		traditional: true,
		data : JSON.stringify(param),
		contentType:'application/json; charset=utf-8',
		dataType : "json",
		success : function(res) {
			var pkg = res.pkg;
			$("#pkgId").text(pkg.PKG_ID);
			$("#pkgNm").val(pkg.PKG_NM);
			$("#pkgDsc").val(pkg.PKG_DSC);
			$("#pkgActYn").val(pkg.PKG_ACT_YN);
			$("#pkgRegDt").text(pkg.REG_DT + "에 " + pkg.REG_USRNM + "(님)이 등록함.");
			if(typeof pkg.UDT_USRID == 'undefined') {
				$("#pkgUdtDt").text("수정 이력이 없습니다.");
			} else {
				$("#pkgUdtDt").text(pkg.UDT_DT + "에 " + pkg.UDT_USRNM + "(님)이 수정함.");
			}
			$("#curPkgStatus").text(pkg.CUR_DRL_NM + " ("+ pkg.CUR_VER_STATUS +")")
			$("#pkgCard").removeClass("card-collapsed");
			$("#pkgCardBody").css("display", "");
			$("#pkgNmDupBtn").attr("data-isDup", "Y");
			
			// Rule 연결 리스트 배열에 추가
			conRuleList = res.conRuleList;
			mappingRuleList = res.mappingRuleList;
			
			$("#ruleMappingSaveBtn").attr("data-update", "N");
		},
		beforeSend : function() {
			$("#pkgLoading").show();
		},
		complete : function() {
			$("#pkgLoading").hide();
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
 * PKG 상세 > 신규 등록
 * @param param
 * @returns
 */
function fnAddPkg(param) {
	$.ajax({
		method : "POST",
		url : "/targetai/addPkg.do",
		traditional: true,
		data : JSON.stringify(param),
		contentType:'application/json; charset=utf-8',
		dataType : "json",
		success : function(res) {
			messagePop("success", "Package가 저장되었습니다.", "", "");
			
			// 패키지 목록 조회
			var searchObj1 = {};
			searchObj1.currentPage = 1;
			fnInitPkgSearch();
			getPkgList(searchObj1);
			
			// 패키지 상세 조회
			param.pkgId = res.PKG_ID;
			fnGetPkg(param);
			
			// 패키지 버전 목록 조회
			var searchObj2 = {};
			searchObj2.currentPage = 1;
			searchObj2.pkgId = res.PKG_ID;
			fnGetPkgVerList(searchObj2);
		},
		beforeSend : function() {
			$("#pkgLoading").show();
		},
		complete : function() {
			$("#pkgLoading").hide();
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
 * PKG 상세 > 수정
 * @param param
 * @returns
 */
function fnUpdatePkg(param) {
	$.ajax({
		method : "POST",
		url : "/targetai/updatePkg.do",
		traditional: true,
		data : JSON.stringify(param),
		contentType:'application/json; charset=utf-8',
		dataType : "json",
		success : function(res) {
			var searchObj = {};
			searchObj.currentPage = 1;
			fnInitPkgSearch();
			getPkgList(searchObj);
			
			messagePop("success", "Package가 수정되었습니다.", "", "");
			
			fnGetPkg(param);
			
			// 패키지 버전 목록 조회
			var searchObj = {};
			searchObj.currentPage = 1;
			searchObj.pkgId = param.pkgId;
			fnGetPkgVerList(searchObj);
		},
		beforeSend : function() {
			$("#pkgLoading").show();
		},
		complete : function() {
			$("#pkgLoading").hide();
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
 * PKG 목록 > 삭제
 * @param param
 * @returns
 */
function fnDeletePkg(param) {
	$.ajax({
		method : "POST",
		url : "/targetai/deletePkgById.do",
		traditional: true,
		data : JSON.stringify(param),
		contentType:'application/json; charset=utf-8',
		dataType : "json",
		success : function(res) {
			if(res) {
				var searchObj = {};
				searchObj.pkgId_search = $("#pkgId_search").val();
				searchObj.pkgActYn_search = $("#pkgActYn_search option:selected").val();
				searchObj.pkgRegUsrId_search = $("#pkgRegUsrId_search").val();
				searchObj.pkgNm_search = $("#pkgNm_search").val();
				searchObj.currentPage = 1;
				
				getPkgList(searchObj);
				
				messagePop("success", "Package가 삭제되었습니다.", "", "");
				
				$("#pkgCard").addClass("card-collapsed");
				$("#pkgCardBody").css("display", "none");
				initPkgDetail();
			}
		},
		beforeSend : function() {
			$("#pkgLoading").show();
		},
		complete : function() {
			$("#pkgLoading").hide();
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
 * 패키지 상세 > 패키지명 중복체크
 * @param param
 * @returns
 */
function fnPkgNmCheck(param) {
	$.ajax({
		method : "POST",
		url : "/targetai/pkgNmCheck.do",
		traditional: true,
		data : JSON.stringify(param),
		contentType:'application/json; charset=utf-8',
		dataType : "json",
		success : function(res) {
			if(res == false) {	// RULE 명 중복
				$("#pkgDupY").css("display", "none");
				$("#pkgDupN").css("display", "");
				$("#pkgNmDupBtn").attr("data-isDup", "N");
				$("#pkgNm").focus();
				return;
			}
			
			$("#pkgDupY").css("display", "");
			$("#pkgDupN").css("display", "none");
			$("#pkgNmDupBtn").attr("data-isDup", "Y");
		}
	});
}

/**
 * RULE 연결 버튼 속성 초기화
 * @returns
 */
function fnInitRuleMappingList() {
	var param = {};
	
	$.ajax({
		method : "POST",
		url : "/targetai/getConRuleList.do",
		traditional: true,
		data : JSON.stringify(param),
		contentType:'application/json; charset=utf-8',
		dataType : "json",
		success : function(res) {
			conRuleList = res.conRuleList;
			mappingRuleList = [];
			$("#ruleMappingSaveBtn").attr("data-update", "N");
			
		},
		beforeSend : function() {
			$("#pkgLoading").show();
		},
		complete : function() {
			$("#pkgLoading").hide();
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
 * 패키지 목록 > DRL 소스 보기
 * @param param
 * @returns
 */
function fnGetDrlSouce(param) {
	$.ajax({
		method : "POST",
		url : "/targetai/getDrlSouce.do",
		traditional: true,
		data : JSON.stringify(param),
		contentType:'application/json; charset=utf-8',
		dataType : "json",
		success : function(res) {
			if(typeof res.DRL_SOURCE == 'undefined' || res.DRL_SOURCE == '') {
				res.DRL_SOURCE = "내용이 없습니다.";
			}
			
			$("#drlSourcePop_title").text(res.DRL_NM);
			$("#drlSourcePop_contents").text(res.DRL_SOURCE);
		},
		beforeSend : function() {
			$("#drlSourcePopLoading").show();
		},
		complete : function() {
			$("#drlSourcePopLoading").hide();
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
 * 패키지 상세 > RULE 연결 > 연결가능한 RULE 검색
 * @returns
 */
function fnConRuleSearch(searchVal) {
	var conRuleList_tmp = [];
	
	$.each(conRuleList, function(idx, conRule) {
		if(conRule.RULE_NM.indexOf(searchVal) != -1) {
			conRuleList_tmp.push(conRule);
		}
	});
	
	drawGridConRuleList(conRuleList_tmp);
} 

/**
 * 패키지 상세 > RULE 연결 > 연결 예정인 RULE 검색
 * @returns
 */
function fnMappingRuleSearch(searchVal) {
	var mappingRuleList_tmp = [];
	
	$.each(mappingRuleList, function(idx, mappingRule) {
		if(mappingRule.RULE_NM.indexOf(searchVal) != -1) {
			mappingRuleList_tmp.push(mappingRule);
		}
	});
	
	drawGridMappingRuleList(mappingRuleList_tmp);
} 

/**
 * PKG 상세 초기화
 * @returns
 */
function initPkgDetail() {
	$("#pkgId").text("");
	$("#pkgNm").val("");
	$("#pkgDsc").val("");
	$("#pkgRegDt").text("");
	$("#pkgUdtDt").text("");
	$("#pkgDupY").css("display", "none");
	$("#pkgDupN").css("display", "none");
	$("#pkgNmDupBtn").data("isDup", "N");
	$("#curPkgStatus").text("");
	mappingRuleIds = [];
}

/**
 * PKG 검색 초기화
 * @returns
 */
function fnInitPkgSearch() {
	$("#pkgId_search").val("");
	$("#pkgRegUsrId_search").val("");
	$("#pkgNm_search").val("");
}

/**
 * 패키지 버전목록 초기화
 * @returns
 */
function fnInitPkgVerList() {
	$("#pkgVerCount").text("");
	var html = "";
	html += "<tr>";
	html += "	<td colspan='5' class='t_center'>조회된 내용이 없습니다.</td>";
	html += "</tr>";
	$("#pkgVerList").html(html);
	$("#pkgVerCardList").removeClass("card-collapsed");
	$("#pkgVerCardListBody").show();
	$("#pkgVerListPaging").html("");
}

/**
 * 이벤트 목록 초기화
 * @returns
 */
function fnInitEventList() {
	$("#eventCount").text("");
	var html = "";
	html += "<tr>";
	html += "	<td colspan='5' class='t_center'>조회된 내용이 없습니다.</td>";
	html += "</tr>";
	$("#eventList").html(html);
	$("#eventCardList").addClass("card-collapsed");
	$("#eventCardListBody").hide();
}

/**
 * 패키지 상세 > RULE 연결 팝업 > WHEN 컨디션 부분 초기화
 * @returns
 */
function fnInitRuleMappingPopDetail() {
	$("#ruleMappingRuleNm").text("");
	$("#ruleMappingWhen").val("");
}

/**
 * RULE 조건 초기화
 * @returns
 */ 
function fnInitRuleCondition() {
	$("#eventCard").addClass("card-collapsed");
	$("#eventCardBody").hide();
	$("#eventDsc").val("");
	$("#eventNm").text("");
}

/**
 * Obj 복사
 */
function cloneObj(obj) {
	var newObj = {};
	
	for(const property in obj) {
		if(typeof obj[`${property}`] == 'number') {
			newObj[`${property}`] = `${obj[property]}` * 1;
			
		} else {
			newObj[`${property}`] = `${obj[property]}`;
		}
	}
	
	return newObj;
}

/**
 * Array 복사
 */
function cloneArr(arr) {
	var newArr = [];
	
	$.each(arr, function(idx, obj) {
		var newObj = {};
		
		for(const property in obj) {
			if(typeof obj[`${property}`] == 'object') {
				if(Array.isArray(obj[`${property}`])) {
					newObj[`${property}`] = cloneArr(obj[`${property}`]);
					
				} else {
					newObj[`${property}`] = cloneObj(obj[`${property}`])
				}
				
			} else if(typeof obj[`${property}`] == 'number') {
				newObj[`${property}`] = `${obj[property]}` * 1;

			} else {
				newObj[`${property}`] = `${obj[property]}`;
			}
		}
		
		newArr.push(newObj);
	});
	
	return newArr;
}


