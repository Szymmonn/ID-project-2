// frontend/src/app/ligi/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAll, deleteOne } from "@/api";

type Liga = {
  id_ligi: number;
  nazwa: string;
  id_kraju: number;
};

export default function LigiListPage() {
  const [ligi, setLigi] = useState<Liga[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLigi = async () => {
    try {
      const res = await getAll("ligi");
      setLigi(res.data);
    } catch (err) {
      console.error("Błąd pobierania listy lig:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLigi();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm(`Na pewno chcesz usunąć ligę o ID ${id}?`)) return;
    try {
      await deleteOne("ligi", id);
      setLigi((prev) => prev.filter((l) => l.id_ligi !== id));
    } catch (err) {
      console.error("Błąd przy usuwaniu ligi:", err);
      alert("Nie udało się usunąć ligi.");
    }
  };

  if (loading) {
    return <p>Ładowanie listy lig…</p>;
  }

  return (
    <div>
      <h1>Lista lig</h1>
      <Link href="/ligi/dodaj">
        <button
          style={{
            marginBottom: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Dodaj nową ligę
        </button>
      </Link>

      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          marginTop: "1rem",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0" }}>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              ID
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Nazwa
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Kraj (ID)
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Akcje
            </th>
          </tr>
        </thead>
        <tbody>
          {ligi.length > 0 ? (
            ligi.map((l) => (
              <tr key={l.id_ligi}>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {l.id_ligi}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {l.nazwa}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {l.id_kraju}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  <Link href={`/ligi/edytuj/${l.id_ligi}`}>
                    <button style={{ marginRight: 4 }}>Edytuj</button>
                  </Link>
                  <button onClick={() => handleDelete(l.id_ligi)}>
                    Usuń
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={4}
                style={{ border: "1px solid #ccc", padding: "0.5rem" }}
              >
                Brak lig w bazie
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
