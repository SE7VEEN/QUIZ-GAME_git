import "../assets/styles/BotonTurno.css";

const BotonTurno = ({ jugador, turnoActual, onPedirTurno }) => {
  //Jugador, el jugador con el turno actal y una funcion que se ejecuta cuando el jugador hace click en el boton
  const esTurnoDelJugador = turnoActual === jugador; //Compara turnoActual con jugador. Si son iguales, el jugador tiene el turno

  //Renderizado del boton
  return (
    <button
      className={`boton-turno ${esTurnoDelJugador ? "activo" : ""}`} //Es para aplicar estilos en el caso que esTurnoDelJugador sea true
      onClick={() => onPedirTurno(jugador)}
      disabled={turnoActual !== null && !esTurnoDelJugador} //Si el turnoActual no es null y no es el turno del jugador, el boton se deshabilita
    >
      {esTurnoDelJugador
        ? `Es tu turno (${jugador})` //Se muestra un mensaje dependiendo del estado del boton
        : `Pedir turno (${jugador})`}
    </button>
  );
};

export default BotonTurno;
