'use strict';

class Renderer {

    /* Recibe el tablero y el ID del 
       Contenedor donde se pintará el HTML
    */
    constructor(board, containerId) {
        this.board = board;
        //AQUI SE CAMBIARA POR EL HELPERS//
        this.container = document.getElementById(containerId);
    }

    // Renderiza el tablero completo en el DOM
    render() {
        // Limpia el contenido anterior del contenedor
        this.container.innerHTML = '';

        //SE CAMBIARA POR UN HELPERS//
        const table = document.createElement('table');
        table.classList.add('board-table'); // permite estilizar con CSS

        // Recorre filas
        for (let r = 0; r < this.board.rows; r++) {
            const tr = document.createElement('tr'); // fila HTML

            // Recorre columnas
            for (let c = 0; c < this.board.columns; c++) {
                const td = document.createElement('td'); // celda HTML

                const cell = this.board.getCell(r, c); // obtiene celda del Board
                td.textContent = cell; // pinta el contenido (*, S, X, O)

                // Añade evento de clic → realizar disparo
                td.addEventListener('click', () => {
                    game.shoot(r, c);   // dispara
                    this.render();     // se vuelve a pintar el tablero
                });

                tr.appendChild(td); // añade la celda a la fila
            }

            table.appendChild(tr); // añade la fila a la tabla
        }

        // Inserta la tabla completa en el contenedor del HTML
        this.container.appendChild(table);
    }
}
