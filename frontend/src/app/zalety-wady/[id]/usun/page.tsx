// frontend/src/app/zalety-wady/[id]/usun/page.tsx
"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getOne, deleteOne } from "@/api";

type Cecha = {
  id_cechy: number;
  opis: string;
};

export default function ZaletyWadyUsunPage() {
  const router = useRouter();
  const params = useParams(); // { id: "123" }
  const idCecha = Number(params?.id);

  const [cecha, setCecha] = useState<Cecha | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!idCecha) {
      setError("Brak ID cechy w URL.");
      setLoading(false);
      return;
    }
    getOne("zalety_wady", idCecha)
      .then((res) => {
        setCecha(res.data);
      })
      .catch((err) => {
        console.error("Błąd pobierania cechy do usunięcia:", err);
        setError("Nie udało się pobrać cechy.");
      })
      .finally(() => setLoading(false));
  }, [idCecha]);

  const handleDelete = async () => {
    if (!idCecha) return;
    try {
      await deleteOne("zalety_wady", idCecha);
      router.push("/zalety-wady");
    } catch (err) {
      console.error("Błąd usuwania cechy:", err);
      setError("Nie udało się usunąć cechy.");
    }
  };

  if (loading) return <p>Ładowanie danych cechy…</p>;
  if (error)
    return (
      <div>
        <h1>Błąd</h1>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );

  return (
    <div>
      <h1>Usuń cechę (ID: {idCecha})</h1>
      {cecha && (
        <div style={{ marginBottom: "1rem" }}>
          <p>
            <strong>Opis:</strong> {cecha.opis}
          </p>
        </div>
      )}
      <p>Czy na pewno chcesz usunąć tę cechę?</p>
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
        onClick={() => router.push("/zalety-wady")}
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
