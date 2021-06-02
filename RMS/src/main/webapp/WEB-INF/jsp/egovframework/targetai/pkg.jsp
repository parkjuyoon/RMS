<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<%@ include file="../targetai/comm/header.jsp" %>
</head>
<body class="loading" data-layout-mode="two-column" data-layout='{"mode": "light", "width": "fluid", "menuPosition": "fixed", "sidebar": { "color": "light", "size": "default", "showuser": false}, "topbar": {"color": "light"}, "showRightSidebarOnPageLoad": false}'>

	<div id="wrapper">
		<%@ include file="../targetai/comm/navbar.jsp" %>
		<%@ include file="../targetai/comm/side_menu.jsp" %>

		<!-- 본문영역 -->
		<div class="content-page">
			<div class="content">
				<div class="container-fluid">
					<!-- 본문제목,페이지경로 -->
					<header class="page-header custom-con-header">
						<h2>Package 관리</h2>
						<div class="right-wrapper t_right mg_r30">
							<ol class="breadcrumbs">
								<li><a href="#"><i class="icons icon-home"></i></a></li>
								<li><span>Rule Manager</span></li>
								<li><span>Package</span></li>
								<li><span>Package 관리</span></li>
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
									<h2 class="card-title_txt">패키지 검색</h2>
								</header>
								<!-- 본문페이지 -->
								<div class="card-body" style="">
									<!-- 조회 -->
									<div class="searcharea">
										<div class="reset_btn-bottom">
											<button type="button" class="mg_t4 mg_r4 btn btn-sm btn-gray">초기화</button>
										</div>
										<div class="search_btn-bottom">
											<button type="button" id="pkgSearchBtn" class="mg_t4 mg_r4 btn btn-sm btn-darkblue"><i class="fas fa-search custom-btn-i"></i>조회</button>
										</div>
										<div class="search_input">
											<div class="search_col">
												<div class="form_group">
													<label for="">패키지 ID</label>
													<input type="text" id="pkgId_search" class="wd150px" value="" />
												</div>
												<div class="form_group">
													<label for="">활성여부</label>
													<select id="pkgActYn_search" class="wd150px">
														<option value="Y" selected="selected">활성</option>
														<option value="N">비활성</option>
													</select>
												</div>
												<div class="form_group">
													<label for="">등록자</label>
													<input type="text" id="pkgRegUsrId_search" class="wd150px" value="" />
												</div>
												<div class="oneline_group">
													<label for="">패키지 명</label>
													<input type="text" id="pkgNm_search" class="wd90" value="" />
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
							<div class="card">
								<header class="card-header card-header-pd-mobile">
									<div class="card-actions card-header-position-mobile">
										<span class="infonum">
											<span class="txt_color_blue mg_l5 mg_r5" id="pkgCountBySearch"></span>건
										</span>
										<a href="#" class="card-action card-action-toggle" data-card-toggle></a>
									</div>
									<h2 class="card-title_txt">패키지 목록</h2>
								</header>
								<!-- 본문페이지 -->
								<div class="card-body" style="">
									<div class="progress_loading">
										<div id="pkgLoading">
											<img src="/targetai/images/ajax-loader.gif"/>
										</div>
									</div>
									<!-- 테이블 -->
									<div class="panel bd_b_none nobordertop">
										<table class="tb_type01">
											<colgroup>
												<col style="width:5%;" />
												<col style="width:10%;" />
												<col style="width:auto;" />
												<col style="width:12%;" />
												<col style="width:12%;" />
												<col style="width:10%;" />
												<col style="width:12%;" />
												<col style="width:10%;" />
											</colgroup>
											<thead>
												<tr>
													<th>
														<div class="checkbox-container">
															<input type="checkbox" id="checkbox_11" />
															<label for="checkbox_11"></label>
														</div>
													</th>
													<th>ID</th>
													<th>패키지명</th>
													<th>활성여부</th>
													<th>수정일시</th>
													<th>수정자</th>
													<th>등록일시</th>
													<th>등록자</th>
												</tr>
											</thead>
											<tbody id="pkgList"></tbody>
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
										<button type="button" class="btn btn-sm btn-gray"><i class="far fa-trash-alt custom-btn-i"></i> 삭제</button>
										<button type="button" class="btn btn-sm btn-green"><i class="el el-file-new custom-btn-i"></i> 신규 패키지 생성</button>
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
							<div class="card card-collapsed" id="pkgCardList">
								<header class="card-header card-header-pd-mobile">
									<div class="card-actions card-header-position-mobile">
										<a href="#" class="card-action card-action-toggle" data-card-toggle></a>
									</div>
									<h2 class="card-title_txt">패키지 상세</h2>
								</header>
								<!-- 본문페이지 -->
								<div class="card-body" id="pkgCardListBody" style="display:none;">
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
														<th class="t_left">패키지 ID</th>
														<td class="t_left" id="pkgId"></td>
													</tr>
													<tr>
														<th class="t_left">패키지 명</th>
														<td class="t_left">
															<input type="text" class="wd250px" id="pkgNm" value="" />
															<button type="button" class="btn btn-sm btn-gray">중복체크</button>
															<span class="custom-red mg_l15" style="display:none;" data-dup="N"><i class="el el-idea"></i> 중복된 패키지 명이 있습니다.</span>
														</td>
													</tr>
													<tr>
														<th class="t_left">RULE</th>
														<td class="t_left" id="ruleCntInPkg"></td>
													</tr>
													<tr>
														<th class="t_left">활성여부</th>
														<td class="t_left">
															<select id="pkg_act_yn" class="wd150px">
																<option value="Y">활성</option>
																<option value="N">비활성</option>
															</select>
														</td>
													</tr>
													<tr>
														<th class="t_left">설명</th>
														<td class="t_left">
															<textarea rows="4" cols="7" class="txtsize_100 wd100" id="pkgDsc" placeholder="상세설명을 입력하세요."></textarea>
														</td>
													</tr>
													<tr>
														<th class="t_left">최초 등록</th>
														<td class="t_left" id="pkgRegDt">
															2021-04-01 11:30:29에 홍길동(님)이 등록함.
														</td>
													</tr>
													<tr>
														<th class="t_left">마지막 수정</th>
														<td class="t_left" id="pkgUdtDt">
															2021-04-03 12:23:15에 홍길동(님)이 수정함.
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
									<!-- //테이블 -->

									<!-- 버튼 -->
									<div class="card-actions-foot">
										<button type="button" class="btn btn-sm btn-green"><i class="fas fa-save custom-btn-i"></i> 저장</button>
									</div>
									<!-- //버튼 -->
								</div>
								<!-- //본문페이지 -->
							</div>
						</div>
					</div>
					<!-- //상세영역 -->

					<div class="dot_line"></div>

					<!-- 조회영역 -->
					<div class="row">
						<div class="col">
							<!-- ※닫힘(기본정의): 1.class="card card-collapsed", 2.class="card-body" style="display:none;" 등 정의합니다. -->
							<div class="card card-collapsed">
								<header class="card-header">
									<div class="card-actions">
										<a href="#" class="card-action card-action-toggle" data-card-toggle></a>
									</div>
									<h2 class="card-title_txt">RULE 검색</h2>
								</header>
								<!-- 본문페이지 -->
								<div class="card-body" style="display:none;">
									<!-- 조회 -->
									<div class="searcharea">
										<div class="reset_btn-bottom">
											<button type="button" class="mg_t4 mg_r4 btn btn-sm btn-gray">초기화</button>
										</div>
										<div class="search_btn-bottom">
											<button type="button" class="mg_t4 mg_r4 btn btn-sm btn-darkblue" id="ruleSearchBtn" data-pkgId=""><i class="fas fa-search custom-btn-i"></i>조회</button>
										</div>
										<div class="search_input">
											<div class="search_col">
												<div class="form_group">
													<label for="">RULE ID</label>
													<input type="text" class="wd150px" id="ruleId_search" value="" />
												</div>
												<div class="form_group">
													<label for="">등록자</label>
													<input type="text" class="wd150px" id="ruleRegUsrId_search" value="" />
												</div>
												<div class="oneline_group">
													<label for="">RULE 명</label>
													<input type="text" class="wd90" id="ruleNm_search" value="" />
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
							<div class="card card-collapsed" id="ruleListCard">
								<header class="card-header card-header-pd-mobile">
									<div class="card-actions card-header-position-mobile">
										<span class="infonum">
											<span class="txt_color_blue mg_l5 mg_r5" id="ruleCntInPkgBySearch"></span>건
										</span>
										<a href="#" class="card-action card-action-toggle" data-card-toggle></a>
									</div>
									<h2 class="card-title_txt">RULE 목록</h2>
								</header>
								<!-- 본문페이지 -->
								<div class="card-body" id="ruleListCardBody" style="display:none;">
									<div class="progress_loading">
										<div id="ruleLoading">
											<img src="/targetai/images/ajax-loader.gif"/>
										</div>
									</div>
									<!-- 테이블 -->
									<div class="panel bd_b_none nobordertop">
										<table class="tb_type01">
											<colgroup>
												<col style="width:5%;" />
												<col style="width:10%;" />
												<col style="width:auto;" />
												<col style="width:12%;" />
												<col style="width:12%;" />
												<col style="width:10%;" />
												<col style="width:12%;" />
												<col style="width:10%;" />
											</colgroup>
											<thead>
												<tr>
													<th>
														<div class="checkbox-container">
															<input type="checkbox" id="checkbox_11" />
															<label for="checkbox_11"></label>
														</div>
													</th>
													<th>ID</th>
													<th>RULE 명</th>
													<th>SALIENCE</th>
													<th>수정일시</th>
													<th>수정자</th>
													<th>등록일시</th>
													<th>등록자</th>
												</tr>
											</thead>
											<tbody id="ruleList"></tbody>
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
										<button type="button" class="btn btn-sm btn-gray"><i class="far fa-trash-alt custom-btn-i"></i> 삭제</button>
										<button type="button" class="btn btn-sm btn-green" id="addNewRuleBtn"><i class="el el-file-new custom-btn-i"></i> 신규 RULE 생성</button>
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
							<div class="card card-collapsed" id="ruleCard">
								<header class="card-header card-header-pd-mobile">
									<div class="card-actions card-header-position-mobile">
										<button type="button" style="display: none;" data-modalclass="modalID_1" class="btn btn-sm btn-sky btnModal" id="ruleEditorPopUp" data-ruleId="">RULE EDITOR</button>
										<a href="#" class="card-action card-action-toggle" data-card-toggle></a>

										<!-- modal_pop -->
										<div id="modalID_1" class="modal_pop rule_pop">
											<div class="modal_content" style="width:1850px;">
												<!-- 팝업항상중앙띄우기 -->
												<div class="modla_center">
													<div class="modal_header">
														<span class="close" onclick="close_layerPop('modalID_1');">&times;</span>
														<h2>Package 관리</h2>
													</div>
													<!-- 본문 -->
													<div class="modal_body" style="height:calc(100% - 25vh); overflow-x:hidden; overflow-y:auto;">
														<div class="modal_wrap">
															<!-- 상세영역 -->
															<div class="row">
																<div class="col">
																	<!-- ※닫힘(기본정의): 1.class="card card-collapsed", 2.class="card-body" style="display:none;" 등 정의합니다. -->
																	<div class="card mg_b0">
																		<header class="card-header card-header-pd-mobile">
																			<div class="card-actions card-header-position-mobile">
																			</div>
																			<h2 class="card-title_txt">RULE EDITOR</h2>
																		</header>
																		<!-- 본문페이지 -->
																		<div class="card-body" style="">
																			<!-- 테이블 -->
																			<div class="panel nobordertop">
																				<div class="sform_head">
																					<table class="sform_type_pop modal_table">
																						<colgroup>
																							<col style="width:280px" />
																							<col style="width:auto" />
																							<col style="width:800px" />
																							<col style="width:500px" />
																						</colgroup>
																						<tbody>
																							<tr>
																								<td class="t_left bd_b_none bg01 v_top" rowspan="6">
																									<div class="progress_loading">
																										<div id="factorTreeLoading" style="display:none;">
																											<img src="/targetai/images/ajax-loader.gif"/>
																										</div>
																									</div>
																									<!-- 트리메뉴 -->
																									<ul id="factorTree" class="ztree treewrap"></ul>
																									<!-- <div id="factorTree" class="treewrap"></div> -->
																									<!-- //트리메뉴 -->
																								</td>
																								<th class="t_left icon01">
																									논리 연산
																								</th>
																								<th class="t_left icon02">
																									요소 값
																									<button type="button" class="btn btn-lg btn-sky btn_right">Add Value</button>
																								</th>
																								<th class="t_left icon03">
																									RULE 속성
																								</th>
																							</tr>
																							<tr>
																								<td class="t_left pd_t15 pd_r15 pd_b15 pd_l15 v_top">
																									<input type="radio" name="logicalRadio" id="logicalRadio1" checked />
																									<label for="logicalRadio" class="mg_r10">==</label>
																									<br />
																									<input type="radio" name="logicalRadio" id="logicalRadio2" />
																									<label for="logicalRadio" class="mg_r10">&gt;</label>
																									<br />
																									<input type="radio" name="logicalRadio" id="logicalRadio3" />
																									<label for="logicalRadio" class="mg_r10">&lt;</label>
																									<br />
																									<input type="radio" name="logicalRadio" id="logicalRadio4" />
																									<label for="logicalRadio" class="mg_r10">&gt;=</label>
																									<br />
																									<input type="radio" name="logicalRadio" id="logicalRadio5" />
																									<label for="logicalRadio" class="mg_r10">&lt;=</label>
																									<br />
																									<input type="radio" name="logicalRadio" id="logicalRadio6" />
																									<label for="logicalRadio" class="mg_r10">IN</label>
																									<br />
																									<input type="radio" name="logicalRadio" id="logicalRadio7" />
																									<label for="logicalRadio" class="mg_r10">NOT IN</label>
																								</td>
																								<td class="t_left pd_t15 pd_r15 pd_b15 pd_l15 v_top" rowspan="3" id="factorValData">
																									<div class="alert fade show mg_b10" role="alert">
																										<button type="button" class="btn-del" data-bs-dismiss="alert" aria-label="Close"></button>
																										<input type="radio" name="mradio_05" id="mradio_05" />
																										<label for="mradio_05" class="mg_l10">X</label>
																										<br />
																										<input type="radio" name="mradio_06" id="mradio_06" />
																										<label for="mradio_06" class="mg_l10">여자</label>
																										<br />
																										<input type="radio" name="mradio_06" id="mradio_06" checked="checked" />
																										<label for="mradio_06" class="mg_l10">남자</label>
																									</div>
																									<div class="alert fade show mg_b10" role="alert">
																										<button type="button" class="btn-del" data-bs-dismiss="alert" aria-label="Close"></button>
																										<input type="text" class="wd250px" value="" placeholder="숫자만 입력가능합니다" />
																									</div>
																									<div class="alert fade show mg_b10" role="alert">
																										<button type="button" class="btn-del" data-bs-dismiss="alert" aria-label="Close"></button>
																										<input type="text" id="DateId_ex01" class="date" value="2021-01-01" />
																										<span>~</span>
																										<input type="text" id="DateId_ex02" class="date" value="2021-01-30" />
																									</div>

																									<div class="alert fade show mg_b10" role="alert">
																										<button type="button" class="btn-del" data-bs-dismiss="alert" aria-label="Close"></button>
																										<label for="" class="view_label">전달값</label>
																										<input type="text" class="wd150px" value="" placeholder="성공건수" />
																									</div>
																									<div class="alert fade show mg_b10" role="alert">
																										<button type="button" class="btn-del" data-bs-dismiss="alert" aria-label="Close"></button>
																										<label for="" class="view_label">비교값</label>
																										<input type="text" class="wd150px" value="" placeholder="30" />
																									</div>
																								</td>
																								<td class="t_left pd_t15 pd_r15 pd_b15 pd_l15 v_top" rowspan="3" id="ruleAttrData"></td>
																							</tr>
																							<tr>
																								<th class="t_left icon04">
																									관계 연산
																								</th>
																							</tr>
																							<tr>
																								<td class="t_left pd_t15 pd_r15 pd_b15 pd_l15 v_top">
																									<input type="radio" name="relationRadio" id="relationRadio1" />
																									<label for="relationRadio" class="mg_r10">AND</label>
																									<br />
																									<input type="radio" name="relationRadio" id="relationRadio2" />
																									<label for="relationRadio" class="mg_r10">OR</label>
																									<br />
																									<input type="radio" name="relationRadio" id="relationRadio3" checked />
																									<label for="relationRadio" class="mg_r10">NONE</label>
																								</td>
																							</tr>
																							<tr>
																								<th class="t_left icon05">
																									통계 VIEW
																								</th>
																								<td class="t_left pd_t15 pd_r15 pd_b15 pd_l15 v_middle bd_b_none" rowspan="2">
																									<div class="graph_left">
																										<div style="width:100%;">
																											<img src="/targetai/images/modal_graph_ex01.png" alt="" />
																										</div>
																									</div>
																									<div class="graph_right">
																										<div style="width:100%;">
																											<img src="/targetai/images/modal_graph_ex02.png" alt="" />
																										</div>
																									</div>
																									<div class="clear"></div>
																								</td>
																								<th class="t_left icon06">
																									속성의 유형값
																								</th>
																							</tr>
																							<tr>
																								<td class="t_left pd_t15 pd_r15 pd_b15 pd_l15 v_top">
																									
																								</td>
																								<td class="t_left pd_t15 pd_r15 pd_b15 pd_l15 v_top">
																									<ul class="ulvalue">
																										<li>최대값 :</li>
																										<li>최소값 :</li>
																										<li>평균값 :</li>
																										<li>etc :</li>
																									</ul>
																								</td>
																							</tr>
																						</tbody>
																					</table>
																				</div>
																			</div>
																			<!-- //테이블 -->

																			<!-- 버튼 -->
																			<div class="card-actions-foot">
																				<button type="button" class="btn btn-lg btn-gray" id="ruleEditorCancel"><i class="far fa-times-circle custom-btn-i"></i> 취소</button>
																				<button type="button" class="btn btn-lg btn-green"><i class="far fa-check-circle custom-btn-i"></i> 적용</button>
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
									</div>
									<h2 class="card-title_txt">RULE 상세</h2>
								</header>
								<!-- 본문페이지 -->
								<div class="card-body" id="ruleCardBody" style="display:none;">
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
														<th class="t_left">RULE ID</th>
														<td class="t_left" id="ruleId"></td>
													</tr>
													<tr>
														<th class="t_left">RULE 명</th>
														<td class="t_left">
															<input type="text" class="wd250px" id="ruleNm" value="" />
															<button type="button" data-isDup="N" id="ruleNmDupBtn" class="btn btn-sm btn-gray">중복체크</button>
															<span class="custom-red mg_l15" style="display:none;" id="ruleDupN"><i class="el el-idea"></i> 중복된 RULE 명이 있습니다.</span>
															<span class="custom-green mg_l15" style="display:none;" id="ruleDupY"><i class="el el-idea"></i> 사용가능 한 서비스 명입니다.</span>
														</td>
													</tr>
													<tr>
														<th class="t_left">NO-LOOP</th>
														<td class="t_left">
															<div class="radio-container mg_r0">
																<input type="radio" name="noLoop" value="true" id="" checked />
																<label for="noLoop" class="mg_r10">TRUE</label>
																<input type="radio" name="noLoop" value="false" id="" />
																<label for="noLoop" class="mg_r10">FALSE</label>
															</div>
														</td>
													</tr>
													<tr>
														<th class="t_left">LOCK-ON-ACTIVE</th>
														<td class="t_left">
															<div class="radio-container mg_r0">
																<input type="radio" name="lockOnActive" value="true" id="" checked/>
																<label for="lockOnActive" class="mg_r10">TRUE</label>
																<input type="radio" name="lockOnActive" value="false" id="" />
																<label for="lockOnActive" class="mg_r10">FALSE</label>
															</div>
														</td>
													</tr>
													<tr>
														<th class="t_left">SALIENCE</th>
														<td class="t_left">
															<input type="text" class="wd250px" id="salience" value="" />
														</td>
													</tr>
													<tr>
														<th class="t_left">CONTENTS</th>
														<td class="t_left">
															<textarea rows="4" cols="7" class="txtsize_100 wd100" id="ruleWhenCont" placeholder="RULE EDITOR를 통해 생성하세요." readonly="readonly"></textarea>
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
									<!-- //테이블 -->

									<!-- 버튼 -->
									<div class="card-actions-foot">
										<button type="button" class="btn btn-sm btn-green" id="saveRuleBtn"><i class="fas fa-save custom-btn-i"></i> 저장</button>
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
	<script src="/targetai/js/pkg.js"></script>
	<script src="/targetai/js/app.js" type="text/javascript"></script>
	<script src="/targetai/libs/jquery-ui/jquery-ui.js" type="text/javascript"></script>
</body>
</html>