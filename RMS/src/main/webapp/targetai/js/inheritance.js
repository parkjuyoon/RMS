/**
 * Inheritance (RULE 상속 정보)
 * @author 박주윤 차장
 * @since 2022.01.06
 */

$(document).ready(function() {
	
});

/**
 * 개발중인 RULE 배포시 영향도 체크(연결된 패키지가 있는지 확인)
 * @returns
 */
function fnGetEffectChkPop(searchObj) {
	searchObj.limit = 10;
	searchObj.offset = searchObj.currentPage*searchObj.limit-searchObj.limit;
	
	$.ajax({
		method : "POST",
		url : "/targetai/getConPkg.do",
		traditional: true,
		data : JSON.stringify(searchObj),
		contentType:'application/json; charset=utf-8',
		dataType : "json",
		success : function(res) {
			conPkgList = res.conPkgList;
			var conPkgListCnt = res.conPkgListCnt;
			searchObj.totalCount = conPkgListCnt;
			
			// 패키지가 연결된 RULE의 운영배포 -> 영향도 체크
			if(conPkgList.length > 0) {
				$("#effectChkPop").show();
				
				var html = "";
				
				if(conPkgList.length == 0) {
					html += "<tr>";
					html += "	<td colspan='6' class='t_center'>조회된 내용이 없습니다.</td>";
					html += "</tr>";
					
				} else {
					$.each(conPkgList, function(idx, conPkg){
						html += "<tr>";
						html += "	<td class='t_center'>"+ conPkg.PKG_ID +"</td>";
						html += "	<td class='t_center'>"+ conPkg.PKG_NM +"</td>";
						html += "	<td class='t_center'>"+ conPkg.PKG_VER +"</td>";
						html += "	<td class='t_center'>"+ conPkg.PKG_VER_STATUS +"</td>";
						html += "	<td class='t_center'>" + (typeof conPkg.RUN_START_DATE == "undefined" ? "-" : conPkg.RUN_START_DATE) + "</td>";
						html += "	<td class='t_center'>" + (typeof conPkg.RUN_END_DATE == "undefined" ? "-" : conPkg.RUN_END_DATE) + "</td>";
						html += "</tr>";
					});
				}
				
				$("#effectChkPopList").html(html);
				$("#effectChkPopCntBySearch").text(conPkgListCnt);
				fnPaging("#effectChkPopPaging", searchObj);
				
			// 패키지가 연결되지 않은 RULE의 운영배포
			} else {
				if(confirm("개발중인 RULE을 운영배포 하시겠습니까?")) {
					var param = {};
					param.ruleId = searchObj.ruleId;
					fnRuleDeploy(param);
				}
			}
		},
		beforeSend : function() {
			$("#ruleVerListLoading").show();
			$("#effectChkPopLoading").show();
		},
		complete : function() {
			$("#ruleVerListLoading").hide();
			$("#effectChkPopLoading").hide();
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
 * RULE 버전 목록 조회
 * @param param
 * @returns
 */
function fnGetRuleVerList(searchObj) {
	searchObj.limit = 10;
	searchObj.offset = searchObj.currentPage*searchObj.limit-searchObj.limit;
	
	$.ajax({
		method : "POST",
		url : "/targetai/getRuleVerList.do",
		traditional: true,
		data : JSON.stringify(searchObj),
		contentType:'application/json; charset=utf-8',
		dataType : "json",
		success : function(res) {
			var verList = res.ruleVerList;
			searchObj.totalCount = res.ruleVerCount;
			
			var html = "";
			var isDevVer = 'N';
			
			if(verList.length == 0) {
				html += "<tr>";
				html += "	<td colspan='5' class='t_center'>조회된 내용이 없습니다.</td>";
				html += "</tr>";
				
				$("#ruleVerListCard>header>h2").text("버전 목록");
			} else {
				$.each(verList, function(idx, ver){
					html += "<tr>";
					html += "	<td class='t_center'>"+ (idx+1) +"</td>";
//					html += "	<td class='t_center'><a href='#' class='_ruleVerNmLink' data-ver='"+ ver.RULE_VER +"' data-ruleId='"+ ver.RULE_ID +"'>" + ver.RULE_NM + "_v" + ver.RULE_VER +"</a></td>";
					html += "	<td class='t_center'>" + ver.RULE_NM + "_v" + ver.RULE_VER +"</td>";
					html += "	<td class='t_center'>" + ver.VER_STATUS + "</td>";
					html += "	<td class='t_center'>" + (typeof ver.REG_DT == "undefined" ? "-" : ver.REG_DT) + "</td>";
					html += "	<td class='t_center'>" + (typeof ver.UDT_DT == "undefined" ? "-" : ver.UDT_DT) + "</td>";
					html += "</tr>";
					
					if(ver.VER_STATUS == '개발중') {
						isDevVer = 'Y';
					}
				});
				
				$("#ruleVerListCard>header>h2").text(verList[0].RULE_NM + "("+ searchObj.ruleId +") 의 버전 목록");
			}
			
			$("#ruleDeployBtn").attr("data-isDevVer", isDevVer);
			$("#ruleVerList").html(html);
			$("#ruleVerCount").text(res.ruleVerCount);
			fnPaging("#ruleVerListPaging", searchObj);
			
			// 개발중인 RULE 배포하기 위한 RULE_ID 설정
			$("#ruleDeployBtn").attr("data-ruleId", searchObj.ruleId);
		},
		beforeSend : function() {
			$("#ruleVerListLoading").show();
		},
		complete : function() {
			$("#ruleVerListLoading").hide();
		},
		error : function(jqXHR, textStatus, errorThrown) {
			messagePop("warning", "에러발생", "관리자에게 문의하세요", "");
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}