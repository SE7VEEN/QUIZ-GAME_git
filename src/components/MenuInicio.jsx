import "../assets/styles/MenuInicio.css";

const MenuInicio = ({ onStart }) => {
  return (
    <div className="menu-inicio">
      <h1 className="titulo">¡Bienvenido al Quiz Game!</h1>
      <button className="boton-iniciar" onClick={onStart}>
        Iniciar Juego
      </button>
    </div>
  );
};

export default MenuInicio;
