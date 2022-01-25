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
	.serializeHeader {
		position: unset !important;
	    height: 0% !important;
	}
	.serializeImg {
		float: right;
		width: 30px;
    	cursor: pointer;
	}	
	._factorVal {
		height: 295px;
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
			<div class="modal_content" style="width: 1366px;">
				<!-- 팝업항상중앙띄우기 -->
				<div class="modla_center">
					<div class="modal_header">
						<span class="close _ruleTestPop_close" onclick="close_layerPop('modal_serialize');" data-focusId="">&times;</span>
						<h2>현행화 처리</h2>
					</div>
					<!-- 본문 -->
					<div class="modal_body" style="height: calc(100% - 25vh); overflow-x: hidden; overflow-y: auto;">
						<div class="progress_loading">
							<div id="modal_serializeLoading" style="display: none;">
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
											<div class="card-actions card-header-position-mobile">
												<button type="button" class="btn btn-sm btn-green _ruleSelectBtn" id="">
													<i class="far fa-times-circle custom-btn-i"></i> 선택
												</button>
											</div>
											<h2 class="card-title_txt">Master Rule<span id="realMasterRuleIdVer"></span></h2>
										</header>
										<!-- 경고 -->
										<div class="card-body" id="realMasterRuleArea" style="white-space: pre; height: 240px; overflow: auto;">
										</div>
									</div>
									<!-- //마스터 RULE 영역 -->
								</div>
								<div class="col">
									<!-- 슬레이브 RULE 영역 -->
									<div class="card-body body-header" style="">
										<header class="card-header card-header-pd-mobile">
											<div class="card-actions card-header-position-mobile">
												<button type="button" class="btn btn-sm btn-green _ruleSelectBtn">
													<i class="far fa-times-circle custom-btn-i"></i> 선택
												</button>
											</div>
											<h2 class="card-title_txt">My Rule<span id="slaveRuleIdVer"></span></h2>
										</header>
										<!-- 경고 -->
										<div class="card-body" id="slaveRuleArea" style="white-space: pre; height: 240px; overflow: auto;">
										</div>
									</div>
									<!-- //슬레이브 RULE 영역 -->
								</div>
								<div class="col">
									<!-- 마스터 RULE 영역 -->
									<div class="card-body body-header" style="">
										<header class="card-header card-header-pd-mobile">
											<div class="card-actions card-header-position-mobile">
												<button type="button" class="btn btn-sm btn-green _ruleSelectBtn" id="">
													<i class="far fa-times-circle custom-btn-i"></i> 선택
												</button>
											</div>
											<h2 class="card-title_txt">Applied Master Version<span id="masterRuleIdVer"></span></h2>
										</header>
										<!-- 경고 -->
										<div class="card-body" id="masterRuleArea" style="white-space: pre; height: 240px; overflow: auto;">
										</div>
									</div>
									<!-- //마스터 RULE 영역 -->
								</div>
							</div>
							<!-- // RULE 상속 속성 정보 -->
							<!-- 상세영역 -->
							<div class="row">
								<div class="col">
									<!-- ※닫힘(기본정의): 1.class="card card-collapsed", 2.class="card-body" style="display:none;" 등 정의합니다. -->
									<div class="card mg_b0">
										<header class="card-header card-header-pd-mobile">
											<div class="card-actions card-header-position-mobile"></div>
											<h2 class="card-title_txt">RULE EDITOR</h2>
										</header>
										<!-- 본문페이지 -->
										<div class="card-body" style="">
											<!-- 테이블 -->
											<div class="panel nobordertop">
												<div class="sform_head">
													<table class="sform_type_pop modal_table">
														<colgroup>
															<col style="width: 25%" />
															<col style="width: 25%" />
															<col style="width: 15%" />
															<col style="width: auto" />
														</colgroup>
														<tbody>
															<tr>
																<td class="t_left bd_b_none bg01 v_top" rowspan="4">
																	<div class="progress_loading">
																		<div id="factorTreeLoading" style="display: none;">
																			<img src="/targetai_publish/images/ajax-loader1.gif" />
																		</div>
																	</div> 
																	<!-- 트리메뉴 -->
																	<ul id="factorTree" class="ztree treewrap" style="height: 370px; width: 320px;"></ul>
																</td>
																<th class="t_left icon02">요소 값
																	<button type="button" class="btn btn-sm btn-green btn_left" id="changeInputBtn">직접 입력</button>
																</th>
																<th class="t_left icon01">논리 연산
																	<button type="button" class="btn btn-sm btn-sky" id="addValBtn1">&gt;&gt;</button>
																</th>
																<th class="t_left icon03">RULE 속성</th>
															</tr>
															<tr>
																<td class="t_left pd_t15 pd_r15 pd_b15 pd_l15 v_top" rowspan="3">
																	<div class="overflow_detail">
																		<div class="alert fade show mg_b10 _factorVal" role="alert" id="factorVal" data-type="">
																		</div>
																	</div>
																</td>
																<td class="t_left pd_t15 pd_r15 pd_b15 pd_l15 v_top">
																	<input type="radio" name="logicalRadios" id="logicalRadio1" value="logical1" checked /> 
																	<label for="logicalRadio1" class="mg_r10">==</label> 
																	<br /> 
																	<input type="radio" name="logicalRadios" id="logicalRadio2" value="logical2" /> 
																	<label for="logicalRadio2" class="mg_r10">&gt;</label> 
																	<br /> 
																	<input type="radio" name="logicalRadios" id="logicalRadio3" value="logical3" /> 
																	<label for="logicalRadio3" class="mg_r10">&lt;</label>
																	<br /> 
																	<input type="radio" name="logicalRadios" id="logicalRadio4" value="logical4" /> 
																	<label for="logicalRadio4" class="mg_r10">&gt;=</label> 
																	<br /> 
																	<input type="radio" name="logicalRadios" id="logicalRadio5" value="logical5" /> 
																	<label for="logicalRadio5" class="mg_r10">&lt;=</label> 
																	<br /> 
																	<input type="radio" name="logicalRadios" id="logicalRadio6" value="logical6" /> 
																	<label for="logicalRadio6" class="mg_r10">in</label> 
																	<br /> 
																	<input type="radio" name="logicalRadios" id="logicalRadio7" value="logical7" /> 
																	<label for="logicalRadio7" class="mg_r10">not in</label>
																</td>
																<td class="t_left pd_t15 pd_r15 pd_b15 pd_l15 v_top" rowspan="3">
																	<div class="" id="ruleAttrData"></div>
																</td>
															</tr>
															<tr>
																<th class="t_left icon04">관계 연산
																	<button type="button" class="btn btn-sm btn-sky" id="addValBtn2">&gt;&gt;</button>
																</th>
															</tr>
															<tr>
																<td class="t_left pd_t15 pd_r15 pd_b15 pd_l15 v_top">
																	<input type="radio" name="relationRadios" id="relationRadio1" value="relation1" /> 
																	<label for="relationRadio1" class="mg_r10">AND</label> 
																	<br /> 
																	<input type="radio" name="relationRadios" id="relationRadio2" value="relation2" /> 
																	<label for="relationRadio2" class="mg_r10">OR</label> 
																	<br /> 
																	<input type="radio" name="relationRadios" id="relationRadio3" value="relation3" /> 
																	<label for="relationRadio3" class="mg_r10">(</label>
																	<br /> 
																	<input type="radio" name="relationRadios" id="relationRadio4" value="relation4" /> 
																	<label for="relationRadio4" class="mg_r10">)</label>
																	<br />
																	<input type="radio" name="relationRadios" id="relationRadio5" value="relation5" /> 
																	<label for="relationRadio4" class="mg_r10">삭제</label>
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
							<!-- 버튼 -->
							<div class="row">
								<div class="col">
									<div class="card-actions-foot">
										<button type="button" class="mg_t4 mg_r4 btn btn-sm btn-green" id="serializeBtn">
											<i class="far fa-times-circle custom-btn-i"></i> 현행화
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