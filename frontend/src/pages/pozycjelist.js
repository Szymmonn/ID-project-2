// src/pages/pozycjelist.js

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAll, deleteOne } from "../api";

export default function PozycjeList() {
  const [pozycje, setPozycje] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPozycje = async () => {
    try {
      const res = await getAll("pozycje");
      setPozycje(res.data);
    } catch (err) {
      console.error("Błąd pobierania pozycji:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPozycje();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Na pewno chcesz usunąć tę pozycję?")) return;
    try {
      await deleteOne("pozycje", id);
      setPozycje((prev) => prev.filter((p) => p.id_pozycja !== id));
    } catch (err) {
      console.error("Błąd przy usuwaniu pozycji:", err);
    }
  };

  if (loading) return <p>Ładowanie…</p>;
  return (
    <div style={{ padding: "1rem" }}>
      <h2>Lista pozycji</h2>
      <button onClick={() => navigate("/pozycje/dodaj")}>
        Dodaj nową pozycję
      </button>
      <table
        border="1"
        cellPadding="6"
        cellSpacing="0"
        style={{ marginTop: 16 }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Skrót</th>
            <th>Pełna nazwa</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {pozycje.length > 0 ? (
            pozycje.map((p) => (
              <tr key={p.id_pozycja}>
                <td>{p.id_pozycja}</td>
                <td>{p.skrot}</td>
                <td>{p.pelna_nazwa}</td>
                <td>
                  <button onClick={() => navigate(`/pozycje/edytuj/${p.id_pozycja}`)}>
                    Edytuj
                  </button>{" "}
                  <button onClick={() => handleDelete(p.id_pozycja)}>
                    Usuń
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Brak pozycji w bazie</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
