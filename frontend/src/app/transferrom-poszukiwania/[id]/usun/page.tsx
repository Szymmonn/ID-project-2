// frontend/src/app/transferroom-poszukiwania/[id]/usun/page.tsx
"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getOne, deleteOne } from "@/api";

type Poszukiwanie = {
  id_poszukiwania: number;
  id_klubu: number;
  id_pozycja?: number;
  cena_do?: number;
  wiek_max?: number;
  id_kraju?: number;
  id_ligi?: number;
};

export default function TransferroomPoszukiwaniaUsunPage() {
  const router = useRouter();
  const params = useParams(); // { id: "123" }
  const idPoszukiwania = Number(params?.id);

  const [oferta, setOferta] = useState<Poszukiwanie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!idPoszukiwania) {
      setError("Brak ID poszukiwania w URL.");
      setLoading(false);
      return;
    }

    getOne("transferroom_poszukiwania", idPoszukiwania)
      .then((res) => {
        setOferta(res.data);
      })
      .catch((err) => {
        console.error("Błąd pobierania poszukiwania do usunięcia:", err);
        setError("Nie udało się pobrać poszukiwania.");
      })
      .finally(() => setLoading(false));
  }, [idPoszukiwania]);

  const handleDelete = async () => {
    if (!idPoszukiwania) return;
    try {
      await deleteOne("transferroom_poszukiwania", idPoszukiwania);
      router.push("/transferroom-poszukiwania");
    } catch (err) {
      console.error("Błąd usuwania poszukiwania:", err);
      setError("Nie udało się usunąć poszukiwania.");
    }
  };

  if (loading) return <p>Ładowanie danych poszukiwania…</p>;
  if (error)
    return (
      <div>
        <h1>Błąd</h1>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );

  return (
    <div>
      <h1>Usuń poszukiwanie (ID: {idPoszukiwania})</h1>
      {oferta && (
        <div style={{ marginBottom: "1rem" }}>
          <p>
            <strong>ID klubu:</strong> {oferta.id_klubu}
          </p>
          <p>
            <strong>ID pozycji:</strong> {oferta.id_pozycja ?? "-"}
          </p>
          <p>
            <strong>Cena do:</strong> {oferta.cena_do ?? "-"}
          </p>
          <p>
            <strong>Wiek max:</strong> {oferta.wiek_max ?? "-"}
          </p>
          <p>
            <strong>ID kraju:</strong> {oferta.id_kraju ?? "-"}
          </p>
          <p>
            <strong>ID ligi:</strong> {oferta.id_ligi ?? "-"}
          </p>
        </div>
      )}
      <p>Czy na pewno chcesz usunąć to poszukiwanie?</p>
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
        onClick={() => router.push("/transferroom-poszukiwania")}
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
