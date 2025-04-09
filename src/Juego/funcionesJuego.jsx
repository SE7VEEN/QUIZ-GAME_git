// Constantes (también podrían ir en un constants.js separado)
export const AVANCE_CABALLO = 90;
export const TIEMPO_TURNO = 5000;
export const TOTAL_PREGUNTAS = 4;

// Selecciona una pregunta aleatoria del arreglo
export const seleccionarPreguntaAleatoria = (preguntas) => {
  const indiceAleatorio = Math.floor(Math.random() * preguntas.length);
  return preguntas[indiceAleatorio];
};

// Verifica si un jugador ha ganado
export const verificarGanador = (jugador, nuevoPuntaje, totalPreguntas) => {
  return nuevoPuntaje === totalPreguntas;
};

// Genera el objeto de caballos para la pista
export const generarCaballos = (puntajeJugador1, puntajeJugador2, imagenes) => {
  return [
    {
      progreso: puntajeJugador1 * AVANCE_CABALLO,
      imagen: imagenes.caballo1,
    },
    {
      progreso: puntajeJugador2 * AVANCE_CABALLO,
      imagen: imagenes.caballo2,
    },
  ];
};
