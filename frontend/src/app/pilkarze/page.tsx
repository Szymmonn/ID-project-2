// frontend/src/app/pilkarze/page.tsx
"use client"; // to jest komponent kliencki, bo będziemy używać hooków Reacta

import { useEffect, useState } from "react";
import { getAll, deleteOne } from "@/api"; // @/api = alias do frontend/src/api/index.js
import Link from "next/link";

type Pilkarz = {
  id_pilkarza: number;
  imie: string;
  nazwisko: string;
  data_urodzenia: string;
  plec: string;
  id_kraju: number;
  wzrost_cm?: number;
  numer_buta?: number;
  glowna_noga?: string;
};

export default function PilkarzeListPage() {
  const [pilkarze, setPilkarze] = useState<Pilkarz[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPilkarze = async () => {
    try {
      const res = await getAll("pilkarze");
      setPilkarze(res.data);
    } catch (err) {
      console.error("Błąd pobierania listy piłkarzy:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPilkarze();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Czy na pewno chcesz usunąć tego piłkarza?")) return;
    try {
      await deleteOne("pilkarze", id);
      setPilkarze((prev) => prev.filter((p) => p.id_pilkarza !== id));
    } catch (err) {
      console.error("Błąd przy usuwaniu piłkarza:", err);
    }
  };

  if (loading) {
    return <p>Ładowanie listy piłkarzy…</p>;
  }

  return (
    <div>
      <h1>Lista piłkarzy</h1>
      <Link href="/pilkarze/dodaj">
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
          Dodaj nowego piłkarza
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
              Imię
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Nazwisko
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Data ur.
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Płeć
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
          {pilkarze.length > 0 ? (
            pilkarze.map((p) => (
              <tr key={p.id_pilkarza}>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {p.id_pilkarza}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {p.imie}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {p.nazwisko}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {p.data_urodzenia}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {p.plec}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {p.id_kraju}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  <Link href={`/pilkarze/edytuj/${p.id_pilkarza}`}>
                    <button style={{ marginRight: 4 }}>Edytuj</button>
                  </Link>
                  <button onClick={() => handleDelete(p.id_pilkarza)}>
                    Usuń
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={7}
                style={{ border: "1px solid #ccc", padding: "0.5rem" }}
              >
                Brak piłkarzy w bazie
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
