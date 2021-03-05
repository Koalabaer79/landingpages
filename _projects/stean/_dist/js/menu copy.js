var menuArr = ["portrait", "fakten", "gallerie", "kontakt"];

function getActive() {
	var path = window.location.pathname;
	console.log(path)
	for(var i=0; i<menuArr.length; i++) {
		console.log(menuArr[i]);
		if(path.includes(menuArr[i]) == true){
			document.getElementById(menuArr[i]).classList.add("active");
		}
	}
}

getActive();