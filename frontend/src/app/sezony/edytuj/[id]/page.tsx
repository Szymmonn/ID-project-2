// frontend/src/app/sezony/edytuj/[id]/page.tsx
"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getOne, updateOne } from "@/api";

type Sezon = {
  id_sezonu: number;
  data_poczatek: string;
  data_koniec: string;
  uwagi?: string | null;
};

export default function SezonEdytujPage() {
  const router = useRouter();
  const params = useParams(); // { id: "123" }
  const id = params?.id!;

  const [loaded, setLoaded] = useState(false);
  const [dataPoczatek, setDataPoczatek] = useState("");
  const [dataKoniec, setDataKoniec] = useState("");
  const [uwagi, setUwagi] = useState("");

  useEffect(() => {
    if (!loaded) {
      getOne("sezony", id)
        .then((res) => {
          const s: Sezon = res.data;
          setDataPoczatek(s.data_poczatek);
          setDataKoniec(s.data_koniec);
          setUwagi(s.uwagi || "");
        })
        .catch((err) => console.error("Błąd pobierania sezonu:", err))
        .finally(() => setLoaded(true));
    }
  }, [loaded, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dataPoczatek || !dataKoniec) return;

    const payload = {
      data_poczatek: dataPoczatek,
      data_koniec: dataKoniec,
      uwagi: uwagi || null,
    };

    try {
      await updateOne("sezony", id, payload);
      router.push("/sezony");
    } catch (err) {
      console.error("Błąd aktualizacji sezonu:", err);
      alert("Nie udało się zaktualizować sezonu.");
    }
  };

  if (!loaded) {
    return <p>Ładowanie danych sezonu…</p>;
  }

  return (
    <div>
      <h1>Edytuj sezon (ID: {id})</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Data początek:</label>
          <br />
          <input
            type="date"
            value={dataPoczatek}
            onChange={(e) => setDataPoczatek(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Data koniec:</label>
          <br />
          <input
            type="date"
            value={dataKoniec}
            onChange={(e) => setDataKoniec(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Uwagi (opcjonalnie):</label>
          <br />
          <input
            type="text"
            value={uwagi}
            onChange={(e) => setUwagi(e.target.value)}
          />
        </div>

        <button
          type="submit"
          style={{
            marginTop: "1rem",
            backgroundColor: "#0070f3",
            color: "#fff",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Aktualizuj
        </button>
        <button
          type="button"
          onClick={() => router.push("/sezony")}
          style={{
            marginTop: "1rem",
            marginLeft: "1rem",
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
      </form>
    </div>
  );
}
