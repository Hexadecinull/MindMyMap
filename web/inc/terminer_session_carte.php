<?php

session_start();

require 'headers.php';

if (!empty($_POST['carte'])) {
	$carte = $_POST['carte'];
	unset($_SESSION['mindmymap'][$carte]['reponse']);
	echo 'session_terminee';
	exit();
} else {
	exit('Requête invalide');
}

?>
