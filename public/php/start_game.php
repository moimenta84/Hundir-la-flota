<?php
/*Endpoint API encargado de iniciar una nueva partida del juego
 *  “Hundir la Flota”. Su función principal es delegar la generación
 *  de la flota al modelo `start_game.php`, ubicado en `/app/Models/`.
 *
 *  Funcionalidad:
 *  - Define la cabecera de respuesta como JSON.
 *  - Incluye la lógica principal que genera la flota enemiga.
 *  - Devuelve al frontend un objeto JSON con la disposición de los
 *    barcos generados aleatoriamente (nombre, tamaño y coordenadas).
 *
 *  Flujo:
 *  1. El frontend realiza una petición `fetch()` a este endpoint.
 *  2. Este archivo ejecuta el modelo `start_game.php`.
 *  3. El modelo genera una flota nueva (aleatoria, sin solapamientos).
 *  4. Devuelve al cliente un JSON con la estructura del tablero inicial.*/

header('Content-Type: application/json');

// 1 Incluir la lógica real (si está fuera del public)
require_once __DIR__ . '/../../app/Models/start_game.php';


?>



