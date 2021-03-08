function dropdown() {
	var x = document.getElementById("navItems");
	if (x.style.height === "0px" || x.style.height === "" ) {
		x.style.height = "315px";
	} else {
	  	x.style.height = "0px";
	}
}

window.addEventListener("resize", resizeFunc);

function resizeFunc() {
	el = document.getElementById('navItems');
	width = window.innerWidth;
	if(width <= 700) {
		el.style.height = "0px";
	}else{
		el.style.height = "50px"
	}
}