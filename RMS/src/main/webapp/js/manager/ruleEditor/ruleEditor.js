/**
 * 
 */

$(document).ready(function() {
		
		var applyRuleArr = new Array();	// Rule 속성에 정의된 목록
		var applyRuleObj = {};	// Rule 속성에 추가된 한개의 rule
		var whenMapAttr_html = new Array();
		var drl_html = ""; // 최종 생성된 drl rule
			
		$('.leftmenutrigger').on('click', function(e) {
			$('.side-nav').toggleClass("open");
			e.preventDefault();
		});
		
/*       
        //[1] 리스트의 기본 모양 지정 : <ul>를 자식으로 가지지 않는 li의 블릿기호는 기본 모양
        $('.attViewTree li:not(:has(ul))').css({ cursor: 'default', 'list-style-image':'url(/common/images/plus.gif)'});
        
        //[2] 자식 요소를 갖는 li에 대해서는 블릿이미지를 plus.gif를 지정
        $('.attViewTree li:has(ul)') //자식 요소(ul)를 갖는 요소(li)에 대해서
            .css({cursor: 'pointer', 'list-style-image':'url(/common/images/plus.gif)'})//+기호로 설정
            .children().hide(); //자식요소 숨기기
        //[3] +로 설정된 항목에 대해서 click이벤트 적용
        $('.attViewTree li:has(ul)').click(function(event){
                       
            //this == event.target으로 현재 선택된 개체에 대해서 처리
            if(this == event.target){
                //숨겨진 상태면 보이고 -기호로 설정 그렇지 않으면 숨기고 + 기호로 설정
                  if ($(this).children().is(':hidden')) {
                    // 보이기
                    $(this).css('list-style-image', 'url(/common/images/minus.gif)').children().slideDown();
                }
                else {
                    // 숨기기
                    $(this).css('list-style-image', 'url(/common/images/plus.gif)').children().slideUp();
                }

            }
            return false;          
        });
*/          

		//[1] 리스트의 기본 모양 지정 : <ul>를 자식으로 가지지 않는 li의 블릿기호는 기본 모양
		$('.attViewTree li:not(:has(ul))').css({ cursor: 'default', 'list-style-image':'url(/common/images/folder-closed.gif)'});
		
		// 속성 VIEW 테이블 클릭이벤트
		$('.attViewTree li').click(function(event){
			var $this = $(this);
			// global변수 값 세팅
			applyRuleObj.factor_grp_id = $this.data("factor_grp_id");
			applyRuleObj.factor_grp_nm = $this.text();
			
			if($this.children().is("ul")) {
				if(this == event.target){
	                //숨겨진 상태면 보이고 -기호로 설정 그렇지 않으면 숨기고 + 기호로 설정
                  	if($this.children().is(':hidden')) {
	                    // 보이기
	                    $this.css('list-style-image', 'url(/common/images/folder.gif)').children().show();
	                }
	                else {
	                    // 숨기기
	                    $this.css('list-style-image', 'url(/common/images/folder-closed.gif)').children().hide();
	                }
	            }
				
				return;
			}
			
			var params = {
				factor_grp_id : applyRuleObj.factor_grp_id,
			};
			
			$.ajax({
				url:"/ruleEditor/getFactorList.do",
				type:"POST",
				dataType:"json",
				data:params,
				success:function(res) {
					var html = "";
					html += "<ul data-factor_grp_id='"+ params.factor_grp_id +"'>";
					
					for(var i in res.factorList) {
						html += "	<li>";
						html += "		<span data-factor_id='"+ res.factorList[i].FACTOR_ID +"'>";
						html += 			res.factorList[i].FACTOR_NM;
						html += "		</span>";
						html += "	</li>";
					}
					
					html += "</ul>";
					
					$this.append(html);
					$this.css({ cursor: 'default', 'list-style-image':'url(/common/images/folder.gif)'})
					$this.find("li").css({ cursor: 'default', 'list-style-image':'url(/common/images/file.gif)'})
				}
			});
			
		});
		
		// 속성 VIEW 컬럼 클릭 이벤트
		$(document).on("click", ".attViewTree li span", function(){
			var factor_id = $(this).data("factor_id");
			
			applyRuleObj.factor_id = factor_id;
					
			$.ajax({
				url:"/ruleEditor/getFactorVal.do",
				type:"POST",
				dataType:"json",
				data:applyRuleObj,
				success:function(res) {
					var factor = res.factor;
					var dataType = factor.DATA_TYPE;
					var html = "";
					
					if(dataType === 'DATE') {
						html += "<label class='wd100p'>";
						html += "<input type='text' name='detAttrChk' placeholder='YYYY-MM-DD'>";
						html += "</input>";
						html += " ~ ";
						html += "<input type='text' name='detAttrChk' placeholder='YYYY-MM-DD'>";
						html += "</input>";
						html += "</label>";
						
					} else if(dataType === 'INT') {
						html += "<label class='wd100p'>";
						html += "<input type='number' name='detAttrChk' placeholder='숫자만 입력가능합니다.'>";
						html += "</input>";
						html += "</label>";
						
					} else {	// dataType === 'STRING'
						var factorVal = res.factorVal;
						
						for(var i in factorVal) {
							html += "<label class='wd100p'>";
							html += "	<input type='checkbox' name='detAttrChk' value='"+ factorVal[i].VAL +"'> ";
							html += 		factorVal[i].VAL;
							html += "	</input>";
							html += "</label>";
						}
					}
					
					$("#detAttrData").html(html);
					
					$("#detAttrTable").text(factor.FACTOR_GRP_NM + " > ");
					$("#detAttrTable").attr("data-factor_grp_id", factor.FACTOR_GRP_ID);
					$("#detAttrTable").attr("data-factor_grp_nm", factor.FACTOR_GRP_NM);
					$("#detAttrColumn").text(factor.FACTOR_NM);
					$("#detAttrColumn").attr("data-factor_id", factor.FACTOR_ID);
					$("#detAttrColumn").attr("data-factor_nm", factor.FACTOR_NM);
					$("#detAttrColumn").attr("data-factor_nm_en", factor.FACTOR_NM_EN);
					$("#detAttrColumn").attr("data-data_type", factor.DATA_TYPE);
				}
			});

		});
		
		// 속성추가 버튼 클릭 이벤트
		$("#attrAddBtn").click(function() {
			var factor_grp_nm = $("#detAttrTable").attr("data-factor_grp_nm");
			var factor_nm = $("#detAttrColumn").attr("data-factor_nm");
			var factor_nm_en = $("#detAttrColumn").attr("data-factor_nm_en");
			var data_type = $("#detAttrColumn").attr("data-data_type");
			
			if(data_type === 'DATE') {
				applyRuleObj.factor_val = $("input[name='detAttrChk']").eq(0).val() + "~" + $("input[name='detAttrChk']").eq(1).val();
				
			} else if(data_type === 'INT') {
				applyRuleObj.factor_val = $("input[name='detAttrChk']").val();
			
			} else {	// dataType === 'STRING'
				applyRuleObj.factor_val = $("input[name='detAttrChk']:checked").val();
			}
			
			applyRuleObj.factor_grp_nm = factor_grp_nm;
			applyRuleObj.factor_nm = factor_nm;
			applyRuleObj.factor_nm_en = factor_nm_en;
			applyRuleObj.data_type = data_type;
			
			console.log(applyRuleObj);
			
			var logical = $("input[name='logicalRadios']:checked").val();
			var logical_txt = $("input[name='logicalRadios']:checked").siblings("span").text();
			var relation = $("input[name='relationRadios']:checked").val();
			var relation_txt = $("input[name='relationRadios']:checked").siblings("span").text();
			
			
			console.log(whenMapAttr_html)
			
//			
//			var detAttrChk = $("input[name='detAttrChk']:checked");
//			var column_dataType = detAttrChk.data("column_data_type");
//				
//			// 관계연산 NONE 뒤에 추가 할 수 없음.
//			var relationChk = whenMapAttr_html[whenMapAttr_html.length-1];
//			
//			if(typeof(relationChk) != "undefined") {
//				if(!relationChk.endsWith("&&") && !relationChk.endsWith("||")) {
//					alert("관계연산이 끝난 Rule 속성 이후 추가 할 수 없습니다.");
//					return;
//				}
//			}
//			
//			// 논리연산 IN, NOT IN 선택
//			var detAttrChk_txt = "";
//			
//			if(logical == 'logical6' || logical == 'logical7') {
//				detAttrChk_txt += "("
//					
//				for(var i=0; i<detAttrChk.length; i++) {
//					detAttrChk_txt += (column_dataType == 'int' ? detAttrChk.eq(i).val() : "\""+ detAttrChk.eq(i).val() +"\"") 
//										+ (i+1 == detAttrChk.length ? "" : ", ");
//				}
//				
//				detAttrChk_txt += ")";
//			
//			// 논리연산 IN, NOT IN 이 아닌 값을 선택시
//			} else {
//				if(detAttrChk.length > 1) {
//					alert("상세 속성을 한 가지만 선택하세요.");
//					return;
//				}
//				
//				detAttrChk_txt = (column_dataType == 'int' ? detAttrChk.val() : "\""+ detAttrChk.val() +"\"");
//			}
//			
//			if(relation == 'relation3') {
//				relation_txt = "";
//			}
//			
			var ruleAttr_txt = "["+ applyRuleObj.factor_grp_nm + " : " + applyRuleObj.factor_nm + "] " + logical_txt + applyRuleObj.factor_val + " " + relation_txt;			
			
			var html = "";
			html += "<label class='wd100p'>";
			html += "	<img src='/common/images/minus.gif' alt='' class='_ruleAttrMinus'>&nbsp";
			html += "	<span>";
			html += 		ruleAttr_txt;
			html += "	</span>";
			html += "</label>";
			
			$("#ruleAttrData").append(html);
//			
//			// ---------------- applyRuleObj 값 저장 ----------------
//			applyRuleObj.logical = logical;
//			applyRuleObj.relation = relation;
//			applyRuleObj.logical_txt = logical_txt;
//			
//			if(relation == 'relation1') {
//				applyRuleObj.relation_txt = "&&"
//			} else if(relation == 'relation2') {
//				applyRuleObj.relation_txt = "||"
//			} else {
//				applyRuleObj.relation_txt = "";
//			}
//			
//			var detAttrChkArr = new Array();
//			
//			detAttrChk.each(function() {
//				detAttrChkArr.push($(this).val());
//			});
//			
//			applyRuleObj.detAttrChkArr = detAttrChkArr;
//			applyRuleObj.detAttrChk_txt = detAttrChk_txt;
//			
//			// when(Map Object) 구문 생성
//			var whenMap_html = whenGenerator(applyRuleObj);
//			whenMapAttr_html.push(whenMap_html);
//			applyRuleObj.whenMapAttr_html = whenMapAttr_html;
//			// ---------------- applyRuleObj 값 저장 ----------------
		});
		
		// Rule 속성 minus 버튼 클릭 이벤트
		$(document).on("click", "._ruleAttrMinus", function() {
			var delIdx = $("._ruleAttrMinus").index(this);
		
			whenMapAttr_html.splice(delIdx, 1);
			
			$(this).closest("label").remove();
		});
		
		// Rule 추가 버튼 이벤트
		$("#ruleAddBtn").click(function() {
			var ruleName = $("#ruleName").val();
			
			if(ruleName == '') {
				alert("Rule Name을 입력하세요.");
				return;
			}
			
			var param = {};
			param.ruleName = ruleName;
			
			// Rule name 중복 체크
			$.ajax({
				url : "/ruleEditor/ruleNameCheck.do",
				dataType : "json",
				type :"POST",
				traditional: true,
				data : JSON.stringify(param),
				contentType:'application/json; charset=utf-8',
				async:false	// ajax 통신 완료 후 return 해주기 위해 비동기 false
				
			}).done(function(res) {
				if(res == false) {
					alert("동일한 Rule Name이 존재합니다.");
					return;
				}
				
				applyRuleObj.ruleName = $("#ruleName").val();
				
				// Rule 옵션 추가
				var opt1 = $("input[name='opt1']:checked").val();
				var opt2 = $("input[name='opt2']:checked").val();
				var opt3 = $("input[name='opt3']").val() == "" ? 1 : $("input[name='opt3']").val();
				
				applyRuleObj.opt1 = opt1;
				applyRuleObj.opt2 = opt2;
				applyRuleObj.opt3 = opt3;
				
				// rule drl 생성
				var ruleGenStr = ruleGenerator(applyRuleObj); // (/js/manager/ruleEditor/drlGenerator.js)

				if("-1" == ruleGenStr) {
					alert("룰 속성 정의가 올바르지 않습니다.\n마지막 속성은 NONE으로 설정하세요.");
					return;
					
				} else if("" == ruleGenStr) {
					alert("룰 속성을 먼저 추가 하세요.");
					return;
				}
				
				applyRuleObj.ruleGenStr = ruleGenStr;
				
				alert("RULE : " + ruleName + " 이 추가 되었습니다.");
				initObj();
				
			}).fail(function(jqXHR, textStatus, errorThrown) {
				console.log("에러")
				console.log(jqXHR)
				console.log(textStatus)
				console.log(errorThrown)
			});
		});
		
		// generate 버튼 클릭 이벤트
		$("#drlGenBtn").click(function() {
			drl_html = drlGenerator(applyRuleObj);	// (/js/manager/ruleEditor/drlGenerator.js)
			
			$("#drlGenData").html(drl_html);
		});
		
		function initObj() {
			$("#ruleAttrData").html("");
			$("#ruleName").val("");
			$("#detAttrData").html("");
			$("#detAttrTable").text("속성을 선택하세요.");
			$("#detAttrColumn").text("");
			whenMapAttr_html = [];
		}
		
		// 룰 저장 버튼 이벤트
		$("#ruleSaveBtn").click(function() {
			drl_html = drlGenerator(applyRuleObj);	// (/js/manager/ruleEditor/drlGenerator.js)
			applyRuleObj.drl_html = drl_html;
			
			$.ajax({
				method : "POST",
				url : "/ruleEditor/ruleSave.do",
				traditional: true,
				data : JSON.stringify(applyRuleObj),
				contentType:'application/json; charset=utf-8',
				dataType : "json"
				
			}).done(function(res) {
				console.log(res);
				
			}).fail(function(jqXHR, textStatus, errorThrown) {
				console.log("에러")
				console.log(jqXHR)
				console.log(textStatus)
				console.log(errorThrown)
			});
		});


		
		
		
		
		
		
		
		
		
		
		
		
		// ---------------------------------------------- 룰 테스트 버튼
		$("#ruleTestBtn").click(function() {
			showPopup(true);
		});
		
		$("#testBtn").click(function() {
			var custAccNo = $("input[name='testUrl']").val();
			
			if(custAccNo == "") {
				alert("CUST_ACC_NO 를 입력하세요.");
				return;
			}
			
			$.ajax({
				url:"/ruleEditor/test.do",
				type :"GET",
				data:{"CUST_ACC_NO":custAccNo},
				
			}).done(function(res) {
				var msg = "";
				for(var i in res) {
					msg += res[i] + "\n";
				}
				
				alert(msg);
				
				$("input[name='testUrl']").val("");
				
			}).fail(function(jqXHR, textStatus, errorThrown) {
				console.log("에러")
				console.log(jqXHR)
				console.log(textStatus)
				console.log(errorThrown)
			});
		});
	});
