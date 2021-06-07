<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title>Target AI</title>
<link rel="shortcut icon" href="/targetai_publish/images/favicon.ico" />

<!-- Bootstrap css -->
<link href="/targetai_publish/libs/font-awesome/css/all.min.css" rel="stylesheet" type="text/css" />
<link href="/targetai_publish/libs/jquery-ui/jquery-ui.css" rel="stylesheet" type="text/css" />
<link href="/targetai_publish/libs/elusive-icons/css/elusive-icons.css" rel="stylesheet" type="text/css" />
<link href="/targetai_publish/css/config/custom/bootstrap.css" rel="stylesheet" type="text/css" id="bs-default-stylesheet" />
<link href="/targetai_publish/css/config/custom/app.css" rel="stylesheet" type="text/css" id="app-default-stylesheet" />
<link href="/targetai_publish/css/config/custom/app-dark.min.css" rel="stylesheet" type="text/css" id="app-dark-stylesheet" />
<link href="/targetai_publish/css/icons.min.css" rel="stylesheet" type="text/css" />
<link href="/targetai_publish/css/config/custom/zTreeStyle.css" rel="stylesheet" type="text/css" />

<!-- Default/tree js-->
<script src="/targetai_publish/js/jquery-3.6.0.min.js" type="text/javascript"></script>
<script src="/targetai_publish/js/vendor.min.js" type="text/javascript"></script>
<script src="/targetai_publish/js/jquery.ztree.core.js" type="text/javascript"></script>

<style type="text/css">

.progress_loading {
	position: absolute;
	left: 50%;
	top: 50%;
	background: #ffffff;
}

</style>

<script type="text/javascript">			
		// zTree 설정 
		var setting = {
			data: {
				simpleData: {
					enable: true
				}
			}
		};
		
		// Data
		var zNodes =[
			{ id:1, pId:0, name:"요금제", isParent:true, open:false},
			{ id:111, pId:1, name:"개인정보수집사용동의여부"},
			{ id:112, pId:1, name:"고객분류유형명"},
			{ id:113, pId:1, name:"미납여부"},
			{ id:114, pId:1, name:"EC고객여부"},
			{ id:115, pId:1, name:"성별"},
			{ id:2, pId:0, name:"ex 02", isParent:true, open:false},
			{ id:121, pId:2, name:"개인정보수집사용동의여부"},
			{ id:122, pId:2, name:"고객분류유형명"},
			{ id:123, pId:2, name:"미납여부"},
			{ id:124, pId:2, name:"EC고객여부"},
			{ id:125, pId:2, name:"성별"},
			{ id:3, pId:0, name:"ex 03", isParent:true, open:false}
		];
		
		// zTree 초기화
		$(document).ready(function(){
			$.fn.zTree.init($("#treeDemo"), setting, zNodes);
		});		
	</script>