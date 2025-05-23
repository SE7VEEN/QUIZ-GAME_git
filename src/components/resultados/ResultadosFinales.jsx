import "../../assets/styles/ResultadosFinales.css";
import { playSound } from "../musicaManager";

/**
 * PESTAÑA DE RESULTADOS
 *
 * Mostramos el resumen de la partida con:
 * - Anuncio del ganador
 * - Desglose de puntajes
 * - Opción para reiniciar el juego
 *
 */

/*Recibimos las siguientes props del componente padre: el nombre del ganador, 
el puntaje de cada jugador y la función para reiniciar el juego.
 */
function ResultadosFinales({
  ganador,
  puntajeJugador1,
  puntajeJugador2,
  reiniciarJuego,
}) {
  // Función que maneja el clic del botón reiniciar
  const handleReiniciar = () => {
    playSound("iniciar"); // Reproducimos un sonido al hacer clic
    reiniciarJuego(); // Llamamos a la función para reiniciar el juego
  };

  return (
    //Creamos un contenedor para los resultados de la carrera.
    //Dentro de este contenedor, mostramos el nombre del ganador y los puntajes de cada jugador.
    //También incluimos un botón para reiniciar el juego.
    <div className="contenedor-resultados">
      <h1 className="titulo-ganador">¡{ganador} ha ganado!</h1>

      <div className="puntajes-finales">
        <h2>Puntajes </h2>
        <div className="puntaje-jugador">
          <span>Jugador 1:</span>
          <span className="puntos">{puntajeJugador1} puntos</span>
        </div>
        <div className="puntaje-jugador">
          <span>Jugador 2:</span>
          <span className="puntos">{puntajeJugador2} puntos</span>
        </div>
      </div>

      <div className="botones-accion">
        {/* Botón para reiniciar el juego */}
        <button className="boton-reiniciar" onClick={handleReiniciar}>
          Jugar de nuevo
        </button>
      </div>
    </div>
  );
}

export default ResultadosFinales;
