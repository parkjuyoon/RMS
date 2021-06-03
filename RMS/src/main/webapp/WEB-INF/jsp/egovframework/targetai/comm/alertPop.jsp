<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<script type="text/javascript">
	$(document).on("click", "#modalID_warning .close", function(e) {
		e.preventDefault();
		
		var focusId = $("#alertPop_close").data("focusId");
		if(focusId != "" || typeof focusId != "undefined") {
			$(focusId).focus();
		}
	});
	
	/**
	 * @param title 경고창 제목
	 * @param contents 경고창 내용
	 * @param focusId 경고창 닫은 후 포커싱 될 엘리먼트 아이디
	 * @returns
	 */
	function alertPop(title, contents, focusId) {
		
		$("#alertPop_title").text(title);
		$("#alertPop_contents").text(contents);
		
		var viewModal = $("#modalID_warning");
		
	    if (viewModal.css("display") == "none") {
	        viewModal.show();
	        $("#alertPop_close").data("focusId", focusId);
	    }
	}
</script>

<!-- modal_pop -->
<div id="modalID_warning" class="modal_pop" style="z-index: 10000;">
	<div class="modal_content" style="width: 500px;">
		<!-- 팝업항상중앙띄우기 -->
		<div class="modla_center">
			<div class="modal_header">
				<span class="close" onclick="close_layerPop('modalID_warning');" data-focusId="" id="alertPop_close">&times;</span>
				<h2>Target AI Message</h2>
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
									<!-- 경고 -->
									<div class="message_box">
										<div class="message_tit" id="alertPop_title">페이지를 찾을 수 없습니다.</div>
										<div class="message_txt" id="alertPop_contents">경고창입니다. 페이지를 찾을 수 없습니다. 경고창입니다. 페이지를 찾을 수 없습니다. 경고창입니다. 페이지를 찾을 수 없습니다. 경고창입니다. 페이지를 찾을 수 없습니다. 경고창입니다. 페이지를
											찾을 수 없습니다. 경고창입니다. 페이지를 찾을 수 없습니다. 경고창입니다. 페이지를 찾을 수 없습니다. 경고창입니다. 페이지를 찾을 수 없습니다. 경고창입니다. 페이지를 찾을 수 없습니다. 경고창입니다. 페이지를 찾을 수 없습니다.</div>
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