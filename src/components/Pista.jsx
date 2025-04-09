import Caballo from "./Caballo";
import "../assets/styles/Pista.css";
import pistaImage from "/src/images/pista.jpg";
import metaImage from "/src/images/Meta.jpg";
import React from "react";

//Este componente recibe una lista de caballos como props y renderiza una pista para cada uno
//Cada caballo tiene un nombre, progreso e imagen

const Pista = ({ caballos }) => {
  return (
    <div className="pista-container">
      {caballos.map((caballo) => (
        <div
          key={caballo.id}
          className="pista"
          style={{ backgroundImage: `url(${pistaImage})` }}
        >
          <div className="meta">
            <img src={metaImage} alt="Meta" className="meta-imagen" />
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

export default React.memo(Pista);
