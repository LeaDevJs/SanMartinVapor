import React, { useEffect, useState } from "react";
import "../App.css";

function PersonalPage() {
  const [personal, setPersonal] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    legajo: "",
    fecha: "",
    disponibleDesde: "",
    notas: "",
  });
  const [editId, setEditId] = useState(null);

  // ✅ URL base del backend en Render
  const API_BASE = "https://sanmartinvaporback.onrender.com";

  // Cargar lista al inicio
  useEffect(() => {
    fetch(`${API_BASE}/admin/personal`)
      .then((res) => res.json())
      .then((data) => setPersonal(data))
      .catch((err) => console.error("Error cargando personal:", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Crear o editar
  const handleSubmit = (e) => {
    e.preventDefault();

    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `${API_BASE}/admin/personal/${editId}`
      : `${API_BASE}/admin/personal`;

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then(() => {
        setForm({
          nombre: "",
          apellido: "",
          legajo: "",
          fecha: "",
          disponibleDesde: "",
          notas: "",
        });
        setEditId(null);
        return fetch(`${API_BASE}/admin/personal`);
      })
      .then((res) => res.json())
      .then((data) => setPersonal(data))
      .catch((err) => console.error("Error guardando personal:", err));
  };

  // Eliminar
  const handleDelete = (id) => {
    fetch(`${API_BASE}/admin/personal/${id}`, { method: "DELETE" })
      .then(() => setPersonal(personal.filter((p) => p.id !== id)))
      .catch((err) => console.error("Error eliminando personal:", err));
  };

  // Editar
  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.id);
  };

  return (
    <div className="page-container">
      <h2>Gestión de Personal</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
        />
        <input
          name="apellido"
          placeholder="Apellido"
          value={form.apellido}
          onChange={handleChange}
        />
        <input
          name="legajo"
          placeholder="Legajo"
          value={form.legajo}
          onChange={handleChange}
        />
        <input
          name="fecha"
          type="date"
          value={form.fecha}
          onChange={handleChange}
        />
        <input
          name="disponibleDesde"
          type="time"
          value={form.disponibleDesde}
          onChange={handleChange}
        />
        <input
          name="notas"
          placeholder="Notas"
          value={form.notas}
          onChange={handleChange}
        />
        <button type="submit">{editId ? "Actualizar" : "Agregar"}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Legajo</th>
            <th>Fecha</th>
            <th>Disponible Desde</th>
            <th>Notas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {personal.map((p) => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>{p.apellido}</td>
              <td>{p.legajo}</td>
              <td>{p.fecha}</td>
              <td>{p.disponibleDesde}</td>
              <td>{p.notas}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Editar</button>
                <button onClick={() => handleDelete(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PersonalPage;
