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
																<label id="req_url">http://localhost:8080/targetai/api/request.do</label>
																<button type="button" id="apiRequestBtn" class="btn btn-sm btn-green">Request</button>
															</td>
														</tr>
														<tr>
															<th class="t_left">접속 정보</th>
															<td class="t_left">
																* method = "POST"<br/>
																* type = "json"<br/>
																1. req_url(요청URL)<br/>
																2. api_type(CUST/CONT/COMB)<br/>
																3. param_val(type 해당하는 key값)<br/>
																4. svc_id(RULE 서비스할 아이디)<br/>
															</td>
														</tr>
														<tr>
															<th class="t_left">Type</th>
															<td class="t_left">
																<select name="api_type" class="wd150px">
																	<option value="" >선택하세요</option>
																	<option value="CUST" selected>CUST</option>
																	<option value="CONT">CONT</option>
																	<option value="COMB">COMB</option>
																</select>
															</td>
														</tr>
														<tr>
															<th class="t_left">VALUE</th>
															<td class="t_left">
																<input type="text" class="wd250px" name="param_val" value="ACC_CUST_SROW_ID_1" />
															</td>
														</tr>
														<tr>
															<th class="t_left">서비스 아이디</th>
															<td class="t_left">
																<input type="text" class="wd250px" name="svc_id" value="112" />
															</td>
														</tr>
														<tr>
															<th class="t_left">결과</th>
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