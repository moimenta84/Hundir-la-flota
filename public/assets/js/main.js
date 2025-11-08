"use strict";

document.addEventListener("DOMContentLoaded", async () => {
  // Crear tablero
  const board = new Board(10, 10);

  // Crear gestor de puntuación (opcional) - carga desde localStorage
  const scoreManager = new ScoreManager();

  // Renderiza el ranking guardado al entrar
  scoreManager.renderRanking();

  // Crear el juego
  const game = new Game(board, scoreManager);

  // Integración de botón para limpiar el historial
  document.getElementById("clearRanking").addEventListener("click", () => {
    if (confirm("¿Seguro que quieres borrar el ranking?")) {
        scoreManager.clearScores();
    }
  });

  // Iniciar partida
  game.startGame();
});

