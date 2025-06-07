// frontend/src/app/transferroom-sprzedaz/[id]/usun/page.tsx
"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { deleteOne, getOne } from "@/api";

type OfertaSprzedazy = {
  id_oferta_sprzedarzy: number;
  data_wystawienia: string;
  id_klubu: number;
  id_zawodnika: number;
  cena_startowa?: number;
  uwagi?: string;
};

export default function TransferroomSprzedazUsunPage() {
  const router = useRouter();
  const params = useParams(); // { id: "123" }
  const idOferta = Number(params?.id);

  const [oferta, setOferta] = useState<OfertaSprzedazy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!idOferta) {
      setError("Brak ID oferty w URL.");
      setLoading(false);
      return;
    }

    // Pobierz szczegóły oferty, by wyświetlić użytkownikowi
    getOne("transferroom_sprzedaz", idOferta)
      .then((res) => {
        setOferta(res.data);
      })
      .catch((err) => {
        console.error("Błąd pobierania oferty do usunięcia:", err);
        setError("Nie udało się pobrać oferty.");
      })
      .finally(() => setLoading(false));
  }, [idOferta]);

  const handleDelete = async () => {
    if (!idOferta) return;
    try {
      await deleteOne("transferroom_sprzedaz", idOferta);
      router.push("/transferroom-sprzedaz");
    } catch (err) {
      console.error("Błąd usuwania oferty:", err);
      setError("Nie udało się usunąć oferty.");
    }
  };

  if (loading) return <p>Ładowanie danych oferty…</p>;
  if (error)
    return (
      <div>
        <h1>Błąd</h1>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );

  return (
    <div>
      <h1>Usuń ofertę sprzedaży (ID: {idOferta})</h1>
      {oferta && (
        <div style={{ marginBottom: "1rem" }}>
          <p>
            <strong>Data wystawienia:</strong>{" "}
            {new Date(oferta.data_wystawienia).toLocaleDateString()}
          </p>
          <p>
            <strong>ID klubu:</strong> {oferta.id_klubu}
          </p>
          <p>
            <strong>ID zawodnika:</strong> {oferta.id_zawodnika}
          </p>
          <p>
            <strong>Cena startowa:</strong>{" "}
            {oferta.cena_startowa ?? "-"}
          </p>
          <p>
            <strong>Uwagi:</strong> {oferta.uwagi ?? "-"}
          </p>
        </div>
      )}
      <p>Czy na pewno chcesz usunąć tę ofertę?</p>
      <button
        onClick={handleDelete}
        style={{
          marginRight: "1rem",
          backgroundColor: "#a00",
          color: "#fff",
          padding: "0.5rem 1rem",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        TAK, usuń
      </button>
      <button
        onClick={() => router.push("/transferroom-sprzedaz")}
        style={{
          backgroundColor: "#aaa",
          color: "#fff",
          padding: "0.5rem 1rem",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        Anuluj
      </button>
    </div>
  );
}
