
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
    saveScore(player, score, shots) {
        const scores = JSON.parse(localStorage.getItem("scores")) || [];

        scores.push({ player, score, shots });

        //ordenar por puntuación descendente (más puntos= mejor)
        scores.sort((a, b) => b.score - a.score);

        localStorage.setItem("scores", JSON.stringify(scores));
    }


    //Devuelve todas las puntuaciones actuales
    getScores() {
        return this.scores;
    }

    //Muestra el ranking
    renderRanking() {
        const scores = JSON.parse(localStorage.getItem("scores")) || [];
        const rankingList = document.getElementById("rankingList");
        rankingList.innerHTML = "";

        if (scores.length === 0) {
            rankingList.textContent = "Sin partidas registradas.";
            return;
        }

        scores.forEach((s, index) => {
            const item = document.createElement("p");
            item.textContent = `${index + 1}. ${s.player}: ${s.score} puntos (${s.shots} disparos)`;
            rankingList.appendChild(item);
        });
    }


}
