// src/pages/KlubForm.js

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createOne, updateOne, getOne } from "../api";

export default function KlubForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [nazwa, setNazwa] = useState("");
  const [miasto, setMiasto] = useState("");
  const [stadion, setStadion] = useState("");
  const [rok, setRok] = useState("");

  useEffect(() => {
    if (isEdit) {
      getOne("kluby", id)
        .then((res) => {
          const k = res.data;
          setNazwa(k.nazwa);
          setMiasto(k.miasto);
          setStadion(k.id_stadionu || "");
          setRok(k.rok_zalozenia || "");
        })
        .catch((err) => console.error("Błąd pobierania klubu:", err));
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      nazwa,
      miasto,
      id_stadionu: stadion !== "" ? parseInt(stadion, 10) : null,
      rok_zalozenia: rok !== "" ? parseInt(rok, 10) : null,
    };
    try {
      if (isEdit) {
        await updateOne("kluby", id, payload);
      } else {
        await createOne("kluby", payload);
      }
      navigate("/kluby");
    } catch (err) {
      console.error("Błąd zapisu klubu:", err);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>{isEdit ? "Edytuj klub" : "Dodaj nowy klub"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nazwa:</label>
          <input
            type="text"
            value={nazwa}
            onChange={(e) => setNazwa(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Miasto:</label>
          <input
            type="text"
            value={miasto}
            onChange={(e) => setMiasto(e.target.value)}
            required
          />
        </div>
        <div>
          <label>ID stadionu:</label>
          <input
            type="number"
            value={stadion}
            onChange={(e) => setStadion(e.target.value)}
          />
        </div>
        <div>
          <label>Rok założenia:</label>
          <input
            type="number"
            value={rok}
            onChange={(e) => setRok(e.target.value)}
          />
        </div>
        <button type="submit" style={{ marginTop: 16 }}>
          Zapisz
        </button>{" "}
        <button
          type="button"
          onClick={() => navigate("/kluby")}
          style={{ marginTop: 16 }}
        >
          Anuluj
        </button>
      </form>
    </div>
  );
}
