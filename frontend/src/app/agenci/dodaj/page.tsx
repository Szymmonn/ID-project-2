// frontend/src/app/agenci/dodaj/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createOne } from "@/api";

export default function AgentDodajPage() {
  const router = useRouter();

  const [imie, setImie] = useState("");
  const [nazwisko, setNazwisko] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { imie, nazwisko };

    try {
      await createOne("agenci", payload);
      router.push("/agenci");
    } catch (err) {
      console.error("Błąd tworzenia agenta:", err);
      alert("Nie udało się dodać agenta.");
    }
  };

  return (
    <div>
      <h1>Dodaj nowego agenta</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Imię:</label>
          <br />
          <input
            type="text"
            value={imie}
            onChange={(e) => setImie(e.target.value)}
            required
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
          onClick={() => router.push("/agenci")}
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
