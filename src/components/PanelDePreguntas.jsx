import React, { useCallback, useMemo } from "react";
import BotonPuntaje from "./BotonPuntaje";
import CuadroEmergenteRespuesta from "./CuadroEmergenteRespuesta";
import "../assets/styles/PanelDePreguntas.css";
import Botones from "./Botones";

//Recimos las funciones y los estados necesarios
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
  //Los botones se deshabilitan dependiendo del estado del juego
  const botonRojoDisabled = useMemo(
    () => turno !== null || tiempoAgotado || respuestaMostrada,
    [turno, tiempoAgotado, respuestaMostrada]
  );

  const botonAyudaDisabled = useMemo(() => tiempoAgotado, [tiempoAgotado]);

  const botonPuntajeDisabled = useMemo(
    () => turno !== "pendiente" || tiempoAgotado,
    [turno, tiempoAgotado]
  );
  //==================================================================
  /*Las funciones están memorizadas con useCallback para evitar que cambien 
innecesariamente y así prevenir renders extra en los componentes*/
  const handlePedirTurno = useCallback(() => {
    onPedirTurno();
  }, [onPedirTurno]);

  const handleMostrarRespuesta = useCallback(() => {
    onMostrarRespuesta();
  }, [onMostrarRespuesta]);

  const handleCambiarPregunta = useCallback(() => {
    onCambiarPregunta();
  }, [onCambiarPregunta]);

  const handleCloseCuadroEmergente = useCallback(() => {
    setMostrarRespuesta(false);
    setRespuestaMostrada(true);
  }, [setMostrarRespuesta, setRespuestaMostrada]);

  const handleSumarPuntajeJugador1 = useCallback(() => {
    onSumarPuntaje("jugador1");
  }, [onSumarPuntaje]);

  const handleSumarPuntajeJugador2 = useCallback(() => {
    onSumarPuntaje("jugador2");
  }, [onSumarPuntaje]);

  //==================================================================

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
          <BotonPuntaje
            onClick={handleSumarPuntajeJugador1}
            jugador="Jugador 1"
            disabled={botonPuntajeDisabled}
          />
          <BotonPuntaje
            onClick={handleSumarPuntajeJugador2}
            jugador="Jugador 2"
            disabled={botonPuntajeDisabled}
          />
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
