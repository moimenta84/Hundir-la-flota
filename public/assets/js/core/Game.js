"use strict";
/*
Pintar tablero, dónde están los barcos, dónde se ha disparado ya -  Board.js

    Debería construirse esto en Board??
    const CELL = { EMPTY:'*', SHIP:'S' };
    const SHOT = { NONE:null, MISS:'O', HIT:'X' };

Guardar puntuación - ScoreManager.js
*/

const CELL = { EMPTY: "*", SHIP: "S", HIT: "X", MISS: "O" };

class Game {
  /*Constructor del juego, con atributos iniciados para que 'nazcan' con estado inicial.
    Los gameState serán: 'idle' (inactivo), 'playing', 'finished'.
    El board se le pasa al constructor desde el main después de instanciarlo.
    */
  constructor(board, scoreManager = null) {
    this.board = board;
    this.scoreManager = scoreManager;
    this.gameState = "idle";
    this.shots = 0;
    this.renderer = null;
  }

  async startGame() {
    if (this.gameState === "playing") return; //para evitar que se reinicie una partida en curso.
    this.gameState = "playing";
    this.shots = 0;

    try {
      console.log("Solicitando flota al servidor...");
      const response = await fetch("php/start_game.php");

      const data = await response.json();

      // 🔹 Cargar datos
      this.board.loadFromJSON(data);

      // 🔹 Crear Renderer solo una vez
      if (!this.renderer) {
        this.renderer = new Renderer(this.board, "enemyBoard");
      }

      // 🔹 Renderizar visualmente
      this.renderer.render();

      console.log("Flota cargada y tablero listo para jugar.");

      this.attachCellEvents(); // activar clics
    } catch (error) {
      console.error("Error al iniciar el juego:", error);
    }
  }

  /**
   * attachCellEvents()
   * Recorre las celdas del tablero enemigo y asigna un evento de clic.
   * Cada clic representa un disparo a esa celda.
   */
  attachCellEvents() {
    const container = document.getElementById("enemyBoard");
    const cells = container.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        this.shoot(row, col);
      });
    });
  }

  /*
    shoot(row, col)
    Lógica de un disparo: comprobar si ya se disparó, si hay barco o no,
    actualizar la celda y volver a renderizar.
    */

  shoot(row, column) {
    if (this.gameState !== "playing") return;

    //Comprobamos si ya se había disparado a esa celda.
    const cell = this.board.getCell(row, column);
    if (cell === CELL.HIT || cell === CELL.MISS) {
      console.log("Ya disparaste aquí.");
      return;
    }

    //Comprobamos que hay en la celda, si es agua o ship.
    if (cell === CELL.SHIP) {
      // S de Ship.
      this.board.update(row, column, CELL.HIT); // tocado
      console.log("Tocado!");
    } else {
      //recibe un * que sería agua.
      this.board.update(row, column, CELL.MISS); // agua
      console.log("Agua...");
    }

    this.shots++;
    this.board.print();
    this.checkVictory(); //¿Victoria?
  }

  checkVictory() {
    //Comprobamos si queda alguna S (celda de barco sin tocar) en el board.
    const quedanBarcos = this.board.grid.some((row) =>
      row.some((cell) => cell === CELL.SHIP)
    );

    if (!quedanBarcos) {
      this.gameState = "finished";
      //CALCULAMOS PUNTI AL FINALIZAR PARTIDA//
      const score = this.calculateScore();
      console.log(`¡Victoria! Disparos totales: ${this.shots}`);
      console.log(` Puntuación obtenida: ${score} puntos`);

      //Guarda y muestra ranking (ScoreManager)
      if (this.scoreManager) {
        const player = prompt("Introduce tu nombre para el ranking:");
        this.scoreManager.saveScore(player, score);
        this.scoreManager.renderRanking();
      }
    }
  }

  /*Calcula una puntuación simple según los disparos.
     Menos disparos = más puntos.*/
  calculateScore() {
    const baseScore = 100;
    const penalty = this.shots * 5;
    return Math.max(0, baseScore - penalty);
  }

  resetGame() {
    console.log("♻️ Reiniciando partida...");

    // Volver a crear un tablero vacío del mismo tamaño
    this.board = new Board(this.board.rows, this.board.columns);

    // Resetear contadores y estado
    this.shots = 0;
    this.gameState = "idle";

    // Volver a renderizar el tablero vacío (sin barcos todavía)
    this.board.render("enemyBoard");

    // Volver a iniciar el juego automáticamente
    this.startGame();
  }
}

//Para poder usarlo globalmente
window.Game = Game;
