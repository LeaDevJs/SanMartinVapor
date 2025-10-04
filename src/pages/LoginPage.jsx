import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://sanmartinvaporback.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username,
          password,
        }),
        credentials: "include", // 👈 Guarda cookie de sesión (JSESSIONID)
      });

      if (response.status === 200) {
        console.log("✅ Login exitoso");
        onLogin(); // actualiza estado global de login
        navigate("/personal");
      } else if (response.status === 401) {
        alert("❌ Usuario o contraseña incorrectos");
      } else {
        alert(`⚠️ Error inesperado: ${response.status}`);
      }
    } catch (err) {
      console.error("❗ Error al conectar con el servidor:", err);
      alert("Error al conectar con el servidor");
    }
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
