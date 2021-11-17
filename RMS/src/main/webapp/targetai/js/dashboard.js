/**
 * 
 */
$(document).ready(function() {
	google.charts.load('current', {'packages':['corechart']});
	google.charts.setOnLoadCallback(ib_drawChart);
	google.charts.setOnLoadCallback(ob_drawChart);
	
	setInterval(function() {
		ib_drawChart();
		
	}, 1000 * 60);
    
});

function fnDrawChart() {
	var param = {};
	
	$.ajax({
		method : "POST",
		url : "/targetai/get.do",
		traditional: true,
		data : JSON.stringify(param),
		contentType:'application/json; charset=utf-8',
		dataType : "json",
		success : function(res) {
			console.log(res);
			
			
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
	console.log(new Date());
	var param = {};
	
	$.ajax({
		method : "POST",
		url : "/targetai/ib_drawChart.do",
		traditional: true,
		data : JSON.stringify(param),
		contentType:'application/json; charset=utf-8',
		dataType : "json",
		success : function(res) {
			var ibCharDataArr = res.ibCharDataList;
			var channelNmArr = res.channelNmList;
			var chartDatas = [];
			
			for(var i in ibCharDataArr) {
				var row = [];
				var title = [];
				
				row.push(ibCharDataArr[i].DISPLAY_DT);
				
				if(i == 0) {
					title.push('시간');
				}
				
				for(var j in channelNmArr) {
					row.push(ibCharDataArr[i][`${channelNmArr[j].CHANNEL_NM}`]);
					
					if(i == 0) {
						var channelNm = channelNmArr[j].CHANNEL_NM;
						title.push(channelNm.replace("|dot|", "."));
					}
				}
				
				if(i == 0) {
					chartDatas.push(title);
				}
				
				chartDatas.push(row);
			}
			
			data = google.visualization.arrayToDataTable(chartDatas);
			
			var options = {
//				curveType : 'function',
				legend : {
					position : 'bottom'
				},
				chartArea : {
					left : 50,
					top : 30,
					right : 50,
					bottom : 50,
				},
				hAxis : {
					baseline: 0
				},
				colors : [ 'red', 'orange', 'green' ]
			};

			var chart = new google.visualization.LineChart(document.getElementById('ib_chart_div'));
			chart.draw(data, options);
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
