import Caballo from "./Caballo";
import "../assets/styles/Pista.css";
import pistaImage from "/src/images/pista.jpg";
import metaImage from "/src/images/Meta.jpg";

const Pista = ({ caballos }) => {
  return (
    <div
      className="pista"
      style={{ backgroundImage: `url(${pistaImage})` }} // Usar la imagen de la pista
    >
      <div className="meta">
        <img src={metaImage} alt="Meta" className="meta-imagen" />{" "}
        {/* Usar la imagen de la meta */}
      </div>
      {caballos.map((caballo, index) => (
        <Caballo
          key={index}
          nombre={caballo.nombre}
          progreso={caballo.progreso}
          imagen={caballo.imagen}
        />
      ))}
    </div>
  );
};

export default Pista;
