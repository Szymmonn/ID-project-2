// frontend/src/app/sezony/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAll, deleteOne } from "@/api";

type Sezon = {
  id_sezonu: number;
  data_poczatek: string; // w formacie YYYY-MM-DD
  data_koniec: string;   // w formacie YYYY-MM-DD
  uwagi?: string | null;
};

export default function SezonyListPage() {
  const [sezony, setSezony] = useState<Sezon[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSezony = async () => {
    try {
      const res = await getAll("sezony");
      setSezony(res.data);
    } catch (err) {
      console.error("Błąd pobierania listy sezonów:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSezony();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm(`Na pewno chcesz usunąć sezon o ID ${id}?`)) return;
    try {
      await deleteOne("sezony", id);
      setSezony((prev) => prev.filter((s) => s.id_sezonu !== id));
    } catch (err) {
      console.error("Błąd przy usuwaniu sezonu:", err);
      alert("Nie udało się usunąć sezonu.");
    }
  };

  if (loading) {
    return <p>Ładowanie listy sezonów…</p>;
  }

  return (
    <div>
      <h1>Lista sezonów</h1>
      <Link href="/sezony/dodaj">
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
          Dodaj nowy sezon
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
              Data początek
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Data koniec
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Uwagi
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Akcje
            </th>
          </tr>
        </thead>
        <tbody>
          {sezony.length > 0 ? (
            sezony.map((s) => (
              <tr key={s.id_sezonu}>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {s.id_sezonu}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {s.data_poczatek}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {s.data_koniec}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {s.uwagi ?? "—"}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  <Link href={`/sezony/edytuj/${s.id_sezonu}`}>
                    <button style={{ marginRight: 4 }}>Edytuj</button>
                  </Link>
                  <button onClick={() => handleDelete(s.id_sezonu)}>
                    Usuń
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
                style={{ border: "1px solid #ccc", padding: "0.5rem" }}
              >
                Brak sezonów w bazie
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
