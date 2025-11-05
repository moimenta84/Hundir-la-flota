"use strict";

document.addEventListener("DOMContentLoaded", async () => {
  // Crear tablero
  const board = new Board(10, 10);

  // Crear gestor de puntuación (opcional)
  const scoreManager = new ScoreManager();

  // Crear el juego
  const game = new Game(board, scoreManager);

  // Iniciar partida
  game.startGame();

  




});

