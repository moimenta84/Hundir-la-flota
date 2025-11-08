/*Punto de entrada principal del juego “Hundir la Flota”.
 *  Este script inicializa las clases centrales del juego (Board,
 *  Game, Renderer y ScoreManager), gestiona los eventos de la interfaz
 *  (botones y tablero), y coordina el flujo general de una partida.
 *
 *  Funcionalidad:
 *  - Renderiza el tablero vacío al cargar la página.
 *  - Controla los botones de "Jugar", "Abandonar" y "Borrar Ranking".
 *  - Gestiona el inicio y reinicio de partidas.
 *  - Coordina los efectos visuales y sonoros mediante `EffectsManager`.
 *  - Muestra y limpia el ranking de puntuaciones guardado en localStorage. */

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


