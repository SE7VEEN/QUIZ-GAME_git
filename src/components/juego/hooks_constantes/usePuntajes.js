import { useState, useCallback, useMemo } from "react";
import { AVANCE_CABALLO, TOTAL_PREGUNTAS } from "./constantes";
import caballo1 from "../../../images/Caballo4.png";
import caballo2 from "../../../images/Caballo3.png";

/**
 * HOOK PERSONALIZADO PARA MANEJO DE PUNTAJES
 * 
 * Este hook se encarga de la lógica relacionada con:
 * - Gestión de puntajes de los jugadores
 * - Verificación de condiciones de victoria
 * - Control del progreso visual de los caballos
 * 
 */

export const usePuntajes = (setGanador, navigate) => {
  const [puntajeJugador1, setPuntajeJugador1] = useState(0); //Para alamecer los puntajes de ambos jugadores
  const [puntajeJugador2, setPuntajeJugador2] = useState(0);

 /**
   * Actualiza el puntaje de un jugador en específico
   */
  const actualizarPuntaje = useCallback((jugador, nuevoPuntaje) => {
    if (jugador === "jugador1") {
      setPuntajeJugador1(nuevoPuntaje);
    } else {
      setPuntajeJugador2(nuevoPuntaje);
    }
  }, []);


   /**
   * Verifica si un jugador ha contestado correctamente 10 preguntas
   */
  const verificarGanador = useCallback(
    (jugador, nuevoPuntaje) => {
      if (nuevoPuntaje === TOTAL_PREGUNTAS) {
        const ganadorNombre = `Jugador ${jugador === "jugador1" ? 1 : 2}`;
        setGanador({
             //Se actualiza el estado con el ganador, los puntajes y la fecha
          ganador: ganadorNombre,
          puntajeJugador1:
            jugador === "jugador1" ? nuevoPuntaje : puntajeJugador1,
          puntajeJugador2:
            jugador === "jugador2" ? nuevoPuntaje : puntajeJugador2,
          fecha: new Date().toISOString(),
        });
        navigate("/resultados"); // Redirigimos a la pantalla de resultados
        return true;
      }
      return false;
    },
    [setGanador, navigate, puntajeJugador1, puntajeJugador2]
  );

    /**
   * Incrementa el puntaje de un jugador y verifica victoria
   */
  const sumarPuntaje = useCallback(
    (jugador) => {
      const nuevoPuntaje =
        jugador === "jugador1" ? puntajeJugador1 + 1 : puntajeJugador2 + 1;

      if (verificarGanador(jugador, nuevoPuntaje)) return;  //Si hay un ganador, no se actualiza el puntaje

      actualizarPuntaje(jugador, nuevoPuntaje); // Actualizamos el puntaje del jugador que respondió
    },
    [puntajeJugador1, puntajeJugador2, verificarGanador, actualizarPuntaje]
  );

    // Controla el avance de los caballos
  const caballos = useMemo(
    () => [
      {
        progreso: puntajeJugador1 * AVANCE_CABALLO,
        imagen: caballo1,
        nombre: "Jugador 1",
        id: 1,
      },
      {
        progreso: puntajeJugador2 * AVANCE_CABALLO,
        imagen: caballo2,
        nombre: "Jugador 2",
        id: 2,
      },
    ],
    [puntajeJugador1, puntajeJugador2]
  );

  return {
    puntajeJugador1,
    puntajeJugador2,
    sumarPuntaje,
    caballos,
  };
};