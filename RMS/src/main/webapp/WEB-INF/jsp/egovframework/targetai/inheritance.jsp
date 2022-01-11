<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<style type="text/css">
	.factorValSpanTitle {
		font-weight: bold;
		font-style: italic;
	}
	.search_input .form_group {
		width: 355px !important;
	}
</style>
<%@ include file="../targetai/comm/header.jsp"%>
</head>
<body class="loading" data-layout-mode="two-column"
	data-layout='{"mode": "light", "width": "fluid", "menuPosition": "fixed", "sidebar": { "color": "light", "size": "default", "showuser": false}, "topbar": {"color": "light"}, "showRightSidebarOnPageLoad": false}'>

	<div id="wrapper">
		<%@ include file="../targetai/comm/navbar.jsp"%>
		<%@ include file="../targetai/comm/side_menu.jsp"%>
		<%@ include file="../targetai/comm/alertPop.jsp"%>

		<!-- 현행화 팝업 -->
		<div id="modal_serialize" class="modal_pop">
			<div class="modal_content" style="width: 800px;">
				<!-- 팝업항상중앙띄우기 -->
				<div class="modla_center">
					<div class="modal_header">
						<span class="close _ruleTestPop_close" onclick="close_layerPop('modal_serialize');" data-focusId="">&times;</span>
						<h2>현행화 처리</h2>
					</div>
					<!-- 본문 -->
					<div class="modal_body" style="height: calc(100% - 25vh); overflow-x: hidden; overflow-y: auto;">
						<div class="progress_loading">
							<div id="" style="display: none;">
								<img src="/targetai_publish/images/ajax-loader1.gif" />
							</div>
						</div>
						<div class="modal_wrap">
							<!-- RULE 상속 속성 정보  -->
							<div class="row">
								<div class="col">
									<!-- 마스터 RULE 영역 -->
									<div class="card-body body-header" style="">
										<header class="card-header card-header-pd-mobile">
											<div class="card-actions card-header-position-mobile"></div>
											<h2 class="card-title_txt">마스터 RULE</h2>
										</header>
										<!-- 경고 -->
										<div class="card-body" id="" style="white-space: pre; height: 240px; overflow: auto;">
											<div style="white-space: pre;">현재 개발중입니다.</div>
										</div>
									</div>
									<!-- //마스터 RULE 영역 -->
								</div>
								<div class="col">
									<!-- 슬레이브 RULE 영역 -->
									<div class="card-body body-header" style="">
										<header class="card-header card-header-pd-mobile">
											<div class="card-actions card-header-position-mobile"></div>
											<h2 class="card-title_txt">슬레이브 RULE</h2>
										</header>
										<!-- 경고 -->
										<div class="card-body" id="" style="white-space: pre; height: 240px; overflow: auto;">
											<div style="white-space: pre;">현재 개발중입니다.</div>
										</div>
									</div>
									<!-- //슬레이브 RULE 영역 -->
								</div>
							</div>
							<!-- // RULE 상속 속성 정보 -->
							<!-- 버튼 -->
							<div class="row">
								<div class="col">
									<div class="card-actions-foot">
										<button type="button" class="mg_t4 mg_r4 btn btn-sm btn-green" id="">
											<i class="far fa-times-circle custom-btn-i"></i> 실행
										</button>
										<button type="button" class="mg_t4 mg_r4 btn btn-sm btn-gray" onclick="close_layerPop('modal_serialize');">
											<i class="far fa-check-circle custom-btn-i"></i> 닫기
										</button>
									</div>
								</div>
							</div>
							<!-- //버튼 -->
						</div>
					</div>
					<!-- //본문 -->
				</div>
				<!-- //팝업항상중앙띄우기 -->
			</div>
		</div>
		<!-- //현행화 팝업 -->
		
		<!-- 본문영역 -->
		<div class="content-page">
			<div class="content">
				<div class="container-fluid">
					<!-- 본문제목,페이지경로 -->
					<header class="page-header custom-con-header">
						<h2>RULE 상속 정보</h2>
						<div class="right-wrapper t_right mg_r30">
							<ol class="breadcrumbs">
								<li>
									<a href="#">
										<i class="icons icon-home"></i>
									</a>
								</li>
								<li>
									<span>Rule Manager</span>
								</li>
								<li>
									<span>RULE 상속 정보</span>
								</li>
								<li>
									<span>Rule 상속 정보</span>
								</li>
							</ol>
						</div>
					</header>
					<!-- //본문제목,페이지경로 -->

					<!-- 조회영역 -->
					<div class="row">
						<div class="col">
							<!-- ※닫힘(기본정의): 1.class="card card-collapsed", 2.class="card-body" style="display:none;" 등 정의합니다. -->
							<div class="card">
								<header class="card-header">
									<div class="card-actions">
										<a href="#" class="card-action card-action-toggle" data-card-toggle></a>
									</div>
									<h2 class="card-title_txt">RULE 상속 검색</h2>
								</header>
								<!-- 본문페이지 -->
								<div class="card-body">
									<!-- 조회 -->
									<div class="searcharea">
										<div class="reset_btn-bottom">
											<button type="button" class="mg_t4 mg_r4 btn btn-sm btn-gray" id="ihResetBtn">초기화</button>
										</div>
										<div class="search_btn-bottom">
											<button type="button" class="mg_t4 mg_r4 btn btn-sm btn-darkblue" id="ihSearchBtn">
												<i class="fas fa-search custom-btn-i"></i>조회
											</button>
										</div>
										<div class="search_input">
											<div class="search_col">
												<div class="form_group">
													<label for="">M / S</label> 
													<select class="wd150px" id="msSelect_search">
														<option value="master">마스터</option>
														<option value="slave">슬레이브</option>
													</select>
												</div>
												<div class="oneline_group">
													<div class="form_group">
														<label for="">RULE ID</label> <input type="text" class="wd160px" id="ruleId_search" value="" />
													</div>
													<div class="form_group">
														<label for="">상속자</label> <input type="text" class="wd160px" id="ihRegUsrNm_search" value="" />
													</div>
													<div class="oneline_group">
														<label for="">RULE 명</label> <input type="text" class="wd90" id="ruleNm_search" value="" />
													</div>
												</div>
											</div>
										</div>
									</div>
									<!-- //조회 -->
								</div>
								<!-- //본문페이지 -->
							</div>
						</div>
					</div>
					<!-- //조회영역 -->

					<!-- 그리드영역 -->
					<div class="row">
						<div class="col">
							<!-- ※닫힘(기본정의): 1.class="card card-collapsed", 2.class="card-body" style="display:none;" 등 정의합니다. -->
							<div class="card" id="ruleListCard">
								<header class="card-header card-header-pd-mobile">
									<div class="card-actions card-header-position-mobile">
										<span class="infonum"> <span class="txt_color_blue mg_l5 mg_r5" id="ihCntBySearch"></span>건
										</span>
										<a href="#" id="ihListCardOpen" class="card-action card-action-toggle"></a>
									</div>
									<h2 class="card-title_txt">RULE 상속 정보 목록</h2>
								</header>
								<!-- 본문페이지 -->
								<div class="card-body" id="ihListCardBody">
									<div class="progress_loading">
										<div id="ihListLoading">
											<img src="/targetai_publish/images/ajax-loader1.gif" />
										</div>
									</div>
									<!-- 테이블 -->
									<div class="panel bd_b_none nobordertop">
										<table class="tb_type01">
											<colgroup>
												<col style="width: auto;" />
												<col style="width: 15%;" />
												<col style="width: 15%;" />
												<col style="width: auto;" />
												<col style="width: 8%;" />
												<col style="width: 10%;" />
												<col style="width: 5%;" />
												<col style="width: 5%;" />
											</colgroup>
											<thead>
												<tr>
													<th colspan="2">마스터</th>
													<th colspan="3">슬레이브</th>
													<th rowspan="2">상속일시</th>
													<th rowspan="2">상속자</th>
													<th rowspan="2">현행화</th>
												</tr>
												<tr>
													<th>마스터 RULE 명</th>
													<th>마스터 아이디 / 버전</th>
													<th>슬레이브 아이디 / 버전</th>
													<th>슬레이브 RULE 명</th>
													<th style="border-right: 1px solid #bababa;">마스터 버전</th>
												</tr>
											</thead>
											<tbody id="ihList"></tbody>
										</table>
									</div>
									<!-- //테이블 -->

									<!-- 페이징 -->
									<div class="custom-paging" id="ihListPaging"></div>
									<!-- //페이징 -->

									<!-- 버튼 -->
									<div class="card-actions-foot"></div>
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
<script src="/targetai/js/inheritance.js"></script>
<script src="/targetai_publish/js/app.js" type="text/javascript"></script>
<script src="/targetai_publish/libs/jquery-ui/jquery-ui.js" type="text/javascript"></script>

</body>
</html>