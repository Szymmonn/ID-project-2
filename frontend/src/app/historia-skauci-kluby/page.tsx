"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAll, deleteOne } from "@/api";

// Typ dla jednego wpisu historii
type Historia = {
  id_skauta: number;
  id_klubu: number;
  data_rozpoczecia_wspolpracy: string; // ISO
  data_zakonczenia_wspolpracy: string;  // ISO lub null
};

// Typ podstawowy skauta
type Skaut = {
  id_skauta: number;
  imie: string;
  nazwisko: string;
};

// Typ podstawowy klubu
type Klub = {
  id_klubu: number;
  nazwa: string;
  miasto: string;
};

export default function HistoriaSkauciKlubyPage() {
  const router = useRouter();

  // Wszystkie dane pobrane z API
  const [historia, setHistoria] = useState<Historia[]>([]);
  const [skauci, setSkauci] = useState<Skaut[]>([]);
  const [kluby, setKluby] = useState<Klub[]>([]);

  // stan filtrowania
  const [filterSkaut, setFilterSkaut] = useState<number | "">("");
  const [filterKlub, setFilterKlub] = useState<number | "">("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // fetch wszystkich trzech end­pointów
  const fetchData = async () => {
    try {
      setLoading(true);
      const [hRes, sRes, kRes] = await Promise.all([
        getAll("historia_skauci_kluby"),
        getAll("skauci"),
        getAll("kluby"),
      ]);

      setHistoria(hRes.data);
      setSkauci(sRes.data);
      setKluby(kRes.data);
    } catch (err) {
      console.error("Błąd pobierania danych historii skautów → kluby:", err);
      setError("Nie udało się pobrać danych.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Funkcja usuwająca wpis (DELETE z composite key: id_skauta, id_klubu, data_rozpoczecia_wspolpracy)
  const handleDelete = async (h: Historia) => {
    const potwierdz = window.confirm(
      `Na pewno usunąć współpracę skauta ${h.id_skauta} z klubem ${h.id_klubu} (rozp. ${new Date(
        h.data_rozpoczecia_wspolpracy
      ).toLocaleDateString("pl-PL")})?`
    );
    if (!potwierdz) return;

    try {
      await deleteOne("historia_skauci_kluby", {
        id_skauta: h.id_skauta,
        id_klubu: h.id_klubu,
        data_rozpoczecia_wspolpracy: h.data_rozpoczecia_wspolpracy,
      });
      fetchData();
    } catch (err) {
      console.error("Błąd usuwania wpisu historii:", err);
      setError("Nie udało się usunąć wpisu.");
    }
  };

  // Funkcja pomocnicza: po ID skauta zwróć jego pełne imię i nazwisko
  const nazwiskoSkauta = (id: number) => {
    const s = skauci.find((x) => x.id_skauta === id);
    return s ? `${s.imie} ${s.nazwisko}` : `#${id}`;
  };

  // Funkcja pomocnicza: po ID klubu zwróć jego nazwę
  const nazwaKlubu = (id: number) => {
    const k = kluby.find((x) => x.id_klubu === id);
    return k ? `${k.nazwa} (${k.miasto})` : `#${id}`;
  };

  // Lista po przefiltrowaniu
  const filtered = historia.filter((h) => {
    if (filterSkaut !== "" && h.id_skauta !== filterSkaut) return false;
    if (filterKlub !== "" && h.id_klubu !== filterKlub) return false;
    return true;
  });

  if (loading) return <p>Ładowanie historii współpracy…</p>;
  if (error)
    return (
      <div>
        <h1>Błąd</h1>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );

  return (
    <div>
      <h1>Historia współpracy skautów z klubami</h1>

      <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
        {/* Przycisk do dodawania */}
        <button
          onClick={() => router.push("/historia-skauci-kluby/dodaj")}
          style={{
            backgroundColor: "#0070f3",
            color: "#fff",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Dodaj wpis
        </button>

        {/* Filtr po skaucie */}
        <div>
          <label style={{ display: "block", marginBottom: "0.2rem" }}>
            Filtruj wg skauta:
          </label>
          <select
            value={filterSkaut}
            onChange={(e) =>
              setFilterSkaut(
                e.target.value === "" ? "" : Number(e.target.value)
              )
            }
            style={{ padding: "0.4rem", minWidth: 200 }}
          >
            <option value="">Wszystkie</option>
            {skauci.map((s) => (
              <option key={s.id_skauta} value={s.id_skauta}>
                {s.imie} {s.nazwisko}
              </option>
            ))}
          </select>
        </div>

        {/* Filtr po klubie */}
        <div>
          <label style={{ display: "block", marginBottom: "0.2rem" }}>
            Filtruj wg klubu:
          </label>
          <select
            value={filterKlub}
            onChange={(e) =>
              setFilterKlub(
                e.target.value === "" ? "" : Number(e.target.value)
              )
            }
            style={{ padding: "0.4rem", minWidth: 200 }}
          >
            <option value="">Wszystkie</option>
            {kluby.map((k) => (
              <option key={k.id_klubu} value={k.id_klubu}>
                {k.nazwa} ({k.miasto})
              </option>
            ))}
          </select>
        </div>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Skaut
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Klub
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Data rozpoczęcia
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Data zakończenia
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Akcje
            </th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((h) => (
            <tr
              key={`${h.id_skauta}-${h.id_klubu}-${h.data_rozpoczecia_wspolpracy}`}
            >
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                {nazwiskoSkauta(h.id_skauta)}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                {nazwaKlubu(h.id_klubu)}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                {new Date(h.data_rozpoczecia_wspolpracy).toLocaleDateString(
                  "pl-PL"
                )}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                {h.data_zakonczenia_wspolpracy
                  ? new Date(h.data_zakonczenia_wspolpracy).toLocaleDateString(
                      "pl-PL"
                    )
                  : "-"}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                <button
                  onClick={() => handleDelete(h)}
                  style={{
                    backgroundColor: "#a00",
                    color: "#fff",
                    padding: "0.3rem 0.6rem",
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
          {filtered.length === 0 && (
            <tr>
              <td
                colSpan={5}
                style={{ textAlign: "center", padding: "1rem", color: "#666" }}
              >
                Brak wpisów dla wybranych kryteriów.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
