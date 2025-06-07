// frontend/src/app/ligi/dodaj/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createOne, getAll } from "@/api";

type Kraj = { id_kraju: number; nazwa: string };

export default function LigaDodajPage() {
  const router = useRouter();

  const [kraje, setKraje] = useState<Kraj[]>([]);
  const [nazwa, setNazwa] = useState("");
  const [wybranyKraj, setWybranyKraj] = useState<number | "">("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAll("kraje")
      .then((res) => setKraje(res.data))
      .catch((err) => console.error("Błąd pobierania krajów:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nazwa || !wybranyKraj) return;

    const payload = {
      nazwa,
      id_kraju: wybranyKraj,
    };

    try {
      await createOne("ligi", payload);
      router.push("/ligi");
    } catch (err) {
      console.error("Błąd tworzenia ligi:", err);
      alert("Nie udało się dodać ligi.");
    }
  };

  if (loading) {
    return <p>Ładowanie formularza…</p>;
  }

  return (
    <div>
      <h1>Dodaj nową ligę</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Nazwa ligi:</label>
          <br />
          <input
            type="text"
            value={nazwa}
            onChange={(e) => setNazwa(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Kraj (ID):</label>
          <br />
          <select
            value={wybranyKraj}
            onChange={(e) => setWybranyKraj(Number(e.target.value))}
            required
          >
            <option value="">— wybierz kraj —</option>
            {kraje.map((k) => (
              <option key={k.id_kraju} value={k.id_kraju}>
                {k.nazwa} (ID: {k.id_kraju})
              </option>
            ))}
          </select>
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
          onClick={() => router.push("/ligi")}
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
