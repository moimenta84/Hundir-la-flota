<?php

/*Este script recibe los datos de una nueva puntuación desde el frontend
 *  (nombre del jugador y número de disparos) y los guarda en el archivo
 *  `scores.json` dentro del directorio `/storage`.
 *
 *  Funcionalidad:
 *  - Configura las cabeceras HTTP necesarias para recibir peticiones JSON (CORS).
 *  - Valida que la petición incluya los campos obligatorios: `name` y `shots`.
 *  - Si no existe el archivo `scores.json`, lo crea vacío.
 *  - Carga el contenido actual del ranking y agrega la nueva puntuación.
 *  - Ordena las puntuaciones de menor a mayor número de disparos.
 *  - Limita el ranking a las 10 mejores puntuaciones.
 *  - Guarda los datos actualizados en formato JSON legible.
 *  - Devuelve una respuesta JSON con el estado de la operación y el ranking actualizado.*/

header("Content-Type: application/json");
header('Access-Control-Allow-Origin: *'); // Permite peticiones desde el front
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Ruta del archivo donde se guardarán las puntuaciones
$filePath = __DIR__ . "/../../storage/scores.json";

// Leer el cuerpo de la petición (JSON enviado desde el frontend)
$input = file_get_contents("php://input");
// Convertir el JSON a un array asociativo
$data = json_decode($input, true);

// Validar que se recibieron los campos obligatorios
if(!isset($data["name"]) || !isset($data["shots"])) {
    http_response_code(400);        // Responde con HTTP 400 (Bad Request)
    echo json_encode([
        'status' => 'error',
        'message' => 'Datos incompletos. Se requiere name y shots.'
    ]);
    exit;
}

// Si el archivo no existe (scores.json), crea uno vacío
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
?>
