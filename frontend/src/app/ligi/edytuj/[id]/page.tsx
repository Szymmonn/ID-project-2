// frontend/src/app/ligi/edytuj/[id]/page.tsx
"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getOne, updateOne, getAll } from "@/api";

type Liga = {
  id_ligi: number;
  nazwa: string;
  id_kraju: number;
};
type Kraj = { id_kraju: number; nazwa: string };

export default function LigaEdytujPage() {
  const router = useRouter();
  const params = useParams(); // { id: "123" }
  const id = params?.id!;

  const [loaded, setLoaded] = useState(false);
  const [kraje, setKraje] = useState<Kraj[]>([]);
  const [nazwa, setNazwa] = useState("");
  const [wybranyKraj, setWybranyKraj] = useState<number | "">("");

  useEffect(() => {
    if (!loaded) {
      // Pobieramy najpierw listę krajów, potem dane ligi
      Promise.all([getAll("kraje"), getOne("ligi", id)])
        .then(([resKraje, resLiga]) => {
          setKraje(resKraje.data);
          const l: Liga = resLiga.data;
          setNazwa(l.nazwa);
          setWybranyKraj(l.id_kraju);
        })
        .catch((err) => console.error("Błąd pobierania:", err))
        .finally(() => setLoaded(true));
    }
  }, [loaded, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nazwa || !wybranyKraj) return;

    const payload = {
      nazwa,
      id_kraju: wybranyKraj,
    };

    try {
      await updateOne("ligi", id, payload);
      router.push("/ligi");
    } catch (err) {
      console.error("Błąd aktualizacji ligi:", err);
      alert("Nie udało się zaktualizować ligi.");
    }
  };

  if (!loaded) {
    return <p>Ładowanie danych ligi…</p>;
  }

  return (
    <div>
      <h1>Edytuj ligę (ID: {id})</h1>
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
          Aktualizuj
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
