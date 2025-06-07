"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAll, createOne } from "@/api";

// Typy podobne jak w liście
type Skaut = {
  id_skauta: number;
  imie: string;
  nazwisko: string;
};
type Klub = {
  id_klubu: number;
  nazwa: string;
  miasto: string;
};

export default function HistoriaSkauciKlubyDodajPage() {
  const router = useRouter();

  // Lista skautów i klubów do selectów
  const [skauci, setSkauci] = useState<Skaut[]>([]);
  const [kluby, setKluby] = useState<Klub[]>([]);

  // Formularz
  const [wybranySkaut, setWybranySkaut] = useState<number | "">("");
  const [wybranyKlub, setWybranyKlub] = useState<number | "">("");
  const [dataRozp, setDataRozp] = useState<string>(""); // format YYYY-MM-DD
  const [dataZak, setDataZak] = useState<string>("");   // opcjonalnie

  const [error, setError] = useState<string | null>(null);

  // Pobierz skautów i kluby
  const fetchData = async () => {
    try {
      const [sRes, kRes] = await Promise.all([
        getAll("skauci"),
        getAll("kluby"),
      ]);
      setSkauci(sRes.data);
      setKluby(kRes.data);
    } catch (err) {
      console.error("Błąd pobierania skautów/klubów:", err);
      setError("Nie udało się pobrać listy skautów lub klubów.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (
      wybranySkaut === "" ||
      wybranyKlub === "" ||
      dataRozp.trim() === ""
    ) {
      setError(
        "Proszę wybrać skauta, klub oraz podać datę rozpoczęcia współpracy."
      );
      return;
    }

    // Sprawdź, czy nie wybrano tego samego skauta i klubu, albo nie próbujemy dodać duplikatu?
    // (opcjonalnie można dopisać walidację po stronie frontu, że para skaut-klub z tą samą datą rozpoczęcia już istnieje)

    try {
      await createOne("historia_skauci_kluby", {
        id_skauta: Number(wybranySkaut),
        id_klubu: Number(wybranyKlub),
        data_rozpoczecia_wspolpracy: dataRozp,
        data_zakonczenia_wspolpracy: dataZak.trim() === "" ? null : dataZak,
      });
      router.push("/historia-skauci-kluby");
    } catch (err) {
      console.error("Błąd dodawania wpisu historii:", err);
      setError("Nie udało się dodać wpisu. Sprawdź dane i spróbuj ponownie.");
    }
  };

  return (
    <div>
      <h1>Dodaj wpis do historii współpracy</h1>
      {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        {/* Wybór skauta */}
        <div style={{ marginBottom: "0.8rem" }}>
          <label>Skaut:</label>
          <br />
          <select
            value={wybranySkaut}
            onChange={(e) =>
              setWybranySkaut(
                e.target.value === "" ? "" : Number(e.target.value)
              )
            }
            required
            style={{ width: "100%", padding: "0.4rem" }}
          >
            <option value="">— Wybierz skauta —</option>
            {skauci.map((s) => (
              <option key={s.id_skauta} value={s.id_skauta}>
                {s.imie} {s.nazwisko}
              </option>
            ))}
          </select>
        </div>

        {/* Wybór klubu */}
        <div style={{ marginBottom: "0.8rem" }}>
          <label>Klub:</label>
          <br />
          <select
            value={wybranyKlub}
            onChange={(e) =>
              setWybranyKlub(
                e.target.value === "" ? "" : Number(e.target.value)
              )
            }
            required
            style={{ width: "100%", padding: "0.4rem" }}
          >
            <option value="">— Wybierz klub —</option>
            {kluby.map((k) => (
              <option key={k.id_klubu} value={k.id_klubu}>
                {k.nazwa} ({k.miasto})
              </option>
            ))}
          </select>
        </div>

        {/* Data rozpoczęcia */}
        <div style={{ marginBottom: "0.8rem" }}>
          <label>Data rozpoczęcia współpracy:</label>
          <br />
          <input
            type="date"
            value={dataRozp}
            onChange={(e) => setDataRozp(e.target.value)}
            required
            style={{ width: "100%", padding: "0.4rem" }}
          />
        </div>

        {/* Data zakończenia */}
        <div style={{ marginBottom: "0.8rem" }}>
          <label>Data zakończenia współpracy (opcjonalnie):</label>
          <br />
          <input
            type="date"
            value={dataZak}
            onChange={(e) => setDataZak(e.target.value)}
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
          Dodaj wpis
        </button>

        <button
          type="button"
          onClick={() => router.push("/historia-skauci-kluby")}
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
