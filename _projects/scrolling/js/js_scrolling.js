let position = 0;
let positionNew = 0;
let windowHeight = 0;
let viewPort = 0;
let direction = "";

function scrollueberwachung(windowHeight) {
	positionNew = window.pageYOffset;
	windowHeight = window.innerHeight;
	// console.log("Position =====> "+position);
	viewPort = Math.floor((position*100) / windowHeight);
	// console.log("View =====> "+viewPort);
	if(positionNew > position) {
		position = positionNew;
		direction = "down";
	}else{
		position = positionNew;
		direction = "up";
	}
	if(viewPort < 100){
		document.getElementById("textFrame").classList.remove("sticky");
		document.getElementById("textFrame").classList.remove("bottom");
	}
	else if(viewPort >= 100 && viewPort <= 390) {
		document.getElementById("textFrame").classList.add("sticky");
		document.getElementById("textFrame").classList.remove("bottom");
		animElements(direction, viewPort, position, windowHeight);
	}
	else if(viewPort > 390){
		document.getElementById("textFrame").classList.remove("sticky");
		document.getElementById("textFrame").classList.add("bottom");
	}
}

function loadingParams() {
	console.clear;
	position = window.pageYOffset;
	// console.log("Start =====> "+position);

	window.addEventListener("scroll", scrollueberwachung);
}

function animElements(direction, position) {
	console.log(position);
	if(direction == "down")	{
		// document.getElementById("textFrame").style.left = viewPort;
		// document.getElementById("textFrame").style.top = (position - (windowHeight + 20))+"px";
	}else{

	}
}

window.addEventListener("load", loadingParams);