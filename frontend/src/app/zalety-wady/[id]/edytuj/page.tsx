// frontend/src/app/zalety-wady/[id]/edytuj/page.tsx
"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getOne, updateOne } from "@/api";

type Cecha = {
  id_cechy: number;
  opis: string;
};

export default function ZaletyWadyEdytujPage() {
  const router = useRouter();
  const params = useParams(); // { id: "123" }
  const idCecha = Number(params?.id);

  const [cecha, setCecha] = useState<Cecha | null>(null);
  const [opis, setOpis] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!idCecha) {
      setError("Brak ID cechy w URL.");
      setLoading(false);
      return;
    }
    getOne("zalety_wady", idCecha)
      .then((res) => {
        const d: Cecha = res.data;
        setCecha(d);
        setOpis(d.opis);
      })
      .catch((err) => {
        console.error("Błąd pobierania cechy:", err);
        setError("Nie udało się pobrać cechy do edycji.");
      })
      .finally(() => setLoading(false));
  }, [idCecha]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idCecha) return;
    if (!opis.trim()) {
      setError("Pole „Opis” nie może być puste.");
      return;
    }

    try {
      await updateOne("zalety_wady", idCecha, { opis: opis.trim() });
      router.push("/zalety-wady");
    } catch (err) {
      console.error("Błąd aktualizacji cechy:", err);
      setError("Nie udało się zaktualizować cechy. Spróbuj ponownie.");
    }
  };

  if (loading) return <p>Ładowanie danych cechy…</p>;
  if (error)
    return (
      <div>
        <h1>Błąd</h1>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );

  return (
    <div>
      <h1>Edytuj cechę (ID: {idCecha})</h1>
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
          Zapisz zmiany
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
