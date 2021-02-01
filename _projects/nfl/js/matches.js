var defaultYear = "2020";

function getMatches(season) {
	$.getJSON( "./assets/matches/"+season+".json", function( data ) {
		var arrMatch = [];

		if(data.length != 0 || data.length != '' ) {
			for(var i = 0; i < data.length; i++) {
				
				arrMatch.push( "<div class='week'><h2>Woche "+(i+1)+"</h2></div>" )

				for(var j = 0; j < data[i].length; j++) {

					var visitorPoints = 0;
					var homePoints = 0;

					for( k = 0; k < 5; k++){
						visitorPoints = visitorPoints + parseInt(data[i][j].visitor.points[k]);
						homePoints = homePoints + parseInt(data[i][j].home.points[k]);
					}

					arrMatch.push( "<div class='match'><div class='full'>"+ data[i][j].date+"</div><div class='half team'><img src='./assets/teams/logos/100x100/"+ data[i][j].visitor.team +".png'><br />"+ firstLetter(data[i][j].visitor.team) + "</div><div class='at'>@</div><div class='half team'><img src='./assets/teams/logos/100x100/"+ data[i][j].home.team +".png'><br />"+ firstLetter(data[i][j].home.team) + "</div><div class='half standings'>"+ visitorPoints + "</div><div class='at'></div><div class='half standings'>"+ homePoints +"</div></div>");
				}
			}

			for (var i = 0; i < arrMatch.length; ++i) {
				$( arrMatch[i] ).appendTo( "#playtable" );
			}
		}else{
			var noContent = "<h2> No Matches available - Season "+ season +"-"+(season+1)+" did not start yet!</h2><p>You can watch the previous seasons instead.</p><p>Just click on the Dropdown-List under the headline and go throught the previous seasons!</p>";
			$( noContent ).appendTo( "#playtable" );
		}
	});
}

function firstLetter(s) {
	return s.replace(/^.{1}/g, s[0].toUpperCase());
}

$(document).ready(function() {
	setSeasons();
});

function changeSeason(season) {	
	el = document.getElementById('playtable');
	el.innerHTML = '';
	getMatches(season);
};

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
		getMatches(year);
	});
}