<?php
header("Content-Type: application/json");

// Ruta del archivo donde se guardarán las puntuaciones
$scoreFile = __DIR__ . "/../../storage/scores.json";

// Leer el cuerpo de la petición (JSON enviado desde el frontend)
$input = file_get_contents("php://input");
$data = json_decode($input, true);

// Validar que se recibieron los campos obligatorios
if(!isset($data["name"]) || !isset($data["shots"])) {
    http_response_code(400);
    echo json_encode(["error" => "Faltan parámetros: 'name' y 'shots' son obligatorios"]);
    exit;
}

// Si el archivo no existe, crear uno vacío
if(!file_Exists($scoreFile)) {
    $dir = dirname($scoreFile);
    if(!is_dir($dir)) {
        mkdir($dir, 0777, true);
    }
    file_put_contents($scoreFile, json_encode([], JSON_PRETTY_PRINT));
}

// Leer puntuaciones existente
$scores = json_decode(file_get_contents($scoreFile), true);

// Si el contenido no es un array válido, iniciarlizarlo vacío
if(!is_Array($scores)) {
    $scores = [];
}

// Añadir nueva puntuación
$scores = [
    'name' => trim($data["name"]),
    "shots" => (int)$data["shots"],
    "date" => date("d-m-Y H:i:s")
];

// Ordenar de menos a mayor número de disparos
usort($scores, fn($a, $b) => $a["shots"] <=> $b["shots"]);

// Limitar el ranking a las 10 mejores puntuaciones
$scores = array_slice($scores, 0, 10);

// Guardar el archivo actualizado
file_put_contents($scoreFile, json_encode($scores, JSON_PRETTY_PRINT));

// Devolver una respuesta al frontend
echo json_encode([
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