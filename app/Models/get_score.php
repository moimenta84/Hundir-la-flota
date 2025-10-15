<?php
header("Content-Type: application/json");

$scoreFile = __DIR__ . "/../../storage/scores.json";

// Si no existe el archivo, devolver un array vacío
if (!file_exists($scoreFile)) {
    echo json_encode([]);
    exit;
}

// Leer el contenido del archivo
$content = file_get_contents($scoreFile);
$scores = json_decode($content, true);

// Validar que los datos sean un array
if (!is_array($scores)) {
    $scores = [];
}

// Devolvemos el contenido en formato JSON
echo json_encode($scores);
?>