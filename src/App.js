import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PersonalPage from "./pages/PersonalPage";
import ServiciosPage from "./pages/ServiciosPage";
import HomePage from "./pages/HomePage";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );

  const handleLogin = () => {
    setLoggedIn(true);
    localStorage.setItem("loggedIn", "true");
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("loggedIn");
  };

  return (
    <Router>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/personal" className="nav-link">Personal</Link>
          <Link to="/servicios" className="nav-link">Servicios</Link>
        </div>
        <div className="navbar-right">
          {loggedIn ? (
            <button className="btn" onClick={handleLogout}>Logout</button>
          ) : (
            <Link to="/login" className="btn">Login</Link>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/personal" element={loggedIn ? <PersonalPage /> : <Navigate to="/login" />} />
        <Route path="/servicios" element={loggedIn ? <ServiciosPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
