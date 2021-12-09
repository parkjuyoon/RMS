<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<title>Target AI</title>
	<link rel="shortcut icon" href="/targetai_publish/images/favicon.ico" />
	
	<style type="text/css">
		@font-face {
			font-family:"Cerebri Sans,sans-serif";
			src:url("/targetai_publish/fonts/cerebrisans-light.eot");
			src:local("Cerebri-sans Light"), url("/targetai_publish/fonts/cerebrisans-light.woff") format("woff");
			font-weight:300;
		}
		html, body {height:100%; background:url("/targetai_publish/images/login_bg01.jpg") no-repeat center center; -webkit-background-size:cover; -moz-background-size:cover; -o-background-size:cover; background-size:cover; overflow-y:hidden;}
		html, body, select, input, textarea {font-size:18px; color:#444; font-family:"Cerebri Sans,sans-serif"; letter-spacing:-0.05em;}		
		.wrap {position:absolute; top:50%; left:50%; width:440px; margin-top:-220px; margin-left:-220px; height:440px; background-color:rgba(255, 255, 255, 0.8); border-radius:10px;}
		.wrap .wrap_box {width:370px; height:350px; margin:50px 0 0 35px;}
		.wrap .wrap_input {margin:25px 0 0 0;}
		input:focus {outline:none;}		
		.wrap .wrap_input .input_id input {width:353px; margin:0 0 15px 0; border-radius:4px; border:1px solid #ced4da; line-height:30px; height:30px; padding:8px 5px 8px 10px; font-size:16px;}
		.wrap .wrap_input .input_pw input {width:353px; border-radius:4px; border:1px solid #ced4da; line-height:30px; height:30px; padding:8px 5px 8px 10px; font-size:16px;}	
		.wrap .wrap_input .input_ck {margin:22px 0 0 0; font-size:12px;}
		.wrap .wrap_input .input_ck input {position:relative; top:-1px; vertical-align:middle; margin:0 5px 0 0;}
		.wrap .wrap_input .input_login button {width:370px; background-color:#25b5b5; color:#ffffff; margin:35px 0 0 0; border-radius:4px; line-height:30px; padding:8px 5px 8px 5px; border:1px solid #25b5b5; font-size:16px; cursor:pointer;}
		.wrongTxt {float: right; color: red; display: none;}
	</style>
	
	<!-- Default/tree js-->
	<script src="/targetai_publish/js/jquery-3.6.0.min.js" type="text/javascript"></script>
	<script src="/targetai/js/login.js" type="text/javascript"></script>
</head>
<body>
	<form id="loginForm" action="/targetai/login/login.do" method="post">
		<div class="wrap">
			<div class="wrap_box">
				<div><img src="/targetai_publish/images/login_logo.png" alt="Target AI" /></div>
				<!-- 로그인정보 -->
				<div class="wrap_input">
					<div class="input_id">
						<input type="text" id="id" name="id" maxlength="15" size="15" value="admin" placeholder="ID" />
					</div>
					<div class="input_pw">
						<input type="password" id="passwd" name="passwd" maxlength="15" size="15" value="New1234!" placeholder="PW" />
					</div>
					<div class="cb"></div>
					<div class="input_ck">
						<input type="checkbox" name="" value="" />아이디 저장
						<span class="wrongTxt">사용자 정보가 없습니다.</span>
					</div>
					<div class="input_login">
						<button id="loginBtn">로그인</button>
					</div>
				</div>
				<!-- //로그인정보 -->
			</div>
		</div>
	</form>
</body>
</html>