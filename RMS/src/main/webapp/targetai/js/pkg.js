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
				alert("에러 발생.");
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
				$("#salience").text(rule.SALIENCE);
				$("#ruleWhenCont").val(rule.ATTR_WHEN_CONTENTS);
				
				$("#ruleEditorPopUp").attr("data-ruleId", rule.RULE_ID);
				$("#ruleEditorPopUp").css("display", "");
				$("#ruleCard").removeClass("card-collapsed");
				$("#ruleCardBody").css("display", "");
				
			},
			beforeSend : function() {
				$("#ruleLoading").show();
			},
			complete : function() {
				$("#ruleLoading").hide();
			},
			error : function(jqXHR, textStatus, errorThrown) {
				alert("에러 발생.");
				console.log(jqXHR);
				console.log(textStatus);
				console.log(errorThrown);
			}
		});
	});
	
	// RULE 상세 > RULE EDITOR 버튼 클릭
	$("#ruleEditorPopUp").click(function() {
		getFactorGrpList();
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
			alert("에러 발생.");
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
			alert("에러 발생.");
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

/**
 * 속성 view 하위 요소 리스트 조회
 * @returns
 */ 
function getFactorGrpList() {
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
			var html = "";
			html += "<ul>";
			for(var i=0; i<factorGrpList.length; i++) {
				html += "<li class='folder'>";
				html += 	factorGrpList[i].FACTOR_GRP_NM;
				html += "</li>";
			}
			html += "</ul>";
			
//			$("#treeCheckbox").html(html).trigger("create");
		},
		beforeSend : function() {
			$("#treeCheckboxLoading").show();
		},
		complete : function() {
			$("#treeCheckboxLoading").hide();
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert("에러 발생.");
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}