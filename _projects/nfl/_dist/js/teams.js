function getTeams(year) {
	$.getJSON( "./assets/teams/"+year+".json", function( data ) {

		// set keys for conference and divisions
		var keys = [ "afc_east", "afc_west", "afc_north", "afc_south", "nfc_east", "nfc_west", "nfc_north", "nfc_south" ];
		var division = [ "east", "west", "north", "south", "east", "west", "north", "south" ];

		// set dynamic variables for arrays
		for( var i = 0; i < keys.length; i++) {
			window[keys[i]] = [];
		}

		// set content for tables
		for (var i = 0; i < data.length; ++i) {
			var team = [];
			var spiele = parseInt(data[i].standings.s) + parseInt(data[i].standings.n) + parseInt(data[i].standings.u);
			var perc = ((parseInt(data[i].standings.s)*100)/spiele)/100;
			if(isNaN(perc)) {
				perc = 0;
			}else{
				perc = perc.toFixed(3);
			}

			var content = "<tr class='teams' id='"+ data[i].code.toLowerCase() +"'><td><img class='smallImg' id='img" + i + "' src='assets/teams/logos/20x20/" + data[i].name.toLowerCase() + ".png' /></td><td class='teamListed' id='name" + i + "'>" + data[i].full_name + "</td><td class='data'>"+spiele+"</td><td class='data'>"+data[i].standings.s+"</td><td class='data'>"+data[i].standings.n+"</td><td class='data'>"+data[i].standings.u+"</td><td class='data'>"+perc+"</td><td class='data'>"+data[i].standings.p+"</td><td class='data'>"+data[i].standings.gp+"</td></tr>";

			// fill arrays
			for( var h = 0; h < keys.length; h++ ) {

				var conference = "";
				if( h < (keys.length/2) ) {
					conference = "afc"
				}else{
					conference = "nfc"
				}
				
				if(data[i].conference == conference && data[i].division == division[h]) {
					team.push( data[i].name );
					team.push( content );
					team.push( data[i].standings.s );
					team.push( data[i].standings.p );
					window[keys[h]].push(team);
				}
			}
		}

		// prepare arrays for sorting
		var categories = [ window['afc_east'], window['afc_west'], window['afc_north'], window['afc_south'], window['nfc_east'], window['nfc_west'], window['nfc_north'], window['nfc_south'] ];

		var newCategories = [];
		
		// sort categories
		for( var k = 0; k < categories.length; k++ ) {
			newCategories.push(sortCat(categories[k]));
		}

		//Create html entries in tables
		for( var k = 0; k < newCategories.length; k++ ) {
			for( var l = 0; l < newCategories[k].length; l++ ) {
				$( newCategories[k][l][1] ).appendTo( "#"+keys[k] );
			}
		}
	});
}

// sorting function
function sortCat(data) {
	data.sort(function(a, b) {
		return b[2] - a[2] || b[3] - a[3];
	});
	return(data);
}

// fold and unfold single tables
function showTable(data) {
	var el = document.getElementById(data);
	var arrow = document.getElementById('arrow'+data);
	if(el.style.height == '0px' || el.style.height == ''){
		el.style.height = '200px';
		arrow.style.transform = "rotate(-270deg)";
	}else{
		el.style.height = '0px';
		arrow.style.transform = "rotate(-90deg)";
	}
}

// fold and unfold all tables
function showAll() {
	var keys = [ "afcEast", "afcWest", "afcNorth", "afcSouth", "nfcEast", "nfcWest", "nfcNorth", "nfcSouth" ];

	for(var i = 0; i < keys.length; i++) {
		console.log(keys[i]);
		var el = document.getElementById(keys[i]);
		var arrow = document.getElementById('arrow'+keys[i]);
		var foldText = document.getElementById('subNav');
		if(el.style.height == '0px' || el.style.height == ''){
			el.style.height = '200px';
			arrow.style.transform = "rotate(-270deg)";
			foldText.innerHTML = "Fold all";

		}else{
			el.style.height = '0px';
			arrow.style.transform = "rotate(-90deg)";
			foldText.innerHTML = "Unfold all";
		}
	}
}

// change season function
function changeSeason(season) {
	$.getJSON( "./assets/teams/"+season+".json", function( data ) {
		for (var i = 0; i < data.length; ++i) {
			el = document.getElementById(data[i].code.toLowerCase());
			el.remove();
		}
	});
	getTeams(season);
};

// fetch available seasons and create select options
function setSeasons() {	
	$.getJSON( "./assets/seasons/seasons.json", function( data ) {		
		var year = new Date().getFullYear();
		var option = '<option value="">Select Season</option>';
		$( option ).appendTo( "#year" );
		for (var i = 0; i < data.length; ++i) {
			var selected = "";
			if(year == data[i]) { selected = "selected"; }
			option = '<option value="'+data[i]+'" '+selected+'>'+data[i]+'-'+(+data[i]+1)+'</option>'
			$( option ).appendTo( "#year" );
		}
		var x, i, j, l, ll, selElmnt, a, b, c;
		x = document.getElementsByClassName("custom-select");
		l = x.length;
		for (i = 0; i < l; i++) {
		selElmnt = x[i].getElementsByTagName("select")[0];
		ll = selElmnt.length;
		a = document.createElement("DIV");
		a.setAttribute("class", "select-selected");		
		a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
		x[i].appendChild(a);
		b = document.createElement("DIV");
		b.setAttribute("class", "select-items select-hide");
		for (j = 1; j < ll; j++) {
			c = document.createElement("DIV");
			c.innerHTML = selElmnt.options[j].innerHTML;
			c.setAttribute('onclick', "changeSeason('"+selElmnt.options[j].innerHTML.substring(0,4)+"')")
			c.addEventListener("click", function(e) {
				/*when an item is clicked, update the original select box,
				and the selected item:*/
				var y, i, k, s, h, sl, yl;
				s = this.parentNode.parentNode.getElementsByTagName("select")[0];
				sl = s.length;
				h = this.parentNode.previousSibling;
				for (i = 0; i < sl; i++) {
				if (s.options[i].innerHTML == this.innerHTML) {
					s.selectedIndex = i;
					h.innerHTML = this.innerHTML;
					y = this.parentNode.getElementsByClassName("same-as-selected");
					yl = y.length;
					for (k = 0; k < yl; k++) {
					y[k].removeAttribute("class");
					}
					this.setAttribute("class", "same-as-selected");
					break;
				}
				}
				h.click();
			});
			b.appendChild(c);
		}
		x[i].appendChild(b);
		a.addEventListener("click", function(e) {
			e.stopPropagation();
			closeAllSelect(this);
			this.nextSibling.classList.toggle("select-hide");
			this.classList.toggle("select-arrow-active");
			});
		}
		function closeAllSelect(elmnt) {
		var x, y, i, xl, yl, arrNo = [];
		x = document.getElementsByClassName("select-items");
		y = document.getElementsByClassName("select-selected");
		xl = x.length;
		yl = y.length;
		for (i = 0; i < yl; i++) {
			if (elmnt == y[i]) {
			arrNo.push(i)
			} else {
			y[i].classList.remove("select-arrow-active");
			}
		}
		for (i = 0; i < xl; i++) {
			if (arrNo.indexOf(i)) {
			x[i].classList.add("select-hide");
			}
		}
		}
		document.addEventListener("click", closeAllSelect);
		getTeams(year);
	});
}

// start script
$(document).ready(function() {
	setSeasons()
});