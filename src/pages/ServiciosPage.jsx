import React, { useEffect, useState } from "react";
import "../App.css";

function ServiciosPage() {
  const [servicios, setServicios] = useState([]);
  const [form, setForm] = useState({
    descripcion: "",
    fecha: "",
    horaInicio: "",
    detalle: "",
  });
  const [editId, setEditId] = useState(null);

  // ✅ URL base del backend en Render
  const API_BASE = "https://sanmartinvaporback.onrender.com";

  // Cargar servicios al iniciar
  useEffect(() => {
    fetch(`${API_BASE}/admin/servicios`)
      .then((res) => res.json())
      .then((data) => setServicios(data))
      .catch((err) => console.error("Error cargando servicios:", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Crear o editar servicio
  const handleSubmit = (e) => {
    e.preventDefault();

    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `${API_BASE}/admin/servicios/${editId}`
      : `${API_BASE}/admin/servicios`;

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then(() => {
        setForm({ descripcion: "", fecha: "", horaInicio: "", detalle: "" });
        setEditId(null);
        return fetch(`${API_BASE}/admin/servicios`);
      })
      .then((res) => res.json())
      .then((data) => setServicios(data))
      .catch((err) => console.error("Error guardando servicio:", err));
  };

  // Eliminar servicio
  const handleDelete = (id) => {
    fetch(`${API_BASE}/admin/servicios/${id}`, { method: "DELETE" })
      .then(() => setServicios(servicios.filter((s) => s.id !== id)))
      .catch((err) => console.error("Error eliminando servicio:", err));
  };

  // Editar servicio
  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.id);
  };

  return (
    <div className="page-container">
      <h2>Gestión de Servicios</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
        />
        <input
          name="fecha"
          type="date"
          value={form.fecha}
          onChange={handleChange}
        />
        <input
          name="horaInicio"
          type="time"
          value={form.horaInicio}
          onChange={handleChange}
        />
        <input
          name="detalle"
          placeholder="Detalle"
          value={form.detalle}
          onChange={handleChange}
        />
        <button type="submit">{editId ? "Actualizar" : "Agregar"}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Fecha</th>
            <th>Hora de Inicio</th>
            <th>Detalle</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {servicios.map((s) => (
            <tr key={s.id}>
              <td>{s.descripcion}</td>
              <td>{s.fecha}</td>
              <td>{s.horaInicio}</td>
              <td>{s.detalle}</td>
              <td>
                <button onClick={() => handleEdit(s)}>Editar</button>
                <button onClick={() => handleDelete(s.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ServiciosPage;
