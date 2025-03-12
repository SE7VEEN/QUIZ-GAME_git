import { useState } from "react";
import PanelDePreguntas from "./components/PanelDePreguntas";
import Puntajes from "./components/Puntajes";
import MenuInicio from "./components/MenuInicio";
import BotonTurno from "./components/BotonTurno";
import Temporizador from "./components/Temporizador";
import Pista from "./components/Pista";

import caballo1 from "/src/images/Caballo1.png";
import caballo2 from "/src/images/Caballo2.png";

function App() {
  const [juegoIniciado, setJuegoIniciado] = useState(false);
  const [puntajeJugador1, setPuntajeJugador1] = useState(0);
  const [puntajeJugador2, setPuntajeJugador2] = useState(0);
  const [turno, setTurno] = useState(null);
  const [resetTemporizador, setResetTemporizador] = useState(false);
  const [indicePregunta, setIndicePregunta] = useState(0);
  const [ganador, setGanador] = useState(null);

  const caballos = [
    {
      nombre: "Jugador 1",
      progreso: puntajeJugador1 * 10, // Para controlar el avance de los caballos
      imagen: caballo1,
    },
    {
      nombre: "Jugador 2",
      progreso: puntajeJugador2 * 10,
      imagen: caballo2,
    },
  ];

  //Aumenta el puntaje del jugador correspondien
  const manejarRespuesta = (esCorrecta) => {
    if (esCorrecta) {
      if (turno === "jugador1") {
        setPuntajeJugador1((prev) => prev + 1);
        if (puntajeJugador1 + 1 === 10) {
          setGanador("Jugador 1"); // Declarar al Jugador 1 como ganador
          return;
        }
      } else if (turno === "jugador2") {
        setPuntajeJugador2((prev) => prev + 1);
        if (puntajeJugador2 + 1 === 10) {
          setGanador("Jugador 2"); // Declarar al Jugador 2 como ganador
          return;
        }
      }
    }

    setTurno(null); // Reinicia el turno después de responder
    cambiarPregunta(); // Cambiar a la siguiente pregunta
  };

  const cambiarPregunta = () => {
    setIndicePregunta((prev) => prev + 1); // Cambiar a la siguiente pregunta
    setResetTemporizador((prev) => !prev); // Reinicia el temporizador
  };

  //Reinicia todos los estados a sus valores iniciales
  const iniciarJuego = () => {
    setJuegoIniciado(true);
    setPuntajeJugador1(0);
    setPuntajeJugador2(0);
    setTurno(null);
    setIndicePregunta(0);
    setResetTemporizador((prev) => !prev);
    setGanador(null);
  };

  const pedirTurno = (jugador) => {
    setTurno(jugador); // Asigna el turno al jugador que lo pidió
  };

  const manejarTiempoAgotado = () => {
    // Cambiar la pregunta automáticamente cuando el tiempo se agota
    cambiarPregunta();
  };

  return (
    <div>
      {!juegoIniciado ? (
        <MenuInicio onStart={iniciarJuego} /> //Muestra el Menu de incio si no ha iniciado el juego
      ) : (
        <>
          {ganador ? (
            <div className="ganador">
              <h2>¡{ganador} ha ganado la carrera! 🎉</h2>
              <button onClick={iniciarJuego}>Reiniciar Juego</button>
            </div>
          ) : (
            //Muestra todos los elementos
            <>
              <Temporizador
                onTiempoAgotado={manejarTiempoAgotado}
                reset={resetTemporizador}
              />
              <Pista caballos={caballos} />
              <PanelDePreguntas
                indicePregunta={indicePregunta}
                onAnswerSelected={manejarRespuesta}
                turnoActual={turno}
              />
              <Puntajes
                puntajeJugador1={puntajeJugador1}
                puntajeJugador2={puntajeJugador2}
              />
              <div className="botones-turno">
                <BotonTurno
                  jugador="jugador1"
                  turnoActual={turno}
                  onPedirTurno={pedirTurno}
                />
                <BotonTurno
                  jugador="jugador2"
                  turnoActual={turno}
                  onPedirTurno={pedirTurno}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
