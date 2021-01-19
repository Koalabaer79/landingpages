// set necessary variables

var container = document.getElementById("header");
var elem = document.getElementById('container');
var conCont = document.getElementById('connections');
var maxCont = document.getElementById('maxConnections');
var dotCont = document.getElementById('totalDots');
var widthCont = document.getElementById('conWidth');

var xPos = null;
var yPos = null;
var rect = null;
var svgSize = null;
var maxConnections = 0;
var contHeight = 260;
var header_height = window.innerHeight-contHeight;
var header_width = window.innerWidth;
var screenPixel = header_height*header_width;
var dotRatio = 4000;
var dotCount = Math.round(screenPixel/dotRatio);
var svgArr_X = [];
var svgArr_Y = [];
if(widthCont.value == 0 || widthCont.value == "undefined"){
	svgSize = 200;
	widthCont.value = svgSize;
}
dotCont.innerHTML = dotCount;

// set Height of header
elem.style.height = header_height+"px";
container.style.height = header_height+"px";

// eventlistener when mouse is moved
elem.addEventListener('mousemove', onMousemove, false);

// detecting when window is resized
var rtime;
var timeout = false;
var delta = 200;
$(window).resize(function() {
    rtime = new Date();
    if (timeout === false) {
        timeout = true;
        setTimeout(resizeend, delta);
    }
});

// when resize of Window ends, create new dots with new dotCount
function resizeend() {
    if (new Date() - rtime < delta) {
		setTimeout(resizeend, delta);
    } else {
		timeout = false;
		$('.box').remove();
		$('.svg').remove();
		$('.line').remove();
		header_width = window.innerWidth;
		header_height = window.innerHeight-contHeight;
		elem.style.height = header_height+"px";
		container.style.height = header_height+"px";
		screenPixel = header_height*header_width;
		dotCount = Math.round(screenPixel/dotRatio);
		conCont.innerHTML = 0;
		maxCont.innerHTML = 0;
		maxConnections = 0;
		dotCont.innerHTML = dotCount;
		conWidth = widthCont.value
		if(conWidth == 0 || conWidth == "undefined" || conWidth > 300 || conWidth < 100){
			svgSize = 200;
		}else{
			svgSize = conWidth;
		}
		widthCont.value = svgSize;
		createDots();
    }               
}

// create SVG container for drawing lines
function createSVG( id ) {
	var elementID = document.getElementById("box"+id);

    svgArr_X[id] = elementID.offsetLeft + 5;
	svgArr_Y[id] = elementID.offsetTop + 5;

	var svgPos_X = svgArr_X[id]-(svgSize/2);
	var svgPos_Y = svgArr_Y[id]-(svgSize/2);

	lineCont = document.createElementNS("http://www.w3.org/2000/svg", "svg");;
	lineCont.setAttribute("style", "position:absolute; top:"+svgPos_Y+"px; left:"+svgPos_X+"px;")
	lineCont.setAttribute("class", "svg");
	lineCont.setAttribute("id", "svg"+id);
	lineCont.setAttribute("width", svgSize);
	lineCont.setAttribute("height", svgSize);
	line = document.createElementNS("http://www.w3.org/2000/svg", "line");
	line.setAttribute("id", "line"+id);
	line.setAttribute("class", "line");
	line.setAttribute("style", "stroke:#fff;stroke-width:1;");
	lineCont.appendChild(line);
	container.appendChild(lineCont);
}

// Create dots on when window loaded
$(document).ready(function(){
	createDots();
});

// function for creating dots
function createDots() {	  
	function freshDot(i){
		this.obj = document.createElement("div");
		this.obj.classList.add("box");
		this.obj.setAttribute("id", "box"+i)
		this.obj.style.top = (header_height * Math.random()) + 'px';
		this.obj.style.left = (window.innerWidth * Math.random()) + 'px';
		this.size = Math.floor(5 * Math.random()) + 7;
		
		this.obj.style.height =  this.size + 'px';
		this.obj.style.width = this.size + 'px';
		
		document.getElementById("header").appendChild(this.obj);
	}
	var dot = [];

	for(var i = 0 ; i <= dotCount ; i++ ){
		dot.push(new freshDot(i));
		createSVG(i);
	}
}

