<?php
/*  Endpoint API que recibe las puntuaciones enviadas desde el
 *  frontend y las guarda en el servidor mediante el modelo
 *  `save_score.php`.
 *
 *  Funcionalidad:
 *  - Define cabeceras para comunicación en formato JSON y CORS.
 *  - Acepta únicamente peticiones HTTP de tipo `POST`.
 *  - Recibe un cuerpo JSON con los datos del jugador y su puntuación.
 *  - Incluye el modelo `save_score.php` (ubicado en /app/Models/)
 *    que gestiona la validación, ordenación y almacenamiento
 *    de los datos en el archivo `scores.json`.
 *
 *  Flujo:
 *  1. El frontend realiza una petición POST a este endpoint con
 *     un cuerpo JSON: `{ "name": "Jugador", "shots": 20 }`.
 *  2. Este archivo reenvía la petición al modelo `save_score.php`.
 *  3. El modelo actualiza el archivo `scores.json` y devuelve
 *     la respuesta con el estado de la operación.*/

header("Content-Type: application/json");
header('Access-Control-Allow-Origin: *'); // Permite peticiones desde el front
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
require_once __DIR__ . '/../../app/Models/save_score.php';
