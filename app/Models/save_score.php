<?php
header("Content-Type: application/json");
header('Access-Control-Allow-Origin: *'); // Permite peticiones desde el front
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Ruta del archivo donde se guardarán las puntuaciones
$filePath = __DIR__ . "/../../storage/scores.json";

// Leer el cuerpo de la petición (JSON enviado desde el frontend)
$input = file_get_contents("php://input");
// COnvertir el JSON a un array asociativo
$data = json_decode($input, true);

// Validar que se recibieron los campos obligatorios
if(!isset($data["name"]) || !isset($data["shots"])) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Datos incompletos. Se requiere name y shots.'
    ]);
    exit;
}

// Si el archivo no existe, crear uno vacío
if (!file_exists($filePath)) {
    file_put_contents($filePath, json_encode([]), JSON_PRETTY_PRINT);
}
// Leer el archivo existente
$jsonData = file_get_contents($filePath);
$scores = json_decode($jsonData, true);

// Si el contenido no es un array válido o está vacío, iniciarlizarlo vacío
if($scores === null || !is_Array($scores)) {
    $scores = [];
}

// Añadir nueva puntuación
$newScore = [
    "name" => ($data['name']),
    "shots" => (int)$data['shots'],
    "date" => date("d-m-Y H:i:s")
];
$scores[] = $newScore;

// Ordenar de menos a mayor número de disparos
usort($scores, function($a, $b) {
    return $a['shots'] <=> $b['shots'];
});

// Limitar el ranking a las 10 mejores puntuaciones
$scores = array_slice($scores, 0, 10);

// Guardar el archivo actualizado
file_put_contents($filePath, json_encode($scores, JSON_PRETTY_PRINT));

// Devolver una respuesta al frontend
echo json_encode([
    'status' => 'success',
    "message" => "Puntuación guardada correctamente.",
    "ranking" => $scores
]);
?>

/*
EJEMPLO DE USO DESDE EL FRONT-END
fetch("api/save_score.php", {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({
    name: "Jugador1",
    shots: 23
  })
})
.then(res => res.json())
.then(data => console.log(data));
*/