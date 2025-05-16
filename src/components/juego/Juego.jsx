import { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import PanelDePreguntas from "./interfaz/PanelDePreguntas";
import Temporizador from "./interfaz/Temporizador";
import Pista from "./interfaz/Pista";
import preguntas from "../../data/preguntas.json";
import { usePuntajes } from "./hooks_constantes/usePuntajes";
import { TIEMPO_TURNO } from "./hooks_constantes/constantes";

import "../../assets/styles/Juego.css";

/**
 * COMPONENTE JUEGO
 *
 * Este componente maneja:
 * - La lógica central del juego
 * - El flujo de turnos
 * - El temporizador
 * - La selección de preguntas
 * - La comunicación entre componentes
 *
 * Props:
 * @param {boolean} juegoIniciado - Indica si el juego está activo
 * @param {function} setGanador - Callback para establecer el ganador
 */
function Juego({ juegoIniciado, setGanador }) {
  const navigate = useNavigate();

  // Estados del juego
  const [turno, setTurno] = useState(null); // Para saber quien tiene el turno "jugador1" o "jugador2"
  const [tiempoAgotado, setTiempoAgotado] = useState(false); // Para saber si el tiempo se agotó
  const [resetTemporizador, setResetTemporizador] = useState(false); // Para reiniciar el temporizador cuando cambiamos de pregunta
  const [temporizadorPausado, setTemporizadorPausado] = useState(false); // Para pausar el temporizador
  const [preguntaActual, setPreguntaActual] = useState(null); // Para guardar la pregunta actual
  const [mostrarRespuesta, setMostrarRespuesta] = useState(false); // Para controlar la visualización de la respuesta
  const [respuestaMostrada, setRespuestaMostrada] = useState(false);

  // ==================== REFERENCIAS ====================
  // Para almacenar el turno actual
  const turnoRef = useRef(turno);

  // ==================== HOOKS PERSONALIZADOS ====================
  // Hook personalizado para manejar puntajes
  const { sumarPuntaje, caballos } = usePuntajes(setGanador, navigate);

  // ==================== MANEJO DE PREGUNTAS ====================
  // Función para seleccionar una pregunta aleatoria
  /* Se genera un indice aleatorio entre 0 y 1 a través de la función Math.random(), 
  ese numero lo multiplicamos por la longitud del arreglo de preguntas y lo redondeamos
  hacia abajo con Math.floor(), de esta manera nunca generamos un indice fuera de rango */
  const seleccionarPreguntaAleatoria = useCallback(() => {
    const indiceAleatorio = Math.floor(Math.random() * preguntas.length);
    setPreguntaActual(preguntas[indiceAleatorio]);
  }, []);

  // ==================== EFECTOS ====================
  useEffect(() => {
    turnoRef.current = turno; // Sincronizamos la referencia con el estado de turno para evitar problemas de sincronización
  }, [turno]);

  useEffect(() => {
    if (juegoIniciado) {
      seleccionarPreguntaAleatoria(); // Cuando el juego inicia, seleccionamos una pregunta aleatoria
    }
  }, [juegoIniciado, seleccionarPreguntaAleatoria]);

  // ==================== MANEJADORES DE EVENTOS ====================

  // Función para pedir turno (botón rojo)
  const pedirTurno = useCallback(() => {
    if (turno !== null || tiempoAgotado) return; //RM

    setTurno("pendiente");
    setTemporizadorPausado(true);
    // Pausamos el temporizador durante 5 segundos para que el jugador pueda responder
    // Si no responde en ese tiempo, se considera que el tiempo se ha agotado
    // Y se reanuda el temporizador principal
    const timeoutId = setTimeout(() => {
      if (turnoRef.current === "pendiente") {
        setTemporizadorPausado(false);
        setTurno(null);
      }
    }, TIEMPO_TURNO);

    return () => clearTimeout(timeoutId); // Limpiamos para evitar errores
  }, [turno, tiempoAgotado]); //RM TIEMPO_TURNO

  /**
   * Reinicia todos los estados al cambiar de pregunta
   */
  const cambiarPregunta = useCallback(() => {
    seleccionarPreguntaAleatoria(); // Seleccionamos una nueva pregunta aleatoria
    setResetTemporizador((prev) => !prev);
    setTurno(null);
    setTiempoAgotado(false);
    setMostrarRespuesta(false);
    setRespuestaMostrada(false);
    setTemporizadorPausado(false);
  }, [seleccionarPreguntaAleatoria]);

  /**
   * Maneja el evento de tiempo agotado
   * - Muestra la respuesta correcta
   * - Pausa el temporizador
   */
  const manejarTiempoAgotado = () => {
    setTiempoAgotado(true);
    setMostrarRespuesta(true);
    setRespuestaMostrada(true);
    setTemporizadorPausado(true);
  };

  // Esta función se ejecuta cuando el jugador presiona el botón de mostrar respuesta
  // Cuando se muestra la respuesta, se pausa el temporizador y se muestra la respuesta correcta
  const handleMostrarRespuesta = useCallback(() => {
    setMostrarRespuesta(true);
    setRespuestaMostrada(true);
    setTemporizadorPausado(true);
  }, []);

  // Función que coordina turnos y puntajes
  const manejarSumarPuntaje = (jugador) => {
    if (turno !== "pendiente") return;

    setTurno(jugador);
    setTemporizadorPausado(true);
    sumarPuntaje(jugador, turno);
  };

  return (
    // Creamos el contenedor principal del juego
    // Dentro de este contenedor, incluimos el temporizador, la pista y el panel de preguntas
    <div className="fondo">
      <div className="contenido">
        <Temporizador
          onTiempoAgotado={manejarTiempoAgotado}
          reset={resetTemporizador}
          pausado={temporizadorPausado || mostrarRespuesta}
        />
        <Pista caballos={caballos} />
        <PanelDePreguntas
          preguntaActual={preguntaActual}
          turno={turno}
          temporizadorPausado={temporizadorPausado}
          onPedirTurno={pedirTurno}
          onSumarPuntaje={manejarSumarPuntaje}
          onMostrarRespuesta={handleMostrarRespuesta}
          onCambiarPregunta={cambiarPregunta}
          mostrarRespuesta={mostrarRespuesta}
          tiempoAgotado={tiempoAgotado}
          respuestaMostrada={respuestaMostrada}
          setMostrarRespuesta={setMostrarRespuesta}
          setRespuestaMostrada={setRespuestaMostrada}
        />
      </div>
    </div>
  );
}

export default Juego;
