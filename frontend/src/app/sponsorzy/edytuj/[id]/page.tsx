// frontend/src/app/sponsorzy/edytuj/[id]/page.tsx
"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getOne, updateOne } from "@/api";

type Sponsor = {
  id_sponsora: number;
  nazwa: string;
};

export default function SponsorEdytujPage() {
  const router = useRouter();
  const params = useParams(); // { id: "123" }
  const id = params?.id!;

  const [loaded, setLoaded] = useState(false);
  const [nazwa, setNazwa] = useState("");

  useEffect(() => {
    if (!loaded) {
      getOne("sponsorzy", id)
        .then((res) => {
          const s: Sponsor = res.data;
          setNazwa(s.nazwa);
        })
        .catch((err) => console.error("Błąd pobierania sponsora:", err))
        .finally(() => setLoaded(true));
    }
  }, [loaded, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nazwa) return;

    const payload = { nazwa };

    try {
      await updateOne("sponsorzy", id, payload);
      router.push("/sponsorzy");
    } catch (err) {
      console.error("Błąd aktualizacji sponsora:", err);
      alert("Nie udało się zaktualizować sponsora.");
    }
  };

  if (!loaded) {
    return <p>Ładowanie danych sponsora…</p>;
  }

  return (
    <div>
      <h1>Edytuj sponsora (ID: {id})</h1>
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
          onClick={() => router.push("/sponsorzy")}
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
