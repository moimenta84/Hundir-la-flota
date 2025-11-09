# 🚢 Hundir la Flota – Proyecto Grupal I

### ⚙️ PHP MVC

**Autores:** José Luis Sánchez · Iker Martínez · Sheila Paradela · David Santiago
**Versión:** 1.0
**Lenguajes:** PHP 8 · JavaScript (ES6) · HTML5 · CSS3 · JSON

---

## 💡 Idea de negocio del proyecto

El proyecto **“Hundir la Flota”** tiene como finalidad desarrollar una **aplicación web completa** que conecte el lado lúdico del clásico juego naval con el aprendizaje de programación estructurada y trabajo colaborativo en equipo.
El objetivo es construir desde cero una aplicación web que integre **Front-End, Back-End y gestión de proyecto profesional**, siguiendo un flujo de trabajo **Git Flow**.

---

### 🎯 Objetivos del proyecto

1. **Desarrollar un juego funcional de Hundir la Flota para un solo jugador.**

   - El servidor (PHP) esconderá los barcos.
   - El cliente (JavaScript) gestionará los disparos y mostrará el resultado visual.

2. **Aplicar un modelo de desarrollo profesional:**

   - Arquitectura en PHP puro.

   - Comunicación asíncrona **fetch() + JSON** entre cliente y servidor.

3. **Fomentar el trabajo colaborativo:**

   - Uso de **Git y GitHub** con flujo **Git Flow (main, develop, feature)**.
   - Roles definidos dentro del equipo: Front-End, Back-End y Scrum Master.
   - Planificación mediante tableros Kanban (Trello / GitHub Projects).

4. **Desarrollar una interfaz atractiva y dinámica:**
   - HTML semántico + CSS moderno (Grid / Flexbox).
   - Feedback visual para “agua”, “tocado” y “hundido”.
   - Panel de información, contador de disparos y ranking final.

---

### 🧠 Objetivos de aprendizaje

- Colaboración en equipo usando control de versiones y revisión de código.
- Manipulación avanzada del DOM con JavaScript moderno (ES6).
- Aplicación de principios SOLID y PSR-12 en el código.
- Integración entre capas de Front-End y Back-End de forma asíncrona.

---

### 🧩 Flujo funcional

1. Al cargar la página, se solicita al servidor una **nueva partida** (`php/start_game.php`).
2. El servidor devuelve la **flota en formato JSON**.
3. El cliente renderiza el tablero y permite al jugador **disparar clicando sobre las celdas**.
4. Cada disparo devuelve un estado visual y sonoro:
   - 💧 **Agua** → sonido de chapoteo .
   - 💥 **Tocado** →sonido explosión .
5. Al **hundir toda la flota**, el juego lanza un sonido de victoria y **efecto de confeti animado** usando la librería [🎉 `canvas-confetti`]
6. Se muestra un **modal o alerta final** con la puntuación obtenida.
7. El jugador puede introducir su nombre para guardar su resultado.
8. El **ranking** se actualiza automáticamente mostrando las mejores partidas.

---

#### 🧨 Ejemplo del efecto de confeti al ganar:

````js
// Dentro de Game.js, método checkVictory()
if (!quedanBarcos) {
  this.gameState = "finished";
  confetti({
    particleCount: 150,
    spread: 80,
    origin: { y: 0.6 }
  });
  alert(` ¡Victoria! Has hundido toda la flota en ${this.shots} disparos.`);
}



### 🧩 Tareas por rol

#### 🧱 Rol: Back-End (PHP)

- Implementar el “cerebro” del juego en el servidor.
- Crear la API REST con tres endpoints principales:
  - `startGame` → Genera la flota y devuelve las posiciones.
  - `saveScore` → Guarda la puntuación en `scores.json`.
  - `getScores` → Devuelve el ranking completo.
- Validar que los barcos no se solapen ni salgan del tablero.
- Mantener la persistencia de datos mediante archivos JSON.

#### 🎨 Rol: Front-End (JavaScript / HTML / CSS)

- Diseñar el tablero de juego y la interfaz general.
- Usar JavaScript para controlar la lógica del juego y la interacción con el usuario.
- Implementar peticiones `fetch()` hacia el servidor PHP.
- Gestionar el estado visual (agua, tocado, hundido) en tiempo real.
- Mostrar el **ranking** y el **modal de victoria**.

#### 🧭 Rol: Scrum Master

- Planificar el proyecto en fases y tareas claras.
- Coordinar los merges y revisiones de ramas `feature/*`.
- Controlar el progreso en Trello o GitHub Projects.
- Asegurar la documentación del proyecto (`README.md`, commits limpios).

---

### 🧱 Fases del desarrollo

