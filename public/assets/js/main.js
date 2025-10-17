'use strict';

// Crear un tablero de 5x5
const tablero = new Board(5, 5);

// Mostrar el tablero vacío
console.log("Tablero inicial:");
tablero.print();

// Actualizar una celda
tablero.update(2, 3, 'S'); // por ejemplo, colocar un barco en (2,3)

// Mostrar el tablero después de la actualización
console.log("Tablero después de la actualización:");
tablero.print();

// Obtener el valor de una celda
const valor = tablero.getCell(2, 3);
console.log(`El valor en la celda (2,3) es: ${valor}`);
