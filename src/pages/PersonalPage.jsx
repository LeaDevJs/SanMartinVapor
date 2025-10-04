import React, { useEffect, useState } from "react";
import { api } from "../api"; // 👈 usamos axios centralizado
import "../App.css";

function PersonalPage() {
  const [personal, setPersonal] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    legajo: "",
    fecha: "",
    disponibleDesde: "",
    notas: ""
  });
  const [editId, setEditId] = useState(null);

  // Cargar lista al inicio
  const load = () => {
    api.get("/admin/personal")
      .then((res) => setPersonal(res.data))
      .catch(() => setPersonal([]));
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
    const payload = { ...form, disponibleDesde: withSeconds(form.disponibleDesde) };

    try {
      if (editId) {
        await api.put(`/admin/personal/${editId}`, payload);
      } else {
        await api.post("/admin/personal", payload);
      }
      setForm({ nombre: "", apellido: "", legajo: "", fecha: "", disponibleDesde: "", notas: "" });
      setEditId(null);
      load(); // recargar lista
    } catch (err) {
      alert("Error: no autorizado o datos inválidos.");
    }
  };

  // Eliminar
  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este registro?")) return;
    try {
      await api.delete(`/admin/personal/${id}`);
      load();
    } catch (err) {
      alert("Error: no autorizado.");
    }
  };

  // Editar (cargar datos en el form)
  const handleEdit = (item) => {
    setForm({
      nombre: item.nombre,
      apellido: item.apellido,
      legajo: item.legajo,
      fecha: item.fecha,
      disponibleDesde: item.disponibleDesde?.slice(0, 5), // solo HH:mm
      notas: item.notas || ""
    });
    setEditId(item.id);
  };

  return (
    <div className="page-container">
      <h2>Gestión de Personal</h2>

      <form onSubmit={handleSubmit}>
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} />
        <input name="apellido" placeholder="Apellido" value={form.apellido} onChange={handleChange} />
        <input name="legajo" placeholder="Legajo" value={form.legajo} onChange={handleChange} />
        <input name="fecha" type="date" value={form.fecha} onChange={handleChange} />
        <input name="disponibleDesde" type="time" value={form.disponibleDesde} onChange={handleChange} />
        <input name="notas" placeholder="Notas" value={form.notas} onChange={handleChange} />
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
