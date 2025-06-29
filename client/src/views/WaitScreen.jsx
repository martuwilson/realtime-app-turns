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
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-8">
    <h1 className="text-4xl font-bold text-blue-800 mb-6">Turno actual</h1>
    <div className="text-8xl font-extrabold text-red-600 mb-10">{turno || "-"}</div>

    <div className="mb-6">
      <h2 className="text-2xl text-gray-700 mb-2">Próximos turnos</h2>
      <ul className="flex gap-4">
        {cola.slice(0, 3).map((t) => (
          <li key={t} className="text-3xl font-medium text-blue-500">
            {t}
          </li>
        ))}
      </ul>
    </div>

    <div>
      <h2 className="text-2xl text-gray-700 mb-2">Últimos llamados</h2>
      <ul className="flex gap-4">
        {historial.slice(-3).reverse().map((t, i) => (
          <li key={i} className="text-3xl font-medium text-green-600">
            {t}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

}