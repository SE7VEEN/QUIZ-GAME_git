import "../../../assets/styles/Caballo.css";

// Este componente recibe el nombre del caballo, su imagen y su progreso como props.
//// El progreso se utiliza para mover el caballo a lo largo de la pista.
const Caballo = ({ nombre, progreso, imagen }) => {
  return (
    <div
      className="caballo"
      style={{ transform: `translate(${progreso}%)` }} // Movemos el caballo con el nombre del jugador
    >
      <div className="caballo-nombre">{nombre}</div>
      <div className="caballo-progreso">
        <img src={imagen} alt={nombre} className="caballo-imagen" />
      </div>
    </div>
  );
};
export default Caballo;
