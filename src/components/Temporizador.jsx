import { useState, useEffect } from "react";
import "../assets/styles/Temporizador.css";

const Temporizador = ({ onTiempoAgotado, reset, pausado }) => {
  const [tiempo, setTiempo] = useState(5); // Inicializamos el temporizador en 5

  // Reiniciamos el temporizador cuando cambia 'reset'
  useEffect(() => {
    setTiempo(5);
  }, [reset]);

  useEffect(() => {
    if (pausado) return; //Si el temporizador esta pausado no hacemos nada

    //El codigo dentro de setInterval lo ejecutaremos cada segundo
    const intervalo = setInterval(() => {
      setTiempo((t) => {
        if (t <= 1) {
          clearInterval(intervalo);
          setTimeout(() => onTiempoAgotado(), 0); // Usamos setTimeout para evitar el errores
          return 0;
        }
        return t - 1; //Reducimos el tiempo en un segundo
      });
    }, 1000);

    return () => clearInterval(intervalo); //Borramos el intervalo para evitar que continue en segundo plano
  }, [pausado, onTiempoAgotado]);

  return (
    //Mostramos el tiempo en pantalla, si es menor a 10 agregamos un 0 al inicio
    <div className="temporizador">
      <p>{tiempo >= 0 && tiempo < 10 ? `0${tiempo}` : tiempo}</p>
    </div>
  );
};

export default Temporizador;
