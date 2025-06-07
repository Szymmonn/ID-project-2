// frontend/src/app/pilkarze-pozycja/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAll } from "@/api";

type Pilkarz = {
  id_pilkarza: number;
  imie: string;
  nazwisko: string;
};

type Pozycja = {
  id_pozycja: number;
  skrot: string;
  pelna_nazwa: string;
};

type Relacja = {
  id_pilkarza: number;
  id_pozycja: number;
};

export default function PilkarzePozycjaListPage() {
  const [pilkarze, setPilkarze] = useState<Pilkarz[]>([]);
  const [pozycje, setPozycje] = useState<Pozycja[]>([]);
  const [relacje, setRelacje] = useState<Relacja[]>([]);
  const [loading, setLoading] = useState(true);
  const [mapaRelacji, setMapaRelacji] = useState<Record<number, number[]>>({});

  // 1) Pobranie wszystkich danych (piłkarze, pozycje, relacje) na raz
  const fetchAll = async () => {
    try {
      // GET /api/pilkarze/
      const resPil = await getAll("pilkarze");
      // GET /api/pilkarz_pozycja/
      const resRel = await getAll("pilkarz_pozycja");
      // GET /api/pozycje/
      const resPoz = await getAll("pozycje");

      setPilkarze(resPil.data);
      setRelacje(resRel.data);
      setPozycje(resPoz.data);

      // Zbuduj mapę relacji: id_pilkarza → [id_pozycja, ...]
      const mapa: Record<number, number[]> = {};
      resRel.data.forEach((r: Relacja) => {
        if (!mapa[r.id_pilkarza]) mapa[r.id_pilkarza] = [];
        mapa[r.id_pilkarza].push(r.id_pozycja);
      });
      setMapaRelacji(mapa);
    } catch (err) {
      console.error("Błąd pobierania danych relacji piłkarz→pozycja:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // 2) Usunięcie danej relacji: DELETE /api/pilkarz_pozycja/?id_pilkarza=…&id_pozycja=…
  const handleUsunRelacje = async (idPilkarza: number, idPozycji: number) => {
    if (
      !confirm(
        `Na pewno chcesz usunąć pozycję (${idPozycji}) dla piłkarza (${idPilkarza})?`
      )
    ) {
      return;
    }

    try {
      const url = `/api/pilkarz_pozycja/?id_pilkarza=${idPilkarza}&id_pozycja=${idPozycji}`;
      const res = await fetch(url, { method: "DELETE" });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      // Jeśli usunięcie powiodło się, usuń tę relację z lokalnego stanu:
      setMapaRelacji((prev) => {
        const next = { ...prev };
        if (next[idPilkarza]) {
          next[idPilkarza] = next[idPilkarza].filter((pid) => pid !== idPozycji);
        }
        return next;
      });
    } catch (err) {
      console.error("Błąd usuwania relacji:", err);
      alert("Nie udało się usunąć relacji. Sprawdź konsolę.");
    }
  };

  if (loading) {
    return <p>Ładowanie relacji piłkarz→pozycja…</p>;
  }

  return (
    <div>
      <h1>Piłkarze i ich pozycje</h1>
      <Link href="/pilkarze-pozycja/dodaj">
        <button
          style={{
            marginBottom: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Przypisz nową pozycję piłkarzowi
        </button>
      </Link>

      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0" }}>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>ID</th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Imię</th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Nazwisko</th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Pozycje
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Akcje
            </th>
          </tr>
        </thead>
        <tbody>
          {pilkarze.map((p) => {
            const idsPozycji = mapaRelacji[p.id_pilkarza] || [];
            const nazwyPozycji = idsPozycji.map((idPoz) => {
              const poz = pozycje.find((x) => x.id_pozycja === idPoz);
              return poz ? poz.skrot : `?(${idPoz})`;
            });

            return (
              <tr key={p.id_pilkarza}>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {p.id_pilkarza}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {p.imie}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {p.nazwisko}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {nazwyPozycji.length > 0 ? (
                    nazwyPozycji.join(", ")
                  ) : (
                    <em>brak pozycji</em>
                  )}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {idsPozycji.map((idPoz) => {
                    const skr = pozycje.find((x) => x.id_pozycja === idPoz)?.skrot || idPoz;
                    return (
                      <button
                        key={`${p.id_pilkarza}-${idPoz}`}
                        onClick={() => handleUsunRelacje(p.id_pilkarza, idPoz)}
                        style={{ marginRight: 4 }}
                      >
                        Usuń {skr}
                      </button>
                    );
                  })}
                  {idsPozycji.length === 0 && <span>—</span>}
                </td>
              </tr>
            );
          })}
          {pilkarze.length === 0 && (
            <tr>
              <td
                colSpan={5}
                style={{ border: "1px solid #ccc", padding: "0.5rem" }}
              >
                Brak piłkarzy w bazie
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
