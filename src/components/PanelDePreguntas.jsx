import React, { useState } from "react";
import preguntas from "../data/preguntas";
import "../assets/styles/PanelDePreguntas.css";

const PanelDePreguntas = ({
  indicePregunta,
  onAnswerSelected, //Funcion que se ejecuta cuando el jugador selecciona una respuesta
  turnoActual,
}) => {
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null); // Guardar la respuesta seleccionada por el jugador

  const preguntaActual = preguntas[indicePregunta];

  const manejarRespuesta = (respuesta) => {
    if (turnoActual === null) return; // Solo se ejcuta si un jugador solicitó un turno

    setRespuestaSeleccionada(respuesta); //Se actualiza con la opcion del jugador

    setTimeout(() => {
      const esCorrecta = respuesta === preguntaActual.respuestaCorrecta;
      onAnswerSelected(esCorrecta); // Notifica si la respuesta fue correcta o incorrecta
      setRespuestaSeleccionada(null); // Reinicia la respuesta seleccionada
    }, 1000);
  };

  return (
    <div className="panel-preguntas">
      <h2>{preguntaActual.pregunta}</h2>
      <div className="opciones">
        {preguntaActual.opciones.map(
          (
            opcion,
            index //Renderiza un boton para cada opcion
          ) => (
            <button
              key={index} //ID unico para cada boton
              className={`opcion ${
                respuestaSeleccionada === opcion ? "seleccionada" : ""
              }`}
              onClick={() => manejarRespuesta(opcion)}
              disabled={respuestaSeleccionada !== null || turnoActual === null} // Deshabilita los botones si ya se seleccionó una respuesta o si no hay un jugador en turno
            >
              {opcion}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default PanelDePreguntas;
