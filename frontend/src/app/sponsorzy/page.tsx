// frontend/src/app/sponsorzy/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAll, deleteOne } from "@/api";

type Sponsor = {
  id_sponsora: number;
  nazwa: string;
};

export default function SponsorzyListPage() {
  const [sponsorzy, setSponsorzy] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSponsorzy = async () => {
    try {
      const res = await getAll("sponsorzy");
      setSponsorzy(res.data);
    } catch (err) {
      console.error("Błąd pobierania listy sponsorów:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSponsorzy();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm(`Na pewno chcesz usunąć sponsora o ID ${id}?`)) return;
    try {
      await deleteOne("sponsorzy", id);
      setSponsorzy((prev) => prev.filter((s) => s.id_sponsora !== id));
    } catch (err) {
      console.error("Błąd przy usuwaniu sponsora:", err);
      alert("Nie udało się usunąć sponsora.");
    }
  };

  if (loading) {
    return <p>Ładowanie listy sponsorów…</p>;
  }

  return (
    <div>
      <h1>Lista sponsorów</h1>
      <Link href="/sponsorzy/dodaj">
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
          Dodaj nowego sponsora
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
              Akcje
            </th>
          </tr>
        </thead>
        <tbody>
          {sponsorzy.length > 0 ? (
            sponsorzy.map((s) => (
              <tr key={s.id_sponsora}>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {s.id_sponsora}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {s.nazwa}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  <Link href={`/sponsorzy/edytuj/${s.id_sponsora}`}>
                    <button style={{ marginRight: 4 }}>Edytuj</button>
                  </Link>
                  <button onClick={() => handleDelete(s.id_sponsora)}>
                    Usuń
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={3}
                style={{ border: "1px solid #ccc", padding: "0.5rem" }}
              >
                Brak sponsorów w bazie
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
