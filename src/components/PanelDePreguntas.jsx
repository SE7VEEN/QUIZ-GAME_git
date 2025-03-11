import { useState } from "react";
import preguntas from "../data/preguntas";
import "../assets/styles/PanelDePreguntas.css";

const PanelDePreguntas = ({ onGameOver }) => {
  const [indicePregunta, setIndicePregunta] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);

  const preguntaActual = preguntas[indicePregunta];

  const manejarRespuesta = (respuesta) => {
    setRespuestaSeleccionada(respuesta);

    setTimeout(() => {
      if (respuesta === preguntaActual.respuestaCorrecta) {
        setPuntaje(puntaje + 1);
      }

      if (indicePregunta + 1 < preguntas.length) {
        setIndicePregunta(indicePregunta + 1);
        setRespuestaSeleccionada(null);
      } else {
        onGameOver(
          puntaje + (respuesta === preguntaActual.respuestaCorrecta ? 1 : 0)
        );
      }
    }, 1000);
  };

  return (
    <div className="panel-preguntas">
      <h2>{preguntaActual.pregunta}</h2>
      <div className="opciones">
        {preguntaActual.opciones.map((opcion, index) => (
          <button
            key={index}
            className={`opcion ${
              respuestaSeleccionada === opcion ? "seleccionada" : ""
            }`}
            onClick={() => manejarRespuesta(opcion)}
            disabled={respuestaSeleccionada !== null}
          >
            {opcion}
          </button>
        ))}
      </div>
      <p>Puntaje: {puntaje}</p>
    </div>
  );
};

export default PanelDePreguntas;
