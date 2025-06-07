// frontend/src/app/transferroom-sprzedaz/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAll, deleteOne } from "@/api";

type OfertaSprzedazy = {
  id_oferta_sprzedarzy: number;
  data_wystawienia: string;
  id_klubu: number;
  id_zawodnika: number;
  cena_startowa?: number;
  uwagi?: string;
};

export default function TransferroomSprzedazPage() {
  const router = useRouter();
  const [oferty, setOferty] = useState<OfertaSprzedazy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOferty = async () => {
    try {
      const res = await getAll("transferroom_sprzedaz");
      setOferty(res.data);
    } catch (err) {
      console.error("Błąd pobierania ofert sprzedaży:", err);
      setError("Nie udało się pobrać listy ofert sprzedaży.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOferty();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Na pewno usunąć tę ofertę sprzedaży?")) return;
    try {
      await deleteOne("transferroom_sprzedaz", id);
      fetchOferty();
    } catch (err) {
      console.error("Błąd usuwania oferty:", err);
      setError("Nie udało się usunąć oferty sprzedaży.");
    }
  };

  if (loading) return <p>Ładowanie ofert sprzedaży…</p>;
  if (error)
    return (
      <div>
        <h1>Błąd</h1>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );

  return (
    <div>
      <h1>Oferty Sprzedaży (Transferroom)</h1>
      <button
        onClick={() => router.push("/transferroom-sprzedaz/dodaj")}
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
        Dodaj nową ofertę
      </button>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>ID</th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Data wystawienia
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              ID klubu
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              ID zawodnika
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Cena startowa
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
          {oferty.map((o) => (
            <tr key={o.id_oferta_sprzedarzy}>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                {o.id_oferta_sprzedarzy}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                {new Date(o.data_wystawienia).toLocaleDateString()}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                {o.id_klubu}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                {o.id_zawodnika}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                {o.cena_startowa ?? "-"}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                {o.uwagi ?? "-"}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                <button
                  onClick={() =>
                    router.push(
                      `/transferroom-sprzedaz/${o.id_oferta_sprzedarzy}/edytuj`
                    )
                  }
                  style={{
                    marginRight: "0.5rem",
                    backgroundColor: "#0a0",
                    color: "#fff",
                    padding: "0.3rem 0.6rem",
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                  }}
                >
                  Edytuj
                </button>
                <button
                  onClick={() => handleDelete(o.id_oferta_sprzedarzy)}
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
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
