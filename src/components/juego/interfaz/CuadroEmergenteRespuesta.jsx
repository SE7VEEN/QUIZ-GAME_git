import React, { useEffect } from "react";
import "../../../assets/styles/CuadroEmergenteRespuesta.css";

const CuadroEmergenteRespuesta = ({ respuesta, onClose }) => {
  // Mostramos un mensaje emergente con la respuesta correcta durante 3 segundos y luego lo cerramos
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="notificacion-respuesta">
      <div className="notificacion-contenido">
        <h2>RESPUESTA</h2>
        <p>{respuesta}</p>
      </div>
    </div>
  );
};

export default CuadroEmergenteRespuesta;
