/*Esta clase representa el tablero de juego de "Hundir la Flota".
 *  Se encarga de crear, gestionar y actualizar la cuadrícula interna
 *  donde se almacenan las posiciones de los barcos y los disparos.
 *
 *  Funcionalidad:
 *  - Inicializa un tablero de tamaño configurable (por defecto 10x10).
 *  - Permite cargar los datos de una flota en formato JSON (recibidos del backend).
 *  - Actualiza y consulta el contenido de una celda concreta.
 *  - Imprime el tablero en consola para depuración.
 *
 *  Estructura del tablero (`this.grid`):
 *  - "*" → celda vacía
 *  - "S" → barco
 *  - "X" → disparo acertado
 *  - "O" → disparo fallado */

class Board {
  constructor(rows = 10, columns = 10) {
    //total de filas del tablero(por defecto 10)//
    this.rows = rows;
    //total de columnas del tablero (por defecto 10)//
    this.columns = columns;

    //Inicializa el tablero//
    this.grid = [];
    for (let i = 0; i < rows; i++) {
      this.grid[i] = [];
      for (let j = 0; j < columns; j++) {
        //Lo pongo provisional para ver el tablero //
        this.grid[i][j] = "*";
      }
    }
  }

  loadFromJSON(data) {
    if (!data || !data.fleet) {
      throw new Error("Datos JSON no válidos o sin flota");
    }

    // Limpiar tablero (rellenar con '*')
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.grid[i][j] = "*";
      }
    }

    // Marcar las posiciones de los barcos
    data.fleet.forEach((ship) => {
      ship.positions.forEach((pos) => {
        const { row, col } = pos;
        if (row >= 0 && row < this.rows && col >= 0 && col < this.columns) {
          this.grid[row][col] = "S";
        }
      });
    });
  }

  // Imprime el tablero en consola (para depuración)
  print() {
    console.log(this.grid.map((r) => r.join(" ")).join("\n"));
  }

  /*  Recibe fila columna y un valor,
        valida que este dentro del tablero
        y asigna la nueva posicion
     */
  update(row, column, value) {
    if (row < 0 || row >= this.rows || column < 0 || column >= this.columns) {
      throw new Error("Celda fuera de los límites del tablero");
    }
    // Actualiza el valor de la celda especificada
    this.grid[row][column] = value;
  }
  /* Recibe fila columna
       tras validar devuelve
       la posicion actual
    */
  getCell(row, column) {
    if (row < 0 || row >= this.rows || column < 0 || column >= this.columns) {
      throw new Error("Celda fuera de los límites del tablero");
    }
    return this.grid[row][column];
  }
}
