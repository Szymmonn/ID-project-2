// frontend/src/app/mecze/dodaj/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createOne, getAll } from "@/api";

type Klub = {
  id_klubu: number;
  nazwa: string;
};

export default function MeczeDodajPage() {
  const router = useRouter();

  const [kluby, setKluby] = useState<Klub[]>([]);
  const [loadingKluby, setLoadingKluby] = useState(true);
  const [klubyError, setKlubyError] = useState<string | null>(null);

  const [idGospodarze, setIdGospodarze] = useState<number | "">("");
  const [idGoscie, setIdGoscie] = useState<number | "">("");
  const [data, setData] = useState<string>(""); // format YYYY-MM-DD
  const [idStadionu, setIdStadionu] = useState<number | "">("");
  const [nierozstrzygniety, setNierozstrzygniety] = useState<boolean>(false);
  const [rodzaj, setRodzaj] = useState<string>("");
  const [uwagi, setUwagi] = useState<string>("");

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAll("kluby")
      .then((res) => {
        setKluby(res.data);
      })
      .catch((err) => {
        console.error("Błąd pobierania klubów:", err);
        setKlubyError("Nie udało się pobrać listy klubów.");
      })
      .finally(() => setLoadingKluby(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // proste walidacje
    if (
      idGospodarze === "" ||
      idGoscie === "" ||
      data.trim() === "" ||
      idStadionu === ""
    ) {
      setError("Proszę wypełnić obowiązkowe pola: Gospodarze, Goście, Data, Stadion.");
      return;
    }
    if (idGospodarze === idGoscie) {
      setError("Gospodarze i Goście nie mogą być tym samym klubem.");
      return;
    }

    try {
      await createOne("mecze", {
        id_gospodarze: Number(idGospodarze),
        id_goscie: Number(idGoscie),
        data: data,
        id_stadionu: Number(idStadionu),
        nierozstrzygniety,
        rodzaj_meczu: rodzaj.trim() || null,
        uwagi: uwagi.trim() || null,
      });
      router.push("/mecze");
    } catch (err) {
      console.error("Błąd tworzenia meczu:", err);
      setError("Nie udało się dodać meczu. Spróbuj ponownie.");
    }
  };

  return (
    <div>
      <h1>Dodaj nowy mecz</h1>

      {klubyError && (
        <p style={{ color: "red", marginBottom: "1rem" }}>{klubyError}</p>
      )}

      {error && (
        <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>
      )}

      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Gospodarze:</label>
          <br />
          {loadingKluby ? (
            <p>Ładowanie listy klubów…</p>
          ) : (
            <select
              value={idGospodarze}
              onChange={(e) => setIdGospodarze(Number(e.target.value))}
              required
              style={{ width: "100%", padding: "0.4rem" }}
            >
              <option value="">— wybierz klub —</option>
              {kluby.map((k) => (
                <option key={k.id_klubu} value={k.id_klubu}>
                  {k.nazwa}
                </option>
              ))}
            </select>
          )}
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label>Goście:</label>
          <br />
          {loadingKluby ? (
            <p>Ładowanie listy klubów…</p>
          ) : (
            <select
              value={idGoscie}
              onChange={(e) => setIdGoscie(Number(e.target.value))}
              required
              style={{ width: "100%", padding: "0.4rem" }}
            >
              <option value="">— wybierz klub —</option>
              {kluby.map((k) => (
                <option key={k.id_klubu} value={k.id_klubu}>
                  {k.nazwa}
                </option>
              ))}
            </select>
          )}
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label>Data meczu:</label>
          <br />
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
            style={{ width: "100%", padding: "0.4rem" }}
          />
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label>Stadion (ID stadionu):</label>
          <br />
          <input
            type="number"
            value={idStadionu}
            onChange={(e) => setIdStadionu(Number(e.target.value))}
            required
            style={{ width: "100%", padding: "0.4rem" }}
            min={1}
          />
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label>
            <input
              type="checkbox"
              checked={nierozstrzygniety}
              onChange={(e) => setNierozstrzygniety(e.target.checked)}
              style={{ marginRight: "0.3rem" }}
            />
            Mecz nierozstrzygnięty
          </label>
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label>Rodzaj meczu:</label>
          <br />
          <input
            type="text"
            value={rodzaj}
            onChange={(e) => setRodzaj(e.target.value)}
            placeholder="np. Ligowy, Towarzyski"
            style={{ width: "100%", padding: "0.4rem" }}
          />
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label>Uwagi:</label>
          <br />
          <textarea
            value={uwagi}
            onChange={(e) => setUwagi(e.target.value)}
            rows={2}
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
          Dodaj mecz
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
