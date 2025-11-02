
'use strict';

class ScoreManager {

    // Array para guardar la puntuación.
    constructor() {
        this.scores = [];
        this.scores = [];
    }

    /* Guarda una nueva puntuación en memoria. Creamos el objeto newScore
    al que le pasamos el player y el score, con la puntuación nueva que deseamos guardar,
    y pusheamos el objeto al array*/
    saveScore(player, score) {
        const newScore = { player: player, score: score };
        this.scores.push(newScore);

        /*Ordenamos de mayor a menor la puntuación comparando
        cada par de objetos y coloca primero el que tenga score más alto.*/
        this.scores.sort((a, b) => b.score - a.score);

        //Solo mantenemos las 10 mejores
        if (this.scores.length > 10) {
            this.scores = this.scores.slice(0, 10);
        }

        console.log(`Puntuación guardada: ${player} - ${score} puntos`);
    }

    //Devuelve todas las puntuaciones actuales
    getScores() {
        return this.scores;
    }

    //Muestra el ranking 
    renderRanking() {
        const container = document.getElementById('rankingList');
        if (!container) return;

        container.innerHTML = ''; // limpia el contenido anterior

        this.scores.forEach((s, i) => {
            const item = document.createElement('div');
            item.textContent = `${i + 1}. ${s.player}: ${s.score} puntos`;
            container.appendChild(item);
        });
    }

}
