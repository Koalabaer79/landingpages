<?php

if(isset($_POST['update'])) {
	updateSeason($year,$yearURLadd,$json_a,$json_b);
}

function updateSeason($year,$yearURLadd,$json_a,$json_b) {

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

				$pm = 0;
				$gpm = 0;

				if($team == $match_a[$i]['visitor']['team'] && $team != $match_a[$i]['home']['team']) {
					
					for($j = 0; $j < 5; $j++) {
						$p += $match_a[$i]['visitor']['points'][$j];
						$gp += $match_a[$i]['home']['points'][$j];
						$pm += $match_a[$i]['visitor']['points'][$j];
						$gpm += $match_a[$i]['home']['points'][$j];
					}
					if($pm > $gpm){
						$s = $s+1;
					}else if($pm == $gpm){
						$u = $u+1;
					}else{
						$n = $n+1;
					}
				}else if($team == $match_a[$i]['home']['team'] && $team != $match_a[$i]['visitor']['team']) {
					for($j = 0; $j < 5; $j++) {
						$gp += $match_a[$i]['visitor']['points'][$j];
						$p += $match_a[$i]['home']['points'][$j];
						$gpm += $match_a[$i]['visitor']['points'][$j];
						$pm += $match_a[$i]['home']['points'][$j];
					}
					if($pm > $gpm){
						$s = $s+1;
					}else if($pm == $gpm){
						$u = $u+1;
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

		$json_a[$count]['standings'] = $standings;
		$count++;
	}

	$newJsonString = json_encode($json_a);
	file_put_contents('../teams/'.$year.'.json', $newJsonString);

	header('location: create_matches.php?'.$yearURLadd.'success=update');
}

?>