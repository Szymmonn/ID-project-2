// frontend/src/app/historia-klub-liga/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAll } from "@/api";

type Historia = {
  id_klubu: number;
  id_ligi: number;
  id_sezonu: number;
};

export default function HistoriaKlubLigaListPage() {
  const [lista, setLista] = useState<Historia[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHistoria = async () => {
    try {
      const res = await getAll("historia_klub_liga");
      setLista(res.data);
    } catch (err) {
      console.error("Błąd pobierania historii klub→liga:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistoria();
  }, []);

  if (loading) {
    return <p>Ładowanie historii klubów i lig…</p>;
  }

  return (
    <div>
      <h1>Historia Klub → Liga</h1>
      <Link href="/historia-klub-liga/dodaj">
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
          Dodaj wpis
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
              Klub (ID)
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Liga (ID)
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Sezon (ID)
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Akcje
            </th>
          </tr>
        </thead>
        <tbody>
          {lista.length > 0 ? (
            lista.map((h) => (
              <tr
                key={`${h.id_klubu}-${h.id_ligi}-${h.id_sezonu}`}
              >
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {h.id_klubu}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {h.id_ligi}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {h.id_sezonu}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  <Link
                    href={`/historia-klub-liga/${h.id_klubu}/${h.id_ligi}/${h.id_sezonu}/usun`}
                  >
                    <button>Usuń</button>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={4}
                style={{ border: "1px solid #ccc", padding: "0.5rem" }}
              >
                Brak wpisów w historii
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
