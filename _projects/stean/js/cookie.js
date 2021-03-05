function setCookie() {
	var d = new Date();
	d.setTime(d.getTime() + (7*24*60*60*1000));
	var expires = "expires="+ d.toUTCString(); document.cookie = "site=visited; " + expires;
	document.getElementById('cookie').style.display = 'none';
}

var myCookie = document.cookie.indexOf("site=");

if(myCookie < 0 ){
	document.getElementById('cookie').style.display = 'block';
}else{
	document.getElementById('cookie').style.display = 'none';
}