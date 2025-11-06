<?php

header("Content-Type: application/json");
header('Access-Control-Allow-Origin: *'); // Permite peticiones desde el front
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
require_once __DIR__ . '/../../app/Models/save_score.php';
