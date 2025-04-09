import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";

import PanelDePreguntas from "./PanelDePreguntas";
import Temporizador from "./Temporizador";
import Pista from "./Pista";
import caballo1 from "../images/Caballo4.png";
import caballo2 from "../images/Caballo3.png";
import preguntas from "../data/preguntas";
import "../assets/styles/Juego.css";

function Juego({ juegoIniciado, setGanador }) {
  const [turno, setTurno] = useState(null); // Para saber quien tiene el turno "jugador1" o "jugador2"
  const [tiempoAgotado, setTiempoAgotado] = useState(false); //Para saber si el tiempo se agotó

  const [puntajeJugador1, setPuntajeJugador1] = useState(0); //Almacenamos los puntajes de ambos jugadores
  const [puntajeJugador2, setPuntajeJugador2] = useState(0);

  const [resetTemporizador, setResetTemporizador] = useState(false); //Para reiniciar el temporizador cuando cambiamos de pregunta
  const [temporizadorPausado, setTemporizadorPausado] = useState(false); //Para pausar el temporizador

  const [preguntaActual, setPreguntaActual] = useState(null); //Para guardar la pregunta actual

  const [mostrarRespuesta, setMostrarRespuesta] = useState(false); //Para controlar la visualización de la respuesta
  const [respuestaMostrada, setRespuestaMostrada] = useState(false);

  const navigate = useNavigate();

  const AVANCE_CABALLO = 80; //Cada punto equivale a 80px
  const TIEMPO_TURNO = 5000; // 5 segundos para el jugador en turno
  const TOTAL_PREGUNTAS = 3; //El juego finaliza cuando un jugador llega a 10 puntos

  //Para almacenar el turno actual
  const turnoRef = useRef(turno);

  // Función para seleccionar una pregunta aleatoria
  /*Se gener un indice aleatorio ente 0 y 1 a travez de la función Math.random(), 
  ese numero lo multiplicamos por la longitud del arreglo de preguntas y lo redondeamos
  hacia abajo con Math.floor(), de esta manera nunca generamos un indice fuera de rango */
  const seleccionarPreguntaAleatoria = useCallback(() => {
    const indiceAleatorio = Math.floor(Math.random() * preguntas.length);
    setPreguntaActual(preguntas[indiceAleatorio]);
  }, []);

  useEffect(() => {
    turnoRef.current = turno; //Sincronizamos la referencia con el estado de turno para evitar problemas de sincronización
  }, [turno]);

  useEffect(() => {
    if (juegoIniciado) {
      seleccionarPreguntaAleatoria(); //Cuando el juego inicia, seleccionamos una pregunta aleatoria
    }
  }, [juegoIniciado, seleccionarPreguntaAleatoria]);

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

  // Función para pedir turno (botón rojo)

  const pedirTurno = useCallback(() => {
    if (turno !== null || tiempoAgotado || respuestaMostrada) return;

    setTurno("pendiente");
    setTemporizadorPausado(true);
    //Pausamos el temporizador durante 5 segundos para que el jugador pueda responder
    //Si no responde en ese tiempo, se considera que el tiempo se ha agotado
    //Y se reanuda el temporizador principal
    const timeoutId = setTimeout(() => {
      if (turnoRef.current === "pendiente") {
        setTemporizadorPausado(false);
        setTurno(null);
      }
    }, TIEMPO_TURNO);

    return () => clearTimeout(timeoutId); //Limpiamos para evitar errores
  }, [turno, tiempoAgotado, respuestaMostrada, TIEMPO_TURNO]);

  // Función para actualizar el puntaje de un jugador
  const actualizarPuntaje = (jugador, nuevoPuntaje) => {
    if (jugador === "jugador1") {
      setPuntajeJugador1(nuevoPuntaje);
    } else {
      setPuntajeJugador2(nuevoPuntaje);
    }
  };

  // Verifica si algún jugador ha ganado
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
    [setGanador, navigate, TOTAL_PREGUNTAS, puntajeJugador1, puntajeJugador2]
  );

  // Función para sumar puntos (botones para puntajes)
  const sumarPuntaje = useCallback(
    (jugador) => {
      if (turno !== "pendiente") return; //Si no hay un turno activo no se puede sumar puntaje

      setTurno(jugador); //Asignamos el turno al jugador que respondió
      setTemporizadorPausado(true); //Pausamos el temporizador

      const nuevoPuntaje =
        jugador === "jugador1" ? puntajeJugador1 + 1 : puntajeJugador2 + 1;

      if (verificarGanador(jugador, nuevoPuntaje)) return; //Si hay un ganador, no se actualiza el puntaje

      actualizarPuntaje(jugador, nuevoPuntaje); // Actualizamos el puntaje del jugador que respondió
    },
    [turno, puntajeJugador1, puntajeJugador2, verificarGanador]
  );

  // Cuando se cambia de pregunta reiniciamos los estados relevantes:
  const cambiarPregunta = useCallback(() => {
    seleccionarPreguntaAleatoria(); // Seleccionamos una nueva pregunta aleatoria
    setResetTemporizador((prev) => !prev);
    setTurno(null);
    setTiempoAgotado(false);
    setMostrarRespuesta(false);
    setRespuestaMostrada(false);
    setTemporizadorPausado(false);
  }, [seleccionarPreguntaAleatoria]);

  //Si el tiempo se agota y nadie responde mostramos la respuesta correcta
  const manejarTiempoAgotado = () => {
    setTiempoAgotado(true);
    setMostrarRespuesta(true);
    setRespuestaMostrada(true);
    setTemporizadorPausado(true);
  };

  //Esta función se ejecuta cuando el jugador presiona el botón de mostrar respuesta
  //Cuando se muestra la respuesta, se pausa el temporizador y se muestra la respuesta correcta
  const handleMostrarRespuesta = useCallback(() => {
    setMostrarRespuesta(true);
    setRespuestaMostrada(true);
    setTemporizadorPausado(true);
  }, []);

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
          onSumarPuntaje={sumarPuntaje}
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
