<?php

session_start();

require 'headers.php';

if (!empty($_POST['carte']) && !empty($_POST['question']) && !empty($_POST['reponse'])) {
	require 'db.php';
	$carte = $_POST['carte'];
	$question = $_POST['question'];
	$reponse = strtolower($_POST['reponse']);
	$stmt = $db->prepare('SELECT question, reponse, digidrive FROM mindmymap_cartes WHERE url = :url');
	if ($stmt->execute(array('url' => $carte))) {
		$resultat = $stmt->fetchAll();
		$questionSecrete = '';
		if (!$resultat) {
			echo 'contenu_inexistant';
		} else {
			switch ($resultat[0]['question']) {
				case 'Quel est mon mot préféré ?':
					$questionSecrete = 'motPrefere';
					break;
				case 'Quel est mon film préféré ?':
					$questionSecrete = 'filmPrefere';
					break;
				case 'Quelle est ma chanson préférée ?':
					$questionSecrete = 'chansonPreferee';
					break;
				case 'Quel est le prénom de ma mère ?':
					$questionSecrete = 'prenomMere';
					break;
				case 'Quel est le prénom de mon père ?':
					$questionSecrete = 'prenomPere';
					break;
				case 'Quel est le nom de ma rue ?':
					$questionSecrete = 'nomRue';
					break;
				case 'Quel est le nom de mon employeur ?':
					$questionSecrete = 'nomEmployeur';
					break;
				case 'Quel est le nom de mon animal de compagnie ?':
					$questionSecrete = 'nomAnimal';
					break;
				default:
					$questionSecrete = $resultat[0]['question'];
			}
			$reponseSecrete = $resultat[0]['reponse'];
			if ($question === $questionSecrete && password_verify($reponse, $reponseSecrete)) {
				$_SESSION['mindmymap'][$carte]['reponse'] = $reponseSecrete;
				$type = $_POST['type'];
				if ($type === 'api') {
					if (!isset($_SESSION['mindmymap'][$carte]['digidrive'])) {
						$_SESSION['mindmymap'][$carte]['digidrive'] = 1;
					}
					if ($resultat[0]['digidrive'] === 0) {
						$digidrive = 1;
						$stmt = $db->prepare('UPDATE mindmymap_cartes SET digidrive = :digidrive WHERE url = :url');
						$stmt->execute(array('digidrive' => $digidrive, 'url' => $carte));
					}
				}
				echo 'carte_debloquee';
			} else {
				echo 'non_autorise';
			}
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