// find coordinations of cursor while moving mouse and draw lines between dots and cursor dot
function onMousemove(e){
	var m_posx = 0, m_posy = 0, e_posx = 0, e_posy = 0, obj = this;

	if (!e){e = window.event;}
	if (e.pageX || e.pageY){
		m_posx = e.pageX;
		m_posy = e.pageY;
	} else if (e.clientX || e.clientY){
		m_posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		m_posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
	
	if (obj.offsetParent){
		do { 
			e_posx += obj.offsetLeft;
			e_posy += obj.offsetTop;
		} while (obj = obj.offsetParent);
	}
	
	xPos = (m_posx-e_posx) 
	yPos = (m_posy-e_posy);

	document.getElementById('dot').style.top = (yPos-5)+"px";
	document.getElementById('dot').style.left = (xPos-5)+"px";
	var connections = null;
	var dotArr = [];

	for(let j=0;j<=dotCount;j++) {

		line = document.getElementById("line"+j);
		dot = document.getElementById("box"+j);

		if(xPos <= svgArr_X[j] + (svgSize/2) && xPos >= svgArr_X[j] - (svgSize/2) && yPos <= svgArr_Y[j] + (svgSize/2) && yPos >= svgArr_Y[j] - (svgSize/2) ) {
			line.setAttribute("x1", xPos-svgArr_X[j]+(svgSize/2));
			line.setAttribute("y1", yPos-svgArr_Y[j]+(svgSize/2));
			line.setAttribute("x2", (svgSize/2));
			line.setAttribute("y2", (svgSize/2));
			if(dot.classList.contains('pulseAnim') === false) {
				dot.classList.add('pulseAnim');
			}
			connections = connections+1;			
			dotArr.push(dot.getAttribute('id'));
		}else{
			line.removeAttribute("x1");
			line.removeAttribute("x2");
			line.removeAttribute("y1");
			line.removeAttribute("y2");
			if(dot.classList.contains('pulseAnim') === true) {
				dot.classList.remove('pulseAnim');
			}
		}
		conCont.innerHTML = connections;
	}
	if(maxConnections < connections) {
		maxConnections = connections;
		maxCont.innerHTML = maxConnections;
		var itemsWithClass = document.querySelectorAll('.foundAnim');
		[].forEach.call(itemsWithClass, function(el) {
			el.classList.remove("foundAnim");
		});
		for(i=0;i<dotArr.length;i++) {
			document.getElementById(dotArr[i]).classList.add('foundAnim');
		}
	}
}

function showTooltip(span) {
	document.getElementById(span).style.display = "block";
}

function hideTooltip(span) {
	document.getElementById(span).style.display = "none";
}

function dotsAddRemove(action) {
	$('.box').remove();
	$('.svg').remove();
	$('.line').remove();
	header_width = window.innerWidth;
	header_height = window.innerHeight-contHeight;
	elem.style.height = header_height+"px";
	container.style.height = header_height+"px";
	screenPixel = header_height*header_width;
	if(action === "-" & dotRatio < 5000) {
		dotRatio = dotRatio + 500;
		if(dotRatio == 5000) {
			document.getElementById('btnMinus').style.display = 'none';
		}
		if(dotRatio == 3500) {
			document.getElementById('btnPlus').style.display = 'inline-block';
		}
	}else if(action === "+" & dotRatio > 3000) {
		dotRatio = dotRatio - 500;
		if(dotRatio == 3000) {
			document.getElementById('btnPlus').style.display = 'none';
		}
		if(dotRatio == 4500) {
			document.getElementById('btnMinus').style.display = 'inline-block';
		}
	}
	dotCount = Math.round(screenPixel/dotRatio);
	conCont.innerHTML = 0;
	maxCont.innerHTML = 0;
	maxConnections = 0;
	dotCont.innerHTML = dotCount;
	conWidth = widthCont.value
	if(conWidth == 0 || conWidth == "undefined" || conWidth > 300 || conWidth < 100){
		svgSize = 200;
	}else{
		svgSize = conWidth;
	}
	widthCont.value = svgSize;
	createDots();
}