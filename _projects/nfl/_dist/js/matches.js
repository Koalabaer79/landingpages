var defaultYear = "2020";

// show matches without filtering
function getMatches(season) {
	$.getJSON( "./assets/matches/"+season+".json", function( data ) {

		document.getElementById('playtable').innerHTML = '';

		var arrMatch = [];
		var arrString = "";

		// if json content is given
		if(data.length != 0 || data.length != '' ) {
			// repeat for each week
			for(var i = 0; i < data.length; i++) {
				// if week is not empty
				if(data[i].length != 0) {
				
					arrString += "<div class='weekHead' onclick='showTable("+(i+1)+")'><h2>Week "+(i+1)+"</h2><img class='arrow' id='arrow"+(i+1)+"' src='./assets/icons/arrow.svg'></div><div class='week' id='week"+(i+1)+"'>";
					
					// create div for each match
					for(var j = 0; j < data[i].length; j++) {

						var visitorPoints = 0;
						var homePoints = 0;

						for( k = 0; k < 5; k++){
							visitorPoints = visitorPoints + parseInt(data[i][j].visitor.points[k]);
							homePoints = homePoints + parseInt(data[i][j].home.points[k]);
						}

						if(visitorPoints == 0 && homePoints == 0) {
							arrString += "<div class='match'><div class='full'>"+ data[i][j].date+"</div><div class='half team'><img src='./assets/teams/logos/100x100/"+ data[i][j].visitor.team +".png'><br />"+ firstLetter(data[i][j].visitor.team) + "</div><div class='at'>@</div><div class='half team'><img src='./assets/teams/logos/100x100/"+ data[i][j].home.team +".png'><br />"+ firstLetter(data[i][j].home.team) + "</div></div>";
						}else{
							arrString += "<div class='match'><div class='full'>"+ data[i][j].date+"</div><div class='half team'><img src='./assets/teams/logos/100x100/"+ data[i][j].visitor.team +".png'><br />"+ firstLetter(data[i][j].visitor.team) + "</div><div class='at'>@</div><div class='half team'><img src='./assets/teams/logos/100x100/"+ data[i][j].home.team +".png'><br />"+ firstLetter(data[i][j].home.team) + "</div><div class='half standings'>"+ visitorPoints + "</div><div class='at'></div><div class='half standings'>"+ homePoints +"</div></div>";
						}
					}

					arrString += "</div>";
				}

			}

			// create array for match container
			arrMatch.push(arrString);
			// write matches into playtable container
			for (var i = 0; i < arrMatch.length; ++i) {
				$( arrMatch[i] ).appendTo( "#playtable" );
			}
		}else{
			// if no weeks available
			var noContent = "<h2> No Matches available - Season "+ season +"-"+(season+1)+" did not start yet!</h2><p>You can watch the previous seasons instead.</p><p>Just click on the Dropdown-List under the headline and go throught the previous seasons!</p>";
			$( noContent ).appendTo( "#playtable" );
		}
	});
}

// create match containers filtered by one team
function getTeamMatches(season,team) {
	// if team filter is set to blank, show normal table
	if(team == ''){
		getMatches(season);
	}else{

		$.getJSON( "./assets/matches/"+season+".json", function( data ) {
			// delete content of playtable container before refilling it
			document.getElementById('playtable').innerHTML = '';

			var arrMatch = [];
			var arrString = "";

			// if json content is given
			if(data.length != 0 || data.length != '' ) {
				// repeat for each week
				for(var i = 0; i < data.length; i++) {
					var teamWeek = false;
					// if week is not empty
					if(data[i].length != 0) {
					
						arrString += "<div class='weekHead' onclick='showTable("+(i+1)+")'><h2>Week "+(i+1)+"</h2><img class='arrow' id='arrow"+(i+1)+"' src='./assets/icons/arrow.svg'></div><div class='week' id='week"+(i+1)+"'>";

						// create div for each match
						for(var j = 0; j < data[i].length; j++) {
							// if team found create match container
							if(team == firstLetter(data[i][j].visitor.team) || team == firstLetter(data[i][j].home.team)) {

								var visitorPoints = 0;
								var homePoints = 0;

								for( k = 0; k < 5; k++){
									visitorPoints = visitorPoints + parseInt(data[i][j].visitor.points[k]);
									homePoints = homePoints + parseInt(data[i][j].home.points[k]);
								}

								if(visitorPoints == 0 && homePoints == 0) {
									arrString += "<div class='match'><div class='full'>"+ data[i][j].date+"</div><div class='half team'><img src='./assets/teams/logos/100x100/"+ data[i][j].visitor.team +".png'><br />"+ firstLetter(data[i][j].visitor.team) + "</div><div class='at'>@</div><div class='half team'><img src='./assets/teams/logos/100x100/"+ data[i][j].home.team +".png'><br />"+ firstLetter(data[i][j].home.team) + "</div></div>";
								}else{
									arrString += "<div class='match'><div class='full'>"+ data[i][j].date+"</div><div class='half team'><img src='./assets/teams/logos/100x100/"+ data[i][j].visitor.team +".png'><br />"+ firstLetter(data[i][j].visitor.team) + "</div><div class='at'>@</div><div class='half team'><img src='./assets/teams/logos/100x100/"+ data[i][j].home.team +".png'><br />"+ firstLetter(data[i][j].home.team) + "</div><div class='half standings'>"+ visitorPoints + "</div><div class='at'></div><div class='half standings'>"+ homePoints +"</div></div>";
								}
								teamWeek = true;
							}
						}
						// if team not found in the current week
						if(teamWeek == false) {
							arrString += '<div style="width:100%;text-align:center"><p>No match for <b>'+team+'</b> in <b>week '+(i+1)+'</b> availeble, yet. Data will be updated soon!</p></div>';
						}

						arrString += "</div>";
					}

				}

				// create array for match container
				arrMatch.push(arrString);
				// write matches into playtable container
				for (var i = 0; i < arrMatch.length; ++i) {
					$( arrMatch[i] ).appendTo( "#playtable" );
				}

				openAll();
			}else{
				// if no weeks available
				var noContent = "<h2> No Matches available - Season "+ season +"-"+(season+1)+" did not start yet!</h2><p>You can watch the previous seasons instead.</p><p>Just click on the Dropdown-List under the headline and go throught the previous seasons!</p>";
				$( noContent ).appendTo( "#playtable" );
			}
		});
	}
}

