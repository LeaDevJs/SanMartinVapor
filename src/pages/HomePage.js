import React from "react";
import "./HomePage.css";

function HomePage() {
  return (
    <>
      <header className="header">
        <h1>San Martín Vapor</h1>
        <p>LA FRATERNIDAD</p>
      </header>

      <nav className="nav">
        <a href="/">Inicio</a>
        <a href="/personal">PERSONAL</a>
        <a href="/servicios">SERVICIOS</a>
      </nav>

      <section id="inicio">
        <h2>Bienvenidos</h2>
        <div className="card">
          <p>
            Esta página es para lograr un sistema más fluido, más transparente y mayor comodidad.
          </p>
        </div>
      </section>

      <footer>
        <p>&copy; 2025 San Martín Vapor - Todos los derechos reservados</p>
      </footer>
    </>
  );
}

export default HomePage;
