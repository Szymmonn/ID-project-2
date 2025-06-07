// frontend/src/app/pozycje/dodaj/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createOne } from "@/api";

export default function PozycjaDodajPage() {
  const router = useRouter();
  const [skrot, setSkrot] = useState("");
  const [pelnaNazwa, setPelnaNazwa] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      skrot,
      pelna_nazwa: pelnaNazwa,
    };

    try {
      await createOne("pozycje", payload);
      router.push("/pozycje");
    } catch (err) {
      console.error("Błąd tworzenia pozycji:", err);
    }
  };

  return (
    <div>
      <h1>Dodaj nową pozycję</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Skrot:</label>
          <br />
          <input
            type="text"
            value={skrot}
            onChange={(e) => setSkrot(e.target.value)}
            required
            maxLength={10}
          />
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Pełna nazwa:</label>
          <br />
          <input
            type="text"
            value={pelnaNazwa}
            onChange={(e) => setPelnaNazwa(e.target.value)}
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
          onClick={() => router.push("/pozycje")}
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
