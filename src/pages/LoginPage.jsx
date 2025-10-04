import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAuthCredentials } from "../api"; // 👈 usamos helper para guardar auth
import "../App.css";

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Guardamos las credenciales en localStorage y en axios
    setAuthCredentials(username, password);
    
    onLogin();
    navigate("/personal");
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
