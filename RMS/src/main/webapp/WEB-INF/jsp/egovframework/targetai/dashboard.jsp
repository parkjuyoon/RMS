<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<%@ include file="../targetai/comm/header.jsp"%>

<style type="text/css">
	#screenBoard {
		margin: 0 auto;
		padding: 10px 0;
		width: 100%;
	}
	
	#screenBoard .area {
		display: table;
		margin: 0;
		padding: 0;
		table-layout: fixed;
		width: 100%;
		text-align: center;
	}
	
	#screenBoard li {
		display: table-cell;
		list-style: none;
	}
	
	#screenBoard .ibText {
		margin-left: 60px;
		color: #FAC6C6;
		font-size: 20px;
	}
	
	#screenBoard .obText {
		margin-left: 60px;
		color: #B8D7FF;
		font-size: 20px;
	}
	
	#screenBoard .title li.item {
		font-weight: bold;
		text-align: center;
		line-height: 30px;
	}
	
	#screenBoard .ib_contents li.item {
		border: 1px solid #dcdcdc;
		border-radius: 10px;
		background-color: #FAC6C6;
		color: #464646;
		text-align: center;
		line-height: 40px;
	}
	
	#screenBoard .ob_contents li.item {
		border: 1px solid #dcdcdc;
		border-radius: 10px;
		background-color: #B8D7FF;
		color: #464646;
		text-align: center;
		line-height: 40px;
	}
	
	#screenBoard ul:before {
		display: table-cell;
		content: '';
	}
	
	#screenBoard ul:after {
		display: table-cell;
		content: '';
	}
</style>
</head>
<body class="loading" data-layout-mode="two-column"
	data-layout='{"mode": "light", "width": "fluid", "menuPosition": "fixed", "sidebar": { "color": "light", "size": "default", "showuser": false}, "topbar": {"color": "light"}, "showRightSidebarOnPageLoad": false}'>

	<div id="wrapper">
		<%@ include file="../targetai/comm/navbar.jsp"%>
		<%@ include file="../targetai/comm/side_menu.jsp"%>
		<%@ include file="../targetai/comm/alertPop.jsp"%>

		<!-- 본문영역 -->
		<div class="content-page">
			<div class="content">
				<div class="container-fluid">
					<!-- 본문제목,페이지경로 -->
					<header class="page-header custom-con-header">
						<h2>대시보드</h2>
						<div class="right-wrapper t_right mg_r30">
							<ol class="breadcrumbs">
								<li>
									<a href="#">
										<i class="icons icon-home"></i>
									</a>
								</li>
								<li>
									<span>Dashboard</span>
								</li>
							</ol>
						</div>
					</header>
					<!-- //본문제목,페이지경로 -->
					<!-- 그래프영역 -->
					<div class="row">
						<div class="col">
							<!-- ※닫힘(기본정의): 1.class="card card-collapsed", 2.class="card-body" style="display:none;" 등 정의합니다. -->
							<div class="card" id="">
								<header class="card-header card-header-pd-mobile">
									<div class="card-actions card-header-position-mobile">
										<a href="#" id="" class="card-action card-action-toggle"></a>
									</div>
									<h2 class="card-title_txt">실시간 캠페인 현황 (<label id="campaignInfoDate">2021.11.15 2주차</label>)</h2>
								</header>
								<!-- 본문페이지 -->
								<div class="card-body" id="">
									<div class="progress_loading" style="display: none;">
										<div id="chartLoading">
											<img src="/targetai_publish/images/ajax-loader1.gif" />
										</div>
									</div>
									<!-- 전광판 -->
									<div id="screenBoard">
										<ul class="area title">
											<li class="item">
												NOW<div>15:20:10 ~ 15:20:45</div>
											</li>
											<li></li>
											<li class="item">TODAY<div>15:20:45</div></li>
											<li></li>
											<li class="item">WEEK<div>금요일</div></li>
											<li></li>
											<li class="item">MONTH<div>2021.07</div></li>
										</ul>
										<h3 class="ibText">IN Bound</h3>
										<ul class="area ib_contents">
											<li class="item">100,000<div>10%</div></li>
											<li></li>
											<li class="item">100,000<div>10%</div></li>
											<li></li>
											<li class="item">100,000<div>10%</div></li>
											<li></li>
											<li class="item">100,000<div>10%</div></li>
										</ul>
										<h3 class="obText">Out Bound</h3>
										<ul class="area ob_contents">
											<li class="item">100,000<div>10%</div></li>
											<li></li>
											<li class="item">100,000<div>10%</div></li>
											<li></li>
											<li class="item">100,000<div>10%</div></li>
											<li></li>
											<li class="item">100,000<div>10%</div></li>
										</ul>
									</div>
									<!-- //라인차트 -->
								</div>
								<!-- //본문페이지 -->
							</div>
						</div>
					</div>
					<!-- //그래프드영역 -->
					<!-- 그래프영역 -->
					<div class="row">
						<div class="col">
							<!-- ※닫힘(기본정의): 1.class="card card-collapsed", 2.class="card-body" style="display:none;" 등 정의합니다. -->
							<div class="card" id="">
								<header class="card-header card-header-pd-mobile">
									<div class="card-actions card-header-position-mobile">
										<a href="#" id="" class="card-action card-action-toggle"></a>
									</div>
									<h2 class="card-title_txt">채널별 인입 현황</h2>
								</header>
								<!-- 본문페이지 -->
								<div class="card-body" id="">
									<div class="progress_loading">
										<div class="chartLoading">
											<img src="/targetai_publish/images/ajax-loader1.gif" />
										</div>
									</div>
									<!-- 라인차트 -->
									<div class="panel bd_b_none nobordertop">
<!-- 										<div id="ib_chart_div" style="height: 350px;"></div> -->
										<canvas id="ib_chart_canvas" style="height: 40vh; width: 86vw;"></canvas>
									</div>
									<!-- //라인차트 -->
								</div>
								<!-- //본문페이지 -->
							</div>
						</div>
					</div>
					<!-- //그래프드영역 -->
					<!-- 그래프영역 -->
					<div class="row">
						<div class="col">
							<!-- ※닫힘(기본정의): 1.class="card card-collapsed", 2.class="card-body" style="display:none;" 등 정의합니다. -->
							<div class="card" id="">
								<header class="card-header card-header-pd-mobile">
									<div class="card-actions card-header-position-mobile">
										<a href="#" id="" class="card-action card-action-toggle"></a>
									</div>
									<h2 class="card-title_txt">채널별 추천 현황</h2>
								</header>
								<!-- 본문페이지 -->
								<div class="card-body" id="">
									<div class="progress_loading">
										<div class="chartLoading">
											<img src="/targetai_publish/images/ajax-loader1.gif" />
										</div>
									</div>
									<!-- 라인차트 -->
									<div class="panel bd_b_none nobordertop">
<!-- 										<div id="ob_chart_div" style="height: 350px;"></div> -->
										<canvas id="ob_chart_canvas" style="height: 40vh; width: 86vw;"></canvas>
									</div>
									<!-- //라인차트 -->
								</div>
								<!-- //본문페이지 -->
							</div>
						</div>
					</div>
					<!-- //그래프드영역 -->
				</div>
			</div>
		</div>
		<!-- //본문영역 -->
	</div>
	
<!-- App js-->
<script type="text/javascript" src="/targetai/js/comm/chartJS/chart.js"></script>
<script src="/targetai/js/dashboard.js"></script>
<script src="/targetai_publish/js/app.js" type="text/javascript"></script>
<script src="/targetai_publish/libs/jquery-ui/jquery-ui.js" type="text/javascript"></script>

</body>
</html>