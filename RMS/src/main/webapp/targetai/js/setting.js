/**
 * @author 박주윤차장
 */
$(document).ready(function() {
	// FUNCTION 설정 > 함수선택 SELECT 박스
	fnGetFuncList();
	
	// FUNCTION 설정 > parameter 입력부분 다이나믹 HTML 적용
	var p1 = {};
	var h1 = fnGetParamHTML(p1);
	$("#parameterTd").html(h1);
	
	// FUNCTION 설정 > parameter + 버튼
	$(document).on("click", "._paramPlusBtn", function() {
		var param = {};
		var html = fnGetParamHTML(param);
		
		$(this).closest("._selectAttributeDiv").after(html);
	});
	
	// FUNCTION 설정 > parameter - 버튼
	$(document).on("click", "._paramMinusBtn", function() {
		var param = {};
		
		$(this).closest("._selectAttributeDiv").remove();

		if($("._selectAttributeDiv").length < 1) {
			$("#parameterTd").html(fnGetParamHTML(param));
		}
	});
	
	// FUNCTION 설정 > 함수 선택 변경이벤트
	$("#funcSelect").change(function() {
		var factorId = $(this).val();
		
		fnGetFuncInfo(factorId);
	});
	
	// FUNCTION 설정 > 저장 버튼 클릭
	$("#saveFuncSettingBtn").click(function() {
		var funcNm = $("#funcNm").val();
		var funcNmEn = $("#funcNmEn").val();
		
		if(funcNm == '') {
			messagePop("warning","함수명(KOR)을 입력하세요.","","");
			return;
		}
		
		if(funcNmEn == '') {
			messagePop("warning","함수명(ENG)은 입력하세요.","","");
			return;
		}
		
		var regExp = /^[A-Za-z][A-Za-z0-9+]*$/;	// 영문+숫자
		
		if(!regExp.test(funcNmEn)) {
			messagePop("warning","함수명(ENG)은 영문+숫자만 가능합니다.","","");
			return;
		}
		
		fnSaveFuncSetting();
	});
	
	// FUNCTION 설정 > DATA_TYPE 선택 변경 이벤트
	$(document).on("change", "._paramTypeSelect", function() {
		var paramType = $(this).val();
		var selectAttributeDiv = $(this).siblings("div");
		
		if(paramType == "Object") {
			selectAttributeDiv.show();
				
		} else {
			selectAttributeDiv.hide();
		}
	});
	
	// FUNCTION 설정 > parameter Object 선택 > 속성선택 버튼
	$(document).on("click", "._selectAttributeBtn", function() {
		$("#selectFactorTree").html("");
		$("#selectAttribute").show();
		var param = {};
		param.notIn = "FUNC";
		
		var $this = $(this);
		
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
						onClick: function(event, treeId, treeNode) {
							var factorNm = treeNode.name;
							var factorNmEn = treeNode.name_en;
							var factorId = treeNode.id;
							
							if(typeof factorNmEn == 'undefined') {
								messagePop("warning","속성을 다시선택하세요.","","");
								return;
							} else {
								var paramVal = $("._paramVal");
								
								for(var i=0; i<paramVal.length; i++) {
									var val = paramVal.eq(i).val();
									
									if(val.toLowerCase() == factorNmEn.toLowerCase()) {
										messagePop("warning","동일한 변수명으로 설정할 수 없습니다.","","");
										return;
									}
								}
								
								$this.siblings("input").val(factorNm);
								$this.closest("._selectAttributeDiv").find("._paramVal").val(factorNmEn.toLowerCase());
								$this.closest("._selectAttributeDiv").find("._paramVal").attr("data-defaultValue", factorId);
								close_layerPop('selectAttribute');
							}
						}
					}
				};
				
				// zTree 초기화 후 생성
				$.fn.zTree.init($("#selectFactorTree"), setting, factorArr);
			},
			beforeSend : function() {
				$("#selectAttributeLoading").show();
			},
			complete : function() {
				$("#selectAttributeLoading").hide();
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
				param.paramInfoList = paramInfoList;
				
			} else {
				param = {};
			}
			
			$("._selectAttributeDiv").remove();
			$("#parameterTd").html(fnGetParamHTML(param));
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
	var paramArray1 = $("._selectAttributeDiv");
	
	var paramArray2 = [];
	for(var i=0; i<paramArray1.length; i++) {
		var paramType = paramArray1.eq(i).find("._paramTypeSelect").val();
		var paramVal = paramArray1.eq(i).find("._paramVal").val();
		var defalutValue = paramArray1.eq(i).find("._paramVal").attr("data-defaultValue");
		var paramObj = {};
		
		paramObj.paramType = paramType;
		paramObj.paramVal = paramVal;
		paramObj.order = i+1;
		paramObj.defalutValue = (defalutValue == 'undefined' ? null : defalutValue);
		
		paramArray2.push(paramObj);
	}
	param.paramArray = paramArray2;

	// 함수 저장
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

/**
 * FUNCTION 설정 > parameter 입력부분 다이나믹 HTML 적용
 * @returns
 */
function fnGetParamHTML(param) {
	var parameterTdHtml = "";
	
	if(Object.keys(param).length > 0) {
		var paramInfoList = param.paramInfoList;
		
		$.each(paramInfoList, function(idx, paramInfo) {
				parameterTdHtml += "<div class='_selectAttributeDiv'>";
				parameterTdHtml += "<div style='display: -webkit-inline-box;'>";
				parameterTdHtml += "<select class='wd88px _paramTypeSelect'>";
				
			if(paramInfo.DATA_TYPE == 'String') {
				parameterTdHtml += "<option value='String' selected>String</option>";
				parameterTdHtml += "<option value='int'>int</option>";
				parameterTdHtml += "<option value='Object'>Object</option>";
				
			} else if(paramInfo.DATA_TYPE == 'int') {
				parameterTdHtml += "<option value='String'>String</option>";
				parameterTdHtml += "<option value='int' selected>int</option>";
				parameterTdHtml += "<option value='Object'>Object</option>";
				
			} else if(paramInfo.DATA_TYPE == 'Object') {
				parameterTdHtml += "<option value='String'>String</option>";
				parameterTdHtml += "<option value='int'>int</option>";
				parameterTdHtml += "<option value='Object' selected>Object</option>";
			}
				parameterTdHtml += "</select>";
				parameterTdHtml += "<input type='text' class='wd300px _paramVal' value='"+ paramInfo.ARG_NM +"' data-defaultValue='"+ paramInfo.DEFAULT_VALUE +"'/>";
				parameterTdHtml += "<button type='button' class='btn btn-sm btn-gray _paramPlusBtn'>+</button>";
				parameterTdHtml += "<button type='button' class='btn btn-sm btn-red _paramMinusBtn'>-</button>";
				
			if(paramInfo.DATA_TYPE == 'Object') {
				parameterTdHtml += "<div style='margin-left: 10px;'>";
				
			} else {
				parameterTdHtml += "<div style='display: none; margin-left: 10px;'>";
			}
				parameterTdHtml += "<button type='button' class='btn btn-sm btn-green _selectAttributeBtn'>";
				parameterTdHtml += "<i class='far fa-check-circle custom-btn-i'></i> 속성선택";
				parameterTdHtml += "</button>";
				parameterTdHtml += "<input type='text' class='wd300px' value='"+ paramInfo.FACTOR_NM +"' readonly='readonly' />";
				parameterTdHtml += "</div>";
				parameterTdHtml += "</div>";
				parameterTdHtml += "</div>";
		});
		
	} else {
		parameterTdHtml += "	<div class='_selectAttributeDiv'>";
		parameterTdHtml += "		<div style='display: -webkit-inline-box;'>";
		parameterTdHtml += "			<select class='wd88px _paramTypeSelect'>";
		parameterTdHtml += "				<option value='String'>String</option>";
		parameterTdHtml += "				<option value='int'>int</option>";
		parameterTdHtml += "				<option value='Object'>Object</option>";
		parameterTdHtml += "			</select>";
		parameterTdHtml += "			<input type='text' class='wd300px _paramVal' value='' />";
		parameterTdHtml += "			<button type='button' class='btn btn-sm btn-gray _paramPlusBtn'>+</button>";
		parameterTdHtml += "			<button type='button' class='btn btn-sm btn-red _paramMinusBtn'>-</button>";
		parameterTdHtml += "			<div style='display: none; margin-left: 10px;'>";
		parameterTdHtml += "				<button type='button' class='btn btn-sm btn-green _selectAttributeBtn'>";
		parameterTdHtml += "					<i class='far fa-check-circle custom-btn-i'></i> 속성선택";
		parameterTdHtml += "				</button>";
		parameterTdHtml += "				<input type='text' class='wd300px' value='' readonly='readonly' />";
		parameterTdHtml += "			</div>";
		parameterTdHtml += "		</div>";
		parameterTdHtml += "	</div>";
	}
	
	return parameterTdHtml;
}