var timeShow=500;function fullyInViewport(){elements.forEach(t=>{var e=document.getElementById(t);isInViewport(e)&&e.classList.add("fadeIn")})}function partlyInViewport(){elements.forEach(t=>{var e=document.getElementById(t);isElementXPercentInViewport(e,50)&&e.classList.add("fadeIn")})}function isInViewport(t){var e=t.getBoundingClientRect();return e.top>=0&&e.left>=0&&e.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&e.right<=(window.innerWidth||document.documentElement.clientWidth)}function isElementXPercentInViewport(t,e){let n=t.getBoundingClientRect(),i=window.innerHeight||document.documentElement.clientHeight;return!(Math.floor(100-(n.top>=0?0:n.top)/(+-n.height/1)*100)<e||Math.floor(100-(n.bottom-i)/n.height*100)<e)}var showPage=setTimeout(function(){fullyInViewport()},timeShow);window.addEventListener("scroll",function(t){partlyInViewport()});