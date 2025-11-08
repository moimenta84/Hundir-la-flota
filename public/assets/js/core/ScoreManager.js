
'use strict';

class ScoreManager {


    constructor() {
        // Array para guardar la puntuación.
        this.scores = [];

        // Cargamos del LocalStorage al iniciar
        this.loadScores();
    }

    /* Guarda una nueva puntuación en memoria. Creamos el objeto newScore
    al que le pasamos el player y el score, con la puntuación nueva que deseamos guardar,
    y pusheamos el objeto al array*/
    saveScore(player, score) {
        // Creamos la fecha actual formateada
        const now = new Date();
        const formattedDate = now.toLocaleDateString('es-ES') + ' ' + now.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
        });

        const newScore = { player: player, score: score, date: formattedDate };
        this.scores.push(newScore);

        /*Ordenamos de mayor a menor la puntuación comparando
        cada par de objetos y coloca primero el que tenga score más alto.*/
        this.scores.sort((a, b) => b.score - a.score);

        //Solo mantenemos las 10 mejores
        if (this.scores.length > 10) {
            this.scores = this.scores.slice(0, 10);
        }

        // Guardamos en localStorage (clave: 'ranking')
        localStorage.setItem('ranking', JSON.stringify(this.scores));

        console.log(`Puntuación guardada: ${player} - ${score} puntos`);
    }

    // Carga las puntuaciones almacenadas en LocalStorage
    loadScores() {
        const data = localStorage.getItem('ranking');
        if (data) {
            try {
                this.scores = JSON.parse(data);
                console.log("Ranking cargado desde LocalStorage:", this.scores);
            } catch (error) {
                console.error("Error al cargar ranking desde localStorage:", error);
                this.scores = [];
            }
        } else {
            console.log("No hay datos de ranking guardados todavía.");
        }
    }

    //Devuelve todas las puntuaciones actuales
    getScores() {
        return this.scores;
    }

    //Muestra el ranking en el Index
    renderRanking() {
        const container = document.getElementById('rankingList');
        if (!container) return;

        container.innerHTML = ''; // limpia el contenido anterior

        if (this.scores.length === 0) {
            container.textContent = "Sin partidas registradas.";
            return;
        }

        this.scores.forEach((s, i) => {
            const item = document.createElement('div');
            item.textContent = `${i + 1}. ${s.player}: ${s.score} puntos - ${s.date}`;
            container.appendChild(item);
        });
    }

    // Limpia el ranking
    clearScores() {
        this.scores = [];
        localStorage.removeItem('ranking');
        this.renderRanking();
        console.log("Ranking borrado correctamente.");
    }
}

// Export global
window.ScoreManager = ScoreManager;
