<?php

if(isset($_GET['year'])) {
	$year = $_GET['year'];
	$yearURLadd = "year=".$_GET['year']."&";
	$yearURL = "?year=".$_GET['year'];
}else{
	$year = 2020;
	$yearURLadd = "";
	$yearURL = "";
}

if(isset($_POST['newSeason'])) {
	$fileTeams = "../teams/template.json";
	$fileMatches = "../matches/template.json";
	$newTeams = "../teams/".$_POST['newSeason'].".json";
	$newMatches = "../matches/".$_POST['newSeason'].".json";
	copy($fileTeams, $newTeams);
	copy($fileMatches, $newMatches);

	header("Location: create_matches.php?year=".$_POST['newSeason']);
}

$seasonsCreated = scandir('../teams/');
$years = array();
$yearLast = 0;
foreach($seasonsCreated as $elFound) {
	if($elFound != "." && $elFound != ".."&& $elFound != "logos" && $elFound != "template.json" && $elFound != ".DS_Store") {
		$elFound = str_replace(".json", "", $elFound);
		array_push($years, $elFound);
		if($elFound > $yearLast) {
			$yearLast = $elFound;
		}
	}
}



$string = file_get_contents("../teams/".$year.".json");
if ($string === false) {
    echo "Error: cannot find ".$year.".json";
}
$json_a = json_decode($string, true);
if ($json_a === null) {
    echo "Error: ".$year.".json is emtpy";
}else{
	$teamsTrue = true;
}

$matches = file_get_contents("../matches/".$year.".json");
if ($matches === false) {
    echo "Error: cannot find ".$year.".json";
}
$json_b = json_decode($matches, true);
if ($json_b === null) {
    echo "Error: ".$year.".json is emtpy";
}else{
	$matchesTrue = true;
}

if(isset($_POST['current'])) {
	setSeason($year);
}

if(isset($_POST['new'])) {
	newMatch($year, $json_b);
}

if(isset($_GET['week']) && isset($_GET['match'])) {
	$array = deleteMatch($json_b,$_GET['week'],$_GET['match']);
	$newJsonString = json_encode($array);
	file_put_contents('../matches/'.$year.'.json', $newJsonString);
	// header('Location: create_matches.php'.$yearURL);
}

function newMatch($year, $json_b) {
	$week = $_POST["week"] - 1;
	$date = $_POST["date"];
	$time = $_POST["time"];
	$pointsVisitor = array();
	$pointsHome = array();
	for($i=1;$i<=4;$i++) {
		array_push($pointsVisitor, $_POST['vq'.$i]);
		array_push($pointsHome, $_POST['hq'.$i]);
	}
	$match = array("date" => $date, "time" => $time, "visitor" => array("team" => $_POST["visitor"], "points" => $pointsVisitor), "home" => array("team" => $_POST["home"], "points" => $pointsVisitor));
	array_push($json_b[$week], $match);

	usort($json_b[$week], "build_sorter");

	$newJsonString = json_encode($json_b);
	file_put_contents('../matches/'.$year.'.json', $newJsonString);

	header("Refresh:0");
}

function setSeason($year) {
	$arrLength = count($_POST);
	$arrMatches = ($arrLength-1)/13;
	$weeks = 0;
	for($o=1;$o<=$arrMatches;$o++) {
		$match = "match".$o;
		$matchPrefix = 'm'.$o."_";
		$pointsVisitor = array();
		$pointsHome = array();
		for($i=1;$i<=4;$i++) {
			array_push($pointsVisitor, $_POST[$matchPrefix.'vq'.$i]);
			array_push($pointsHome, $_POST[$matchPrefix.'hq'.$i]);
		}
		$date = $_POST[$matchPrefix."date"];
		$time = $_POST[$matchPrefix."time"];
		$$match = array("date" => $date, "time" => $time, "visitor" => array("team" => $_POST[$matchPrefix."visitor"], "points" => $pointsVisitor), "home" => array("team" => $_POST[$matchPrefix."home"], "points" => $pointsVisitor));
		$week = "week".$_POST[$matchPrefix."week"];
		if(!isset($$week)) {
			$$week = array();
			$weeks = $weeks+1;
		}
		array_push($$week, $$match);
	}

	$finalArr = array();
	for($i=1;$i<=$weeks;$i++) {
		$weekArr = "week".$i;
	
		usort($$weekArr, "build_sorter");
		// usort($$weekArr, build_sorter('time'));
		
		foreach ($$weekArr as $item) {
			echo $item['date'] . ', ' . $item['time'] . "<br />";
		}

		array_push($finalArr, $$weekArr);
	}

	$newJsonString = json_encode($finalArr);
	file_put_contents('../matches/'.$year.'.json', $newJsonString);

	header("Refresh:0");
}

