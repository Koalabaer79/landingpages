
var timeShow = 500;

// Function to fade in elements fully in viewport
function fullyInViewport() {
    elements.forEach(el => {
        var elem = document.getElementById(el);
        if (isInViewport(elem)) {
            elem.classList.add('fadeIn');
        }
    });
}

// Function to fade in elements partly in viewport
function partlyInViewport() {
    elements.forEach(el => {
		var elem = document.getElementById(el);
		var percentShow = 30;
        if (isElementXPercentInViewport(elem, percentShow)) {
            elem.classList.add('fadeIn');
        }
    });
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

// Run fadeIn of fully visible elements after video

var showPage = setTimeout(function(){
	fullyInViewport();
}, timeShow);

// Event listener on scroll to display hidden elements when 50% visible

window.addEventListener("scroll", function(event) {
	partlyInViewport();
});