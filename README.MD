📦 hundir-la-flota
 ┣ 📂 app
 ┃ ┣ 📂 Core
 ┃ ┃ ┣ 📜 Router.php         # Sistema de rutas estilo Laravel (GET, POST, parámetros dinámicos)
 ┃ ┃ ┣ 📜 Request.php        # Gestión unificada de parámetros GET/POST
 ┃ ┃ ┣ 📜 Controller.php     # Clase base para controladores
 ┃ ┃ ┣ 📜 Model.php          # Clase base tipo Eloquent (propiedades permitidas, create(), save(), 
 ┃ ┃ ┗ 📜 Helper.php         # Funciones auxiliares (views, responses, etc.)
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
 ┗ 📜 README.md



🌳 Ramas principales

main → código estable y en producción.

develop → integración de nuevas funcionalidades antes de pasar a producción.

🌿 Ramas de soporte

feature/* → desarrollo de nuevas funciones o módulos.



# 🚢 Proyecto: Hundir la Flota 
# 🧑‍💻 Autores: José Luis Sánchez · Iker Martínez · Sheila Paradela