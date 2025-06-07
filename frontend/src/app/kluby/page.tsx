"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getAll, deleteOne } from "@/api";

type Klub = {
  id_klubu: number;
  nazwa: string;
  miasto: string;
  id_stadionu: number | null;
  rok_zalozenia: number | null;
};

export default function KlubyListPage() {
  const router = useRouter();
  const [kluby, setKluby] = useState<Klub[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchKluby = async () => {
    try {
      const res = await getAll("kluby");
      setKluby(res.data);
    } catch (err) {
      console.error("Błąd pobierania listy klubów:", err);
      setError("Nie udało się pobrać listy klubów.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKluby();
  }, []);

  const handleDelete = async (id: number) => {
    if (
      !confirm(
        "Czy na pewno chcesz usunąć ten klub? Operacji nie da się cofnąć."
      )
    ) {
      return;
    }
    try {
      await deleteOne("kluby", id);
      // odświeżenie listy
      fetchKluby();
    } catch (err) {
      console.error("Błąd usuwania klubu:", err);
      alert("Nie udało się usunąć klubu.");
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
      </div>
    );
  }

  return (
    <div>
      <h1>Lista Klubów</h1>
      <button
        onClick={() => router.push("/kluby/dodaj")}
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
        Dodaj nowy klub
      </button>

      {kluby.length === 0 ? (
        <p>Brak klubów w bazie.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                ID
              </th>
              <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                Nazwa
              </th>
              <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                Miasto
              </th>
              <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                Stadion (ID)
              </th>
              <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                Rok założenia
              </th>
              <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                Akcje
              </th>
            </tr>
          </thead>
          <tbody>
            {kluby.map((klub) => (
              <tr key={klub.id_klubu}>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {klub.id_klubu}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {klub.nazwa}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {klub.miasto}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {klub.id_stadionu !== null ? klub.id_stadionu : "—"}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {klub.rok_zalozenia !== null ? klub.rok_zalozenia : "—"}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  <Link
                    href={`/kluby/edytuj/${klub.id_klubu}`}
                    style={{ marginRight: "0.5rem" }}
                  >
                    Edytuj
                  </Link>
                  <Link
                    href={`/kluby/${klub.id_klubu}/usun`}
                    style={{ color: "red" }}
                  >
                    Usuń
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
