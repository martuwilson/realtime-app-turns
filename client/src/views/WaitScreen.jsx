import React, { useEffect, useState } from "react";
import { socket } from "../socket";

export default function WaitScreen() {
  const [turno, setTurno] = useState(null);
  const [cola, setCola] = useState([]);
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    socket.on("estado_inicial", ({ turnoActual, colaTurnos, historialTurnos }) => {
      setTurno(turnoActual);
      setCola(colaTurnos);
      setHistorial(historialTurnos);
    });
    socket.on("turno_actual", setTurno);
    socket.on("cola_actualizada", setCola);

    return () => {
      socket.off("estado_inicial");
      socket.off("turno_actual");
      socket.off("cola_actualizada");
    };
  }, []);

  return (
    <div>
      <h1>Turno actual: {turno || "-"}</h1>
      <h2>Próximos:</h2>
      <ul>{cola.slice(0, 3).map((t) => <li key={t}>{t}</li>)}</ul>
      <h2>Últimos llamados:</h2>
      <ul>{historial.slice(-3).reverse().map((t, i) => <li key={i}>{t}</li>)}</ul>
    </div>
  );
}