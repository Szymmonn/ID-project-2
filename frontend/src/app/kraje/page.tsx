"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAll, deleteOne } from "@/api";

type Kraj = {
  id_kraju: number;
  nazwa: string;
};

export default function KrajePage() {
  const router = useRouter();
  const [lista, setLista] = useState<Kraj[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const res = await getAll("kraje");
      setLista(res.data);
    } catch (err) {
      console.error("Błąd pobierania listy krajów:", err);
      setError("Nie udało się pobrać listy krajów.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Na pewno usunąć ten kraj?")) return;
    try {
      await deleteOne("kraje", id);
      fetchData();
    } catch (err) {
      console.error("Błąd usuwania kraju:", err);
      setError("Nie udało się usunąć kraju.");
    }
  };

  if (loading) return <p>Ładowanie listy krajów…</p>;
  if (error)
    return (
      <div>
        <h1>Błąd</h1>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );

  return (
    <div>
      <h1>Lista krajów</h1>
      <button
        onClick={() => router.push("/kraje/dodaj")}
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
        Dodaj nowy kraj
      </button>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              ID
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Nazwa
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Akcje
            </th>
          </tr>
        </thead>
        <tbody>
          {lista.map((kraj) => (
            <tr key={kraj.id_kraju}>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                {kraj.id_kraju}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                {kraj.nazwa}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                <button
                  onClick={() =>
                    router.push(`/kraje/${kraj.id_kraju}/edytuj`)
                  }
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
                  onClick={() => handleDelete(kraj.id_kraju)}
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
                colSpan={3}
                style={{ textAlign: "center", padding: "1rem", color: "#666" }}
              >
                Brak krajów w bazie.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
