import "../assets/styles/Caballo.css";

const Caballo = ({ nombre, progreso, imagen }) => {
  return (
    <div className="caballo">
      <div className="caballo-nombre">{nombre}</div>
      <div
        className="caballo-progreso"
        style={{ transform: `translateX(${progreso}%)` }} //Para mover el caballo horizontalmente segun el progreso
      >
        <img src={imagen} alt={nombre} className="caballo-imagen" />
      </div>
    </div>
  );
};

export default Caballo;
