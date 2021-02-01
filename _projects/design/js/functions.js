function showMenu() {
    var d = document.getElementById('menu');
    d.style.height = (d.style.height == "0px" || !d.style.height ) ? '100vh' : "0px";
}

function getDays(date1) {
    var today = new Date();
    // var date = today.getMonth()+'/'+(today.getDate()+1)+'/'+today.getFullYear();
    var diff = today.getTime() - date1.getTime();
	var years = 24*60*60*1000*365;
    var yearsDiff = diff/years
    var yearsShow = Math.floor(yearsDiff)
    var monthDiff = ((yearsDiff-yearsShow)*12);
    var monthShow = Math.floor(monthDiff);
    var daysDiff = ((monthDiff-monthShow)*31);
    var daysShow = Math.floor(daysDiff);
    var yearsWord = '';
    var monthWord = '';
    if(daysShow > 20){
        monthShow = monthShow + 1;
    }
    if(yearsShow == 1){ yearsWord = 'year'; }else{ yearsWord = 'years' }
    if(monthShow == 1){ monthWord = 'month'; }else{ monthWord = 'months' }

    return yearsShow+' '+yearsWord+' - '+monthShow+' '+monthWord;
}

function getAge(date1) {
    var today = new Date();
    var diff = today.getTime() - date1.getTime();
    var years = 24*60*60*1000*365;
    var yearsDiff = diff/years
    var yearsShow = Math.floor(yearsDiff)

    return yearsShow;
}
function colorRed(el) {
    document.getElementById(el).classList.add('secCol');
}
function colorWhite(el) {
    document.getElementById(el).classList.remove('secCol');
}

function goTo(url) {
    window.open(url);
}

function showSkill(s,v) {
    document.getElementById(s).innerHTML = v;
}

var cont = document.getElementById('container');
window.addEventListener('load', function (){
    // document.documentElement.scrollTop = 0;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var checkEmail = urlParams.get('email');
    if(checkEmail == "success") {
        document.getElementById('success').innerHTML = "Your email has been sent successfully.";
    }
    cont.classList.add('bg1');
});

function isElementXPercentInViewport (el, percentVisible) {
    let
      rect = el.getBoundingClientRect(),
      windowHeight = (window.innerHeight || document.documentElement.clientHeight);
  
    return !(
      Math.floor(100 - (((rect.top >= 0 ? 0 : rect.top) / +-(rect.height / 1)) * 100)) < percentVisible ||
      Math.floor(100 - ((rect.bottom - windowHeight) / rect.height) * 100) < percentVisible
    )
};

document.getElementById('exp').innerHTML = getDays(new Date("04/18/2010"));
document.getElementById('work').innerHTML = getDays(new Date("01/04/2018"));
document.getElementById('age').innerHTML = getAge(new Date("03/18/1979"))

var container = document.querySelectorAll('.section').length;
document.getElementById('container').addEventListener('scroll', function () {
    for(var i=1;i<=container;i++){
        var section = document.getElementById('section'+i);
        var button = document.getElementById('button'+i);
        if(isElementXPercentInViewport(section, 100) === true){
            button.classList.add('active');
        }else{
            if(button.classList.contains('active')) {
                button.classList.remove('active');
            }
        }
    }
});

function toggleMenu() {
    if(window.innerWidth <= 650){
        var d = document.getElementById('menu');
        d.style.height = "0px";
    }else{
        return;
    }
}

if(window.innerWidth > 650){
    var position = 1;
    window.addEventListener("wheel", event => {
        const delta = Math.sign(event.deltaY);
        if(delta == 1 && position < container){
            for(var i=1;i<=container;i++){
                var section = document.getElementById('section'+i);
                if(isElementXPercentInViewport(section, 100) === true){
                    cont.classList.add('bg'+(i+1))
                    position++;
                }
            }
        }
        if(delta == -1 && position > 1) {
            for(var i=1;i<=container;i++){
                var section = document.getElementById('section'+i);
                if(isElementXPercentInViewport(section, 100) === true){
                    cont.classList.remove('bg'+i);
                    position--;
                }
            } 
        }
    });
}else{
    cont.classList.add('bg2');
}

window.addEventListener('resize', function () {
    if(window.innerWidth > 650){
        document.getElementById('menu').style.height = "auto";
    }
    if(window.innerWidth < 650){
        document.getElementById('menu').style.height = "0px";
        for(var i=1;i<=container;i++){
            var button = document.getElementById('button'+i);
            if(button.classList.contains('active')) {
                button.classList.remove('active');
            }
        }
    }
});

function validateForm() {
    var failure = true;
    document.getElementById('infoField').innerHTML = "";
    const formEl = { name: document.forms["contactform"]["name"].value, email: document.forms["contactform"]["email"].value, message: document.forms["contactform"]["message"].value }
    var name = document.forms["contactform"]["name"].value;
    var email = document.forms["contactform"]["email"].value;
    var accept = document.getElementById("confirm");
    for (const [key, value] of Object.entries(formEl)) {
        if(`${value}` == "") {
            document.getElementById(`${key}`).classList.add('fail');
            failure = false;
        }
    }
    if (accept.checked != true) {
        document.getElementById('check').classList.add('checkFail');
        failure = false;
    }
    if(validateEmail(email) != true || validateName(name) != true ){
        failure = false;
    }
    console.log(failure);
    if(failure != false) {
        document.getElementById("contactform").submit();
    }else{
        return failure;
    }
}

function validateEmail(inputText) {
    if(inputText != ''){
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(inputText.match(mailformat)) {
            document.getElementById('infoField').innerHTML += "";
            return true;
        } else {
            document.getElementById('infoField').innerHTML += "Email address not in correct format!<br />";
            return false;
        }
    }
}

function validateName(inputText) {
    if(inputText != ''){
        var chars = /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/;
        if(inputText.match(chars) == null) {
            document.getElementById('infoField').innerHTML += "";
            return true;
        } else {
            document.getElementById('infoField').innerHTML += "Name contains unwanted characters!<br />";
            return false;
        }
    }
}