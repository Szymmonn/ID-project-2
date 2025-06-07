// frontend/src/app/pilkarze-pozycja/edytuj/[idPilkarza]/page.tsx
"use client";

import { useRouter, useSearchParams, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getAll, createOne, deleteOne } from "@/api";

type Pozycja = {
  id_pozycja: number;
  skrot: string;
  pelna_nazwa: string;
};

export default function PilkarzPozycjaEdytujPage() {
  const router = useRouter();
  const params = useParams(); // { idPilkarza: "123" }
  const searchParams = useSearchParams(); // odczytujemy ?id_pozycja=...

  const idPilkarza = Number(params?.idPilkarza);
  const poczatkoweIdPozycjiParam = searchParams?.get("id_pozycja");
  const poczatkoweIdPozycji = poczatkoweIdPozycjiParam
    ? Number(poczatkoweIdPozycjiParam)
    : null;

  const [pozycje, setPozycje] = useState<Pozycja[]>([]);
  const [wybranaPozycja, setWybranaPozycja] = useState<number | "">("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!idPilkarza || poczatkoweIdPozycji === null) {
      setError("Brak ID piłkarza lub ID pozycji w URL.");
      setLoading(false);
      return;
    }

    // Pobierz listę dostępnych pozycji
    getAll("pozycje")
      .then((res) => {
        setPozycje(res.data);
        setWybranaPozycja(poczatkoweIdPozycji);
      })
      .catch((err) => {
        console.error("Błąd pobierania pozycji:", err);
        setError("Nie udało się pobrać listy pozycji.");
      })
      .finally(() => setLoading(false));
  }, [idPilkarza, poczatkoweIdPozycji]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !idPilkarza ||
      poczatkoweIdPozycji === null ||
      wybranaPozycja === "" ||
      Number(wybranaPozycja) === poczatkoweIdPozycji
    ) {
      // Jeżeli nic się nie zmieniło, po prostu wróć do listy
      router.push("/pilkarze-pozycja");
      return;
    }

    try {
      // Usuń starą relację (DELETE /api/pilkarz_pozycja/?id_pilkarza=…&id_pozycja=…)
      await deleteOne("pilkarz_pozycja", {
        id_pilkarza: idPilkarza,
        id_pozycja: poczatkoweIdPozycji,
      });

      // Dodaj nową relację
      await createOne("pilkarz_pozycja", {
        id_pilkarza: idPilkarza,
        id_pozycja: Number(wybranaPozycja),
      });

      router.push("/pilkarze-pozycja");
    } catch (err) {
      console.error("Błąd aktualizacji relacji:", err);
      setError("Nie udało się zaktualizować relacji. Spróbuj ponownie.");
    }
  };

  if (loading) {
    return <p>Ładowanie danych…</p>;
  }

  if (error) {
    return (
      <div>
        <h1>Błąd</h1>
        <p style={{ color: "red" }}>{error}</p>
        <button
          onClick={() => router.push("/pilkarze-pozycja")}
          style={{
            marginTop: "1rem",
            backgroundColor: "#aaa",
            color: "#fff",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Powrót do listy relacji
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>
        Edytuj pozycję piłkarza (ID piłkarza: {idPilkarza}, ID pozycji:{" "}
        {poczatkoweIdPozycji})
      </h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Wybierz nową pozycję:</label>
          <br />
          <select
            value={wybranaPozycja}
            onChange={(e) => setWybranaPozycja(Number(e.target.value))}
            required
          >
            <option value="">— wybierz pozycję —</option>
            {pozycje.map((p) => (
              <option key={p.id_pozycja} value={p.id_pozycja}>
                {p.skrot} ({p.pelna_nazwa})
              </option>
            ))}
          </select>
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
          onClick={() => router.push("/pilkarze-pozycja")}
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
