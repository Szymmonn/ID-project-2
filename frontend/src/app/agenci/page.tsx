// frontend/src/app/agenci/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAll, deleteOne } from "@/api";

type Agent = {
  id_agenta: number;
  imie: string;
  nazwisko: string;
};

export default function AgenciListPage() {
  const [agenci, setAgenci] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAgenci = async () => {
    try {
      const res = await getAll("agenci");
      setAgenci(res.data);
    } catch (err) {
      console.error("Błąd pobierania listy agentów:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgenci();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Na pewno chcesz usunąć tego agenta?")) return;
    try {
      await deleteOne("agenci", id);
      setAgenci((prev) => prev.filter((a) => a.id_agenta !== id));
    } catch (err) {
      console.error("Błąd przy usuwaniu agenta:", err);
      alert("Nie udało się usunąć agenta.");
    }
  };

  if (loading) {
    return <p>Ładowanie listy agentów…</p>;
  }

  return (
    <div>
      <h1>Lista agentów</h1>
      <Link href="/agenci/dodaj">
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
          Dodaj nowego agenta
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
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Imię</th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Nazwisko</th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {agenci.length > 0 ? (
            agenci.map((a) => (
              <tr key={a.id_agenta}>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {a.id_agenta}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {a.imie}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {a.nazwisko}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  <Link href={`/agenci/edytuj/${a.id_agenta}`}>
                    <button style={{ marginRight: 4 }}>Edytuj</button>
                  </Link>
                  <button onClick={() => handleDelete(a.id_agenta)}>Usuń</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={4}
                style={{ border: "1px solid #ccc", padding: "0.5rem" }}
              >
                Brak agentów w bazie
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
