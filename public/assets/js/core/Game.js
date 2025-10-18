'use strict';
/*
Pintar tablero, dónde están los barcos, dónde se ha disparado ya -  Board.js
    
    Debería construirse esto en Board??
    const CELL = { EMPTY:'*', SHIP:'S' };
    const SHOT = { NONE:null, MISS:'O', HIT:'X' };

Guardar puntuación - ScoreManager.js
*/

const CELL = { EMPTY: '*', SHIP: 'S', HIT: 'X', MISS: 'O' };

class Game {

    /*Constructor del juego, con atributos iniciados para que 'nazcan' con estado inicial. 
    Los gameState serán: 'idle' (inactivo), 'playing', 'finished'.
    El board se instancia  dentro del constructor 
    */

    constructor() {
        this.gameState = 'idle';
        this.shots = 0;
        this.board = new board();
        this.scoreManager = new ScoreManager();

    }

    //Inicia el juego, imprimiendo el board por pantalla y cambiando el gameState.
    startGame() {
        if (this.gameState === 'playing') return; //para evitar que se reinicie una partida en curso.
        this.gameState = 'playing';
        this.shots = 0;
        this.board.print();
    }

    //Coloca los barcos de forma fija (para depuración).
    //Puedes cambiarlo por una versión aleatoria más adelante.

    setupShips() {
        const ship1 = new Ship("Destructor", 3);
        const ship2 = new Ship("Submarino", 2);
        const ship3 = new Ship("Portaaviones", 4);

        // Añadimos al array de barcos del tablero
        this.board.add(ship1);
        this.board.add(ship2);
        this.board.add(ship3);

        // Colocación fija en el tablero
        // 🔹 Destructor
        this.board.update(0, 0, CELL.SHIP);
        this.board.update(0, 1, CELL.SHIP);
        this.board.update(0, 2, CELL.SHIP);
        // 🔹 Submarino
        this.board.update(3, 4, CELL.SHIP);
        this.board.update(4, 4, CELL.SHIP);
        // 🔹 Portaaviones
        this.board.update(6, 2, CELL.SHIP);
        this.board.update(6, 3, CELL.SHIP);
        this.board.update(6, 4, CELL.SHIP);
        this.board.update(6, 5, CELL.SHIP);

        console.log("🚢 Barcos colocados en el tablero.");
    }

    shoot(row, column) {

        //Comprobamos si ya se había disparado a esa celda.
        const cell = this.board.getCell(row, column);
        if (cell === CELL.HIT || cell === CELL.MISS) {
            console.log('Ya disparaste aquí.');
            return;
        }

        //Comprobamos que hay en la celda, si es agua o ship.
        if (cell === CELL.SHIP) { // S de Ship.
            this.board.update(row, column, CELL.HIT); // tocado
            console.log('Tocado!');
        } else { //recibe un * que sería agua.
            this.board.update(row, column, CELL.MISS); // agua
            console.log('Agua...');
        }

        this.shots++;
        this.board.print();
        this.checkVictory();//¿Victoria?
    }

    checkVictory() {

        //Comprobamos si queda alguna S (celda de barco sin tocar) en el board.
        const quedanBarcos = this.board.grid.some(row =>
            row.some(cell => cell === CELL.SHIP)
        );

        if (!quedanBarcos) {
            this.gameState = 'finished';
            //CALCULAMOS PUNTI AL FINALIZAR PARTIDA//
            const score = this.calculateScore();
            console.log(`¡Victoria! Disparos totales: ${this.shots}`);
            console.log(` Puntuación obtenida: ${score} puntos`);
            return true;
        }

        return false;
    }


    //Falta relación de puntuación con ScoreManager
    /* Calcula una puntuación simple según los disparos.
     Menos disparos = más puntos.*/
    calculateScore() {

        const baseScore = 100;
        const penalty = this.shots * 5;
        return Math.max(0, baseScore - penalty);
    }


}

