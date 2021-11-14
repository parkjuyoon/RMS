/**
 * 
 */
$(document).ready(function() {
	google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

	
	
});

function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['14:28', 20, 28, 38, 45],
      ['14:30', 20, 28, 38, 45],
      ['14:31', 20, 28, 38, 45],
      ['14:32', 20, 28, 38, 45],
      ['14:33', 20, 28, 38, 45],
      ['14:34', 20, 28, 38, 45],
      ['14:35', 20, 28, 38, 45],
      ['14:36', 20, 28, 38, 45],
      ['14:37', 20, 28, 38, 45],
      ['14:38', 20, 28, 38, 45],
      ['14:39', 20, 28, 38, 45],
      ['14:40', 20, 28, 38, 45],
      ['14:41', 20, 28, 38, 45],
      ['14:42', 20, 28, 38, 45],
      ['14:43', 20, 28, 38, 45],
      ['14:44', 20, 28, 38, 45],
      ['14:45', 20, 28, 38, 45],
      ['14:46', 20, 28, 38, 45],
      ['14:47', 20, 28, 38, 45],
      ['14:48', 20, 28, 38, 45],
      ['14:49', 31, 38, 55, 66],
      ['14:50', 50, 55, 77, 80],
      ['14:51', 77, 77, 66, 50],
      ['14:52', 68, 66, 22, 15]
      // Treat first row as data as well.
    ], true);

    var options = {
		legend:'none',
		candlestick: {
			risingColor: { strokeWidth: 0, fill: '#a52714' },   // red
			fallingColor: { strokeWidth: 0, fill: '#0000CD' } // blue
		},
  		chartArea:{
    	  	left:50,
    	  	top:30, 
    	  	right:50, 
    	  	bottom:50, 
    	  	width:'100%',
    	  	height:'100%'
  		}
    };

    var chart = new google.visualization.CandlestickChart(document.getElementById('chart_div'));

    chart.draw(data, options);
}


/**
 * 차트 그리는 함수
 * @returns
 */
//function drawChart() {
//    var data = google.visualization.arrayToDataTable([
//      ['시간', 'IB', 'OB'],
//      ['2021-11-01 12:00:00',  1000,      400],
//      ['2021-11-02 12:00:00',  1170,      460],
//      ['2021-11-03 12:00:00',  660,       1120],
//      ['2021-11-04 12:00:00',  1030,      540]
//    ]);
//
//    var options = {
//      title: 'Company Performance',
////      curveType: 'function',	// 둥근 선 그래프 옵션
//      width : 1400,
//      height : 400,
//      legend: { position: 'bottom' }
//    };
//
//    var chart = new google.visualization.Line(document.getElementById('lineChart'));
//
//    chart.draw(data, options);
//}

//function drawChart() {
//
//    var data = new google.visualization.DataTable();
//    data.addColumn('string', '시간');
//    data.addColumn('number', 'IN Bound Count');
//    data.addColumn('number', 'OUT Bound Count');
//
//    data.addRows([
//      ['00:00',  37.8, 80.8],
//      ['01:00',  37.8, 80.8],
//      ['02:00',  30.9, 69.5],
//      ['03:00',  25.4,   57],
//      ['04:00',  11.7, 18.8],
//      ['05:00',  11.9, 17.6],
//      ['06:00',   8.8, 13.6],
//      ['07:00',   7.6, 12.3],
//      ['08:00',  12.3, 29.2],
//      ['09:00',  16.9, 42.9],
//      ['10:00', 12.8, 30.9],
//      ['11:00',  5.3,  7.9],
//      ['12:00',  6.6,  8.4],
//      ['13:00',  4.8,  6.3],
//      ['14:00',  25.2,  6.2],
//      ['15:00',  4.2,  6.2],
//      ['16:00',  4.2,  36.2],
//      ['17:00',  4.2,  32.2],
//      ['18:00',  4.2,  26.2],
//      ['19:00',  4.2,  36.2],
//      ['20:00',  4.2,  6.2],
//      ['21:00',  4.2,  6.2],
//      ['22:00',  4.2,  6.2],
//      ['23:00',  4.2,  6.2]
//    ]);
//
//    var options = {
//      chart: {
//        title: 'IN Bound / Out Bound'
////        subtitle: 'in millions of dollars (USD)'
//      },
//      width: 1650,
//      height: 400
//    };
//
//    var chart = new google.charts.Line(document.getElementById('lineChart'));
//
//    chart.draw(data, google.charts.Line.convertOptions(options));
//  }
