"use strict";

/*Esperamos a que el html esté cargado antes de ejecutar el código.
*/
document.addEventListener("DOMContentLoaded", () => {
  // Creamos el tablero vacío desde el inicio
  const board = new Board(10, 10);
  const scoreManager = new ScoreManager();
  const game = new Game(board, scoreManager);

  // Renderizamos el tablero vacío (para que se vea al cargar)
  const renderer = new Renderer(board, "enemyBoard");
  renderer.render();

  // Lo bloqueamos visualmente
  document.getElementById("enemyBoard").classList.add("disabled");
  document.getElementById("enemyBoard").style.pointerEvents = "none";

  // Capturamos botones
  const btnJugar = document.getElementById("btnJugar");
  const btnAbandonar = document.getElementById("btnAbandonar");

  // Desactivamos “Abandonar” al inicio
  btnAbandonar.disabled = true;

  // Al hacer clic en “Jugar”
  btnJugar.addEventListener("click", async () => {
    btnJugar.disabled = true;
    btnAbandonar.disabled = false;
    await game.startGame();
    document.getElementById("enemyBoard").classList.remove("disabled");
    document.getElementById("enemyBoard").style.pointerEvents = "auto";
  });

  // Al hacer clic en “Abandonar”
  btnAbandonar.addEventListener("click", () => {
    btnJugar.disabled = false;
    btnAbandonar.disabled = true;
    game.resetGame();
  });

});



