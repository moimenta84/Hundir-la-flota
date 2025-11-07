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
    this.hits = 0;
    this.misses = 0;
    this.renderer = null;
  }

  async startGame() {
    if (this.gameState === "playing") return; //para evitar que se reinicie una partida en curso.
    this.gameState = "playing";
    this.shots = 0;
    this.hits = 0;
    this.misses = 0;

    try {
      console.log("Solicitando flota al servidor...");
      const response = await fetch("php/start_game.php");

      const data = await response.json();

      //  Cargar datos
      this.board.loadFromJSON(data);

      //  Crear Renderer solo una vez
      // Crear Renderer siempre (no solo la primera vez)
      this.renderer = new Renderer(this.board, "enemyBoard");
      this.renderer.render();
      document.getElementById("enemyBoard").classList.remove("disabled");

      console.log("Flota cargada y tablero listo para jugar.");

      // Activar clicks en el tablero
      this.attachCellEvents();
      document.getElementById("enemyBoard").style.pointerEvents = "auto";

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

    //Comprobamos si ya se había disparado en esa celda
    const cell = this.board.getCell(row, column);
    if (cell === CELL.HIT || cell === CELL.MISS) {
      return; //No contamos el disparo
    }

    // Obtener la celda del DOM
    const container = document.getElementById("enemyBoard");
    const selector = `[data-row="${row}"][data-col="${column}"]`;
    const cellElement = container.querySelector(selector);

    //si la celda es válida y no se ha disparado sumamos disparo
    this.shots++;
    document.getElementById("shots").textContent = this.shots;

    if (cell === CELL.SHIP) {
      //Tocado
      this.board.update(row, column, CELL.HIT);
      cellElement.classList.remove("water");
      cellElement.classList.add("hit");
      this.hits++;
      document.getElementById("hits").textContent = this.hits;
      if (this.effects) this.effects.play("hit");
    } else {
      //Agua
      this.board.update(row, column, CELL.MISS);
      cellElement.classList.remove("water");
      cellElement.classList.add("miss");
      this.misses++;
      document.getElementById("misses").textContent = this.misses;
      if (this.effects) this.effects.play("miss");
    }
    this.checkVictory();
  }

  checkVictory() {
    // Comprobamos si queda alguna 'S'en el tablero
    const quedanBarcos = this.board.grid.some((row) =>
      row.some((cell) => cell === CELL.SHIP)
    );

    if (!quedanBarcos) {
      this.gameState = "finished";

      //calcular puntuación final
      const score = this.calculateScore();

      //Mostrar mensaje resumen
      alert(`🎉 ¡Victoria!\nDisparos totales: ${this.shots}\nPuntuación: ${score}`);

      //Guardar y mostrar ranking (ScoreManager)
      if (this.scoreManager) {
        const player = prompt("Introduce tu nombre para el ranking:");
        this.scoreManager.saveScore(player, score, this.shots);
        this.scoreManager.renderRanking();
      }
      this.resetGame();
      document.getElementById("btnJugar").disabled = false;
      document.getElementById("btnAbandonar").disabled = true;
    }

  }

  /*Calcula una puntuación simple según los disparos.
     Menos disparos = más puntos.*/
  calculateScore() {
    const maxShots = this.board.rows * this.board.columns; // 100 en un tablero 10x10
    const score = Math.max(0, maxShots - this.shots);
    return score;
  }

  resetGame() {
    // Poner estado en idle para permitir nuevo arranque
    this.gameState = "idle";

    // Crear tablero nuevo vacío
    this.board = new Board(this.board.rows, this.board.columns);
    this.shots = 0;
    this.hits = 0;
    this.misses = 0;
    //Desactivar clics != jugando.
    document.getElementById("enemyBoard").style.pointerEvents = "none";

    // Limpiar tablero visual
    const container = document.getElementById("enemyBoard");
    container.innerHTML = "";

    // Crear renderer nuevo y pintarlo vacío
    this.renderer = new Renderer(this.board, "enemyBoard");
    this.renderer.render();
    document.getElementById("enemyBoard").classList.add("disabled");

    // Reset contadores visuales
    document.getElementById("shots").textContent = "0";
    document.getElementById("hits").textContent = "0";
    document.getElementById("misses").textContent = "0";

  }

}

//Para poder usarlo globalmente
window.Game = Game;
