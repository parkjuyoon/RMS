<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<style type="text/css">
	.factorValSpanTitle {
		font-weight: bold;
		font-style: italic;
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

		<!-- RULE 테스트 팝업 -->
		<div id="modal_ruleTest" class="modal_pop">
			<div class="modal_content" style="width: 800px;">
				<!-- 팝업항상중앙띄우기 -->
				<div class="modla_center">
					<div class="modal_header">
						<span class="close _ruleTestPop_close" onclick="close_layerPop('modal_ruleTest');" data-focusId="">&times;</span>
						<h2>단위 테스트</h2>
					</div>
					<!-- 본문 -->
					<div class="modal_body" style="height: calc(100% - 25vh); overflow-x: hidden; overflow-y: auto;">
						<div class="modal_wrap">
							<!-- RULE 속성영역  -->
							<div class="row">
								<div class="col">
									<div class="card mg_b0">
										<div class="card-body body-header" style="">
											<div class="progress_loading">
												<div id="ruleTestLoading" style="display: none;">
													<img src="/targetai_publish/images/ajax-loader1.gif" />
												</div>
											</div>
											<header class="card-header card-header-pd-mobile">
												<div class="card-actions card-header-position-mobile"></div>
												<h2 class="card-title_txt">RULE 속성</h2>
											</header>
											<!-- 경고 -->
											<div class="card-body" id="ruleAttrPreView" style="white-space: pre; height: 240px; overflow: auto;"></div>
											<!-- //경고 -->
										</div>
									</div>
								</div>
							</div>
							<!-- // RULE 속성영역 -->
							<!-- 파라미터 및 결과 영역 -->
							<div class="row">
								<div class="col">
									<div class="card mg_b0">
										<div class="card-body body-header" style="">
											<header class="card-header card-header-pd-mobile">
												<div class="card-actions card-header-position-mobile"></div>
												<h2 class="card-title_txt">테스트 실행</h2>
											</header>
											<div class="card-body" style="height: 100px;">
												<div class="form_group" style="width: 100%;">
													<label for="">고객 아이디</label> <input type="text" class="wd300px" id="ruleTestCustNo" value="" /><br/><br/>
													<label for="">결과</label> <input type="text" class="wd300px" id="ruleTestResult" value="" readonly="readonly" />
												</div>
											</div>
											
											<!-- 버튼 -->
											<div class="card-actions-foot">
												<button type="button" class="mg_t4 mg_r4 btn btn-sm btn-green" id="ruleTestRunBtn">
													<i class="far fa-times-circle custom-btn-i"></i> 실행
												</button>
												<button type="button" class="mg_t4 mg_r4 btn btn-sm btn-gray" onclick="close_layerPop('modal_ruleTest');">
													<i class="far fa-check-circle custom-btn-i"></i> 닫기
												</button>
											</div>
											<!-- //버튼 -->
										</div>
									</div>
								</div>
							</div>
							<!-- // 파라미터 및 결과 영역 -->
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
						<h2>Inheritance</h2>
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
									<span>Inheritance</span>
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
									<h2 class="card-title_txt">RULE 검색</h2>
								</header>
								<!-- 본문페이지 -->
								<div class="card-body">
									<!-- 조회 -->
									<div class="searcharea">
										<div class="reset_btn-bottom">
											<button type="button" class="mg_t4 mg_r4 btn btn-sm btn-gray" id="ruleResetBtn">초기화</button>
										</div>
										<div class="search_btn-bottom">
											<button type="button" class="mg_t4 mg_r4 btn btn-sm btn-darkblue" id="ruleSearchBtn">
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
							<div class="card" id="ruleListCard">
								<header class="card-header card-header-pd-mobile">
									<div class="card-actions card-header-position-mobile">
										<span class="infonum"> <span class="txt_color_blue mg_l5 mg_r5" id="ihCntBySearch"></span>건
										</span>
										<a href="#" id="ihListCardOpen" class="card-action card-action-toggle"></a>
									</div>
									<h2 class="card-title_txt">RULE 상속정보 목록</h2>
								</header>
								<!-- 본문페이지 -->
								<div class="card-body" id="ihListCardBody">
									<div class="progress_loading">
										<div id="ruleLoading">
											<img src="/targetai_publish/images/ajax-loader1.gif" />
										</div>
									</div>
									<!-- 테이블 -->
									<div class="panel bd_b_none nobordertop">
										<table class="tb_type01">
											<colgroup>
												<col style="width: 10%;" />
												<col style="width: auto;" />
												<col style="width: 8%;" />
												<col style="width: 12%;" />
												<col style="width: 10%;" />
												<col style="width: 12%;" />
												<col style="width: 10%;" />
											</colgroup>
											<thead>
												<tr>
													<th>RULE 아이디</th>
													<th>RULE 버전</th>
													<th>RULE 명</th>
													<th>연결상태</th>
													<th>수정일시</th>
													<th>수정자</th>
													<th>등록일시</th>
													<th>등록자</th>
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

					<!-- 상세영역 -->
					<div class="row">
						<!-- RULE 상세 -->
						<div class="col">
							<!-- ※닫힘(기본정의): 1.class="card card-collapsed", 2.class="card-body" style="display:none;" 등 정의합니다. -->
							<div class="card card-collapsed" id="ruleCard">
								<header class="card-header card-header-pd-mobile">
									<div class="card-actions card-header-position-mobile">
										<button type="button" class="btn btn-sm btn-sky btnModal" id="ruleEditorPopUp" data-ruleId="">RULE EDITOR</button>
										<a href="#" id="ruleDetailCardOpen" class="card-action card-action-toggle" data-card-toggle></a>
									</div>
									<h2 class="card-title_txt">RULE 상세</h2>
								</header>
								<!-- 본문페이지 -->
								<div class="card-body" id="ruleCardBody" style="display: none; height: 379px;">
									<!-- 테이블 -->
									<div class="panel nobordertop">
										<div class="sform_head">
											<table class="sform_type">
												<colgroup>
													<col style="width: 17%" />
													<col style="width: auto" />
												</colgroup>
												<tbody>
													<tr>
														<th class="t_left">RULE 아이디</th>
														<td class="t_left"><span id="ruleId"></span> ( 버전 : <span id="ruleVer"></span>)</td>
													</tr>
													<tr>
														<th class="t_left">참조 RULE 아이디</th>
														<td class="t_left"><span id="refRuleId"></span> ( 버전 : <span  id="refRuleVer"></span>)</td>
													</tr>
													<tr>
														<th class="t_left">RULE 명</th>
														<td class="t_left" colspan="4"><input type="text" class="wd250px" id="ruleNm" value="" /></td>
													</tr>
													<tr>
														<th class="t_left">기본 우선 순위</th>
														<td class="t_left" colspan="4"><input type="text" class="wd150px" id="dfltSalience" value="1" /></td>
													</tr>
													<tr style="display: none;">
														<th class="t_left">NO-LOOP</th>
														<td class="t_left">
															<div class="radio-container mg_r0">
																<input type="radio" name="noLoop" value="true" id="" checked /> <label for="noLoop" class="mg_r10">TRUE</label> <input type="radio"
																	name="noLoop" value="false" id="" /> <label for="noLoop" class="mg_r10">FALSE</label>
															</div>
														</td>
													</tr>
													<tr style="display: none;">
														<th class="t_left">LOCK-ON-ACTIVE</th>
														<td class="t_left">
															<div class="radio-container mg_r0">
																<input type="radio" name="lockOnActive" value="true" id="" checked /> <label for="lockOnActive" class="mg_r10">TRUE</label> <input
																	type="radio" name="lockOnActive" value="false" id="" /> <label for="lockOnActive" class="mg_r10">FALSE</label>
															</div>
														</td>
													</tr>
													<tr>
														<th class="t_left">타겟 유형</th>
														<td class="t_left">
															<select id="targetType" class="wd150px">
																<option value="CUST">고객</option>
																<option value="CONT">계약</option>
															</select>
														</td>
													</tr>
													<tr>
														<th class="t_left">단위 테스트</th>
														<td class="t_left">
															<button type="button" id="ruleTestPopBtn" class="btn btn-sm btn-green">실행</button> 
														</td>
													</tr>
													<tr>
														<th class="t_left">조건 내용</th>
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
						<!-- // RULE 상세 -->
						<!-- RULE 버전 목록 -->
						<div class="col">
							<!-- ※닫힘(기본정의): 1.class="card card-collapsed", 2.class="card-body" style="display:none;" 등 정의합니다. -->
							<div class="card card-collapsed" id="ruleVerListCard" style="overflow: auto;">
								<header class="card-header card-header-pd-mobile">
									<div class="card-actions card-header-position-mobile">
										<span class="infonum"> <span class="txt_color_blue mg_l5 mg_r5" id="ruleVerCount"></span>건
										</span>
										<a href="#" class="card-action card-action-toggle" data-card-toggle></a>
									</div>
									<h2 class="card-title_txt">RULE 버전 목록</h2>
								</header>
								<!-- 본문페이지 -->
								<div class="card-body" id="ruleVerListCardBody" style="display:none; height: 379px;">
									<div class="progress_loading">
										<div id="ruleVerListLoading" style="display: none;">
											<img src="/targetai_publish/images/ajax-loader1.gif" />
										</div>
									</div>
									<!-- 테이블 -->
									<div class="panel bd_b_none nobordertop">
										<table class="tb_type01 tablesorter">
											<colgroup>
												<col style="width: 8%;" />
												<col style="width: auto;" />
												<col style="width: 10%;" />
												<col style="width: 20%;" />
												<col style="width: 20%;" />
											</colgroup>
											<thead>
												<tr>
													<th>No.</th>
													<th>RULE 버전</th>
													<th>상태</th>
													<th>등록일</th>
													<th>수정일</th>
												</tr>
											</thead>
											<tbody id="ruleVerList">
												<tr>
													<td colspan="5" class="t_center">조회된 내용이 없습니다.</td>
												</tr>
											</tbody>
										</table>
									</div>
									<!-- //테이블 -->

									<!-- 페이징 -->
									<div class="custom-paging" id="ruleVerListPaging"></div>
									<!-- //페이징 -->
									
									<!-- 버튼 -->
									<div class="card-actions-foot">
										<button type="button" class="btn btn-sm btn-green" id="ruleDeployBtn">
											<i class="el el-file-new custom-btn-i"></i>RULE 운영배포
										</button>
									</div>
									<!-- //버튼 -->
								</div>
								<!-- //본문페이지 -->
							</div>
						</div>
						<!-- //RULE 버전 목록 -->
					</div>
					<!-- //상세영역 -->
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