document.getElementById('age').innerHTML = getAge(new Date("12/28/2020"))
getActive();
getGallery();

function getAge(date1) {
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
	var fillingWord = 'and';
    if(daysShow > 20){
        monthShow = monthShow + 1;
    }
    if(yearsShow == 1){ yearsWord = 'Jahr'; }else if(yearsShow == 0){ yearsShow = ''; fillingWord = ''; }else{ yearsWord = 'Jahre' }
    if(monthShow == 1){ monthWord = 'Monat'; }else if(monthShow == 0){ monthShow = ''; fillingWord = ''; }else{ monthWord = 'Monate' }

    return yearsShow+' '+yearsWord+' '+fillingWord+' '+monthShow+' '+monthWord;
}

function getActive() {	
	document.getElementById("index").classList.add("active");
}

function getGallery() {
	var fs = require('fs');
	var files = fs.readdirSync('/assets/gallery/thumbs');
	console.log(files);
}