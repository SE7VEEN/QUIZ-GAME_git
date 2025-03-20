import "../assets/styles/BotonCambiarPregunta.css";

const BotonCambiarPregunta = ({ onClick }) => {
  return (
    <button className="boton-cambiar" onClick={onClick}>
      Cambiar Pregunta
    </button>
  );
};

export default BotonCambiarPregunta;
