<!DOCTYPE html>
<html lang="de">
	<head><meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
	</head>
	<style>
		table { font-family: Verdana; font-size: 14px; margin-bottom: 10px;}
	</style>
<body id="body">
	
<?php

$string = file_get_contents("../teams/teams.json");
if ($string === false) {
    echo "Error: cannot find teams.json";
}
$json_a = json_decode($string, true);
if ($json_a === null) {
    echo "Error: teams.json is emtpy";
}

$matches = file_get_contents("../matches/matches.json");
if ($matches === false) {
    echo "Error: cannot find matches.js";
}
$json_b = json_decode($matches, true);
if ($json_b === null) {
    echo "Error: matches.json is emtpy";
}

echo '
<h2>New Entry</h2>
<br /><br />
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
		<td><input type="text" name="vq1"></td>
		<td><input type="text" name="vq2"></hd>
		<td><input type="text" name="vq3"></td>
		<td><input type="text" name="vq4"></td>
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
		<td><input type="text" name="hq1"></td>
		<td><input type="text" name="hq2"></hd>
		<td><input type="text" name="hq3"></td>
		<td><input type="text" name="hq4"></td>
	</tr>
</table>
<br /><br />
<hr />
<h2>Current Entries</h2>
<br /><br />';

$loop = 1;
$week = 1;

foreach ($json_b as $match => $match_a) {

	for($j = 0; $j < count($match_a); $j++) {
		$w = 'w'.$week;
		$m = 'm'.$loop;
		
		echo '<table style="border: 1px solid #000">
			<tr>
				<th colspan="6">Match '.$loop.'</th>
			</tr>
			<tr>
				<th>Week</th>
				<td>';
					echo '<select name="week">';
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
						<input type="text" name="date" value="'.$match_a[$j]['date'].'">
				</td>
				<td colspan="4"></td>
			</tr>
			<tr>
				<th>Time</th>
				<td>
						<input type="text" name="time" value="'.$match_a[$j]['time'].'">
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
							if(strtolower($team_a['name']) == $match_a[$j]['visitor']['team']){
								$selected = "selected";
							}else{
								$selected = "";
							}
							echo '<option value="'.strtolower($team_a['name']).'">'.$team = $team_a['name'].'</option>';
						}
					echo '</select>';
				echo '</td>
				<td><input type="text" name="vq1"></td>
				<td><input type="text" name="vq2"></hd>
				<td><input type="text" name="vq3"></td>
				<td><input type="text" name="vq4"></td>
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
				<td><input type="text" name="hq1"></td>
				<td><input type="text" name="hq2"></hd>
				<td><input type="text" name="hq3"></td>
				<td><input type="text" name="hq4"></td>
			</tr>
		</table>';
		$loop++;
	}
	$week++;
}

?>
</body>
</html>