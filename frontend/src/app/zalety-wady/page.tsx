// frontend/src/app/zalety-wady/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAll, deleteOne } from "@/api";

type Cecha = {
  id_cechy: number;
  opis: string;
};

export default function ZaletyWadyPage() {
  const router = useRouter();
  const [lista, setLista] = useState<Cecha[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const res = await getAll("zalety_wady");
      setLista(res.data);
    } catch (err) {
      console.error("Błąd pobierania listy cech:", err);
      setError("Nie udało się pobrać listy cech.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Na pewno usunąć tę cechę?")) return;
    try {
      await deleteOne("zalety_wady", id);
      fetchData();
    } catch (err) {
      console.error("Błąd usuwania cechy:", err);
      setError("Nie udało się usunąć cechy.");
    }
  };

  if (loading) return <p>Ładowanie listy cech…</p>;
  if (error)
    return (
      <div>
        <h1>Błąd</h1>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );

  return (
    <div>
      <h1>Zalety i Wady Piłkarzy</h1>
      <button
        onClick={() => router.push("/zalety-wady/dodaj")}
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
        Dodaj nową cechę
      </button>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>ID</th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Opis
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Akcje
            </th>
          </tr>
        </thead>
        <tbody>
          {lista.map((item) => (
            <tr key={item.id_cechy}>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                {item.id_cechy}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                {item.opis}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                <button
                  onClick={() =>
                    router.push(`/zalety-wady/${item.id_cechy}/edytuj`)
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
                  onClick={() => handleDelete(item.id_cechy)}
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
                Brak dostępnych cech.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
