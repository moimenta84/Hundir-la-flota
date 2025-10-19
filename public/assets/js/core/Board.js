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
                this.grid[i][j] = '*';
            }
        }
    }

    /**
     * 
     * Necesitariamos un metodo loadFromJSON(data)
     * 
     *
     * Este método coloca en el tablero ('S') las posiciones de los barcos
     * que llegan desde el servidor en el objeto JSON devuelto por start_game.php.
     * 
     * Ejemplo de JSON esperado:
     * {
     *   "ships": [
     *     { "x": 0, "y": 1 },
     *     { "x": 2, "y": 3 }
     *   ]
     * }
     *
     * Por cada coordenada del array "ships", se marca una celda con 'S'
     * dentro de la cuadrícula (grid) del tablero.
     */





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
