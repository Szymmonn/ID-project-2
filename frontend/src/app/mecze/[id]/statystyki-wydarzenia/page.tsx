// frontend/src/app/mecze/[idMeczu]/statystyki-wydarzenia/page.tsx
"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getAll, deleteOne } from "@/api";

type Wydarzenie = {
  id_wydarzenia: number;
  nazwa: string | null;
};

type Instancja = {
  id: number;
  id_wydarzenia: number;
  id_meczu: number;
  id_pilkarza: number;
  minuta: number;
  minuta_czasu_doliczonego: number | null;
};

export default function MeczStatystykiWydarzeniaPage() {
  const router = useRouter();
  const params = useParams(); // { idMeczu: "123" }
  const idMeczu = Number(params?.id);

  const [instancje, setInstancje] = useState<Instancja[]>([]);
  const [wydarzenia, setWydarzenia] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!idMeczu) {
      setError("Brak ID meczu w URL.");
      setLoading(false);
      return;
    }

    // 1) Pobierz wszystkie nazwy wydarzeń (mecz_statystyki_wydarzenia)
    // 2) Pobierz wszystkie instancje dla meczu (mecz_statystyki_wydarzenia_na_boisku) i filtruj po id_meczu
    Promise.all([
      getAll("mecz_statystyki_wydarzenia"),
      getAll("mecz_statystyki_wydarzenia_na_boisku"),
    ])
      .then(([resWydarzenia, resInstancje]) => {
        // Zmapuj id_wydarzenia → nazwa
        const mapa: Record<number, string> = {};
        (resWydarzenia.data as Wydarzenie[]).forEach((w) => {
          mapa[w.id_wydarzenia] = w.nazwa || "-";
        });
        setWydarzenia(mapa);

        // Filtruj instancje po id_meczu
        const filtrowane = (resInstancje.data as Instancja[]).filter(
          (inst) => inst.id_meczu === idMeczu
        );
        setInstancje(filtrowane);
      })
      .catch((err) => {
        console.error("Błąd pobierania statystyk wydarzeń:", err);
        setError("Nie udało się pobrać statystyk wydarzeń dla tego meczu.");
      })
      .finally(() => setLoading(false));
  }, [idMeczu]);

  const handleUsuń = async (idInstancji: number) => {
    if (!window.confirm("Na pewno usunąć tę instancję wydarzenia?")) return;
    try {
      await deleteOne("mecz_statystyki_wydarzenia_na_boisku", idInstancji);
      setInstancje((prev) =>
        prev.filter((inst) => inst.id !== idInstancji)
      );
    } catch (err) {
      console.error("Błąd usuwania instancji wydarzenia:", err);
      setError("Nie udało się usunąć instancji. Spróbuj ponownie.");
    }
  };

  if (loading) return <p>Ładowanie statystyk wydarzeń…</p>;
  if (error)
    return (
      <div>
        <h1>Błąd</h1>
        <p style={{ color: "red" }}>{error}</p>
        <button
          onClick={() => router.push("/mecze")}
          style={{ marginTop: 16 }}
        >
          Powrót do listy meczów
        </button>
      </div>
    );

  return (
    <div>
      <h1>Statystyki wydarzeń meczu (ID meczu: {idMeczu})</h1>

      {instancje.length === 0 ? (
        <p>Brak wydarzeń dla tego meczu.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: 8 }}>
                ID instancji
              </th>
              <th style={{ border: "1px solid #ccc", padding: 8 }}>
                Nazwa wydarzenia
              </th>
              <th style={{ border: "1px solid #ccc", padding: 8 }}>
                ID gracza
              </th>
              <th style={{ border: "1px solid #ccc", padding: 8 }}>Minuta</th>
              <th style={{ border: "1px solid #ccc", padding: 8 }}>
                Minuta doliczona
              </th>
              <th style={{ border: "1px solid #ccc", padding: 8 }}>
                Akcje
              </th>
            </tr>
          </thead>
          <tbody>
            {instancje.map((inst) => (
              <tr key={inst.id}>
                <td style={{ border: "1px solid #ccc", padding: 8 }}>
                  {inst.id}
                </td>
                <td style={{ border: "1px solid #ccc", padding: 8 }}>
                  {wydarzenia[inst.id_wydarzenia] || "-"}
                </td>
                <td style={{ border: "1px solid #ccc", padding: 8 }}>
                  {inst.id_pilkarza}
                </td>
                <td style={{ border: "1px solid #ccc", padding: 8 }}>
                  {inst.minuta}
                </td>
                <td style={{ border: "1px solid #ccc", padding: 8 }}>
                  {inst.minuta_czasu_doliczonego ?? "-"}
                </td>
                <td style={{ border: "1px solid #ccc", padding: 8 }}>
                  <button
                    onClick={() => handleUsuń(inst.id)}
                    style={{
                      backgroundColor: "#e00",
                      color: "#fff",
                      padding: "4px 8px",
                      border: "none",
                      borderRadius: 4,
                      cursor: "pointer",
                    }}
                  >
                    Usuń
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button
        onClick={() => router.push("/mecze")}
        style={{ marginTop: 16 }}
      >
        Powrót do listy meczów
      </button>
    </div>
  );
}
