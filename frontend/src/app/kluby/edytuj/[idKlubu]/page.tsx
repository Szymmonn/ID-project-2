"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getOne, updateOne } from "@/api";

type Klub = {
  id_klubu: number;
  nazwa: string;
  miasto: string;
  id_stadionu: number | null;
  rok_zalozenia: number | null;
};

export default function KlubyEdytujPage() {
  const router = useRouter();
  const params = useParams(); // { idKlubu: "123" }
  const idKlubu = Number(params?.idKlubu);

  const [klub, setKlub] = useState<Klub | null>(null);
  const [nazwa, setNazwa] = useState("");
  const [miasto, setMiasto] = useState("");
  const [idStadionu, setIdStadionu] = useState<number | "">("");
  const [rokZalozenia, setRokZalozenia] = useState<number | "">("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!idKlubu) {
      setError("Brak ID klubu w URL.");
      setLoading(false);
      return;
    }
    getOne("kluby", idKlubu)
      .then((res) => {
        const data: Klub = res.data;
        setKlub(data);
        setNazwa(data.nazwa);
        setMiasto(data.miasto);
        setIdStadionu(data.id_stadionu === null ? "" : data.id_stadionu);
        setRokZalozenia(
          data.rok_zalozenia === null ? "" : data.rok_zalozenia
        );
      })
      .catch((err) => {
        console.error("Błąd pobierania klubu:", err);
        setError("Nie udało się pobrać danych klubu.");
      })
      .finally(() => setLoading(false));
  }, [idKlubu]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!klub) return;

    if (!nazwa.trim() || !miasto.trim()) {
      setError("Nazwa i miasto są wymagane.");
      return;
    }

    const payload = {
      nazwa: nazwa.trim(),
      miasto: miasto.trim(),
      id_stadionu: idStadionu === "" ? null : idStadionu,
      rok_zalozenia: rokZalozenia === "" ? null : rokZalozenia,
    };

    try {
      await updateOne("kluby", idKlubu, payload);
      router.push("/kluby");
    } catch (err) {
      console.error("Błąd aktualizacji klubu:", err);
      setError("Nie udało się zaktualizować klubu.");
    }
  };

  if (loading) {
    return <p>Ładowanie danych klubu…</p>;
  }

  if (error) {
    return (
      <div>
        <h1>Błąd</h1>
        <p style={{ color: "red" }}>{error}</p>
        <button onClick={() => router.push("/kluby")} style={{ marginTop: "1rem" }}>
          Powrót do listy
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Edytuj klub (ID: {idKlubu})</h1>
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
          <label>ID stadionu (opcjonalnie):</label>
          <br />
          <input
            type="number"
            value={idStadionu}
            onChange={(e) =>
              setIdStadionu(
                e.target.value === "" ? "" : parseInt(e.target.value, 10)
              )
            }
            min={1}
          />
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Rok założenia (opcjonalnie):</label>
          <br />
          <input
            type="number"
            value={rokZalozenia}
            onChange={(e) =>
              setRokZalozenia(
                e.target.value === "" ? "" : parseInt(e.target.value, 10)
              )
            }
            min={0}
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
          Zapisz zmiany
        </button>
        <button
          type="button"
          onClick={() => router.push("/kluby")}
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
