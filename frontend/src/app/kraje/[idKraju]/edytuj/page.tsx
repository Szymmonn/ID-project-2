"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getOne, updateOne } from "@/api";

type Kraj = {
  id_kraju: number;
  nazwa: string;
};

export default function KrajeEdytujPage() {
  const router = useRouter();
  const params = useParams();
  const idKraju = Number(params?.idKraju);

  const [nazwa, setNazwa] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!idKraju) {
      setError("Brak ID kraju w URL.");
      setLoading(false);
      return;
    }
    // Pobierz dane kraju
    getOne("kraje", idKraju)
      .then((res) => {
        const data: Kraj = res.data;
        setNazwa(data.nazwa);
      })
      .catch((err) => {
        console.error("Błąd pobierania kraju:", err);
        setError("Nie udało się pobrać danych kraju.");
      })
      .finally(() => setLoading(false));
  }, [idKraju]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (nazwa.trim() === "") {
      setError("Proszę podać nazwę kraju.");
      return;
    }
    try {
      await updateOne("kraje", idKraju, { nazwa: nazwa.trim() });
      router.push("/kraje");
    } catch (err) {
      console.error("Błąd aktualizacji kraju:", err);
      setError("Nie udało się zaktualizować kraju.");
    }
  };

  if (loading) return <p>Ładowanie danych kraju…</p>;
  if (error)
    return (
      <div>
        <h1>Błąd</h1>
        <p style={{ color: "red" }}>{error}</p>
        <button
          onClick={() => router.push("/kraje")}
          style={{ marginTop: 16 }}
        >
          Powrót do listy krajów
        </button>
      </div>
    );

  return (
    <div>
      <h1>Edytuj kraj (ID: {idKraju})</h1>
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
          Zapisz zmiany
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
