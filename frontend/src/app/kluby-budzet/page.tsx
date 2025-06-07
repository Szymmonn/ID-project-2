// frontend/src/app/kluby-budzet/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAll } from "@/api";

type KlubBudzet = {
  id_klubu: number;
  kwota_dodana: number;
  data_dofinansowania: string; // w formacie YYYY-MM-DD
  powod_dofinansowania?: string | null;
};

export default function KlubyBudzetListPage() {
  const [budzety, setBudzety] = useState<KlubBudzet[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBudzety = async () => {
    try {
      const res = await getAll("kluby_budzet");
      setBudzety(res.data);
    } catch (err) {
      console.error("Błąd pobierania budżetów klubów:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudzety();
  }, []);

  const handleDelete = async (idKlubu: number, dataDof: string) => {
    if (
      !confirm(
        `Na pewno chcesz usunąć wpis budżetu dla klubu ${idKlubu} z dnia ${dataDof}?`
      )
    )
      return;
    try {
      const url = `/api/kluby_budzet/?id_klubu=${idKlubu}&data_dofinansowania=${dataDof}`;
      const res = await fetch(url, { method: "DELETE" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      // Po usunięciu: odśwież dane w stanie
      setBudzety((prev) =>
        prev.filter(
          (b) =>
            !(
              b.id_klubu === idKlubu &&
              b.data_dofinansowania === dataDof
            )
        )
      );
    } catch (err) {
      console.error("Błąd usuwania wpisu budżetu:", err);
      alert("Nie udało się usunąć wpisu budżetu.");
    }
  };

  if (loading) {
    return <p>Ładowanie wpisów budżetu…</p>;
  }

  return (
    <div>
      <h1>Budżety klubów</h1>
      <Link href="/kluby-budzet/dodaj">
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
          Dodaj dofinansowanie
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
              Kwota dodana
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Data dofinansowania
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Powód (opcjonalnie)
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Akcje
            </th>
          </tr>
        </thead>
        <tbody>
          {budzety.length > 0 ? (
            budzety.map((b) => (
              <tr
                key={`${b.id_klubu}-${b.data_dofinansowania}`}
              >
                <td
                  style={{ border: "1px solid #ccc", padding: "0.5rem" }}
                >
                  {b.id_klubu}
                </td>
                <td
                  style={{ border: "1px solid #ccc", padding: "0.5rem" }}
                >
                  {b.kwota_dodana}
                </td>
                <td
                  style={{ border: "1px solid #ccc", padding: "0.5rem" }}
                >
                  {b.data_dofinansowania}
                </td>
                <td
                  style={{ border: "1px solid #ccc", padding: "0.5rem" }}
                >
                  {b.powod_dofinansowania ?? "—"}
                </td>
                <td
                  style={{ border: "1px solid #ccc", padding: "0.5rem" }}
                >
                  <button
                    onClick={() =>
                      handleDelete(
                        b.id_klubu,
                        b.data_dofinansowania
                      )
                    }
                  >
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
                Brak wpisów budżetu
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
