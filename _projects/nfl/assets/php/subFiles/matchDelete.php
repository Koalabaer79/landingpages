<?php

if(isset($_GET['week']) && isset($_GET['match'])) {
	$array = deleteMatch($json_b,$_GET['week'],$_GET['match']);
	$newJsonString = json_encode($array);
	file_put_contents('../matches/'.$year.'.json', $newJsonString);
	// header('Location: create_matches.php'.$yearURL);
}

function deleteMatch($json_b,$week,$match) {
	array_splice($json_b[$week], $match, 1);
	return $json_b;
}

?>