import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./historialEs.css";

export function HistorialES() {
  const [registro, setRegistro] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const registroGuardado = sessionStorage.getItem("registro");
    if (registroGuardado) {
      setRegistro(JSON.parse(registroGuardado));
    }
  }, []);

  const handleClick = async()=>{
    
    try {
        const response = await fetch("https://backendproyectoarquitectura.onrender.com/createRegister", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registro), // Enviar contenido de sessionStorage
        });
  
        if (response.ok) {
          console.log("Registros guardados en la base de datos.");
          alert('Se crearon los registros');
          navigate('/');

        } else {
          console.error("Error al guardar los registros.");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
  }

  return (
    <div>
      <div className="card">
        <header>
          <h2>Historial de Desbloqueos</h2>
        </header>

        <div className="wrapper">
          <table>
            <thead>
              <tr>
                <th draggable="true">Usuario</th>
                <th draggable="true">Fecha De Accion</th>
                <th draggable="true">Hora</th>
              </tr>
            </thead>
            <tbody>
              {registro.length > 0 ? (
                registro.map((regis, index) => (
                  <tr key={index}>
                    <td>{regis.usuario}</td>
                    <td>{regis.fecha}</td>
                    <td>{regis.hora}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No hay registro disponibles</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="historialES__boxacciones">
        <button onClick={handleClick} className="principal__botonHistorial">
          Guardar en Base de Datos
        </button>
      </div>
    </div>
  );
}
