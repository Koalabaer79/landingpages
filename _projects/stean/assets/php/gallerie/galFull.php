<?php

function getFiles($path) {
	$images = scandir($path);
	$countImg = (count($images) - 3);

	$filesArr = array();
	foreach($images as $img) {
		$imgPath = $path.$img;
		if (file_exists($imgPath) && $img != "." && $img != "..") {
			$filesArr[$img] = date ("d.m.Y H:i:s.", filemtime($imgPath));
		}
	}
	return $filesArr;
}

function sortActual($files, $pathThumbs, $pathFull, $page, $items) {
	$itemsTotal = $page * $items;
	$itemsMin = $itemsTotal - $items;
	$filesTotal = count($files);
	$arrorRight = "";
	$arrowLeft = "";
	if($filesTotal < $itemsTotal) {
		$itemsTotal = $filesTotal;
	}
	if($page > 1){
		$arrowLeft = '<a href="gallerie.php?page='.($page - 1).'"><div class="smallArrow left"></div> -20</a>';
	}
	if($filesTotal > $itemsTotal) {
		$arrowRight = '<a href="gallerie.php?page='.($page + 1).'">+20 <div class="smallArrow right"></div></a>';
	}
	arsort($files);
	$filesCut = array_slice($files, $itemsMin, $itemsTotal);
	$output = '<div class="controlCont"><div class="arrow">'.$arrowLeft.'</div><div class="centerCont">Bilder '.($itemsMin + 1).' - '.$itemsTotal.'</div><div class="arrow">'.$arrowRight.'</div></div>'; 
	$output .= '<div class="imagesCont">';
	$loop = 1;
	foreach($filesCut as $fileName => $date) {
		$imgPath = $pathThumbs.$fileName;
		$name = date ("d.m.Y", filemtime($imgPath));
		$output .= '<div class="imgCont"><img src="'.$pathThumbs.$fileName.'" alt="Stean Galleriebild '.$loop.'" onclick="showImage(\''.$pathFull.$fileName.'\')" /><p>'.$name.'</p></div>';
		$loop++;
	}
	$output .= "</div>";
	$output .= '<div class="controlCont"><div class="arrow">'.$arrowLeft.'</div><div class="centerCont">Bilder '.($itemsMin + 1).' - '.$itemsTotal.'</div><div class="arrow">'.$arrowRight.'</div></div>'; 
	return $output;
}

function getPage() {
	if(isset($_GET["page"]) && $_GET["page"] != ""){
		return $_GET["page"];
	}else{
		return 1;
	}
}

include('galParams.php');
$files = getFiles($pathThumbs);
$show = '<div class="insCont"><p class="textCont">Meine Gallerie umfasst insgesamt '.count($files).' Bilder. Diese sind chronologisch absteigend sortiert. Ich möchte darauf Hinweisen, dass die hier gezeigten Fotos mir gehören und ich das Verwenden oder Klauen nicht will.';
$show .= sortActual($files, $pathThumbs, $pathFull, getPage(), $items);
$show .= "</div>";
echo $show;

?>