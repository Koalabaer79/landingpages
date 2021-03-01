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
	$output = "";
	foreach($filesCut as $fileName => $date) {
		$output .= '<div class="imgCont"><img src="'.$path.$fileName.'" /></div>';
	}
	return $output;
}

$path = './assets/gallery/thumbs/';
$files = getFiles($path);
$show = '<p class="textCont">Meine Gallerie umfasst insgesamt '.count($files).' Bilder. Folgend zeige ich die 4 neuesten Fotos von mir.<br />Klicke auf den unteren Button um die gesamte Galerie zu sehen.';
$show .= sortActual($files, $path);
echo $show;

?>