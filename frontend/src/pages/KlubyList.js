// src/pages/KlubyList.js

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAll, deleteOne } from "../api";

export default function KlubyList() {
  const [kluby, setKluby] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchKluby = async () => {
    try {
      const res = await getAll("kluby");
      setKluby(res.data);
    } catch (err) {
      console.error("Błąd pobierania klubów:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKluby();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Na pewno chcesz usunąć ten klub?")) return;
    try {
      await deleteOne("kluby", id);
      setKluby((prev) => prev.filter((k) => k.id_klubu !== id));
    } catch (err) {
      console.error("Błąd przy usuwaniu:", err);
    }
  };

  if (loading) return <p>Ładowanie…</p>;
  return (
    <div style={{ padding: "1rem" }}>
      <h2>Lista klubów</h2>
      <button onClick={() => navigate("/kluby/dodaj")}>Dodaj nowy klub</button>
      <table border="1" cellPadding="6" cellSpacing="0" style={{ marginTop: 16 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nazwa</th>
            <th>Miasto</th>
            <th>Rok zał.</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {kluby.map((k) => (
            <tr key={k.id_klubu}>
              <td>{k.id_klubu}</td>
              <td>{k.nazwa}</td>
              <td>{k.miasto}</td>
              <td>{k.rok_zalozenia}</td>
              <td>
                <button onClick={() => navigate(`/kluby/edytuj/${k.id_klubu}`)}>
                  Edytuj
                </button>{" "}
                <button onClick={() => handleDelete(k.id_klubu)}>Usuń</button>
              </td>
            </tr>
          ))}
          {kluby.length === 0 && (
            <tr>
              <td colSpan="5">Brak klubów w bazie</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