// write first letter of team big
function firstLetter(s) {
	return s.replace(/^.{1}/g, s[0].toUpperCase());
}

// set seasons - starting process
$(document).ready(function() {
	setSeasons();
});

// change season by drop down click
function changeSeason(season) {	
	el = document.getElementById('playtable');
	// remove content of playtable container
	el.innerHTML = '';
	var z = document.getElementById('filterSelect');
	// set to 0 and update season
	z.setAttribute('onchange', 'getTeamMatches('+season+',this.value)')
	z.selectedIndex = 0;
	// start process for week and match container creation
	getMatches(season);
};

// set seasons on start
function setSeasons() {	
	$.getJSON( "./assets/seasons/seasons.json", function( data ) {	
		// create season selection

		// var year = new Date().getFullYear();
		var year = defaultYear;
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
		// create filter select and options
		createFilter(year);
		// create week and match containers
		getMatches(year);
	});
}

// fold and unfold single tables
function showTable(data) {
	var el = document.getElementById('week'+data);
	var arrow = document.getElementById('arrow'+data);
	if(el.style.height == '0px' || el.style.height == ''){
		el.style.height = 'auto';
		arrow.style.transform = "rotate(-270deg)";
	}else{
		el.style.height = '0px';
		arrow.style.transform = "rotate(-90deg)";
	}
}

// fold and unfold all tables
function showAll() {

	var elements = document.getElementsByClassName('weekHead').length;

	for(var i = 1; i <= elements; i++) {
		var el = document.getElementById('week'+i);
		var arrow = document.getElementById('arrow'+i);
		var foldText = document.getElementById('unfold');
		if(el.style.height == '0px' || el.style.height == ''){
			el.style.height = 'auto';
			arrow.style.transform = "rotate(-270deg)";
			foldText.innerHTML = "Fold all";

		}else{
			el.style.height = '0px';
			arrow.style.transform = "rotate(-90deg)";
			foldText.innerHTML = "Unfold all";
		}
	}
}

// unfold all tables
function openAll() {

	var elements = document.getElementsByClassName('weekHead').length;

	for(var i = 1; i <= elements; i++) {
		var el = document.getElementById('week'+i);
		var arrow = document.getElementById('arrow'+i);
		var foldText = document.getElementById('unfold');
		el.style.height = 'auto';
		arrow.style.transform = "rotate(-270deg)";
		foldText.innerHTML = "Fold all";
	}
}

// function to create team filter selection
function createFilter(season) {
	$.getJSON( "./assets/teams/"+season+".json", function( data ) {
		var teamOption = '<select class="filter" id="filterSelect" onchange="getTeamMatches('+season+',this.value)"><option value="">... filter</option>';
		var teamFilter = [];
		for(var i = 0; i < data.length; i++) {
			teamFilter.push(data[i].name);
		}
		teamFilter.sort();
		for(var i = 0; i < teamFilter.length; i++) {
			teamOption += '<option value="'+teamFilter[i]+'">'+teamFilter[i]+'</option>';
		}
		teamOption += '</select>';
		$( teamOption ).appendTo( "#filter" );
	});
}