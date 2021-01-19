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

foreach ($json_a as $team => $team_a) {
	$filename = "../teams/team/".$team_a['name'].".json";
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

	echo $filename."<br />";
	$arr = array ( 
		"code" => $team_a['code'],
		"s" => $s,
		"n" => $n,
		"u" => $u,
		"p" => $p,
		"gp" => $gp
	);

	$myfile = fopen($filename, "w");
	fwrite($myfile, json_encode($arr));
	fclose($myfile);
}
?>