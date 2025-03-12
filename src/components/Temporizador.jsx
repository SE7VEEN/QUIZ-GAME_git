import { useState, useEffect } from "react";
import "../assets/styles/Temporizador.css";

const Temporizador = ({ onTiempoAgotado, reset }) => {
  const [tiempo, setTiempo] = useState(30);

  // Reinicia el temporizador cuando cambia la propiedad `reset`
  useEffect(() => {
    setTiempo(30);
  }, [reset]);

  useEffect(() => {
    if (tiempo === 0) {
      onTiempoAgotado(); //Para notificar que el tiempo se agoto
      return;
    }

    const intervalo = setInterval(() => {
      setTiempo((t) => t - 1); // Reduce el tiempo en 1 segundo
    }, 1000);

    return () => clearInterval(intervalo); //Se limpia cuando el tiempo llega a 0
  }, [tiempo, onTiempoAgotado]);

  return (
    <div className="temporizador">
      <p>{tiempo < 10 ? `0${tiempo}` : tiempo}</p>{" "}
      {/* Formato de dos dígitos */}
    </div>
  );
};

export default Temporizador;
