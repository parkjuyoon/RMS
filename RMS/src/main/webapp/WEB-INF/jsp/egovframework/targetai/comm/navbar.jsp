<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!-- 사용자,로그아웃 -->
<div class="navbar-custom">
	<div class="container-fluid">
		<ul class="list-unstyled topnav-menu float-end mb-0">
			<li>
				<a href="#" class="notification-icon bg_01">
					<span class="icon01" id="nav_member_name"><%=session.getAttribute("member_name") %></span>
				</a>
			</li>
			<li>
				<a href="/targetai/login/logout.do" class="notification-icon bg_02">
					<span class="icon02">LogOut</span>
				</a>
			</li>
		</ul>
		<!-- 로고 -->
		<div class="logo-box">
			<a href="login.html" class="logo logo-dark text-center">
				<span class="logo-lg">
					<img src="/targetai_publish/images/logo.png" alt="Target AI" />
				</span>
			</a>
		</div>
		<div class="clearfix"></div>
	</div>
</div>
<!-- //사용자,로그아웃 -->
