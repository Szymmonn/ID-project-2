// src/pages/PilkarzForm.js

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createOne, updateOne, getOne } from "../api";

export default function PilkarzForm() {
  const { id } = useParams(); // jeśli edycja, to id istnieje
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  // Pola formularza
  const [imie, setImie] = useState("");
  const [nazwisko, setNazwisko] = useState("");
  const [dataUrodzenia, setDataUrodzenia] = useState("");
  const [plec, setPlec] = useState("M");
  const [kraj, setKraj] = useState("");
  const [wzrost, setWzrost] = useState("");
  const [numerButa, setNumerButa] = useState("");
  const [glownaNoga, setGlownaNoga] = useState("");

  useEffect(() => {
    if (isEdit) {
      // Pobierz dane piłkarza po ID, żeby wypełnić formularz
      getOne("pilkarze", id)
        .then((res) => {
          const p = res.data;
          setImie(p.imie);
          setNazwisko(p.nazwisko);
          setDataUrodzenia(p.data_urodzenia);
          setPlec(p.plec);
          setKraj(p.id_kraju);
          setWzrost(p.wzrost_cm || "");
          setNumerButa(p.numer_buta || "");
          setGlownaNoga(p.glowna_noga || "");
        })
        .catch((err) => console.error("Błąd pobierania piłkarza:", err));
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      imie,
      nazwisko,
      data_urodzenia: dataUrodzenia,
      plec,
      id_kraju: parseInt(kraj, 10),
      wzrost_cm: wzrost !== "" ? parseInt(wzrost, 10) : null,
      numer_buta: numerButa !== "" ? parseInt(numerButa, 10) : null,
      glowna_noga: glownaNoga || null,
    };

    try {
      if (isEdit) {
        await updateOne("pilkarze", id, payload);
      } else {
        await createOne("pilkarze", payload);
      }
      navigate("/pilkarze");
    } catch (err) {
      console.error("Błąd zapisu piłkarza:", err);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>{isEdit ? "Edytuj piłkarza" : "Dodaj nowego piłkarza"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Imię:</label>
          <input
            type="text"
            value={imie}
            onChange={(e) => setImie(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Nazwisko:</label>
          <input
            type="text"
            value={nazwisko}
            onChange={(e) => setNazwisko(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Data urodzenia:</label>
          <input
            type="date"
            value={dataUrodzenia}
            onChange={(e) => setDataUrodzenia(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Płeć:</label>
          <select value={plec} onChange={(e) => setPlec(e.target.value)} required>
            <option value="M">M</option>
            <option value="K">K</option>
          </select>
        </div>
        <div>
          <label>Kraj (ID):</label>
          <input
            type="number"
            value={kraj}
            onChange={(e) => setKraj(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Wzrost (cm):</label>
          <input
            type="number"
            value={wzrost}
            onChange={(e) => setWzrost(e.target.value)}
          />
        </div>
        <div>
          <label>Numer buta:</label>
          <input
            type="number"
            value={numerButa}
            onChange={(e) => setNumerButa(e.target.value)}
          />
        </div>
        <div>
          <label>Główna noga (P/L/A):</label>
          <input
            type="text"
            value={glownaNoga}
            onChange={(e) => setGlownaNoga(e.target.value)}
            maxLength={1}
          />
        </div>
        <button type="submit" style={{ marginTop: 16 }}>
          Zapisz
        </button>{" "}
        <button type="button" onClick={() => navigate("/pilkarze")} style={{ marginTop: 16 }}>
          Anuluj
        </button>
      </form>
    </div>
  );
}
