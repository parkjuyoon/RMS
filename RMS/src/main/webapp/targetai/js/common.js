/**
 * 공통 js
 */
$(document).on("click", "a[href='#']", function(e) {
	e.preventDefault();
	e.stopPropagation();
});

// a링크를 가지고 있는 td 를 클릭시 a 링크 클릭
$(document).on("click", "td:has(>a)", function(e) {
	$(this).find("a").click();
});

/**
 * 테이블 정렬 기능 (th 안에 label class='_sortable' 추가)
 * @returns
 */
function fnSortableOption() {
	$("._sortable").html("\t▼");
	$("._sortable").attr("data-orderby", "desc");
	
	$(document).on("click", "._sortable", function() {
		var orderby = $(this).attr("data-orderby");
		var table = $(this).closest("table");
		var rows = table[0].rows;
		var cellIndex = $(this).closest("th")[0].cellIndex;
		
		var sortTable = function(orderby, cellIndex) {
			for(var i=1; i<(rows.length-1); i++) {
				var firstCell = rows[i].cells[cellIndex];
				var secondCell = rows[i+1].cells[cellIndex];
				
				var firstText = firstCell.textContent;
				var secondText = secondCell.textContent;
				
				// 원래는 td 안의 text로 정렬하는데 td 안의 input 안의 value일경우
				if(firstText == '') {
					firstText = firstCell.getElementsByTagName("input")[0].value;
				}
				if(secondText == '') {
					secondText = secondCell.getElementsByTagName("input")[0].value;
				}
				
				// 정렬
				if(orderby == 'desc') {
					// 텍스트가 문자 일 경우
					if(isNaN(firstText*1)) {
						if(firstText.toLowerCase() > secondText.toLowerCase()) {
							rows[i].parentNode.insertBefore(rows[i+1], rows[i]);
							return false;
						}
					// 텍스트가 숫자일 경우
					} else {
						firstText = firstText*1;
						secondText = secondText*1;
						
						if(firstText > secondText) {
							rows[i].parentNode.insertBefore(rows[i+1], rows[i]);
							return false;
						}
					}
				} 
				
				if(orderby == 'asc'){
					// 텍스트가 문자 일 경우
					if(isNaN(firstText*1)) {
						if(firstText.toLowerCase() < secondText.toLowerCase()) {
							rows[i].parentNode.insertBefore(rows[i+1], rows[i]);
							return false;
						}
					// 텍스트가 숫자일 경우
					} else {
						firstText = firstText*1;
						secondText = secondText*1;
						
						if(firstText < secondText) {
							rows[i].parentNode.insertBefore(rows[i+1], rows[i]);
							return false;
						}
					}
				}
			}
		};
		
		if(orderby  == "desc") {
			$(this).html("\t▲");
			$("._sortable").attr("data-orderby", "asc");
			
		} else {
			$(this).html("\t▼");
			$("._sortable").attr("data-orderby", "desc");
		}
		
		var rs = sortTable(orderby, cellIndex);
		
		while(true) {
			if(rs == false) {
				rs = sortTable(orderby, cellIndex);
			} else {
				break;
			}
		}
	});
}

/**
 * 페이징처리
 * @param elementId, totalCount, currentPage
 * @returns
 */
function fnPaging(elementId, searchObj) {
	const totalCount = searchObj.totalCount;
	const currentPage = searchObj.currentPage * 1;
	
    const dataPerPage = 10;
    const pageCount = 10;
    const totalPage = Math.ceil(totalCount / dataPerPage);    // 총 페이지 수
    const pageGroup = Math.ceil(currentPage / pageCount);    // 페이지 그룹
    
    let last = pageGroup * pageCount;    // 화면에 보여질 마지막 페이지 번호
    if (last > totalPage) {
        last = totalPage;
    }
    let first = last - (pageCount - 1);    // 화면에 보여질 첫번째 페이지 번호
    first = first < 1 ? 1 : first;
    
    const next = last + 1;
    const prev = first - 1;

    if (totalPage < 1) {
        first = last;
    }
    const pages = $(elementId);
    pages.empty();
    
    if(totalCount < 1) {
		return;
	}
    
    pages.append("<a href='#' class='_paging prev_start' data-page_num='"+ 1 +"'>맨앞</a> ");
    
    if (first > pageCount) {
        pages.append("<a href='#' class='_paging prev' data-page_num='"+ prev +"'>이전</a> ");
    }
    
    for (let j = first; j <= last; j++) {
        if (currentPage === (j)) {
            pages.append("<a href='#' class='_paging _pnum active' data-page_num='"+ j +"'>"+ j +"</a> ");
            
        } else if (j > 0 ) {
            pages.append("<a href='#' class='_paging _pnum' data-page_num='"+ j +"'>"+ j +"</a> ");
        }
    }
    
    if (next > pageCount && next < totalPage) {
        pages.append("<a href='#' class='_paging next' data-page_num='"+ next +"'>다음</a> ");
    }
    
    pages.append("<a href='#' class='_paging next_end' data-page_num='"+ totalPage +"'>맨뒤</a>");
}