'use strict';
/*
Pintar tablero, dónde están los barcos, dónde se ha disparado ya -  Board.js
    
    Debería construirse esto en Board??
    const CELL = { EMPTY:'*', SHIP:'S' };
    const SHOT = { NONE:null, MISS:'O', HIT:'X' };

Guardar puntuación - ScoreManager.js
*/

const CELL = { EMPTY:'*', SHIP:'S', HIT:'X', MISS:'O' };

class Game {

    /*Constructor del juego, con atributos iniciados para que 'nazcan' con estado inicial. 
    Los gameState serán: 'idle' (inactivo), 'playing', 'finished'.
    El board se le pasa al constructor desde el main después de instanciarlo.
    */

    constructor(board) {
        this.gameState = 'idle';
        this.shots = 0;
        this.board = board;
    }

    //Inicia el juego, imprimiendo el board por pantalla y cambiando el gameState.
    startGame() {
        if (this.gameState === 'playing') return; //para evitar que se reinicie una partida en curso.
        this.gameState = 'playing';
        this.shots = 0;
        this.board.print();
    }

    shoot(row, column) {

        //Comprobamos si ya se había disparado a esa celda.
        const cell = this.board.getCell(row, column);
        if (cell === CELL.HIT || cell === CELL.MISS) {
            console.log('Ya disparaste aquí.');
            return;
        }

        //Comprobamos que hay en la celda, si es agua o ship.
        if (cell === CELL.SHIP ) { // S de Ship.
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
            console.log(`¡Victoria! Disparos totales: ${this.shots}`);
            return true;
        }

        return false;
    }


    //Falta relación de puntuación con ScoreManager

}

