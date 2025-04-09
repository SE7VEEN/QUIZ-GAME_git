import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  seleccionarPreguntaAleatoria,
  verificarGanador,
  generarCaballos,
  TIEMPO_TURNO,
  TOTAL_PREGUNTAS,
} from "./funcionesJuego";

export const useJuegoLogic = ({
  juegoIniciado,
  setGanadorGlobal,
  imagenesCaballos,
  preguntas,
}) => {
  const [puntajeJugador1, setPuntajeJugador1] = useState(0);
  const [puntajeJugador2, setPuntajeJugador2] = useState(0);
  const [turno, setTurno] = useState(null);
  const [resetTemporizador, setResetTemporizador] = useState(false);
  const [temporizadorPausado, setTemporizadorPausado] = useState(false);
  const [tiempoAgotado, setTiempoAgotado] = useState(false);
  const [preguntaActual, setPreguntaActual] = useState(null);
  const [mostrarRespuesta, setMostrarRespuesta] = useState(false);
  const [respuestaMostrada, setRespuestaMostrada] = useState(false);

  const navigate = useNavigate();
  const turnoRef = useRef(turno);

  // Sincroniza la referencia del turno
  useEffect(() => {
    turnoRef.current = turno;
  }, [turno]);

  // Inicia el juego con una pregunta aleatoria
  useEffect(() => {
    if (juegoIniciado) {
      setPreguntaActual(seleccionarPreguntaAleatoria(preguntas));
    }
  }, [juegoIniciado, preguntas]);

  // Función para pedir turno (botón rojo)
  const pedirTurno = () => {
    if (turno !== null || tiempoAgotado || respuestaMostrada) return;

    setTurno("pendiente");
    setTemporizadorPausado(true);

    setTimeout(() => {
      if (turnoRef.current === "pendiente") {
        setTemporizadorPausado(false);
        setTurno(null);
      }
    }, TIEMPO_TURNO);
  };

  // Función para sumar puntos
  const sumarPuntaje = (jugador) => {
    if (turno !== "pendiente") return;

    setTurno(jugador);
    setTemporizadorPausado(true);

    const nuevoPuntaje =
      jugador === "jugador1" ? puntajeJugador1 + 1 : puntajeJugador2 + 1;
    const hayGanador = verificarGanador(jugador, nuevoPuntaje, TOTAL_PREGUNTAS);

    if (hayGanador) {
      setGanadorGlobal({
        ganador: `Jugador ${jugador === "jugador1" ? 1 : 2}`,
        puntajeJugador1:
          jugador === "jugador1" ? nuevoPuntaje : puntajeJugador1,
        puntajeJugador2:
          jugador === "jugador2" ? nuevoPuntaje : puntajeJugador2,
        fecha: new Date().toISOString(),
      });
      navigate("/resultados");
      return;
    }

    jugador === "jugador1"
      ? setPuntajeJugador1(nuevoPuntaje)
      : setPuntajeJugador2(nuevoPuntaje);

    setMostrarRespuesta(true);
    setRespuestaMostrada(true);
  };

  // Reinicia estados para una nueva pregunta
  const cambiarPregunta = () => {
    setPreguntaActual(seleccionarPreguntaAleatoria(preguntas));
    setResetTemporizador((prev) => !prev);
    setTurno(null);
    setTiempoAgotado(false);
    setMostrarRespuesta(false);
    setRespuestaMostrada(false);
    setTemporizadorPausado(false);
  };

  // Maneja el tiempo agotado
  const manejarTiempoAgotado = () => {
    setTiempoAgotado(true);
    setMostrarRespuesta(true);
    setRespuestaMostrada(true);
    setTemporizadorPausado(true);
  };

  // Genera los datos de los caballos
  const caballos = generarCaballos(
    puntajeJugador1,
    puntajeJugador2,
    imagenesCaballos
  );

  return {
    puntajeJugador1,
    puntajeJugador2,
    turno,
    resetTemporizador,
    temporizadorPausado,
    tiempoAgotado,
    preguntaActual,
    mostrarRespuesta,
    respuestaMostrada,
    caballos,
    pedirTurno,
    sumarPuntaje,
    cambiarPregunta,
    manejarTiempoAgotado,
    setMostrarRespuesta,
    setRespuestaMostrada,
  };
};
