// Board.js
class Board {
  /**
   * rows = tamaño del tablero (filas). Si sólo pasas un número, se usa same rows/columns.
   * columns = opcional, por defecto igual a rows.
   */
  constructor(rows = 10, columns = null) {
    this.rows = rows;
    this.columns = columns ?? rows;

    // Inicializar grid con valores por defecto ('*' = agua)
    this.grid = Array.from({ length: this.rows }, () =>
      Array.from({ length: this.columns }, () => "*")
    );
  }

  // Actualiza una celda validando límites
  update(row, column, value) {
    if (row < 0 || row >= this.rows || column < 0 || column >= this.columns) {
      throw new Error("Celda fuera de los límites del tablero");
    }
    this.grid[row][column] = value;
  }

  // Devuelve el contenido de una celda
  getCell(row, column) {
    if (row < 0 || row >= this.rows || column < 0 || column >= this.columns) {
      throw new Error("Celda fuera de los límites del tablero");
    }
    return this.grid[row][column];
  }

  // Imprime el tablero en consola (para depuración)
  print() {
    console.log(this.grid.map((r) => r.join(" ")).join("\n"));
  }

  /**
   * loadFromJSON(data)
   * Espera la estructura devuelta por start_game.php:
   * { "fleet": [ { "name": "...", "size": n, "positions": [ {row, col}, ... ] }, ... ] }
   */
  loadFromJSON(data) {
    if (!data || !data.fleet) {
      throw new Error("Datos JSON no válidos o sin flota");
    }

    // Limpiar tablero (poner todo en agua)
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns; c++) {
        this.grid[r][c] = "*";
      }
    }

    data.fleet.forEach((ship) => {
      if (!ship.positions) return;
      ship.positions.forEach((pos) => {
        const row = pos.row;
        const col = pos.col;
        if (row >= 0 && row < this.rows && col >= 0 && col < this.columns) {
          this.grid[row][col] = "S";
        }
      });
    });
  }

  /**
   * placeShip(startRow, startCol, length, horizontal)
   * Intenta colocar un barco; devuelve true si se colocó, false si no (por solapamiento o fuera).
   */
  placeShip(startRow, startCol, length, horizontal = true) {
    // Generar posiciones del barco
    const positions = [];
    for (let i = 0; i < length; i++) {
      const row = startRow + (horizontal ? 0 : i);
      const col = startCol + (horizontal ? i : 0);

      // Comprobar límites
      if (row < 0 || row >= this.rows || col < 0 || col >= this.columns) {
        return false; // fuera del tablero
      }
      positions.push({ row, col });
    }

    // Comprobar solapamiento
    for (const pos of positions) {
      if (this.grid[pos.row][pos.col] === "S") {
        return false; // ya hay barco
      }
    }

    // Colocar barco
    for (const pos of positions) {
      this.grid[pos.row][pos.col] = "S";
    }
    return true;
  }

  /**
   * render(container)
   * container puede ser el elemento DOM (div) o el id (string).
   * Crea una cuadrícula visual con clases:
   * - cell
   * - ship (si cell === 'S')
   */
  render(container) {
    let containerEl;
    if (typeof container === "string") {
      containerEl = document.getElementById(container);
      if (!containerEl)
        throw new Error("No existe el elemento con id " + container);
    } else {
      containerEl = container;
    }

    // Establecer variable CSS --size para grid-template
    containerEl.style.setProperty("--size", this.columns);

    // Limpiar
    containerEl.innerHTML = "";

    // Crear las celdas como divs (grid CSS)
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns; c++) {
        const val = this.grid[r][c];
        const cell = document.createElement("div");
        cell.classList.add("cell");
        // data-atributos para identificar fila/col si los necesitas luego
        cell.dataset.row = r;
        cell.dataset.col = c;

        // Si quieres mostrar texto dentro de la celda (opcional)
        // cell.textContent = val === 'S' ? '' : '';

        //Comentamos esta parte para que no se vean los barcos
        // if (val === 'S') {
        //   cell.classList.add('ship');
        // } else
        if (val === "X") {
          cell.classList.add("hit");
          cell.textContent = "✖";
        } else if (val === "O") {
          cell.classList.add("miss");
        }

        containerEl.appendChild(cell);
      }
    }
  }

  /**
   * Rellenar tableros aleatoriamente usando definiciones sencillas de barcos.
   * fleetDef = array de longitudes, por ejemplo: [5,4,3,3,2]
   */
  placeFleetRandom(fleetDef = [5, 4, 3, 3, 2]) {
    // Intentar colocar cada barco aleatoriamente
    for (const len of fleetDef) {
      let placed = false;
      let attempts = 0;
      while (!placed && attempts < 200) {
        attempts++;
        const horizontal = Math.random() < 0.5;
        const maxRow = horizontal ? this.rows - 1 : this.rows - len;
        const maxCol = horizontal ? this.columns - len : this.columns - 1;
        const r = Math.floor(Math.random() * (maxRow + 1));
        const c = Math.floor(Math.random() * (maxCol + 1));
        placed = this.placeShip(r, c, len, horizontal);
      }
      if (!placed) {
        console.warn(
          `No se pudo colocar barco de longitud ${len} tras ${attempts} intentos`
        );
      }
    }
  }
}

// Hacer accesible la clase en el scope global si no usas módulos
window.Board = Board;
