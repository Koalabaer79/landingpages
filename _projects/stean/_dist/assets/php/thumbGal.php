<?php

function getFiles($path) {
	$images = scandir($path);
	$countImg = (count($images) - 2);

	$imgShow = 4;
	if($countImg < $ingShow) {
		$imgShow = $countImg;
	}

	$filesArr = array();
	foreach($images as $img) {
		$imgPath = $path.$img;
		if (file_exists($imgPath) && $img != "." && $img != "..") {
			$filesArr[$img] = date ("d.m.Y H:i:s.", filemtime($imgPath));
		}
	}

	return $filesArr;
}

function sortActual($files, $path) {
	$filesSort = arsort($files);
	$filesCut = array_slice($files, 0, 4);
	foreach($filesCut as $fileName => $date) {
		echo '<div class="imgCont"><img src="'.$path.$fileName.'" /></div>';
	}
}

$path = './assets/gallery/thumbs/';
$files = getFiles($path);
sortActual($files, $path);

?>