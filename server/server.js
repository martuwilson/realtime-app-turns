const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

let colaTurnos = [];
let turnoActual = null;
let historialTurnos = [];

io.on("connection", (socket) => {
  console.log("Cliente conectado", socket.id);

  socket.emit("estado_inicial", { turnoActual, colaTurnos, historialTurnos });

  socket.on("siguiente_turno", () => {
    if (colaTurnos.length > 0) {
      turnoActual = colaTurnos.shift();
      historialTurnos.push(turnoActual);
      io.emit("turno_actual", turnoActual);
      io.emit("cola_actualizada", colaTurnos);
    }
  });

  socket.on("cancelar_turno", (numero) => {
    colaTurnos = colaTurnos.filter((t) => t !== numero);
    io.emit("cola_actualizada", colaTurnos);
  });

  socket.on("nuevo_turno", (numero) => {
    colaTurnos.push(numero);
    io.emit("cola_actualizada", colaTurnos);
  });
});

server.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
