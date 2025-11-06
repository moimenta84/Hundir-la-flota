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
    this.container.style.gap = "14px";

    for (let r = 0; r < this.board.rows; r++) {
      for (let c = 0; c < this.board.columns; c++) {
        const val = this.board.grid[r][c];
        const cell = document.createElement("div");

        cell.classList.add("cell", "water");
        cell.dataset.row = r;
        cell.dataset.col = c;

        this.container.appendChild(cell);
      }
    }
  }
}

// Exportación global (para que Game.js y main.js lo usen)
window.Renderer = Renderer;
