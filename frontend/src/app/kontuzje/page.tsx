// frontend/src/app/kontuzje/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAll, deleteOne } from "@/api";

type Kontuzja = {
  id_pilkarza: number;
  id_meczu: number | null;
  data_kontuzji: string;          // ISO date string
  opis_kontuzji: string;
  przewidywany_czas_leczenia_w_dniach: number;
};

export default function KontuzjePage() {
  const router = useRouter();
  const [lista, setLista] = useState<Kontuzja[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const res = await getAll("kontuzje");
      setLista(res.data);
    } catch (err) {
      console.error("Błąd pobierania listy kontuzji:", err);
      setError("Nie udało się pobrać listy kontuzji.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (k: Kontuzja) => {
    const potwierdz = window.confirm(
      `Na pewno usunąć kontuzję piłkarza ${k.id_pilkarza} z dnia ${new Date(
        k.data_kontuzji
      ).toLocaleDateString("pl-PL")}?`
    );
    if (!potwierdz) return;

    try {
      // deleteOne automatycznie wysyła te trzy pola jako query params:
      await deleteOne("kontuzje", {
        id_pilkarza: k.id_pilkarza,
        data_kontuzji: k.data_kontuzji,
        opis_kontuzji: k.opis_kontuzji,
      });
      fetchData();
    } catch (err) {
      console.error("Błąd usuwania kontuzji:", err);
      setError("Nie udało się usunąć kontuzji.");
    }
  };

  if (loading) return <p>Ładowanie listy kontuzji…</p>;
  if (error)
    return (
      <div>
        <h1>Błąd</h1>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );

  return (
    <div>
      <h1>Lista kontuzji</h1>

      <button
        onClick={() => router.push("/kontuzje/dodaj")}
        style={{
          marginBottom: "1rem",
          backgroundColor: "#0070f3",
          color: "#fff",
          padding: "0.5rem 1rem",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        Dodaj nową kontuzję
      </button>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              ID Piłkarza
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Data kontuzji
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Mecz</th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Opis
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Przew. leczenia (dni)
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Akcje
            </th>
          </tr>
        </thead>
        <tbody>
          {lista.map((k) => (
            <tr key={`${k.id_pilkarza}-${k.data_kontuzji}-${k.opis_kontuzji}`}>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                {k.id_pilkarza}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                {new Date(k.data_kontuzji).toLocaleDateString("pl-PL")}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                {k.id_meczu ?? "-"}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                {k.opis_kontuzji}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                {k.przewidywany_czas_leczenia_w_dniach}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                {/* <button
                  onClick={() => handleDelete(k)}
                  style={{
                    backgroundColor: "#a00",
                    color: "#fff",
                    padding: "0.3rem 0.6rem",
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                  }}
                >
                  Usuń
                </button> */}
              </td>
            </tr>
          ))}
          {lista.length === 0 && (
            <tr>
              <td
                colSpan={6}
                style={{ textAlign: "center", padding: "1rem", color: "#666" }}
              >
                Brak kontuzji w bazie.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
