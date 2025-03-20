import "../assets/styles/BotonAyuda.css";

const BotonAyuda = ({ onClick }) => {
  return (
    <button className="boton-ayuda" onClick={onClick}>
      Mostrar Respuesta
    </button>
  );
};

export default BotonAyuda;
