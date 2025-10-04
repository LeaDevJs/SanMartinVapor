import React, { useEffect, useState } from "react";
import { api } from "../api"; // 👈 usamos cliente axios
import "../App.css";

function ServiciosPage() {
  const [servicios, setServicios] = useState([]);
  const [form, setForm] = useState({
    descripcion: "",
    fecha: "",
    horaInicio: "",
    detalle: ""
  });
  const [editId, setEditId] = useState(null);

  // Cargar servicios del backend
  const load = () => {
    api.get("/admin/servicios")
      .then((res) => setServicios(res.data))
      .catch(() => setServicios([]));
  };

  useEffect(() => {
    load();
  }, []);

  // Manejo de inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Ajustar hora a HH:mm:ss
  const withSeconds = (hhmm) => (hhmm?.length === 5 ? `${hhmm}:00` : hhmm);

  // Crear o actualizar
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, horaInicio: withSeconds(form.horaInicio) };

    try {
      if (editId) {
        await api.put(`/admin/servicios/${editId}`, payload);
      } else {
        await api.post("/admin/servicios", payload);
      }
      setForm({ descripcion: "", fecha: "", horaInicio: "", detalle: "" });
      setEditId(null);
      load();
    } catch (err) {
      alert("Error: no autorizado o datos inválidos.");
    }
  };

  // Eliminar
  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este servicio?")) return;
    try {
      await api.delete(`/admin/servicios/${id}`);
      load();
    } catch (err) {
      alert("Error: no autorizado.");
    }
  };

  // Editar (cargar datos en form)
  const handleEdit = (s) => {
    setForm({
      descripcion: s.descripcion,
      fecha: s.fecha,
      horaInicio: s.horaInicio?.slice(0, 5), // solo HH:mm
      detalle: s.detalle
    });
    setEditId(s.id);
  };

  return (
    <div className="page-container">
      <h2>Gestión de Servicios</h2>

      {/* Formulario */}
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

      {/* Tabla */}
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
