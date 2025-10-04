import axios from "axios";

// Cliente axios centralizado
export const api = axios.create({
  baseURL: "http://localhost:8080", // 👈 cuando subas el backend a Render/Railway cambiás solo esto
});

// Guardar credenciales en localStorage y configurar axios
export function setAuthCredentials(username, password) {
  const token = btoa(`${username}:${password}`); // codifica en Base64
  localStorage.setItem("auth", token);
  api.defaults.headers.common["Authorization"] = `Basic ${token}`;
}

// Recuperar sesión cuando arranca la app
export function loadAuthFromStorage() {
  const token = localStorage.getItem("auth");
  if (token) {
    api.defaults.headers.common["Authorization"] = `Basic ${token}`;
  }
}

// Borrar credenciales (logout)
export function clearAuth() {
  localStorage.removeItem("auth");
  delete api.defaults.headers.common["Authorization"];
}
