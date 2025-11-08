/*Clase responsable de representar visualmente el tablero lógico (`Board`)
 *  dentro del DOM. Traduce la estructura interna del juego (matriz de celdas)
 *  en elementos HTML interactivos visibles para el jugador.
 *
 *  Funcionalidad:
 *  - Dibuja una cuadrícula del tamaño definido por el tablero.
 *  - Asigna clases CSS a cada celda según su estado: agua, barco, acierto o fallo.
 *  - Permite actualizar la vista tras cada acción del jugador.*/

"use strict";

/**
 * Clase Renderer
 * Se encarga de pintar visualmente el tablero en el DOM.
 */
class Renderer {
  /**
   * @param {Board} board - instancia del tablero lógico
   * @param {string} containerId - id del contenedor HTML donde se pintará el tablero
   */
  constructor(board, containerId) {
    this.board = board;
    this.container = document.getElementById(containerId);

    if (!this.container) {
      throw new Error(` No existe el contenedor con id "${containerId}"`);
    }
  }

  /**
   * Renderiza el tablero en el contenedor asignado.
   * Crea una cuadrícula visual basada en el estado del Board.
   */
  render() {
    this.container.innerHTML = ""; // Limpia el contenido anterior
    this.container.style.display = "grid";
    this.container.style.gridTemplateColumns = `repeat(${this.board.columns}, 30px)`;
    this.container.style.gridTemplateRows = `repeat(${this.board.rows}, 30px)`;
    this.container.style.gap = "4px";

    for (let r = 0; r < this.board.rows; r++) {
      for (let c = 0; c < this.board.columns; c++) {
        const val = this.board.grid[r][c];
        const cell = document.createElement("div");

        cell.classList.add("cell", "water");
        cell.dataset.row = r;
        cell.dataset.col = c;
        // IDENTIFICACIÓN DEL TIPO DE CELDA

        switch (cell) {
          case CELL.EMPTY:
            cell.classList.add("water");
            break;

          case CELL.SHIP:
            cell.classList.add("ship");
            break;

          case CELL.HIT:
            cell.classList.add("hit");
            break;

          case CELL.MISS:
            cell.classList.add("miss");
            break;
        }

        this.container.appendChild(cell);
      }
    }
  }
}

// Exportación global (para que Game.js y main.js lo usen)
window.Renderer = Renderer;
