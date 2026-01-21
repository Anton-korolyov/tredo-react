import axios from "axios";
import i18n from "../i18n";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/",
  withCredentials: true
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // 🔥 ДОБАВЛЯЕМ ЯЗЫК В КАЖДЫЙ ЗАПРОС
  config.params = {
    ...(config.params || {}),
    lang: i18n.language
  };

  return config;
});

export default api;