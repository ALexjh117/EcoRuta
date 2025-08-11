import axios, { type AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Interceptor para añadir token a cada petición si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // o donde guardes el token

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
