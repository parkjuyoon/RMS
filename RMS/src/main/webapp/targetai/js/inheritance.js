/**
 * Inheritance (RULE 상속 정보)
 * @author 박주윤 차장
 * @since 2022.01.06
 */

$(document).ready(function() {
	var searchObj = {};
	searchObj.currentPage = 1;
	
	// RULE 상속정보 목록 조회
	fnGetIhList(searchObj);
	// RULE 상속정보 목록 페이징 클릭
	$("#ihListPaging").on("click", "._paging", function() {
		fnGetIhList(searchObj);
	});
	
	// RULE 상속 검색 > 조회 버튼
	$("#ihSearchBtn").click(function() {
		var msSelect_search = $("#msSelect_search").val();
		var ruleId_search = $("#ruleId_search").val();
		var ruleNm_search = $("#ruleNm_search").val();
		var ihRegUsrNm_search = $("#ihRegUsrNm_search").val();
		
		var searchObj = {};
		searchObj.msSelect_search = msSelect_search;
		searchObj.ruleId_search = ruleId_search;
		searchObj.ruleNm_search = ruleNm_search;
		searchObj.ihRegUsrNm_search = ihRegUsrNm_search;
		searchObj.currentPage = 1;
		// RULE 상속정보 목록 조회
		fnGetIhList(searchObj);
	});
	
	// RULE 상속 검색 > 초기화 버튼
	$("#ihResetBtn").click(function() {
		$("#ruleId_search").val("");
		$("#ihRegUsrNm_search").val("");
		$("#ruleNm_search").val("");
		$("#msSelect_search").val("master");
	});
	
	// RULE 상속 정보 목록 > 현행화 > 처리 버튼
	$(document).on("click", "._serializeBtn", function() {
		$("#modal_serialize").show();
	});
});

/**
 * RULE 상속정보 목록
 * @returns
 */
function fnGetIhList(searchObj) {
	searchObj.limit = 10;
	searchObj.offset = searchObj.currentPage*searchObj.limit-searchObj.limit;
	
	$.ajax({
		method : "POST",
		url : "/targetai/getIhList.do",
		traditional: true,
		data : JSON.stringify(searchObj),
		contentType:'application/json; charset=utf-8',
		dataType : "json",
		success : function(res) {
			var ihList = res.ihList;
			var ihListCount = res.ihListCount;
			searchObj.totalCount = ihListCount;
			
			var html = "";
			
			if(ihList.length == 0) {
				html += "<tr>";
				html += "	<td colspan='8' class='t_center'>조회된 내용이 없습니다.</td>";
				html += "</tr>";
				
			} else {
				$.each(ihList, function(idx, ih){
					html += "<tr>";
					html += "	<td class='t_center'>"+ ih.MASTER_RULE_NM +"</td>";
					html += "	<td class='t_center'>"+ ih.MASTER_RULE_ID + "_v" + ih.MASTER_RULE_REAL_VER + "</td>";
					html += "	<td class='t_center'>"+ ih.SLAVE_RULE_ID + "_v" + ih.SLAVE_RULE_VER + "</td>";
					html += "	<td class='t_center'>"+ ih.SLAVE_RULE_NM +"</td>";
					html += "	<td class='t_center'>v"+ ih.MASTER_RULE_VER +"</td>";
					html += "	<td class='t_center'>"+ ih.IH_REG_DT +"</td>";
					html += "	<td class='t_center'>"+ ih.IH_USER +"</td>";
					html += "	<td class='t_center'>";
					if(ih.MASTER_RULE_VER != ih.MASTER_RULE_REAL_VER) {
						html += "	<button type='button' class='btn btn-sm btn-green _serializeBtn'>";
						html += "		<i class='far fa-check-circle custom-btn-i'></i>  처리";
						html += "	</button>";
					}
					html += "	</td>";
					html += "</tr>";
				});
			}
			
			$("#ihList").html(html);
			$("#ihCntBySearch").text(ihListCount)
			fnPaging("#ihListPaging", searchObj);
				
		},
		beforeSend : function() {
			$("#ihListLoading").show();
		},
		complete : function() {
			$("#ihListLoading").hide();
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
 * RULE의 운영 배포
 * @param param
 * @returns
 */
function fnRuleDeploy(param) {
	$.ajax({
		method : "POST",
		url : "/targetai/ruleDeploy.do",
		traditional: true,
		data : JSON.stringify(param),
		contentType:'application/json; charset=utf-8',
		dataType : "json",
		success : function(res) {
			messagePop("success", "개발중인 RULE을 운영배포 하였습니다.", "", "");
			// RULE 버전 목록 갱신
			var searchObj = {};
			searchObj.ruleId = param.ruleId;
			searchObj.currentPage = 1;
			fnGetRuleVerList(searchObj);
			$("#effectChkPop").hide();
		},
		error : function(jqXHR, textStatus, errorThrown) {
			messagePop("warning", "에러발생", "관리자에게 문의하세요", "");
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

