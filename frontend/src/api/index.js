// src/api/index.js

import axios from "axios";

// Jeśli Twój FastAPI działa np. pod http://127.0.0.1:8000
const API_BASE = "http://localhost:8000";

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Przykład wrappera GET wszystkich z danej tabeli
export const getAll = (entity) => api.get(`/api/${entity}/`);

// GET jednego po ID
export const getOne = (entity, id) => api.get(`/api/${entity}/${id}`);

// POST – tworzenie nowego
export const createOne = (entity, data) => api.post(`/api/${entity}/`, data);

// PUT – aktualizacja po ID
export const updateOne = (entity, id, data) =>
  api.put(`/api/${entity}/${id}`, data);

// DELETE – usuwanie po ID
export const deleteOne = (entity, id) => api.delete(`/api/${entity}/${id}`);

// W przypadku tabel z kluczem złożonym (np. pilkarz_pozycja czy klub_budzet),
// będziesz musiał dopasować endpointy do konstrukcji /api/kluby_budzet/?id_klubu=…&data=…
