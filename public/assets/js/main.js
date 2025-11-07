"use strict";

/*Esperamos a que el html esté cargado antes de ejecutar el código.
*/
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("enemyBoard").classList.add("disabled");

  //Creamos el tablero, el gestor de puntuaciones y el objeto principal del juego
  const board = new Board(10, 10);
  const scoreManager = new ScoreManager();
  const game = new Game(board, scoreManager);

  //Capturamos los botones
  const btnJugar = document.getElementById("btnJugar");
  const btnReiniciar = document.getElementById("btnReiniciar");

  //Botón reiniciar desactivado al principio porque no ha ninguna partida e curso todavía.
  btnReiniciar.disabled = true;

  //Hacemos clic en jugar, se activa el botón jugar, se desactiva el Reiniciar y se llama a startGame
  btnJugar.addEventListener("click", async () => {
    btnJugar.disabled = true;
    btnReiniciar.disabled = false;
    await game.startGame();
    document.getElementById("shots").textContent = 0;
    document.getElementById("hits").textContent = 0;
    document.getElementById("misses").textContent = 0;
  });

  btnReiniciar.addEventListener("click", () => {
    btnJugar.disabled = false;
    btnReiniciar.disabled = true;
    game.resetGame();

  });


});

