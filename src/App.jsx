import { useState, useRef, useEffect } from "react";
import PanelDePreguntas from "./components/PanelDePreguntas";
import Puntajes from "./components/Puntajes";
import MenuInicio from "./components/MenuInicio";
import Temporizador from "./components/Temporizador";
import Pista from "./components/Pista";
import caballo1 from "/src/images/Caballo1.png";
import caballo2 from "/src/images/Caballo2.png";
import preguntas from "./data/preguntas";
import "./App.css";

function App() {
  const [juegoIniciado, setJuegoIniciado] = useState(false); //Para indicar si el juego ha iniciado
  const [puntajeJugador1, setPuntajeJugador1] = useState(0); //Almacenamos los puntajes de ambos jugadores
  const [puntajeJugador2, setPuntajeJugador2] = useState(0);
  const [turno, setTurno] = useState(null); // Para saber quien tiene el turno "jugador1" o "jugador2"
  const [resetTemporizador, setResetTemporizador] = useState(false); //Reiniciamos cuando cambiamos de pregunta
  const [ganador, setGanador] = useState(null); //Guardamos el ganador
  const [temporizadorPausado, setTemporizadorPausado] = useState(false); //Para pausar el temporizador
  const [mostrarRespuesta, setMostrarRespuesta] = useState(false); //Para controlar la visualización de la respuesta
  const [respuestaMostrada, setRespuestaMostrada] = useState(false);
  const [tiempoAgotado, setTiempoAgotado] = useState(false); //Para saber si el tiempo se agotó
  const [preguntaActual, setPreguntaActual] = useState(null); // Guarda la pregunta actual

  const AVANCE_CABALLO = 90; //Cada punto equivale a 90px
  const TIEMPO_TURNO = 5000; // 5 segundos para el jugador en turno

  //Para almacenar el turno actual
  const turnoRef = useRef(turno);

  useEffect(() => {
    turnoRef.current = turno;
  }, [turno]);

  // Función para seleccionar una pregunta aleatoria
  const seleccionarPreguntaAleatoria = () => {
    const indiceAleatorio = Math.floor(Math.random() * preguntas.length); // Generamos un índice aleatorio
    setPreguntaActual(preguntas[indiceAleatorio]); // Establecemos la pregunta actual
  };

  // Controla el avance de los caballos
  const caballos = [
    {
      progreso: puntajeJugador1 * AVANCE_CABALLO,
      imagen: caballo1,
    },
    {
      progreso: puntajeJugador2 * AVANCE_CABALLO,
      imagen: caballo2,
    },
  ];

  // Función para pedir turno (botón rojo)
  const pedirTurno = () => {
    if (turno !== null || tiempoAgotado || respuestaMostrada) return; //Si hay un turno activo, el tiempo se agotó o se mostró la respuesta no hace nada
    setTurno("pendiente"); // Marcamos que un jugador ha pedido turno
    setTemporizadorPausado(true); // Pausamos el temporizador

    // Si después de 5 segundos no se responde, se reinicia el turno
    setTimeout(() => {
      if (turnoRef.current === "pendiente") {
        setTemporizadorPausado(false); // Reanudamos el temporizador
        setTurno(null); // Reiniciamoa el turno
      }
    }, TIEMPO_TURNO);
  };

  // Función para sumar puntos (botones para puntajes)
  const sumarPuntaje = (jugador) => {
    if (turno === "pendiente") {
      setTurno(jugador); // Asignamos el turno al jugador que presionó el botón azul
      setTemporizadorPausado(true); // Pausamos el temporizador

      //Asignamos el puntaje al jugador correspondiente
      const nuevoPuntaje =
        jugador === "jugador1" ? puntajeJugador1 + 1 : puntajeJugador2 + 1;

      //Si el puntaje llega a 10, declaramos al ganador
      if (nuevoPuntaje === 10) {
        setGanador(`Jugador ${jugador === "jugador1" ? 1 : 2}`);
        return;
      }

      // Actualizamos el puntaje en pantalla del jugador correspondiente
      if (jugador === "jugador1") {
        setPuntajeJugador1(nuevoPuntaje);
      } else {
        setPuntajeJugador2(nuevoPuntaje);
      }

      // Mostramos la respuesta correcta
      setMostrarRespuesta(true);
      setRespuestaMostrada(true);
    }
  };

  // Cuando se cambia de pregunta reiniciamos los estados relevantes:
  const cambiarPregunta = () => {
    seleccionarPreguntaAleatoria(); // Seleccionamos una nueva pregunta aleatoria
    setResetTemporizador((prev) => !prev);
    setTurno(null);
    setTiempoAgotado(false);
    setMostrarRespuesta(false);
    setRespuestaMostrada(false);
    setTemporizadorPausado(false);
  };

  //Si el tiempo se agota y nadie responde mostramos la respuesta correcta
  const manejarTiempoAgotado = () => {
    setTiempoAgotado(true);
    setMostrarRespuesta(true);
    setRespuestaMostrada(true);
    setTemporizadorPausado(true);
  };

  // Función para reiniciar el juego
  //Reiniciamos todos los estados
  const iniciarJuego = () => {
    setJuegoIniciado(true);
    setPuntajeJugador1(0);
    setPuntajeJugador2(0);
    setTurno(null);
    seleccionarPreguntaAleatoria();
    setResetTemporizador((prev) => !prev);
    setGanador(null);
    setTemporizadorPausado(false);
    setMostrarRespuesta(false);
    setTiempoAgotado(false);
    setRespuestaMostrada(false);
  };

  return (
    <div className="fondo">
      <div className="contenido">
        {!juegoIniciado ? ( //Si el juego no ha iniciado mostramos el menú de inicio
          <MenuInicio onStart={iniciarJuego} />
        ) : (
          <>
            {ganador ? ( //Si ya hay un ganador lo mostramos junto a un botón para reiniciar el juego
              <div className="ganador">
                <h2>¡{ganador} ha ganado la carrera! 🎉</h2>
                <button onClick={iniciarJuego}>Reiniciar Juego</button>
              </div>
            ) : (
              //Si no hay ganador mostramos el temporizador, la pista, el panel de preguntas y los puntajes
              <>
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
                  onMostrarRespuesta={() => {
                    setMostrarRespuesta(true);
                    setRespuestaMostrada(true);
                    setTemporizadorPausado(true);
                  }}
                  onCambiarPregunta={cambiarPregunta}
                  mostrarRespuesta={mostrarRespuesta}
                  tiempoAgotado={tiempoAgotado}
                  respuestaMostrada={respuestaMostrada}
                  setMostrarRespuesta={setMostrarRespuesta}
                  setRespuestaMostrada={setRespuestaMostrada}
                />
                <Puntajes
                  puntajeJugador1={puntajeJugador1}
                  puntajeJugador2={puntajeJugador2}
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
