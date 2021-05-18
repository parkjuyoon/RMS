<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<nav>
	<ul class="pagination">
		<li>
			<c:choose>
				<c:when test="${param.firstPageNum eq param.minPageNum }">
					<a href="#" aria-label="Previous" data-pageNum="${param.firstPageNum }">
						<span aria-hidden="true">&laquo;</span>
					</a>
				</c:when>
				<c:otherwise>
					<a href="#" aria-label="Previous" data-pageNum="${param.firstPageNum - 1 }">
						<span aria-hidden="true">&laquo;</span>
					</a>
				</c:otherwise>
			</c:choose>
		</li>
		<c:forEach var="i" begin="${param.firstPageNum }" end="${param.lastPageNum }" step="1">
			<c:choose>
				<c:when test="${param.pageNum eq i }">
					<li class="active">
						<a href="#" data-pageNum="${i }">${i }</a>
					</li>
				</c:when>
				<c:otherwise>
					<li>
						<a href="#" data-pageNum="${i }">${i }</a>
					</li>
				</c:otherwise>
			</c:choose>
		</c:forEach>
		<li>
			<c:choose>
				<c:when test="${param.lastPageNum eq param.maxPageNum }">
					<a href="#" aria-label="Next" data-pageNum="${param.lastPageNum }">
						<span aria-hidden="true">&raquo;</span>
					</a>
				</c:when>
				<c:otherwise>
					<a href="#" aria-label="Next" data-pageNum="${param.lastPageNum + 1 }">
						<span aria-hidden="true">&raquo;</span>
					</a>
				</c:otherwise>
			</c:choose>
		</li>
	</ul>
</nav>
