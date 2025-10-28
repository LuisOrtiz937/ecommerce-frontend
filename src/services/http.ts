import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

// ✅ Inyectar accessToken si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `${token}`; // 🔥 sin 'Bearer'
  return config;
});

export default api;
