function getAge(e){var t=((new Date).getTime()-e.getTime())/31536e6,n=Math.floor(t),a=12*(t-n),o=Math.floor(a),d=31*(a-o),i="",g="",r="and";return Math.floor(d)>20&&(o+=1),1==n?i="Jahr":0==n?(n="",r=""):i="Jahre",1==o?g="Monat":0==o?(o="",r=""):g="Monate",n+" "+i+" "+r+" "+o+" "+g}function getActive(){document.getElementById("index").classList.add("active")}document.getElementById("age").innerHTML=getAge(new Date("12/28/2020")),getActive();var elements=["headerImg","headerText","indexCont1","indexCont2","indexCont3","indexCont4"];