function build_sorter($a,$b) {
	if ($a['date'] == $b['date']) {
    	if ($a['time'] < $b['time']) return 1;
    }
    return $a['date'] > $b['date'] ? 1 : -1;
}

function deleteMatch($json_b,$week,$match) {
	array_splice($json_b[$week], $match, 1);
	return $json_b;
}

?>

<!DOCTYPE html>
<html lang="de">
	<head><meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
	</head>
	<style>
		body { font-family: Verdana; }
		table { font-family: Verdana; font-size: 14px; margin: 0; }
		.points { width: 50px; text-align: center; }
		.entries, .flex { 
			display: -ms-flexbox;
			display: -webkit-flex;
			display: flex;
			-webkit-flex-direction: row;
			-ms-flex-direction: row;
			flex-direction: row;
			-webkit-flex-wrap: wrap;
			-ms-flex-wrap: wrap;
			flex-wrap: wrap;
			-webkit-justify-content: flex-start;
			-ms-flex-pack: start;
			justify-content: flex-start;
		}
		.entry, .flexElem {
			position: relative;
			margin: 0 10px 10px 0;
			padding: 5px;
		}
		.delete {
			position: absolute;
			width: 20px;
			height: 20px;
			top: 10px;
			right: 10px;
			/* cursor: pointer; */
		}
		.deleteIcon {
			width: 20px;
			height: 20px;
		}
		input[type="submit"], .button {
			background-color: #013369;
			color: #fff;
			border: 0;
			border-bottom: 3px solid #D50A0A;
			font-size: 16px;
			text-transform: uppercase;
			padding: 10px;
		}
		.bigNumInput {
			font-size: 16px;
			padding: 10px;
			width: 60px;
		}
		.year {
			font-size: 16px;
			text-transform: uppercase;
			padding: 10px;
		}
		hr {
			height: 3px;
			background-color: #D50A0A;
			margin-top: 20px;
		}
	</style>
<body id="body">
	
<?php

echo '<h1>Handle Seasons</h1>
<hr />
<div class="flex">
	<div class="flexElem">
		<h2>Choose Year</h2>
		<form action="create_matches.php" method="get">
			<select name="year" class="year">';
				for($i=0;$i<count($years);$i++) {
					if($years[$i] == $year) { $selected = " selected"; }else{ $selected = ""; }
					echo '<option value="'.$years[$i].'"'.$selected.'>'.$years[$i].'</option>';
				}	
			echo '</select>
			&nbsp;&nbsp;&nbsp;
			<button class="button">Choose</button>
		</form>
	</div>
	<div class="flexElem" style="border-left: 3px solid #D50A0A; padding-left: 20px;">		
		<h2>New Season</h2>
		<form action="create_matches.php" method="post">
			<select name="newSeason" class="year">
				<option value="'.($yearLast+1).'">'.($yearLast+1).'</option>
			</select>
			&nbsp;&nbsp;&nbsp;
			<button class="button">Create</button>
		</form>
	</div>
</div>
<hr />
<h2>New Entry</h2>
<form action="create_matches.php'.$yearURL.'" method="post">
<table style="border: 1px solid #000">
	<tr>
		<th>Week</th>
		<td>';
			echo '<select name="week">';
				echo '<option value="0">... select week</option>';
				for($i=1;$i<18;$i++){
					echo '<option value="'.$i.'">Week '.$i.'</option>';
				}
			echo '</select>';
		echo '</td>
	</tr>
	<tr>
		<th>Date</th>
		<td>
				<input type="text" name="date">
		</td>
		<td colspan="4"></td>
	</tr>
	<tr>
		<th>Time</th>
		<td>
				<input type="text" name="time">
		</td>
		<td colspan="4"></td>
	</tr>
	<tr>
		<td></td>
		<td></td>
		<th>Q1</th>
		<th>Q2</th>
		<th>Q3</th>
		<th>Q4</th>
	</tr>
	<tr>
		<th>Visitor</th>
		<td>';
			echo '<select name="visitor">';
				echo '<option value="0">... Visitor Team</option>';	
				foreach ($json_a as $team => $team_a) {
					echo '<option value="'.$team = strtolower($team_a['name']).'">'.$team = $team_a['name'].'</option>';
				}
			echo '</select>';
		echo '</td>
		<td><input class="points" type="text" name="vq1"></td>
		<td><input class="points" type="text" name="vq2"></hd>
		<td><input class="points" type="text" name="vq3"></td>
		<td><input class="points" type="text" name="vq4"></td>
	</tr>
	<tr>
		<th>Home</th>
		<td>';
			echo '<select name="home">';
				echo '<option value="0">... Home Team</option>';	
				foreach ($json_a as $team => $team_a) {
					echo '<option value="'.$team = strtolower($team_a['name']).'">'.$team = $team_a['name'].'</option>';
				}
			echo '</select>';
		echo '</td>
		<td><input class="points" type="text" name="hq1"></td>
		<td><input class="points" type="text" name="hq2"></hd>
		<td><input class="points" type="text" name="hq3"></td>
		<td><input class="points" type="text" name="hq4"></td>
	</tr>
