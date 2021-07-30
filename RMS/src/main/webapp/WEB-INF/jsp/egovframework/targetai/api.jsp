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
						<h2>API</h2>
						<div class="right-wrapper t_right mg_r30">
							<ol class="breadcrumbs">
								<li>
									<a href="#">
										<i class="icons icon-home"></i>
									</a>
								</li>
								<li>
									<span>API</span>
								</li>
								<li>
									<span>API Request/Response</span>
								</li>
							</ol>
						</div>
					</header>
					<!-- //본문제목,페이지경로 -->

					<form name="api_form" action="#" method="post">
						<!-- 상세영역 -->
						<div class="row">
							<div class="col">
								<!-- ※닫힘(기본정의): 1.class="card card-collapsed", 2.class="card-body" style="display:none;" 등 정의합니다. -->
								<div class="card" id="">
									<header class="card-header card-header-pd-mobile">
										<h2 class="card-title_txt">API Request/Response</h2>
									</header>
									<!-- 본문페이지 -->
									<div class="card-body" id="" >
										<div class="progress_loading" id="apiLoading" style="display: none;">
											<img src="/targetai_publish/images/ajax-loader1.gif" />
										</div>
										<!-- 테이블 -->
										<div class="panel nobordertop">
											<div class="sform_head">
												<table class="sform_type">
													<colgroup>
														<col style="width: 180px" />
														<col style="width: auto" />
													</colgroup>
													<tbody>
														<tr>
															<th class="t_left">Request URL</th>
															<td class="t_left">
																<label id="req_url">${rootDomain}/targetai/api/request.do</label>
																<button type="button" id="apiRequestBtn" class="btn btn-sm btn-green">Request</button>
															</td>
														</tr>
														<tr>
															<th class="t_left">TARGET TYPE</th>
															<td class="t_left">
																<select name="api_type" class="wd150px">
																	<option value="CUST" selected>CUST</option>
																	<option value="CONT">CONT</option>
																	<option value="COMB">COMB</option>
																</select>
															</td>
														</tr>
														<tr>
															<th class="t_left">CUST ID</th>
															<td class="t_left">
																<input type="text" class="wd250px" name="param_val" value="SRC_CUST_SORC_ID_1" />
															</td>
														</tr>
														<tr>
															<th class="t_left">SERVICE ID</th>
															<td class="t_left">
																<input type="text" class="wd250px" name="svc_id" value="121" />
															</td>
														</tr>
														<tr>
															<th class="t_left">RESPONSE</th>
															<td class="t_left">
																<textarea rows="15" cols="7" class="txtsize_100 wd100" id="resultArea" style="white-space: pre;" readonly="readonly"></textarea>
															</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
										<!-- //테이블 -->
									</div>
									<!-- //본문페이지 -->
								</div>
							</div>
						</div>
						<!-- //상세영역 -->
					</form>
				</div>
			</div>
		</div>
	</div>
	
<!-- App js-->
<script src="/targetai/js/api.js"></script>
<script src="/targetai_publish/js/app.js" type="text/javascript"></script>
<script src="/targetai_publish/libs/jquery-ui/jquery-ui.js" type="text/javascript"></script>

</body>
</html>