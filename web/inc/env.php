<?php

$envPath = dirname(__FILE__) . '/../.env';
$domainesAutorisesEnv = '';

if (file_exists($envPath) && is_readable($envPath)) {
    foreach (explode("\n", file_get_contents($envPath)) as $ligne) {
        $ligne = trim($ligne);
        if ($ligne === '' || $ligne[0] === '#') continue;
        if (preg_match('/^([^=]+)=(.*)$/', $ligne, $m)) {
            putenv(trim($m[1]) . '=' . trim($m[2]));
        }
    }
    $val = getenv('AUTHORIZED_DOMAINS');
    if ($val !== false && $val !== '') {
        $domainesAutorisesEnv = $val;
    }
}

?>
