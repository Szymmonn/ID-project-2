// frontend/src/app/oferty-klub-pilkarz/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAll, deleteOne } from "@/api";

type OfertaKlubPilkarz = {
  id_oferty_dla_pilkarza: number;
  id_pilkarza: number;
  id_klubu: number;
  data_zlozenia_oferty: string;      // YYYY-MM-DD
  data_poczatek_kontraktu: string;   // YYYY-MM-DD
  data_koniec_kontraktu: string;     // YYYY-MM-DD
  czy_przyjeta?: boolean;
  do_negocjacji?: boolean;
  kto_sklada_oferte: string;
  czestosc_wystepow_w_procentach: number;
  placa_miesieczna: number;
  kwota_gotowkowa?: number | null;
  oplata_dla_agenta?: number | null;
  premia_za_wystep?: number | null;
  premia_za_bramke?: number | null;
  premia_za_niewykorzystanego_rezerwowego?: number | null;
  uwagi?: string | null;
};

export default function OfertyKlubPilkarzListPage() {
  const [oferty, setOferty] = useState<OfertaKlubPilkarz[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOferty = async () => {
    try {
      const res = await getAll("oferty_transferowe_klub_pilkarz");
      setOferty(res.data);
    } catch (err) {
      console.error("Błąd pobierania listy ofert klub→piłkarz:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOferty();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm(`Na pewno chcesz usunąć ofertę o ID ${id}?`)) return;
    try {
      await deleteOne("oferty_transferowe_klub_pilkarz", id);
      setOferty((prev) =>
        prev.filter((o) => o.id_oferty_dla_pilkarza !== id)
      );
    } catch (err) {
      console.error("Błąd przy usuwaniu oferty:", err);
      alert("Nie udało się usunąć oferty.");
    }
  };

  if (loading) {
    return <p>Ładowanie listy ofert klub→piłkarz…</p>;
  }

  return (
    <div>
      <h1>Oferty Transferowe – Klub → Piłkarz</h1>
      <Link href="/oferty-klub-pilkarz/dodaj">
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
          Dodaj nową ofertę
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
              Piłkarz (ID)
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Klub (ID)
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Data złożenia
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Płaca mies.
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Czy przyjęta?
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Akcje
            </th>
          </tr>
        </thead>
        <tbody>
          {oferty.length > 0 ? (
            oferty.map((o) => (
              <tr key={o.id_oferty_dla_pilkarza}>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {o.id_oferty_dla_pilkarza}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {o.id_pilkarza}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {o.id_klubu}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {o.data_zlozenia_oferty}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {o.placa_miesieczna}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {o.czy_przyjeta ? "Tak" : "Nie"}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  <Link
                    href={`/oferty-klub-pilkarz/edytuj/${o.id_oferty_dla_pilkarza}`}
                  >
                    <button style={{ marginRight: 4 }}>Edytuj</button>
                  </Link>
                  <button
                    onClick={() =>
                      handleDelete(o.id_oferty_dla_pilkarza)
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
                colSpan={7}
                style={{ border: "1px solid #ccc", padding: "0.5rem" }}
              >
                Brak ofert w bazie
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
