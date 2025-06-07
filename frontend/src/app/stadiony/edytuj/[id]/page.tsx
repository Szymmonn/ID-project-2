// frontend/src/app/stadiony/edytuj/[id]/page.tsx
"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getOne, updateOne } from "@/api";

type Stadion = {
  id_stadionu: number;
  nazwa: string;
  miasto: string;
  id_kraju: number;
};

export default function StadionEdytujPage() {
  const router = useRouter();
  const params = useParams(); // { id: "123" }
  const id = params?.id!;

  const [loaded, setLoaded] = useState(false);
  const [nazwa, setNazwa] = useState("");
  const [miasto, setMiasto] = useState("");
  const [idKraju, setIdKraju] = useState("");

  useEffect(() => {
    if (!loaded) {
      getOne("stadiony", id)
        .then((res) => {
          const s: Stadion = res.data;
          setNazwa(s.nazwa);
          setMiasto(s.miasto);
          setIdKraju(s.id_kraju.toString());
        })
        .catch((err) => console.error("Błąd pobierania stadionu:", err))
        .finally(() => setLoaded(true));
    }
  }, [loaded, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      nazwa,
      miasto,
      id_kraju: parseInt(idKraju, 10),
    };

    try {
      await updateOne("stadiony", id, payload);
      router.push("/stadiony");
    } catch (err) {
      console.error("Błąd aktualizacji stadionu:", err);
      alert("Nie udało się zaktualizować stadionu.");
    }
  };

  if (!loaded) {
    return <p>Ładowanie danych stadionu…</p>;
  }

  return (
    <div>
      <h1>Edytuj stadion (ID: {id})</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Nazwa:</label>
          <br />
          <input
            type="text"
            value={nazwa}
            onChange={(e) => setNazwa(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Miasto:</label>
          <br />
          <input
            type="text"
            value={miasto}
            onChange={(e) => setMiasto(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>ID kraju:</label>
          <br />
          <input
            type="number"
            value={idKraju}
            onChange={(e) => setIdKraju(e.target.value)}
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
          onClick={() => router.push("/stadiony")}
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
