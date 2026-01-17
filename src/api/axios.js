import axios from "axios";

const api = axios.create();

export const API_BASE_URL = api.defaults.baseURL;
export default api;
