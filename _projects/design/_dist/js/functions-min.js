function showMenu(){var e=document.getElementById("menu");e.style.height="0px"!=e.style.height&&e.style.height?"0px":"100vh"}function getDays(e){var t=((new Date).getTime()-e.getTime())/31536e6,n=Math.floor(t),o=12*(t-n),i=Math.floor(o),c=31*(o-i);return Math.floor(c)>20&&(i+=1),n+" "+(1==n?"year":"years")+" - "+i+" "+(1==i?"month":"months")}function getAge(e){var t=((new Date).getTime()-e.getTime())/31536e6;return Math.floor(t)}function colorRed(e){document.getElementById(e).classList.add("secCol")}function colorWhite(e){document.getElementById(e).classList.remove("secCol")}function goTo(e){window.open(e)}function showSkill(e,t){document.getElementById(e).innerHTML=t}var cont=document.getElementById("container");function isElementXPercentInViewport(e,t){let n=e.getBoundingClientRect(),o=window.innerHeight||document.documentElement.clientHeight;return!(Math.floor(100-(n.top>=0?0:n.top)/(+-n.height/1)*100)<t||Math.floor(100-(n.bottom-o)/n.height*100)<t)}window.addEventListener("load",function(){const e=window.location.search;"success"==new URLSearchParams(e).get("email")&&(document.getElementById("success").innerHTML="Your email has been sent successfully."),cont.classList.add("bg1")}),document.getElementById("exp").innerHTML=getDays(new Date("04/18/2010")),document.getElementById("work").innerHTML=getDays(new Date("01/04/2018")),document.getElementById("age").innerHTML=getAge(new Date("03/18/1979"));var container=document.querySelectorAll(".section").length;function toggleMenu(){window.innerWidth<=650&&(document.getElementById("menu").style.height="0px")}if(document.getElementById("container").addEventListener("scroll",function(){for(var e=1;e<=container;e++){var t=document.getElementById("section"+e),n=document.getElementById("button"+e);!0===isElementXPercentInViewport(t,100)?n.classList.add("active"):n.classList.contains("active")&&n.classList.remove("active")}}),window.innerWidth>650){var position=1;window.addEventListener("wheel",e=>{const t=Math.sign(e.deltaY);if(1==t&&position<container)for(var n=1;n<=container;n++){!0===isElementXPercentInViewport(document.getElementById("section"+n),100)&&(cont.classList.add("bg"+(n+1)),position++)}if(-1==t&&position>1)for(n=1;n<=container;n++){!0===isElementXPercentInViewport(document.getElementById("section"+n),100)&&(cont.classList.remove("bg"+n),position--)}})}else cont.classList.add("bg2");function validateForm(){var e=!0;document.getElementById("infoField").innerHTML="";const t={name:document.forms.contactform.name.value,email:document.forms.contactform.email.value,message:document.forms.contactform.message.value};var n=document.forms.contactform.name.value,o=document.forms.contactform.email.value,i=document.getElementById("confirm");for(const[n,o]of Object.entries(t))""==`${o}`&&(document.getElementById(`${n}`).classList.add("fail"),e=!1);if(1!=i.checked&&(document.getElementById("check").classList.add("checkFail"),e=!1),1==validateEmail(o)&&1==validateName(n)||(e=!1),console.log(e),0==e)return e;document.getElementById("contactform").submit()}function validateEmail(e){if(""!=e){return e.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)?(document.getElementById("infoField").innerHTML+="",!0):(document.getElementById("infoField").innerHTML+="Email address not in correct format!<br />",!1)}}function validateName(e){if(""!=e){return null==e.match(/[~`!#$%\^&*+=\-\[\]\\';,\/{}|\\":<>\?]/)?(document.getElementById("infoField").innerHTML+="",!0):(document.getElementById("infoField").innerHTML+="Name contains unwanted characters!<br />",!1)}}window.addEventListener("resize",function(){if(window.innerWidth>650&&(document.getElementById("menu").style.height="auto"),window.innerWidth<650){document.getElementById("menu").style.height="0px";for(var e=1;e<=container;e++){var t=document.getElementById("button"+e);t.classList.contains("active")&&t.classList.remove("active")}}});