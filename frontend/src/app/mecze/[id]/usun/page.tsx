// frontend/src/app/mecze/[id]/usun/page.tsx
"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getOne, deleteOne } from "@/api";

type Mecz = {
  id_meczu: number;
  id_gospodarze: number;
  id_goscie: number;
  data: string; // ISO date string
  id_stadionu: number;
  nierozstrzygniety: boolean;
  rodzaj_meczu: string | null;
  uwagi: string | null;
};

export default function MeczeUsunPage() {
  const router = useRouter();
  const params = useParams(); // { id: "123" }
  const idMeczu = Number(params?.id);

  const [mecz, setMecz] = useState<Mecz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!idMeczu) {
      setError("Brak ID meczu w URL.");
      setLoading(false);
      return;
    }
    getOne("mecze", idMeczu)
      .then((res) => {
        setMecz(res.data);
      })
      .catch((err) => {
        console.error("Błąd pobierania meczu do usunięcia:", err);
        setError("Nie udało się pobrać meczu.");
      })
      .finally(() => setLoading(false));
  }, [idMeczu]);

  const handleDelete = async () => {
    if (!idMeczu) return;
    try {
      await deleteOne("mecze", idMeczu);
      router.push("/mecze");
    } catch (err) {
      console.error("Błąd usuwania meczu:", err);
      setError("Nie udało się usunąć meczu.");
    }
  };

  if (loading) return <p>Ładowanie danych meczu…</p>;
  if (error)
    return (
      <div>
        <h1>Błąd</h1>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );

  return (
    <div>
      <h1>Usuń mecz (ID: {idMeczu})</h1>
      {mecz && (
        <div style={{ marginBottom: "1rem" }}>
          <p>
            <strong>Gospodarze:</strong> {mecz.id_gospodarze} <br />
            <strong>Goście:</strong> {mecz.id_goscie} <br />
            <strong>Data:</strong>{" "}
            {new Date(mecz.data).toLocaleDateString("pl-PL")} <br />
            <strong>Stadion:</strong> {mecz.id_stadionu} <br />
            <strong>Nierozstrzygnięty:</strong>{" "}
            {mecz.nierozstrzygniety ? "Tak" : "Nie"} <br />
            <strong>Rodzaj:</strong> {mecz.rodzaj_meczu || "-"} <br />
            <strong>Uwagi:</strong> {mecz.uwagi || "-"}
          </p>
        </div>
      )}
      <p>Czy na pewno chcesz usunąć ten mecz?</p>
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
        onClick={() => router.push("/mecze")}
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
