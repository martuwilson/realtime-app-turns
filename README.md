# Turnos Realtime App

Aplicación de turnos en tiempo real, pensada para funcionar como los sistemas de farmacias o centros médicos. Permite a un administrador gestionar turnos y a los usuarios visualizar el turno actual y los próximos.

## 📁 Estructura del proyecto

```
turnos-realtime-app/
├── client/         # Frontend con Vite + React
│   └── src/
│       ├── views/
│       │   ├── Admin.jsx       # Pantalla para el comercio
│       │   └── WaitScreen.jsx    # Pantalla pública para usuarios
│       ├── components/
│       ├── socket.js           # Configuración de Socket.IO cliente
│       ├── App.jsx
│       └── main.jsx
├── server/         # Backend con Express + Socket.IO
│   └── server.js
├── .gitignore
└── README.md
```

---

## 🚀 Cómo correr el proyecto

### 1. Clonar el repositorio
```bash
git clone <repo-url>
cd turnos-realtime-app
```

### 2. Backend
```bash
cd server
npm install
npm run dev
```

Servidor corriendo en `http://localhost:3000`

### 3. Frontend
```bash
cd client
npm install
npm run dev
```

App accesible en `http://localhost:5173`

- Ir a `/admin` para la pantalla de control de turnos
- Ir a `/pantalla` para la vista pública

---

## ⚙️ Funcionalidades actuales

### 🟦 Admin (`/admin`)
- Agregar nuevos turnos
- Llamar al siguiente turno
- Cancelar turnos
- Ver el turno actual y la cola de espera

### 🟧 Pantalla pública (`/wait`)
- Ver el turno actual
- Ver los próximos turnos
- Ver el historial de los últimos turnos llamados
- Actualización en tiempo real con Socket.IO

---

## 🔜 Próximas mejoras (propuestas)
- Sonido o animación cuando cambia el turno
- Registro de usuarios con nombre/número
- Aviso por WhatsApp cuando el usuario no está mirando la pantalla y se aproxima su turno
- Múltiples mostradores
- Persistencia con base de datos
- Panel responsive para tablets o TVs

---

## 🧪 Tecnologías utilizadas
- **Frontend**: React, Vite, Socket.IO Client, React Router DOM
- **Backend**: Node.js, Express, Socket.IO

---

## ✍️ Autor
Martin Williner
