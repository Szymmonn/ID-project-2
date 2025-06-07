// frontend/src/app/mecze/[idMeczu]/statystyki-gracze/page.tsx
"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getAll, deleteOne } from "@/api";

type Statystyka = {
  id_meczu: number;
  id_pilkarza: number;
  boisko_lawka: "B" | "L";
};

export default function MeczStatystykiGraczePage() {
  const router = useRouter();
  const params = useParams(); // { idMeczu: "123" } (string)
  const rawId = params?.id;
  const idMeczu = rawId ? Number(rawId) : NaN;

  const [staty, setStaty] = useState<Statystyka[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isNaN(idMeczu)) {
      setError("Brak prawidłowego ID meczu w URL.");
      setLoading(false);
      return;
    }

    // Pobierz wszystkie statystyki dla danego meczu
    getAll("mecz_statystyki_gracze_meczu")
      .then((res) => {
        // Strona pobiera całą listę – filtrujemy po id_meczu
        const filtrowane = (res.data as Statystyka[]).filter(
          (s) => s.id_meczu === idMeczu
        );
        setStaty(filtrowane);
      })
      .catch((err) => {
        console.error("Błąd pobierania statystyk:", err);
        setError("Nie udało się pobrać statystyk dla tego meczu.");
      })
      .finally(() => setLoading(false));
  }, [idMeczu]);

  const handleUsuń = async (idPilkarza: number) => {
    try {
      // Wywołanie DELETE zgodnie ze schemą: /api/mecz_statystyki_gracze_meczu/?id_meczu=…&id_pilkarza=…
      await deleteOne("mecz_statystyki_gracze_meczu", {
        id_meczu: idMeczu,
        id_pilkarza: idPilkarza,
      });

      // Odśwież listę lokalnie:
      setStaty((prev) => prev.filter((s) => s.id_pilkarza !== idPilkarza));
    } catch (err) {
      console.error("Błąd usuwania statystyk:", err);
      setError("Nie udało się usunąć statystyk. Spróbuj ponownie.");
    }
  };

  if (loading) return <p>Ładowanie statystyk…</p>;
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
      <h1>
        Statystyki graczy meczu (ID meczu: {isNaN(idMeczu) ? "-" : idMeczu})
      </h1>
      {staty.length === 0 ? (
        <p>Brak statystyk dla tego meczu.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: 8 }}>ID gracza</th>
              <th style={{ border: "1px solid #ccc", padding: 8 }}>
                Boisko / Ławka
              </th>
              <th style={{ border: "1px solid #ccc", padding: 8 }}>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {staty.map((s) => (
              <tr key={`${s.id_meczu}-${s.id_pilkarza}`}>
                <td style={{ border: "1px solid #ccc", padding: 8 }}>
                  {s.id_pilkarza}
                </td>
                <td style={{ border: "1px solid #ccc", padding: 8 }}>
                  {s.boisko_lawka === "B" ? "Boisko" : "Ławka"}
                </td>
                <td style={{ border: "1px solid #ccc", padding: 8 }}>
                  <button
                    onClick={() => handleUsuń(s.id_pilkarza)}
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
