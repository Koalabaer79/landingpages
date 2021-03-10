function checkEmail() {
	var elements = ["email", "name", "anliegen"];
	var domElem = null;
	var reg = "";
	var errors = 0;
	var msg = "";

	elements.forEach( function(elem) {
		domElem = document.getElementById(elem);
		var errorDom = document.getElementById('error'+elem);
		switch(elem){
			case "email":
				reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
				msg = "Bitte trage <b>deine</b> richtige Email ein!";
				break;
			case "name":
				reg = /^[a-zA-Z ,.'-]+$/;
				msg = "Bitte einen Namen ohne Sonderzeichen eintragen!";
				break;
			case "anliegen":
				reg = /^[0-9a-zA-Z '-,.ß!?$§&()#"+\-*\r\n]+$/;
				msg = "Dein Anliegen sollte keine Sonderzeichen '< >' enthalten.";
				break;
		}

		if(domElem.value !== "" ) {
			if (reg.test(domElem.value) === false) {
				if(domElem.classList.contains('normal')) {
					domElem.classList.remove('normal');
				}
				domElem.classList.add('fehler');
				errorDom.innerHTML = msg;
				errors++;
			}else{
				if(domElem.classList.contains('fehler')) {
					domElem.classList.remove('fehler');
				}
				domElem.classList.add('normal');
				errorDom.innerHTML = "";
			}
		}else{
			if(domElem.classList.contains('normal')) {
				domElem.classList.remove('normal');
			}
			domElem.classList.add('fehler');
			errorDom.innerHTML = msg;
			errors++;
		}
	});

	if(document.getElementById('dsgvo').checked !== true) {
		document.getElementById('errordsgvo').innerHTML = "Bitte akzeptiere die Datenschutzbestimmungen.";
		errors++;
	}else{
		document.getElementById('errordsgvo').innerHTML = "";
	}
	
	if(errors === 0){
		sendEmail(elements);
	}
	
}

function sendEmail(elements) {
	console.log("SENDING!");
	$("form").on("submit", function() {
		$.ajax({
			type: 'POST',
			url: './assets/php/email/sendEmail.php',
			data: $( this ).serialize(),
			success: function() {
				document.getElementById('success').innerHTML = "Danke für deine Email, ich melde mich schnellstmögich!";
				elements.forEach( function(elem) {
					domElem = document.getElementById(elem);
					domElem.value = "";
					document.getElementById('dsgvo').checked = false;
				});
			}
		});
	});
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