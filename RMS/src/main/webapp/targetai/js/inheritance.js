/**
 * Inheritance (RULE 상속 정보)
 * @author 박주윤 차장
 * @since 2022.01.06
 */

var ruleObj = {};
var ruleObjArr = [];
var tmpObj = {};
var tmpArr = [];

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
		initRuleEditor();
		$("#modal_serialize").show();
		
		var param = {};
		param.masterRuleId = $(this).attr("data-mri");
		param.masterRuleRealVer = $(this).attr("data-mrrv");
		param.slaveRuleId = $(this).attr("data-sri");
		param.slaveRuleVer = $(this).attr("data-srv");
		param.masterRuleVer = $(this).attr("data-mrv");
		
		fnGetSerializeInfo(param);
		fngetFactorListTree("factorTree");	// RULE EDITOR 트리 생성
	});
	
	// RULE EDITOR > ADD VALUE 버튼 클릭
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
					var pattern_obj = /^#\{(.*?)\}$/;
					
					if(pattern_obj.test(paramVal)) {
						pTmp += (idx == factorVal_Tag.length-1 ? paramVal : paramVal + ", ");
						
					} else {
						pTmp += (idx == factorVal_Tag.length-1 ? "\"" + paramVal + "\"" : "\"" + paramVal + "\", ");
					}
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
		
		if(tmpArr.length > 0) {
			tmpArr[tmpArr.length-1] = tmpObj;
		}
	});
	
	// 현행화처리 팝업 > RULE 선택 버튼
	$("._ruleSelectBtn").click(function() {
		var param = {};
		param.ruleId = $(this).attr("data-ruleId");
		param.ruleVer = $(this).attr("data-ruleVer");
		
		$.ajax({
			method : "POST",
			url : "/targetai/getRule.do",
			traditional: true,
			data : JSON.stringify(param),
			contentType:'application/json; charset=utf-8',
			dataType : "json",
			success : function(res) {
				var rule = res.rule;
				// -- RULE 속성 객체 세팅 --
				ruleObjArr = [];
				var ruleAttr = "";
				var ruleAttrKor = "";
				var ruleHtml = "";
				var ruleTestHtml = "< RULE 명 : "+ rule.RULE_NM +" >\n\n"; // 단위테스트 변수
				
				var ruleAttrList = rule.RULE_WHEN.split("\n");
				var ruleAttrKorList = rule.RULE_WHEN_KOR.split("\n");
				var funcNmList = [];
				
				if(typeof rule.FUNC_NMS != 'undefined') {
					funcNmList = rule.FUNC_NMS.split(",");
				}
				
				for(var i=0; i<ruleAttrList.length; i++) {
					ruleObj = {};
					
					if(i < ruleAttrList.length - 1) {
						ruleAttrKor += ruleAttrKorList[i] + "\n";
						ruleAttr += ruleAttrList[i] + "\n";
						
					} else {
						ruleAttrKor += ruleAttrKorList[i];
						ruleAttr += ruleAttrList[i];
					}
					
					ruleHtml += "<div class='alert fade show mg_b10' role='alert'>";
					ruleHtml += "	<button type='button' class='btn-del _ruleAttrMinus' data-bs-dismiss='alert' aria-label='Close'></button>";
					ruleHtml += 		"<span>" + ruleAttrKorList[i] + "</span>";
					ruleHtml += "</div>";
					
					ruleTestHtml += "	" + ruleAttrKorList[i] + "\n";
					
					ruleObj.ruleAttr_txt = ruleAttrKorList[i];
					ruleObj.ruleAttr_source = ruleAttrList[i];
					
					if(ruleAttrList[i].startsWith("eval")) {
						ruleObj.factorNmEn = funcNmList.shift();
						ruleObj.factorGrpNm = "함수";
					}
					
					ruleObjArr.push(ruleObj);
				}
				
				$("#ruleAttrData").html(ruleHtml);
				$("#ruleWhenCont").val(ruleAttrKor);
				
				tmpArr = cloneArr(ruleObjArr);	// 취소시 되돌리기 위한 변수에도 초기값 세팅
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
	});
	
	// Rule 속성 minus 버튼 클릭 이벤트
	$(document).on("click", "#ruleAttrData ._ruleAttrMinus", function() {
		var delIdx = $("#ruleAttrData ._ruleAttrMinus").index(this);
	
		tmpArr.splice(delIdx, 1);
		
		$(this).closest("label").remove();
		
		tmpObj = {};
	});
	
	// 현행화 처리 팝업 > 현행화 버튼 클릭
	$("#serializeBtn").click(function() {
		if(confirm("선택한 슬레이브 RULE을 현행화 하시겠습니까?")) {
			if(tmpArr.length < 1) {
				messagePop("warning", "RULE 속성을 추가하세요.", "", "");
				return;
			}
		
			ruleObjArr = cloneArr(tmpArr);
			
			var param = {};
			param.ruleId = $(this).attr("data-ruleId");
			param.ruleVer = $(this).attr("data-ruleVer");
			param.masterRuleId = $(this).attr("data-masterRuleId");
			param.masterRuleVer = $(this).attr("data-masterRuleVer");
			param.masterRuleRealVer = $(this).attr("data-masterRuleRealVer");
			param.ruleObjArr = ruleObjArr;
			
			fnSerialize(param);
		}
	});
});

/**
 * 현행화 처리
 * @param param
 * @returns
 */
function fnSerialize(param) {
	$.ajax({
		method : "POST",
		url : "/targetai/serialize.do",
		traditional: true,
		data : JSON.stringify(param),
		contentType:'application/json; charset=utf-8',
		dataType : "json",
		success : function(res) {
			messagePop("success", "현행화 되었습니다.", "", "");
			$("#modal_serialize").hide();
			
			var searchObj = {};
			searchObj.currentPage = 1;
			
			// RULE 상속정보 목록 조회
			fnGetIhList(searchObj);
			
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
 * Factor Group List 조회 후 트리 생성
 * @returns
 */
function fngetFactorListTree(elementId) {
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
					html += "<div>";
					html += "	<span for='' class='mg_r10 factorValSpanTitle'>"+ func.ARG_NM +"("+ func.DATA_TYPE +")</span>";
					html += "</div>";
					html += "<div>";
					if(func.DATA_TYPE != 'Object') {
						html += "	<input type='text' class='wd250px' name='detAttrChk' data-idx='"+ idx +"' data-dataType='"+ func.DATA_TYPE +"' value=''/>";
						html += "	<button type='button' class='btn btn-sm btn-green _selectValueBtn' data-dataType='"+ func.DATA_TYPE +"'>";
						html += "		<i class='far fa-check-circle custom-btn-i'></i> 값 선택";
						html += "	</button>";
						
					} else {
						html += "	<input type='text' class='wd250px' name='detAttrChk' data-idx='"+ idx +"' data-dataType='"+ func.DATA_TYPE +"' value='#{"+ func.ARG_NM +"}' readonly='readonly'/>";
					}
					
					html += "</div>";
				});
				
				html += "<br/>";
				html += "<span for='' class='mg_r10 factorValSpanTitle'>결과 </span>";
				html += "<input type='radio' name='detAttrChk' id='' value='true' checked><label for='' class='mg_r10'>&nbsp;true </label>";
				html += "<input type='radio' name='detAttrChk' id='' value='false'><label for='' class='mg_r10'>&nbsp;false </label>";
				
				$("#factorVal").html(html);
				$("#changeInputBtn").hide();
			}
			
			$("#factorVal").attr("data-type", dataType);
			$("#factorVal").show();
			
			$("#factorVal_direct").val("");
			if(factorVal.length > 0) {
				$("#factorVal_direct").hide();
				
			} else {
				$("#factorVal").html("<input type='text' id='factorVal_direct' value='' placeholder='요소값을 입력하세요.'>");
				$("#factorVal").attr("data-type", "INPUT");
			}
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
 * 
 * @param param
 * @returns
 */
function fnGetSerializeInfo(param) {
	$.ajax({
		method : "POST",
		url : "/targetai/getSerializeInfo.do",
		traditional: true,
		data : JSON.stringify(param),
		contentType:'application/json; charset=utf-8',
		dataType : "json",
		success : function(res) {
			var masterRule = res.masterRule;
			var realMasterRule = res.realMasterRule;
			var slaveRule = res.slaveRule;
			
			$("#masterRuleIdVer").text(" (" + param.masterRuleId + "_v" + param.masterRuleVer + ")");
			$("#masterRuleArea").text(masterRule.RULE_WHEN_KOR);
			$("#masterRuleArea").parent(".card-body").find("._ruleSelectBtn").attr("data-ruleId", param.masterRuleId);
			$("#masterRuleArea").parent(".card-body").find("._ruleSelectBtn").attr("data-ruleVer", param.masterRuleVer);
			
			$("#slaveRuleIdVer").text(" (" + param.slaveRuleId + "_v" + param.slaveRuleVer + ")");
			$("#slaveRuleArea").text(realMasterRule.RULE_WHEN_KOR);
			$("#slaveRuleArea").parent(".card-body").find("._ruleSelectBtn").attr("data-ruleId", param.slaveRuleId);
			$("#slaveRuleArea").parent(".card-body").find("._ruleSelectBtn").attr("data-ruleVer", param.slaveRuleVer);
			$("#serializeBtn").attr("data-ruleId", param.slaveRuleId);
			$("#serializeBtn").attr("data-ruleVer", param.slaveRuleVer);
			$("#serializeBtn").attr("data-masterRuleId", param.masterRuleId);
			$("#serializeBtn").attr("data-masterRuleVer", param.masterRuleVer);
			$("#serializeBtn").attr("data-masterRuleRealVer", param.masterRuleRealVer);
			
			$("#realMasterRuleIdVer").text(" (" + param.masterRuleId + "_v" + param.masterRuleRealVer + ")");
			$("#realMasterRuleArea").text(slaveRule.RULE_WHEN_KOR);
			$("#realMasterRuleArea").parent(".card-body").find("._ruleSelectBtn").attr("data-ruleId", param.masterRuleId);
			$("#realMasterRuleArea").parent(".card-body").find("._ruleSelectBtn").attr("data-ruleVer", param.masterRuleRealVer);
		},
		beforeSend : function() {
			$("#modal_serializeLoading").show();
		},
		complete : function() {
			$("#modal_serializeLoading").hide();
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
						html += "	<button type='button' class='btn btn-sm btn-green _serializeBtn' data-mri='"+ ih.MASTER_RULE_ID +"' data-mrrv='"+ ih.MASTER_RULE_REAL_VER +"' data-sri='"+ ih.SLAVE_RULE_ID +"' data-srv='"+ ih.SLAVE_RULE_VER +"' data-mrv='"+ ih.MASTER_RULE_VER +"'>";
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

/**
 * 현행화처리 초기화
 * @returns
 */
function initRuleEditor() {
	ruleObj = {};
	ruleObjArr = [];
	tmpObj = {};
	tmpArr = [];
	
	$("#masterRuleArea").text("");
	$("#realMasterRuleArea").text("");
	$("#slaveRuleArea").text("");
	
	$("#ruleAttrData").html("");
	$("#factorVal").html("");
	$("#changeInputBtn").css("display", "none");
	$("#logicalRadio1").prop("checked", true);
	$("#relationRadio1").prop("checked", true);
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

