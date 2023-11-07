<?php

header("Content-Type: text/html; charset=utf-8");

$elements_post = array('name', 'email');
$message = $_GET['message'];
foreach($elements_post as $post){ if(isset($_GET[$post])){ $$post = $_GET[$post]; }else{ $$post = ""; } }

echo $email." <br /> ".$name." <br /> ".$message." <br />";

$betreff_sender = "Deine Email an - Lars Urban";
$header_sender = "From: Lars Urban <webmaster@u-php.de>\n";
$header_sender .= "Reply-To: webmaster@u-php.de\n";
$header_sender .= "Mime-Version: 1.0\n";
$header_sender .= "Content-type: text/html; charset=utf-8\n";
$header_sender .= "X-Priority: 3\n";
$header_sender .= "X-MSMail-Priority: High\n";
$header_sender .= "X-Mailer: PHP/" . phpversion() . "\n";
$header_sender .= "X-Sender-IP:".$REMOTE_ADDR."\n";
$text_sender = '<html><head><title>u-php - Kontakt von Website</title><meta name="viewport" content="width=device-width, initial-scale=1.0"/></head><body>
<table width="100%">
<tr>
    <td><img style="max-width:100%;object-fit:contain;" src="https://www.u-php.de/images/layout/top.png"></td>
</tr>
<tr>
    <td>
    <p>Hallo <b>'.$name.'</b>!</p>
    <p>Vielen Dank für die Zusendung Deiner Email. Hiermit bestätige ich den Erhalt Deiner Email.</p>
    <p>Ich werde mich Ihrem Anliegen zeitnah zuwenden und mich dann umgehend bei Ihnen melden.</p>
    <p><b>Lars Urban</b></p>
    <p>______________________________</p>
    <h2>Gesendete Daten</h2>
    <p><b>Name</b>: '.$name.'</p>
    <p><b>Email</b>: '.$email.'</p>
    <p><b>Anliegen</b>:<br>'.nl2br($message).'</p>
    </td>
</tr>
<tr>
    <td><img style="max-width:100%;object-fit:contain;" src="https://www.u-php.de/images/layout/foot.png"></td>
</tr>
</body></html>';

// Email an hinterlegte Kontakt-Email (zu finden unter "Allgemeine Einstellungen")
$betreff_receiver = "Kontakt von Webseite - u-php.de";
$header_receiver = "From: ".$name." <".$email.">\n";
$header_receiver .= "Reply-To: ".$email."\n" ;
$header_receiver .= "Mime-Version: 1.0\n";
$header_receiver .= "Content-type: text/html; charset=utf-8\n";
$header_receiver .= "X-Priority: 3\n";
$header_receiver .= "X-MSMail-Priority: High\n";
$header_receiver .= "X-Mailer: PHP/" . phpversion() . "\n";
$header_receiver .= "X-Sender-IP:".$REMOTE_ADDR."\n";
$text_receiver = '<html><head><title>u-php - Kontakt von Website</title><meta name="viewport" content="width=device-width, initial-scale=1.0"/></head><body>
<table width="100%">
<tr>
    <td>
    <h2>Gesendete Daten</h2>
    <p><b>Name</b>: '.$name.'</p>
    <p><b>Email</b>: '.$email.'</p>
    <p><b>Anliegen</b>:<br>'.nl2br($message).'</p>
    </td>
</tr>
</body></html>';

if( mail('larsman79@yahoo.de', $betreff_receiver, $text_receiver, $header_receiver) && mail($email, $betreff_sender, $text_sender, $header_sender) ) {
    header('Location: ../index.html?email=success#section5');
}else {
    echo "ERROR!!!";
}



?>