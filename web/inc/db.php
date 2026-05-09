<?php

if (!file_exists(dirname(__FILE__) . '/mindmymap.db')) {
    $db = new PDO('sqlite:'. dirname(__FILE__) . '/mindmymap.db');
    $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $table = "CREATE TABLE mindmymap_cartes (
        id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
        url TEXT NOT NULL,
        nom	TEXT NOT NULL,
        question TEXT NOT NULL,
        reponse TEXT NOT NULL,
        donnees	TEXT NOT NULL,
        date TEXT NOT NULL,
        vues INTEGER NOT NULL,
        derniere_visite TEXT NOT NULL,
        digidrive INTEGER NOT NULL
    )";
    $db->exec($table);
} else {
    $db = new PDO('sqlite:'. dirname(__FILE__) . '/mindmymap.db');
    $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $db->prepare('PRAGMA table_info(mindmymap_cartes)');
	if ($stmt->execute()) {
        $tables = $stmt->fetchAll();
        if (count($tables) < 9) {
            $colonne = "ALTER TABLE mindmymap_cartes ADD vues INTEGER NOT NULL DEFAULT 0";
            $db->exec($colonne);
            $colonne = "ALTER TABLE mindmymap_cartes ADD derniere_visite TEXT NOT NULL DEFAULT ''";
            $db->exec($colonne);
        } else if (count($tables) === 9) {
            $colonne = "ALTER TABLE mindmymap_cartes ADD digidrive INTEGER NOT NULL DEFAULT 0";
            $db->exec($colonne);
        }
    }
}

?>
