import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const login = (username, password) =>
  API.post("/auth/login", { username, password });

export const validate = (token) =>
  API.get("/auth/validate-token", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const wisata = (token) =>
  API.get("/destination", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const maps = () => API.get("/destination/maps");

export const addWisata = (token, formData) =>
  API.post("/destination", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

export const updateWisata = (token, formData) =>
  API.put(`/destination/${formData.get("id")}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteWisata = (token, id) =>
  API.delete(`/destination/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

export const countWisata = (token) =>
  API.get(`/destination/count`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const topWisata = (token) =>
  API.get(`/destination/top_visit`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const updateView = (id) => API.put(`/destination/count/${id}`);
