/*Clase encargada de gestionar el sistema de puntuaciones y ranking
 *  del juego “Hundir la Flota”. Almacena los resultados de las partidas,
 *  los ordena y los muestra en pantalla, persistiendo los datos en
 *  `localStorage` del navegador.
 *
 *  Funcionalidad:
 *  - Guarda las puntuaciones con nombre, puntos, disparos y fecha.
 *  - Carga los registros guardados desde el `localStorage`.
 *  - Renderiza visualmente el ranking dentro del contenedor HTML.
 *  - Permite borrar todo el historial de puntuaciones. */

'use strict';

class ScoreManager {
    constructor() {
        // Array para guardar la puntuación
        this.scores = [];

        // Cargamos del localStorage al iniciar
        this.loadScores();
    }

    /* Guarda una nueva puntuación con nombre, puntuación y fecha.
    Luego reordena y persiste los datos.
     */
    saveScore(player, score, shots = 0) {
        const now = new Date();
        const formattedDate =
            now.toLocaleDateString('es-ES') +
            ' ' +
            now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

        // Creamos el nuevo registro
        const newScore = { player, score, shots, date: formattedDate };
        this.scores.push(newScore);

        // Orden descendente (más puntos = mejor)
        this.scores.sort((a, b) => b.score - a.score);

        // Guardamos en localStorage
        localStorage.setItem('ranking', JSON.stringify(this.scores));

        console.log(`Puntuación guardada: ${player} - ${score} puntos`);

        // Actualizamos la vista
        this.renderRanking();
    }

    //Carga las puntuaciones almacenadas desde localStorage.
    loadScores() {
        const data = localStorage.getItem('ranking');
        if (data) {
            try {
                this.scores = JSON.parse(data);
                console.log('Ranking cargado desde localStorage:', this.scores);
            } catch (error) {
                console.error('Error al cargar ranking desde localStorage:', error);
                this.scores = [];
            }
        } else {
            console.log('No hay datos de ranking guardados todavía.');
        }
    }

    //Devuelve todas las puntuaciones actuales.
    getScores() {
        return this.scores;
    }

    //Renderiza el ranking dentro del contenedor #rankingList.
    renderRanking() {
        const rankingList = document.getElementById('rankingList');
        const clearButton = document.getElementById('clearRanking');

        rankingList.innerHTML = '';

        if (this.scores.length === 0) {
            rankingList.textContent = 'Sin partidas registradas.';

            // Desactivar botón si no hay registros
            if (clearButton) clearButton.disabled = true;
            return;
        }

        // Habilitar el botón si hay registros
        if (clearButton) clearButton.disabled = false;

        this.scores.forEach((s, i) => {
            const item = document.createElement('div');
            item.textContent = `${i + 1}. ${s.player} — ${s.score} pts (${s.shots} disparos) · ${s.date}`;
            rankingList.appendChild(item);
        });
    }

    // Limpia el ranking tanto en memoria como en localStorage.
    clearScores() {
        this.scores = [];
        localStorage.removeItem('ranking');

        const rankingList = document.getElementById('rankingList');
        if (rankingList) {
            rankingList.textContent = 'Sin partidas registradas.';
        }

        const clearButton = document.getElementById('clearRanking');
        if (clearButton) clearButton.disabled = true;

        console.log('Ranking borrado correctamente.');
    }



}

// Export global
window.ScoreManager = ScoreManager;
