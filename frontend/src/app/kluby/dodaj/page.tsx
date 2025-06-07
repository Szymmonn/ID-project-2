"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createOne } from "@/api";

export default function KlubyDodajPage() {
  const router = useRouter();

  const [nazwa, setNazwa] = useState("");
  const [miasto, setMiasto] = useState("");
  const [idStadionu, setIdStadionu] = useState<number | "">("");
  const [rokZalozenia, setRokZalozenia] = useState<number | "">("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nazwa.trim() || !miasto.trim()) {
      setError("Nazwa i miasto są wymagane.");
      return;
    }

    const payload = {
      nazwa: nazwa.trim(),
      miasto: miasto.trim(),
      id_stadionu: idStadionu === "" ? null : idStadionu,
      rok_zalozenia: rokZalozenia === "" ? null : rokZalozenia,
    };

    try {
      await createOne("kluby", payload);
      router.push("/kluby");
    } catch (err) {
      console.error("Błąd tworzenia klubu:", err);
      setError("Nie udało się utworzyć klubu. Spróbuj ponownie.");
    }
  };

  return (
    <div>
      <h1>Dodaj nowy klub</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
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
          <label>ID stadionu (opcjonalnie):</label>
          <br />
          <input
            type="number"
            value={idStadionu}
            onChange={(e) =>
              setIdStadionu(
                e.target.value === "" ? "" : parseInt(e.target.value, 10)
              )
            }
            min={1}
          />
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Rok założenia (opcjonalnie):</label>
          <br />
          <input
            type="number"
            value={rokZalozenia}
            onChange={(e) =>
              setRokZalozenia(
                e.target.value === "" ? "" : parseInt(e.target.value, 10)
              )
            }
            min={0}
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
          onClick={() => router.push("/kluby")}
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
