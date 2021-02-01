<?php

if(isset($_POST['new'])) {
	newMatch($year, $json_b);
}

function newMatch($year, $json_b) {
	$week = $_POST["week"] - 1;
	$date = $_POST["date"];
	$time = $_POST["time"];
	$pointsVisitor = array();
	$pointsHome = array();
	for($i=1;$i<=5;$i++) {
		if($_POST['vq'.$i] == ""){ $vqPoints = 0; }else{ $vqPoints = $_POST['vq'.$i]; }
		if($_POST['hq'.$i] == ""){ $hqPoints = 0; }else{ $hqPoints = $_POST['hq'.$i]; }
		array_push($pointsVisitor, $vqPoints);
		array_push($pointsHome, $hqPoints);
	}
	$match = array("date" => $date, "time" => $time, "visitor" => array("team" => $_POST["visitor"], "points" => $pointsVisitor), "home" => array("team" => $_POST["home"], "points" => $pointsHome));
	array_push($json_b[$week], $match);

	usort($json_b[$week], "build_sorter");

	$newJsonString = json_encode($json_b);
	file_put_contents('../matches/'.$year.'.json', $newJsonString);

	header("Refresh:0");
}

$echoNewMatch = '
<h2>New Entry</h2>
<form action="create_matches.php'.$yearURL.'" method="post">
<table style="border: 1px solid #000; margin-bottom: 20px;">
	<tr>
		<th>Week</th>
		<td>';
			$echoNewMatch .= '<select name="week">';
				$echoNewMatch .= '<option value="0">... select week</option>';
				for($i=1;$i<18;$i++){
					$echoNewMatch .= '<option value="'.$i.'">Week '.$i.'</option>';
				}
			$echoNewMatch .= '</select>';
		$echoNewMatch .= '</td>
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
		<th>OT</th>
	</tr>
	<tr>
		<th>Visitor</th>
		<td>
			<select name="visitor">
				<option value="0">... Visitor Team</option>';	
				foreach ($json_a as $team => $team_a) {
					$echoNewMatch .= '<option value="'.$team = strtolower($team_a['name']).'">'.$team = $team_a['name'].'</option>';
				}
			$echoNewMatch .= '</select>
		</td>
		<td><input class="points" type="text" name="vq1"></td>
		<td><input class="points" type="text" name="vq2"></hd>
		<td><input class="points" type="text" name="vq3"></td>
		<td><input class="points" type="text" name="vq4"></td>
		<td><input class="points" type="text" name="vq5"></td>
	</tr>
	<tr>
		<th>Home</th>
		<td>
			<select name="home">
				<option value="0">... Home Team</option>';	
				foreach ($json_a as $team => $team_a) {
					$echoNewMatch .= '<option value="'.$team = strtolower($team_a['name']).'">'.$team = $team_a['name'].'</option>';
				}
			$echoNewMatch .= '</select>
		</td>
		<td><input class="points" type="text" name="hq1"></td>
		<td><input class="points" type="text" name="hq2"></hd>
		<td><input class="points" type="text" name="hq3"></td>
		<td><input class="points" type="text" name="hq4"></td>
		<td><input class="points" type="text" name="hq5"></td>
	</tr>
</table>
<input type="submit" value="save" name="new">
</form>
<hr />';

?>