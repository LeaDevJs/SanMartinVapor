import React, { useState } from "react";
import "../App.css";

function ServiciosPage() {
  const [servicios, setServicios] = useState([]);
  const [form, setForm] = useState({
    descripcion: "",
    fecha: "",
    horaInicio: "",
    detalle: ""
  });
  const [editId, setEditId] = useState(null); // 👈 id en edición

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      // actualizar servicio existente
      setServicios(
        servicios.map((s) =>
          s.id === editId ? { ...form, id: editId } : s
        )
      );
      setEditId(null);
    } else {
      // crear nuevo servicio
      setServicios([...servicios, { ...form, id: Date.now() }]);
    }

    // limpiar form
    setForm({ descripcion: "", fecha: "", horaInicio: "", detalle: "" });
  };

  const handleDelete = (id) => {
    setServicios(servicios.filter((s) => s.id !== id));
  };

  const handleEdit = (item) => {
    setForm(item);    // 👈 carga datos en el form
    setEditId(item.id);
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
