<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<%@ include file="../targetai/comm/header.jsp"%>

<style type="text/css">
	.card::-webkit-scrollbar {
		display: none;
	}
</style>
</head>
<body class="loading" data-layout-mode="two-column"
	data-layout='{"mode": "light", "width": "fluid", "menuPosition": "fixed", "sidebar": { "color": "light", "size": "default", "showuser": false}, "topbar": {"color": "light"}, "showRightSidebarOnPageLoad": false}'>

	<div id="wrapper">
		<%@ include file="../targetai/comm/navbar.jsp"%>
		<%@ include file="../targetai/comm/side_menu.jsp"%>
		<%@ include file="../targetai/comm/alertPop.jsp"%>

		<!-- DRL 소스 보기 modal_pop -->
		<div id="drlSourcePop" class="modal_pop" style="z-index: 99999;">
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
		
		<!-- RULE 연결 선택 팝업 -->
		<div id="modal_ruleMapping" class="modal_pop">
			<div class="modal_content" style="width: 1100px;">
				<!-- 팝업항상중앙띄우기 -->
				<div class="modla_center">
					<div class="modal_header">
						<span class="close _ruleMappingPop_close" onclick="close_layerPop('modal_ruleMapping');" data-focusId="">&times;</span>
						<h2>RULE 연결</h2>
					</div>
					<!-- 본문 -->
					<div class="modal_body" style="height: 800px;">
						<div class="progress_loading">
							<div id="modal_ruleMappingLoading">
								<img src="/targetai_publish/images/ajax-loader1.gif" />
							</div>
						</div>
						<div class="modal_wrap">
							<div class="row">
								<div class="col" style="overflow:auto; height: 430px;">
									<!-- 본문페이지 -->
									<div class="card-body body-header">
										<header class="card-header card-header-pd-mobile">
											<div class="card-actions card-header-position-mobile"></div>
											<div class="form_group">
												<h2 class="card-title_txt" id="">연결 가능한 RULE : 
													<input type="text" onkeypress="javascript:if(event.keyCode==13) {fnConRuleSearch(this.value);}" name="ruleSearch" class="wd150px" value="" style="min-width: 155px;"/>
												</h2>
											</div>
										</header>
										<div class="card-body">
											<div class="panel bd_b_none nobordertop">
											<table class="tb_type01 tablesorter">
												<colgroup>
													<col style="width: 10%;" />
													<col style="width: 22%;" />
													<col style="width: 15%;" />
													<col style="width: auto;" />
												</colgroup>
												<thead>
													<tr>
														<th></th>
														<th>기본 우선순위</th>
														<th>아이디</th>
														<th>RULE 명</th>
													</tr>
												</thead>
												<tbody id="conRuleList"></tbody>
												</table>
											</div>
										</div>
									</div>
								</div>
								<div class="col" style="overflow:auto; height: 430px;">
									<!-- 본문페이지 -->
									<div class="card-body body-header">
										<header class="card-header card-header-pd-mobile">
											<div class="card-actions card-header-position-mobile"></div>
											<div class="form_group">
												<h2 class="card-title_txt" id="">연결 예정인 RULE : 
													<input type="text" onkeypress="javascript:if(event.keyCode==13) {fnMappingRuleSearch(this.value);}" name="ruleSearch" class="wd150px" value="" style="min-width: 155px;"/>
												</h2>
											</div>
										</header>
										<div class="card-body">
											<div class="panel bd_b_none nobordertop">
												<table class="tb_type01 tablesorter">
													<colgroup>
														<col style="width: 10%;" />
														<col style="width: 22%;" />
														<col style="width: 15%;" />
														<col style="width: auto;" />
													</colgroup>
													<thead>
														<tr>
															<th></th>
															<th>우선순위 <label class="_sortable"></label></th>
															<th>아이디</th>
															<th>RULE 명</th>
														</tr>
													</thead>
													<tbody id="mappingRuleList"></tbody>
												</table>
											</div>
										</div>
									</div>
									<!-- //본문페이지 -->
								</div>
							</div>
							<div class="row">
								<!-- 버튼 -->
								<div class="modal-footer" style="justify-content: center !important;">
									<button type="button" class="btn btn-sm btn-gray" onclick="close_layerPop('modal_ruleMapping');"><i class="far fa-times-circle custom-btn-i"></i> 닫기</button>
									<button type="button" class="btn btn-sm btn-green" id="ruleMappingSaveBtn"><i class="far fa-check-circle custom-btn-i"></i> 적용</button>
								</div>
								<!-- //버튼 -->
							</div>
							<!-- when 컨디션 ROW -->
							<div class="row">
								<div class="col">
									<div class="card-body body-header">
										<header class="card-header card-header-pd-mobile">
											<div class="card-actions card-header-position-mobile"></div>
											<div class="form_group">
												<h2 class="card-title_txt" id="ruleMappingRuleNm"> 
												</h2>
											</div>
										</header>
										<div class="card-body" style="height: 230px;">
											<textarea rows="9" cols="7" class="txtsize_100 wd100" id="ruleMappingWhen" readonly="readonly" placeholder=""></textarea>
										</div>
									</div>
								</div>
							</div>
							<!-- // when 컨디션 ROW -->
						</div>
					</div>
					<!-- //본문 -->
				</div>
				<!-- //팝업항상중앙띄우기 -->
			</div>
		</div>
		<!-- //RULE 연결 선택 팝업 -->

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
									<h2 class="card-title_txt">전체 패키지 목록</h2>
								</header>
								<!-- 본문페이지 -->
								<div class="card-body" id="pkgCardListBody" style="">
									<div class="progress_loading">
										<div id="pkgListLoading">
											<img src="/targetai_publish/images/ajax-loader1.gif" />
										</div>
									</div>
									<!-- 테이블 -->
									<div class="panel bd_b_none nobordertop">
										<table class="tb_type01 tablesorter">
											<colgroup>
												<col style="width: 5%;" />
												<col style="width: 7%;" />
												<col style="width: auto;" />
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
													<th>패키지 ID</th>
													<th>패키지명<label class="_sortable"></label></th>
													<th>운영중인 DRL</th>
													<th>개발중인 DRL</th>
													<th>수정일시</th>
													<th>수정자</th>
													<th>등록일시<label class="_sortable"></label></th>
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
								<div class="card-body" id="pkgCardBody" style="height: 379px; display: none;">
									<div class="progress_loading">
										<div id="pkgLoading">
											<img src="/targetai_publish/images/ajax-loader1.gif" />
										</div>
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
														<th class="t_left">RULE 연결</th>
														<td class="t_left">
															<button type="button" id="ruleMappingBtn" data-modalclass="modal_ruleMapping" title="팝업" class="btn btn-sm btn-green btnModal">연결</button>
															<span id="curPkgStatus"></span>
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
														<td class="t_left" id="pkgRegDt">-</td>
													</tr>
													<tr>
														<th class="t_left">마지막 수정</th>
														<td class="t_left" id="pkgUdtDt">-</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
									<!-- //테이블 -->

									<!-- 버튼 -->
									<div class="card-actions-foot">
										<button type="button" class="btn btn-sm btn-gray" id="savePkgBtn">
											<i class="fas fa-save custom-btn-i"></i> 저장
										</button>
									</div>
									<!-- //버튼 -->
								</div>
							</div>
						</div>
						<div class="col">
							<!-- ※닫힘(기본정의): 1.class="card card-collapsed", 2.class="card-body" style="display:none;" 등 정의합니다. -->
							<div class="card card-collapsed" id="pkgVerCardList" style="overflow: auto;">
								<header class="card-header card-header-pd-mobile">
									<div class="card-actions card-header-position-mobile">
										<span class="infonum"> <span class="txt_color_blue mg_l5 mg_r5" id="pkgVerCount"></span>건
										</span>
										<a href="#" class="card-action card-action-toggle" data-card-toggle></a>
									</div>
									<h2 class="card-title_txt">패키지 버전 목록</h2>
								</header>
								<!-- 본문페이지 -->
								<div class="card-body" id="pkgVerCardListBody" style="display:none; height: 379px;">
									<div class="progress_loading">
										<div id="pkgVerListLoading" style="display: none;">
											<img src="/targetai_publish/images/ajax-loader1.gif" />
										</div>
									</div>
									<!-- 테이블 -->
									<div class="panel bd_b_none nobordertop">
										<table class="tb_type01 tablesorter">
											<colgroup>
												<col style="width: 15%;" />
												<col style="width: auto;" />
												<col style="width: 10%;" />
												<col style="width: 20%;" />
												<col style="width: 20%;" />
											</colgroup>
											<thead>
												<tr>
													<th>패키지 버전</th>
													<th>DRL</th>
													<th>상태</th>
													<th>운영시작일</th>
													<th>운영종료일</th>
												</tr>
											</thead>
											<tbody id="pkgVerList">
												<tr>
													<td colspan="5" class="t_center">조회된 내용이 없습니다.</td>
												</tr>
											</tbody>
										</table>
									</div>
									<!-- //테이블 -->

									<!-- 페이징 -->
									<div class="custom-paging" id="pkgVerListPaging"></div>
									<!-- //페이징 -->
									
									<!-- 버튼 -->
									<div class="card-actions-foot">
										<button type="button" class="btn btn-sm btn-green" id="deployBtn">
											<i class="el el-file-new custom-btn-i"></i>개발중인 패키지 배포
										</button>
									</div>
									<!-- //버튼 -->
								</div>
								<!-- //본문페이지 -->
							</div>
						</div>
					</div>
					<!-- 이벤트 목록 그리드영역 -->
					<div class="row">
						<div class="col">
							<!-- ※닫힘(기본정의): 1.class="card card-collapsed", 2.class="card-body" style="display:none;" 등 정의합니다. -->
							<div class="card card-collapsed" id="eventCardList" style="overflow: auto;">
								<header class="card-header card-header-pd-mobile">
									<div class="card-actions card-header-position-mobile">
										<span class="infonum"> <span class="txt_color_blue mg_l5 mg_r5" id="eventCount"></span>건
										</span>
										<a href="#" class="card-action card-action-toggle" data-card-toggle></a>
									</div>
									<h2 class="card-title_txt">이벤트 목록</h2>
								</header>
								<!-- 본문페이지 -->
								<div class="card-body" id="eventCardListBody" style="display:none; height: 379px;">
									<div class="progress_loading">
										<div id="eventListLoading" style="display: none;">
											<img src="/targetai_publish/images/ajax-loader1.gif" />
										</div>
									</div>
									<!-- 테이블 -->
									<div class="panel bd_b_none nobordertop">
										<table class="tb_type01 tablesorter">
											<colgroup>
												<col style="width: 15%;" />
												<col style="width: auto;" />
												<col style="width: 10%;" />
												<col style="width: 20%;" />
												<col style="width: 20%;" />
											</colgroup>
											<thead>
												<tr>
													<th>이벤트 버전</th>
													<th>이벤트 명</th>
													<th>우선순위</th>
													<th>등록일</th>
													<th>등록자</th>
												</tr>
											</thead>
											<tbody id="eventList">
												<tr>
													<td colspan="5" class="t_center">조회된 내용이 없습니다.</td>
												</tr>
											</tbody>
										</table>
									</div>
									<!-- //테이블 -->

									<!-- 페이징 -->
									<div class="custom-paging" id="eventListPaging"></div>
									<!-- //페이징 -->
								</div>
								<!-- //본문페이지 -->
							</div>
						</div>
						<div class="col">
							<!-- ※닫힘(기본정의): 1.class="card card-collapsed", 2.class="card-body" style="display:none;" 등 정의합니다. -->
							<div class="card card-collapsed" id="eventCard">
								<header class="card-header card-header-pd-mobile">
									<div class="card-actions card-header-position-mobile">
										<a href="#" class="card-action card-action-toggle" data-card-toggle></a>
									</div>
									<h2 class="card-title_txt">RULE 조건</h2>
								</header>
								<!-- 본문페이지 -->
								<div class="card-body" id="eventCardBody" style="display: none; height: 379px;">
									<div class="progress_loading">
										<div id="eventLoading" style="display: none;">
											<img src="/targetai_publish/images/ajax-loader1.gif" />
										</div>
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
														<th class="t_left">이벤트 명</th>
														<td class="t_left" id="eventNm"></td>
													</tr>
													<tr>
														<th class="t_left">이벤트 내용</th>
														<td class="t_left">
															<textarea rows="14" cols="7" class="txtsize_100 wd100" id="eventDsc" readonly="readonly" placeholder=""></textarea>
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
									<!-- //테이블 -->
								</div>
							</div>
						</div>
					</div>
					<!-- // 패키지 버전 그리드영역 -->
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