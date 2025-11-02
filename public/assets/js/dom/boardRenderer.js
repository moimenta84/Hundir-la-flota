// BoardRenderer.js
function boardRenderer(board, containerId) {
  const container = document.getElementById(containerId);
  if (!container) throw new Error("No existe el contenedor " + containerId);

  container.innerHTML = "";
  container.style.display = "grid";
  container.style.gridTemplateColumns = `repeat(${board.columns}, 30px)`;
  container.style.gridTemplateRows = `repeat(${board.rows}, 30px)`;
  container.style.gap = "2px";

  for (let r = 0; r < board.rows; r++) {
    for (let c = 0; c < board.columns; c++) {
      const val = board.grid[r][c];
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = r;
      cell.dataset.col = c;

      //Esto es para mostar los barcos. Comentar para que no se vea.
      if (val === "S") {
        cell.classList.add("ship");
      }

      // No mostramos los barcos ('S')
      if (val === "X") {
        cell.classList.add("hit");
        cell.textContent = "✖";
      } else if (val === "O") {
        cell.classList.add("miss");
        cell.textContent = "•";
      } else {
        cell.classList.add("water");
      }

      container.appendChild(cell);
    }
  }
}
