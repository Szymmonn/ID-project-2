"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAll, deleteOne } from "@/api";

type Skaut = {
  id_skauta: number;
  imie: string;
  nazwisko: string;
};

export default function SkauciPage() {
  const router = useRouter();
  const [lista, setLista] = useState<Skaut[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const res = await getAll("skauci");
      setLista(res.data);
    } catch (err) {
      console.error("Błąd pobierania listy skautów:", err);
      setError("Nie udało się pobrać listy skautów.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    const potwierdz = window.confirm(`Na pewno usunąć skauta o ID ${id}?`);
    if (!potwierdz) return;

    try {
      await deleteOne("skauci", id);
      fetchData();
    } catch (err) {
      console.error("Błąd usuwania skauta:", err);
      setError("Nie udało się usunąć skauta.");
    }
  };

  if (loading) return <p>Ładowanie listy skautów…</p>;
  if (error)
    return (
      <div>
        <h1>Błąd</h1>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );

  return (
    <div>
      <h1>Lista skautów</h1>

      <button
        onClick={() => router.push("/skauci/dodaj")}
        style={{
          marginBottom: "1rem",
          backgroundColor: "#0070f3",
          color: "#fff",
          padding: "0.5rem 1rem",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        Dodaj nowego skauta
      </button>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>ID</th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Imię</th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Nazwisko</th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((s) => (
            <tr key={s.id_skauta}>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                {s.id_skauta}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                {s.imie}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                {s.nazwisko}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                <button
                  onClick={() => router.push(`/skauci/${s.id_skauta}/edytuj`)}
                  style={{
                    marginRight: "0.5rem",
                    backgroundColor: "#0a0",
                    color: "#fff",
                    padding: "0.3rem 0.6rem",
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                  }}
                >
                  Edytuj
                </button>
                <button
                  onClick={() => handleDelete(s.id_skauta)}
                  style={{
                    backgroundColor: "#a00",
                    color: "#fff",
                    padding: "0.3rem 0.6rem",
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                  }}
                >
                  Usuń
                </button>
              </td>
            </tr>
          ))}
          {lista.length === 0 && (
            <tr>
              <td
                colSpan={4}
                style={{ textAlign: "center", padding: "1rem", color: "#666" }}
              >
                Brak skautów w bazie.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
