import { useState } from "react";
import MenuInicio from "./components/MenuInicio";
//import TableroJuego from "./components/TableroJuego";
import PanelDePreguntas from "./components/PanelDePreguntas";

const App = () => {
  const [juegoIniciado, setJuegoIniciado] = useState(false);
  const [puntajeFinal, setPuntajeFinal] = useState(null);

  return (
    <div>
      {!juegoIniciado ? (
        <MenuInicio onStart={() => setJuegoIniciado(true)} />
      ) : puntajeFinal === null ? (
        <PanelDePreguntas onGameOver={(puntaje) => setPuntajeFinal(puntaje)} />
      ) : (
        <div className="resultado">
          <h2>Juego Terminado</h2>
          <p>Tu puntaje final es: {puntajeFinal}</p>
          <button
            onClick={() => {
              setJuegoIniciado(false);
              setPuntajeFinal(null);
            }}
          >
            Volver a Jugar
          </button>
        </div>
      )}
    </div>
  );
};
export default App;
