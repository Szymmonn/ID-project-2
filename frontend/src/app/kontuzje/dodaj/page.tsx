"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAll, createOne } from "@/api";

type Pilkarz = {
  id_pilkarza: number;
  imie: string;
  nazwisko: string;
};

type Mecz = {
  id_meczu: number;
  id_gospodarze: number;
  id_goscie: number;
  data: string;
};

export default function KontuzjeDodajPage() {
  const router = useRouter();

  // Formularz:
  const [idPilkarza, setIdPilkarza] = useState<number | "">("");
  const [idMeczu, setIdMeczu] = useState<number | "">(""); // opcjonalnie
  const [dataKontuzji, setDataKontuzji] = useState<string>(""); // YYYY-MM-DD
  const [opis, setOpis] = useState<string>("");
  const [czasLeczenia, setCzasLeczenia] = useState<number | "">("");

  // Do SELECTa:
  const [pilkarze, setPilkarze] = useState<Pilkarz[]>([]);
  const [mecze, setMecze] = useState<Mecz[]>([]);

  const [error, setError] = useState<string | null>(null);

  // Pobierz listę piłkarzy i meczów dla selectów
  useEffect(() => {
    getAll("pilkarze")
      .then((res) => setPilkarze(res.data))
      .catch((_) => {
        console.error("Błąd pobierania piłkarzy");
      });
    getAll("mecze")
      .then((res) => setMecze(res.data))
      .catch((_) => {
        console.error("Błąd pobierania meczów");
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Walidacja:
    if (
      idPilkarza === "" ||
      dataKontuzji.trim() === "" ||
      opis.trim() === "" ||
      czasLeczenia === ""
    ) {
      setError(
        "Proszę wypełnić obowiązkowe pola: Piłkarz, Data, Opis, Czas leczenia."
      );
      return;
    }

    try {
      await createOne("kontuzje", {
        id_pilkarza: Number(idPilkarza),
        id_meczu: idMeczu === "" ? null : Number(idMeczu),
        data_kontuzji: dataKontuzji,
        opis_kontuzji: opis.trim(),
        przewidywany_czas_leczenia_w_dniach: Number(czasLeczenia),
      });
      router.push("/kontuzje");
    } catch (err) {
      console.error("Błąd tworzenia kontuzji:", err);
      setError("Nie udało się dodać kontuzji. Spróbuj ponownie.");
    }
  };

  return (
    <div>
      <h1>Dodaj nową kontuzję</h1>
      {error && (
        <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>
      )}
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        {/* Wybór piłkarza */}
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Piłkarz:</label>
          <br />
          <select
            value={idPilkarza}
            onChange={(e) => setIdPilkarza(Number(e.target.value))}
            required
            style={{ width: "100%", padding: "0.4rem" }}
          >
            <option value="">— wybierz piłkarza —</option>
            {pilkarze.map((p) => (
              <option key={p.id_pilkarza} value={p.id_pilkarza}>
                {p.imie} {p.nazwisko} (ID {p.id_pilkarza})
              </option>
            ))}
          </select>
        </div>

        {/* Wybór meczu (opcjonalne) */}
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Mecz (opcjonalnie):</label>
          <br />
          <select
            value={idMeczu}
            onChange={(e) => setIdMeczu(Number(e.target.value))}
            style={{ width: "100%", padding: "0.4rem" }}
          >
            <option value="">— bez meczu —</option>
            {mecze.map((m) => (
              <option key={m.id_meczu} value={m.id_meczu}>
                ID {m.id_meczu} | {new Date(m.data).toLocaleDateString("pl-PL")} |{" "}
                {m.id_gospodarze} vs {m.id_goscie}
              </option>
            ))}
          </select>
        </div>

        {/* Data kontuzji */}
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Data kontuzji:</label>
          <br />
          <input
            type="date"
            value={dataKontuzji}
            onChange={(e) => setDataKontuzji(e.target.value)}
            required
            style={{ width: "100%", padding: "0.4rem" }}
          />
        </div>

        {/* Opis kontuzji */}
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Opis kontuzji:</label>
          <br />
          <textarea
            value={opis}
            onChange={(e) => setOpis(e.target.value)}
            required
            rows={3}
            style={{ width: "100%", padding: "0.4rem" }}
          />
        </div>

        {/* Przewidywany czas leczenia */}
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Przewidywany czas leczenia (dni):</label>
          <br />
          <input
            type="number"
            value={czasLeczenia}
            onChange={(e) => setCzasLeczenia(Number(e.target.value))}
            required
            min={1}
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
          Zapisz
        </button>
        <button
          type="button"
          onClick={() => router.push("/kontuzje")}
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
