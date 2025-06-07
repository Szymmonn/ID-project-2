// frontend/src/app/zalety-wady/dodaj/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createOne } from "@/api";

export default function ZaletyWadyDodajPage() {
  const router = useRouter();

  const [opis, setOpis] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!opis.trim()) {
      setError("Pole „Opis” nie może być puste.");
      return;
    }

    try {
      await createOne("zalety_wady", { opis: opis.trim() });
      router.push("/zalety-wady");
    } catch (err) {
      console.error("Błąd tworzenia cechy:", err);
      setError("Nie udało się dodać nowej cechy. Spróbuj ponownie.");
    }
  };

  return (
    <div>
      <h1>Dodaj nową zaletę/wadę piłkarza</h1>
      {error && (
        <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>
      )}
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Opis (wymagane):</label>
          <br />
          <textarea
            value={opis}
            onChange={(e) => setOpis(e.target.value)}
            required
            rows={3}
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
          Dodaj cechę
        </button>
        <button
          type="button"
          onClick={() => router.push("/zalety-wady")}
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
