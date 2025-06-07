// frontend/src/app/pozycje/edytuj/[id]/page.tsx
"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getOne, updateOne } from "@/api";

type Pozycja = {
  id_pozycja: number;
  skrot: string;
  pelna_nazwa: string;
};

export default function PozycjaEdytujPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id!;
  const [loaded, setLoaded] = useState(false);

  const [skrot, setSkrot] = useState("");
  const [pelnaNazwa, setPelnaNazwa] = useState("");

  useEffect(() => {
    if (!loaded) {
      getOne("pozycje", id)
        .then((res) => {
          const p: Pozycja = res.data;
          setSkrot(p.skrot);
          setPelnaNazwa(p.pelna_nazwa);
        })
        .catch((err) => console.error("Błąd pobierania pozycji:", err))
        .finally(() => setLoaded(true));
    }
  }, [loaded, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      skrot,
      pelna_nazwa: pelnaNazwa,
    };

    try {
      await updateOne("pozycje", id, payload);
      router.push("/pozycje");
    } catch (err) {
      console.error("Błąd aktualizacji pozycji:", err);
    }
  };

  if (!loaded) {
    return <p>Ładowanie danych pozycji…</p>;
  }

  return (
    <div>
      <h1>Edytuj pozycję (ID: {id})</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Skrot:</label>
          <br />
          <input
            type="text"
            value={skrot}
            onChange={(e) => setSkrot(e.target.value)}
            required
            maxLength={10}
          />
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Pełna nazwa:</label>
          <br />
          <input
            type="text"
            value={pelnaNazwa}
            onChange={(e) => setPelnaNazwa(e.target.value)}
            required
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
          onClick={() => router.push("/pozycje")}
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
