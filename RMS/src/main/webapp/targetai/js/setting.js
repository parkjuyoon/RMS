/**
 * @author 박주윤차장
 */
$(document).ready(function() {
	// FUNCTION 설정 > 함수선택 SELECT 박스
	fnGetFuncList();
	
	// FUNCTION 설정 > parameter + 버튼
	$(document).on("click", "._paramPlusBtn", function() {
		var html = "";
		html += "<div>";
		html += "	<select class='wd150px _paramTypeSelect'>";
		html += "		<option value='String'>String</option>";
		html += "		<option value='int'>int</option>";
		html += "	</select>";
		html += "	<input type='text' class='wd300px _paramVal' value='' />";
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
	
	// FUNCTION 설정 > 함수 선택 변경이벤트
	$("#funcSelect").change(function() {
		var factorId = $(this).val();
		
		fnGetFuncInfo(factorId);
	});
	
	// FUNCTION 설정 > 저장 버튼 클릭
	$("#saveFuncSettingBtn").click(function() {
		fnSaveFuncSetting();
	});
	
	// FUNCTION 설정 > DATA_TYPE 선택 변경 이벤트
	$(document).on("change", "._paramTypeSelect", function() {
		
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
			
			var html = "<option value=''>신규등록</option>";
			$.each(funcList, function(idx, func) {
				html += "<option value='"+ func.FACTOR_ID +"'>"+ func.FACTOR_NM +"</option>";
			});
			
			$("#funcSelect").html(html);
			$("#funcSelect").attr("data-funcPid", res.PID);
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
			var factor = res.factor;
			var paramInfoList = res.paramInfoList;
			var html = "";
			
			$("#funcNm").val(factor == null ? "" : factor.FACTOR_NM);
			$("#funcNmEn").val(factor == null ? "" : factor.FACTOR_NM_EN);
			$("#funcSourceArea").val(factor == null ? "" : factor.FUNC_SOURCE);
			
			if(paramInfoList.length > 0) {
				$.each(paramInfoList, function(idx, paramInfo) {
					html += "<div>";
					html += "	<select class='wd150px _paramTypeSelect'>";
				if(paramInfo.DATA_TYPE == 'String') {
					html += "		<option value='String' selected>String</option>";
					html += "		<option value='int'>int</option>";
					html += "		<option value='Object'>Object</option>";
				} else if(paramInfo.DATA_TYPE == 'int'){
					html += "		<option value='String'>String</option>";
					html += "		<option value='int' selected>int</option>";
					html += "		<option value='Object'>Object</option>";
				} else if(paramInfo.DATA_TYPE == 'Object') {
					html += "		<option value='String'>String</option>";
					html += "		<option value='int'>int</option>";
					html += "		<option value='Object' selected>Object</option>";
				}
					html += "	</select>";
					html += "	<input type='text' class='wd300px _paramVal' value='"+ paramInfo.ARG_NM +"' />";
					html += "	<button type='button' id='' class='btn btn-sm btn-gray _paramPlusBtn'>+</button>";
					html += "	<button type='button' id='' class='btn btn-sm btn-red _paramMinusBtn'>-</button>";
					html += "</div>";
				});
				
			} else {
				html += "<div>";
				html += "	<select id='' class='wd150px _paramTypeSelect'>";
				html += "		<option value='String'>String</option>";
				html += "		<option value='int'>int</option>";
				html += "	</select>";
				html += "	<input type='text' class='wd300px _paramVal' id='' value='' />";
				html += "	<button type='button' id='' class='btn btn-sm btn-gray _paramPlusBtn'>+</button>";
				html += "	<button type='button' id='' class='btn btn-sm btn-red _paramMinusBtn'>-</button>";
				html += "</div>";
			}
			
			$("#parameterTd").html(html);
			
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
	const param = {};
	// 함수 factorId
	param.pid = $("#funcSelect").attr("data-funcPid");
	// factorId
	param.factorId = $("#funcSelect").val();
	// 함수명(한글)
	param.funcNm = $("#funcNm").val();
	// 함수명(영문)
	param.funcNmEn = $("#funcNmEn").val();
	// source code 내용
	param.sourceCode = $("#funcSourceArea").val();
	
	// parameter 객체
	var paramArray1 = $("#parameterTd").children("div");
	var paramArray2 = [];
	for(var i=0; i<paramArray1.length; i++) {
		var paramType = paramArray1.eq(i).find("._paramTypeSelect").val();
		var paramVal = paramArray1.eq(i).find("._paramVal").val();
		var paramObj = {};
		
		paramObj.paramType = paramType;
		paramObj.paramVal = paramVal;
		paramObj.order = i+1;
		
		paramArray2.push(paramObj);
	}
	param.paramArray = paramArray2;

	$.ajax({
		method : "POST",
		url : "/targetai/saveFuncSetting.do",
		traditional: true,
		data : JSON.stringify(param),
		contentType:'application/json; charset=utf-8',
		dataType : "json",
		success : function(res) {
			if(res == true) {
				messagePop("success", "FUNCTION 을 저장했습니다.", "", "");
				fnGetFuncList();
				$("#funcSelect").val("").trigger("change");
			} else {
				messagePop("warning", "소스 코드 에러", "소스 코드에 에러가 있습니다.", "");
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
