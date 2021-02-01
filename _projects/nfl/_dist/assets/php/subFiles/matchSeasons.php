<?php

if(isset($_POST['newSeason'])) {
	$fileTeams = "../teams/template.json";
	$fileMatches = "../matches/template.json";
	$newTeams = "../teams/".$_POST['newSeason'].".json";
	$newMatches = "../matches/".$_POST['newSeason'].".json";
	copy($fileTeams, $newTeams);
	copy($fileMatches, $newMatches);

	$seasonsFile = file_get_contents("../seasons/seasons.json");
	if ($seasonsFile === false) {
		echo "Error: cannot find seasons.json";
	}
	$seasons_a = json_decode($seasonsFile, true);
	if ($seasons_a === null) {
		echo "Error: seasons.json is emtpy";
	}
	array_push($seasons_a, $_POST['newSeason']);

	$newJsonString = json_encode($seasons_a);
	file_put_contents('../seasons/seasons.json', $newJsonString);

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

$echoSeasons = '
<div class="flex">
	<div class="flexElem">
		<h2>Choose Season</h2>
		<form action="create_matches.php" method="get">
			<select name="year" class="year">';
				for($i=0;$i<count($years);$i++) {
					if($years[$i] == $year) { $selected = " selected"; }else{ $selected = ""; }
					$echoSeasons .= '<option value="'.$years[$i].'"'.$selected.'>'.$years[$i].'</option>';
				}	
			$echoSeasons .= '</select>
			&nbsp;&nbsp;&nbsp;
			<button class="button">Choose</button>
		</form>
	</div>
	<div class="flexElem" style="border-left: 3px solid #D50A0A; padding-left: 20px;">		
		<h2>New Season</h2>
		<form action="create_matches.php'.$yearURL.'" method="post">
			<select name="newSeason" class="year">
				<option value="'.($yearLast+1).'">'.($yearLast+1).'</option>
			</select>
			&nbsp;&nbsp;&nbsp;
			<button class="button">Create</button>
		</form>
	</div>
	<div class="flexElem" style="border-left: 3px solid #D50A0A; padding-left: 20px;">		
		<h2>Update Season</h2>
		<form action="create_matches.php'.$yearURL.'" method="post">
			<input type="submit" class="button" name="update" value="update season '.$year.'" style="margin-top: 3px;">
		</form>
	</div>
</div>
<hr />';

?>