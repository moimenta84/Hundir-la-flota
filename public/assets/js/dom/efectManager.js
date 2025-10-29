'use strict'

class EffectsManager {
  constructor() {
    // Carga de audios en memoria. Se reproducen cuando se les llame.
    this.sounds = {
      hit: new Audio('public/assets/audioground-impact-352053.mp3'), // sonido al acertar
      miss: new Audio(
        'public/assets/audio/sound-of-a-drop-of-water-131023.mp3'
      ), // sonido al fallar
      win: new Audio('public/assets/audio/success-fanfare-trumpets-6185.mp3'),
      impact: new Audio(
        'public/assets/audio/impact-cinematic-boom-05-352465.mp3'
      ), // sonido al ganar
    }
  }

  // Reproduce uno de los sonidos definidos arriba
  play(soundName) {
    const sound = this.sounds[soundName] // busca el sonido
    if (sound) sound.play() // si existe, lo reproduce
  }

  // Lanza confeti usando la librería canvas-confetti
  confetti() {
    // Parámetros mínimos para un efecto visual básico
    confetti({
      particleCount: 150, // cantidad de partículas
      spread: 70, // dispersión
      origin: { y: 0.6 }, // altura desde la que sale el confeti
    })
  }
}
