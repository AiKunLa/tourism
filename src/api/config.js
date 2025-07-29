import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5173/api",
});

instance.interceptors.request.use((config) => {
  // token
  return config;
});

instance.interceptors.response.use((response) => {
    return response.data;
});

export { instance };
