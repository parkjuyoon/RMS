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
	
	// RULE 검색 > 조회 버튼 클릭
	$("#ruleSearchBtn").click(function() {
		var searchObj = {};
		searchObj.ruleId_search = $("#ruleId_search").val();
		searchObj.ruleRegUsrId_search = $("#ruleRegUsrId_search").val();
		searchObj.ruleNm_search = $("#ruleNm_search").val();
		searchObj.currentPage = 1;
		getRuleList(searchObj);
	});
	
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
	
	// RULE 명 변경시 중복체크  요청
	$("#ruleNm").change(function() {
		$("#ruleDupY").hide();
		$("#ruleNmDupBtn").data("isDup", "N");
	});
	
	// RULE 상세 > 중복체크 버튼 클릭
	$("#ruleNmDupBtn").click(function(){
		var ruleNm = $("#ruleNm").val();
		var pkgId = $("#pkgId").text();
		var ruleId = $("#ruleId").text();
		
		if(ruleNm == '') {
			messagePop("warning", "RULE 명 공백체크.", "RULE 명을 입력하세요.", "#ruleNm");
			return;
		}
		
		var param = {};
		param.ruleNm = ruleNm;
		param.pkgId = pkgId;
		param.ruleId = ruleId;
		
		$.ajax({
			method : "POST",
			url : "/targetai/ruleNmCheck.do",
			traditional: true,
			data : JSON.stringify(param),
			contentType:'application/json; charset=utf-8',
			dataType : "json",
			success : function(res) {
				if(res == false) {	// RULE 명 중복
					$("#ruleDupY").css("display", "none");
					$("#ruleDupN").css("display", "");
					$("#ruleNmDupBtn").data("isDup", "N");
					$("#ruleNm").focus();
					return;
				}
				
				$("#ruleDupY").css("display", "");
				$("#ruleDupN").css("display", "none");
				$("#ruleNmDupBtn").data("isDup", "Y");
			}
		});
	});
	
	// RULE 목록 > 신규 RULE 생성 버튼 클릭
	$("#addNewRuleBtn").click(function() {
		// RULE 속성 Obj 초기화
		ruleObj = {};	tmpObj = {};
		ruleObjArr = [];	tmpArr = [];
		initRuleDetail();	// RULE 상세 초기화
		initRuleEditor();	// RULE EDITOR 초기화
		
		$("#ruleCard").removeClass("card-collapsed");
		$("#ruleCardBody").css("display", "");
		$("#ruleNmDupBtn").data("isDup", "N");
		$("#ruleNm").focus();
	});
	
	// RULE 상세 > RULE EDITOR 버튼 클릭
	$("#ruleEditorPopUp").click(function() {
		var html = "";
		$.each(ruleObjArr, function(idx, ruleObj) {
			html += "<div class='alert fade show mg_b10' role='alert'>";
			html += "	<button type='button' class='btn-del _ruleAttrMinus' data-bs-dismiss='alert' aria-label='Close'></button>";
			html += 		"<span>" + ruleObj.ruleAttr_txt + "</span>";
			html += "</div>";
		});
		
		$("#ruleAttrData").html(html);
		
		fngetFactorListTree();	// RULE EDITOR 트리 생성
		
		$("#modal_ruleEditor").show();
		if($("#ruleCardBody").css("display") == "none") {
			$(this).closest('.card').trigger( 'card:toggle' );
		}
	});
	
	// RULE EDITOR 팝업 > 직접입력
	$("#changeInputBtn").click(function() {
		$("#factorVal").hide();
		$("#factorVal_direct").show();
		$("#factorVal_direct").focus();
		$("#factorVal").attr("data-type", "INPUT");
	});
	
	// RULE 상세 > RULE EDITOR > ADD VALUE 버튼 클릭
	$("#addValBtn1").click(function() {
		var treeObj = $.fn.zTree.getZTreeObj("factorTree");
		var node = treeObj.getSelectedNodes()[0];
		
		if(typeof node === "undefined" || node.isParent) {
			messagePop("warning", "요소값 체크","요소값을 입력 후 추가하세요","");
			return;
		}
		
		var factorGrpNm = node.getParentNode().name;
		var factorId = node.id;
		var factorNm = node.name;
		var factorNmEn = node.name_en;
		var factorValType = $("#factorVal").attr("data-type");
		var factorVal = "";
		var logical = $("input[name='logicalRadios']:checked").val();
		var logical_txt = $("input[name='logicalRadios']:checked").next().text();
		
		// RULE 속성 추가시 제약조건 체크
		var factorVal_Tag = "";
		
		// 요소 값 입력 여부 체크
		if(factorValType === "STRING") {
			factorVal = $("input[name='detAttrChk']:checked").val();
			factorVal_Tag = $("input[name='detAttrChk']:checked");
			
			if(typeof factorVal === "undefined" || factorVal == "") {
				messagePop("warning", "요소값 체크","요소값을 입력 후 추가하세요","");
				return;
			}
			
		} else if(factorValType === "INT") {
			factorVal = $("input[name='detAttrChk']").val();
			factorVal_Tag = $("input[name='detAttrChk']");
			
			if(typeof factorVal === "undefined" || factorVal == "") {
				messagePop("warning", "요소값 체크","요소값을 입력 후 추가하세요","");
				return;
			}
			
			// 숫자만 입력했는지 체크
			var pattern_num = /^[0-9]+$/;
			if(!(logical == 'logical6' || logical == 'logical7')) {
				if(!pattern_num.test(factorVal)) {
					messagePop("warning", "요소값 체크","숫자만 입력할 수 있습니다.","");
					return;
				}
			}
			
		} else if(factorValType === "DATE") {
			factorVal = $("input[name='detAttrChk']").val();
			factorVal_Tag = $("input[name='detAttrChk']");
			
			if(typeof factorVal === "undefined" || factorVal == "") {
				messagePop("warning", "요소값 체크","요소값을 입력 후 추가하세요.","");
				return;
			}
			 
		} else if(factorValType === "INPUT") {
			factorVal = $("#factorVal_direct").val();
			factorVal_Tag = $("input[name='detAttrChk']");
			
			if(typeof factorVal === "undefined" || factorVal == "") {
				messagePop("warning", "요소값 체크","요소값을 입력 후 추가하세요.","");
				return;
			}
			
		} else if(factorValType === "ARGS") {
			factorVal = $("input[type='radio'][name='detAttrChk']:checked").val();
			factorVal_Tag = $("input[type='text'][name='detAttrChk']");
			
			for(var idx=0; idx<factorVal_Tag.length; idx++) {
				var dataType = factorVal_Tag.eq(idx).attr("data-dataType");
				var paramVal = factorVal_Tag.eq(idx).val();
				
				if(paramVal == '') {
					messagePop("warning", "요소값을 입력 후 추가하세요.","","");
					return;
				}
				
				if(dataType === 'INT') {
					paramVal = factorVal_Tag.eq(idx).val() * 1;
					
					if(isNaN(paramVal)) {
						messagePop("warning", "파라미터 데이터 타입이 잘못 입력되었습니다.","","");
						return;
					}
				}
			}
			
		} else {
			messagePop("warning", "요소값 체크","요소값을 선택 후 추가하세요","");
			return;
		}
		
		// RULE 일 경우만 실행
		if(factorValType != "ARGS") {
			// 논리연산 IN, NOT IN 선택
			if(logical == 'logical6' || logical == 'logical7') {
				if(factorValType === 'INPUT' || factorValType === 'INT') {
					var arr = factorVal.split(",");
					factorVal = "";
					$.each(arr, function(idx, obj){
						if(isNaN(obj*1)) {
							factorVal += "\""+ obj +"\"";
						} else {
							factorVal += obj;
						}
						
						if(idx != arr.length-1) {
							factorVal += ", ";
						}
					});
					
					factorVal = "(" + factorVal + ")";
					
				} else {
					factorVal = "";
					
					for(var i=0; i<factorVal_Tag.length; i++) {
						factorVal += (factorValType == 'INT' ? factorVal_Tag.eq(i).val() : "\""+ factorVal_Tag.eq(i).val() +"\"") 
						+ (i+1 == factorVal_Tag.length ? "" : ", ");
					}
					
					factorVal = "(" + factorVal + ")";
				}
				
				// 논리연산 IN, NOT IN 이 아닌 값을 선택시
			} else {
				if(!(factorValType === 'INPUT' || factorValType === 'INT')) {
					if(factorVal_Tag.length > 1) {
						messagePop("warning", "요소값 체크","상세 속성을 한 가지만 선택하세요.","");
						return;
					}
					
					factorVal = (factorValType == 'INT' ? factorVal_Tag.eq(0).val() : "\""+ factorVal_Tag.eq(0).val() +"\"");
					
				} else {
					if(isNaN(factorVal*1)) {
						factorVal = "\"" + factorVal + "\"";
					}
				}
			}
		}
		
		var ruleAttr_txt = "";
		var ruleAttr_source = "";
			
		// FUNCTION 일 경우
		if(factorValType === "ARGS") {
			var pTmp = "";
			
			for(var idx=0; idx<factorVal_Tag.length; idx++) {
				var dataType = factorVal_Tag.eq(idx).attr("data-dataType");
				var paramVal = factorVal_Tag.eq(idx).val();
				
				if(dataType == 'int') {
					pTmp += (idx == factorVal_Tag.length-1 ? paramVal : paramVal + ", ");
					
				} else {
					pTmp += (idx == factorVal_Tag.length-1 ? "\"" + paramVal + "\"" : "\"" + paramVal + "\", ");
				}
			}
			
			// RULE 속성 부분에 표시될 형식
			ruleAttr_txt = factorNmEn + "(" + pTmp + ") == " + factorVal;
			// DRL 파일에 저장될 소스
			ruleAttr_source = "eval("+ factorNmEn.toLowerCase() +"(" + pTmp + ") == " + factorVal + ")";
			
		// RULE 일 경우
		} else {
			// RULE 속성 부분에 표시될 형식
			ruleAttr_txt = "["+ factorGrpNm + " : " + factorNm + "] " + logical_txt + factorVal;	
			// DRL 파일에 저장될 소스
			ruleAttr_source = "this[\""+ factorNmEn +"\"]" + logical_txt + factorVal;
		}
		
		var $minus = $("#ruleAttrData ._ruleAttrMinus");
		if($minus.eq($minus.length-1).siblings("span").text() == "(") {
			ruleAttr_txt = "( " + ruleAttr_txt;
			ruleAttr_source = "( " + ruleAttr_source;
			$minus.eq($minus.length-1).siblings("span").text(ruleAttr_txt);
			
		} else {
			var html = "";
			html += "<div class='alert fade show mg_b10' role='alert'>";
			html += "	<button type='button' class='btn-del _ruleAttrMinus' data-bs-dismiss='alert' aria-label='Close'></button>";
			html += "	<span>"+ ruleAttr_txt +"</span>";
			html += "</div>";
			
			$("#ruleAttrData").append(html);
		}
		
		tmpObj = {};
		tmpObj.factorGrpNm = factorGrpNm;
		tmpObj.factorId = factorId;
		tmpObj.factorNm = factorNm;
		tmpObj.factorNmEn = factorNmEn;
		tmpObj.factorVal = factorVal;
		tmpObj.factorValType = factorValType;
		tmpObj.logical = logical;
		tmpObj.logical_txt = logical_txt;
		tmpObj.relation = "";
		tmpObj.relation_txt = "";
		tmpObj.ruleAttr_txt = ruleAttr_txt;
		tmpObj.ruleAttr_source = ruleAttr_source;
		
		tmpArr.push(tmpObj);
	});
	
	// 패키지관리 > RULE EDITOR > 관계연산 추가 버튼
	$("#addValBtn2").click(function() {
		var relation = $("input[name='relationRadios']:checked").val();
		var relation_txt = $("input[name='relationRadios']:checked").next().text();
		var $minus = $("#ruleAttrData ._ruleAttrMinus");
		
		if(tmpArr.length > 0) {
			tmpObj = cloneObj(tmpArr[tmpArr.length-1]);
			
		} else {
			tmpObj = {};
		}
		
		// 좌괄호 일때
		if(relation == "relation3") {
			var html = "";
			html += "<div class='alert fade show mg_b10' role='alert'>";
			html += "	<button type='button' class='btn-del _ruleAttrMinus' data-bs-dismiss='alert' aria-label='Close'></button>";
			html += "	<span>(</span>";
			html += "</div>";
				
			$("#ruleAttrData").append(html);
			
		// 우괄호 일때
		} else if(relation == "relation4") {
			if(tmpArr.length > 0) {
				tmpObj.ruleAttr_txt = tmpObj.ruleAttr_txt + ")";
				tmpObj.ruleAttr_source = tmpObj.ruleAttr_source + ")";
				$minus.eq($minus.length-1).siblings("span").text(tmpObj.ruleAttr_txt);
			}
			
		// AND / OR 일경우
		} else if(relation == "relation1" || relation == 'relation2') {
			if(tmpArr.length > 0 && $minus.eq($minus.length-1).siblings("span").text() != '(') {
				tmpObj.ruleAttr_txt = tmpObj.ruleAttr_txt + " " + relation_txt;
				
				if(relation_txt == "AND") {
					relation_txt = "&&";

				} else if(relation_txt == 'OR') {
					relation_txt = "||";
					
				} else {
					relation_txt = "";
				}
				
				tmpObj.relation = relation;
				tmpObj.relation_txt = relation_txt;
				
				tmpObj.ruleAttr_source = tmpObj.ruleAttr_source + " " + relation_txt;
				$minus.eq($minus.length-1).siblings("span").text(tmpObj.ruleAttr_txt);
			}
		}
		
		if(!(relation == "relation4" || relation == "relation3" || Object.keys(tmpObj).length < 1)) {
			tmpObj.ruleAttr_txt = tmpObj.ruleAttr_txt + "\n";
			tmpObj.ruleAttr_source = tmpObj.ruleAttr_source + "\n";
		}
		
		if(tmpArr.length > 0) {
			tmpArr[tmpArr.length-1] = tmpObj;
		}
	});
	
	// Rule 속성 minus 버튼 클릭 이벤트
	$(document).on("click", "#ruleAttrData ._ruleAttrMinus", function() {
		var delIdx = $("#ruleAttrData ._ruleAttrMinus").index(this);
	
		tmpArr.splice(delIdx, 1);
		
		$(this).closest("label").remove();
		
		tmpObj = {};
	});
	
	// RULE 상세 > RULE EDITOR 팝업 > 적용 버튼 클릭
	$("#ruleEditorSave").click(function() {
		if(tmpArr.length < 1) {
			messagePop("warning", "RULE 속성을 추가하세요.", "", "");
			return;
		}
		
		// RULE 속성 정합성 체크
		for(var i=0; i<tmpArr.length; i++) {
			if(i < tmpArr.length-1) {
				if(tmpArr[i].relation_txt === '') {
					messagePop("warning", "RULE 속성 정의가 올바르지 않습니다.", "", "");
					return;
				}
				
			} else {
				if(tmpArr[i].relation_txt != '') {
					messagePop("warning", "RULE 속성 정의가 올바르지 않습니다.", "", "");
					return;
				}
			}
		}
		
		ruleObjArr = cloneArr(tmpArr);
		
		var contents = ""
		$.each(ruleObjArr, function(idx, ruleObj) {
			contents += ruleObj.ruleAttr_txt;
		});
		
		$("#ruleWhenCont").val(contents);
		close_layerPop('modal_ruleEditor');
		initRuleEditor();
	});
	
	// RULE 상세 > RULE EDITOR 취소버튼
	$("#ruleEditorCancel").click(function() {
		tmpArr = cloneArr(ruleObjArr);
		
		var contents = "";
		$.each(ruleObjArr, function(idx, ruleObj) {
			contents += ruleObj.ruleAttr_txt;
		});
		
		$("#ruleWhenCont").val(contents);
		close_layerPop('modal_ruleEditor');;
	});
	
	// RULE 리스트 페이지 번호 클릭
	$("#ruleListPaging").on("click", "._paging", function(e) {
		var cls = $(this).attr("class");
		const pageNum = $(this).attr("data-page_num");
		
		var searchObj = {};
		searchObj.pkgId = $("#ruleSearchBtn").attr("data-pkgId");
		searchObj.ruleId_search = $("#ruleId_search").val();
		searchObj.ruleRegUsrId_search = $("#ruleRegUsrId_search").val();
		searchObj.ruleNm_search = $("#ruleNm_search").val();
		searchObj.currentPage = 1;
		
		getRuleList(searchObj);
	});
	
	// RULE 상세 > 저장 버튼 클릭
	$("#saveRuleBtn").click(function() {
		 fnSaveRule();
	})
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
 * Factor Group List 조회 후 트리 생성
 * @returns
 */
