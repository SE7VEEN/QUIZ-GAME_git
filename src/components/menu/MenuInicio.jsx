import { useState } from "react";
import "../../assets/styles/MenuInicio.css";
import HistorialPartidas from "./HistorialPartidas";
import { playSound } from "../musicaManager";

/**
 * MENÚ PRINCIPAL
 *
 * Pantalla inicial que muestra:
 * - Botón para iniciar juego
 * - Acceso a instrucciones
 * - Historial de partidas
 *
 */

const MenuInicio = ({ onIniciarJuego }) => {
  //Para controlar la visibilidad del historial y de las instrucciones
  const [mostrarHistorial, setMostrarHistorial] = useState(false);
  const [mostrarInstrucciones, setMostrarInstrucciones] = useState(false);

  // Función para manejar el inicio
  const handleIniciarJuego = () => {
    playSound("iniciar"); // Sonido al iniciar
    onIniciarJuego();
  };

  // Función para alternar historial
  const toggleHistorial = () => {
    playSound("desplegar"); // Sonido al mostrar/ocultar
    setMostrarHistorial(!mostrarHistorial);
  };

  // Función para alternar instrucciones
  const toggleInstrucciones = () => {
    playSound("desplegar");
    setMostrarInstrucciones(!mostrarInstrucciones);
  };

  return (
    <div className="menu-inicio">
      <h1 className="titulo">¡Bienvenido al Quiz Game!</h1>

      <div className="contenedor-botones">
        <button className="boton-iniciar" onClick={handleIniciarJuego}>
          Iniciar Juego
        </button>

        <button
          className={`boton-instrucciones ${
            mostrarInstrucciones ? "activo" : ""
          }`}
          onClick={toggleInstrucciones}
        >
          {mostrarInstrucciones ? "Ocultar Instrucciones" : "Ver Instrucciones"}
        </button>

        <button
          className={`boton-historial ${mostrarHistorial ? "activo" : ""}`}
          onClick={toggleHistorial}
        >
          {mostrarHistorial ? "Ocultar Historial" : "Ver Historial"}
        </button>
      </div>

      {mostrarInstrucciones && (
        <div className="contenedor-instrucciones">
          <h3>Instrucciones del Juego</h3>
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
              Muestra la respuesta, y si es correcta, presiona el boton azul
              correspondiente para sumar un punto.
            </li>
            <li>Cada respuesta correcta hace avanzar a tu caballo.</li>
            <li>
              Si no conoces la respuesta puedes optar por cambiar de pregunta.
            </li>
          </ol>
        </div>
      )}

      {mostrarHistorial && (
        <div className="contenedor-historial">
          <HistorialPartidas />
        </div>
      )}
    </div>
  );
};

export default MenuInicio;
