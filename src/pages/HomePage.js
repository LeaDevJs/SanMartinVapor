import React, { useEffect, useState } from "react";
import "./HomePage.css";

function HomePage() {
  const [personal, setPersonal] = useState([]);
  const [servicios, setServicios] = useState([]);

  // ✅ URL correcta del backend en Render
  const API_BASE = "https://sanmartinvaporback.onrender.com";

  useEffect(() => {
    fetch(`${API_BASE}/admin/personal`)
      .then((res) => res.json())
      .then((data) => setPersonal(data))
      .catch((err) => console.error("Error cargando personal:", err));

    fetch(`${API_BASE}/admin/servicios`)
      .then((res) => res.json())
      .then((data) => setServicios(data))
      .catch((err) => console.error("Error cargando servicios:", err));
  }, []);

  return (
    <>
      <header className="header">
        <h1>San Martín Vapor</h1>
        <p>LA FRATERNIDAD</p>
      </header>

      <section className="page-container">
        <h2>Listado de Personal</h2>
        <div className="card-grid">
          {personal.length === 0 ? (
            <p>No hay personal cargado.</p>
          ) : (
            personal.map((p) => (
              <div className="card" key={p.id}>
                <h3>
                  {p.nombre} {p.apellido}
                </h3>
                <p>
                  <strong>Legajo:</strong> {p.legajo}
                </p>
                <p>
                  <strong>Disponible desde:</strong> {p.disponibleDesde}
                </p>
                {p.notas && <p><em>{p.notas}</em></p>}
              </div>
            ))
          )}
        </div>
      </section>

      <section className="page-container">
        <h2>Listado de Servicios</h2>
        <div className="card-grid">
          {servicios.length === 0 ? (
            <p>No hay servicios cargados.</p>
          ) : (
            servicios.map((s) => (
              <div className="card" key={s.id}>
                <h4>{s.descripcion}</h4>
                <p>
                  <strong>Fecha:</strong> {s.fecha}
                </p>
                <p>
                  <strong>Hora inicio:</strong> {s.horaInicio}
                </p>
                <p>
                  <strong>Detalle:</strong> {s.detalle}
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}

export default HomePage;
