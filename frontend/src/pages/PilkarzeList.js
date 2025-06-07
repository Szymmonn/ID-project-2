import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAll, deleteOne } from "../api";

export default function PilkarzeList() {
  const [pilkarze, setPilkarze] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPilkarze = async () => {
    try {
      const res = await getAll("pilkarze");
      setPilkarze(res.data);
    } catch (err) {
      console.error("Błąd pobierania pilkarzy:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPilkarze();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Na pewno chcesz usunąć tego piłkarza?")) return;
    try {
      await deleteOne("pilkarze", id);
      setPilkarze((prev) => prev.filter((p) => p.id_pilkarza !== id));
    } catch (err) {
      console.error("Błąd przy usuwaniu:", err);
    }
  };

  if (loading) return <p>Ładowanie…</p>;
  return (
    <div style={{ padding: "1rem" }}>
      <h2>Lista piłkarzy</h2>
      <button onClick={() => navigate("/pilkarze/dodaj")}>
        Dodaj nowego piłkarza
      </button>
      <table border="1" cellPadding="6" cellSpacing="0" style={{ marginTop: 16 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Data ur.</th>
            <th>Płeć</th>
            <th>Kraj</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {pilkarze.map((p) => (
            <tr key={p.id_pilkarza}>
              <td>{p.id_pilkarza}</td>
              <td>{p.imie}</td>
              <td>{p.nazwisko}</td>
              <td>{p.data_urodzenia}</td>
              <td>{p.plec}</td>
              <td>{p.id_kraju}</td>
              <td>
                <button onClick={() => navigate(`/pilkarze/edytuj/${p.id_pilkarza}`)}>
                  Edytuj
                </button>{" "}
                <button onClick={() => handleDelete(p.id_pilkarza)}>
                  Usuń
                </button>
              </td>
            </tr>
          ))}
          {pilkarze.length === 0 && (
            <tr>
              <td colSpan="7">Brak piłkarzy w bazie</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
