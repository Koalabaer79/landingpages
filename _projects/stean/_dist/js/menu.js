var menuArr = ["portrait", "facts", "gallery"];

function getActive() {
	var path = window.location.pathname;
	for(var i=0; i<menuArr.length; i++) {
		if(path.includes(menuArr[i]) == true){
			document.getElementById(menuArr[i]).classList.add("active");
		}
	}
}

getActive();