function fngetFactorListTree() {
	var param = {};
	
	$.ajax({
		method : "POST",
		url : "/targetai/getFactorList.do",
		traditional: true,
		data : JSON.stringify(param),
		contentType:'application/json; charset=utf-8',
		dataType : "json",
		success : function(res) {
			var factorList = res.factorList;
			var factorArr = [];
			
			$.each(factorList, function(idx, factor) {
				var factorObj = {};
				factorObj.id = factor.FACTOR_ID;
				factorObj.pId = factor.PID;
				factorObj.name = factor.FACTOR_NM;
				factorObj.name_en = factor.FACTOR_NM_EN;
				if(factor.FACTOR_TYPE == 'GROUP') {
					factorObj.isParent = true;
					factorObj.open = false;
				}
				
				factorArr.push(factorObj);
			});
			
			// zTree 설정 
			var setting = {
				data: {
					simpleData: {
						enable: true
					}
				},
				callback: {
					onClick: getFactorVal
				}
			};
			
			// zTree 초기화 후 생성
			$.fn.zTree.init($("#factorTree"), setting, factorArr);
			$("#factorVal").html("");
			$("#changeInputBtn").css("display", "none");
			
		},
		beforeSend : function() {
			$("#factorTreeLoading").show();
		},
		complete : function() {
			$("#factorTreeLoading").hide();
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
 * Factor Value 조회
 * @param factorValObj
 * @returns
 */
function getFactorVal(event, treeId, treeNode) {
	if(treeNode.isParent) {
		return;
	}
	
	var factorObj = {
		factorId : treeNode.id,
	};
	
	$.ajax({
		method : "POST",
		url : "/targetai/getFactorVal.do",
		traditional: true,
		data : JSON.stringify(factorObj),
		contentType:'application/json; charset=utf-8',
		dataType : "json",
		success : function(res) {
			var factor = res.factor;
			var factorVal = res.factorVal;
			var dataType = factor.DATA_TYPE;
			var html = "";
			
			if(dataType === 'DATE') {
				html += '<input type="text" id="factorDatePicker" name="detAttrChk" class="date" value="" />';
				$("#factorVal").html(html);
				$("#changeInputBtn").hide();
				
				$('#factorDatePicker').datepicker({
					inline: true,
					dateFormat: 'yy-mm-dd',
					monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
					dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
					changeMonth: true, // 월변경가능
					changeYear: true, // 년변경가능
					showMonthAfterYear: true, //년 뒤에 월표시
					showOtherMonths: true,
					/*
					showOn: "both", //버튼이미지 사용
					buttonText: "show date",
					buttonImage: "../../comn/images/common/bg_date.png",
					buttonImageOnly: true,
					*/
				});
				
			} else if(dataType === 'INT') {
				html += '<input type="text" class="wd250px" name="detAttrChk" value="" placeholder="숫자만 입력가능합니다" />';
				$("#factorVal").html(html);
				$("#changeInputBtn").hide();
				
			} else if(dataType === 'STRING') {
				$.each(factorVal, function(idx, factor){
					html += "<input type='checkbox' name='detAttrChk' value='"+ factor.VAL +"'/>";
					html += "<label for='detAttrChk' class='mg_l10'>"+ factor.VAL +"</label>";
					html += "<br />";
				});
				$("#factorVal").html(html);
				$("#changeInputBtn").show();
				
			} else if(dataType == 'ARGS') {
				$.each(factorVal, function(idx, func){
					html += "<label for='' class='mg_r10'>"+ func.ARG_NM +"</label>";
					html += "<input type='text' class='wd250px' name='detAttrChk' data-dataType='"+ func.DATA_TYPE +"' value=''/>";
					html += "<br />";
				});
				
				html += "<label for='' class='mg_r10'>결과 </label>";
				html += "<input type='radio' name='detAttrChk' id='' value='true' checked><label for='' class='mg_r10'>&nbsp;true </label>";
				html += "<input type='radio' name='detAttrChk' id='' value='false'><label for='' class='mg_r10'>&nbsp;false </label>";
				
				$("#factorVal").html(html);
				$("#changeInputBtn").hide();
			}
			
			$("#factorVal").attr("data-type", dataType);
			$("#factorVal").show();
			$("#factorVal_direct").hide();
		},
		beforeSend : function() {
			$("#factorTreeLoading").show();
		},
		complete : function() {
			$("#factorTreeLoading").hide();
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
 * RULE 상세 > RULE 저장
 * @returns
 */
function fnSaveRule() {
	var param = {};
	param.ruleId = $("#ruleId").text();
	
	$.ajax({
		method : "POST",
		url : "/targetai/ruleSave.do",
		traditional: true,
		data : JSON.stringify(param),
		contentType:'application/json; charset=utf-8',
		dataType : "json",
		success : function(res) {
			messagePop("success", "RULE 저장 했습니다.", "", "");
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
 * RULE 상세 초기화
 * @returns
 */
function initRuleDetail() {
	$("#ruleId").text("");
	$("#ruleNm").val("");
	$("#ruleNmDupBtn").data("isDup", "N");
	$("#ruleDupY").css("display", "none");
	$("#ruleDupN").css("display", "none");
	$("input:radio[name='noLoop']:radio[value='true']").prop("checked", true);
	$("input:radio[name='lockOnActive']:radio[value='true']").prop("checked", true);
	$("#salience").val("");
	$("#ruleWhenCont").val("");
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