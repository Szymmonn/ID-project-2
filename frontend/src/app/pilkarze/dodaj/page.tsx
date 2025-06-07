"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createOne } from "@/api";

export default function PilkarzDodajPage() {
  const router = useRouter();

  const [imie, setImie] = useState("");
  const [nazwisko, setNazwisko] = useState("");
  const [dataUrodzenia, setDataUrodzenia] = useState("");
  const [plec, setPlec] = useState("M");
  const [kraj, setKraj] = useState("");
  const [wzrost, setWzrost] = useState("");
  const [numerButa, setNumerButa] = useState("");
  const [glownaNoga, setGlownaNoga] = useState("");

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
      await createOne("pilkarze", payload);
      router.push("/pilkarze"); // po zapisie wróć do listy
    } catch (err) {
      console.error("Błąd tworzenia piłkarza:", err);
    }
  };

  return (
    <div>
      <h1>Dodaj nowego piłkarza</h1>
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
          Zapisz
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
