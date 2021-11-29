const min = parseInt(2000);
const max = parseInt(5000);

var startTime = null;
var timeOut = null;

function startGame() {
	const a = Math.floor(Math.random() * (max - min + 1)) + min;
	console.log(a);
	document.getElementById('resultCont').style.display = "none";
	document.getElementById('startCont').style.display = "none";
	document.getElementById('greenCont').style.display = "none";
	document.getElementById('waitCont').style.display = "flex";
	timeOut = setTimeout( function() {
		startReaction();
	},a);
}

function startReaction() {
	document.getElementById('waitCont').style.display = "none";
	document.getElementById('greenCont').style.display = "flex";
	startTime = (new Date()).getTime();
}

function getReaction() {
	var endTime = (new Date()).getTime();
	var resultTime = endTime - startTime;
	if(resultTime > 1000) {
		resultText = "more than 1 Second";
	}else {
		resultText = resultTime+" ms";
	}
	result.innerHTML = "Your reaction was "+resultText;
	document.getElementById('greenCont').style.display = "none";
	document.getElementById('resultCont').style.display = "flex";
}

function failReaction() {
	clearTimeout(timeOut);
	result.innerHTML = "That was too early - RESTART";
	document.getElementById('waitCont').style.display = "none";
	document.getElementById('resultCont').style.display = "flex";
}