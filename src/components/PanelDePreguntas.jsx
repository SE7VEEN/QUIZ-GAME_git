import React from "react";
import BotonRojo from "./BotonRojo";
import BotonPuntaje from "./BotonPuntaje";
import BotonAyuda from "./BotonAyuda";
import BotonCambiarPregunta from "./BotonCambiarPregunta";
import CuadroEmergenteRespuesta from "./CuadroEmergenteRespuesta";
import "../assets/styles/PanelDePreguntas.css";

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
  if (!preguntaActual) {
    return <div className="panel-preguntas">No hay pregunta disponible.</div>;
  } //Si no hay preguntas disponible mostramos un mensaje

  const { pregunta, respuestaCorrecta } = preguntaActual; //Si la hay, extraemos la pregunta con su respuesta

  //Los botones se deshabilitan dependiendo del estado del juego
  const botonRojoDisabled =
    turno !== null || tiempoAgotado || respuestaMostrada;
  const botonAyudaDisabled = tiempoAgotado;
  const botonPuntajeDisabled = turno !== "pendiente" || tiempoAgotado;

  return (
    //Los botones principales son el botón rojo, el botón de ayuda y el botón para cambiar de pregunta
    //Los botones de puntaje solo se muestran cuando un jugador ha pedido un turno, estan vinvulados al jugador correspondiente
    <div className="panel-preguntas">
      <h2>{pregunta}</h2>

      <div className="botones-contenedor">
        <BotonRojo onClick={onPedirTurno} disabled={botonRojoDisabled} />
        <BotonAyuda
          onClick={onMostrarRespuesta}
          disabled={botonAyudaDisabled}
        />
        <BotonCambiarPregunta onClick={onCambiarPregunta} />
      </div>
      {turno === "pendiente" && (
        <div className="botones-puntajes">
          <BotonPuntaje
            onClick={() => onSumarPuntaje("jugador1")}
            jugador="Jugador 1"
            disabled={botonPuntajeDisabled}
          />
          <BotonPuntaje
            onClick={() => onSumarPuntaje("jugador2")}
            jugador="Jugador 2"
            disabled={botonPuntajeDisabled}
          />
        </div>
      )}

      {mostrarRespuesta && ( //
        <CuadroEmergenteRespuesta
          respuesta={respuestaCorrecta}
          onClose={() => {
            setMostrarRespuesta(false);
            setRespuestaMostrada(true);
          }}
        />
      )}
    </div>
  );
};

export default PanelDePreguntas;