| Fase       | Descripción                                             | Entregable                             |
| ---------- | ------------------------------------------------------- | -------------------------------------- |
| **Fase 1** | Configuración del entorno, repositorio y estructura MVC | Proyecto base PHP con router funcional |
| **Fase 2** | Desarrollo Back-End (endpoints y lógica del tablero)    | API funcional en JSON                  |
| **Fase 3** | Desarrollo Front-End (tablero, disparos, feedback)      | Interfaz jugable y dinámica            |
| **Fase 4** | Integración completa y ranking                          | Comunicación completa cliente-servidor |
| **Fase 5** | Pruebas, revisión y documentación                       | README completo + demo funcional       |

---

## 📁 Estructura del proyecto

```bash
## 📁 Estructura del proyecto

```bash
📦 HundirFlota
 ┣ 📂 .vscode
 ┣ 📂 app
 ┃ ┗ 📜 (lógica MVC: controladores, modelos y vistas PHP)
 ┣ 📂 docs
 ┃ ┗ 📜 (documentación técnica del proyecto)
 ┣ 📂 public
 ┃ ┣ 📂 assets
 ┃ ┃ ┣ 📂 audio
 ┃ ┃ ┗ 📂 js
 ┃ ┃ ┃ ┣ 📂 core
 ┃ ┃ ┃ ┃ ┣ 📜 Board.js              # Gestión lógica del tablero
 ┃ ┃ ┃ ┃ ┣ 📜 Game.js               # Control general del juego
 ┃ ┃ ┃ ┃ ┗ 📜 ScoreManager.js       # Ranking y puntuaciones
 ┃ ┃ ┃ ┣ 📂 dom
 ┃ ┃ ┃ ┃ ┣ 📜 boardRenderer.js      # Renderizado visual de celdas
 ┃ ┃ ┃ ┃ ┗ 📜 EffectsManager.js     # Efectos visuales (confeti, sonido, splash)
 ┃ ┃ ┃ ┣ 📂 utils
 ┃ ┃ ┃ ┃ ┗ 📜 helpers.js            # Funciones auxiliares
 ┃ ┃ ┃ ┗ 📜 main.js                 # Punto de entrada del front-end
 ┃ ┃ ┗ 📜 style.css                 # Estilos base y tema oscuro
 ┃ ┣ 📂 php
 ┃ ┃ ┣ 📜 get_score.php             # Devuelve ranking en JSON
 ┃ ┃ ┣ 📜 save_score.php            # Guarda nueva puntuación
 ┃ ┃ ┗ 📜 start_game.php            # Genera la flota inicial
 ┃ ┣ 📜 index.html                  # Página principal del juego
 ┣ 📂 resources
 ┃ ┗ 📜 effects.confetti()          # Configuración de efectos visuales
 ┣ 📂 storage
 ┃ ┗ 📜 scores.json                 # Archivo persistente de ranking
 ┣ 📜 .gitignore                    # Archivos y carpetas ignorados por Git
 ┗ 📜 README.md                     # Documentación del proyecto
````

# 📢 Aviso al equipo – Gestión de reuniones y tareas 🧭

¡Hola equipo! 👋
Todas las **reuniones, tareas y eventos del Sprint
**Por favor, revisadlos con frecuencia y marcad vuestra participación o comentarios ahí mismo.

---

## 🗓️ Reuniones del Sprint actual

📍REUNIONES Ve a 👉 [Issues del proyecto](https://github.com/moimenta84/Hundir-la-flota/milestones)

| Tipo               | Descripción                                                                                                                                                                | Estado        |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| 🗓️ Reunión inicial | Inicio del Sprint – planificación de tareas                                                                                                                                | Finalizada 🟢 |
| 🗓️ Reunión técnica | Definición y cierre de requisitos para comenzar la codificación                                                                                                            | Finalizada 🟢 |
| 🗓️ Reunión técnica | Inicio del desarrollo del módulo de renderizado , definición de estructura DOM, eventos de disparo y diseño visual del tablero                                             | Finalizado🟢  |
| 🗓️ Reunión técnica | Integración final del Front-End y Back-End, revisión de animaciones, efectos visuales (confeti, sonido, splash) y pruebas funcionales completas del juego en entorno local | Finalizado 🟢 |


# ⚙️ Instrucciones para ejecutar el proyecto en local (XAMPP)

## 🧩 Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- **XAMPP** (versión 8.0 o superior)
  👉 [Descargar XAMPP](https://www.apachefriends.org/es/download.html)
- Un navegador moderno (Chrome, Firefox, Edge)
- Git *(opcional, solo si deseas clonar el repositorio)*

---

# 🧱 Instalación del proyecto

##  Clonar desde GitHub
```bash
git clone https://github.com/moimenta84/HundirFlota.git

Copia la carpeta completa del proyecto HundirFlota/ dentro de:
C:\xampp\htdocs\
C:\xampp\htdocs\HundirFlota\public\index.html

##  🚀 Ejecución del juego
Abre el Panel de Control de XAMPP

Inicia el  modulo:
 Apache

Abre tu navegador y escribe:
http://localhost/HundirFlota/public
