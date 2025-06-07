// frontend/src/app/transferroom-poszukiwania/[id]/edytuj/page.tsx
"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getOne, updateOne } from "@/api";

type Poszukiwanie = {
  id_poszukiwania: number;
  id_klubu: number;
  id_pozycja?: number;
  cena_do?: number;
  wiek_max?: number;
  id_kraju?: number;
  id_ligi?: number;
};

export default function TransferroomPoszukiwaniaEdytujPage() {
  const router = useRouter();
  const params = useParams(); // { id: "123" }
  const idPoszukiwania = Number(params?.id);

  const [oferta, setOferta] = useState<Poszukiwanie | null>(null);
  const [idKlubu, setIdKlubu] = useState<number | "">("");
  const [idPozycji, setIdPozycji] = useState<number | "">("");
  const [cenaDo, setCenaDo] = useState<number | "">("");
  const [wiekMax, setWiekMax] = useState<number | "">("");
  const [idKraju, setIdKraju] = useState<number | "">("");
  const [idLigi, setIdLigi] = useState<number | "">("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!idPoszukiwania) {
      setError("Brak ID poszukiwania w URL.");
      setLoading(false);
      return;
    }

    getOne("transferroom_poszukiwania", idPoszukiwania)
      .then((res) => {
        const d: Poszukiwanie = res.data;
        setOferta(d);
        setIdKlubu(d.id_klubu);
        setIdPozycji(d.id_pozycja ?? "");
        setCenaDo(d.cena_do ?? "");
        setWiekMax(d.wiek_max ?? "");
        setIdKraju(d.id_kraju ?? "");
        setIdLigi(d.id_ligi ?? "");
      })
      .catch((err) => {
        console.error("Błąd pobierania poszukiwania:", err);
        setError("Nie udało się pobrać poszukiwania.");
      })
      .finally(() => setLoading(false));
  }, [idPoszukiwania]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idPoszukiwania) return;

    try {
      await updateOne("transferroom_poszukiwania", idPoszukiwania, {
        id_klubu: Number(idKlubu),
        id_pozycja: idPozycji === "" ? undefined : Number(idPozycji),
        cena_do: cenaDo === "" ? undefined : Number(cenaDo),
        wiek_max: wiekMax === "" ? undefined : Number(wiekMax),
        id_kraju: idKraju === "" ? undefined : Number(idKraju),
        id_ligi: idLigi === "" ? undefined : Number(idLigi),
      });
      router.push("/transferroom-poszukiwania");
    } catch (err) {
      console.error("Błąd aktualizacji poszukiwania:", err);
      setError("Nie udało się zaktualizować poszukiwania.");
    }
  };

  if (loading) return <p>Ładowanie danych poszukiwania…</p>;
  if (error)
    return (
      <div>
        <h1>Błąd</h1>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );

  return (
    <div>
      <h1>Edytuj poszukiwanie (ID: {idPoszukiwania})</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>ID klubu (wymagane):</label>
          <br />
          <input
            type="number"
            value={idKlubu}
            onChange={(e) => setIdKlubu(Number(e.target.value))}
            required
            style={{ width: "100%", padding: "0.4rem" }}
          />
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label>ID pozycji (opcjonalnie):</label>
          <br />
          <input
            type="number"
            value={idPozycji}
            onChange={(e) => setIdPozycji(e.target.value === "" ? "" : Number(e.target.value))}
            style={{ width: "100%", padding: "0.4rem" }}
          />
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label>Cena do (opcjonalnie):</label>
          <br />
          <input
            type="number"
            value={cenaDo}
            onChange={(e) => setCenaDo(e.target.value === "" ? "" : Number(e.target.value))}
            style={{ width: "100%", padding: "0.4rem" }}
          />
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label>Wiek max (opcjonalnie):</label>
          <br />
          <input
            type="number"
            value={wiekMax}
            onChange={(e) => setWiekMax(e.target.value === "" ? "" : Number(e.target.value))}
            style={{ width: "100%", padding: "0.4rem" }}
          />
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label>ID kraju (opcjonalnie):</label>
          <br />
          <input
            type="number"
            value={idKraju}
            onChange={(e) => setIdKraju(e.target.value === "" ? "" : Number(e.target.value))}
            style={{ width: "100%", padding: "0.4rem" }}
          />
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label>ID ligi (opcjonalnie):</label>
          <br />
          <input
            type="number"
            value={idLigi}
            onChange={(e) => setIdLigi(e.target.value === "" ? "" : Number(e.target.value))}
            style={{ width: "100%", padding: "0.4rem" }}
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
          onClick={() => router.push("/transferroom-poszukiwania")}
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
