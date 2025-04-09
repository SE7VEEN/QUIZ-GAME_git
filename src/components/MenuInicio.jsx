import { useState } from "react";
import "../assets/styles/MenuInicio.css";
import HistorialPartidas from "./HistorialPartidas";

// Recibe la función onInciarJuego como prop para iniciar el juego
const MenuInicio = ({ onIniciarJuego }) => {
  // Estados para controlar la visibilidad del historial y las instrucciones
  const [mostrarHistorial, setMostrarHistorial] = useState(false);
  const [mostrarInstrucciones, setMostrarInstrucciones] = useState(false);

  return (
    // Contenedor principal del menú de inicio
    <div className="menu-inicio">
      {/* Título principal del juego */}
      <h1 className="titulo">¡Bienvenido al Quiz Game!</h1>

      {/* Contenedor de botones principales */}
      <div className="contenedor-botones">
        {/* Botón para iniciar el juego */}
        <button className="boton-iniciar" onClick={onIniciarJuego}>
          Iniciar Juego
        </button>

        {/* Botón para mostrar/ocultar instrucciones */}
        {/* Cambia según el estado */}
        <button
          className={`boton-instrucciones ${
            mostrarInstrucciones ? "activo" : ""
          }`}
          onClick={() => setMostrarInstrucciones(!mostrarInstrucciones)}
        >
          {mostrarInstrucciones ? "Ocultar Instrucciones" : "Ver Instrucciones"}
        </button>

        {/* Botón para mostrar/ocultar historial */}
        {/* Cambia según el estado */}
        <button
          className={`boton-historial ${mostrarHistorial ? "activo" : ""}`}
          onClick={() => setMostrarHistorial(!mostrarHistorial)}
        >
          {mostrarHistorial ? "Ocultar Historial" : "Ver Historial"}
        </button>
      </div>

      {/* Contenedor de instrucciones - solo se muestra cuando mostrarInstrucciones es true */}
      {mostrarInstrucciones && (
        <div className="contenedor-instrucciones">
          <h3>Instrucciones del Juego</h3>
          {/* Lista ordenada de las instrucciones del juego */}
          <ol>
            <li>
              Dos jugadores compiten para ver quién llega primero a 10 puntos.
            </li>
            <li>Se necesita un moderador para validar las respuestas.</li>
            <li>
              Presiona el botón rojo para pedir tu turno cuando sepas la
              respuesta.
            </li>
            <li>Tienes 5 segundos para responder una vez pedido el turno.</li>
            <li>
              Si la respuesta es correcta, presiona el boton azul para sumar un
              punto.
            </li>
            <li>Cada respuesta correcta hace avanzar a tu caballo.</li>
            <li>
              Puedes optar por mostrar la respuesta o pasar de pregunta, pero
              esto no sumara puntos.
            </li>
          </ol>
        </div>
      )}

      {/* Contenedor de historial - solo se muestra cuando mostrarHistorial es true */}
      {mostrarHistorial && (
        <div className="contenedor-historial">
          <HistorialPartidas />
        </div>
      )}
    </div>
  );
};

export default MenuInicio;
