// frontend/src/app/historia-klub-sponsor/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAll } from "@/api";

type HistoriaSponsor = {
  id_klubu: number;
  id_sponsora: number;
  data_zawarcia_wspolpracy: string;  // YYYY-MM-DD
  data_zakonczenia_wspolpracy?: string | null; // YYYY-MM-DD lub null
};

export default function HistoriaKlubSponsorListPage() {
  const [lista, setLista] = useState<HistoriaSponsor[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHistoria = async () => {
    try {
      const res = await getAll("historia_klub_sponsor");
      setLista(res.data);
    } catch (err) {
      console.error("Błąd pobierania historii sponsorów:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistoria();
  }, []);

  if (loading) {
    return <p>Ładowanie historii sponsorów…</p>;
  }

  return (
    <div>
      <h1>Historia Klub → Sponsor</h1>
      <Link href="/historia-klub-sponsor/dodaj">
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
              Sponsor (ID)
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Data zawarcia
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Data zakończenia (opcjonalnie)
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
                key={`${h.id_klubu}-${h.id_sponsora}-${h.data_zawarcia_wspolpracy}`}
              >
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {h.id_klubu}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {h.id_sponsora}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {h.data_zawarcia_wspolpracy}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {h.data_zakonczenia_wspolpracy ?? "—"}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  <Link
                    href={`/historia-klub-sponsor/${h.id_klubu}/${h.id_sponsora}/${h.data_zawarcia_wspolpracy}/usun`}
                  >
                    <button>Usuń</button>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
                style={{ border: "1px solid #ccc", padding: "0.5rem" }}
              >
                Brak wpisów w historii sponsorów
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
