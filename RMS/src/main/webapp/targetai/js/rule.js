/**
 * Rule 관리
 * @author 박주윤 차장
 * @since 2021.10.12
 */

$(document).ready(function() {
	var ruleObj = {};
	var ruleObjArr = [];
	var tmpObj = {};
	var tmpArr = [];
	
	var searchObj = {};
	searchObj.currentPage = 1;
	getRuleList(searchObj);
	fnSortableOption();
	
	// 220
	// RULE 검색 > 조회 버튼 클릭
	$("#ruleSearchBtn").click(function() {
		var searchObj = {};
		searchObj.ruleId_search = $("#ruleId_search").val();
		searchObj.ruleRegUsrId_search = $("#ruleRegUsrId_search").val();
		searchObj.ruleNm_search = $("#ruleNm_search").val();
		searchObj.currentPage = 1;
		getRuleList(searchObj);
	});
	
	// 230
	// RULE 목록 > RULE명 링크 클릭
	$(document).on("click","._ruleNmLink", function (e) {
		e.preventDefault(); // a링크 클릭이벤트 제거
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
				
				// -- RULE 상세페이지 초기화 시작 --
				$("#ruleId").text(rule.RULE_ID);
				$("#ruleNm").val(rule.RULE_NM);
				$("input:radio[name='noLoop']:radio[value='"+ rule.NO_LOOP +"']").prop("checked", true);
				$("input:radio[name='lockOnActive']:radio[value='"+ rule.LOCK_ON_ACTIVE +"']").prop("checked", true);
				$("#salience").val(rule.SALIENCE);
				$("#ruleCard").removeClass("card-collapsed");
				$("#ruleCardBody").css("display", "");
				$("#ruleDupY").css("display", "none");
				$("#ruleDupN").css("display", "none");
				$("#ruleNmDupBtn").data("isDup", "Y");
				// -- RULE 상세페이지 초기화 끝 --
				
				$("#ruleNm").focus();
				initRuleEditor();	
				
				// -- RULE 속성 객체 세팅 --
				ruleObjArr = [];
				var contents = "";
				var ruleHtml = "";
				
				var ruleAttrList = res.ruleAttrList;
				
				$.each(ruleAttrList, function(idx, ruleAttr) {
					ruleObj = {};
					ruleObj.factorGrpNm = ruleAttr.FACTOR_GRP_NM;
					ruleObj.factorId = ruleAttr.FACTOR_ID;
					ruleObj.factorNm = ruleAttr.FACTOR_NM;
					ruleObj.factorNmEn = ruleAttr.FACTOR_NM_EN;
					ruleObj.factorValType = ruleAttr.DATA_TYPE;
					ruleObj.factorVal = ruleAttr.FACTOR_VAL;
					
					ruleObj.logical_txt = ruleAttr.LOGICAL;
					ruleObj.relation_txt = ruleAttr.RELATION;
					ruleObj.ruleAttr_txt = ruleAttr.ATTR_WHEN_CONTENTS;
					ruleObj.ruleAttr_source = ruleAttr.ATTR_WHEN;
					
					ruleObjArr.push(ruleObj);
					
					ruleHtml += "<div class='alert fade show mg_b10' role='alert'>";
					ruleHtml += "	<button type='button' class='btn-del _ruleAttrMinus' data-bs-dismiss='alert' aria-label='Close'></button>";
					ruleHtml += 		ruleAttr.ATTR_WHEN_CONTENTS;
					ruleHtml += "</div>";
					
					contents += ruleAttr.ATTR_WHEN_CONTENTS;
				});
				
				$("#ruleAttrData").append(ruleHtml);
				$("#ruleWhenCont").val(contents);
				
				tmpArr = cloneArr(ruleObjArr);	// 취소시 되돌리기 위한 변수에도 초기값 세팅
			},
			beforeSend : function() {
				$("#ruleLoading").show();
			},
			complete : function() {
				$("#ruleLoading").hide();
			},
			error : function(jqXHR, textStatus, errorThrown) {
				messagePop("warning", "에러발생", "관리자에게 문의하세요", "");
				console.log(jqXHR);
				console.log(textStatus);
				console.log(errorThrown);
			}
		});
	});
	
	// RULE 검색 > 초기화 버튼 클릭
	$("#ruleResetBtn").click(function() {
		fnInitRuleSearch();
	});
	
	// RULE 목록 > 전체선택 버튼 클릭
	$("#ruleListAllChkBox").click(function() {
		var chked = $(this).prop("checked");
		
		if(chked) {
			$(this).closest("table").find("._ruleListChkBox").prop("checked", true);
			
		} else {
			$(this).closest("table").find("._ruleListChkBox").prop("checked", false);
		}
	});
});

