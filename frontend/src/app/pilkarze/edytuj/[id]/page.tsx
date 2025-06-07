"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getOne, updateOne } from "@/api";

type Pilkarz = {
  id_pilkarza: number;
  imie: string;
  nazwisko: string;
  data_urodzenia: string;
  plec: string;
  id_kraju: number;
  wzrost_cm?: number;
  numer_buta?: number;
  glowna_noga?: string;
};

export default function PilkarzEdytujPage() {
  const router = useRouter();
  const params = useParams(); // { id: "123" }
  const id = params?.id!;
  const [loaded, setLoaded] = useState(false);

  // pola formularza
  const [imie, setImie] = useState("");
  const [nazwisko, setNazwisko] = useState("");
  const [dataUrodzenia, setDataUrodzenia] = useState("");
  const [plec, setPlec] = useState("M");
  const [kraj, setKraj] = useState("");
  const [wzrost, setWzrost] = useState("");
  const [numerButa, setNumerButa] = useState("");
  const [glownaNoga, setGlownaNoga] = useState("");

  useEffect(() => {
    if (!loaded) {
      getOne("pilkarze", id)
        .then((res) => {
          const p: Pilkarz = res.data;
          setImie(p.imie);
          setNazwisko(p.nazwisko);
          setDataUrodzenia(p.data_urodzenia);
          setPlec(p.plec);
          setKraj(p.id_kraju.toString());
          setWzrost(p.wzrost_cm?.toString() || "");
          setNumerButa(p.numer_buta?.toString() || "");
          setGlownaNoga(p.glowna_noga || "");
        })
        .catch((err) => console.error("Błąd pobierania piłkarza:", err))
        .finally(() => setLoaded(true));
    }
  }, [loaded, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      imie,
      nazwisko,
      data_urodzenia: dataUrodzenia,
      plec,
      id_kraju: parseInt(kraj),
      wzrost_cm: wzrost ? parseInt(wzrost) : null,
      numer_buta: numerButa ? parseInt(numerButa) : null,
      glowna_noga: glownaNoga || null,
    };

    try {
      await updateOne("pilkarze", id, payload);
      router.push("/pilkarze");
    } catch (err) {
      console.error("Błąd aktualizacji piłkarza:", err);
    }
  };

  if (!loaded) {
    return <p>Ładowanie danych piłkarza…</p>;
  }

  return (
    <div>
      <h1>Edytuj piłkarza (ID: {id})</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Imię:</label>
          <br />
          <input
            type="text"
            value={imie}
            onChange={(e) => setImie(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Nazwisko:</label>
          <br />
          <input
            type="text"
            value={nazwisko}
            onChange={(e) => setNazwisko(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Data urodzenia:</label>
          <br />
          <input
            type="date"
            value={dataUrodzenia}
            onChange={(e) => setDataUrodzenia(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Płeć:</label>
          <br />
          <select
            value={plec}
            onChange={(e) => setPlec(e.target.value)}
            required
          >
            <option value="M">M</option>
            <option value="K">K</option>
          </select>
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>ID kraju:</label>
          <br />
          <input
            type="number"
            value={kraj}
            onChange={(e) => setKraj(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Wzrost (cm):</label>
          <br />
          <input
            type="number"
            value={wzrost}
            onChange={(e) => setWzrost(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Numer buta:</label>
          <br />
          <input
            type="number"
            value={numerButa}
            onChange={(e) => setNumerButa(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Główna noga (P/L/A):</label>
          <br />
          <input
            type="text"
            value={glownaNoga}
            onChange={(e) => setGlownaNoga(e.target.value)}
            maxLength={1}
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
          Aktualizuj
        </button>
        <button
          type="button"
          onClick={() => router.push("/pilkarze")}
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
