'use strict';

// Esperamos a que el DOM esté listo (por si luego renderizas el tablero visualmente)
document.addEventListener("DOMContentLoaded", () => {
  // Llamada al backend para generar la flota
  fetch("backend/start_game.php")
    .then(response => {
      if (!response.ok) throw new Error("Error en la respuesta del servidor");
      return response.json();
    })
    .then(data => {
      // Crear el tablero (por defecto 10x10, igual que en PHP)
      const board = new Board(10, 10);

      // Cargar los barcos en el tablero desde el JSON recibido
      board.loadFromJSON(data);

      console.log("✅ Tablero generado desde el servidor:");
      board.print(); // Verás los 'S' de los barcos en consola

      // Ejemplo opcional: obtener el valor de una celda concreta
      console.log(`Valor en (0,0): ${board.getCell(0, 0)}`);
    })
    .catch(error => {
      console.error("❌ Error al cargar el tablero:", error);
    });
});
