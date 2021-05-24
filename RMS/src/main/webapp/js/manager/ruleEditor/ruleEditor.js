/**
 * 
 */

$(document).ready(function() {
		
		var pkgId = $("#pkgId").val();
		var ruleOpt = {};
		var ruleName = "";
		var ruleObj = {};	// Rule 속성에 추가된 한개의 rule
		var ruleArr = new Array();	// Rule 속성에 정의된 목록
		var drlSource = ""; // 최종 생성된 drl
			
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
				factor_grp_id : $this.data("factor_grp_id")
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
			var params = {
				factor_id : $(this).data("factor_id")
			};
					
			$.ajax({
				url:"/ruleEditor/getFactorVal.do",
				type:"POST",
				dataType:"json",
				data:params,
				success:function(res) {
					var factor = res.factor;
					var dataType = factor.DATA_TYPE;
					var html = "";
					
					if(dataType === 'DATE') {
						html += "<label class='wd100p'>";
						html += "	<input type='date' name='detAttrChk' placeholder='YYYY-MM-DD'>";
						html += "	</input>";
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
			var factor_grp_id = $("#detAttrTable").attr("data-factor_grp_id");
			var factor_id = $("#detAttrColumn").attr("data-factor_id");
			var factor_grp_nm = $("#detAttrTable").attr("data-factor_grp_nm");
			var factor_nm = $("#detAttrColumn").attr("data-factor_nm");
			var factor_nm_en = $("#detAttrColumn").attr("data-factor_nm_en");
			var data_type = $("#detAttrColumn").attr("data-data_type");
			var logical = $("input[name='logicalRadios']:checked").val();
			var logical_txt = $("input[name='logicalRadios']:checked").siblings("span").text();
			var relation = $("input[name='relationRadios']:checked").val();
			var relation_txt = $("input[name='relationRadios']:checked").siblings("span").text();
			var factorVal_Tag = "";
			
			if(data_type === 'STRING') {
				factorVal_Tag = $("input[name='detAttrChk']:checked");
				
			} else {
				factorVal_Tag = $("input[name='detAttrChk']");
			}
			
			// 관계연산 NONE 뒤에 추가 할 수 없음.
			if(ruleObj.relation_txt == "") {
				alert("관계연산이 끝난 Rule 속성 이후 추가 할 수 없습니다.");
				return;
			}
			
			// 논리연산 IN, NOT IN 선택
			var factorVal = "";
			
			if(logical == 'logical6' || logical == 'logical7') {
				factorVal += "("
				
				for(var i=0; i<factorVal_Tag.length; i++) {
					factorVal += (data_type == 'INT' ? factorVal_Tag.eq(i).val() : "\""+ factorVal_Tag.eq(i).val() +"\"") 
					+ (i+1 == factorVal_Tag.length ? "" : ", ");
				}
				
				factorVal += ")";
			
			// 논리연산 IN, NOT IN 이 아닌 값을 선택시
			} else {
				if(factorVal_Tag.length > 1) {
					alert("상세 속성을 한 가지만 선택하세요.");
					return;
				}
				
				factorVal = (data_type == 'INT' ? factorVal_Tag.eq(0).val() : "\""+ factorVal_Tag.eq(0).val() +"\"");
			}
			
			if(relation == 'relation3') {
				relation_txt = "";
			}
			
			var ruleAttr_txt = "["+ factor_grp_nm + " : " + factor_nm + "] " + logical_txt + factorVal + " " + relation_txt;			
			
			var html = "";
			html += "<label class='wd100p'>";
			html += "	<img src='/common/images/minus.gif' alt='' class='_ruleAttrMinus'>&nbsp";
			html += "	<span>";
			html += 		ruleAttr_txt;
			html += "	</span>";
			html += "</label>";
			
			$("#ruleAttrData").append(html);
			
			// ---------------- ruleObj 값 저장 ----------------
			ruleObj = {};
			ruleObj.factor_grp_id = factor_grp_id;
			ruleObj.factor_id = factor_id;
			ruleObj.factor_grp_nm = factor_grp_nm;
			ruleObj.factor_nm = factor_nm;
			ruleObj.factor_nm_en = factor_nm_en;
			ruleObj.data_type = data_type;
			ruleObj.logical = logical;
			ruleObj.logical_txt = logical_txt;
			ruleObj.relation = relation;
			ruleObj.relation_txt = relation_txt;
			ruleObj.factorVal = factorVal;
			
			if(relation == 'relation1') {
				ruleObj.relation_txt = "&&"
					
			} else if(relation == 'relation2') {
				ruleObj.relation_txt = "||"
					
			} else {
				ruleObj.relation_txt = "";
			}
//			
			var factorValArr = new Array();
			
			factorVal_Tag.each(function() {
				factorValArr.push($(this).val());
			});
			
			ruleObj.factorValArr = factorValArr;
			ruleArr.push(ruleObj);
			// ---------------- ruleObj 값 저장 ----------------
			
		});
		
		// generate 버튼 클릭 이벤트
		$("#drlGenBtn").click(function() {
			// Rule 옵션 추가
			var opt1 = $("input[name='opt1']:checked").val();
			var opt2 = $("input[name='opt2']:checked").val();
			var opt3 = $("input[name='opt3']").val() == "" ? 1 : $("input[name='opt3']").val();
			
			ruleOpt.opt1 = opt1;
			ruleOpt.opt2 = opt2;
			ruleOpt.opt3 = opt3;
			
			// Rule name 추가
			ruleName = $("#ruleName").val();
			
			if(ruleName == '') {
				alert("Rule Name을 입력하세요.");
				return;
			}
			
			var param = {};
			param.ruleName = ruleName;
			param.pkgId = pkgId;
			
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
				
				if(ruleArr.length < 1) {
					alert("룰 속성을 먼저 추가 하세요.");
					return;
				}
				
				if(ruleObj.relation_txt != "") {
					alert("룰 속성 정의가 올바르지 않습니다.\n마지막 속성은 NONE으로 설정하세요.");
					return;
				}
				
				var drl_html = drlGenerator(ruleOpt, ruleName, ruleArr);	// (/js/manager/ruleEditor/drlGenerator.js)
				$("#drlGenData").html(drl_html);
				drlSource = drl_html;
				
			}).fail(function(jqXHR, textStatus, errorThrown) {
				console.log("에러")
				console.log(jqXHR)
				console.log(textStatus)
				console.log(errorThrown)
			});
		});
		
		// Rule 속성 minus 버튼 클릭 이벤트
		$(document).on("click", "._ruleAttrMinus", function() {
			var delIdx = $("._ruleAttrMinus").index(this);
		
			ruleArr.splice(delIdx, 1);
			
			$(this).closest("label").remove();
			
			ruleObj = {};
		});
		
		// 룰 저장 버튼 이벤트
		$("#ruleSaveBtn").click(function() {
			if(drlSource === "") {
				alert("DRL을 먼저 생성한 후 저장하세요.");
				return;
			}
			
			var param = {};
			param.pkgId = pkgId;
			param.ruleNm = ruleName;
			param.ruleOpt = ruleOpt;
			param.ruleArr = ruleArr;
			param.drlSource = drlSource;
			
			$.ajax({
				method : "POST",
				url : "/ruleEditor/ruleSave.do",
				traditional: true,
				data : JSON.stringify(param),
				contentType:'application/json; charset=utf-8',
				dataType : "json"
				
			}).done(function(res) {
				alert("Rule이 저장되었습니다.");
				initObj();
				
			}).fail(function(jqXHR, textStatus, errorThrown) {
				console.log("에러")
				console.log(jqXHR)
				console.log(textStatus)
				console.log(errorThrown)
			});
		});
		
		function initObj() {
			$("#ruleAttrData").html("");
			$("#ruleName").val("");
			$("#detAttrData").html("");
			$("#detAttrTable").text("속성을 선택하세요.");
			$("#detAttrColumn").text("");
			$("#drlGenData").text("");
			ruleObj = {};
			ruleArr = [];
			ruleName = "";
			ruleOpt = {};
			drlSource = "";
		}
		
		
		
		
		
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
