<?php

$name = $_POST['name'];
$email = $_POST['email'];
$anliegen = $_POST['anliegen'];

$betreff_sender = "Deine Email an Stean";
$header_sender = "From: Lars Urban <webmaster@u-php.de>\n";
$header_sender .= "Reply-To: webmaster@u-php.de\n";
$header_sender .= "Mime-Version: 1.0\n";
$header_sender .= "Content-type: text/html; charset=utf-8\n";
$header_sender .= "X-Priority: 3\n";
$header_sender .= "X-Mailer: PHP/" . phpversion() . "\n";
$header_sender .= "X-Sender-IP:".$REMOTE_ADDR."\n";
$text_sender = '<html><head><title>Stean Maine Coon - Kontakt von Website</title><meta name="viewport" content="width=device-width, initial-scale=1.0"/></head><body>
<table width="100%">
<tr>
	<td>
	<p>Hallo <b>'.$name.'</b>!</p>
	<p>Vielen Dank für die Zusendung Deiner Email!</p>
	<p>Ich werde mich Deinem Anliegen zeitnah zuwenden und mich dann umgehend bei Dir melden.</p>
	<p>Liebe Grüße</p>
	<p>Stean</p>
	<hr />
	<h2>Gesendete Daten</h2>
	<p><b>Name</b>: '.$name.'</p>
	<p><b>Email</b>: '.$email.'</p>
	<p><b>Anliegen</b>:<br>'.nl2br($anliegen).'</p>
	</td>
</tr>
</body></html>';
mail($email, $betreff_sender, $text_sender, $header_sender);

$betreff_receiver = "Kontakt von Webseite - Stean Maine Coon";
$header_receiver = "From: ".$name." <".$email.">\n";
$header_receiver .= "Reply-To: ".$email."\n" ;
$header_receiver .= "Mime-Version: 1.0\n";
$header_receiver .= "Content-type: text/html; charset=utf-8\n";
$header_receiver .= "X-Priority: 3\n";
$header_receiver .= "X-Mailer: PHP/" . phpversion() . "\n";
$header_receiver .= "X-Sender-IP:".$REMOTE_ADDR."\n";
$text_receiver = '<html><head><title>Stean Maine Coon - Kontakt von Website</title><meta name="viewport" content="width=device-width, initial-scale=1.0"/></head><body>
<table width="100%">
<tr>
	<td>
	<h2>Gesendete Daten</h2>
	<p><b>Name</b>: '.$name.'</p>
	<p><b>Email</b>: '.$email.'</p>
	<p><b>Anliegen</b>:<br>'.nl2br($anliegen).'</p>
	</td>
</tr>
</body></html>';
mail("larsman79@yahoo.de", $betreff_receiver, $text_receiver, $header_receiver);

?>