/**
 * RULE 리스트 조회
 */
function getRuleList(searchObj) {
	searchObj.limit = 10;
	searchObj.offset = searchObj.currentPage*searchObj.limit-searchObj.limit;
	
	$.ajax({
		method : "POST",
		url : "/targetai/getRuleList.do",
		traditional: true,
		data : JSON.stringify(searchObj),
		contentType:'application/json; charset=utf-8',
		dataType : "json",
		success : function(res) {
			var ruleList = res.ruleList;
			searchObj.totalCount = res.ruleCount;
			
			var html = "";
			
			if(ruleList.length == 0) {
				html += "<tr>";
				html += "	<td colspan='8' class='t_center'>조회된 내용이 없습니다.</td>";
				html += "</tr>";
				
			} else {
				for(var i=0; i<ruleList.length; i++) {
					html += "<tr>";
					html += "	<td class='t_center'>";
					html += "		<div class='checkbox-container'>";
					html += "			<input type='checkbox' class='_ruleListChkBox' data-ruleId='"+ ruleList[i].RULE_ID +"'/>";
					html += "			<label for='_ruleListChkBox'></label>";
					html += "		</div>";
					html += "	</td>";
					html += "	<td class='t_center'>" + ruleList[i].RULE_ID + "</td>";
					html += "	<td class='t_center'><a href='#' class='_ruleNmLink' data-ruleId='"+ ruleList[i].RULE_ID +"'>" + ruleList[i].RULE_NM + "</a></td>";
					html += "	<td class='t_center'>" + ruleList[i].SALIENCE + "</td>";
					html += "	<td class='t_center'>" + (typeof ruleList[i].UDT_DT == 'undefined' ? "-" : ruleList[i].UDT_DT) + "</td>";
					html += "	<td class='t_center'>" + (typeof ruleList[i].UDT_USRNM == 'undefined' ? "-" : ruleList[i].UDT_USRNM) + "</td>";
					html += "	<td class='t_center'>" + ruleList[i].REG_DT + "</td>";
					html += "	<td class='t_center'>" + ruleList[i].REG_USRNM + "</td>";
					html += "</tr>";
				}
			}
			
			$("#ruleList").html(html);
			$("#ruleCntInPkgBySearch").text(searchObj.totalCount);
			$("#ruleCntInPkg").text(searchObj.totalCount + "개");
			fnPaging("#ruleListPaging", searchObj);
			$("#ruleListCard").removeClass("card-collapsed");
			$("#ruleListCardBody").css("display", "");
			
			// 패키지당 RULE 한개이상 생성되면 RULE TEST OPEN 버튼 보임
			if(searchObj.totalCount > 0) {
				$("#ruleTestPopBtn").show();
			} else {
				$("#ruleTestPopBtn").hide();
			}
			
			// 전체 체크 해제
			$("#ruleListAllChkBox").prop("checked", false);
			
		},
		beforeSend : function() {
			$("#ruleLoading").show();
		},
		complete : function() {
			$("#ruleLoading").hide();
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
 * RULE EDITOR 초기화
 * @returns
 */
function initRuleEditor() {
	$("#ruleAttrData").html("");
	$("#factorVal").html("");
	$("#changeInputBtn").css("display", "none");
	$("#logicalRadio1").prop("checked", true);
	$("#relationRadio1").prop("checked", true);
}

/**
 * RULE 검색 초기화
 * @returns
 */
function fnInitRuleSearch() {
	$("#ruleId_search").val("");
	$("#ruleRegUsrId_search").val("");
	$("#ruleNm_search").val("");
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