// frontend/src/app/pozycje/page.tsx
"use client";

import { useEffect, useState } from "react";
import { getAll, deleteOne } from "@/api";
import Link from "next/link";

type Pozycja = {
  id_pozycja: number;
  skrot: string;
  pelna_nazwa: string;
};

export default function PozycjeListPage() {
  const [pozycje, setPozycje] = useState<Pozycja[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPozycje = async () => {
    try {
      const res = await getAll("pozycje");
      setPozycje(res.data);
    } catch (err) {
      console.error("Błąd pobierania listy pozycji:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPozycje();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Czy na pewno chcesz usunąć tę pozycję?")) return;
    try {
      await deleteOne("pozycje", id);
      setPozycje((prev) => prev.filter((p) => p.id_pozycja !== id));
    } catch (err) {
      console.error("Błąd przy usuwaniu pozycji:", err);
    }
  };

  if (loading) {
    return <p>Ładowanie listy pozycji…</p>;
  }

  return (
    <div>
      <h1>Lista pozycji</h1>
      <Link href="/pozycje/dodaj">
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
          Dodaj nową pozycję
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
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>ID</th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Skrót
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Pełna nazwa
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Akcje
            </th>
          </tr>
        </thead>
        <tbody>
          {pozycje.length > 0 ? (
            pozycje.map((p) => (
              <tr key={p.id_pozycja}>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {p.id_pozycja}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {p.skrot}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {p.pelna_nazwa}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  <Link href={`/pozycje/edytuj/${p.id_pozycja}`}>
                    <button style={{ marginRight: 4 }}>Edytuj</button>
                  </Link>
                  <button onClick={() => handleDelete(p.id_pozycja)}>
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
                Brak pozycji w bazie
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
