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
				$("#pkg_act_yn").val(pkg.PKG_ACT_YN);
				$("#pkgRegDt").text(pkg.REG_DT + "에 " + pkg.REG_USRID + "(님)이 등록함.");
				$("#pkgUdtDt").text(pkg.UDT_DT + "에 " + pkg.UDT_USRID + "(님)이 수정함.");
				
				$("#ruleSearchBtn").attr("data-pkgId", pkg.PKG_ID);
				
				var searchObj = {};
				searchObj.pkgId = pkg.PKG_ID;
				getRuleList(searchObj);
				
				$("#ruleEditorPopUp").css("display", "none");
				$("#pkgCardList").removeClass("card-collapsed");
				$("#pkgCardListBody").css("display", "");
				
			},
			beforeSend : function() {
				$("#pkgLoading").show();
			},
			complete : function() {
				$("#pkgLoading").hide();
			},
			error : function(jqXHR, textStatus, errorThrown) {
				alertPop("에러발생", "관리자에게 문의하세요", "");
				console.log(jqXHR);
				console.log(textStatus);
				console.log(errorThrown);
			}
		});
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
				alertPop("에러발생", "관리자에게 문의하세요", "");
				console.log(jqXHR);
				console.log(textStatus);
				console.log(errorThrown);
			}
		});
	});
	
	// RULE 상세 > RULE EDITOR 버튼 클릭
	$("#ruleEditorPopUp").click(function() {
		treeFactorGrpList();
	});
	
	// RULE 상세 > RULE EDITOR 취소버튼
	$("#ruleEditorCancel").click(function() {
		// RULE EDITOR 팝업 닫기
		close_layerPop('modalID_1');
		initRuleEditor();
	});
	
	// RULE EDITOR 팝업 X버튼 클릭
	$("#modalID_1 .close").click(function() {
		initRuleEditor();
	});
	
	// RULE 목록 > 신규 RULE 생성 버튼 클릭
	$("#addNewRuleBtn").click(function() {
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
			alertPop("RULE 명 중복체크", "RULE 명 중복체크를 먼저 해주세요.", "#ruleNm");
			return;
		}
		
		// SALIENCE 체크
		var salience = $("#salience").val();
		var pattern_num = /^[0-9]+$/;
		if(salience == '') {
			alertPop("SALIENCE 공백체크", "SALIENCE 값을 입력하세요.", "#salience");
			return;
		}
		
		if(!pattern_num.test(salience)) {
			alertPop("SALIENCE 정합성 체크", "SALIENCE 값은 숫자만 입력할 수 있습니다.", "#salience");
			return;
		}
		
		// CONTENTS 체크
		var contents = $("#ruleWhenCont").val();
		if(contents == '')  {
			alertPop("CONTENTS 생성 체크", "RULE EDITOR를 통해 CONTENTS를 생성하세요.", "");
			return;
		}
		
		if(confirm("변경사항을 저장하시겠습니까?")) {
			alertPop("RULE이 저장되었습니다.", "", "");
		}
		
	});
	
	// RULE 상세 > 중복체크 버튼 클릭
	$("#ruleNmDupBtn").click(function(){
		var ruleNm = $("#ruleNm").val();
		
		if(ruleNm == '') {
			alertPop("RULE 명 공백체크.", "RULE 명을 입력하세요.", "#ruleNm");
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
	$("#addValBtn").click(function() {
		var treeObj = $.fn.zTree.getZTreeObj("factorTree");
		var node = treeObj.getSelectedNodes()[0];
		
		var factorId = node.id;
		var factorNm = node.name;
		
		console.log(factorNm);
		
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
				html += "	<td colspan='8' class='t_center'>조회된 내용이 없습니다.</td>";
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
					html += "	<td class='t_center'>" + pkgList[i].PKG_ACT_YN + "</td>";
					html += "	<td class='t_center'>" + pkgList[i].REG_DT + "</td>";
					html += "	<td class='t_center'>" + pkgList[i].REG_USRID + "</td>";
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
			alertPop("에러발생", "관리자에게 문의하세요", "");
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
					html += "	<td class='t_center'>" + ruleList[i].UDT_DT + "</td>";
					html += "	<td class='t_center'>" + ruleList[i].UDT_USRID + "</td>";
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
			alertPop("에러발생", "관리자에게 문의하세요", "");
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
			alertPop("에러발생", "관리자에게 문의하세요", "");
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
			alertPop("에러발생", "관리자에게 문의하세요", "");
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
				
			} else if(dataType === 'INT') {
				$("#factorVal_int").css("display", "");
				
			} else {	// dataType === 'STRING'
				$("#factorVal_string").css("display", "");
				var html = "";
				var factorVal = res.factorVal;
				
				for(var i in factorVal) {
					html += "<input type='radio' name='fvRadio' value='"+ factorVal[i].VAL +"'/>";
					html += "<label for='fvRadio' class='mg_l10'>"+ factorVal[i].VAL +"</label>";
					html += "<br />";
				}
				
				$("#factorVal_string").html(html);
			}
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