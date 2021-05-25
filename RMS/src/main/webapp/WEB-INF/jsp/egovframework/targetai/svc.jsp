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
							<div class="card card-collapsed">
								<header class="card-header">
									<div class="card-actions">
										<a href="#" class="card-action card-action-toggle" data-card-toggle></a>
									</div>
									<h2 class="card-title_txt">★영역 닫힘(기본정의) 샘플</h2>
								</header>
								<!-- 본문페이지 -->
								<div class="card-body" style="display:none;">
									<!-- 조회 -->
									<div class="searcharea">
										<div class="reset_btn-bottom">
											<button type="button" class="mg_t4 mg_r4 btn btn-sm btn-gray">초기화</button>
										</div>
										<div class="search_btn-bottom">
											<button type="button" class="mg_t4 mg_r4 btn btn-sm btn-darkblue"><i class="fas fa-search custom-btn-i"></i>조회</button>
										</div>
										<div class="search_input">
											<div class="search_col">
												<div class="form_group">
													<label for="">서비스 ID</label>
													<input type="text" class="wd150px" value="S-001" />
												</div>
												<div class="form_group">
													<label for="">활성여부</label>
													<select id="" class="wd150px">
														<option value="" selected="selected">활성</option>
													</select>
												</div>
												<div class="form_group">
													<label for="">등록자</label>
													<input type="text" class="wd150px" value="담당자" />
												</div>
												<div class="oneline_group">
													<label for="">서비스 명</label>
													<input type="text" class="wd80" value="" />
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
											<button type="button" class="mg_t4 mg_r4 btn btn-sm btn-darkblue"><i class="fas fa-search custom-btn-i"></i>조회</button>
										</div>
										<div class="search_input">
											<div class="search_col">
												<div class="form_group">
													<label for="">서비스 ID</label>
													<input type="text" class="wd150px" value="S-001" />
												</div>
												<div class="form_group">
													<label for="">활성여부</label>
													<select id="" class="wd150px">
														<option value="" selected="selected">활성</option>
													</select>
												</div>
												<div class="form_group">
													<label for="">등록자</label>
													<input type="text" class="wd150px" value="담당자" />
												</div>
												<div class="oneline_group">
													<label for="">서비스 명</label>
													<input type="text" class="wd90" value="" />
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
											총<span class="txt_color_blue mg_l5 mg_r5">583</span>건
										</span>
										<a href="#" class="card-action card-action-toggle" data-card-toggle></a>
									</div>
									<h2 class="card-title_txt">서비스 목록</h2>
								</header>
								<!-- 본문페이지 -->
								<div class="card-body" style="">
									<!-- 테이블 -->
									<div class="panel bd_b_none nobordertop">
										<table class="tb_type01">
											<colgroup>
												<col style="width:5%;" />
												<col style="width:10%;" />
												<col style="width:7%;" />
												<col style="width:auto;" />
												<col style="width:auto;" />
												<col style="width:8%;" />
												<col style="width:8%;" />
												<col style="width:7%;" />
												<col style="width:8%;" />
												<col style="width:7%;" />
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
											<tbody>
												<tr>
													<td class="t_center">
														<div class="checkbox-container">
															<input type="checkbox" id="checkbox_12" />
															<label for="checkbox_12"></label>
														</div>
													</td>
													<td class="t_center">S-001</td>
													<td class="t_center">KOS</td>
													<td class="t_center">Kos 룰 서비스</td>
													<td class="t_center">[P-001] 5G 가입 패키지</td>
													<td class="t_center">활성</td>
													<td class="t_center">2021-04-03</td>
													<td class="t_center">홍길동</td>
													<td class="t_center">2021-04-01</td>
													<td class="t_center">홍길동</td>
												</tr>
												<tr>
													<td class="t_center">
														<div class="checkbox-container">
															<input type="checkbox" id="checkbox_12" />
															<label for="checkbox_12"></label>
														</div>
													</td>
													<td class="t_center">S-002</td>
													<td class="t_center">KOS</td>
													<td class="t_center">Kos 룰 서비스</td>
													<td class="t_center">[P-001] 5G 가입 패키지</td>
													<td class="t_center">활성</td>
													<td class="t_center">2021-04-03</td>
													<td class="t_center">홍길동</td>
													<td class="t_center">2021-04-01</td>
													<td class="t_center">홍길동</td>
												</tr>
												<tr>
													<td class="t_center">
														<div class="checkbox-container">
															<input type="checkbox" id="checkbox_12" />
															<label for="checkbox_12"></label>
														</div>
													</td>
													<td class="t_center">S-003</td>
													<td class="t_center">KOS</td>
													<td class="t_center">Kos 룰 서비스</td>
													<td class="t_center">[P-001] 5G 가입 패키지</td>
													<td class="t_center">활성</td>
													<td class="t_center">2021-04-03</td>
													<td class="t_center">홍길동</td>
													<td class="t_center">2021-04-01</td>
													<td class="t_center">홍길동</td>
												</tr>
												<tr>
													<td class="t_center">
														<div class="checkbox-container">
															<input type="checkbox" id="checkbox_12" />
															<label for="checkbox_12"></label>
														</div>
													</td>
													<td class="t_center">S-004</td>
													<td class="t_center">KOS</td>
													<td class="t_center">Kos 룰 서비스</td>
													<td class="t_center">[P-001] 5G 가입 패키지</td>
													<td class="t_center">활성</td>
													<td class="t_center">2021-04-03</td>
													<td class="t_center">홍길동</td>
													<td class="t_center">2021-04-01</td>
													<td class="t_center">홍길동</td>
												</tr>
												<tr>
													<td class="t_center">
														<div class="checkbox-container">
															<input type="checkbox" id="checkbox_12" />
															<label for="checkbox_12"></label>
														</div>
													</td>
													<td class="t_center">S-005</td>
													<td class="t_center">KOS</td>
													<td class="t_center">Kos 룰 서비스</td>
													<td class="t_center">[P-001] 5G 가입 패키지</td>
													<td class="t_center">활성</td>
													<td class="t_center">2021-04-03</td>
													<td class="t_center">홍길동</td>
													<td class="t_center">2021-04-01</td>
													<td class="t_center">홍길동</td>
												</tr>
												<tr>
													<td class="t_center">
														<div class="checkbox-container">
															<input type="checkbox" id="checkbox_12" />
															<label for="checkbox_12"></label>
														</div>
													</td>
													<td class="t_center">S-006</td>
													<td class="t_center">KOS</td>
													<td class="t_center">Kos 룰 서비스</td>
													<td class="t_center">[P-001] 5G 가입 패키지</td>
													<td class="t_center">활성</td>
													<td class="t_center">2021-04-03</td>
													<td class="t_center">홍길동</td>
													<td class="t_center">2021-04-01</td>
													<td class="t_center">홍길동</td>
												</tr>
												<tr>
													<td class="t_center">
														<div class="checkbox-container">
															<input type="checkbox" id="checkbox_12" />
															<label for="checkbox_12"></label>
														</div>
													</td>
													<td class="t_center">S-007</td>
													<td class="t_center">KOS</td>
													<td class="t_center">Kos 룰 서비스</td>
													<td class="t_center">[P-001] 5G 가입 패키지</td>
													<td class="t_center">활성</td>
													<td class="t_center">2021-04-03</td>
													<td class="t_center">홍길동</td>
													<td class="t_center">2021-04-01</td>
													<td class="t_center">홍길동</td>
												</tr>
												<tr>
													<td class="t_center">
														<div class="checkbox-container">
															<input type="checkbox" id="checkbox_12" />
															<label for="checkbox_12"></label>
														</div>
													</td>
													<td class="t_center">S-008</td>
													<td class="t_center">KOS</td>
													<td class="t_center">Kos 룰 서비스</td>
													<td class="t_center">[P-001] 5G 가입 패키지</td>
													<td class="t_center">활성</td>
													<td class="t_center">2021-04-03</td>
													<td class="t_center">홍길동</td>
													<td class="t_center">2021-04-01</td>
													<td class="t_center">홍길동</td>
												</tr>
												<tr>
													<td class="t_center">
														<div class="checkbox-container">
															<input type="checkbox" id="checkbox_12" />
															<label for="checkbox_12"></label>
														</div>
													</td>
													<td class="t_center">S-009</td>
													<td class="t_center">KOS</td>
													<td class="t_center">Kos 룰 서비스</td>
													<td class="t_center">[P-001] 5G 가입 패키지</td>
													<td class="t_center">활성</td>
													<td class="t_center">2021-04-03</td>
													<td class="t_center">홍길동</td>
													<td class="t_center">2021-04-01</td>
													<td class="t_center">홍길동</td>
												</tr>
												<tr>
													<td class="t_center">
														<div class="checkbox-container">
															<input type="checkbox" id="checkbox_12" />
															<label for="checkbox_12"></label>
														</div>
													</td>
													<td class="t_center">S-010</td>
													<td class="t_center">KOS</td>
													<td class="t_center">Kos 룰 서비스</td>
													<td class="t_center">[P-001] 5G 가입 패키지</td>
													<td class="t_center">활성</td>
													<td class="t_center">2021-04-03</td>
													<td class="t_center">홍길동</td>
													<td class="t_center">2021-04-01</td>
													<td class="t_center">홍길동</td>
												</tr>
											</tbody>
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
										<button type="button" class="btn btn-sm btn-green"><i class="el el-file-new custom-btn-i"></i> 신규 서비스 생성</button>
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
							<div class="card">
								<header class="card-header card-header-pd-mobile">
									<div class="card-actions card-header-position-mobile">
										<a href="#" class="card-action card-action-toggle" data-card-toggle></a>
									</div>
									<h2 class="card-title_txt">서비스 상세</h2>
								</header>
								<!-- 본문페이지 -->
								<div class="card-body" style="">
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
														<td class="t_left">
															S-001
														</td>
													</tr>
													<tr>
														<th class="t_left">서비스 명</th>
														<td class="t_left">
															<input type="text" class="wd250px" value="KOS 룰 서비스" />
															<button type="button" class="btn btn-sm btn-gray">중복체크</button>
															<span class="custom-red mg_l15"><i class="el el-idea"></i> 중복된 서비스 명이 있습니다.</span>
														</td>
													</tr>
													<tr>
														<th class="t_left">연결된 채널</th>
														<td class="t_left">
															<input type="text" class="wd150px" value="" />
															<button type="button" class="btn_onlyico_search" title="조회">새창 열기</button>
														</td>
													</tr>
													<tr>
														<th class="t_left">연결된 패키지</th>
														<td class="t_left">
															<input type="text" class="wd150px" value="" />
															<button type="button" class="btn_onlyico_search" title="조회">새창 열기</button>
														</td>
													</tr>
													<tr>
														<th class="t_left">활성여부</th>
														<td class="t_left">
															<select id="" class="wd150px">
																<option value="" selected="selected">활성</option>
															</select>
														</td>
													</tr>
													<tr>
														<th class="t_left">설명</th>
														<td class="t_left">
															<textarea rows="4" cols="7" class="txtsize_100 wd100">서비스 상세 설명입니다.</textarea>
														</td>
													</tr>
													<tr>
														<th class="t_left">최초 등록</th>
														<td class="t_left">
															2021-04-01 11:30:29에 홍길동(님)이 등록함.
														</td>
													</tr>
													<tr>
														<th class="t_left">마지막 수정</th>
														<td class="t_left">
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
				</div>
			</div>
		</div>
		<!-- //본문영역 -->
	</div>

	<!-- Default js -->
	<script src="/targetai/js/vendor.min.js"></script>

	<!-- App js-->
	<script src="/targetai/js/app.js"></script>
</body>
</html>