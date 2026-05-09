<?php

session_start();

require 'headers.php';

$_POST = json_decode(file_get_contents('php://input'), true);

if (!empty($_POST['carte']) && !empty($_POST['donnees'])) {
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
			$donnees = $_POST['donnees'];
			$stmt = $db->prepare('UPDATE mindmymap_cartes SET donnees = :donnees WHERE url = :url');
			if ($stmt->execute(array('donnees' => json_encode($donnees), 'url' => $carte))) {
				echo 'carte_modifiee';
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
