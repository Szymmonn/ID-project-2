// frontend/src/app/mecze/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAll, deleteOne } from "@/api";

type Mecz = {
  id_meczu: number;
  id_gospodarze: number;
  id_goscie: number;
  data: string; // ISO date string
  id_stadionu: number;
  nierozstrzygniety: boolean;
  rodzaj_meczu: string | null;
  uwagi: string | null;
};

export default function MeczePage() {
  const router = useRouter();
  const [lista, setLista] = useState<Mecz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const res = await getAll("mecze");
      setLista(res.data);
    } catch (err) {
      console.error("Błąd pobierania listy meczów:", err);
      setError("Nie udało się pobrać listy meczów.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Na pewno usunąć ten mecz?")) return;
    try {
      await deleteOne("mecze", id);
      fetchData();
    } catch (err) {
      console.error("Błąd usuwania meczu:", err);
      setError("Nie udało się usunąć meczu.");
    }
  };

  if (loading) return <p>Ładowanie listy meczów…</p>;
  if (error)
    return (
      <div>
        <h1>Błąd</h1>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );

  return (
    <div>
      <h1>Lista meczów</h1>

      <button
        onClick={() => router.push("/mecze/dodaj")}
        style={{
          marginBottom: "1rem",
          backgroundColor: "#0070f3",
          color: "#fff",
          padding: "0.5rem 1rem",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        Dodaj nowy mecz
      </button>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>ID</th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Gospodarze
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Goście
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Data
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Stadion
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Nierozstrzygnięty
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Rodzaj
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Uwagi
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Akcje
            </th>
          </tr>
        </thead>
        <tbody>
          {lista.map((m) => (
            <tr key={m.id_meczu}>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                {m.id_meczu}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                {m.id_gospodarze}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                {m.id_goscie}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                {new Date(m.data).toLocaleDateString("pl-PL")}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                {m.id_stadionu}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                {m.nierozstrzygniety ? "Tak" : "Nie"}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                {m.rodzaj_meczu || "-"}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                {m.uwagi || "-"}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                <button
                  onClick={() => router.push(`/mecze/${m.id_meczu}/edytuj`)}
                  style={{
                    marginRight: "0.5rem",
                    backgroundColor: "#0a0",
                    color: "#fff",
                    padding: "0.3rem 0.6rem",
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                  }}
                >
                  Edytuj
                </button>
                <button
                  onClick={() => handleDelete(m.id_meczu)}
                  style={{
                    marginRight: "0.5rem",
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
                <button
                  onClick={() => {
                    console.log("looooool", m.id_meczu)
                    router.push(`/mecze/${m.id_meczu}/statystyki-gracze`) }
                  }
                  style={{
                    marginRight: "0.5rem",
                    backgroundColor: "#0070f3",
                    color: "#fff",
                    padding: "0.3rem 0.6rem",
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                  }}
                >
                  Statystyki graczy
                </button>
                <button
                  onClick={() =>
                    router.push(`/mecze/${m.id_meczu}/statystyki-wydarzenia`)
                  }
                  style={{
                    backgroundColor: "#555",
                    color: "#fff",
                    padding: "0.3rem 0.6rem",
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                  }}
                >
                  Statystyki wydarzeń
                </button>
              </td>
            </tr>
          ))}
          {lista.length === 0 && (
            <tr>
              <td
                colSpan={9}
                style={{ textAlign: "center", padding: "1rem", color: "#666" }}
              >
                Brak meczów w bazie.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
