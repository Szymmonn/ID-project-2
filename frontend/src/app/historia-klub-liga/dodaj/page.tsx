// frontend/src/app/historia-klub-liga/dodaj/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createOne, getAll } from "@/api";

type Klub = { id_klubu: number; nazwa: string };
type Liga = { id_ligi: number; nazwa: string };
type Sezon = { id_sezonu: number; data_poczatek: string; data_koniec: string };

export default function HistoriaKlubLigaDodajPage() {
  const router = useRouter();

  const [kluby, setKluby] = useState<Klub[]>([]);
  const [ligi, setLigi] = useState<Liga[]>([]);
  const [sezony, setSezony] = useState<Sezon[]>([]);

  const [wybranyKlub, setWybranyKlub] = useState<number | "">("");
  const [wybranaLiga, setWybranaLiga] = useState<number | "">("");
  const [wybranySezon, setWybranySezon] = useState<number | "">("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Pobierz wszystkie trzy listy równolegle
    Promise.all([
      getAll("kluby"),
      getAll("ligi"),
      getAll("sezony"),
    ])
      .then(([resKluby, resLigi, resSezony]) => {
        setKluby(resKluby.data);
        setLigi(resLigi.data);
        setSezony(resSezony.data);
      })
      .catch((err) =>
        console.error("Błąd pobierania danych do formularza:", err)
      )
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wybranyKlub || !wybranaLiga || !wybranySezon) return;

    const payload = {
      id_klubu: wybranyKlub,
      id_ligi: wybranaLiga,
      id_sezonu: wybranySezon,
    };

    try {
      await createOne("historia_klub_liga", payload);
      router.push("/historia-klub-liga");
    } catch (err) {
      console.error("Błąd dodawania wpisu historii:", err);
      alert("Nie udało się dodać wpisu historii.");
    }
  };

  if (loading) {
    return <p>Ładowanie formularza…</p>;
  }

  return (
    <div>
      <h1>Dodaj wpis do historii klub→liga</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Klub:</label>
          <br />
          <select
            value={wybranyKlub}
            onChange={(e) =>
              setWybranyKlub(Number(e.target.value))
            }
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
          <label>Liga:</label>
          <br />
          <select
            value={wybranaLiga}
            onChange={(e) =>
              setWybranaLiga(Number(e.target.value))
            }
            required
          >
            <option value="">— wybierz ligę —</option>
            {ligi.map((l) => (
              <option key={l.id_ligi} value={l.id_ligi}>
                {l.nazwa} (ID: {l.id_ligi})
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label>Sezon:</label>
          <br />
          <select
            value={wybranySezon}
            onChange={(e) =>
              setWybranySezon(Number(e.target.value))
            }
            required
          >
            <option value="">— wybierz sezon —</option>
            {sezony.map((s) => (
              <option key={s.id_sezonu} value={s.id_sezonu}>
                {s.data_poczatek} – {s.data_koniec} (ID: {s.id_sezonu})
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
          onClick={() => router.push("/historia-klub-liga")}
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
