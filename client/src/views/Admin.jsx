import React, { useEffect, useState } from "react";
import { socket } from "../socket";

export default function Admin() {
  const [cola, setCola] = useState([]);
  const [turno, setTurno] = useState(null);

  useEffect(() => {
    socket.on("estado_inicial", ({ turnoActual, colaTurnos }) => {
      setTurno(turnoActual);
      setCola(colaTurnos);
    });
    socket.on("turno_actual", setTurno);
    socket.on("cola_actualizada", setCola);

    return () => {
      socket.off("estado_inicial");
      socket.off("turno_actual");
      socket.off("cola_actualizada");
    };
  }, []);

  const siguiente = () => socket.emit("siguiente_turno");
  const cancelar = (nro) => socket.emit("cancelar_turno", nro);
  const agregar = () => {
    const nuevo = prompt("Número de nuevo turno:");
    if (nuevo) socket.emit("nuevo_turno", nuevo);
  };

  return (
    <div>
      <h1>Panel Admin</h1>
      <p><strong>Turno actual:</strong> {turno || "-"}</p>
      <button onClick={siguiente}>Siguiente turno</button>
      <button onClick={agregar}>Agregar nuevo turno</button>
      <h2>Cola de espera</h2>
      <ul>
        {cola.map((nro) => (
          <li key={nro}>{nro} <button onClick={() => cancelar(nro)}>Cancelar</button></li>
        ))}
      </ul>
    </div>
  );
}
