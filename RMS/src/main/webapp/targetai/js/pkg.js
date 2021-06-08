/**
 * package 관리
 * @author 박주윤 차장
 * @since 2021.05.25
 */

$(document).ready(function() {
	
	// 패키지 리스트 조회
	var searchObj = {};
	getPkgList(searchObj);
	
	// 패키지 검색 > 조회 버튼 클릭
	$("#pkgSearchBtn").click(function() {
		var searchObj = {};
		searchObj.pkgId_search = $("#pkgId_search").val();
		searchObj.pkgActYn_search = $("#pkgActYn_search option:selected").val();
		searchObj.regUsrId_search = $("#pkgRegUsrId_search").val();
		searchObj.pkgNm_search = $("#pkgNm_search").val();
		
		getPkgList(searchObj);
	});
	
	// 패키지 목록 > 패키지명 링크 클릭
	$(document).on("click", "._pkgNmLink", function(e) {
		e.preventDefault();	// a링크 클릭이벤트 제거
		var param = {};
		param.pkgId = $(this).attr("data-pkgId");
		
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
				$("#ruleCntInPkg").text(pkg.RULE_COUNT_IN_PKG + "개");
				$("#pkgDsc").val(pkg.PKG_DSC);
				$("#pkgActYn").val(pkg.PKG_ACT_YN);
				$("#pkgRegDt").text(pkg.REG_DT + "에 " + pkg.REG_USRID + "(님)이 등록함.");
				if(typeof pkg.UDT_USRID == 'undefined') {
					$("#pkgUdtDt").text("수정 이력이 없습니다.");
				} else {
					$("#pkgUdtDt").text(pkg.UDT_DT + "에 " + pkg.UDT_USRID + "(님)이 수정함.");
				}
				
				$("#ruleSearchBtn").attr("data-pkgId", pkg.PKG_ID);
				
				var searchObj = {};
				searchObj.pkgId = pkg.PKG_ID;
				getRuleList(searchObj);
				
				$("#ruleEditorPopUp").css("display", "none");
				$("#pkgCard").removeClass("card-collapsed");
				$("#pkgCardBody").css("display", "");
				
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
	});
	
	// 패키지 목록 > DRL 파일명 클릭
	$(document).on("click", "._drlNmLink", function(e) {
		e.preventDefault();	// a링크 클릭이벤트 제거
		var param = {};
		param.pkgId = $(this).attr("data-pkgId");
		
		$.ajax({
			method : "POST",
			url : "/targetai/getPkg.do",
			traditional: true,
			data : JSON.stringify(param),
			contentType:'application/json; charset=utf-8',
			dataType : "json",
			success : function(res) {
				var pkg = res.pkg;

				if(typeof pkg.DRL_SOURCE == 'undefined') {
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
	});
	
	// 신규 PKG 생성 버튼
	$("#addNewPkgBtn").click(function() {
		// PKG 관련 초기화
		initPkgDetail();	// PKG 상세 초기화
		
		$("#ruleEditorPopUp").css("display", "none");
		$("#pkgCard").removeClass("card-collapsed");
		$("#pkgCardBody").css("display", "");
		$("#pkgNm").focus();
		
		// RULE 관련 초기화
		ruleObjArr = [];
		ruleObj = {};
		initRuleDetail();	// RULE 상세 초기화
		initRuleEditor();	// RULE EDITOR 초기화
		
		$("#ruleEditorPopUp").css("display", "none");	// RULE EDITOR 팝업 버튼 사라짐
		$("#ruleCard").addClass("card-collapsed");	// RULE 상세 닫기
		$("#ruleCardBody").css("display", "none");	// RULE 상세 닫기
		$("#ruleListCard").addClass("card-collapsed");	// RULE 목록 닫기
		$("#ruleListCardBody").css("display", "none");	// RULE 목록 닫기
		$("#ruleCntInPkgBySearch").text("");	// RULE 목록 건수 초기화
	});
	
	// PKG 상세 > PKG 명 변경시 중복체크  요청
	$("#pkgNm").change(function() {
		$("#pkgDupY").hide();
		$("#pkgNmDupBtn").data("isDup", "N");
	});
	
	// PKG 상세 > 중복체크 버튼 클릭
	$("#pkgNmDupBtn").click(function(){
		var pkgNm = $("#pkgNm").val();
		
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
					$("#pkgNmDupBtn").data("isDup", "N");
					$("#pkgNm").focus();
					return;
				}
				
				$("#pkgDupY").css("display", "");
				$("#pkgDupN").css("display", "none");
				$("#pkgNmDupBtn").data("isDup", "Y");
			}
		});
	});
	
	// 신규 패키지 생성 > PKG 상세 > 저장 버튼
	$("#savePkgBtn").click(function() {
		// PKG 명 중복 체크
		var isDup = $("#pkgNmDupBtn").data("isDup");
		if(isDup != 'Y') {
			messagePop("warning", "Package 명 중복체크", "Package 명 중복체크를 먼저 해주세요.", "#pkgNm");
			return;
		}
		
		if(confirm("변경사항을 저장하시겠습니까?")) {
			var param = {};
			param.pkgNm = $("#pkgNm").val();
			param.pkgActYn = $("#pkgActYn").val();
			param.pkgDsc = $("#pkgDsc").val();
			
			fnPkgSave(param);
		}
	});
	
	// RULE 검색 > 조회 버튼 클릭
	$("#ruleSearchBtn").click(function() {
		var searchObj = {};
		searchObj.pkgId = $(this).attr("data-pkgId");
		searchObj.ruleId_search = $("#ruleId_search").val();
		searchObj.regUsrId_search = $("#ruleRegUsrId_search").val();
		searchObj.ruleNm_search = $("#ruleNm_search").val();
		
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
				$("#ruleId").text(rule.RULE_ID);
				$("#ruleNm").val(rule.RULE_NM);
				$("input:radio[name='noLoop']:radio[value='"+ rule.NO_LOOP +"']").prop("checked", true);
				$("input:radio[name='lockOnActive']:radio[value='"+ rule.LOCK_ON_ACTIVE +"']").prop("checked", true);
				$("#salience").val(rule.SALIENCE);
				$("#ruleWhenCont").val(rule.ATTR_WHEN_CONTENTS);
				
				$("#ruleEditorPopUp").attr("data-ruleId", rule.RULE_ID);
				$("#ruleEditorPopUp").css("display", "");
				$("#ruleCard").removeClass("card-collapsed");
				$("#ruleCardBody").css("display", "");
				$("#ruleNm").focus();
				initRuleEditor();				
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
	
	// RULE 상세 > RULE EDITOR 버튼 클릭
	$("#ruleEditorPopUp").click(function() {
		// ruleObjArr 안에 저장된 RULE 속성이 있다면 표시
		var html = "";
		
		$.each(ruleObjArr, function(idx, ruleObj) {
			html += "<div class='alert fade show mg_b10' role='alert'>";
			html += "	<button type='button' class='btn-del _ruleAttrMinus' data-bs-dismiss='alert' aria-label='Close'></button>";
			html += 		ruleObj.ruleAttr_txt;
			html += "</div>";
		});
		$("#ruleAttrData").append(html);
		
		treeFactorGrpList();
	});
	
	// RULE 상세 > RULE EDITOR 취소버튼
	$("#ruleEditorCancel").click(function() {
		if(confirm("작성한 RULE 속성이 초기화 됩니다. 취소하시겠습니까?")) {
			// RULE EDITOR 팝업 닫기
			close_layerPop('modalID_1');
			initRuleEditor();
			ruleObjArr = [];
			ruleObj = {};
			$("#ruleWhenCont").val("");
		}
	});
	
	// RULE EDITOR 팝업 X버튼 클릭
	$("#modalID_1 .close").click(function() {
		if(confirm("작성한 RULE 속성이 초기화 됩니다. 취소하시겠습니까?")) {
			// RULE EDITOR 팝업 닫기
			close_layerPop('modalID_1');
			initRuleEditor();
			ruleObjArr = [];
			ruleObj = {};
			$("#ruleWhenCont").val("");
		}
	});
	
	// RULE 목록 > 신규 RULE 생성 버튼 클릭
	$("#addNewRuleBtn").click(function() {
		ruleObjArr = [];
		ruleObj = {};
		initRuleDetail();	// RULE 상세 초기화
		initRuleEditor();	// RULE EDITOR 초기화
		
		$("#ruleEditorPopUp").css("display", "");
		$("#ruleCard").removeClass("card-collapsed");
		$("#ruleCardBody").css("display", "");
		$("#ruleNm").focus();
	});
	
	// RULE 명 변경시 중복체크  요청
	$("#ruleNm").change(function() {
		$("#ruleDupY").hide();
		$("#ruleNmDupBtn").data("isDup", "N");
	});
	
	// RULE 상세 > 저장 버튼 클릭
	$("#saveRuleBtn").click(function() {
		// RULE 명 중복 체크
		var isDup = $("#ruleNmDupBtn").data("isDup");
		if(isDup != 'Y') {
			messagePop("warning", "RULE 명 중복체크", "RULE 명 중복체크를 먼저 해주세요.", "#ruleNm");
			return;
		}
		
		// SALIENCE 체크
		var salience = $("#salience").val();
		var pattern_num = /^[0-9]+$/;
		if(salience == '') {
			messagePop("warning", "SALIENCE 공백체크", "SALIENCE 값을 입력하세요.", "#salience");
			return;
		}
		
		if(!pattern_num.test(salience)) {
			messagePop("warning", "SALIENCE 정합성 체크", "SALIENCE 값은 숫자만 입력할 수 있습니다.", "#salience");
			return;
		}
		
		// CONTENTS 체크
		var contents = $("#ruleWhenCont").val();
		if(contents == '')  {
			messagePop("warning", "CONTENTS 생성 체크", "RULE EDITOR를 통해 CONTENTS를 생성하세요.", "");
			return;
		}
		
		if(confirm("변경사항을 저장하시겠습니까?")) {
			var param = {};
			param.pkgId = $("#ruleSearchBtn").attr("data-pkgId");
			param.ruleNm = $("#ruleNm").val();
			param.noLoop = $("input[name='noLoop']:checked").val();
			param.lockOnActive = $("input[name='noLoop']:checked").val();
			param.salience = $("#salience").val();
			param.ruleObjArr = ruleObjArr;
			
			fnRuleSave(param);
			ruleObj = {};
			ruleObjArr = [];
		}
	});
	
	// RULE 상세 > 중복체크 버튼 클릭
	$("#ruleNmDupBtn").click(function(){
		var ruleNm = $("#ruleNm").val();
		
		if(ruleNm == '') {
			messagePop("warning", "RULE 명 공백체크.", "RULE 명을 입력하세요.", "#ruleNm");
			return;
		}
		
		var param = {};
		param.ruleNm = ruleNm;
		param.pkgId = $("#pkgId").text();
		
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
	
	// RULE 상세 > RULE EDITOR > ADD VALUE 버튼 클릭
	var ruleObj = {};
	var ruleObjArr = [];
	
	$("#addValBtn").click(function() {
		var treeObj = $.fn.zTree.getZTreeObj("factorTree");
		var node = treeObj.getSelectedNodes()[0];
		
		if(typeof node === "undefined" || node.isParent) {
			messagePop("warning", "요소값 체크","요소값을 입력 후 추가하세요","");
			return;
		}
		
		// 관계연산 NONE 뒤에 추가 할 수 없음.
		if(ruleObjArr.length > 0) {
			if(ruleObjArr[ruleObjArr.length-1].relation_txt == "") {
				messagePop("warning", "속성추가 체크", "관계연산이 끝난 Rule 속성 이후 추가 할 수 없습니다.", "");
				return;
			}
		}
		
		ruleObj = {};
		ruleObj.factorGrpNm = node.getParentNode().name;
		ruleObj.factorId = node.id;
		ruleObj.factorNm = node.name;
		ruleObj.factorNmEn = node.name_en;
		ruleObj.factorValType = $("#factorVal").attr("data-type");
		
		ruleObj.logical = $("input[name='logicalRadios']:checked").val();
		ruleObj.logical_txt = $("input[name='logicalRadios']:checked").next().text();
		ruleObj.relation = $("input[name='relationRadios']:checked").val();
		ruleObj.relation_txt = $("input[name='relationRadios']:checked").next().text();
		
		// RULE 속성 추가시 제약조건 체크
		var factorVal_Tag = "";
		
		// 요소 값 입력 여부 체크
		if(ruleObj.factorValType === "STRING") {
			ruleObj.factorVal = $("#factorVal_string>input:checked").val();
			factorVal_Tag = $("input[name='detAttrChk']:checked");
			
			if(typeof ruleObj.factorVal === "undefined" || ruleObj.factorVal == "") {
				messagePop("warning", "요소값 체크","요소값을 입력 후 추가하세요","");
				return;
			}
			
		} else if(ruleObj.factorValType === "INT") {
			ruleObj.factorVal = $("#factorVal_int>input").val();
			factorVal_Tag = $("#factorVal_int input[name='detAttrChk']");
			
			if(typeof ruleObj.factorVal === "undefined" || ruleObj.factorVal == "") {
				messagePop("warning", "요소값 체크","요소값을 입력 후 추가하세요","");
				return;
			}
			
			// 숫자만 입력했는지 체크
			var pattern_num = /^[0-9]+$/;
			if(!pattern_num.test(ruleObj.factorVal)) {
				messagePop("warning", "요소값 체크","숫자만 입력할 수 있습니다.","");
				return;
			}
			
		} else if(ruleObj.factorValType === "DATE") {
			ruleObj.factorVal = $("#factorVal_date>input").val();
			factorVal_Tag = $("#factorVal_date input[name='detAttrChk']");
			
			if(typeof ruleObj.factorVal === "undefined" || ruleObj.factorVal == "") {
				messagePop("warning", "요소값 체크","요소값을 입력 후 추가하세요","");
				return;
			}
			
		} else {
			messagePop("warning", "요소값 체크","요소값을 선택 후 추가하세요","");
		}
		
		// 논리연산 IN, NOT IN 선택
		if(ruleObj.logical == 'logical6' || ruleObj.logical == 'logical7') {
			var factorVal = "";
			
			for(var i=0; i<factorVal_Tag.length; i++) {
				factorVal += (ruleObj.factorValType == 'INT' ? factorVal_Tag.eq(i).val() : "\""+ factorVal_Tag.eq(i).val() +"\"") 
				+ (i+1 == factorVal_Tag.length ? "" : ", ");
			}
			
			ruleObj.factorVal = factorVal;
			factorVal = "(" + factorVal + ")";
		
		// 논리연산 IN, NOT IN 이 아닌 값을 선택시
		} else {
			if(factorVal_Tag.length > 1) {
				messagePop("warning", "요소값 체크","상세 속성을 한 가지만 선택하세요.","");
				return;
			}
			
			factorVal = (ruleObj.factorValType == 'INT' ? factorVal_Tag.eq(0).val() : "\""+ factorVal_Tag.eq(0).val() +"\"");
		}
		
		if(ruleObj.relation == 'relation3') {
			ruleObj.relation_txt = "";
		}
		
		ruleObj.ruleAttr_txt = "["+ ruleObj.factorGrpNm + " : " + ruleObj.factorNm + "] " + ruleObj.logical_txt + factorVal + " " + ruleObj.relation_txt;			
		
		var html = "";
		html += "<div class='alert fade show mg_b10' role='alert'>";
		html += "	<button type='button' class='btn-del _ruleAttrMinus' data-bs-dismiss='alert' aria-label='Close'></button>";
		html += 		ruleObj.ruleAttr_txt;
		html += "</div>";
		
		$("#ruleAttrData").append(html);
		
		if(ruleObj.relation == 'relation1') {
			ruleObj.relation_txt = "&&"
				
		} else if(ruleObj.relation == 'relation2') {
			ruleObj.relation_txt = "||"
				
		} else {
			ruleObj.relation_txt = "";
		}
		
		// DRL 파일에 저장될 소스
		ruleObj.ruleAttr_source = "this[\""+ ruleObj.factorNmEn +"\"]" + ruleObj.logical_txt + factorVal + " " + ruleObj.relation_txt + "\n";
		
		ruleObjArr.push(ruleObj);
	});
	
	// Rule 속성 minus 버튼 클릭 이벤트
	$(document).on("click", "._ruleAttrMinus", function() {
		var delIdx = $("._ruleAttrMinus").index(this);
	
		ruleObjArr.splice(delIdx, 1);
		
		$(this).closest("label").remove();
		
		ruleObj = {};
	});
	
	// RULE 상세 > RULE EDITOR 팝업 > 적용 버튼 클릭
	$("#ruleEditorSave").click(function() {
		// 관계연산 NONE 으로 끝나야 적용가능
		if(ruleObjArr.length > 0) {
			if(ruleObjArr[ruleObjArr.length-1].relation_txt != "") {
				messagePop("warning", "RULE 적용체크", "관계연산이 끝난 Rule 속성만 추가 할 수 있습니다.", "");
				return;
			}
			
		} else {
			messagePop("warning", "RULE 적용체크", "RULE 속성을 추가하세요.", "");
			return;
		}
		
		var contents = ""
		$.each(ruleObjArr, function(idx, ruleObj) {
			contents += ruleObj.ruleAttr_txt + "\n";
		});
		
		$("#ruleWhenCont").val(contents);
		close_layerPop('modalID_1');
		initRuleEditor();
	});
});

/**
 * Package 리스트 조회
 * @param searchObj
 * @returns
 */
function getPkgList(searchObj) {
	$.ajax({
		method : "POST",
		url : "/targetai/getPkgList.do",
		traditional: true,
		data : JSON.stringify(searchObj),
		contentType:'application/json; charset=utf-8',
		dataType : "json",
		success : function(res) {
			var pkgList = res.pkgList;
			var pkgCount = res.pkgCount;
			
			var html = "";
			
			if(pkgList.length == 0) {
				html += "<tr>";
				html += "	<td colspan='9' class='t_center'>조회된 내용이 없습니다.</td>";
				html += "</tr>";
				
			} else {
				for(var i=0; i<pkgList.length; i++) {
					html += "<tr>";
					html += "	<td class='t_center'>";
					html += "		<div class='checkbox-container'>";
					html += "			<input type='checkbox' id='checkbox_12' />";
					html += "			<label for='checkbox_12'></label>";
					html += "		</div>";
					html += "	</td>";
					html += "	<td class='t_center'>" + pkgList[i].PKG_ID + "</td>";
					html += "	<td class='t_center'><a href='#' class='_pkgNmLink' data-pkgId='"+ pkgList[i].PKG_ID +"'>" + pkgList[i].PKG_NM + "</a></td>";
					html += "	<td class='t_center'><a href='#' class='_drlNmLink' data-pkgId='"+ pkgList[i].PKG_ID +"'>" + pkgList[i].DRL_NM + "</a></td>";
					html += "	<td class='t_center'>" + pkgList[i].PKG_ACT_YN + "</td>";
					html += "	<td class='t_center'>" + (typeof pkgList[i].UDT_DT == 'undefined' ? '-' : pkgList[i].UDT_DT) + "</td>";
					html += "	<td class='t_center'>" + (typeof pkgList[i].UDT_USRID == 'undefined' ? '-' : pkgList[i].UDT_USRID) + "</td>";
					html += "	<td class='t_center'>" + pkgList[i].REG_DT + "</td>";
					html += "	<td class='t_center'>" + pkgList[i].REG_USRID + "</td>";
					html += "</tr>";
				}
			}
			
			$("#pkgList").html(html);
			$("#pkgCountBySearch").text(pkgCount);
			
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
 * PKG 상세 > 저장
 * @param param
 * @returns
 */
function fnPkgSave(param) {
	$.ajax({
		method : "POST",
		url : "/targetai/pkgSave.do",
		traditional: true,
		data : JSON.stringify(param),
		contentType:'application/json; charset=utf-8',
		dataType : "json",
		success : function(res) {
			var searchObj = {};
			searchObj.pkgId_search = $("#pkgId_search").val();
			searchObj.pkgActYn_search = $("#pkgActYn_search option:selected").val();
			searchObj.regUsrId_search = $("#pkgRegUsrId_search").val();
			searchObj.pkgNm_search = $("#pkgNm_search").val();
			
			getPkgList(searchObj);
			
			messagePop("success", "Package가 저장되었습니다.", "", "");
			initPkgDetail();
			$("#pkgCard").addClass("card-collapsed");
			$("#pkgCardBody").css("display", "none");
// --------------------------------------------------------------------------------------------------------------------------------------------------- 여기 봐야함			
			$("#ruleEditorPopUp").css("display", "none");
			$("#ruleCard").addClass("card-collapsed");
			$("#ruleCardBody").css("display", "none");
			initRuleDetail();
			initRuleEditor();
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
 * RULE 리스트 조회
 */
function getRuleList(searchObj) {
	
	if(typeof searchObj.pkgId === 'undefined' || searchObj.pkgId == '') {
		alert("패키지를 먼저 선택하세요.");
		return;
	}
	
	$.ajax({
		method : "POST",
		url : "/targetai/getRuleList.do",
		traditional: true,
		data : JSON.stringify(searchObj),
		contentType:'application/json; charset=utf-8',
		dataType : "json",
		success : function(res) {
			var ruleList = res.ruleList;
			var ruleCount = res.ruleCount;
			
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
					html += "			<input type='checkbox' id='checkbox_12' />";
					html += "			<label for='checkbox_12'></label>";
					html += "		</div>";
					html += "	</td>";
					html += "	<td class='t_center'>" + ruleList[i].RULE_ID + "</td>";
					html += "	<td class='t_center'><a href='#' class='_ruleNmLink' data-ruleId='"+ ruleList[i].RULE_ID +"'>" + ruleList[i].RULE_NM + "</a></td>";
					html += "	<td class='t_center'>" + ruleList[i].SALIENCE + "</td>";
					html += "	<td class='t_center'>" + (typeof ruleList[i].UDT_DT == 'undefined' ? "-" : ruleList[i].UDT_DT) + "</td>";
					html += "	<td class='t_center'>" + (typeof ruleList[i].UDT_USRID == 'undefined' ? "-" : ruleList[i].UDT_DT) + "</td>";
					html += "	<td class='t_center'>" + ruleList[i].REG_DT + "</td>";
					html += "	<td class='t_center'>" + ruleList[i].REG_USRID + "</td>";
					html += "</tr>";
				}
			}
			
			$("#ruleList").html(html);
			$("#ruleCntInPkgBySearch").text(ruleCount);
			$("#ruleListCard").removeClass("card-collapsed");
			$("#ruleListCardBody").css("display", "");
			
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
function treeFactorGrpList() {
	
	var param = {};
	
	$.ajax({
		method : "POST",
		url : "/targetai/getFactorGrpList.do",
		traditional: true,
		data : JSON.stringify(param),
		contentType:'application/json; charset=utf-8',
		dataType : "json",
		success : function(res) {
			var factorGrpList = res.factorGrpList;
			var factorGrpArr = [];
			
			$.each(factorGrpList, function(idx, factorGrp) {
				var factorGrpObj = {};
				factorGrpObj.id = factorGrp.FACTOR_GRP_ID;
				factorGrpObj.name = factorGrp.FACTOR_GRP_NM;
				factorGrpObj.isParent = true;
				factorGrpObj.open = false;
				
				factorGrpArr.push(factorGrpObj);
			});
			
			// zTree 설정 
			var setting = {
				data: {
					simpleData: {
						enable: true
					}
				},
				callback: {
					beforeExpand: function(treeId, treeNode) {
						if(typeof treeNode.children === 'undefined') {
							var selectedFactorGrpId = treeNode.id;
//							// Factor Group 하위 Factor List 조회 후 트리생성
							treeFactorList(selectedFactorGrpId, treeId, treeNode);
						}
					},
					onClick: getFactorVal
				}
			};
			// zTree 초기화 후 생성
			$.fn.zTree.init($("#factorTree"), setting, factorGrpArr);
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
 * Factor Group 하위 Factor List 조회 후 트리생성
 * @returns
 */ 
function treeFactorList(factorGrpId, treeId, treeNode) {
	var param = {};
	param.factorGrpId = factorGrpId;
	
	$.ajax({
		method : "POST",
		url : "/targetai/getFactorList.do",
		traditional: true,
		data : JSON.stringify(param),
		contentType:'application/json; charset=utf-8',
		dataType : "json",
		success:function(res) {
			var factorList = res.factorList;
			var factorArr = [];
			
			$.each(factorList, function(idx, factor) {
				var factorObj = {};
				factorObj.id = factor.FACTOR_ID;
				factorObj.pId = factorGrpId;
				factorObj.name = factor.FACTOR_NM;
				factorObj.name_en = factor.FACTOR_NM_EN;

				factorArr.push(factorObj);
			});
			
			// Factor 트리 추가
			var treeObj = $.fn.zTree.getZTreeObj(treeId);
			treeObj.addNodes(treeNode, factorArr);
			
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
		factorId : treeNode.id
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
			var dataType = factor.DATA_TYPE;
			
			$("#factorVal_string").css("display", "none");
			$("#factorVal_int").css("display", "none");
			$("#factorVal_date").css("display", "none");
			
			if(dataType === 'DATE') {
				$("#factorVal_date").css("display", "");
				$("#factorVal_date>input").val("")
				$("#factorVal").attr("data-type", "DATE");
				
			} else if(dataType === 'INT') {
				$("#factorVal_int").css("display", "");
				$("#factorVal_int>input").val("");
				$("#factorVal").attr("data-type", "INT");
				
			} else {	// dataType === 'STRING'
				$("#factorVal_string").css("display", "");
				$("#factorVal").attr("data-type", "STRING");
				var html = "";
				var factorVal = res.factorVal;
				
				for(var i in factorVal) {
					html += "<input type='checkbox' name='detAttrChk' value='"+ factorVal[i].VAL +"'/>";
					html += "<label for='detAttrChk' class='mg_l10'>"+ factorVal[i].VAL +"</label>";
					html += "<br />";
				}
				
				$("#factorVal_string").html(html);
				$("#factorVal_string>input").prop("checked",false);
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
 * RULE 상세 > 저장
 * @param param
 * @returns
 */
function fnRuleSave(param) {
	$.ajax({
		method : "POST",
		url : "/targetai/ruleSave.do",
		traditional: true,
		data : JSON.stringify(param),
		contentType:'application/json; charset=utf-8',
		dataType : "json",
		success : function(res) {
			var searchObj = {};
			searchObj.pkgId = $("#ruleSearchBtn").attr("data-pkgId");
			searchObj.ruleId_search = $("#ruleId_search").val();
			searchObj.regUsrId_search = $("#ruleRegUsrId_search").val();
			searchObj.ruleNm_search = $("#ruleNm_search").val();
			
			getRuleList(searchObj);
			
			messagePop("success", "RULE이 저장되었습니다.", "", "");
			
			$("#ruleEditorPopUp").css("display", "none");
			$("#ruleCard").addClass("card-collapsed");
			$("#ruleCardBody").css("display", "none");
			$("#ruleCntInPkg").text(res.ruleCount + "개");
			initRuleDetail();
			initRuleEditor();
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
	
	
//	$("input:radio[name='noLoop']:radio[value='true']").prop("checked", true);
//	$("input:radio[name='lockOnActive']:radio[value='true']").prop("checked", true);
//	$("#salience").val("");
//	$("#ruleWhenCont").val("");
}

/**
 * RULE EDITOR 초기화
 * @returns
 */
function initRuleEditor() {
	$("#ruleEditorPopUp").attr("data-ruleId", "");
	$("#ruleAttrData").html("");
	$("#factorVal_string").css("display", "none");
	$("#factorVal_int").css("display", "none");
	$("#factorVal_date").css("display", "none");
	$("#logicalRadio1").prop("checked", true);
	$("#relationRadio1").prop("checked", true);
}