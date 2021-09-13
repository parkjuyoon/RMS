<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<style type="text/css">
.progress_loading {
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 9999;
}

#loadingIcon {
	display: none;
}

</style>
<head>
<%@ include file="../targetai/comm/header.jsp"%>
</head>
<body class="loading" data-layout-mode="two-column"
	data-layout='{"mode": "light", "width": "fluid", "menuPosition": "fixed", "sidebar": { "color": "light", "size": "default", "showuser": false}, "topbar": {"color": "light"}, "showRightSidebarOnPageLoad": false}'>

	<div id="wrapper">
		<%@ include file="../targetai/comm/navbar.jsp"%>
		<%@ include file="../targetai/comm/side_menu.jsp"%>
		<%@ include file="../targetai/comm/alertPop.jsp"%>
		
		<div class="progress_loading">
			<div id="loadingIcon">
				<img src="/targetai_publish/images/ajax-loader1.gif" />
			</div>
		</div>

		<!-- 본문영역 -->
		<div class="content-page">
			<div class="content">
				<div class="container-fluid">
					<!-- 본문제목,페이지경로 -->
					<header class="page-header custom-con-header">
						<h2>Setting</h2>
						<div class="right-wrapper t_right mg_r30">
							<ol class="breadcrumbs">
								<li>
									<a href="#">
										<i class="icons icon-home"></i>
									</a>
								</li>
								<li>
									<span>Setting</span>
								</li>
							</ol>
						</div>
					</header>
					<!-- //본문제목,페이지경로 -->

					<!-- 사용자설정 영역 -->
					<div class="row">
						<div class="col">
							<!-- ※닫힘(기본정의): 1.class="card card-collapsed", 2.class="card-body" style="display:none;" 등 정의합니다. -->
							<div class="card card-collapsed">
								<header class="card-header">
									<div class="card-actions">
										<a href="#" class="card-action card-action-toggle" data-card-toggle></a>
									</div>
									<h2 class="card-title_txt">사용자 설정</h2>
								</header>
								<!-- 본문페이지 -->
								<div class="card-body" id="" style="display: none;">
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
														<th class="t_left">아이디</th>
														<td class="t_left" id=""></td>
													</tr>
													<tr>
														<th class="t_left">비밀번호</th>
														<td class="t_left" id="">
															<input type="text" class="wd250px" id="" value="" />
														</td>
													</tr>
													<tr>
														<th class="t_left">이름</th>
														<td class="t_left" id=""></td>
													</tr>
													<tr>
														<th class="t_left">사번</th>
														<td class="t_left" id=""></td>
													</tr>
													<tr>
														<th class="t_left">부서</th>
														<td class="t_left" id="">
															<input type="text" class="wd250px" id="" value="" />
														</td>
													</tr>
													<tr>
														<th class="t_left">휴대폰 번호</th>
														<td class="t_left" id="">
															<input type="text" class="wd250px" id="" value="" placeholder="'-' 를 제외한 번호를 입력하세요."/>
														</td>
													</tr>
													<tr>
														<th class="t_left">가입일</th>
														<td class="t_left" id=""></td>
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
					<!-- //사용자설정 영역 -->
					
					<!-- DRL설정 영역 -->
					<div class="row">
						<div class="col">
							<!-- ※닫힘(기본정의): 1.class="card card-collapsed", 2.class="card-body" style="display:none;" 등 정의합니다. -->
							<div class="card card-collapsed">
								<header class="card-header">
									<div class="card-actions">
										<a href="#" class="card-action card-action-toggle" data-card-toggle></a>
									</div>
									<h2 class="card-title_txt">DRL 설정</h2>
								</header>
								<!-- 본문페이지 -->
								<div class="card-body" id="" style="display: none;">
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
														<th class="t_left">출력형식</th>
														<td class="t_left">
															<select id="svcActYn" class="wd150px">
																<option value="Y">JSON</option>
																<option value="N">XML</option>
															</select>
														</td>
													</tr>
													<tr>
														<th class="t_left">ROOT PATH</th>
														<td class="t_left" id="">
															<input type="text" class="wd250px" id="" value="" />
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
														<td class="t_left" id=""></td>
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
					<!-- //DRL설정 영역 -->					
					
					<!-- FUNCTION설정 영역 -->
					<div class="row">
						<div class="col">
							<!-- ※닫힘(기본정의): 1.class="card card-collapsed", 2.class="card-body" style="display:none;" 등 정의합니다. -->
							<div class="card card-collapsed">
								<header class="card-header">
									<div class="card-actions">
										<a href="#" class="card-action card-action-toggle" data-card-toggle></a>
									</div>
									<h2 class="card-title_txt">FUNCTION 설정</h2>
								</header>
								<!-- 본문페이지 -->
								<div class="card-body" id="" style="display: none;">
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
														<th class="t_left">함수명(한글)</th>
														<td class="t_left" id="">
															<div style="display: none;">
																<select id="funcSelect" class="wd250px"></select>
																<button type="button" id="addFuncBtn" class="btn btn-sm btn-gray" title="조회">신규 전환</button>
															</div>
															<div>
																<input type="text" class="wd250px" id="funcNm" value="" />
																<button type="button" id="selectFuncBtn" class="btn btn-sm btn-gray" title="조회">선택 전환</button>
															</div>
														</td>
													</tr>
													<tr>
														<th class="t_left">Class / Method 명</th>
														<td class="t_left" id="">
															<div>
																<input type="text" class="wd250px" id="funcNmEn" value="" placeholder="Class 명을 입력하세요."/>
																<input type="text" class="wd250px" id="methodNmEn" value="" placeholder="Method 명을 입력하세요."/>
																<button type="button" id="addImportBtn" class="btn btn-sm btn-gray" title="추가">추가</button>
															</div>
														</td>
													</tr>
													<tr>
														<th class="t_left">import Class</th>
														<td class="t_left" id="importClassTd"></td>
													</tr>
													<tr>
														<th class="t_left">Parameter</th>
														<td class="t_left" id="parameterTd">
															<div>
																<select id="paramTypeSelect" class="wd150px">
																	<option value="STRING">String</option>
																	<option value="INT">int</option>
																	<option value="DATE">date</option>
																</select>
																<input type="text" class="wd300px" id="" value="" />
																<button type="button" id="" class="btn btn-sm btn-gray _paramPlusBtn">+</button>
																<button type="button" id="" class="btn btn-sm btn-red _paramMinusBtn">-</button>
															</div>
														</td>
													</tr>
													<tr>
														<th class="t_left">Class 파일 업로드</th>
														<td class="t_left">
															<input type="text" class="wd250px" id="funcFileUploadView" value="" readonly="readonly"/>
															<input type="file" class="wd250px" id="" name="funcFileUpload" value="" readonly="readonly" style="display: none;"/>
															<button type="button" id="funcFileUploadBtn" data-modalclass="modal_svcConnPkg" class="btn_onlyico_search btnModal" title="조회">새창 열기</button>
														</td>
													</tr>
													<tr>
														<th class="t_left">Class 코드 에디터</th>
														<td class="t_left">
															<textarea rows="10" cols="7" class="txtsize_100 wd100" id="" placeholder="Method 내  JAVA 코드만 입력하세요."></textarea>
														</td>
													</tr>
													<tr>
														<th class="t_left">최초 등록</th>
														<td class="t_left" id=""></td>
													</tr>
													<tr>
														<th class="t_left">수정 일자</th>
														<td class="t_left" id=""></td>
													</tr>
													<tr>
														<th class="t_left">최종 수정자</th>
														<td class="t_left" id=""></td>
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
					<!-- //FUNCTION설정 영역 -->					
				</div>
			</div>
		</div>
		<!-- //본문영역 -->
	</div>
	
<!-- App js-->
<script src="/targetai/js/setting.js"></script>
<script src="/targetai_publish/js/app.js" type="text/javascript"></script>
<script src="/targetai_publish/libs/jquery-ui/jquery-ui.js" type="text/javascript"></script>

</body>
</html>