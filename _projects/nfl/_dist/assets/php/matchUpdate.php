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

$count=0;

foreach ($json_a as $team => $team_a) {

	$team = strtolower($team_a['name']);

	$s = 0;
	$n = 0;
	$u = 0;
	$p = 0;
	$gp = 0;

	foreach ($json_b as $match => $match_a) {

		for($i = 0; $i < count($match_a); $i++) {
			if($team == $match_a[$i]['visitor']['team'] && $team != $match_a[$i]['home']['team']) {
				
				for($j = 0; $j < 4; $j++) {
					$p += $match_a[$i]['visitor']['points'][$j]."<br />";
					$gp += $match_a[$i]['home']['points'][$j]."<br />";
				}
				if($p > $gp){
					$s = $s+1;
				}else if($p == $gp){
					$u = $u+1;
				}else{
					$n = $n+1;
				}
			}else if($team == $match_a[$i]['home']['team'] && $team != $match_a[$i]['visitor']['team']) {
				for($j = 0; $j < 4; $j++) {
					$gp += $match_a[$i]['visitor']['points'][$j]."<br />";
					$p += $match_a[$i]['home']['points'][$j]."<br />";
				}
				if($p > $gp){
					$s = $s+1;
				}else{
					$n = $n+1;
				}
			}
		}
	}
	
	$standings = array (
		"s" => $s,
		"n" => $n,
		"u" => $u,
		"p" => $p,
		"gp" => $gp
	);


	echo $count."<br>";
	var_dump( $json_a[$count]);
	echo "<br>";
	var_dump($standings);
	echo "<br>";

	$json_a[$count]['standings'] = $standings;
	$count++;
}

// console_log($json_a);

$newJsonString = json_encode($json_a);
file_put_contents('../teams/teams.json', $newJsonString);

function console_log( $data ){
	echo '<script>';
	echo 'console.log('. json_encode( $data ) .')';
	echo '</script>';
}

?>