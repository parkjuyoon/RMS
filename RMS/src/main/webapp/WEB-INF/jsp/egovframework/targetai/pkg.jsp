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

		<!-- DRL 소스 보기 modal_pop -->
		<div id="drlSourcePop" class="modal_pop">
			<div class="modal_content" style="width: 800px;">
				<!-- 팝업항상중앙띄우기 -->
				<div class="modla_center">
					<div class="modal_header">
						<span class="close" onclick="close_layerPop('drlSourcePop');" data-focusId="" id="messagePop_close">&times;</span>
						<h2>DRL Source 확인</h2>
					</div>
					<!-- 본문 -->
					<div class="modal_body" style="height: calc(100% - 25vh); overflow-x: hidden; overflow-y: auto;">
						<div class="modal_wrap">
							<!-- 상세영역 -->
							<div class="row">
								<div class="col">
									<div class="card mg_b0">
										<!-- 본문페이지 -->
										<div class="card-body body-header" style="">
											<div class="progress_loading">
												<div id="drlSourcePopLoading">
													<img src="/targetai_publish/images/ajax-loader1.gif" />
												</div>
											</div>
											<header class="card-header card-header-pd-mobile">
												<div class="card-actions card-header-position-mobile"></div>
												<h2 class="card-title_txt" id="drlSourcePop_title">drl 파일명</h2>
											</header>
											<!-- 경고 -->
											<div class="card-body">
												<textarea rows="30" cols="60" class="txtsize_100 wd100" id="drlSourcePop_contents" readonly="readonly"></textarea>
												<!-- 버튼 -->
												<div class="card-actions-foot">
													<button type="button" class="btn btn-sm btn-gray" onclick="close_layerPop('drlSourcePop');">
														<i class="far fa-times-circle custom-btn-i"></i> 닫기
													</button>
												</div>
												<!-- //버튼 -->
											</div>
											<!-- //경고 -->
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
		
		<!-- RULE EDITOR modal_pop -->
		<div id="modal_ruleEditor" class="modal_pop rule_pop">
			<div class="modal_content" style="width: 1850px;">
				<!-- 팝업항상중앙띄우기 -->
				<div class="modla_center">
					<div class="modal_header">
						<span class="close" onclick="close_layerPop('modal_ruleEditor');">&times;</span>
						<h2>Package 관리</h2>
					</div>
					<!-- 본문 -->
					<div class="modal_body" style="height: calc(100% - 25vh); overflow-x: hidden; overflow-y: auto;">
						<div class="modal_wrap">
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
															<col style="width: 280px" />
															<col style="width: 250px" />
															<col style="width: 250px" />
															<col style="width: 180px" />
															<col style="width: auto" />
														</colgroup>
														<tbody>
															<tr>
																<td class="t_left bd_b_none bg01 v_top" rowspan="6">
																	<div class="progress_loading">
																		<div id="factorTreeLoading" style="display: none;">
																			<img src="/targetai_publish/images/ajax-loader1.gif" />
																		</div>
																	</div> <!-- 트리메뉴 -->
																	<ul id="factorTree" class="ztree treewrap"></ul>
																</td>
																<th class="t_left icon02" colspan="2">요소 값
																	<button type="button" class="btn btn-sm btn-green btn_left" id="changeInputBtn">직접 입력</button>
																</th>
																<th class="t_left icon01">논리 연산
																	<button type="button" class="btn btn-sm btn-sky" id="addValBtn1">&gt;&gt;</button>
																</th>
																<th class="t_left icon03">RULE 속성</th>
															</tr>
															<tr>
																<td class="t_left pd_t15 pd_r15 pd_b15 pd_l15 v_top" rowspan="3" colspan="2">
																	<div class="overflow_detail">
																		<div class="alert fade show mg_b10 _factorVal" role="alert" id="factorVal" data-type=""></div>
																		<input type="text" id="factorVal_direct" value="" placeholder="요소값을 입력하세요." style="display: none;">
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
																	<div class="overflow_rule" id="ruleAttrData"></div>
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
																</td>
															</tr>
															<tr>
																<th class="t_left icon05">통계 VIEW</th>
																<td class="t_left pd_t15 pd_r15 pd_b15 pd_l15 v_middle bd_b_none" rowspan="2" colspan="4">
																	<div class="graph_left">
																		<div style="width: 100%;">
																			<img src="/targetai_publish/images/modal_graph_ex01.png" alt="" />
																		</div>
																	</div>
																	<div class="graph_right">
																		<div style="width: 100%;">
																			<img src="/targetai_publish/images/modal_graph_ex02.png" alt="" />
																		</div>
																	</div>
																	<div class="clear"></div>
																</td>
															</tr>
															<tr>
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
												<button type="button" class="btn btn-lg btn-gray" id="ruleEditorCancel">
													<i class="far fa-times-circle custom-btn-i"></i> 취소
												</button>
												<button type="button" class="btn btn-lg btn-green" id="ruleEditorSave">
													<i class="far fa-check-circle custom-btn-i"></i> 적용
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
					<!-- //본문 -->
				</div>
				<!-- //팝업항상중앙띄우기 -->
			</div>
		</div>
		<!-- //modal_pop -->
		
		<!-- RULE 테스트 팝업 -->
		<div id="modal_ruleTest" class="modal_pop">
			<div class="modal_content" style="width: 800px;">
				<!-- 팝업항상중앙띄우기 -->
				<div class="modla_center">
					<div class="modal_header">
						<span class="close _ruleTestPop_close" onclick="close_layerPop('modal_ruleTest');" data-focusId="">&times;</span>
						<h2>RULE TEST</h2>
					</div>
					<!-- 본문 -->
					<div class="modal_body" style="height: calc(100% - 25vh); overflow-x: hidden; overflow-y: auto;">
						<div class="modal_wrap">
							<!-- 상세영역 -->
							<div class="row">
								<div class="col">
									<div class="card mg_b0">
										<!-- 본문페이지 -->
										<div class="card-body body-header" style="">
											<div class="progress_loading">
												<div id="ruleTestPopLoading">
													<img src="/targetai_publish/images/ajax-loader1.gif" />
												</div>
											</div>
											<header class="card-header card-header-pd-mobile">
												<div class="card-actions card-header-position-mobile"></div>
												<h2 class="card-title_txt" id="ruleTestPop_title">결과 확인</h2>
											</header>
											<!-- 경고 -->
											<div class="card-body">
												<div id="ruleTestPop_input" style="height: 150px; overflow: auto;"></div>
												<br />
		
												<!-- 버튼 -->
												<div class="card-actions-foot">
													<button type="button" class="btn btn-sm btn-sky" id="ruleTestPop_resBtn">
														<i class="far fa-times-circle custom-btn-i"></i> 결과확인
													</button>
													<button type="button" class="btn btn-sm btn-gray _ruleTestPop_close" onclick="close_layerPop('modal_ruleTest');">
														<i class="far fa-times-circle custom-btn-i"></i> 닫기
													</button>
												</div>
												<!-- //버튼 -->
												
												<!-- RULE 테스트 결과 팝업(JSON) -->
												<div id="ruleTestResPop" class="modal_pop">
													<div class="modal_content" style="width: 500px;">
														<!-- 팝업항상중앙띄우기 -->
														<div class="modla_center">
															<div class="modal_header">
																<span class="close" onclick="close_layerPop('ruleTestResPop');" data-focusId="">&times;</span>
																<h2>Result Drools OutPut</h2>
															</div>
															<!-- 본문 -->
															<div class="modal_body" style="height: calc(100% - 25vh); overflow-x: hidden; overflow-y: auto;">
																<div class="modal_wrap">
																<!-- 상세영역 -->
																	<div class="row">
																		<div class="col">
																			<div class="card mg_b0">
																				<!-- 경고 -->
																				<div class="card-body">
																					<textarea rows="30" cols="60" class="txtsize_100 wd100" id="ruleTestResPop_res" style="white-space: pre;" readonly="readonly">JSON 내용</textarea>
																					<!-- 버튼 -->
																					<div class="card-actions-foot">
																						<button type="button" class="btn btn-sm btn-gray" onclick="close_layerPop('ruleTestResPop');">
																							<i class="far fa-times-circle custom-btn-i"></i> 닫기
																						</button>
																					</div>
																					<!-- //버튼 -->
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
															<!-- //본문 -->
														</div>
														<!-- //팝업항상중앙띄우기 -->
													</div>
												</div>
												<!-- //RULE 테스트 결과 팝업(JSON) -->
												
											</div>
											<!-- //경고 -->
										</div>
										<!-- //본문페이지 -->
										
										<!-- DRL SOURCE 조회영역  -->
										<div class="card-body body-header" style="">
											<header class="card-header card-header-pd-mobile">
												<div class="card-actions card-header-position-mobile"></div>
												<h2 class="card-title_txt" id="ruleTestPop_title">RULE 속성</h2>
											</header>
											<!-- 경고 -->
											<div class="card-body" id="ruleAttrPreView" style="white-space: pre; height: 372px; overflow: auto;"></div>
											<!-- //경고 -->
										</div>
										<!-- //DRL SOURCE 조회영역 -->
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
		<!-- //RULE 테스트 팝업 -->

		<!-- 본문영역 -->
		<div class="content-page">
			<div class="content">
				<div class="container-fluid">
					<!-- 본문제목,페이지경로 -->
					<header class="page-header custom-con-header">
						<h2>Package 관리</h2>
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
									<span>Package</span>
								</li>
								<li>
									<span>Package 관리</span>
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
									<h2 class="card-title_txt">패키지 검색</h2>
								</header>
								<!-- 본문페이지 -->
								<div class="card-body" style="">
									<!-- 조회 -->
									<div class="searcharea">
										<div class="reset_btn-bottom">
											<button type="button" class="mg_t4 mg_r4 btn btn-sm btn-gray" id="pkgResetBtn">초기화</button>
										</div>
										<div class="search_btn-bottom">
											<button type="button" id="pkgSearchBtn" class="mg_t4 mg_r4 btn btn-sm btn-darkblue">
												<i class="fas fa-search custom-btn-i"></i>조회
											</button>
										</div>
										<div class="search_input">
											<div class="search_col">
												<div class="form_group">
													<label for="">패키지 ID</label> 
													<input type="text" id="pkgId_search" class="wd150px" value="" />
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
							<div class="card" id="pkgCardList">
								<header class="card-header card-header-pd-mobile">
									<div class="card-actions card-header-position-mobile">
										<span class="infonum"> <span class="txt_color_blue mg_l5 mg_r5" id="pkgCountBySearch"></span>건
										</span>
										<a href="#" class="card-action card-action-toggle" data-card-toggle></a>
									</div>
									<h2 class="card-title_txt">패키지 목록</h2>
								</header>
								<!-- 본문페이지 -->
								<div class="card-body" id="pkgCardListBody" style="">
									<div class="progress_loading">
										<div id="pkgLoading">
											<img src="/targetai_publish/images/ajax-loader1.gif" />
										</div>
									</div>
									<!-- 테이블 -->
									<div class="panel bd_b_none nobordertop">
										<table class="tb_type01">
											<colgroup>
												<col style="width: 5%;" />
												<col style="width: 7%;" />
												<col style="width: auto;" />
												<col style="width: 15%;" />
												<col style="width: 12%;" />
												<col style="width: 10%;" />
												<col style="width: 12%;" />
												<col style="width: 10%;" />
											</colgroup>
											<thead>
												<tr>
													<th>
														<div class="checkbox-container">
															<input type="checkbox" id="pkgListAllChkBox"/> 
															<label for="pkgListAllChkBox"></label>
														</div>
													</th>
													<th>ID</th>
													<th>패키지명</th>
													<th>DRL</th>
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
									<div class="custom-paging" id="pkgListPaging"></div>
									<!-- //페이징 -->

									<!-- 버튼 -->
									<div class="card-actions-foot">
										<button type="button" class="btn btn-sm btn-gray" id="deletePkgBtn">
											<i class="far fa-trash-alt custom-btn-i"></i> 삭제
										</button>
										<button type="button" class="btn btn-sm btn-green" id="addNewPkgBtn">
											<i class="el el-file-new custom-btn-i"></i> 신규 패키지 생성
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
							<div class="card card-collapsed" id="pkgCard">
								<header class="card-header card-header-pd-mobile">
									<div class="card-actions card-header-position-mobile">
										<a href="#" class="card-action card-action-toggle" data-card-toggle></a>
									</div>
									<h2 class="card-title_txt">패키지 상세</h2>
								</header>
								<!-- 본문페이지 -->
								<div class="card-body" id="pkgCardBody" style="display: none;">
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
														<th class="t_left">패키지 ID</th>
														<td class="t_left" id="pkgId"></td>
													</tr>
													<tr>
														<th class="t_left">패키지 명</th>
														<td class="t_left">
															<input type="text" class="wd250px" id="pkgNm" value="" />
															<button type="button" data-isDup="N" id="pkgNmDupBtn" class="btn btn-sm btn-gray">중복체크</button> 
															<span class="custom-red mg_l15" style="display: none;" id="pkgDupN">
																<i class="el el-idea"></i> 중복된 Package 명이 있습니다.
															</span> 
															<span class="custom-green mg_l15" style="display: none;" id="pkgDupY">
																<i class="el el-idea"></i> 사용가능 한 Package 명입니다.
															</span>
														</td>
													</tr>
													<tr>
														<th class="t_left">RULE</th>
														<td class="t_left" id="ruleCntInPkg"></td>
													</tr>
													<tr>
														<th class="t_left">RULE TEST</th>
														<td class="t_left" >
															<button type="button" id="ruleTestPopBtn" style="display:none;" class="btn btn-sm btn-green">OPEN</button> 
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
														<td class="t_left" id="pkgRegDt">2021-04-01 11:30:29에 홍길동(님)이 등록함.</td>
													</tr>
													<tr>
														<th class="t_left">마지막 수정</th>
														<td class="t_left" id="pkgUdtDt">2021-04-03 12:23:15에 홍길동(님)이 수정함.</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
									<!-- //테이블 -->

									<!-- 버튼 -->
									<div class="card-actions-foot">
										<button type="button" class="btn btn-sm btn-green" id="savePkgBtn">
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
								<div class="card-body" style="display: none;">
									<!-- 조회 -->
									<div class="searcharea">
										<div class="reset_btn-bottom">
											<button type="button" class="mg_t4 mg_r4 btn btn-sm btn-gray" id="ruleResetBtn">초기화</button>
										</div>
										<div class="search_btn-bottom">
											<button type="button" class="mg_t4 mg_r4 btn btn-sm btn-darkblue" id="ruleSearchBtn" data-pkgId="">
												<i class="fas fa-search custom-btn-i"></i>조회
											</button>
										</div>
										<div class="search_input">
											<div class="search_col">
												<div class="form_group">
													<label for="">RULE ID</label> <input type="text" class="wd150px" id="ruleId_search" value="" />
												</div>
												<div class="form_group">
													<label for="">등록자</label> <input type="text" class="wd150px" id="ruleRegUsrId_search" value="" />
												</div>
												<div class="oneline_group">
													<label for="">RULE 명</label> <input type="text" class="wd90" id="ruleNm_search" value="" />
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
										<span class="infonum"> <span class="txt_color_blue mg_l5 mg_r5" id="ruleCntInPkgBySearch"></span>건
										</span>
										<a href="#" id="ruleListCardOpen" class="card-action card-action-toggle"></a>
									</div>
									<h2 class="card-title_txt">RULE 목록</h2>
								</header>
								<!-- 본문페이지 -->
								<div class="card-body" id="ruleListCardBody" style="display: none;">
									<div class="progress_loading">
										<div id="ruleLoading">
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

					<!-- 상세영역 -->
					<div class="row">
						<div class="col">
							<!-- ※닫힘(기본정의): 1.class="card card-collapsed", 2.class="card-body" style="display:none;" 등 정의합니다. -->
							<div class="card card-collapsed" id="ruleCard">
								<header class="card-header card-header-pd-mobile">
									<div class="card-actions card-header-position-mobile">
										<button type="button" class="btn btn-sm btn-sky btnModal" id="ruleEditorPopUp" data-ruleId="">RULE EDITOR</button>
										<a href="#" id="ruleDetailCardOpen" class="card-action card-action-toggle"></a>
									</div>
									<h2 class="card-title_txt">RULE 상세</h2>
								</header>
								<!-- 본문페이지 -->
								<div class="card-body" id="ruleCardBody" style="display: none;">
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
														<th class="t_left">RULE ID</th>
														<td class="t_left" id="ruleId"></td>
													</tr>
													<tr>
														<th class="t_left">RULE 명</th>
														<td class="t_left"><input type="text" class="wd250px" id="ruleNm" value="" />
															<button type="button" data-isDup="N" id="ruleNmDupBtn" class="btn btn-sm btn-gray">중복체크</button> 
															<span class="custom-red mg_l15" style="display: none;" id="ruleDupN"><i class="el el-idea"></i> 중복된 RULE 명이 있습니다.</span> 
															<span class="custom-green mg_l15" style="display: none;" id="ruleDupY"><i class="el el-idea"></i> 사용가능 RULE 명입니다.</span>
														</td>
													</tr>
													<tr>
														<th class="t_left">NO-LOOP</th>
														<td class="t_left">
															<div class="radio-container mg_r0">
																<input type="radio" name="noLoop" value="true" id="" checked /> <label for="noLoop" class="mg_r10">TRUE</label> <input type="radio"
																	name="noLoop" value="false" id="" /> <label for="noLoop" class="mg_r10">FALSE</label>
															</div>
														</td>
													</tr>
													<tr>
														<th class="t_left">LOCK-ON-ACTIVE</th>
														<td class="t_left">
															<div class="radio-container mg_r0">
																<input type="radio" name="lockOnActive" value="true" id="" checked /> <label for="lockOnActive" class="mg_r10">TRUE</label> <input
																	type="radio" name="lockOnActive" value="false" id="" /> <label for="lockOnActive" class="mg_r10">FALSE</label>
															</div>
														</td>
													</tr>
													<tr>
														<th class="t_left">SALIENCE</th>
														<td class="t_left"><input type="text" class="wd150px" id="salience" value="" /></td>
													</tr>
													<tr>
														<th class="t_left">TARGET TYPE</th>
														<td class="t_left">
															<select id="targetType" class="wd150px">
																<option value="CUST">고객</option>
																<option value="CONT">계약</option>
															</select>
														</td>
													</tr>
													<tr>
														<th class="t_left">CONTENTS</th>
														<td class="t_left"><textarea rows="4" cols="7" class="txtsize_100 wd100" id="ruleWhenCont" placeholder="RULE EDITOR를 통해 생성하세요."
																readonly="readonly"></textarea></td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
									<!-- //테이블 -->

									<!-- 버튼 -->
									<div class="card-actions-foot">
										<button type="button" class="btn btn-sm btn-green" id="saveRuleBtn">
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
<script src="/targetai/js/pkg.js"></script>
<script src="/targetai_publish/js/app.js" type="text/javascript"></script>
<script src="/targetai_publish/libs/jquery-ui/jquery-ui.js" type="text/javascript"></script>

</body>
</html>