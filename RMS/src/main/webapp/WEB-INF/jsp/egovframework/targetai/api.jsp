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

		<!-- 서비스 선택 팝업 -->
		<div id="selectSvcPop" class="modal_pop">
			<div class="modal_content" style="width:1000px;">
				<!-- 팝업항상중앙띄우기 -->
				<div class="modla_center">
					<div class="modal_header">
						<span class="close" onclick="close_layerPop('selectSvcPop');">&times;</span>
						<h2>서비스 선택</h2>
					</div>
					<!-- 본문 -->
					<div class="modal_body" style="height:calc(100% - 25vh); overflow-x:hidden; overflow-y:auto;">
						<div class="modal_wrap">
							<!-- 상세영역 -->
							<div class="row">
								<div class="col">
									<div class="card mg_b0">
										<header class="card-header card-header-pd-mobile">
											<div class="card-actions card-header-position-mobile">
											</div>
											<h2 class="card-title_txt">서비스 조회</h2>
										</header>
										<!-- 본문페이지 -->
										<div class="card-body" style="">
											<div class="progress_loading">
												<div id="selectSvcPop_Loading">
													<img src="/targetai_publish/images/ajax-loader1.gif" />
												</div>
											</div>
											<!-- 조회 -->
											<div class="searcharea">
												<div class="search_btn-bottom">
													<button type="button" class="mg_t4 mg_r4 btn btn-sm btn-darkblue" id="selectSvcPop_SearchBtn">
														<i class="fas fa-search custom-btn-i"></i>조회
													</button>
												</div>
												<div class="search_input">
													<div class="search_col">
														<div class="form_group">
															<label for="">서비스 명</label>
															<input type="text" class="wd150px" id="selectSvcPop_svcNm" value="" />
														</div>
													</div>
												</div>
											</div>
											<!-- //조회 -->

											<!-- 테이블 -->
											<div class="mg_t20 panel bd_b_none nobordertop">
												<table class="tb_type01">
													<colgroup>
														<col style="width:8%;" />
														<col style="width:15%;" />
														<col style="width:30%;" />
														<col style="width:auto;" />
													</colgroup>
													<thead>
														<tr>
															<th></th>
															<th>서비스 아이디</th>
															<th>서비스 명</th>
															<th>버전</th>
															<th>DRL</th>
														</tr>
													</thead>
													<tbody id="selectSvcPop_svcList"></tbody>
												</table>
											</div>
											<!-- //테이블 -->

											<!-- 페이징 -->
											<div class="custom-paging" id="selectSvcPop_paging"></div>
											<!-- //페이징 -->

											<!-- 버튼 -->
											<div class="card-actions-foot">
												<button type="button" class="btn btn-sm btn-gray" onclick="close_layerPop('selectSvcPop');"><i class="far fa-times-circle custom-btn-i"></i> 취소</button>
												<button type="button" class="btn btn-sm btn-green" id="selectSvcPop_saveBtn"><i class="far fa-check-circle custom-btn-i"></i> 적용</button>
											</div>
											<!-- //버튼 -->
										</div>
										<!-- //본문페이지 -->
									</div>
								</div>
							</div>
							<!-- //상세영역 -->
						</div>
					</div>
					<!-- //본문 -->
				</div>
				<!-- //팝업항상중앙띄우기 -->
			</div>
		</div>
		<!-- // 서비스 선택 팝업 -->

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
									<span>API 요청/응답</span>
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
										<h2 class="card-title_txt">API 요청/응답</h2>
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
															<th class="t_left">요청 URL</th>
															<td class="t_left">
																<label id="req_url">${rootDomain}/targetai/api/request.do</label>
																<button type="button" id="apiRequestBtn" class="btn btn-sm btn-green">Request</button>
															</td>
														</tr>
														<tr>
															<th class="t_left">타겟 유형</th>
															<td class="t_left">
																<select name="api_type" class="wd150px">
																	<option value="CUST" selected>고객</option>
																	<option value="CONT">계약</option>
																	<option value="COMB">결합</option>
																</select>
															</td>
														</tr>
														<tr>
															<th class="t_left">고객 아이디</th>
															<td class="t_left">
																<input type="text" class="wd250px" name="param_val" value="SRC_CUST_SORC_ID_1" />
															</td>
														</tr>
														<tr>
															<th class="t_left">서비스 아이디</th>
															<td class="t_left">
																<select name="selectSvcStatus" class="wd150px">
																	<option value="dev" selected>개발중</option>
																	<option value="real">운영중</option>
																</select>
																<input type="text" class="wd250px" name="selectedSvcNm" readonly="readonly" placeholder="서비스를 선택하세요." />
																<button type="button" id="selectSvcBtn" class="btn btn-sm btn-green">서비스 선택</button>
															</td>
														</tr>
														<tr>
															<th class="t_left">응답 결과</th>
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