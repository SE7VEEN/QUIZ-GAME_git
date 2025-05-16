import React, { useCallback, useMemo } from "react";
import CuadroEmergenteRespuesta from "./CuadroEmergenteRespuesta";
import "../../../assets/styles/PanelDePreguntas.css";
import Botones from "./Botones";
import { playSound } from "../../musicaManager";

/**
 * COMPONENTE PRINCIPAL DEL JUEGO
 *
 * Muestra:
 * - La pregunta actual
 * - Controles de juego (turnos, respuestas, cambio de pregunta)
 * - Botones de puntuación
 * - Cuadro emergente de respuesta
 *
 */

//Recibimos las funciones y los estados necesarios
const PanelDePreguntas = ({
  preguntaActual,
  turno,
  onPedirTurno,
  onSumarPuntaje,
  onMostrarRespuesta,
  onCambiarPregunta,
  mostrarRespuesta,
  tiempoAgotado,
  respuestaMostrada,
  setMostrarRespuesta,
  setRespuestaMostrada,
}) => {
  // ==================== LÓGICA DE BOTONES ====================
  //Los botones se deshabilitan dependiendo del estado del juego
  const botonRojoDisabled = useMemo(
    () => turno !== null || tiempoAgotado,
    [turno, tiempoAgotado]
  );

  const botonAyudaDisabled = useMemo(() => tiempoAgotado, [tiempoAgotado]);

  const botonPuntajeDisabled = useMemo(
    () => turno !== "pendiente" || tiempoAgotado,
    [turno, tiempoAgotado]
  );
  // ==================== MANEJADORES DE EVENTOS ====================
  /*Las funciones están memorizadas con useCallback para evitar que cambien 
innecesariamente y así prevenir renders extra en los componentes*/
  const handlePedirTurno = useCallback(() => {
    playSound("botonTurno");
    onPedirTurno();
  }, [onPedirTurno]);

  const handleMostrarRespuesta = useCallback(() => {
    playSound("botonMostrar");
    onMostrarRespuesta();
  }, [onMostrarRespuesta]);

  const handleCambiarPregunta = useCallback(() => {
    playSound("botonCambiar");
    onCambiarPregunta();
  }, [onCambiarPregunta]);

  const handleCloseCuadroEmergente = useCallback(() => {
    playSound("botonMostrar");
    setMostrarRespuesta(false);
    setRespuestaMostrada(true);
  }, [setMostrarRespuesta, setRespuestaMostrada]);

  const handleSumarPuntajeJugador1 = useCallback(() => {
    playSound("caballo");
    onSumarPuntaje("jugador1");
  }, [onSumarPuntaje]);

  const handleSumarPuntajeJugador2 = useCallback(() => {
    playSound("caballo2");
    onSumarPuntaje("jugador2");
  }, [onSumarPuntaje]);

  // ==================== RENDERIZADO ====================
  if (!preguntaActual) {
    return <div className="panel-preguntas">No hay pregunta disponible.</div>;
  } //Si no hay preguntas disponible mostramos un mensaje

  const { pregunta, respuestaCorrecta } = preguntaActual; //Si la hay, extraemos la pregunta con su respuesta

  return (
    //Los botones principales son el botón rojo, el botón de ayuda y el botón para cambiar de pregunta
    //Los botones de puntaje solo se muestran cuando un jugador ha pedido un turno, cada uno esta vinvulado al jugador correspondiente
    <div className="panel-preguntas">
      <h2>{pregunta}</h2>

      <div className="botones-principales">
        <Botones
          onClick={handlePedirTurno}
          clase="boton-rojo"
          disabled={botonRojoDisabled}
        >
          Pedir Turno
        </Botones>
        <Botones
          onClick={handleMostrarRespuesta}
          clase="boton-ayuda"
          disabled={botonAyudaDisabled}
        >
          Mostrar Respuesta
        </Botones>
        <Botones onClick={handleCambiarPregunta} clase="boton-cambiar">
          Cambiar Pregunta
        </Botones>
      </div>
      {turno === "pendiente" && (
        <div className="botones-puntajes">
          <Botones
            onClick={handleSumarPuntajeJugador1}
            clase="boton-puntaje"
            disabled={botonPuntajeDisabled}
          >
            Jugador 1
          </Botones>
          <Botones
            onClick={handleSumarPuntajeJugador2}
            clase="boton-puntaje"
            disabled={botonPuntajeDisabled}
          >
            Jugador 2
          </Botones>
        </div>
      )}

      {mostrarRespuesta && ( //
        <CuadroEmergenteRespuesta
          respuesta={respuestaCorrecta}
          onClose={handleCloseCuadroEmergente}
        />
      )}
    </div>
  );
};

export default React.memo(PanelDePreguntas);
