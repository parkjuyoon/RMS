<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!-- App js-->
<script src="/targetai/js/rule_test.js"></script>

<!-- RULE 테스트 팝업 -->
<div id="ruleTestPop" class="modal_pop">
	<div class="modal_content" style="width: 800px;">
		<!-- 팝업항상중앙띄우기 -->
		<div class="modla_center">
			<div class="modal_header">
				<span class="close _ruleTestPop_close" onclick="close_layerPop('ruleTestPop');" data-focusId="">&times;</span>
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
											<img src="/targetai_publish/images/ajax-loader.gif" />
										</div>
									</div>
									<header class="card-header card-header-pd-mobile">
										<div class="card-actions card-header-position-mobile"></div>
										<h2 class="card-title_txt" id="ruleTestPop_title">결과 확인</h2>
									</header>
									<!-- 경고 -->
									<div class="card-body">
										<div class="oneline_group">
											<label for="">Package 선택</label> 
											<select id="ruleTestPop_drlList" class="wd150px">
												<option>선택하세요.</option>
											</select>
										</div>
										<br />
										<br />
										<div id="ruleTestPop_input" style="height: 150px; overflow: auto;"></div>
										<br />

										<!-- 버튼 -->
										<div class="card-actions-foot">
											<button type="button" class="btn btn-sm btn-sky" id="ruleTestPop_resBtn">
												<i class="far fa-times-circle custom-btn-i"></i> 결과확인
											</button>
											<button type="button" class="btn btn-sm btn-gray _ruleTestPop_close" onclick="close_layerPop('ruleTestPop');">
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
																		<div class="progress_loading">
																			<div id="ruleTestResPopLoading">
																				<img src="/targetai_publish/images/ajax-loader.gif" />
																			</div>
																		</div>
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
									<div class="card-body" id="ruleAttrPreView" style="display: none; white-space: pre; height: 372px; overflow: auto;"></div>
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