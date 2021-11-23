/**
 * 대시보드 js
 */

$(document).ready(function() {
	var ibContext = document.getElementById("ib_chart_canvas").getContext('2d');
	var ibChart = new Chart(ibContext, {
        type: 'line', // 차트의 형태
        data: {}, // 차트에 들어갈 데이터
        options : {
        	animation: {
				duration : 0
			},
			responsive : false, // responsive는 디폴트로 true로 되어있기 때문에
								// false로 변경하여 주면 원하는 크기의 chart를 만들어 줄 수
								// 있다.
			scales : {
				yAxes : {
					ticks : {
						beginAtZero : true
					}
				}
			},
		}
    });
	
	var obContext = document.getElementById("ob_chart_canvas").getContext('2d');
	var obChart = new Chart(obContext, {
		type: 'line', // 차트의 형태
		data: {}, // 차트에 들어갈 데이터
		options : {
			animation: {
				duration : 0
			},
			responsive : false, // responsive는 디폴트로 true로 되어있기 때문에
			// false로 변경하여 주면 원하는 크기의 chart를 만들어 줄 수
			// 있다.
			scales : {
				yAxes : {
					ticks : {
						beginAtZero : true
					}
				}
			}
		}
	});
	
	fnGetChartData(ibChart, obChart);
	
	setInterval(function() {
		fnGetChartData(ibChart, obChart);
		
	}, 1000 * 60);
});

/**
 * 차트 그리는 기능
 * @returns
 */
function fnGetChartData(ibChart, obChart) {
	var param = {};
	
	$.ajax({
		method : "POST",
		url : "/targetai/getChartData.do",
		traditional: true,
		data : JSON.stringify(param),
		contentType:'application/json; charset=utf-8',
		dataType : "json",
		success : function(res) {
			var ibCharDataArr = res.ibCharDataList;
			var obCharDataArr = res.obCharDataList;
			var channelNmArr = res.channelNmList;
			
			// IN Bound Chart 그리기
			var ibReturnObj = fnDrawChart(channelNmArr, ibCharDataArr, "ib_chart_canvas");
			ibChart.data.labels = ibReturnObj.axisX;
			ibChart.data.datasets = ibReturnObj.dataSet;
			ibChart.update();
			// OUT Bound Chart 그리기
			var obReturnObj = fnDrawChart(channelNmArr, obCharDataArr, "ob_chart_canvas");
			obChart.data.labels = obReturnObj.axisX;
			obChart.data.datasets = obReturnObj.dataSet;
			obChart.update();
		},
		beforeSend : function() {
			$(".chartLoading").show();
		},
		complete : function() {
			$(".chartLoading").hide();
		},
		error : function(jqXHR, textStatus, errorThrown) {
			messagePop("warning", "에러발생", "관리자에게 문의하세요", "");
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

/**
 * 차트 데이터 만드는 기능
 * @param titleArr
 * @param dataArr
 * @returns
 */
function fnDrawChart(channelNmArr, charDataArr, elementId) {
	var returnObj = {};
	// In Bound Chart 그리기
	var axisX = [];
	var dataSet = [];
	
	for(var i in charDataArr) {
		axisX.push(charDataArr[i].DISPLAY_DT);
	}
	
	for(var i in channelNmArr) {
		var dataArr = [];
		
		for(var j in charDataArr) {
			var chartData = charDataArr[j][`${channelNmArr[i].CHANNEL_NM}`]
			dataArr.push(chartData);
		}
		
		var dataObj = { //데이터
            label: channelNmArr[i].CHANNEL_NM.replace("|dot|", "."), //차트 제목
            fill: false, // line 형태일 때, 선 안쪽을 채우는지 안채우는지
            data: dataArr,
            backgroundColor: [
                //색상
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                //경계선 색상
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 2 //경계선 굵기
        }
		
		dataSet.push(dataObj);
	}
	
//	var context = document.getElementById(elementId).getContext('2d');
//	var chart = new Chart(context, {
//        type: 'line', // 차트의 형태
//        data: { // 차트에 들어갈 데이터
//            labels: axisX,
//            datasets: dataSet
//        },
//        options : {
//			responsive : false, // responsive는 디폴트로 true로 되어있기 때문에
//								// false로 변경하여 주면 원하는 크기의 chart를 만들어 줄 수
//								// 있다.
//			scales : {
//				yAxes : {
//					ticks : {
//						beginAtZero : true
//					}
//				}
//			},
//		}
//    });
	
	returnObj.axisX = axisX;
	returnObj.dataSet = dataSet;
	
	return returnObj;
}
