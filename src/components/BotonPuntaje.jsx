import "../assets/styles/BotonPuntaje.css";

const BotonPuntaje = ({ onClick, jugador, disabled }) => {
  return (
    <button className="boton-puntaje" onClick={onClick} disabled={disabled}>
      Puntaje {jugador}
    </button>
  );
};

export default BotonPuntaje;
