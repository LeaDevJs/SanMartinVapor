import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAuthCredentials } from "../api"; // 👈 usamos helper para guardar auth
import "../App.css";

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
  e.preventDefault();

  fetch("https://sanmartinvaporback.onrender.com/login", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      username,
      password,
    }),
    credentials: "include", // 🔑 guarda la cookie de sesión
  })
    .then((res) => {
      if (res.ok) {
        onLogin();
        navigate("/personal");
      } else {
        alert("Usuario o contraseña incorrectos");
      }
    })
    .catch(() => alert("Error al conectar con el servidor"));
};


  return (
    <div className="page-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}

export default LoginPage;
