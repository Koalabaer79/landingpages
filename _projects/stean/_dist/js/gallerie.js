function showImage(img) {
	document.getElementById('contFullImg').style.display = "block";
	document.getElementById('contImg').src = img;
	document.body.style.overflow = "hidden";
}

function hideImage() {
	document.getElementById('contFullImg').style.display = "none";
	document.getElementById('contImg').src = "";
	document.body.style.overflow = "unset";
}