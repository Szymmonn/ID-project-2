// frontend/src/app/agenci/edytuj/[id]/page.tsx
"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getOne, updateOne } from "@/api";

type Agent = {
  id_agenta: number;
  imie: string;
  nazwisko: string;
};

export default function AgentEdytujPage() {
  const router = useRouter();
  const params = useParams(); // { id: "123" }
  const id = params?.id!; // string

  const [loaded, setLoaded] = useState(false);
  const [imie, setImie] = useState("");
  const [nazwisko, setNazwisko] = useState("");

  useEffect(() => {
    if (!loaded) {
      getOne("agenci", id)
        .then((res) => {
          const a: Agent = res.data;
          setImie(a.imie);
          setNazwisko(a.nazwisko);
        })
        .catch((err) => console.error("Błąd pobierania agenta:", err))
        .finally(() => setLoaded(true));
    }
  }, [loaded, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { imie, nazwisko };

    try {
      await updateOne("agenci", id, payload);
      router.push("/agenci");
    } catch (err) {
      console.error("Błąd aktualizacji agenta:", err);
      alert("Nie udało się zaktualizować agenta.");
    }
  };

  if (!loaded) {
    return <p>Ładowanie danych agenta…</p>;
  }

  return (
    <div>
      <h1>Edytuj agenta (ID: {id})</h1>
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
          onClick={() => router.push("/agenci")}
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
