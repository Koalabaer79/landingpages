function dropdown(){var e=document.getElementById("navItems");"0px"===e.style.height||""===e.style.height?e.style.height="315px":e.style.height="0px"}function resizeFunc(){el=document.getElementById("navItems"),width=window.innerWidth,width<=700?(console.log(width),el.style.height="0px"):(console.log(width),el.style.height="50px")}window.addEventListener("resize",resizeFunc);