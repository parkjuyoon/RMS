<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Rule List</title>

<script type="text/javascript" src="/common/js/jquery-3.6.0.min.js"></script>
<script src="/bootstrap-3.3.2-dist/js/bootstrap.min.js"></script>
<link rel="stylesheet" type="text/css" href="/bootstrap-3.3.2-dist/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="/bootstrap-3.3.2-dist/css/bootstrap-theme.min.css">

<script type="text/javascript" src="/common/js/pageUtil.js"></script>
<script type="text/javascript" src="/js/manager/ruleManager/ruleList.js"></script>

</head>
<body>
	<div>
		<table class="table table-hover">
			<caption>Rule List</caption>
			<colgroup>
				<col width="10%" />
				<col width="*" />
				<col width="15%" />
				<col width="15%" />
				<col width="10%" />
			</colgroup>
			<thead>
				<tr>
					<th>No.</th>
					<th>SERVICE</th>
					<th>PACKAGE</th>
					<th>DRL</th>
					<th>RULE NAME</th>
					<th>SALIENCE</th>
					<th>RULE 실행 순서</th>
					<th>DRL 등록일</th>
				</tr>
			</thead>
			<tbody id="ruleList"></tbody>
		</table>
	</div>
	<div id="paging"></div>
</body>
</html>

