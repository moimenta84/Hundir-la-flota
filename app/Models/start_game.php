<?php

// 1. Define una flota con barcos de diferentes tamaños (ej: 1 de 5 casillas, 1 de 4, 2 de 3, 1 de 2).

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
?>
