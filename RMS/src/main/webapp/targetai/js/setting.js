/**
 * @author 박주윤차장
 */
$(document).ready(function() {
	// FUNCTION 설정 > 신규전환
	$("#addFuncBtn").click(function() {
		$(this).parent("div").hide();
		$(this).parent("div").siblings("div").show();
	});
	
	// FUNCTION 설정 > 선택전환
	$("#selectFuncBtn").click(function() {
		$(this).parent("div").hide();
		$(this).parent("div").siblings("div").show();
		fnGetFuncList();
	});
	
	// FUNCTION 설정 > parameter + 버튼
	$(document).on("click", "._paramPlusBtn", function() {
		var html = "";
		html += "<div>";
		html += "	<select id='' class='wd150px'>";
		html += "		<option value='s'>String</option>";
		html += "		<option value='i'>int</option>";
		html += "		<option value='d'>date</option>";
		html += "	</select>";
		html += "	<input type='text' class='wd300px' id='' value='' />";
		html += "	<button type='button' id='' class='btn btn-sm btn-gray _paramPlusBtn'>+</button>";
		html += "	<button type='button' id='' class='btn btn-sm btn-red _paramMinusBtn'>-</button>";
		html += "</div>";
		
		$(this).closest("div").after(html);
	});
	
	// FUNCTION 설정 > parameter - 버튼
	$(document).on("click", "._paramMinusBtn", function() {
		if($(this).closest("td").children().length > 1) {
			$(this).parent("div").remove();
		}
	});
	
	// FUNCTION 설정 > 파일 찾아보기
	$("#funcFileUploadBtn").click(function(){
		$("input[name='funcFileUpload']").click();
	});
	
	$("input[name='funcFileUpload']").change(function() {
		$("#funcFileUploadView").val($(this).val());
	});
	
	// FUNCTION 설정 > class/method 명 추가버튼
	$("#addImportBtn").click(function() {
		var funcNmEn = $("#funcNmEn").val();
		var methodNmEn = $("#methodNmEn").val();
		var regExp1 = /^[A-Z]+[A-Za-z0-9+]*$/;	// 영문 대문자로 시작하면서 영어+숫자만 가능
		var regExp2 = /^[a-z]+[A-Za-z0-9+]*$/;	// 영문 소문자로 시작하면서 영어+숫자만 가능
		
		if(!regExp1.test(funcNmEn)) {
			messagePop("warning","영어 대문자로 시작하는<br/>Class 명만 가능합니다.","","#funcNmEn");
			return;
		}
		
		if(!regExp2.test(methodNmEn)) {
			messagePop("warning","영어 소문자로 시작하는<br/>Method 명만 가능합니다.","","#methodNmEn");
			return;
		}
		
		fnAddImport(funcNmEn, methodNmEn);
	});
	
	// FUNCTION 설정 > import Class 삭제
	$(document).on("click", "._importClassMinus", function(){
		var delIdx = $("._importClassMinus").index(this);
		$(this).closest("div").remove();
	});
	
	// FUNCTION 설정 > 함수 선택 변경이벤트
	$("#funcSelect").change(function() {
		var factorId = $(this).val();
		
		fnGetFuncInfo(factorId);
	});
	
	// FUNCTION 설정 > 저장 버튼 클릭
	$("#saveFuncSettingBtn").click(function() {
		fnSaveFuncSetting();
	});
});

/**
 * FUNCTION 설정 > 함수 리스트 조회
 * @returns
 */
