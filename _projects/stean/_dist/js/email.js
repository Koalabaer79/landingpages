function checkEmail() {
	var elements = ["email", "name", "anliegen"];
	var domElem = null;
	var errors = 0;
	var errorMsg = "";
	var errorDom = document.getElementById('error');

	elements.forEach( function(elem) {
		domElem = document.getElementById(elem);
		switch(elem){
			case "email":
				if(validateEmail(domElem.value) === false) {
					setBorders(domElem);
					errorMsg += "<p>Bitte trage deine richtige Email ein!</p>";
					errors++;
				}else{
					unsetBorders(domElem);
				}
				break;
			case "name":
				if(validateName(domElem.value) === false) {
					setBorders(domElem);
					errorMsg += "<p>Bitte trage deinen richtigen Namen ohne Sonderzeichen ein!</p>";
					errors++;
				}else{
					unsetBorders(domElem);
				}
				break;
			case "anliegen":
				if(validateAnliegen(domElem.value) === false) {
					setBorders(domElem);
					errorMsg += "<p>Dein Anliegen sollte keine Sonderzeichen enthalten.</p>";
					errors++;
				}else{
					unsetBorders(domElem);
				}
				break;
		}
	});

	
	// name.style.border = "1px solid red";
	// anliegen.style.border = "1px solid red";


}

function validateEmail(content) {
	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	if (reg.test(content) == false) {
		return false;
	}
	return true;
}

function validateName(content) {
	var reg =/^[a-z ,.'-]+$/;
	if (reg.test(content) == false) {
		return false;
	}else if(content !== "") {
		return true;
	}
}

function validateAnliegen(content) {
	var reg =/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
	if (reg.test(content) == false) {
		return false;
	}
	return true;
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