<?php

// Set Years and URL additions
if(isset($_GET['year'])) {
	$year = $_GET['year'];
	$yearURLadd = "year=".$_GET['year']."&";
	$yearURL = "?year=".$_GET['year'];
}else{
	$year = 2020;
	$yearURLadd = "";
	$yearURL = "";
}

// Message for Saving
$message = '';
if(isset($_GET['success'])) {
	if($_GET['success'] == "update") {
		$message = '<p class="success">Successfully updated Teams for '.$year.'</p>';
	}
}

// Get Teams and Matches JSON File for chosen or default season
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

// Function to sort Matches in ascending order
function build_sorter($a,$b) {
	if ($a['date'] == $b['date']) {
    	if ($a['time'] < $b['time']) return 1;
    }
    return $a['date'] > $b['date'] ? 1 : -1;
}

// Load subFiles for each section
include('./subFiles/matchSeasons.php');
include('./subFiles/matchNew.php');
include('./subFiles/matchShow.php');
include('./subFiles/matchDelete.php');
include('./subFiles/matchUpdate.php');

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
			cursor: pointer;
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
		.success {
			color: green;
		}
	</style>
<body id="body">
	
<?php

// Echo results
$echo = '<h1>Handle Seasons</h1>';
$echo .= $message;
$echo .= '<hr />';

$echo .= $echoSeasons;
$echo .= $echoNewMatch;
$echo .= $echoCurrentMatches;

echo $echo;

?>
</body>
</html>