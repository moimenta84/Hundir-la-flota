'use strict';
/**
 *  Funciones auxiliares reutilizables para validación y saneamiento
 *  de datos en el Front-End (antes de enviar información al servidor).
 * 
 *  - Validación de nombres de jugador (expresiones regulares)
 *  - Validación de disparos (enteros positivos)
 *  - Saneamiento de cadenas
 *  - Utilidades genéricas
 */

/**
 * Valida el nombre del jugador.

 * - Solo letras, números y espacios.
 * - Longitud entre 3 y 15 caracteres.
 * - No acepta símbolos ni caracteres especiales.
 *
 * Retorna true si es válido, false en caso contrario.
 */
export function validatePlayerName(name) {
    const regex = /^[A-Za-z0-9 ]{3,15}$/; // letras, números y espacios

    return regex.test(name.trim());
}

/** Comprueba que los disparos sean un número entero positivo */
export function validateShots(shots) {
    const regex = /^[0-9]+$/; // solo dígitos
    
    return regex.test(String(shots)) && Number(shots) >= 0;
}

//** Elimina caracteres peligrosos para evitar inyecciones o errores de formato*/
export function sanitizeInput(str) {
    if (typeof str !== 'string') {
        return '';
    }

    return str.replace(/[<>"'{}$()]/g, '').trim();
}