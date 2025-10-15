<?php
header("Content-Type: application/json");

$filePath = __DIR__ . "/../../storage/scores.json";

// Si no existe el archivo, devolver un array vacío en formato JSON
if (!file_exists($filePath)) {
    echo json_encode([]);
    exit;
}

// Leer el contenido del archivo
$content = file_get_contents($filePath);

// Decodificamos a un array PHP
$scores = json_decode($content, true);

// Validar que los datos sean un array
if ($scores === null || !is_array($scores)) {
    echo json_encode([]);
    $scores = [];
}

// Devolvemos el contenido en formato JSON
echo json_encode($scores, JSON_PRETTY_PRINT);
?>