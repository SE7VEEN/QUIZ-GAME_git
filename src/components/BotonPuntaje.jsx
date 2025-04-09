import "../assets/styles/BotonPuntaje.css";

//Este componente permite actualizar el puntaje de cada jugador al hacer clic en el botón correspondiente.
const BotonPuntaje = ({ onClick, jugador, disabled }) => {
  return (
    <button className="boton-puntaje" onClick={onClick} disabled={disabled}>
      Puntaje {jugador}
    </button>
  );
};

export default BotonPuntaje;