function fnGetFuncList() {
	var param = {};
	
	$.ajax({
		method : "POST",
		url : "/targetai/getFuncList.do",
		traditional: true,
		data : JSON.stringify(param),
		contentType:'application/json; charset=utf-8',
		dataType : "json",
		success : function(res) {
			var funcList = res.funcList;
			
			var html = "<option value=''>선택하세요</option>";
			$.each(funcList, function(idx, func) {
				html += "<option value='"+ func.FACTOR_ID +"'>"+ func.FACTOR_NM +"</option>";
			});
			
			$("#funcSelect").html(html);
		},
		beforeSend : function() {
			$("#loadingIcon").show();
		},
		complete : function() {
			$("#loadingIcon").hide();
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
 * import Class 추가기능
 * @param funcNmEn
 * @param methodNmEn
 * @returns
 */
function fnAddImport(funcNmEn, methodNmEn) {
	$.ajax({
		method : "POST",
		url : "/targetai/getFuncRootPath.do",
		success : function(res) {
			var importClass = res.funcRootPath + "." + funcNmEn + "." + methodNmEn;
			var html = "";
			html += "<div>";
			html += "	<button type='button' class='btn-del _importClassMinus' data-bs-dismiss='alert' aria-label='Close'></button>";
			html += "	&nbsp;&nbsp;<label class='_importClass'>"+ importClass +"</label>";
			html += "</div>";
			
			$("#importClassTd").append(html);
			$("#funcNmEn").val("");
			$("#methodNmEn").val("");
		},
		beforeSend : function() {
			$("#loadingIcon").show();
		},
		complete : function() {
			$("#loadingIcon").hide();
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
 * @param factorId
 * @returns
 */
function fnGetFuncInfo(factorId) {
	var param = {};
	param.factorId = factorId;
	
	$.ajax({
		method : "POST",
		url : "/targetai/getFuncInfo.do",
		traditional: true,
		data : JSON.stringify(param),
		contentType:'application/json; charset=utf-8',
		dataType : "json",
		success : function(res) {
			var importInfoList = res.importInfoList;
			var paramInfoList = res.paramInfoList;
			var sourceInfo = res.sourceInfo;
			
			var html = "";
			$.each(importInfoList, function(idx, importInfo) {
				html += "<div>";
				html += "	<button type='button' class='btn-del _importClassMinus' data-bs-dismiss='alert' aria-label='Close'></button>";
				html += "	&nbsp;&nbsp;<label class='_importClass'>"+ importInfo.IMPORT_CONTENTS +"</label>";
				html += "</div>";
			});
			
			$("#importClassTd").html(html);
			
			html = "";
			$.each(paramInfoList, function(idx, paramInfo) {
				html += "<div>";
				html += "	<select id='' class='wd150px'>";
				html += "		<option value='s'>String</option>";
				html += "		<option value='i'>int</option>";
				html += "		<option value='d'>date</option>";
				html += "	</select>";
				html += "	<input type='text' class='wd300px' id='' value='"+ paramInfo.ARG_NM +"' />";
				html += "	<button type='button' id='' class='btn btn-sm btn-gray _paramPlusBtn'>+</button>";
				html += "	<button type='button' id='' class='btn btn-sm btn-red _paramMinusBtn'>-</button>";
				html += "</div>";
			});
			
			if(paramInfoList.length > 0) {
				$("#parameterTd").html(html);
				
			} else {
				html += "<div>";
				html += "	<select id='' class='wd150px'>";
				html += "		<option value='s'>String</option>";
				html += "		<option value='i'>int</option>";
				html += "		<option value='d'>date</option>";
				html += "	</select>";
				html += "	<input type='text' class='wd300px' id='' value='' />";
				html += "	<button type='button' id='' class='btn btn-sm btn-gray _paramPlusBtn'>+</button>";
				html += "	<button type='button' id='' class='btn btn-sm btn-red _paramMinusBtn'>-</button>";
				html += "</div>";
				
				$("#parameterTd").html(html);
			}
			
		},
		beforeSend : function() {
			$("#loadingIcon").show();
		},
		complete : function() {
			$("#loadingIcon").hide();
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
 * FUNCTION 설정 저장
 * @returns
 */
function fnSaveFuncSetting() {
	var sourceFile = $("input[name='funcFileUpload']")[0].files[0];
	const formData = new FormData();
	formData.append("sourceFile", sourceFile);
	
	$.ajax({
		method : "POST",
		dataType : "json",
		url : "/targetai/saveFuncSetting.do",
		data : formData,
		enctype : "multipart/form-data",
		processData : false,
		contentType : false,
		success : function(res) {
			console.log(res);
		},
		beforeSend : function() {
			$("#loadingIcon").show();
		},
		complete : function() {
			$("#loadingIcon").hide();
		},
		error : function(jqXHR, textStatus, errorThrown) {
			messagePop("warning", "에러발생", "관리자에게 문의하세요", "");
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}
