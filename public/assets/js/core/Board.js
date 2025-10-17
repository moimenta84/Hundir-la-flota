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
        }/*Declaramos un array de barcos, 
           un board puede tener o 1 
           o muchos barcos
         */
        this.ships = [];
    }


    /* Metodo provisional para depurar.
       Pinta la matriz de asteriscos,
       luego se cambiara por el dom
    */
    print() {
        const visual = this.grid.map(row => row.join(' ')).join('\n');
        console.log(visual);
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

    //AÑADO BARCO//
    add(ship) {
        this.ships.push(ship);
        return true;
    }
}
