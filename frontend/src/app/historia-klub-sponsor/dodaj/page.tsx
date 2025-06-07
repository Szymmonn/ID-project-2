// frontend/src/app/historia-klub-sponsor/dodaj/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createOne, getAll } from "@/api";

type Klub = { id_klubu: number; nazwa: string };
type Sponsor = { id_sponsora: number; nazwa: string };

export default function HistoriaKlubSponsorDodajPage() {
  const router = useRouter();

  const [kluby, setKluby] = useState<Klub[]>([]);
  const [sponsorzy, setSponsorzy] = useState<Sponsor[]>([]);

  const [wybranyKlub, setWybranyKlub] = useState<number | "">("");
  const [wybranySponsor, setWybranySponsor] = useState<number | "">("");
  const [dataZawarcia, setDataZawarcia] = useState("");
  const [dataZakonczenia, setDataZakonczenia] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAll("kluby"), getAll("sponsorzy")])
      .then(([resKluby, resSponsorzy]) => {
        setKluby(resKluby.data);
        setSponsorzy(resSponsorzy.data);
      })
      .catch((err) =>
        console.error("Błąd pobierania list do formularza:", err)
      )
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wybranyKlub || !wybranySponsor || !dataZawarcia) return;

    const payload = {
      id_klubu: wybranyKlub,
      id_sponsora: wybranySponsor,
      data_zawarcia_wspolpracy: dataZawarcia,
      data_zakonczenia_wspolpracy: dataZakonczenia || null,
    };

    try {
      await createOne("historia_klub_sponsor", payload);
      router.push("/historia-klub-sponsor");
    } catch (err) {
      console.error("Błąd dodawania wpisu historii sponsorów:", err);
      alert("Nie udało się dodać wpisu historii.");
    }
  };

  if (loading) {
    return <p>Ładowanie formularza…</p>;
  }

  return (
    <div>
      <h1>Dodaj wpis Historii Klub → Sponsor</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Klub:</label>
          <br />
          <select
            value={wybranyKlub}
            onChange={(e) => setWybranyKlub(Number(e.target.value))}
            required
          >
            <option value="">— wybierz klub —</option>
            {kluby.map((k) => (
              <option key={k.id_klubu} value={k.id_klubu}>
                {k.nazwa} (ID: {k.id_klubu})
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label>Sponsor:</label>
          <br />
          <select
            value={wybranySponsor}
            onChange={(e) => setWybranySponsor(Number(e.target.value))}
            required
          >
            <option value="">— wybierz sponsora —</option>
            {sponsorzy.map((s) => (
              <option key={s.id_sponsora} value={s.id_sponsora}>
                {s.nazwa} (ID: {s.id_sponsora})
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label>Data zawarcia współpracy:</label>
          <br />
          <input
            type="date"
            value={dataZawarcia}
            onChange={(e) => setDataZawarcia(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label>Data zakończenia współpracy (opcjonalnie):</label>
          <br />
          <input
            type="date"
            value={dataZakonczenia}
            onChange={(e) => setDataZakonczenia(e.target.value)}
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
          onClick={() => router.push("/historia-klub-sponsor")}
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
