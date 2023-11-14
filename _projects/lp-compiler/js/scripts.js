// Easy Landing Page Programming by Lars Urban
// Feel free to use and change the code

console.info('Welcome to the Landingpage Compiler!');

// Declare arrays and variables needed

var elements = [ 'nav', 'header', 'description', 'mid1', 'features', 'mid2', 'commands' ];
var sections = {description:'arrow1', mid1:'arrow2', features:'arrow3', mid2:'arrow4', commands:'arrow5'};
var timeShow = null;
var timeline = {};

// Get URL-Parameter for intro start

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const intro = urlParams.get('intro');

// Get Cookie 

var myCookie = document.cookie.indexOf("intro=");

// Set timeline for intro or not    

if (myCookie < 0 || intro === 'show') {
    timeLine = [
        {
            id: "text1",
            anim: "fadeIn",
            time: 200
        },
        {
            id: "text1",
            anim: "fadeOut",
            time: 2200
        },
        {
            id: "text2",
            anim: "fadeIn",
            time: 3200
        },
        {
            id: "text2",
            anim: "fadeOut",
            time: 5200
        },
        {
            id: "text3",
            anim: "fadeIn",
            time: 6200
        },
        {
            id: "text3",
            anim: "fadeOut",
            time: 8200
        },
        {
            id: "background",
            anim: "fadeOut",
            time: 8200
        },
        {
            id: "container",
            anim: "display",
            time: 9200
        },
        {
            id: "background",
            anim: "hide",
            time: 9200
        },
    ];
    var timeShow = 9201;
    setCookie();
}
else {
    timeLine = [
        {
            id: "container",
            anim: "display",
            time: 1
        },
        {
            id: "background",
            anim: "hide",
            time: 1
        },
    ];
    var timeShow = 2;
}

// Function if element is in fully in viewport ( on page load )

function isInViewport(elem) {
    var bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= ((window.innerHeight) || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );    
};

// Function if element is in partly in viewport ( when scrolling )

function isElementXPercentInViewport (el, percentVisible) {
    let
      rect = el.getBoundingClientRect(),
      windowHeight = (window.innerHeight || document.documentElement.clientHeight);
  
    return !(
      Math.floor(100 - (((rect.top >= 0 ? 0 : rect.top) / +-(rect.height / 1)) * 100)) < percentVisible ||
      Math.floor(100 - ((rect.bottom - windowHeight) / rect.height) * 100) < percentVisible
    )
};

// Function for animating Intro
var timeString = [1];
function animate(id,anim,time) {
    timer = setTimeout(function(){
        var el = document.getElementById(id);
        el.classList.add(anim); 
    }, time);
    timeString.push(timer);
}

// Stop Intro Animations

function stop() {
    timeString.forEach(timer => {
        clearTimeout(timer);
    });
    document.getElementById('background').classList.add('hide');
    document.getElementById('container').classList.add('display');
    fullyInViewport();
}

// Function to set intro-cookie ( expiring in 24 hours )

function setCookie() {
    var d = new Date();
    d.setTime(d.getTime() + (1*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = "intro=shown; " + expires;
}

// Function to fade in elements fully in viewport
function fullyInViewport() {
    elements.forEach(el => {
        var elem = document.getElementById(el);
        if (isInViewport(elem)) {
            elem.classList.add('fadeIn');
            if(sections[el] !== undefined) {
                document.getElementById(sections[el]).classList.add('hidden');
            }
        }
    });
}

// Function to fade in elements partly in viewport

function partlyInViewport() {
    elements.forEach(el => {
        var elem = document.getElementById(el);
        if (isElementXPercentInViewport(elem, 50)) {
            elem.classList.add('fadeIn');
            if(sections[el] !== undefined) {
                document.getElementById(sections[el]).classList.add('hidden');
            }
        }
    });
}

// If screen-width is bigger than 800 pixel

if(window.innerWidth >= 800){

    // Run fadeIn of fully visible elements after video

    var showPage = setTimeout(function(){
        fullyInViewport();
    }, timeShow);

    // Event listener on scroll to display hidden elements when 50% visible

    window.addEventListener("scroll", function(event) {
        partlyInViewport();
    });
}else{

    // If screen-width is smaller than 800 pixel

    elements.forEach(el => {
        document.getElementById(el).classList.add('fadeIn');
    });
}

// Run timeline and call animation function for each element in timeline

timeLine.forEach(el =>  {
    animate(el['id'],el['anim'],el['time']);
});

// Navigation for mobile

function openNav(){
    var el = document.getElementById('menu');
    el.classList.toggle('display');
}