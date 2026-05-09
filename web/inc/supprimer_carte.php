<?php

session_start();

require 'headers.php';

if (!empty($_POST['carte'])) {
	require 'db.php';
	$reponse = '';
	$carte = $_POST['carte'];
	if (isset($_SESSION['mindmymap'][$carte]['reponse'])) {
		$reponse = $_SESSION['mindmymap'][$carte]['reponse'];
	}
	$stmt = $db->prepare('SELECT reponse FROM mindmymap_cartes WHERE url = :url');
	if ($stmt->execute(array('url' => $carte))) {
		$resultat = $stmt->fetchAll();
		if (!$resultat) {
			echo 'contenu_inexistant';
		} else if ($resultat[0]['reponse'] === $reponse) {
			$stmt = $db->prepare('DELETE FROM mindmymap_cartes WHERE url = :url');
			if ($stmt->execute(array('url' => $carte))) {
				echo 'carte_supprimee';
			} else {
				echo 'erreur';
			}
		} else {
			echo 'non_autorise';
		}
	} else {
		echo 'erreur';
	}
	$db = null;
	exit();
} else {
	exit('Requête invalide');
}

?>
