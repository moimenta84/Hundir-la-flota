class Ship {

    /* 
       name: nombre del barco (por ejemplo "Destructor", "Submarino").
       length: número de casillas que ocupa en el tablero.
       hits: impactos recibidos (por defecto 0 al comenzar el juego).
       Cada barco se define por:
        su nombre (identificación),
       su tamaño (cuántas casillas ocupa),
       y su estado (en función de los impactos recibidos).
    */
    constructor(name, length, hits = 0) {
        this.name = name;
        this.length = length;
        this.hits = hits;
    }

    /* 
       Método que comprueba si el barco está hundido.
       Devuelve true si el número de impactos (hits)
       es igual o mayor que su tamaño (length).
       En caso contrario devuelve false.
    */
    isSunk() {
        return this.hits >= this.length;
    }
}
