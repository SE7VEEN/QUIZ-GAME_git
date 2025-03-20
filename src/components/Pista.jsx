import Caballo from "./Caballo";
import "../assets/styles/Pista.css";
import pistaImage from "/src/images/pista.jpg";
import metaImage from "/src/images/Meta.jpg";

const Pista = ({ caballos }) => {
  return (
    <div className="pista-container">
      {caballos.map((caballo, index) => (
        <div
          key={index}
          className="pista"
          style={{ backgroundImage: `url(${pistaImage})` }} // Imagen de fondo de la pista
        >
          <div className="meta">
            <img src={metaImage} alt="Meta" className="meta-imagen" />{" "}
            {/* Imagen de la meta */}
          </div>
          <Caballo
            nombre={caballo.nombre}
            progreso={caballo.progreso}
            imagen={caballo.imagen}
          />
        </div>
      ))}
    </div>
  );
};

export default Pista;
