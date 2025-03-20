import "../assets/styles/BotonRojo.css";

const BotonRojo = ({ onClick, disabled }) => {
  return (
    <button className="boton-rojo" onClick={onClick} disabled={disabled}>
      Pedir Turno
    </button>
  );
};

export default BotonRojo;
