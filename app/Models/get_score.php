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

// Convertimos a un array asociativo php
$scores = json_decode($content, true); // true asegura que sea un array y no un obj

// Validar que los datos sean un array
if ($scores === null || !is_array($scores)) {
    echo json_encode([]);
    $scores = [];
}

// Devolvemos el contenido en formato JSON
echo json_encode($scores, JSON_PRETTY_PRINT);

/*
EJEMPLO DE SALIDA
[
  {
    "name": "Player1",
    "shots": 15,
    "date": "01-11-2025 10:35:21"
  },
  {
    "name": "Player2",
    "shots": 20,
    "date": "01-11-2025 10:40:02"
  }
]
*/
?>