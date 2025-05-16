import { useEffect, useState } from "react";
import "../../assets/styles/HistorialPartidas.css";
import { playSound } from "../musicaManager";

/**
 * HISTORIAL DE PARTIDAS
 *
 * Muestra un registro de las últimas 5 partidas jugadas con:
 * - Fecha y hora de la partida
 * - Nombre del ganador
 * - Puntaje de ambos jugadores
 * - Opción para borrar el historial
 */

function HistorialPartidas() {
  // Estado para almacenar el historial de partidas
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    // Cargarmos el historial desde localStorage
    // y lo guardamos en el estado del componente
    const historialGuardado =
      JSON.parse(localStorage.getItem("historialPartidas")) || [];
    setHistorial(historialGuardado);
  }, []);

  const limpiarHistorial = () => {
    playSound("desplegar");
    // Eliminamos definitivamente el historial del localStorage
    localStorage.removeItem("historialPartidas");
    // Actualizamos el estado para reflejar el cambio
    setHistorial([]);
  };

  return (
    //Creamos un contenedor para el historial de partidas.
    //Dentro de este contenedor, mostramos un título y una lista de partidas (fecha, ganador, puntaje), solo se muestran las ultimas 5 partidas.
    //Si no hay partidas registradas, mostramos un mensaje indicando que no hay historial.
    //También incluimos un botón para limpiar el historial.

    <div className="historial-container">
      {/* Título del historial */}
      <h2>Últimas 5 partidas</h2>

      {historial.length === 0 ? (
        // Mensaje para cuando no haya partidas registradas
        <p className="sin-historial">No hay partidas registradas</p>
      ) : (
        <>
          <ul className="lista-partidas">
            {historial.map((partida, index) => (
              // Cada partida tiene una key única
              <li key={index} className="partida-item">
                {/* Fecha de la partida formateada */}
                <span className="fecha">
                  {new Date(partida.fecha).toLocaleString()}
                </span>
                {/* Nombre del ganador */}
                <span className="ganador">{partida.ganador}</span>
                {/* Puntajes de ambos jugadores */}
                <span className="puntajes">
                  {partida.puntajeJugador1} - {partida.puntajeJugador2}
                </span>
              </li>
            ))}
          </ul>
          {/* Botón para limpiar el historial */}
          <button
            onClick={limpiarHistorial}
            className="boton-limpiar"
            aria-label="Limpiar historial de partidas"
          >
            Limpiar historial
          </button>
        </>
      )}
    </div>
  );
}

export default HistorialPartidas;
