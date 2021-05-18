/**
 * 
 */
function paging(totalCnt, pageNum) {	// totalCnt:데이터 총 개수, pageNum:선택된 페이지
	var pageGroup = Math.floor(pageNum/10);
	
	if(pageNum%10 == 0) {
		pageGroup -= 1;
	}
	
	var firstPageNum = pageGroup*10+1;
	var lastPageNum = pageGroup*10+10;
	
	var maxPageNum = Math.ceil(totalCnt / 10);
	
	if(lastPageNum > maxPageNum) {
		lastPageNum = maxPageNum;
	}
	
	var pageInfo = {};
	pageInfo.pageNum = pageNum;
	pageInfo.firstPageNum = firstPageNum;
	pageInfo.lastPageNum = lastPageNum;
	pageInfo.minPageNum = 1;
	pageInfo.maxPageNum = maxPageNum;
	
	$.ajax({
		url : "/template/manager/pageTemplate.jsp",
		dataType : "html",
		type :"POST",
		data : pageInfo,
		async:false	// ajax 통신 완료 후 return 해주기 위해 비동기 false
		
	}).done(function(res) {
		$("#paging").html(res);
		
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.log("에러")
		console.log(jqXHR)
		console.log(textStatus)
		console.log(errorThrown)
	});
}