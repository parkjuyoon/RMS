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
				alert("에러 발생.");
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
		// jstree 종료할땐 항상 destroy 해주어야 함. 안하면 다음 실행할때 에러
		$("#factorTree").jstree("destroy");
		
		// RULE EDITOR 팝업 닫기
		close_layerPop('modalID_1');
		initRuleEditor();
	});
	
	// RULE EDITOR 팝업 X버튼 클릭
	$("#modalID_1 .close").click(function() {
		$("#factorTree").jstree("destroy");
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
	
	// RULE 상세 > 저장 버튼 클릭
	$("#saveRuleBtn").click(function() {
		// RULE 명 중복 체크
		var isDup = $("#ruleNmDupBtn").data("isDup");
		if(isDup != 'Y') {
			alert("RULE 명 중복체크가 필요합니다.");
			$("#ruleNm").focus();
			return;
		}
		
		// SALIENCE 체크
		var salience = $("#salience").val();
		var pattern_num = /^[0-9]+$/;
		if(salience == '') {
			alert("SALIENCE 값을 입력하세요.");
			$("#salience").focus();
			return;
		}
		
		if(!pattern_num.test(salience)) {
			alert("SALIENCE 값은 숫자만 입력할 수 있습니다.");
			$("#salience").focus();
			return;
		}
		
		// CONTENTS 체크
		var contents = $("#ruleWhenCont").val();
		if(contents == '')  {
			alert("RULE EDITOR를 통해 CONTENTS를 생성하세요.");
			return;
		}
		
		if(confirm("변경사항을 저장하시겠습니까?")) {
			alert("RULE이 저장되었습니다.");
		}
		
	});
	
	// RULE 상세 > 중복체크 버튼 클릭
	$("#ruleNmDupBtn").click(function(){
		var ruleNm = $("#ruleNm").val();
		
		if(ruleNm == '') {
			alert("RULE 명을 입력하세요.");
			$("#ruleNm").focus();
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
					}
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
			alert("에러 발생.");
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
 
function getFactorGrpList2() {
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
				factorGrpObj.text = factorGrp.FACTOR_GRP_NM;
				factorGrpObj.state = { 'opened' : false, 'selected' : false };
				
				factorGrpArr.push(factorGrpObj);
			});
			
			// RULE EDITOR 트리뷰 생성
			$("#factorTree").jstree({ 
				'core' : {
							'check_callback' : true, // check_callback 이 없으면 create_node가 실행되지않는다
				 			'data' : factorGrpArr
				 		},
				'types' : {
					'default' : {
						'icon' : 'fas fa-folder'
					},
					'file' : {
						'icon' : 'fas fa-file'
					}
				},
				'themes' : {
					'responsive': false
				}, 
				"plugins" : [ 'types' ]
			})
			.bind("select_node.jstree", function (e, data) {	// 노드 선택시 실행되는 이벤트
				
				if(data.node.parent != "#") {	// factor 클릭시 동작할 내용 (ROOT 폴더는 factorGrp)
					var parentNode = $("#factorTree").jstree().get_node(data.node.parent);
					var childNode = data.node;
					
					// Factor Value 조회
					var factorObj = {};
					factorObj.factorGrpNm = parentNode.text;
					factorObj.factorId = childNode.id;
					factorObj.factorNm = childNode.text;
					getFactorVal(factorObj);
					
					return;
				}
				
				if(!data.node.state.opened) {	// factorGrp 가 열려있을 경우는 실행하지 않음
					var grpParam = {};
					grpParam.factorGrpId = data.node.id;
					
					$.ajax({
						method : "POST",
						url : "/targetai/getFactorList.do",
						traditional: true,
						data : JSON.stringify(grpParam),
						contentType:'application/json; charset=utf-8',
						dataType : "json",
						success:function(res) {
							var factorList = res.factorList;
							var factorArr = [];
							
							$.each(factorList, function(idx, factor) {
								var factorObj = {};
								factorObj.id = factor.FACTOR_ID;
								factorObj.text = factor.FACTOR_NM;
								factorObj.state = { 'opened' : false, 'selected' : false };
								
								$('#factorTree').jstree("create_node", data.node.id, factorObj, "first", false);
							});
							
							$("#factorTree").jstree("toggle_node", $("#factorTree").jstree("get_selected"));
						}
					});
					
				} else {	// factgorGrp 가 열려있을 경우 닫음.
					$("#factorTree").jstree("toggle_node", $("#factorTree").jstree("get_selected"));
				}
			})
			.bind("open_node.jstree", function(e, data) {})
			.bind("close_node.jstree", function(e, data) {
				// factorGrp 닫을때 factor 요소 delete
				$("#factorTree").jstree("delete_node", data.node.children);
			});
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
 */

/**
 * Factor Value 조회
 * @param factorValObj
 * @returns
 */
function getFactorVal(factorObj) {
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
			var html = "";
			
			if(dataType === 'DATE') {
				html += "<input type='date' name='detAttrChk' placeholder='YYYY-MM-DD'/>";
				
			} else if(dataType === 'INT') {
				html += "<input type='text' name='detAttrChk' placeholder='숫자만 입력가능합니다.'/>";
				
			} else {	// dataType === 'STRING'
				var factorVal = res.factorVal;
				
				for(var i in factorVal) {
					html += "<input type='checkbox' name='detAttrChk' value='"+ factorVal[i].VAL +"'> ";
					html += "	<label for='detAttrChk' class='mg_r10'>";
					html += 		factorVal[i].VAL;
					html += "	</label>";
					html += "</input>";
					html += "<br />";
				}
			}
			
			$("#factorValData").html(html);
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
	$("#factorValData").html("");
	$("#ruleAttrData").html("");
	$("#logicalRadio1").prop("checked", true);
	$("#relationRadio1").prop("checked", true);
}