/**
 * 로그인 js
 */

$(document).ready(function() {
	
	$("#loginBtn").click(function(e) {
		e.preventDefault();
		
//		var form = $("#loginForm")[0];
//		var formData = new FormData(form);
		var formData = $("#loginForm").serialize();
		
		if($("#id").val() === '') {
			$("#id").focus();
			return;
		}
		
		if($("#passwd").val() === '') {
			$("#passwd").focus();
			return;
		}
		
		$.ajax({
			method : "POST",
			url : "/targetai/loginCheck.do",
			data : formData,
			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
			processData : true,
			cache : false,
			success : function(res) {
				if(res) {
					$("#loginForm").submit();
				} else {
					$(".wrongTxt").show();
				}
			},
			error : function(jqXHR, textStatus, errorThrown) {
				alert("관리자에게 문의하세요");
				console.log(jqXHR);
				console.log(textStatus);
				console.log(errorThrown);
			}
		});
	});
});