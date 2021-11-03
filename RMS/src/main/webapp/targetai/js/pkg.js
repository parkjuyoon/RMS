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
		var param = {};
		param.pkgId = $(this).attr("data-pkgId");
		
		fnGetPkg(param);
	});
	
	// 패키지 목록 > DRL 파일명 클릭
	$(document).on("click", "._drlNmLink", function(e) {
		e.preventDefault();	// a링크 클릭이벤트 제거
		var param = {};
		param.pkgId = $(this).attr("data-pkgId");
		
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
			param.mappingRuleIds = mappingRuleIds;
			
			if(param.pkgId != '') {
				// 수정
				fnUpdatePkg(param);
				
			} else {
				// 신규등록
				fnAddPkg(param);
			}
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
		searchObj.currentPage = 1;
		
		getPkgList(searchObj);
	});
	
	// 패키지 검색 > 초기화 버튼 클릭
	$("#pkgResetBtn").click(function() {
		fnInitPkgSearch();
	});
	
	// 패키지 상세 > RULE TEST OPEN 버튼 클릭
	$("#ruleTestPopBtn").click(function() {
		var param = {};
		param.pkgId = $("#pkgId").text();
		
		if(mappingRuleList.length > 0) {
			fnRuleTest(param);
		} else {
			messagePop("warning", "연결된 RULE 없음", "RULE 연결을 먼저 진행하세요.", "");
		}
	});
	
	// 패키지 상세 > RULE TEST 팝업 > RULE 속성명 클릭
	$(document).on("click", "._ruleTestPop_factorNm", function(e) {
		e.preventDefault();
		
		var factorNmEn = $(this).attr("data-factorNmEn");
		var factorVal = $(this).attr("data-factorVal");
		var factorNm = $(this).text();
		var factorGrpNm = $(this).attr("data-factorGrpNm");
		
		var html = "";
		html += "<div class='oneline_group'>";
		html += "	<div class='form_group'>";
		html += "		<label for=''>KEY</label> <input type='text' name='ruleTestPop_key' value='"+ factorNmEn +"' readonly='readonly'/>";
		html += "	</div>";
		html += "	<div class='form_group'>";
		if(factorGrpNm == '함수') {
			html += "		<label for=''>VALUE</label> <input type='text' name='ruleTestPop_value' class='wd150px' value='"+ factorVal.replaceAll("\"", "") +"' readonly='readonly'/>";
		} else {
			html += "		<label for=''>VALUE</label> <input type='text' name='ruleTestPop_value' class='wd150px' value='"+ factorVal.replaceAll("\"", "") +"'/>";
		}
		html += "	</div>";
		html += "	<button type='button' class='btn btn-sm btn-red _ruleTestPop_del' style='color: white'>삭제</button>";
		html += "</div>";
		
		$("#ruleTestPop_input").append(html);
	});
	
	// RULE TEST 메뉴 > 속성 삭제 버튼 클릭
	$(document).on("click", "._ruleTestPop_del", function() {
		var delIdx = $("._ruleTestPop_del").index(this);
		$(this).closest(".oneline_group").remove();
	});

	// RULE TEST 메뉴 결과확인 버튼 클릭
	var keyValueArr = [];
	$(document).on("click", "#ruleTestPop_resBtn", function() {
		var drlPath = $(this).attr("data-drlPath");
		
		if(drlPath == '-1') {
			messagePop("warning", "RULE TEST 체크", "Package를 선택하세요.", "");
			return;
		}
		
		var keyArr = $("input[name='ruleTestPop_key']");
		var keyVal = $("input[name='ruleTestPop_value']");
		
		for(var i=0; i<keyArr.length; i++) {
			var key = keyArr.eq(i).attr("data-valueEn");
			var val = keyVal.eq(i).val();
			
			if(key == '' || val == '') {
				messagePop("warning", "KEY / VALUE 체크", "빈값을 포함할 수 없습니다.", "");
				return;
			}
			
			var keyValue = key + ":" + val;
			
			keyValueArr.push(keyValue);
		}
		
		var param = {};
		param.pkgId = $("#pkgId").text();
		param.drlPath = drlPath;
		param.keyValueArr = keyValueArr;
		
		$.ajax({
			method : "POST",
			url : "/targetai/ruleTest.do",
			traditional: true,
			data : JSON.stringify(param),
			contentType:'application/json; charset=utf-8',
			dataType : "json",
			success : function(res) {
				if(res.length < 1) {
					$("#ruleTestResPop_res").val("Output 결과가 없습니다.");
					
				} else {
					$("#ruleTestResPop_res").val(JSON.stringify(res, null, 4));
				}
				
				$("#ruleTestResPop").show();
			},
			beforeSend : function() {
				$("#ruleTestPopLoading").show();
			},
			complete : function() {
				$("#ruleTestPopLoading").hide();
			},
			error : function(jqXHR, textStatus, errorThrown) {
				messagePop("warning", "에러발생", "관리자에게 문의하세요", "");
				console.log(jqXHR);
				console.log(textStatus);
				console.log(errorThrown);
			}
		});
		
		keyValueArr = [];
	});

	// RULE TEST 팝업 닫기
	$(document).on("click", "._ruleTestPop_close", function() {
		$("#ruleTestPop_input").html("");
	});
	
	// 패키지 관리 > 패키지 상세 > RULE 연결 버튼 클릭
	$("#ruleMappingBtn").click(function() {
		$("#modal_ruleMappingLoading").show();
		var isUpdate = $("#ruleMappingSaveBtn").attr("data-update");
		if(isUpdate == 'Y') {
			return;
		}
		
		// 맵핑된 RULE 목록
		var html1 = "";
		$.each(mappingRuleList, function(idx, mappingRule) {
			html1 += "<div>";
			html1 += "	<input type='checkbox' class='_mappingRuleCheck' data-ruleId='"+ mappingRule.RULE_ID +"'/>\t" + mappingRule.RULE_NM;
			html1 += "</div>";
		});
		
		var html2 = "";
		// 패키지와 연결 가능한 RULE 목록
		$.each(conRuleList, function(idx, conRule) {
			html2 += "<div>";
			html2 += "	<input type='checkbox' class='_conRuleCheck' data-ruleId='"+ conRule.RULE_ID +"'/>\t" + conRule.RULE_NM;
			html2 += "</div>";
		});
		
		$("#mappingRuleList").html(html1);
		$("#conRuleList").html(html2);
		$("#modal_ruleMappingLoading").hide();
	});
	
	// 패키지 관리 > 패키지 상세 > RULE 연결 팝업 ADD 버튼
	$("#mappingAddBtn").click(function() {
		var checkedItems = $("._conRuleCheck:checked");
		
		for(var i=0; i<checkedItems.length; i++) {
			checkedItems.eq(i).attr("class", "_mappingRuleCheck");
			var html = checkedItems.eq(i).parent("div")[0];
			$("#mappingRuleList").append(html);
		}
		
		$("#conRuleList").find("input[type='checkbox']").prop("checked", false);
		$("#mappingRuleList").find("input[type='checkbox']").prop("checked", false);
	});
	
	// 패키지 관리 > 패키지 상세 > RULE 연결 팝업 ADD 버튼
	$("#mappingRemoveBtn").click(function() {
		var checkedItems = $("._mappingRuleCheck:checked");
		
		for(var i=0; i<checkedItems.length; i++) {
			checkedItems.eq(i).attr("class", "_conRuleCheck");
			var html = checkedItems.eq(i).parent("div")[0];
			$("#conRuleList").append(html);
		}
		
		$("#conRuleList").find("input[type='checkbox']").prop("checked", false);
		$("#mappingRuleList").find("input[type='checkbox']").prop("checked", false);
	});
	
	// 패키지 관리 > 패키지 상세 > RULE 연결 적용버튼
	var mappingRuleIds = [];
	$("#ruleMappingSaveBtn").click(function() {
		mappingRuleIds = [];
		var ruleList = $("#mappingRuleList ._mappingRuleCheck");
		var pkgId = $("#pkgId").text();
		
		for(var i=0; i<ruleList.length; i++) {
			var ruleId = ruleList.eq(i).attr("data-ruleId");
			
			mappingRuleIds.push(ruleId);
		}
		
		close_layerPop('modal_ruleMapping');
		$(this).attr("data-update", "Y");
	});
	
});

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
					html += "	<td class='t_center'><a href='#' class='_drlNmLink' data-pkgId='"+ pkgList[i].PKG_ID +"'>" + pkgList[i].DRL_NM + "</a></td>";
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
			
			if(pkg.RULE_COUNT_IN_PKG > 0) {
				var drlPath = pkg.PATH + "/" + pkg.PKG_NM + "/" + pkg.DRL_NM;
				$("#ruleTestPop_resBtn").attr("data-drlPath", drlPath);
			} 
			
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
			var searchObj = {};
			searchObj.currentPage = 1;
			fnInitPkgSearch();
			getPkgList(searchObj);
			
			messagePop("success", "Package가 저장되었습니다.", "", "");
			$("#pkgId").text(res.PKG_ID);
			$("#pkgRegDt").text(res.REG_DT + "에 " + res.REG_USRNM + "(님)이 등록함.");
			fnGetPkg(param);
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
			$("#pkgUdtDt").text(res.UDT_DT + "에 " + res.UDT_USRNM + "(님)이 등록함.");
			fnGetPkg(param);
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
 * RULE TEST OPEN 팝업 내 RULE 속성
 * @param param
 * @returns
 */
