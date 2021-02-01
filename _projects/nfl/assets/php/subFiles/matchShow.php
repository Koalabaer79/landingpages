<?php

if(isset($_POST['current'])) {
	setSeason($year);
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
		for($i=1;$i<=5;$i++) {
			if($_POST[$matchPrefix.'vq'.$i] == ""){ $vqPoints = 0; }else{ $vqPoints = $_POST[$matchPrefix.'vq'.$i]; }
			if($_POST[$matchPrefix.'hq'.$i] == ""){ $hqPoints = 0; }else{ $hqPoints = $_POST[$matchPrefix.'hq'.$i]; }
			array_push($pointsVisitor, $vqPoints);
			array_push($pointsHome, $hqPoints);
		}
		$date = $_POST[$matchPrefix."date"];
		$time = $_POST[$matchPrefix."time"];
		$$match = array("date" => $date, "time" => $time, "visitor" => array("team" => $_POST[$matchPrefix."visitor"], "points" => $pointsVisitor), "home" => array("team" => $_POST[$matchPrefix."home"], "points" => $pointsHome));
		$week = "week".$_POST[$matchPrefix."week"];
		if(!isset($$week)) {
			$$week = array();
			$weeks = $weeks+1;
		}
		array_push($$week, $$match);	
		usort($$week, "build_sorter");
	}

	$finalArr = array();
	for($i=1;$i<=$weeks;$i++) {
		$weekArr = "week".$i;
		array_push($finalArr, $$weekArr);
	}

	$newJsonString = json_encode($finalArr);
	file_put_contents('../matches/'.$year.'.json', $newJsonString);

	header("Refresh:0");
}

if($teamsTrue == true && $matchesTrue == true) {
	$echoCurrentMatches = showCurrent($year, $json_a, $json_b);
}

function showCurrent($year, $json_a, $json_b) {

	$loop = 1;
	$week = 1;

	$echo = '<h2>Current Entries for '.$year.'</h2>';

	if(count($json_b) != 0) {
		
		$echo .= '<form method="post" action="create_matches.php'.$yearURL.'">';
		$echo .= '<input type="submit" value="save" name="current">';

		foreach ($json_b as $match => $match_a) {

			if(count($match_a) != 0) {

				$echo .= '<h3>Week '.$week.'</h3>
				<div class="entries">';

				for($j = 0; $j < count($match_a); $j++) {
					$w = 'w'.$week;
					$m = 'm'.$loop;
					
					$echo .= '<div class="entry">
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
							<td>
								<select name="'.$m.'_week">
									<option value="0">... select week</option>';
									for($i=1;$i<18;$i++){
										if($i == $week){
											$selected = "selected";
										}else{
											$selected = "";
										}
										$echo .= '<option value="'.$i.'" '.$selected.'>Week '.$i.'</option>';
									}
								$echo .= '</select>
							</td>
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
							<th>OT</th>
						</tr>
						<tr>
							<th>Visitor</th>
							<td>
								<select name="'.$m.'_visitor">
									<option value="0">... Visitor Team</option>';
									foreach ($json_a as $team => $team_a) {
										if(strtolower($team_a['name']) == $match_a[$j]['visitor']['team']){
											$selected = "selected";
										}else{
											$selected = "";
										}
										$echo .= '<option value="'.strtolower($team_a['name']).'" '.$selected.'>'.$team = $team_a['name'].'</option>';
									}
								$echo .= '</select>
							</td>';
							for( $p=0; $p<5; $p++) {
								$val = $p+1;
								$echo .= '<td><input class="points" type="text" name="'.$m.'_vq'.$val.'" value="'.$match_a[$j]['visitor']['points'][$p].'" /></td>';
							}
						$echo .= '</tr>
						<tr>
							<th>Home</th>
							<td>
								<select name="'.$m.'_home">
									<option value="0">... Home Team</option>';	
									foreach ($json_a as $team => $team_a) {
										if(strtolower($team_a['name']) == $match_a[$j]['home']['team']){
											$selected = "selected";
										}else{
											$selected = "";
										}
										$echo .= '<option value="'.$team = strtolower($team_a['name']).'" '.$selected.'>'.$team = $team_a['name'].'</option>';
									}
								$echo .= '</select>
							</td>';
							for( $p=0; $p<5; $p++) {
								$val = $p+1;
								$echo .= '<td><input class="points" type="text" name="'.$m.'_hq'.$val.'" value="'.$match_a[$j]['home']['points'][$p].'" /></td>';
							}
						$echo .= '</tr>
					</table>
					</div>';
					$loop++;
				}
				$echo .= '</div>';
			}
			$week++;
		}
		$echo .= '<input type="submit" value="save" name="current">
		</form>';
	}else{
		$echo .= "<p>No entries to show!</p>";
	}

	return $echo;
}

?>