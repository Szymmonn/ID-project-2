// frontend/src/app/stadiony/dodaj/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createOne } from "@/api";

export default function StadionDodajPage() {
  const router = useRouter();

  const [nazwa, setNazwa] = useState("");
  const [miasto, setMiasto] = useState("");
  const [idKraju, setIdKraju] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      nazwa,
      miasto,
      id_kraju: parseInt(idKraju, 10),
    };

    try {
      await createOne("stadiony", payload);
      router.push("/stadiony");
    } catch (err) {
      console.error("Błąd tworzenia stadionu:", err);
      alert("Nie udało się dodać stadionu.");
    }
  };

  return (
    <div>
      <h1>Dodaj nowy stadion</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Nazwa:</label>
          <br />
          <input
            type="text"
            value={nazwa}
            onChange={(e) => setNazwa(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Miasto:</label>
          <br />
          <input
            type="text"
            value={miasto}
            onChange={(e) => setMiasto(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>ID kraju:</label>
          <br />
          <input
            type="number"
            value={idKraju}
            onChange={(e) => setIdKraju(e.target.value)}
            required
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
          onClick={() => router.push("/stadiony")}
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
