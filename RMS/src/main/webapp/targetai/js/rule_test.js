/**
 * 	RULE TEST
 * @author 박주윤 차장
 * @since 2021.06.07
 */

// RULE TEST 메뉴 ruleTestPopBtn 클릭
$(document).on("click", "#ruleTestPopBtn", function(e) {
	e.preventDefault();
	
	var param = {};
	
	$.ajax({
		method : "POST",
		url : "/targetai/getAllPkgList.do",
		traditional: true,
		data : JSON.stringify(param),
		contentType:'application/json; charset=utf-8',
		dataType : "json",
		success : function(res) {
			var allPkgList = res.allPkgList;
			var html = "<option value='-1'>선택하세요.</option>";
			
			$.each(allPkgList, function(idx, pkg) {
				html += "<option value='"+ pkg.PATH +"/"+ pkg.PKG_NM +"/"+ pkg.DRL_NM +"' data-pkgId='"+ pkg.PKG_ID +"'>"+ pkg.PKG_NM +"</option>";
			});
			
			$("#ruleTestPop_drlList").html(html);
			$("#ruleTestPop").show();
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
});

// RULE TEST 메뉴 Package 선택 변경 이벤트
$(document).on("change", "#ruleTestPop_drlList", function() {
	var pkgId = $("#ruleTestPop_drlList option:selected").attr("data-pkgId");
	
	if(typeof pkgId == 'undefined') {
		$("#ruleAttrPreView").hide();
		$("#ruleAttrPreView").html("");
		return;
	}
	
	var param = {};
	param.pkgId = pkgId;
	
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
			
			$.each(ruleAttrList, function(idx, ruleAttr) {
				if(idx == 0 || (idx != 0 && ruleAttrList[idx-1].RELATION == '')) {
					html += "\""+ ruleAttr.RULE_NM +"\"";
					html += "\n";
				}
				// [고객 : 인터넷결합여부] =="N"&& 형식으로 출력
				html += "	["+ ruleAttr.FACTOR_GRP_NM +" : <a href='#' class='_ruleTestPop_factorNm' data-factorNmEn='"+ ruleAttr.FACTOR_NM_EN +"'>"+ ruleAttr.FACTOR_NM +"</a>] "+ ruleAttr.LOGICAL +"\""+ ruleAttr.FACTOR_VAL +"\"" + ruleAttr.RELATION;
				html += "\n";
			});
			
			$("#ruleAttrPreView").html(html);
			$("#ruleAttrPreView").show();
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
});

// RULE TEST 팝업 > RULE 속성
$(document).on("click", "._ruleTestPop_factorNm", function(e) {
	e.preventDefault();
	
	var factorNmEn = $(this).attr("data-factorNmEn");
	var factorNm = $(this).text();

	var html = "";
	html += "<div class='oneline_group'>";
	html += "	<div class='form_group'>";
	html += "		<label for=''>KEY</label> <input type='text' name='ruleTestPop_key' value='"+ factorNmEn +"' readonly='readonly'/>";
	html += "	</div>";
	html += "	<div class='form_group'>";
	html += "		<label for=''>VALUE</label> <input type='text' name='ruleTestPop_value' class='wd150px'/>";
	html += "	</div>";
	html += "	<button type='button' class='btn btn-sm btn-red _ruleTestPop_del' style='color: white'>삭제</button>";
	html += "</div>";
	
	$("#ruleTestPop_input").append(html);
});

// RULE TEST 메뉴 > 속성 삭제 버튼 클릭
var keyValueArr = [];

$(document).on("click", "._ruleTestPop_del", function() {
	var delIdx = $(".ruleTestPop_resBtn").index(this);
	keyValueArr.splice(delIdx, 1);
	$(this).closest(".oneline_group").remove();
});

// RULE TEST 메뉴 결과확인 버튼 클릭
$(document).on("click", "#ruleTestPop_resBtn", function() {
	var drlPath = $("#ruleTestPop_drlList option:selected").val();
	
	if(drlPath == '-1') {
		messagePop("warning", "RULE TEST 체크", "Package를 선택하세요.", "");
		return;
	}
	
	var keyArr = $("input[name='ruleTestPop_key']");
	var keyVal = $("input[name='ruleTestPop_value']");
	
	for(var i=0; i<keyArr.length; i++) {
		var key = keyArr.eq(i).val();
		var val = keyVal.eq(i).val();
		
		var keyValue = key + ":" + val;
		
		keyValueArr.push(keyValue);
	}
	
	var param = {};
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
			$("#ruleTestResPop").show();
			$("#ruleTestResPop_res").val(JSON.stringify(res, null, 4));
		},
		beforeSend : function() {
			$("#ruleTestResPopLoading").show();
		},
		complete : function() {
			$("#ruleTestResPopLoading").hide();
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
	initRuleTestPop();
});

// RULE TEST 팝업 초기화
function initRuleTestPop() {
	$("#ruleTestPop_input").html("");
	$("#ruleAttrPreView").html("");
	$("#ruleAttrPreView").hide();
	$("#ruleTestPop_drlList option").eq(0).prop("selected", true);
}