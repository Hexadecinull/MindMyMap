<?php

session_start();

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
	echo 'erreur';
	exit();
}

$_POST = json_decode(file_get_contents('php://input'), true);

if (!empty($_POST['token']) && !empty($_POST['lien'])) {
	$token = $_POST['token'];
	$domaine = $_SERVER['SERVER_NAME'];
	$lien = $_POST['lien'];
	$donnees = array(
		'token' => $token,
		'domaine' => $domaine
	);
	$donnees = http_build_query($donnees);
	$ch = curl_init($lien);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $donnees);
	$resultat = curl_exec($ch);
	if ($resultat === 'non_autorise' || $resultat === 'erreur') {
		echo 'erreur_token';
	} else if ($resultat === 'token_autorise' && !empty($_POST['action'])) {
		$action = $_POST['action'];
		if ($action === 'creer' && !empty($_POST['nom']) && !empty($_POST['question']) && !empty($_POST['reponse'])) {
			require 'db.php';
			$id = uniqid('', false);
			$nom = $_POST['nom'];
			$question = $_POST['question'];
			$reponse = password_hash(strtolower($_POST['reponse']), PASSWORD_DEFAULT);
			$donnees = '';
			$date = date('Y-m-d H:i:s');
			$vues = 0;
			$digidrive = 1;
			$stmt = $db->prepare('INSERT INTO mindmymap_cartes (url, nom, question, reponse, donnees, date, vues, derniere_visite, digidrive) VALUES (:url, :nom, :question, :reponse, :donnees, :date, :vues, :derniere_visite, :digidrive)');
			if ($stmt->execute(array('url' => $id, 'nom' => $nom, 'question' => $question, 'reponse' => $reponse, 'donnees' => $donnees, 'date' => $date, 'vues' => $vues, 'derniere_visite' => $date, 'digidrive' => $digidrive))) {
				echo $id;
			} else {
				echo 'erreur';
			}
			$db = null;
		} else if ($action === 'modifier' && !empty($_POST['id']) && !empty($_POST['titre']) && !empty($_POST['question']) && !empty($_POST['reponse']) && !empty($_POST['anciennereponse'])) {
			require 'db.php';
			$id = $_POST['id'];
			$nom = $_POST['titre'];
			$question = $_POST['question'];
			$reponse = password_hash(strtolower($_POST['reponse']), PASSWORD_DEFAULT);
			$anciennereponse = strtolower($_POST['anciennereponse']);
			$stmt = $db->prepare('SELECT reponse FROM mindmymap_cartes WHERE url = :url');
			if ($stmt->execute(array('url' => $id))) {
				$resultat = $stmt->fetchAll();
				if (!$resultat) {
					echo 'contenu_inexistant';
				} else if (password_verify($anciennereponse, $resultat[0]['reponse'])) {
					$stmt = $db->prepare('UPDATE mindmymap_cartes SET nom = :nom, question = :question, reponse = :reponse WHERE url = :id');
					if ($stmt->execute(array('nom' => $nom, 'question' => $question, 'reponse' => $reponse, 'id' => $id))) {
						echo 'informations_modifiees';
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
		} else if ($action === 'ajouter' && !empty($_POST['id']) && !empty($_POST['question']) && !empty($_POST['reponse'])) {
			require 'db.php';
			$id = $_POST['id'];
			$question = $_POST['question'];
			$reponse = strtolower($_POST['reponse']);
			$stmt = $db->prepare('SELECT nom, question, reponse FROM mindmymap_cartes WHERE url = :url');
			if ($stmt->execute(array('url' => $id))) {
				$resultat = $stmt->fetchAll();
				if (!$resultat) {
					echo 'contenu_inexistant';
				} else if (($question === $resultat[0]['question'] || $question === definirQuestion($resultat[0]['question'])) && password_verify($reponse, $resultat[0]['reponse'])) {
					$digidrive = 1;
					$stmt = $db->prepare('UPDATE mindmymap_cartes SET digidrive = :digidrive WHERE url = :url');
					$stmt->execute(array('digidrive' => $digidrive, 'url' => $id));
					echo $resultat[0]['nom'];
				} else {
					echo 'non_autorise';
				}
			} else {
				echo 'erreur';
			}
			$db = null;
		} else if ($action === 'dupliquer' && !empty($_POST['id']) && !empty($_POST['titre']) && !empty($_POST['reponse']) && !empty($_POST['nouvellequestion']) && !empty($_POST['nouvellereponse'])) {
			require 'db.php';
			$id = $_POST['id'];
			$reponse = strtolower($_POST['reponse']);
			$stmt = $db->prepare('SELECT reponse, donnees FROM mindmymap_cartes WHERE url = :url');
			if ($stmt->execute(array('url' => $id))) {
				$resultat = $stmt->fetchAll();
				if (!$resultat) {
					echo 'contenu_inexistant';
				} else if (password_verify($reponse, $resultat[0]['reponse'])) {
					$nid = uniqid('', false);
					$nom = $_POST['titre'];
					$nquestion = $_POST['nouvellequestion'];
					$nreponse = password_hash(strtolower($_POST['nouvellereponse']), PASSWORD_DEFAULT);
					$donnees = $resultat[0]['donnees'];
					$date = date('Y-m-d H:i:s');
					$vues = 0;
					$digidrive = 1;
					$stmt = $db->prepare('INSERT INTO mindmymap_cartes (url, nom, question, reponse, donnees, date, vues, derniere_visite, digidrive) VALUES (:url, :nom, :question, :reponse, :donnees, :date, :vues, :derniere_visite, :digidrive)');
					if ($stmt->execute(array('url' => $nid, 'nom' => $nom, 'question' => $nquestion, 'reponse' => $nreponse, 'donnees' => $donnees, 'date' => $date, 'vues' => $vues, 'derniere_visite' => $date, 'digidrive' => $digidrive))) {
						echo $nid;
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
		} else if ($action === 'exporter' && !empty($_POST['id']) && !empty($_POST['reponse'])) {
			require 'db.php';
			$id = $_POST['id'];
			$reponse = strtolower($_POST['reponse']);
			$stmt = $db->prepare('SELECT reponse, donnees FROM mindmymap_cartes WHERE url = :url');
			if ($stmt->execute(array('url' => $id))) {
				$resultat = $stmt->fetchAll();
				if (password_verify($reponse, $resultat[0]['reponse'])) {
					echo $resultat[0]['donnees'];
				} else {
					echo 'non_autorise';
				}
			} else {
				echo 'erreur';
			}
			$db = null;
		} else if ($action === 'importer' && !empty($_POST['titre']) && !empty($_POST['question']) && !empty($_POST['reponse']) && !empty($_POST['donnees'])) {
			require 'db.php';
			$id = uniqid('', false);
			$nom = $_POST['titre'];
			$question = $_POST['question'];
			$reponse = password_hash(strtolower($_POST['reponse']), PASSWORD_DEFAULT);
			$donnees = json_encode($_POST['donnees']);
			$date = date('Y-m-d H:i:s');
			$vues = 0;
			$digidrive = 1;
			$stmt = $db->prepare('INSERT INTO mindmymap_cartes (url, nom, question, reponse, donnees, date, vues, derniere_visite, digidrive) VALUES (:url, :nom, :question, :reponse, :donnees, :date, :vues, :derniere_visite, :digidrive)');
			if ($stmt->execute(array('url' => $id, 'nom' => $nom, 'question' => $question, 'reponse' => $reponse, 'donnees' => $donnees, 'date' => $date, 'vues' => $vues, 'derniere_visite' => $date, 'digidrive' => $digidrive))) {
				echo $id;
			} else {
				echo 'erreur';
			}
			$db = null;
		} else if ($action === 'supprimer' && !empty($_POST['id']) && !empty($_POST['reponse'])) {
			require 'db.php';
			$id = $_POST['id'];
			$reponse = strtolower($_POST['reponse']);
			$stmt = $db->prepare('SELECT reponse FROM mindmymap_cartes WHERE url = :url');
			if ($stmt->execute(array('url' => $id))) {
				$resultat = $stmt->fetchAll();
				if (!$resultat) {
					echo 'contenu_supprime';
				} else if (password_verify($reponse, $resultat[0]['reponse'])) {
					$stmt = $db->prepare('DELETE FROM mindmymap_cartes WHERE url = :url');
					if ($stmt->execute(array('url' => $id))) {
						echo 'contenu_supprime';
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
		} else {
			echo 'erreur';
		}
	} else {
		echo 'erreur';
	}
	unset($ch);
	exit();
} else {
	echo 'erreur';
	exit();
}

function definirQuestion ($q) {
	$questionSecrete = '';
	switch ($q) {
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
			$questionSecrete = $q;
	}
	return $questionSecrete;
}

?>
