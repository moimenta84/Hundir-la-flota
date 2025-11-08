<?php
/*Endpoint API que devuelve el listado actual de puntuaciones
 *  almacenadas en el servidor en formato JSON.
 *
 *  Funcionalidad:
 *  - Define el encabezado de respuesta como JSON.
 *  - Incluye el modelo `get_score.php` ubicado en
 *    `/app/Models/`, que se encarga de leer los datos del
 *    archivo `scores.json`.
 *  - No realiza ninguna otra lógica: actúa como capa de enlace
 *    entre el frontend y la lógica del modelo.
 *
 *  Flujo:
 *  1. El frontend realiza una petición `fetch()` a este archivo.
 *  2. Este script incluye y ejecuta el modelo `get_score.php`.
 *  3. El modelo devuelve los datos en formato JSON. */

header("Content-Type: application/json");
require_once __DIR__ . '/../../app/Models/get_score.php';
?>;
