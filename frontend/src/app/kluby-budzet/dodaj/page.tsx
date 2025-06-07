// frontend/src/app/kluby-budzet/dodaj/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createOne, getAll } from "@/api";

type Klub = {
  id_klubu: number;
  nazwa: string;
  // inne pola nie są konieczne na liście selecta
};

export default function KlubBudzetDodajPage() {
  const router = useRouter();

  const [kluby, setKluby] = useState<Klub[]>([]);
  const [wybranyKlub, setWybranyKlub] = useState<number | "">("");
  const [kwotaDodana, setKwotaDodana] = useState("");
  const [dataDofinansowania, setDataDofinansowania] = useState("");
  const [powod, setPowod] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Pobierz listę klubów, żeby wypełnić select
    getAll("kluby")
      .then((res) => {
        setKluby(res.data);
      })
      .catch((err) =>
        console.error("Błąd pobierania listy klubów:", err)
      )
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wybranyKlub || !kwotaDodana || !dataDofinansowania) return;

    const payload = {
      id_klubu: wybranyKlub,
      kwota_dodana: parseFloat(kwotaDodana),
      data_dofinansowania: dataDofinansowania,
      powod_dofinansowania: powod || null,
    };

    try {
      await createOne("kluby_budzet", payload);
      router.push("/kluby-budzet");
    } catch (err) {
      console.error("Błąd dodawania budżetu:", err);
      alert("Nie udało się dodać wpisu budżetu.");
    }
  };

  if (loading) {
    return <p>Ładowanie formularza…</p>;
  }

  return (
    <div>
      <h1>Dodaj wpis budżetowy klubu</h1>
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
          <label>Kwota dodana:</label>
          <br />
          <input
            type="number"
            step="0.01"
            value={kwotaDodana}
            onChange={(e) => setKwotaDodana(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Data dofinansowania:</label>
          <br />
          <input
            type="date"
            value={dataDofinansowania}
            onChange={(e) => setDataDofinansowania(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Powód dofinansowania (opcjonalnie):</label>
          <br />
          <input
            type="text"
            value={powod}
            onChange={(e) => setPowod(e.target.value)}
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
          onClick={() => router.push("/kluby-budzet")}
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
