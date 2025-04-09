import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import MenuInicio from "./components/MenuInicio";
import Juego from "./components/Juego";
import ResultadosFinales from "./components/ResultadosFinales";

//Este componente es el que se encarga de manejar la navegacion entre las diferentes vistas de la aplicacion
//y de gestionar el estado del juego, como el inicio del juego, los resultados y el historial de partidas.

function App() {
  const [juegoIniciado, setJuegoIniciado] = useState(false); //Indica si el juego esta iniciado
  //Guarda la informacion del ganador, los puntajes de cada jugador y la fecha de la partida
  const [resultados, setResultados] = useState({
    ganador: null,
    puntajeJugador1: 0,
    puntajeJugador2: 0,
    fecha: null,
  });
  const [historial, setHistorial] = useState([]); //Guarda las partidas anteriores (maximo 5)
  const navigate = useNavigate(); // Hook para controlar la navegacion

  //Buscamos en el localStorage el historial de partidas y lo cargamos al estado
  //si no existe, inicializamos el historial como un array vacio
  useEffect(() => {
    const historialGuardado =
      JSON.parse(localStorage.getItem("historialPartidas")) || [];
    setHistorial(historialGuardado);
  }, []);

  const iniciarJuego = () => {
    setJuegoIniciado(true); // Cambiamos el estado del juego a iniciado
    // Reiniciamos los resultados
    setResultados({
      ganador: null,
      puntajeJugador1: 0,
      puntajeJugador2: 0,
      fecha: null,
    });
    //Redirigimos a la pantalla de juego
    navigate("/juego");
  };

  const reiniciarJuego = () => {
    setJuegoIniciado(false);
    navigate("/"); //Volvemos al menu de inicio
  };

  // Función para establecer el ganador y actualizar el historial
  const setGanador = (resultado) => {
    // Actualizamos los resultados
    setResultados(resultado);

    // Actualizamos el historial
    const nuevoHistorial = [resultado, ...historial].slice(0, 5);
    setHistorial(nuevoHistorial);
    localStorage.setItem("historialPartidas", JSON.stringify(nuevoHistorial));
  };

  //Configuramos las rutas de la aplicacion

  return (
    <Routes>
      <Route
        path="/"
        //El componente MenuInicio recibe la funcion iniciarJuego y el historial de partidas
        element={
          <MenuInicio onIniciarJuego={iniciarJuego} historial={historial} />
        }
      />
      <Route
        path="/juego"
        //El componente Juego recibe el estado del juego y la funcion setGanador
        element={
          juegoIniciado ? (
            <Juego juegoIniciado={juegoIniciado} setGanador={setGanador} />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route
        path="/resultados"
        //El componente ResultadosFinales recibe el ganador, los puntajes de cada jugador y las funciones para reiniciar el juego y volver al menu
        element={
          resultados.ganador ? (
            <ResultadosFinales
              ganador={resultados.ganador}
              puntajeJugador1={resultados.puntajeJugador1}
              puntajeJugador2={resultados.puntajeJugador2}
              reiniciarJuego={iniciarJuego}
              volverAlMenu={reiniciarJuego}
            />
          ) : (
            //Si no hay resultados o el juego no ha iniciado, redirigimos al usuario al menu de inicio
            <Navigate to="/" replace />
          )
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
      {/*Si la ruta no existe, redirigimos al usuario al menu de inicio */}
    </Routes>
  );
}

//Se encarga de envolver la aplicacion en el Router, lo que permite usar las rutas en la aplicacion
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
