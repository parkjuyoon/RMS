<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<script type="text/javascript">
	$(document).on("click", "#modalID_message .close", function(e) {
		e.preventDefault();

		var focusId = $("#messagePop_close").data("focusId");
		if (focusId != "" || typeof focusId != "undefined") {
			$(focusId).focus();
		}
	});

	/**
	 * @param type message팝업 타입(warning, success, confirm)
	 * @param title 경고창 제목
	 * @param contents 경고창 내용
	 * @param focusId 경고창 닫은 후 포커싱 될 엘리먼트 아이디
	 * @returns
	 */
	function messagePop(type, title, contents, focusId) {
		$("#messagePop_img").removeClass();
		
		if(type == 'warning') {
			$("#messagePop_img").addClass("message_box icon_alert");
			$("#messagePop_btn").css("display", "none");
			
		} else if(type == 'success') {
			$("#messagePop_img").addClass("message_box icon_success");
			$("#messagePop_btn").css("display", "none");
			
		} else if(type == 'confirm') {
			$("#messagePop_img").addClass("message_box icon_confirm");
			$("#messagePop_btn").css("display", "");
			
		} else {
			alert("message 팝업 오픈 실패");
			return;
		}

		$("#messagePop_title").text(title);
		$("#messagePop_contents").text(contents);

		var viewModal = $("#modalID_message");

		if (viewModal.css("display") == "none") {
			viewModal.show();
			$("#messagePop_close").data("focusId", focusId);
		}
	}
</script>

<!-- modal_pop -->
<div id="modalID_message" class="modal_pop" style="z-index: 10000;">
	<div class="modal_content" style="width: 500px;">
		<!-- 팝업항상중앙띄우기 -->
		<div class="modla_center">
			<div class="modal_header">
				<span class="close" onclick="close_layerPop('modalID_message');" data-focusId="" id="messagePop_close">&times;</span>
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
									<div class="message_box" id="messagePop_img">
										<div class="message_tit" id="messagePop_title">페이지를 찾을 수 없습니다.</div>
										<div class="message_txt" id="messagePop_contents">경고창입니다. 페이지를 찾을 수 없습니다. 경고창입니다. 페이지를 찾을 수 없습니다. 경고창입니다. 페이지를 찾을 수 없습니다. 경고창입니다. 페이지를
											찾을 수 없습니다. 경고창입니다. 페이지를 찾을 수 없습니다. 경고창입니다. 페이지를 찾을 수 없습니다. 경고창입니다. 페이지를 찾을 수 없습니다. 경고창입니다. 페이지를 찾을 수 없습니다. 경고창입니다. 페이지를 찾을 수 없습니다. 경고창입니다.
											페이지를 찾을 수 없습니다.</div>
										<div class="mg_b30" id="messagePop_btn">
											<button type="button" data-modalclass="modalID_success" class="btn btn-sm btn-sky btnModal">
												<i class="far fa-check-circle custom-btn-i"></i> 확인 (success 띄우기 샘플)
											</button>
											<button type="button" data-modalclass="modalID_confirm" class="btn btn-sm btn-gray btnModal">
												<i class="far fa-times-circle custom-btn-i"></i> 취소 (confirm 띄우기 샘플)
											</button>
										</div>	
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