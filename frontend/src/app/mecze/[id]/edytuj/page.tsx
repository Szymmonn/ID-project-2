// frontend/src/app/mecze/[idMeczu]/edytuj/page.tsx
"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getAll, getOne, updateOne } from "@/api";

type Klub = {
  id_klubu: number;
  nazwa: string;
  miasto: string;
  id_stadionu: number | null;
  rok_zalozenia: number | null;
};

type Mecz = {
  id_meczu: number;
  id_gospodarze: number;
  id_goscie: number;
  data: string; // ISO date
  id_stadionu: number;
  nierozstrzygniety: boolean;
  rodzaj_meczu: string | null;
  uwagi: string | null;
};

export default function EdytujMeczPage() {
  const router = useRouter();
  const params = useParams(); // { idMeczu: "123" }
  const idMeczu = Number(params?.idMeczu);

  const [kluby, setKluby] = useState<Klub[]>([]);
  const [mecz, setMecz] = useState<Mecz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pola formularza
  const [gospodarze, setGospodarze] = useState<number | "">("");
  const [goscie, setGoscie] = useState<number | "">("");
  const [dataMeczu, setDataMeczu] = useState<string>("");
  const [stadion, setStadion] = useState<number | "">("");
  const [nieroz, setNieroz] = useState<boolean>(false);
  const [rodzaj, setRodzaj] = useState<string>("");
  const [uwagi, setUwagi] = useState<string>("");

  useEffect(() => {
    if (!idMeczu) {
      setError("Brak ID meczu w URL.");
      setLoading(false);
      return;
    }

    // Pobierz listę klubów
    getAll("kluby")
      .then((res) => {
        setKluby(res.data);
      })
      .catch((err) => {
        console.error("Błąd pobierania klubów:", err);
        setError("Nie udało się pobrać listy klubów.");
      });

    // Pobierz dane meczu
    getOne("mecze", idMeczu)
      .then((res) => {
        const d: Mecz = {
          ...res.data,
          data: res.data.data.split("T")[0], // tylko yyyy-mm-dd
        };
        setMecz(d);
        setGospodarze(d.id_gospodarze);
        setGoscie(d.id_goscie);
        setDataMeczu(d.data);
        setStadion(d.id_stadionu);
        setNieroz(d.nierozstrzygniety);
        setRodzaj(d.rodzaj_meczu || "");
        setUwagi(d.uwagi || "");
      })
      .catch((err) => {
        console.error("Błąd pobierania meczu:", err);
        setError("Nie udało się pobrać danych meczu.");
      })
      .finally(() => setLoading(false));
  }, [idMeczu]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !gospodarze ||
      !goscie ||
      !dataMeczu ||
      !stadion ||
      gospodarze === goscie
    ) {
      setError("Wszystkie pola są wymagane, a gospodarze i goście muszą być różni.");
      return;
    }

    try {
      await updateOne("mecze", idMeczu, {
        id_gospodarze: gospodarze,
        id_goscie: goscie,
        data: dataMeczu,
        id_stadionu: stadion,
        nierozstrzygniety: nieroz,
        rodzaj_meczu: rodzaj || null,
        uwagi: uwagi || null,
      });
      router.push("/mecze");
    } catch (err) {
      console.error("Błąd aktualizacji meczu:", err);
      setError("Nie udało się zapisać zmian w meczu. Spróbuj ponownie.");
    }
  };

  if (loading) return <p>Ładowanie danych meczu…</p>;
  if (error)
    return (
      <div>
        <h1>Błąd</h1>
        <p style={{ color: "red" }}>{error}</p>
        <button
          onClick={() => router.push("/mecze")}
          style={{
            marginTop: 16,
            backgroundColor: "#aaa",
            color: "#fff",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Powrót do listy meczów
        </button>
      </div>
    );

  return (
    <div>
      <h1>Edytuj mecz (ID: {idMeczu})</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Gospodarze:</label>
          <br />
          <select
            value={gospodarze}
            onChange={(e) => setGospodarze(Number(e.target.value))}
            required
          >
            <option value="">— wybierz gospodarza —</option>
            {kluby.map((k) => (
              <option key={k.id_klubu} value={k.id_klubu}>
                {k.nazwa} ({k.miasto})
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label>Goście:</label>
          <br />
          <select
            value={goscie}
            onChange={(e) => setGoscie(Number(e.target.value))}
            required
          >
            <option value="">— wybierz gościa —</option>
            {kluby.map((k) => (
              <option key={k.id_klubu} value={k.id_klubu}>
                {k.nazwa} ({k.miasto})
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label>Data meczu:</label>
          <br />
          <input
            type="date"
            value={dataMeczu}
            onChange={(e) => setDataMeczu(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label>Stadion (ID):</label>
          <br />
          <input
            type="number"
            value={stadion}
            onChange={(e) => setStadion(Number(e.target.value))}
            required
            min={1}
          />
          <p style={{ fontSize: "0.8rem", color: "#666" }}>
            Podaj ID stadionu (można później rozszerzyć o wybór z listy).
          </p>
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label>
            <input
              type="checkbox"
              checked={nieroz}
              onChange={(e) => setNieroz(e.target.checked)}
            />{" "}
            Nierozstrzygnięty
          </label>
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label>Rodzaj meczu:</label>
          <br />
          <input
            type="text"
            value={rodzaj}
            onChange={(e) => setRodzaj(e.target.value)}
            placeholder="Ligowy / Towarzyski / Pucharowy / Inny"
          />
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label>Uwagi:</label>
          <br />
          <textarea
            value={uwagi}
            onChange={(e) => setUwagi(e.target.value)}
            rows={3}
            style={{ width: "100%" }}
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
          onClick={() => router.push("/mecze")}
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
