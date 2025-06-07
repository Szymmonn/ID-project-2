// frontend/src/app/sezony/dodaj/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createOne } from "@/api";

export default function SezonDodajPage() {
  const router = useRouter();

  const [idSezonu, setIdSezonu] = useState("");
  const [dataPoczatek, setDataPoczatek] = useState("");
  const [dataKoniec, setDataKoniec] = useState("");
  const [uwagi, setUwagi] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idSezonu || !dataPoczatek || !dataKoniec) return;

    const payload = {
      id_sezonu: parseInt(idSezonu, 10),
      data_poczatek: dataPoczatek,
      data_koniec: dataKoniec,
      uwagi: uwagi || null,
    };

    try {
      await createOne("sezony", payload);
      router.push("/sezony");
    } catch (err) {
      console.error("Błąd tworzenia sezonu:", err);
      alert("Nie udało się dodać sezonu.");
    }
  };

  return (
    <div>
      <h1>Dodaj nowy sezon</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>ID sezonu:</label>
          <br />
          <input
            type="number"
            value={idSezonu}
            onChange={(e) => setIdSezonu(e.target.value)}
            required
          />
        </div>
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
          Zapisz
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
