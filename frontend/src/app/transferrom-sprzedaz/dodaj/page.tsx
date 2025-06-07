// frontend/src/app/transferroom-sprzedaz/dodaj/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createOne } from "@/api";

export default function TransferroomSprzedazDodajPage() {
  const router = useRouter();
  const [dataWystawienia, setDataWystawienia] = useState<string>("");
  const [idKlubu, setIdKlubu] = useState<number | "">("");
  const [idZawodnika, setIdZawodnika] = useState<number | "">("");
  const [cenaStartowa, setCenaStartowa] = useState<number | "">("");
  const [uwagi, setUwagi] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dataWystawienia || !idKlubu || !idZawodnika) {
      setError("Wypełnij wszystkie wymagane pola (data, klub, zawodnik).");
      return;
    }

    try {
      await createOne("transferroom_sprzedaz", {
        data_wystawienia: dataWystawienia,
        id_klubu: Number(idKlubu),
        id_zawodnika: Number(idZawodnika),
        cena_startowa: cenaStartowa === "" ? undefined : Number(cenaStartowa),
        uwagi: uwagi || undefined,
      });
      router.push("/transferroom-sprzedaz");
    } catch (err) {
      console.error("Błąd tworzenia oferty sprzedaży:", err);
      setError("Nie udało się dodać nowej oferty. Spróbuj ponownie.");
    }
  };

  return (
    <div>
      <h1>Dodaj nową ofertę sprzedaży</h1>
      {error && (
        <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>
      )}
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Data wystawienia (YYYY-MM-DD):</label>
          <br />
          <input
            type="date"
            value={dataWystawienia}
            onChange={(e) => setDataWystawienia(e.target.value)}
            required
            style={{ width: "100%", padding: "0.4rem" }}
          />
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>ID klubu:</label>
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
          <label>ID zawodnika:</label>
          <br />
          <input
            type="number"
            value={idZawodnika}
            onChange={(e) => setIdZawodnika(Number(e.target.value))}
            required
            style={{ width: "100%", padding: "0.4rem" }}
          />
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Cena startowa (opcjonalnie):</label>
          <br />
          <input
            type="number"
            value={cenaStartowa}
            onChange={(e) => setCenaStartowa(e.target.value === "" ? "" : Number(e.target.value))}
            style={{ width: "100%", padding: "0.4rem" }}
          />
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Uwagi (opcjonalnie):</label>
          <br />
          <textarea
            value={uwagi}
            onChange={(e) => setUwagi(e.target.value)}
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
          Dodaj ofertę
        </button>
        <button
          type="button"
          onClick={() => router.push("/transferroom-sprzedaz")}
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
