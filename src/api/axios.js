import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7132",
});
export const API_BASE_URL = api.defaults.baseURL;
export default api;