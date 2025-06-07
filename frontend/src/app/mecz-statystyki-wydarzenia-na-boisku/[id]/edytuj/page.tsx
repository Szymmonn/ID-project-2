"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getOne, updateOne } from "@/api";

type Wydarzenie = {
  id_wydarzenia: number;
  nazwa: string;
};

export default function MeczStatystykiWydarzeniaEdytujPage() {
  const router = useRouter();
  const params = useParams(); // { idWydarzenia: "123" }
  const idWydarzenia = Number(params?.idWydarzenia);

  const [nazwa, setNazwa] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!idWydarzenia) {
      setError("Brak ID wydarzenia w URL.");
      setLoading(false);
      return;
    }

    getOne("mecz_statystyki_wydarzenia", idWydarzenia)
      .then((res) => {
        const data: Wydarzenie = res.data;
        setNazwa(data.nazwa);
      })
      .catch((err) => {
        console.error("Błąd pobierania wydarzenia:", err);
        setError("Nie udało się pobrać danych wydarzenia.");
      })
      .finally(() => setLoading(false));
  }, [idWydarzenia]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (nazwa.trim() === "") {
      setError("Proszę podać nazwę wydarzenia.");
      return;
    }

    try {
      await updateOne("mecz_statystyki_wydarzenia", idWydarzenia, { nazwa: nazwa.trim() });
      router.push("/mecz_statystyki_wydarzenia");
    } catch (err) {
      console.error("Błąd aktualizacji wydarzenia:", err);
      setError("Nie udało się zaktualizować. Spróbuj ponownie.");
    }
  };

  if (loading) return <p>Ładowanie danych wydarzenia…</p>;
  if (error)
    return (
      <div>
        <h1>Błąd</h1>
        <p style={{ color: "red" }}>{error}</p>
        <button onClick={() => router.push("/mecz_statystyki_wydarzenia")} style={{ marginTop: 16 }}>
          Powrót do listy
        </button>
      </div>
    );

  return (
    <div>
      <h1>Edytuj typ wydarzenia (ID: {idWydarzenia})</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Nazwa wydarzenia:</label>
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
          Zapisz
        </button>
        <button
          type="button"
          onClick={() => router.push("/mecz_statystyki_wydarzenia")}
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
