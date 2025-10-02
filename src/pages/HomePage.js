import React, { useEffect, useState } from "react";
import "./HomePage.css";

function HomePage() {
  const [personal, setPersonal] = useState([]);
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    // GET al backend
    fetch("http://localhost:8080/admin/personal") // 👈 tu endpoint real
      .then((res) => res.json())
      .then((data) => setPersonal(data));

    fetch("http://localhost:8080/admin/servicios") // 👈 tu endpoint real
      .then((res) => res.json())
      .then((data) => setServicios(data));
  }, []);

  return (
    <>
      <header className="header">
        <h1>San Martín Vapor</h1>
        <p>LA FRATERNIDAD</p>
      </header>

      <section className="page-container">
        <h2>Listado de Personal</h2>
        <div>
          {personal.length === 0 ? (
            <p>No hay personal cargado.</p>
          ) : (
            <ul>
              {personal.map((p) => (
                <li key={p.id}>
                  {p.nombre} {p.apellido} - Legajo {p.legajo} - Disponible desde: {p.disponibleDesde}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="page-container">
        <h2>Listado de Servicios</h2>
        <div>
          {servicios.length === 0 ? (
            <p>No hay servicios cargados.</p>
          ) : (
            <ul>
              {servicios.map((s) => (
                <li key={s.id}>
                  {s.descripcion} - {s.fecha} - {s.horaInicio} ({s.detalle})
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}

export default HomePage;
