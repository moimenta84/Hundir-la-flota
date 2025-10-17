# 🚢 Hundir la Flota – Proyecto Grupal I  
### ⚙️ PHP MVC 

**Autores:** José Luis Sánchez · Iker Martínez · Sheila Paradela · David Santiago
**Versión:** 1.0  
**Lenguajes:** PHP 8 · JavaScript (ES6) · HTML5 · CSS3 · JSON  
**Arquitectura:** MVC con Router dinámico y Request personalizado  

---

## 💡 Idea de negocio del proyecto

El proyecto **“Hundir la Flota”** tiene como finalidad desarrollar una **aplicación web completa** que conecte el lado lúdico del clásico juego naval con el aprendizaje de programación estructurada y trabajo colaborativo en equipo.  
El objetivo es construir desde cero una aplicación web que integre **Front-End, Back-End y gestión de proyecto profesional**, siguiendo una **arquitectura MVC artesanal inspirada en Laravel** y un flujo de trabajo **Git Flow**.

---

### 🎯 Objetivos del proyecto

1. **Desarrollar un juego funcional de Hundir la Flota para un solo jugador.**  
   - El servidor (PHP) esconderá los barcos.  
   - El cliente (JavaScript) gestionará los disparos y mostrará el resultado visual.

2. **Aplicar un modelo de desarrollo profesional:**
   - Arquitectura **MVC (Modelo–Vista–Controlador)** en PHP puro.  
   - Enrutamiento dinámico con **Router**
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
- Implementación de APIs REST con PHP y persistencia en JSON.  
- Manipulación avanzada del DOM con JavaScript moderno (ES6).  
- Aplicación de principios SOLID y PSR-12 en el código.  
- Integración entre capas de Front-End y Back-End de forma asíncrona.  

---

### ⚙️ Requisitos funcionales

1. Al cargar la página, el juego solicitará al servidor una **nueva partida**.  
2. El **tablero (10x10)** se generará dinámicamente en el cliente.  
3. El jugador podrá hacer clic en las casillas para disparar.  
4. El sistema dará **feedback visual** para cada disparo (“agua”, “tocado”, “hundido”).  
5. Se mostrará la **flota enemiga** y su estado actual.  
6. Se contará el número total de disparos.  
7. Al hundir todos los barcos, aparecerá un **modal de victoria** con la puntuación.  
8. El jugador podrá **introducir su nombre y guardar su puntuación**.  
9. Se mostrará un **ranking de las 10 mejores puntuaciones**.

---

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

| Fase | Descripción | Entregable |
|------|--------------|-------------|
| **Fase 1** | Configuración del entorno, repositorio y estructura MVC | Proyecto base PHP con router funcional |
| **Fase 2** | Desarrollo Back-End (endpoints y lógica del tablero) | API funcional en JSON |
| **Fase 3** | Desarrollo Front-End (tablero, disparos, feedback) | Interfaz jugable y dinámica |
| **Fase 4** | Integración completa y ranking | Comunicación completa cliente-servidor |
| **Fase 5** | Pruebas, revisión y documentación | README completo + demo funcional |

---

## 📁 Estructura del proyecto

```bash
📦 hundir-la-flota
 ┣ 📂 app
 ┃ ┣ 📂 Core
 ┃ ┃ ┣ 📜 Router.php         # Sistema de rutas estilo Laravel (GET, POST, dinámico)
 ┃ ┃ ┣ 📜 Request.php        # Gestión unificada de parámetros GET/POST
 ┃ ┃ ┣ 📜 Controller.php     # Clase base para controladores
 ┃ ┃ ┣ 📜 Model.php          # Clase base tipo Eloquent (create, save, etc.)
 ┃ ┃ ┗ 📜 Helper.php         # Funciones auxiliares
 ┃ ┣ 📂 Http
 ┃ ┃ ┗ 📂 Controllers
 ┃ ┃    ┗ 📜 GameController.php   # Controla el flujo del juego (startGame, saveScore, getScores)
 ┃ ┣ 📂 Models
 ┃ ┃ ┣ 📜 Game.php                # Lógica de colocación aleatoria de barcos
 ┃ ┃ ┗ 📜 Score.php               # Manejo de ranking en storage/scores.json
 ┃ ┗ 📂 Views
 ┃    ┣ 📜 game.php               # Vista principal del tablero
 ┃    ┗ 📜 ranking.php            # Vista del ranking
 ┣ 📂 public
 ┃ ┣ 📜 index.php                 # Punto de entrada: carga Router + lanza la aplicación
 ┃ ┣ 📜 script.js                 # Lógica del juego (fetch, DOM, eventos)
 ┃ ┣ 📜 style.css
 ┃ ┗ 📜 assets/
 ┣ 📂 storage
 ┃ ┗ 📜 scores.json               # Persistencia local del ranking
 ┣ 📜 .gitignore
 ┗ 📜 README.md```

# 📢 Aviso al equipo – Gestión de reuniones y tareas 🧭

¡Hola equipo! 👋  
Todas las **reuniones, tareas y eventos del Sprint
**Por favor, revisadlos con frecuencia y marcad vuestra participación o comentarios ahí mismo.
---
## 🗓️ Reuniones del Sprint actual

📍REUNIONES  Ve a 👉  [Issues del proyecto](https://github.com/moimenta84/Hundir-la-flota/milestones)

| Tipo | Descripción | Estado |
|-------------------- |--------------------------------------------------------------------------------|
| 🗓️ Reunión inicial  | Inicio del Sprint – planificación de tareas |Finalizada 🟢 |
| 🗓️ Reunión técnica  | Definición y cierre de requisitos para comenzar la codificación |Finalizada  🟢


# 🚢 Proyecto: Hundir la Flota 
# 🧑‍💻 Autores: José Luis Sánchez · Iker Martínez · Sheila Paradela · David Santiago
