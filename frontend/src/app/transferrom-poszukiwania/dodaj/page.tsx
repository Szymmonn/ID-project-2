// frontend/src/app/transferroom-poszukiwania/dodaj/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createOne } from "@/api";

export default function TransferroomPoszukiwaniaDodajPage() {
  const router = useRouter();
  const [idKlubu, setIdKlubu] = useState<number | "">("");
  const [idPozycji, setIdPozycji] = useState<number | "">("");
  const [cenaDo, setCenaDo] = useState<number | "">("");
  const [wiekMax, setWiekMax] = useState<number | "">("");
  const [idKraju, setIdKraju] = useState<number | "">("");
  const [idLigi, setIdLigi] = useState<number | "">("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idKlubu) {
      setError("Pole ID klubu jest wymagane.");
      return;
    }

    try {
      await createOne("transferroom_poszukiwania", {
        id_klubu: Number(idKlubu),
        id_pozycja: idPozycji === "" ? undefined : Number(idPozycji),
        cena_do: cenaDo === "" ? undefined : Number(cenaDo),
        wiek_max: wiekMax === "" ? undefined : Number(wiekMax),
        id_kraju: idKraju === "" ? undefined : Number(idKraju),
        id_ligi: idLigi === "" ? undefined : Number(idLigi),
      });
      router.push("/transferroom-poszukiwania");
    } catch (err) {
      console.error("Błąd tworzenia poszukiwania:", err);
      setError("Nie udało się dodać poszukiwania. Spróbuj ponownie.");
    }
  };

  return (
    <div>
      <h1>Dodaj nowe poszukiwanie</h1>
      {error && (
        <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>
      )}
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>ID klubu (wymagane):</label>
          <br />
          <input
            type="number"
            value={idKlubu}
            onChange={(e) => setIdKlubu(Number(e.target.value))}
            required
            style={{ width: "100%", padding: "0.4rem" }}
          />
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label>ID pozycji (opcjonalnie):</label>
          <br />
          <input
            type="number"
            value={idPozycji}
            onChange={(e) => setIdPozycji(e.target.value === "" ? "" : Number(e.target.value))}
            style={{ width: "100%", padding: "0.4rem" }}
          />
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label>Cena do (opcjonalnie):</label>
          <br />
          <input
            type="number"
            value={cenaDo}
            onChange={(e) => setCenaDo(e.target.value === "" ? "" : Number(e.target.value))}
            style={{ width: "100%", padding: "0.4rem" }}
          />
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label>Wiek max (opcjonalnie):</label>
          <br />
          <input
            type="number"
            value={wiekMax}
            onChange={(e) => setWiekMax(e.target.value === "" ? "" : Number(e.target.value))}
            style={{ width: "100%", padding: "0.4rem" }}
          />
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label>ID kraju (opcjonalnie):</label>
          <br />
          <input
            type="number"
            value={idKraju}
            onChange={(e) => setIdKraju(e.target.value === "" ? "" : Number(e.target.value))}
            style={{ width: "100%", padding: "0.4rem" }}
          />
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label>ID ligi (opcjonalnie):</label>
          <br />
          <input
            type="number"
            value={idLigi}
            onChange={(e) => setIdLigi(e.target.value === "" ? "" : Number(e.target.value))}
            style={{ width: "100%", padding: "0.4rem" }}
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
          Dodaj poszukiwanie
        </button>
        <button
          type="button"
          onClick={() => router.push("/transferroom-poszukiwania")}
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
