import "../assets/styles/Botones.css";
import React from "react";

//Este componente es un boton base para que recibe un evento onClick, un texto para mostrar y un estado de deshabilitado
//Ademas recibe una clase que nos permite personalizar el estilo del boton
const Botones = ({ onClick, children, clase = "", disabled = false }) => {
  return (
    <button className={`boton ${clase}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default React.memo(Botones);
