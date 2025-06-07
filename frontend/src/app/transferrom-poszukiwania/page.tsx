// frontend/src/app/transferroom-poszukiwania/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAll, deleteOne } from "@/api";

type Poszukiwanie = {
  id_poszukiwania: number;
  id_klubu: number;
  id_pozycja?: number;
  cena_do?: number;
  wiek_max?: number;
  id_kraju?: number;
  id_ligi?: number;
};

export default function TransferroomPoszukiwaniaPage() {
  const router = useRouter();
  const [lista, setLista] = useState<Poszukiwanie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const res = await getAll("transferroom_poszukiwania");
      setLista(res.data);
    } catch (err) {
      console.error("Błąd pobierania listy poszukiwań:", err);
      setError("Nie udało się pobrać listy poszukiwań.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Na pewno usunąć to poszukiwanie?")) return;
    try {
      await deleteOne("transferroom_poszukiwania", id);
      fetchData();
    } catch (err) {
      console.error("Błąd usuwania poszukiwania:", err);
      setError("Nie udało się usunąć poszukiwania.");
    }
  };

  if (loading) return <p>Ładowanie listy poszukiwań…</p>;
  if (error)
    return (
      <div>
        <h1>Błąd</h1>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );

  return (
    <div>
      <h1>Transferroom – Poszukiwania</h1>
      <button
        onClick={() => router.push("/transferroom-poszukiwania/dodaj")}
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
        Dodaj nowe poszukiwanie
      </button>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>ID</th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              ID klubu
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              ID pozycji
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Cena do
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Wiek max
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              ID kraju
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              ID ligi
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Akcje
            </th>
          </tr>
        </thead>
        <tbody>
          {lista.map((item) => (
            <tr key={item.id_poszukiwania}>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                {item.id_poszukiwania}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                {item.id_klubu}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                {item.id_pozycja ?? "-"}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                {item.cena_do ?? "-"}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                {item.wiek_max ?? "-"}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                {item.id_kraju ?? "-"}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                {item.id_ligi ?? "-"}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                <button
                  onClick={() =>
                    router.push(
                      `/transferroom-poszukiwania/${item.id_poszukiwania}/edytuj`
                    )
                  }
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
                  onClick={() => handleDelete(item.id_poszukiwania)}
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
        </tbody>
      </table>
    </div>
  );
}
