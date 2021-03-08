function checkEmail() {
	var elements = ["email", "name", "anliegen"];
	var domElem = null;
	var reg = "";
	var errors = 0;
	var msg = "";
	var errorMsg = "";
	var errorDom = document.getElementById('error');

	elements.forEach( function(elem) {
		domElem = document.getElementById(elem);
		switch(elem){
			case "email":
				reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
				msg = "<p>Bitte trage deine richtige Email ein!</p>";
				break;
			case "name":
				reg = /^[a-z ,.'-]+$/;
				msg = "<p>Bitte trage deinen richtigen Namen ohne Sonderzeichen ein!</p>";
				break;
			case "anliegen":
				reg = /^[a-z ,.'-!?$§&/"()=ß*+#]+$/;
				msg = "<p>Dein Anliegen sollte keine Sonderzeichen '< >' enthalten.</p>";
				break;
		}

		if(validateContent(domElem.value, reg) === false) {
			setBorders(domElem);
			errorMsg += msg;
			errors++;
		}else{
			unsetBorders(domElem);
		}
	});

	errorDom.innerHTML = errorMsg;
}

function validateContent(content, reg) {
	console.log(reg);
	if(content !== "" ) {
		if (reg.test(content) === false) {
			return false;
		}
		return true;
	}
	return false;
}

function unsetBorders(el) {
	el.style.borderBottom = "1px solid $color-darkGreen";
	el.style.borderTop = "1px solid #ffffff";
	el.style.borderLeft = "1px solid #ffffff";
	el.style.borderRight = "1px solid #ffffff";
}

function setBorders(el) {
	el.style.border = "1px solid red";
}