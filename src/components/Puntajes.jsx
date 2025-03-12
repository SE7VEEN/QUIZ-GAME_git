import "../assets/styles/Puntajes.css";

const Puntajes = ({ puntajeJugador1, puntajeJugador2 }) => {
  return (
    <div className="puntajes-container">
      <h3>Puntajes</h3>
      <div className="puntajes">
        <div className="jugador">
          <span>Jugador 1</span>
          <span>{puntajeJugador1}</span>
        </div>
        <div className="jugador">
          <span>Jugador 2</span>
          <span>{puntajeJugador2}</span>
        </div>
      </div>
    </div>
  );
};

export default Puntajes;
