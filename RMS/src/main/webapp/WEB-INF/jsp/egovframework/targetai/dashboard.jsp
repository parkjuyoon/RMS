<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<%@ include file="../targetai/comm/header.jsp"%>
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
									<h2 class="card-title_txt">그래프</h2>
								</header>
								<!-- 본문페이지 -->
								<div class="card-body" id="">
									<div class="progress_loading">
										<div id="">
											<img src="/targetai_publish/images/ajax-loader1.gif" />
										</div>
									</div>
									<!-- 라인차트 -->
									<div class="panel bd_b_none nobordertop">
										<div id="chart_div" style="height: 500px;"></div>
									</div>
									<!-- //라인차트 -->
								</div>
								<!-- //본문페이지 -->
							</div>
						</div>
					</div>
					<!-- //그래프드영역 -->
					<!-- 그리드영역 -->
					<div class="row">
						<div class="col">
							<!-- ※닫힘(기본정의): 1.class="card card-collapsed", 2.class="card-body" style="display:none;" 등 정의합니다. -->
							<div class="card" id="">
								<header class="card-header card-header-pd-mobile">
									<div class="card-actions card-header-position-mobile">
										<span class="infonum"> <span class="txt_color_blue mg_l5 mg_r5" id="ruleCntBySearch"></span>건
										</span>
										<a href="#" id="ruleListCardOpen" class="card-action card-action-toggle"></a>
									</div>
									<h2 class="card-title_txt">상세</h2>
								</header>
								<!-- 본문페이지 -->
								<div class="card-body" id="">
									<div class="progress_loading">
										<div id="ruleLoading" style="display: none;">
											<img src="/targetai_publish/images/ajax-loader1.gif" />
										</div>
									</div>
									<!-- 테이블 -->
									<div class="panel bd_b_none nobordertop">
										<table class="tb_type01">
											<colgroup>
												<col style="width: 5%;" />
												<col style="width: 10%;" />
												<col style="width: auto;" />
												<col style="width: 12%;" />
												<col style="width: 12%;" />
												<col style="width: 10%;" />
												<col style="width: 12%;" />
												<col style="width: 10%;" />
											</colgroup>
											<thead>
												<tr>
													<th>
														<div class="checkbox-container">
															<input type="checkbox" id="ruleListAllChkBox" /> <label for="ruleListAllChkBox"></label>
														</div>
													</th>
													<th>ID</th>
													<th>파라미터<label class="_sortable"></label></th>
													<th>IO Flag</th>
													<th>응답 코드</th>
													<th>등록일자</th>
													<th>최근 수정일자<label class="_sortable"></label></th>
													<th>최근 수정자</th>
												</tr>
											</thead>
											<tbody id="">
												<tr>
													<td>
														<div class="checkbox-container">
															<input type="checkbox" id="" /> <label for="ruleListAllChkBox"></label>
														</div>
													</td>
													<td>1</td>
													<td>param1</td>
													<td>Input</td>
													<td>호출 건수</td>
													<td>2021-11-01 14:34:00</td>
													<td>2021-11-01 14:34:00</td>
													<td>박주윤</td>
												</tr>
											</tbody>
										</table>
									</div>
									<!-- //테이블 -->

									<!-- 페이징 -->
									<div class="custom-paging" id="ruleListPaging"></div>
									<!-- //페이징 -->

									<!-- 버튼 -->
									<div class="card-actions-foot">
										<button type="button" class="btn btn-sm btn-gray" id="delRuleBtn">
											<i class="far fa-trash-alt custom-btn-i"></i> 삭제
										</button>
										<button type="button" class="btn btn-sm btn-green" id="addNewRuleBtn">
											<i class="el el-file-new custom-btn-i"></i> 신규 RULE 생성
										</button>
									</div>
									<!-- //버튼 -->
								</div>
								<!-- //본문페이지 -->
							</div>
						</div>
					</div>
					<!-- //그리드영역 -->
				</div>
			</div>
		</div>
		<!-- //본문영역 -->
	</div>
	
<!-- App js-->
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script src="/targetai/js/dashboard.js"></script>
<script src="/targetai_publish/js/app.js" type="text/javascript"></script>
<script src="/targetai_publish/libs/jquery-ui/jquery-ui.js" type="text/javascript"></script>

</body>
</html>