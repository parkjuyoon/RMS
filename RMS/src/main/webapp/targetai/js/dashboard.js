/**
 * 
 */
$(document).ready(function() {
	google.charts.load('current', {'packages':['corechart']});
    
	// 차트 그리기
	fnDrawChart();
	
});

function fnDrawChart() {
	var param = {};
	
	$.ajax({
		method : "POST",
		url : "/targetai/getSvclogList.do",
		traditional: true,
		data : JSON.stringify(param),
		contentType:'application/json; charset=utf-8',
		dataType : "json",
		success : function(res) {
			console.log(res);
			
			google.charts.setOnLoadCallback(ib_drawChart);
		    google.charts.setOnLoadCallback(ob_drawChart);
		},
		beforeSend : function() {
			$("#chartLoading").show();
		},
		complete : function() {
			$("#chartLoading").hide();
		},
		error : function(jqXHR, textStatus, errorThrown) {
			messagePop("warning", "에러발생", "관리자에게 문의하세요", "");
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});	
}

function ib_drawChart() {
	var data = google.visualization.arrayToDataTable([
		['시간', 'IN Bound Count'],
		[ '00:00', 37.8], 
		[ '01:00', 37.8], 
		[ '02:00', 30.9], 
		[ '03:00', 25.4], 
		[ '04:00', 11.7],
		[ '05:00', 11.9], 
		[ '06:00', 8.8], 
		[ '07:00', 7.6], 
		[ '08:00', 12.3], 
		[ '09:00', 16.9],
		[ '10:00', 12.8], 
		[ '11:00', 5.3], 
		[ '12:00', 6.6], 
		[ '13:00', 4.8], 
		[ '14:00', 25.2],
		[ '15:00', 4.2], 
		[ '16:00', 4.2], 
		[ '17:00', 4.2], 
		[ '18:00', 4.2], 
		[ '19:00', 4.2],
		[ '20:00', 4.2], 
		[ '21:00', 4.2], 
		[ '22:00', 4.2], 
		[ '23:00', 4.2] 
		]);

	var options = {
//		curveType : 'function',
		legend : {
			position : 'bottom'
		},
		chartArea : {
			left : 50,
			top : 30,
			right : 50,
			bottom : 50,
		},
		colors : [ '#a52714' ]
	};

	var chart = new google.visualization.LineChart(document.getElementById('ib_chart_div'));

	chart.draw(data, options);
}

function ob_drawChart() {
	var data = google.visualization.arrayToDataTable([
		['시간', 'KOS', 'KT', 'Olleh.com'],
		[ '00:00', 34, 12, 24], 
		[ '01:00', 37, 34, 12], 
		[ '02:00', 32, 11, 24], 
		[ '03:00', 32, 76, 32], 
		[ '04:00', 37, 32, 24],
		[ '05:00', 36, 7, 32], 
		[ '06:00', 37, 12, 24], 
		[ '07:00', 36, 36, 12], 
		[ '08:00', 37, 48, 24], 
		[ '09:00', 5, 59, 24],
		[ '10:00', 37, 60, 24], 
		[ '11:00', 36, 71, 32], 
		[ '12:00', 5, 42, 24], 
		[ '13:00', 37, 32, 60], 
		[ '14:00', 42, 22, 24],
		[ '15:00', 5, 12, 24], 
		[ '16:00', 37, 0, 24], 
		[ '17:00', 42, 5, 60], 
		[ '18:00', 37, 15, 24], 
		[ '19:00', 5, 12, 60],
		[ '20:00', 42, 12, 24], 
		[ '21:00', 37, 12, 12], 
		[ '22:00', 37, 24, 24], 
		[ '23:00', 37, 12, 60] 
		]);

	var options = {
//		curveType : 'function',
		legend : {
			position : 'bottom'
		},
		chartArea : {
			left : 50,
			top : 30,
			right : 50,
			bottom : 50,
		},
		colors : [ 'red', 'orange', 'green' ]
	};

	var chart = new google.visualization.LineChart(document.getElementById('ob_chart_div'));

	chart.draw(data, options);
}