function fnRuleTest(param) {
	$.ajax({
		method : "POST",
		url : "/targetai/getRuleAttrByPkgId.do",
		traditional: true,
		data : JSON.stringify(param),
		contentType:'application/json; charset=utf-8',
		dataType : "json",
		success : function(res) {
			var ruleAttrList = res.ruleAttrList;
			var html = "";
			var html2 = "";
			
			$.each(ruleAttrList, function(idx, ruleAttr) {
				if(idx != 0 && ruleAttrList[idx-1].RELATION == '') {
					html += "\n";
				}
				
				if(idx == 0 || (idx != 0 && ruleAttrList[idx-1].RELATION == '')) {
					html += "\""+ ruleAttr.RULE_NM +"\"";
					html += "\n";
				}
				
				// [고객 : 인터넷결합여부] =="N"&& 형식으로 출력
//				if(ruleAttr.LOGICAL == 'in' || ruleAttr.LOGICAL == 'not in') {
//					html += "	["+ ruleAttr.FACTOR_GRP_NM +" : <a href='#' class='_ruleTestPop_factorNm' data-factorNmEn='"+ ruleAttr.FACTOR_NM_EN +"'>"+ ruleAttr.FACTOR_NM +"</a>] "+ ruleAttr.LOGICAL + ruleAttr.FACTOR_VAL + ruleAttr.RELATION;
//				} else {
//					html += "	["+ ruleAttr.FACTOR_GRP_NM +" : <a href='#' class='_ruleTestPop_factorNm' data-factorNmEn='"+ ruleAttr.FACTOR_NM_EN +"'>"+ ruleAttr.FACTOR_NM +"</a>] "+ ruleAttr.LOGICAL + ruleAttr.FACTOR_VAL + ruleAttr.RELATION;
//				}
				
				html += "<a href='#' class='_ruleTestPop_factorNm' data-factorGrpNm= '"+ ruleAttr.FACTOR_GRP_NM +"' data-factorNmEn='"+ ruleAttr.FACTOR_NM_EN +"' data-factorVal='"+ ruleAttr.FACTOR_VAL +"'>\t"+ ruleAttr.ATTR_WHEN_CONTENTS +"</a>";
				
				html2 += "<div class='oneline_group'>";
				html2 += "	<div class='form_group'>";
				html2 += "		<label for=''>KEY</label> <input type='text' name='ruleTestPop_key' value='"+ ruleAttr.FACTOR_NM +"' data-valueEn='"+ ruleAttr.FACTOR_NM_EN +"' readonly='readonly'/>";
				html2 += "	</div>";
				html2 += "	<div class='form_group'>";
				if(ruleAttr.FACTOR_GRP_NM == '함수') {
					html2 += "		<label for=''>VALUE</label> <input type='text' name='ruleTestPop_value' class='wd150px' value='"+ ruleAttr.FACTOR_VAL.replaceAll("\"", "") +"' readonly='readonly'/>";
				} else {
					html2 += "		<label for=''>VALUE</label> <input type='text' name='ruleTestPop_value' class='wd150px' value='"+ ruleAttr.FACTOR_VAL.replaceAll("\"", "") +"'/>";
				}
				html2 += "	</div>";
				html2 += "	<button type='button' class='btn btn-sm btn-red _ruleTestPop_del' style='color: white'>삭제</button>";
				html2 += "</div>";
			});
			
			$("#ruleTestPop_input").append(html2);
			$("#ruleAttrPreView").html(html);
			$("#modal_ruleTest").show();
		},
		beforeSend : function() {
			$("#ruleTestPopLoading").show();
		},
		complete : function() {
			$("#ruleTestPopLoading").hide();
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
			var pkg = res.pkg;

			if(typeof pkg.DRL_SOURCE == 'undefined' || pkg.DRL_SOURCE == '') {
				pkg.DRL_SOURCE = "내용이 없습니다.";
			}
			
			$("#drlSourcePop_title").text(pkg.DRL_NM);
			$("#drlSourcePop_contents").text(pkg.DRL_SOURCE);
			$("#drlSourcePop").show();
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
 * 패키지 상세 > RULE 연결 > RULE 검색
 * @returns
 */
function fnRuleSearch(searchVal) {
	var param = {};
	param.ruleNm = searchVal;
	
	$.ajax({
		method : "POST",
		url : "/targetai/getConRuleList.do",
		traditional: true,
		data : JSON.stringify(param),
		contentType:'application/json; charset=utf-8',
		dataType : "json",
		success : function(res) {
			var conRuleList = res.conRuleList;
			
			var html = "";
			$.each(conRuleList, function(idx, conRule) {
				html += "<div>";
				html += "	<input type='checkbox' class='_conRuleCheck' data-ruleId='"+ conRule.RULE_ID +"'/>\t" + conRule.RULE_NM;
				html += "</div>";
			});
			
			$("#conRuleList").html(html);
		},
		beforeSend : function() {
			$("#modal_ruleMappingLoading").show();
		},
		complete : function() {
			$("#modal_ruleMappingLoading").hide();
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


