var menuArr=["portrait","fakten","gallerie","kontakt"];function getActive(){var e=window.location.pathname;console.log(e);for(var n=0;n<menuArr.length;n++)console.log(menuArr[n]),1==e.includes(menuArr[n])&&document.getElementById(menuArr[n]).classList.add("active")}getActive();