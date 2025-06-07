// frontend/src/app/stadiony/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAll, deleteOne } from "@/api";

type Stadion = {
  id_stadionu: number;
  nazwa: string;
  miasto: string;
  id_kraju: number;
};

export default function StadionyListPage() {
  const [stadiony, setStadiony] = useState<Stadion[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStadiony = async () => {
    try {
      const res = await getAll("stadiony");
      setStadiony(res.data);
    } catch (err) {
      console.error("Błąd pobierania listy stadionów:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStadiony();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Na pewno chcesz usunąć ten stadion?")) return;
    try {
      await deleteOne("stadiony", id);
      setStadiony((prev) => prev.filter((s) => s.id_stadionu !== id));
    } catch (err) {
      console.error("Błąd przy usuwaniu stadionu:", err);
      alert("Nie udało się usunąć stadionu.");
    }
  };

  if (loading) {
    return <p>Ładowanie listy stadionów…</p>;
  }

  return (
    <div>
      <h1>Lista stadionów</h1>
      <Link href="/stadiony/dodaj">
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
          Dodaj nowy stadion
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
              Miasto
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
          {stadiony.length > 0 ? (
            stadiony.map((s) => (
              <tr key={s.id_stadionu}>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {s.id_stadionu}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {s.nazwa}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {s.miasto}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {s.id_kraju}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  <Link href={`/stadiony/edytuj/${s.id_stadionu}`}>
                    <button style={{ marginRight: 4 }}>Edytuj</button>
                  </Link>
                  <button onClick={() => handleDelete(s.id_stadionu)}>
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
                Brak stadionów w bazie
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
