"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // === Instancias principales ===
  const board = new Board(10, 10);
  const scoreManager = new ScoreManager();
  const game = new Game(board, scoreManager);
  const renderer = new Renderer(board, "enemyBoard");

  // Renderizamos el tablero vacío al cargar
  renderer.render();

  // Bloqueamos el tablero visualmente al inicio
  const enemyBoard = document.getElementById("enemyBoard");
  enemyBoard.classList.add("disabled");
  enemyBoard.style.pointerEvents = "none";

  // === Captura de botones ===
  const btnJugar = document.getElementById("btnJugar");
  const btnAbandonar = document.getElementById("btnAbandonar");
  const btnClearRanking = document.getElementById("clearRanking");

  // Estado inicial de botones
  btnAbandonar.disabled = true;

  // === Evento: JUGAR ===
  btnJugar.addEventListener("click", async () => {
    btnJugar.disabled = true;
    btnAbandonar.disabled = false;

    await game.startGame();

    enemyBoard.classList.remove("disabled");
    enemyBoard.style.pointerEvents = "auto";
  });

  // === Evento: ABANDONAR PARTIDA ===
  btnAbandonar.addEventListener("click", () => {
    const confirmar = confirm("¿Seguro que quieres abandonar la partida?");
    if (!confirmar) return;

    if (game.effects) game.effects.play("impact");

    btnJugar.disabled = false;
    btnAbandonar.disabled = true;
    game.resetGame();
  });

  // === Renderizar ranking al cargar ===
  scoreManager.renderRanking();

  // === Evento: BORRAR RANKING ===
  btnClearRanking.addEventListener("click", () => {
    if (confirm("¿Seguro que quieres borrar el ranking?")) {
      scoreManager.clearScores();
    }

  });

});


