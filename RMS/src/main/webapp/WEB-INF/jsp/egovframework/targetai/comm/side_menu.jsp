<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!-- 좌측영역 -->
<div class="left-side-menu">
	<div class="h-100" >
		<div class="sidebar-content">
			<div class="sidebar-icon-menu h-100" data-simplebar>
				<!-- CI -->
				<a href="#" class="logo">
					<span>
						<img src="/targetai_publish/images/logo-sm-light.png" alt="Target AI CI" />
					</span>
				</a>
				<!-- //CI -->
				<!--- 좌측메뉴 1depth -->
				<nav class="nav flex-column" id="two-col-sidenav-main">
					<a class="nav-link" href="#rulemanager" title="Rule Manager">
						<i class="fas fa-cube"></i>
						<span class="nav-txt">RM</span>
					</a>
				</nav>
				<!--- //좌측메뉴 1depth -->
			</div>
			<!--- 좌측메뉴 2depth -->
			<div class="sidebar-main-menu">
				<div id="two-col-menu" class="h-100" data-simplebar>
					<div class="twocolumn-menu-item d-block" id="rulemanager">
						<div class="title-box">
							<h5 class="menu-title">Rule Manager</h5>
							<ul class="nav flex-column">
								<li class="nav-item">
									<a class="nav-link" href="/targetai/dashboard.do">Dashboard</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="/targetai/svc.do">Service</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="/targetai/pkg.do">Package</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="/targetai/rule.do">Rule</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="/targetai/inheritance.do">상속 정보</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="/targetai/api.do" id="">API</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="/targetai/setting.do" id="">Setting</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="clearfix"></div>
			<!--- //좌측메뉴 2depth -->
		</div>
	</div>
</div>
<!-- //좌측영역 -->