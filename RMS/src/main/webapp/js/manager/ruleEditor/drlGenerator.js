/**
 * Rule Generate 할 때 최종 DRL 파일 내용 생성
 */
function drlGenerator(ruleOpt, ruleName, ruleArr) {
	console.log(ruleArr)
	var drlTxt = "";
	
	drlTxt += "package rule\n";
	drlTxt += "import java.util.Map\n\n";
	drlTxt += "rule \"" + ruleName + "\"\n";
	drlTxt += "	no-loop " + ruleOpt.opt1 + "\n";
	drlTxt += "	lock-on-active " + ruleOpt.opt2 + "\n";
	drlTxt += "	salience " + ruleOpt.opt3 + "\n";
	drlTxt += "	when\n";
	
	for(var i=0; i<ruleArr.length; i++) {
		var ruleObj = ruleArr[i];
		
		drlTxt += "		this[\""+ ruleObj.factor_nm_en +"\"]" + ruleObj.logical_txt + ruleObj.factorVal + " " + ruleObj.relation_txt + "\n";
	}
	
	drlTxt += "";
	drlTxt += "	then\n";
	drlTxt += "		$map.put(\"RESULT\", \"Y\");\n";
	drlTxt += "end";
	
	return drlTxt;
}