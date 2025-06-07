"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createOne } from "@/api";

export default function KrajeDodajPage() {
  const router = useRouter();

  const [nazwa, setNazwa] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (nazwa.trim() === "") {
      setError("Proszę podać nazwę kraju.");
      return;
    }

    try {
      await createOne("kraje", { nazwa: nazwa.trim() });
      router.push("/kraje");
    } catch (err) {
      console.error("Błąd tworzenia kraju:", err);
      setError("Nie udało się dodać kraju. Spróbuj ponownie.");
    }
  };

  return (
    <div>
      <h1>Dodaj nowy kraj</h1>
      {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Nazwa kraju:</label>
          <br />
          <input
            type="text"
            value={nazwa}
            onChange={(e) => setNazwa(e.target.value)}
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
          Dodaj kraj
        </button>
        <button
          type="button"
          onClick={() => router.push("/kraje")}
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
