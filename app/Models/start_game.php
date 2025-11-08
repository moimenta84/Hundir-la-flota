<?php
/* *  Este script genera de forma aleatoria una flota de barcos
 *  para el juego "Hundir la Flota" sobre un tablero de 10x10.
 *
 *  Funcionalidad:
 *  - Define los tipos de barcos con sus tamaños (portaaviones, acorazado, etc.).
 *  - Crea un tablero de 10x10 posiciones.
 *  - Coloca cada barco en una posición aleatoria (horizontal o vertical).
 *  - Garantiza que ningún barco se salga del tablero ni se solape con otro.
 *  - Devuelve la flota completa (nombre, tamaño y coordenadas de cada barco)
 *    en formato JSON para que el frontend pueda renderizarla. */

// 1. Define los tipos y tamaños de barcos (ej: 1 de 5 casillas, 1 de 4, 2 de 3, 1 de 2).
$fleetDefinition = [
    ["name" => "Portaaviones", "size" => 5],
    ["name" => "Acorazado",    "size" => 4],
    ["name" => "Crucero 1",    "size" => 3],
    ["name" => "Crucero 2",    "size" => 3],
    ["name" => "Destructor",   "size" => 2]
];

// Tablero 10x10
$gridSize = 10;

// Aquí guardaremos la flota generada con sus coordenadas
$fleet = [];

// Para evitar solapamientos, guardamos todas las posiciones ocupadas
$occupiedPositions = [];



// 2. Implementa un algoritmo que coloque cada barco en el tablero (10x10) de forma aleatoria

foreach ($fleetDefinition as $shipDefinition) {

    $shipSize = $shipDefinition['size'];
    $placed = false; // Para saber si el barco se ha colocado correctamente

    while (!$placed) {

        // 3. El algoritmo debe decidir aleatoriamente la orientación (horizontal o vertical) de cada barco.

        $isHorizontal = rand(0, 1) === 1;

        // Posición inicial aleatoria y válida según la orientación y tamaño del barco
        if ($isHorizontal) {
            // Si es horizontal, puede empezar en cualquier fila,
            // pero la columna inicial debe dejar espacio suficiente hacia la derecha
            $startRow = rand(0, $gridSize - 1);
            $startCol = rand(0, $gridSize - $shipSize);
        } else {
            // Si es vertical, puede empezar en cualquier columna,
            // pero la fila inicial debe dejar espacio hacia abajo
            $startRow = rand(0, $gridSize - $shipSize);
            $startCol = rand(0, $gridSize - 1);
        }

        // Calculamos las coordenadas del barco
        $positions = [];

        for ($i = 0; $i < $shipDefinition['size']; $i++) {
            $row = $startRow + ($isHorizontal ? 0 : $i);
            $col = $startCol + ($isHorizontal ? $i : 0);

            $positions[] = ["row" => $row, "col" => $col];
        }


        // 4. CRÍTICO: Debes validar que los barcos no se salgan del tablero (HECHO YA EN LA CREACIÓN DE LOS BARCOS) y que no se solapen entre sí.

        if (isValidPosition($positions, $gridSize, $occupiedPositions)) {
            // Añadimos las coordenadas a la lista de ocupadas
            foreach ($positions as $position) {
                $occupiedPositions[] = "{$position['row']},{$position['col']}";
            }

            // Añadimos el barco completo a la flota
            $fleet[] = [
                "name" => $shipDefinition["name"],
                "size" => $shipDefinition["size"],
                "positions" => $positions
            ];

            $placed = true;
        }
    }
}


// 5. El script debe devolver un objeto JSON con la estructura de la flota, incluyendo el nombre, tamaño y
// un array con las coordenadas (row, col) de cada una de sus casillas.

header('Content-Type: application/json');
echo json_encode(["fleet" => $fleet], JSON_PRETTY_PRINT);


// Funcion para Validar posiciones

function isValidPosition($positions, $gridSize, $occupiedPositions) {
    foreach ($positions as $position) {
        // Ya ocupada por otro barco
        if (in_array("{$position['row']},{$position['col']}", $occupiedPositions)) {
            return false;
        }
    }
    return true;
}

/*
EJEMPLO DE SALIDA
{
"fleet": [
    {
    "name": "Portaaviones",
    "size": 5,
    "positions": [
        {"row": 0, "col": 1},
        {"row": 0, "col": 2},
        {"row": 0, "col": 3},
        {"row": 0, "col": 4},
        {"row": 0, "col": 5}
    ]
    },
    {
    "name": "Acorazado",
    "size": 4,
    "positions": [
        {"row": 5, "col": 2},
        {"row": 6, "col": 2},
        {"row": 7, "col": 2},
        {"row": 8, "col": 2}
    ]
    }
]
}
*/
?>
