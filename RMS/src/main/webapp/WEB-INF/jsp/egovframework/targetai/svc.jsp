<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<%@ include file="../targetai/comm/header.jsp" %>
</head>
<body class="loading" data-layout-mode="two-column" data-layout='{"mode": "light", "width": "fluid", "menuPosition": "fixed", "sidebar": { "color": "light", "size": "default", "showuser": false}, "topbar": {"color": "light"}, "showRightSidebarOnPageLoad": false}'>

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
						<h2>Service 관리</h2>
						<div class="right-wrapper t_right mg_r30">
							<ol class="breadcrumbs">
								<li><a href="#"><i class="icons icon-home"></i></a></li>
								<li><span>Rule Manager</span></li>
								<li><span>Service</span></li>
								<li><span>Service 관리</span></li>
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
									<h2 class="card-title_txt">서비스 검색</h2>
								</header>
								<!-- 본문페이지 -->
								<div class="card-body" style="">
									<!-- 조회 -->
									<div class="searcharea">
										<div class="reset_btn-bottom">
											<button type="button" class="mg_t4 mg_r4 btn btn-sm btn-gray">초기화</button>
										</div>
										<div class="search_btn-bottom">
											<button type="button" id="svcSearchBtn" class="mg_t4 mg_r4 btn btn-sm btn-darkblue">
												<i class="fas fa-search custom-btn-i"></i>조회
											</button>
										</div>
										<div class="search_input">
											<div class="search_col">
												<div class="form_group">
													<label for="">서비스 ID</label>
													<input type="text" class="wd150px" id="svcId_search" value="" />
												</div>
												<div class="form_group">
													<label for="">활성여부</label>
													<select id="svcActYn_search" class="wd150px">
														<option value="" selected="selected">활성</option>
													</select>
												</div>
												<div class="form_group">
													<label for="">등록자</label>
													<input type="text" id="svcRegUsrId_search" class="wd150px" value="" />
												</div>
												<div class="oneline_group">
													<label for="">서비스 명</label>
													<input type="text" id="svcNm_search" class="wd90" value="" />
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
							<div class="card" id="svcListCard">
								<header class="card-header card-header-pd-mobile">
									<div class="card-actions card-header-position-mobile">
										<span class="infonum">
											총<span class="txt_color_blue mg_l5 mg_r5" id="svcCountBySearch"></span>건
										</span>
										<a href="#" class="card-action card-action-toggle" data-card-toggle></a>
									</div>
									<h2 class="card-title_txt">서비스 목록</h2>
								</header>
								<!-- 본문페이지 -->
								<div class="card-body" id="svcListCardBody" style="">
									<div class="progress_loading">
										<div id="svcLoading">
											<img src="/targetai_publish/images/ajax-loader.gif" />
										</div>
									</div>
									<!-- 테이블 -->
									<div class="panel bd_b_none nobordertop">
										<table class="tb_type01">
											<colgroup>
												<col style="width:5%;" />
												<col style="width:7%;" />
												<col style="width:auto;" />
												<col style="width:auto;" />
												<col style="width:auto;" />
												<col style="width:7%;" />
												<col style="width:12%;" />
												<col style="width:7%;" />
												<col style="width:12%;" />
												<col style="width:7%;" />
											</colgroup>
											<thead>
												<tr>
													<th>
														<div class="checkbox-container">
															<input type="checkbox" id="svcListAllChkBox"/>
															<label for="svcListAllChkBox"></label>
														</div>
													</th>
													<th>ID</th>
													<th>채널명</th>
													<th>서비스명</th>
													<th>패키지명</th>
													<th>활성여부</th>
													<th>수정일시</th>
													<th>수정자</th>
													<th>등록일시</th>
													<th>등록자</th>
												</tr>
											</thead>
											<tbody id="svcList"></tbody>
										</table>
									</div>
									<!-- //테이블 -->

									<!-- 페이징 -->
									<div class="custom-paging">
										<a href="#" class="prev_start">맨앞</a>
										<a href="#" class="prev">이전</a>
										<a href="#" class="active">1</a>
										<a href="#">2</a>
										<a href="#">3</a>
										<a href="#">4</a>
										<a href="#">5</a>
										<a href="#">6</a>
										<a href="#">7</a>
										<a href="#">8</a>
										<a href="#">9</a>
										<a href="#">10</a>
										<a href="#" class="next">다음</a>
										<a href="#" class="next_end">맨뒤</a>
									</div>
									<!-- //페이징 -->

									<!-- 버튼 -->
									<div class="card-actions-foot">
										<button type="button" class="btn btn-sm btn-gray" id="deleteSvcBtn">
											<i class="far fa-trash-alt custom-btn-i"></i> 삭제
										</button>
										<button type="button" class="btn btn-sm btn-green" id="addNewSvcBtn">
											<i class="el el-file-new custom-btn-i"></i> 신규 서비스 생성
										</button>
									</div>
									<!-- //버튼 -->
								</div>
								<!-- //본문페이지 -->
							</div>
						</div>
					</div>
					<!-- //그리드영역 -->

					<!-- 상세영역 -->
					<div class="row">
						<div class="col">
							<!-- ※닫힘(기본정의): 1.class="card card-collapsed", 2.class="card-body" style="display:none;" 등 정의합니다. -->
							<div class="card card-collapsed" id="svcCard">
								<header class="card-header card-header-pd-mobile">
									<div class="card-actions card-header-position-mobile">
										<a href="#" class="card-action card-action-toggle" data-card-toggle></a>
									</div>
									<h2 class="card-title_txt">서비스 상세</h2>
								</header>
								<!-- 본문페이지 -->
								<div class="card-body" id="svcCardBody" style="display: none;">
									<!-- 테이블 -->
									<div class="panel nobordertop">
										<div class="sform_head">
											<table class="sform_type">
												<colgroup>
													<col style="width:180px" />
													<col style="width:auto" />
												</colgroup>
												<tbody>
													<tr>
														<th class="t_left">서비스 ID</th>
														<td class="t_left" id="svcId"></td>
													</tr>
													<tr>
														<th class="t_left">서비스 명</th>
														<td class="t_left">
															<input type="text" class="wd250px" id="svcNm" value="" />
															<button type="button" data-isDup="N" id="svcNmDupBtn" class="btn btn-sm btn-gray">중복체크</button>
															<span class="custom-red mg_l15" style="display: none;" id="svcDupN">
																<i class="el el-idea"></i> 중복된 서비스 명이 있습니다.
															</span>
															<span class="custom-green mg_l15" style="display: none;" id="svcDupY">
																<i class="el el-idea"></i> 사용가능 한 서비스 명입니다.
															</span>
														</td>
													</tr>
													<tr>
														<th class="t_left">채널 연결</th>
														<td class="t_left">
															<input type="text" class="wd150px" id="svcConnChannel" data-channel_id="" value="" readonly="readonly"/>
															<button type="button" id="svcConnChannelBtn" data-modalclass="modal_svcConnChannel" class="btn_onlyico_search btnModal" title="조회">새창 열기</button>

															<!-- modal_pop -->
															<div id="modal_svcConnChannel" class="modal_pop">
																<div class="modal_content" style="width:1000px;">
																	<!-- 팝업항상중앙띄우기 -->
																	<div class="modla_center">
																		<div class="modal_header">
																			<span class="close" onclick="close_layerPop('modal_svcConnChannel');">&times;</span>
																			<h2>Service 관리</h2>
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
																								<h2 class="card-title_txt">채널 조회</h2>
																							</header>
																							<!-- 본문페이지 -->
																							<div class="card-body" style="">
																								<div class="progress_loading">
																									<div id="modal_svcConnChannelLoading">
																										<img src="/targetai_publish/images/ajax-loader.gif" />
																									</div>
																								</div>
																								<!-- 조회 -->
																								<div class="searcharea">
																									<div class="search_btn-bottom">
																										<button type="button" class="mg_t4 mg_r4 btn btn-sm btn-darkblue" id="modal_channelSearchBtn">
																											<i class="fas fa-search custom-btn-i"></i>조회
																										</button>
																									</div>
																									<div class="search_input">
																										<div class="search_col">
																											<div class="form_group">
																												<label for="">채널 명</label>
																												<input type="text" class="wd150px" id="modal_channelNm_search" value="" />
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
																											<col style="width:15%;" />
																											<col style="width:auto;" />
																										</colgroup>
																										<thead>
																											<tr>
																												<th></th>
																												<th>ID</th>
																												<th>채널 명</th>
																												<th>설명</th>
																											</tr>
																										</thead>
																										<tbody id="modal_svcConnChannelList"></tbody>
																									</table>
																								</div>
																								<!-- //테이블 -->

																								<!-- 페이징 -->
																								<div class="custom-paging">
																									<a href="#" class="prev_start">맨앞</a>
																									<a href="#" class="prev">이전</a>
																									<a href="#" class="active">1</a>
																									<a href="#">2</a>
																									<a href="#">3</a>
																									<a href="#">4</a>
																									<a href="#">5</a>
																									<a href="#">6</a>
																									<a href="#">7</a>
																									<a href="#">8</a>
																									<a href="#">9</a>
																									<a href="#">10</a>
																									<a href="#" class="next">다음</a>
																									<a href="#" class="next_end">맨뒤</a>
																								</div>
																								<!-- //페이징 -->

																								<!-- 버튼 -->
																								<div class="card-actions-foot">
																									<button type="button" class="btn btn-sm btn-gray" onclick="close_layerPop('modal_svcConnChannel');"><i class="far fa-times-circle custom-btn-i"></i> 취소</button>
																									<button type="button" class="btn btn-sm btn-green" id="modal_svcConnChannelSaveBtn"><i class="far fa-check-circle custom-btn-i"></i> 적용</button>
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
															<!-- //modal_pop -->
														</td>
													</tr>
													<tr>
														<th class="t_left">패키지 연결</th>
														<td class="t_left">
															<input type="text" class="wd150px" id="svcConnPkg" data-pkg_id="" value="" readonly="readonly"/>
															<button type="button" id="svcConnPkgBtn" data-modalclass="modal_svcConnPkg" class="btn_onlyico_search btnModal" title="조회">새창 열기</button>

															<!-- modal_pop -->
															<div id="modal_svcConnPkg" class="modal_pop">
																<div class="modal_content" style="width:1000px;">
																	<!-- 팝업항상중앙띄우기 -->
																	<div class="modla_center">
																		<div class="modal_header">
																			<span class="close" onclick="close_layerPop('modal_svcConnPkg');">&times;</span>
																			<h2>Service 관리</h2>
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
																								<h2 class="card-title_txt">패키지 조회</h2>
																							</header>
																							<!-- 본문페이지 -->
																							<div class="card-body" style="">
																								<div class="progress_loading">
																									<div id="modal_svcConnPkgLoading">
																										<img src="/targetai_publish/images/ajax-loader.gif" />
																									</div>
																								</div>
																								<!-- 조회 -->
																								<div class="searcharea">
																									<div class="search_btn-bottom">
																										<button type="button" class="mg_t4 mg_r4 btn btn-sm btn-darkblue" id="modal_pkgSearchBtn">
																											<i class="fas fa-search custom-btn-i"></i>조회
																										</button>
																									</div>
																									<div class="search_input">
																										<div class="search_col">
																											<div class="form_group">
																												<label for="">패키지 명</label>
																												<input type="text" class="wd150px" id="modal_pkgNm_search" value="" />
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
																												<th>ID</th>
																												<th>패키지 명</th>
																												<th>DRL 명</th>
																											</tr>
																										</thead>
																										<tbody id="modal_svcConnPkgList"></tbody>
																									</table>
																								</div>
																								<!-- //테이블 -->

																								<!-- 페이징 -->
																								<div class="custom-paging">
																									<a href="#" class="prev_start">맨앞</a>
																									<a href="#" class="prev">이전</a>
																									<a href="#" class="active">1</a>
																									<a href="#">2</a>
																									<a href="#">3</a>
																									<a href="#">4</a>
																									<a href="#">5</a>
																									<a href="#">6</a>
																									<a href="#">7</a>
																									<a href="#">8</a>
																									<a href="#">9</a>
																									<a href="#">10</a>
																									<a href="#" class="next">다음</a>
																									<a href="#" class="next_end">맨뒤</a>
																								</div>
																								<!-- //페이징 -->

																								<!-- 버튼 -->
																								<div class="card-actions-foot">
																									<button type="button" class="btn btn-sm btn-gray" onclick="close_layerPop('modal_svcConnPkg');"><i class="far fa-times-circle custom-btn-i"></i> 취소</button>
																									<button type="button" class="btn btn-sm btn-green" id="modal_svcConnPkgSaveBtn"><i class="far fa-check-circle custom-btn-i"></i> 적용</button>
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
															<!-- //modal_pop -->
														</td>
													</tr>
													<tr>
														<th class="t_left">활성여부</th>
														<td class="t_left">
															<select id="svcActYn" class="wd150px">
																<option value="Y">활성</option>
																<option value="N">비활성</option>
															</select>
														</td>
													</tr>
													<tr>
														<th class="t_left">설명</th>
														<td class="t_left">
															<textarea rows="4" cols="7" class="txtsize_100 wd100" id="svcDsc" placeholder="상세설명을 입력하세요."></textarea>
														</td>
													</tr>
													<tr>
														<th class="t_left">최초 등록</th>
														<td class="t_left" id="svcRegDt"></td>
													</tr>
													<tr>
														<th class="t_left">마지막 수정</th>
														<td class="t_left" id="svcUdtDt"></td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
									<!-- //테이블 -->

									<!-- 버튼 -->
									<div class="card-actions-foot">
										<button type="button" class="btn btn-sm btn-green" id="saveSvcBtn">
											<i class="fas fa-save custom-btn-i"></i> 저장
										</button>
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
		</div>
		<!-- //본문영역 -->
	</div>

<!-- App js-->
<script src="/targetai/js/svc.js"></script>
<script src="/targetai_publish/js/app.js" type="text/javascript"></script>
<script src="/targetai_publish/libs/jquery-ui/jquery-ui.js" type="text/javascript"></script>

</body>
</html>