/**
 * 공통 js
 */
$(document).on("click", "a[href='#']", function(e) {
	e.preventDefault();
});

function fnSortableOption() {
	$("._sortable").html("\t▼");
	$("._sortable").attr("data-orderby", "desc");
	
	$("._sortable").click(function() {
		var orderby = $(this).attr("data-orderby");
		var table = $(this).closest("table");
		var rows = table[0].rows;
		var cellIndex = $(this).closest("th")[0].cellIndex;
		
		var sortTable = function(orderby, cellIndex) {
			for(var i=1; i<(rows.length-1); i++) {
				var firstCell = rows[i].cells[cellIndex].children[0];
				var secondCell = rows[i+1].cells[cellIndex].children[0];
				
				if(typeof firstCell == 'undefined') {
					return;
				}
//				if(orderby == 'desc') {
					if(firstCell.innerHTML.toLowerCase() > secondCell.innerHTML.toLowerCase()) {
						rows[i].parentNode.insertBefore(rows[i+1], rows[i]);
						return false;
					}
//				} 
//				
//				if(orderby == 'asc'){
//					if(firstCell.innerHTML.toLowerCase() < secondCell.innerHTML.toLowerCase()) {
//						rows[i].parentNode.insertBefore(rows[i+1], rows[i]);
//					}
//				}
			}
			
		};
		
//		if(orderby  == "desc") {
			$(this).html("\t▲");
			$("._sortable").attr("data-orderby", "asc");
			var rs = sortTable(orderby, cellIndex);
			
			while(true) {
				if(rs == false) {
					$("._sortable").click();
				} else {
					break;
				}
			}
			
//		} else {
//			$(this).html("\t▼");
//			$("._sortable").attr("data-orderby", "desc");
//			sortTable(orderby, cellIndex);
//		}
	});
}

/**
 * 페이징처리
 * @param elementId, totalCount, currentPage
 * @returns
 */
function fnPaging(elementId, searchObj) {
	const totalCount = searchObj.totalCount;
	const currentPage = searchObj.currentPage;
	
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