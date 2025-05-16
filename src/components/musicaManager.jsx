/**
 * MANEJADOR DE AUDIO DEL JUEGO
 *
 * En este módulo gestionamos todos los efectos de sonido, controlamos la reproducción (play/stop)
 * y ajustamos el volumen individualmente.
 */

import { Howl } from "howler";

/*---- Menu Inicio ---- */
import soundDesplegar from "../music/desplegar.wav";
import soundIniciar from "../music/iniciar.wav";

/*----  Juego ---- */
import soundTurno from "../music/turno.wav";
import soundCambiar from "../music/cambiar.wav";
import soundCorrecto from "../music/correcto.wav";
import soundCaballo from "../music/caballo.wav";
import soundCaballo2 from "../music/caballo2.wav";
import soundTemporizador from "../music/temporizador1.wav";

/*---- Pestaña resultados ---- */
import endGame from "../music/mixkit-game-level-completed-2059.wav";

/*---- En proceso ---- */
import musicaFondo from "../music/fondomenu.mp3";

// Objeto de sonidos
const sounds = {
  botonTurno: new Howl({
    src: [soundTurno],
    volume: 0.4, // Volumen moderado para sonidos frecuentes
  }),
  botonMostrar: new Howl({
    src: [soundCorrecto],
    volume: 0.4,
  }),
  botonCambiar: new Howl({
    src: [soundCambiar],
    volume: 0.3,
  }),
  desplegar: new Howl({
    src: [soundDesplegar],
    volume: 0.6,
  }),
  iniciar: new Howl({
    src: [soundIniciar],
    volume: 0.7,
  }),
  caballo: new Howl({
    src: [soundCaballo],
    volume: 0.7,
  }),
  caballo2: new Howl({
    src: [soundCaballo2],
    volume: 0.7,
  }),

  temporizador: new Howl({
    src: [soundTemporizador],

    volume: 0.4,
    html5: true,
  }),
  endGame: new Howl({
    src: [endGame],

    volume: 0.6,
    html5: true,
  }),
  backgroundMusic: new Howl({
    src: [musicaFondo],
    loop: true,
    volume: 0.2,
    html5: true,
  }),
};

// Función para reproducir sonidos
//Reproduce un sonido por su nombre clave

export const playSound = (soundName) => {
  const sound = sounds[soundName];

  if (sound) {
    sound.play();
  } else {
    console.warn(`Sonido "${soundName}" no encontrado`);
  }
};

// Función para detener un sonido
export const stopSound = (soundName) => {
  if (sounds[soundName]) {
    sounds[soundName].stop();
  }
};
