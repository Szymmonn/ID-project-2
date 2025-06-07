"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAll, deleteOne } from "@/api";

type Wydarzenie = {
  id_wydarzenia: number;
  nazwa: string;
};

export default function MeczStatystykiWydarzeniaListPage() {
  const router = useRouter();
  const [wydarzenia, setWydarzenia] = useState<Wydarzenie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAll("mecz_statystyki_wydarzenia")
      .then((res) => {
        setWydarzenia(res.data);
      })
      .catch((err) => {
        console.error("Błąd pobierania typów wydarzeń:", err);
        setError("Nie udało się pobrać listy typów wydarzeń.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleUsuń = async (idWydarzenia: number) => {
    if (!confirm("Na pewno usunąć ten typ wydarzenia?")) return;

    try {
      await deleteOne("mecz_statystyki_wydarzenia", { id_wydarzenia: idWydarzenia });
      setWydarzenia((prev) => prev.filter((w) => w.id_wydarzenia !== idWydarzenia));
    } catch (err) {
      console.error("Błąd usuwania typu wydarzenia:", err);
      setError("Nie udało się usunąć. Spróbuj ponownie.");
    }
  };

  if (loading) return <p>Ładowanie typów wydarzeń…</p>;
  if (error)
    return (
      <div>
        <h1>Błąd</h1>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );

  return (
    <div>
      <h1>Typy wydarzeń (mecz_statystyki_wydarzenia)</h1>
      <button
        onClick={() => router.push("/mecz_statystyki_wydarzenia/dodaj")}
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
        Dodaj nowy typ wydarzenia
      </button>

      {wydarzenia.length === 0 ? (
        <p>Brak typów wydarzeń.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: 8 }}>ID</th>
              <th style={{ border: "1px solid #ccc", padding: 8 }}>Nazwa</th>
              <th style={{ border: "1px solid #ccc", padding: 8 }}>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {wydarzenia.map((w) => (
              <tr key={w.id_wydarzenia}>
                <td style={{ border: "1px solid #ccc", padding: 8 }}>{w.id_wydarzenia}</td>
                <td style={{ border: "1px solid #ccc", padding: 8 }}>{w.nazwa}</td>
                <td style={{ border: "1px solid #ccc", padding: 8 }}>
                  <button
                    onClick={() =>
                      router.push(`/mecz_statystyki_wydarzenia/edytuj/${w.id_wydarzenia}`)
                    }
                    style={{
                      backgroundColor: "#0070f3",
                      color: "#fff",
                      padding: "4px 8px",
                      border: "none",
                      borderRadius: 4,
                      cursor: "pointer",
                      marginRight: "0.5rem",
                    }}
                  >
                    Edytuj
                  </button>
                  <button
                    onClick={() => handleUsuń(w.id_wydarzenia)}
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
    </div>
  );
}
