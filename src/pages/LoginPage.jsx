import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"; // 👈 importa estilos

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "1234") {
      onLogin();
      navigate("/personal");
    } else {
      alert("Usuario o contraseña incorrectos");
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
