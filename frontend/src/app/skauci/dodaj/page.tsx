"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createOne } from "@/api";

export default function SkauciDodajPage() {
  const router = useRouter();
  const [imie, setImie] = useState<string>("");
  const [nazwisko, setNazwisko] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imie.trim() || !nazwisko.trim()) {
      setError("Proszę podać zarówno imię, jak i nazwisko.");
      return;
    }

    try {
      await createOne("skauci", {
        imie: imie.trim(),
        nazwisko: nazwisko.trim(),
      });
      router.push("/skauci");
    } catch (err) {
      console.error("Błąd tworzenia skauta:", err);
      setError("Nie udało się dodać skauta. Spróbuj ponownie.");
    }
  };

  return (
    <div>
      <h1>Dodaj nowego skauta</h1>
      {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Imię:</label>
          <br />
          <input
            type="text"
            value={imie}
            onChange={(e) => setImie(e.target.value)}
            required
            style={{ width: "100%", padding: "0.4rem" }}
          />
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Nazwisko:</label>
          <br />
          <input
            type="text"
            value={nazwisko}
            onChange={(e) => setNazwisko(e.target.value)}
            required
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
          Dodaj skauta
        </button>
        <button
          type="button"
          onClick={() => router.push("/skauci")}
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
