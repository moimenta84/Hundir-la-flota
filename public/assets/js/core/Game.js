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
    El board se le pasa al constructor desde el main después de instanciarlo.
    */

    constructor() {
        this.gameState = 'idle';
        this.shots = 0;

    }

    /*En este metodo hay que hacer una peticion Fecth

        const response = await fetch('php/start_game.php');
     *  const data = await response.json();
     *  this.board.loadFromJSON(data);
     *  this.renderer.render();
     * 
     * De esta forma, la flota se generará dinámicamente en el servidor
     * y se cargará en el tablero antes de comenzar la partida.

    */
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

    /**
    *  Haria falta un metodo resetGame 
    *  se encargaria de Reiniciar el estado del juego y comienza una nueva partida.
    * - Limpia el tablero.
    * - Resetea los contadores.
    * - Cambia el estado a 'idle' y llama a startGame().
    * En la versión final, volverá a hacer fetch('php/start_game.php')
    * para pedir una nueva flota al backend antes de iniciar.
    */


}