</table>
<input type="submit" value="save" name="new">
</form>
<hr />';

if($teamsTrue == true && $matchesTrue == true) {
	showCurrent($year, $json_a, $json_b);
}

function showCurrent($year, $json_a, $json_b) {

	$loop = 1;
	$week = 1;

	echo '<h2>Current Entries for '.$year.'</h2>';

	if(count($json_b) != 0) {
		
		echo '<form method="post" action="create_matches.php'.$yearURL.'">';
		echo '<input type="submit" value="save" name="current">';

		foreach ($json_b as $match => $match_a) {

			echo '<h3>Week '.$week.'</h3>
			<div class="entries">';

			for($j = 0; $j < count($match_a); $j++) {
				$w = 'w'.$week;
				$m = 'm'.$loop;
				
				echo '<div class="entry">
				<a class="delete" href="create_matches.php?'.$yearURLadd.'week='.($week - 1).'&match='.$j.'">
					<svg class="deleteIcon" version="1.1" id="Ebene_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve">
						<style type="text/css">
							.st0{fill:#D50A0A;stroke:#000000;stroke-miterlimit:10;}
							.st1{fill:none;stroke:#ffffff;stroke-miterlimit:10;}
						</style>
						<g>
							<rect x="0.6" y="0.7" class="st0" width="18.7" height="18.7"/>
							<line class="st1" x1="2.5" y1="2.5" x2="17.1" y2="17.1"/>
							<line class="st1" x1="17.1" y1="2.7" x2="2.5" y2="17.4"/>
						</g>
					</svg>
				</a>
				<table style="border: 1px solid #000">
					<tr>
						<th colspan="6">Match '.$loop.'</th>
					</tr>
					<tr>
						<th>Week</th>
						<td>';
							echo '<select name="'.$m.'_week">';
								echo '<option value="0">... select week</option>';
								for($i=1;$i<18;$i++){
									if($i == $week){
										$selected = "selected";
									}else{
										$selected = "";
									}
									echo '<option value="'.$i.'" '.$selected.'>Week '.$i.'</option>';
								}
							echo '</select>';
						echo '</td>
					</tr>
					<tr>
						<th>Date</th>
						<td>
								<input type="text" name="'.$m.'_date" value="'.$match_a[$j]['date'].'">
						</td>
						<td colspan="4"></td>
					</tr>
					<tr>
						<th>Time</th>
						<td>
								<input type="text" name="'.$m.'_time" value="'.$match_a[$j]['time'].'">
						</td>
						<td colspan="4"></td>
					</tr>
					<tr>
						<td></td>
						<td></td>
						<th>Q1</th>
						<th>Q2</th>
						<th>Q3</th>
						<th>Q4</th>
					</tr>
					<tr>
						<th>Visitor</th>
						<td>';
							echo '<select name="'.$m.'_visitor">';
								echo '<option value="0">... Visitor Team</option>';
								foreach ($json_a as $team => $team_a) {
									if(strtolower($team_a['name']) == $match_a[$j]['visitor']['team']){
										$selected = "selected";
									}else{
										$selected = "";
									}
									echo '<option value="'.strtolower($team_a['name']).'" '.$selected.'>'.$team = $team_a['name'].'</option>';
								}
							echo '</select>';
						echo '</td>';
						for( $p=0; $p<4; $p++) {
							$val = $p+1;
							echo '<td><input class="points" type="text" name="'.$m.'_vq'.$val.'" value="'.$match_a[$j]['visitor']['points'][$p].'" /></td>';
						}
					echo '</tr>
					<tr>
						<th>Home</th>
						<td>';
							echo '<select name="'.$m.'_home">';
								echo '<option value="0">... Home Team</option>';	
								foreach ($json_a as $team => $team_a) {
									if(strtolower($team_a['name']) == $match_a[$j]['home']['team']){
										$selected = "selected";
									}else{
										$selected = "";
									}
									echo '<option value="'.$team = strtolower($team_a['name']).'" '.$selected.'>'.$team = $team_a['name'].'</option>';
								}
							echo '</select>';
						echo '</td>';
						for( $p=0; $p<4; $p++) {
							$val = $p+1;
							echo '<td><input class="points" type="text" name="'.$m.'_hq'.$val.'" value="'.$match_a[$j]['home']['points'][$p].'" /></td>';
						}
					echo '</tr>
				</table>
				</div>';
				$loop++;
			}
			$week++;
			echo '</div>';
		}
		echo '<input type="submit" value="save" name="current">
		</form>';
	}else{
		echo "<p>No entries to show!</p>";
	}
}
echo '<hr />';

?>
</body>
</html>