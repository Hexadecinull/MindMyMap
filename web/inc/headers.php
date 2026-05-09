<?php

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $url = isset($_SERVER['HTTPS']) && !empty($_SERVER['HTTPS']) ? 'https://' : 'http://';
	$url .= $_SERVER['SERVER_NAME'];
	$url .= str_replace('inc', '', rtrim(dirname($_SERVER['PHP_SELF']), '/\\'));
	header('Location: ' . $url);
	exit();
}

require 'env.php';

$domainesAutorises = '';
if (isset($_SESSION['domainesAutorises']) && $_SESSION['domainesAutorises'] !== '') {
	$domainesAutorises = $_SESSION['domainesAutorises'];
} else if ($domainesAutorisesEnv !== '') {
	$domainesAutorises = $domainesAutorisesEnv;
	$_SESSION['domainesAutorises'] = $domainesAutorises;
}
if ($domainesAutorises === '') {
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: POST');
	header('Access-Control-Max-Age: 1000');
	header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');
} else {
	$origine = '';
	$listeDomainesAutorises = [];
	if ($domainesAutorises === '*') {
		$origine = $domainesAutorises;
	} else {
		$listeDomainesAutorises = explode(',', $domainesAutorises);
		foreach ($listeDomainesAutorises as $domaine) {
			$listeDomainesAutorises[$domaine] = 'https://' . $domaine;
		}
		if (isset($_SERVER['HTTP_ORIGIN'])) {
			$origine = $_SERVER['HTTP_ORIGIN'];
		}
	}
	if ($origine === '*' || ($origine !== '' && in_array($origine, $listeDomainesAutorises, true))) {
		header('Access-Control-Allow-Origin: ' . $origine);
		header('Access-Control-Allow-Methods: POST');
		header('Access-Control-Max-Age: 1000');
		header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');
	} else {
		exit('Requête invalide');
	}
}

?>
