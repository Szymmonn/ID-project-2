// src/pages/PozycjaForm.js

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createOne, updateOne, getOne } from "../api";

export default function PozycjaForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [skrot, setSkrot] = useState("");
  const [pelnaNazwa, setPelnaNazwa] = useState("");

  useEffect(() => {
    if (isEdit) {
      getOne("pozycje", id)
        .then((res) => {
          const p = res.data;
          setSkrot(p.skrot);
          setPelnaNazwa(p.pelna_nazwa);
        })
        .catch((err) => console.error("Błąd pobierania pozycji:", err));
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      skrot,
      pelna_nazwa: pelnaNazwa,
    };

    try {
      if (isEdit) {
        await updateOne("pozycje", id, payload);
      } else {
        await createOne("pozycje", payload);
      }
      navigate("/pozycje");
    } catch (err) {
      console.error("Błąd zapisu pozycji:", err);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>{isEdit ? "Edytuj pozycję" : "Dodaj nową pozycję"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Skrót:</label>
          <input
            type="text"
            value={skrot}
            onChange={(e) => setSkrot(e.target.value)}
            required
            maxLength={10}
          />
        </div>
        <div>
          <label>Pełna nazwa:</label>
          <input
            type="text"
            value={pelnaNazwa}
            onChange={(e) => setPelnaNazwa(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: 16 }}>
          Zapisz
        </button>{" "}
        <button type="button" onClick={() => navigate("/pozycje")} style={{ marginTop: 16 }}>
          Anuluj
        </button>
      </form>
    </div>
  );
}
