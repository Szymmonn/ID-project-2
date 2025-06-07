// frontend/src/app/pilkarze-pozycja/dodaj/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createOne, getAll } from "@/api";

type Pilkarz = {
  id_pilkarza: number;
  imie: string;
  nazwisko: string;
};

type Pozycja = {
  id_pozycja: number;
  skrot: string;
  pelna_nazwa: string;
};

export default function PilkarzPozycjaDodajPage() {
  const router = useRouter();

  const [pilkarze, setPilkarze] = useState<Pilkarz[]>([]);
  const [pozycje, setPozycje] = useState<Pozycja[]>([]);
  const [wybranyPilkarz, setWybranyPilkarz] = useState<number | "">("");
  const [wybranaPozycja, setWybranaPozycja] = useState<number | "">("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Pobierz piłkarzy i pozycje, żeby wypchać selecty
    Promise.all([getAll("pilkarze"), getAll("pozycje")])
      .then(([resPil, resPoz]) => {
        setPilkarze(resPil.data);
        setPozycje(resPoz.data);
      })
      .catch((err) => console.error("Błąd pobierania piłkarzy/pozycji:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (wybranyPilkarz === "" || wybranaPozycja === "") return;
    const payload = {
      id_pilkarza: wybranyPilkarz,
      id_pozycja: wybranaPozycja,
    };

    try {
      await createOne("pilkarz_pozycja", payload);
      router.push("/pilkarze-pozycja");
    } catch (err) {
      console.error("Błąd przypisywania pozycji piłkarzowi:", err);
    }
  };

  if (loading) {
    return <p>Ładowanie formularza…</p>;
  }

  return (
    <div>
      <h1>Przypisz pozycję piłkarzowi</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Piłkarz:</label>
          <br />
          <select
            value={wybranyPilkarz}
            onChange={(e) => setWybranyPilkarz(Number(e.target.value))}
            required
          >
            <option value="">— wybierz piłkarza —</option>
            {pilkarze.map((p) => (
              <option key={p.id_pilkarza} value={p.id_pilkarza}>
                {p.imie} {p.nazwisko} (ID: {p.id_pilkarza})
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Pozycja:</label>
          <br />
          <select
            value={wybranaPozycja}
            onChange={(e) => setWybranaPozycja(Number(e.target.value))}
            required
          >
            <option value="">— wybierz pozycję —</option>
            {pozycje.map((p) => (
              <option key={p.id_pozycja} value={p.id_pozycja}>
                {p.skrot} — {p.pelna_nazwa}
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
          Przypisz
        </button>
        <button
          type="button"
          onClick={() => router.push("/pilkarze-pozycja")}
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
