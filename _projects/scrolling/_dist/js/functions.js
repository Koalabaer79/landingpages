console.log('Welcome to the Landingpage Compiler!');

const locations = [ 'parallax', 'matrix' ];

const domain = document.location;
var url = domain.href;
var active = false

document.addEventListener("DOMContentLoaded", function(event) {
	locations.forEach(e => {
		if(url.includes(e) === true) {
			document.getElementById(e).classList.add("active")
			active = true
		}
	});
		
	if(active == false){
		document.getElementById('home').classList.add("active")
	}
});