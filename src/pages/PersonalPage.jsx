import React, { useState } from "react";
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
  const [editId, setEditId] = useState(null); // 👈 id que estamos editando

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      // actualizar registro existente
      setPersonal(
        personal.map((p) =>
          p.id === editId ? { ...form, id: editId } : p
        )
      );
      setEditId(null);
    } else {
      // crear nuevo
      setPersonal([...personal, { ...form, id: Date.now() }]);
    }

    // limpiar form
    setForm({ nombre: "", apellido: "", legajo: "", fecha: "", disponibleDesde: "", notas: "" });
  };

  const handleDelete = (id) => {
    setPersonal(personal.filter((p) => p.id !== id));
  };

  const handleEdit = (item) => {
    setForm(item);    // 👈 carga datos en el form
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
