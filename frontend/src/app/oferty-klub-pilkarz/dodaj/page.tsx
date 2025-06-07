// frontend/src/app/oferty-klub-pilkarz/dodaj/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createOne, getAll } from "@/api";

type Pilkarz = { id_pilkarza: number; imie: string; nazwisko: string };
type Klub = { id_klubu: number; nazwa: string };
type Agent = { id_agenta: number; imie: string; nazwisko: string };

export default function OfertaKlubPilkarzDodajPage() {
  const router = useRouter();

  const [pilkarze, setPilkarze] = useState<Pilkarz[]>([]);
  const [kluby, setKluby] = useState<Klub[]>([]);
  const [agenci, setAgenci] = useState<Agent[]>([]);

  const [wybranyPilkarz, setWybranyPilkarz] = useState<number | "">("");
  const [wybranyKlub, setWybranyKlub] = useState<number | "">("");
  const [dataZlozenia, setDataZlozenia] = useState("");
  const [dataPoczatek, setDataPoczatek] = useState("");
  const [dataKoniec, setDataKoniec] = useState("");
  const [agentKlubu, setAgentKlubu] = useState<number | "">("");
  const [agentPilkarza, setAgentPilkarza] = useState<number | "">("");
  const [czyPrzyjeta, setCzyPrzyjeta] = useState(false);
  const [doNegocjacji, setDoNegocjacji] = useState(true);
  const [ktoSkłada, setKtoSkłada] = useState("");
  const [czestosc, setCzestosc] = useState("100");
  const [placa, setPlaca] = useState("");
  const [kwotaGotowkowa, setKwotaGotowkowa] = useState("");
  const [oplataAgenta, setOplataAgenta] = useState("");
  const [premiaWystep, setPremiaWystep] = useState("");
  const [premiaBramka, setPremiaBramka] = useState("");
  const [premiaRezerwowy, setPremiaRezerwowy] = useState("");
  const [uwagi, setUwagi] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Pobieramy jednocześnie piłkarzy, kluby, agentów
    Promise.all([
      getAll("pilkarze"),
      getAll("kluby"),
      getAll("agenci"),
    ])
      .then(([resPilkarze, resKluby, resAgenci]) => {
        setPilkarze(resPilkarze.data);
        setKluby(resKluby.data);
        setAgenci(resAgenci.data);
      })
      .catch((err) =>
        console.error("Błąd pobierania danych do formularza:", err)
      )
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !wybranyPilkarz ||
      !wybranyKlub ||
      !dataZlozenia ||
      !dataPoczatek ||
      !dataKoniec ||
      !ktoSkłada ||
      !czestosc ||
      !placa
    ) {
      alert("Wypełnij wszystkie pola wymagane.");
      return;
    }

    const payload = {
      id_pilkarza: wybranyPilkarz,
      id_klubu: wybranyKlub,
      id_agenta_klubu: agentKlubu !== "" ? agentKlubu : null,
      id_agenta_pilkarza: agentPilkarza !== "" ? agentPilkarza : null,
      data_zlozenia_oferty: dataZlozenia,
      data_poczatek_kontraktu: dataPoczatek,
      data_koniec_kontraktu: dataKoniec,
      czy_przyjeta: czyPrzyjeta,
      do_negocjacji: doNegocjacji,
      kto_sklada_oferte: ktoSkłada,
      czestosc_wystepow_w_procentach: parseInt(czestosc, 10),
      placa_miesieczna: parseInt(placa, 10),
      kwota_gotowkowa:
        kwotaGotowkowa !== "" ? parseInt(kwotaGotowkowa, 10) : null,
      oplata_dla_agenta:
        oplataAgenta !== "" ? parseInt(oplataAgenta, 10) : null,
      premia_za_wystep:
        premiaWystep !== "" ? parseInt(premiaWystep, 10) : null,
      premia_za_bramke:
        premiaBramka !== "" ? parseInt(premiaBramka, 10) : null,
      premia_za_niewykorzystanego_rezerwowego:
        premiaRezerwowy !== "" ? parseInt(premiaRezerwowy, 10) : null,
      uwagi: uwagi || null,
    };

    try {
      await createOne("oferty_transferowe_klub_pilkarz", payload);
      router.push("/oferty-klub-pilkarz");
    } catch (err) {
      console.error("Błąd dodawania oferty:", err);
      alert("Nie udało się dodać oferty.");
    }
  };

  if (loading) {
    return <p>Ładowanie formularza…</p>;
  }

  return (
    <div>
      <h1>Dodaj ofertę Klub → Piłkarz</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 600 }}>
        {/* Piłkarz */}
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Piłkarz (ID):</label>
          <br />
          <select
            value={wybranyPilkarz}
            onChange={(e) => setWybranyPilkarz(Number(e.target.value))}
            required
          >
            <option value="">— wybierz piłkarza —</option>
            {pilkarze.map((p) => (
              <option key={p.id_pilkarza} value={p.id_pilkarza}>
                {p.imie} {p.nazwisko} (ID: {p.id_pilkarza})
              </option>
            ))}
          </select>
        </div>

        {/* Klub */}
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Klub (ID):</label>
          <br />
          <select
            value={wybranyKlub}
            onChange={(e) => setWybranyKlub(Number(e.target.value))}
            required
          >
            <option value="">— wybierz klub —</option>
            {kluby.map((k) => (
              <option key={k.id_klubu} value={k.id_klubu}>
                {k.nazwa} (ID: {k.id_klubu})
              </option>
            ))}
          </select>
        </div>

        {/* Data złożenia oferty */}
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Data złożenia oferty:</label>
          <br />
          <input
            type="date"
            value={dataZlozenia}
            onChange={(e) => setDataZlozenia(e.target.value)}
            required
          />
        </div>

        {/* Data początek kontraktu */}
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Data początek kontraktu:</label>
          <br />
          <input
            type="date"
            value={dataPoczatek}
            onChange={(e) => setDataPoczatek(e.target.value)}
            required
          />
        </div>

        {/* Data koniec kontraktu */}
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Data koniec kontraktu:</label>
          <br />
          <input
            type="date"
            value={dataKoniec}
            onChange={(e) => setDataKoniec(e.target.value)}
            required
          />
        </div>

        {/* Agenci */}
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Agent klubu (opcjonalnie):</label>
          <br />
          <select
            value={agentKlubu}
            onChange={(e) => setAgentKlubu(Number(e.target.value))}
          >
            <option value="">— brak —</option>
            {agenci.map((a) => (
              <option key={a.id_agenta} value={a.id_agenta}>
                {a.imie} {a.nazwisko} (ID: {a.id_agenta})
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Agent piłkarza (opcjonalnie):</label>
          <br />
          <select
            value={agentPilkarza}
            onChange={(e) => setAgentPilkarza(Number(e.target.value))}
          >
            <option value="">— brak —</option>
            {agenci.map((a) => (
              <option key={a.id_agenta} value={a.id_agenta}>
                {a.imie} {a.nazwisko} (ID: {a.id_agenta})
              </option>
            ))}
          </select>
        </div>

        {/* Czy przyjęta */}
        <div style={{ marginBottom: "0.5rem" }}>
          <label>
            <input
              type="checkbox"
              checked={czyPrzyjeta}
              onChange={(e) => setCzyPrzyjeta(e.target.checked)}
            />{" "}
            Czy przyjęta?
          </label>
        </div>

        {/* Do negocjacji */}
        <div style={{ marginBottom: "0.5rem" }}>
          <label>
            <input
              type="checkbox"
              checked={doNegocjacji}
              onChange={(e) => setDoNegocjacji(e.target.checked)}
            />{" "}
            Do negocjacji?
          </label>
        </div>

        {/* Kto składa ofertę */}
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Kto składa ofertę:</label>
          <br />
          <input
            type="text"
            value={ktoSkłada}
            onChange={(e) => setKtoSkłada(e.target.value)}
            required
          />
        </div>

        {/* Częstotliwość występów */}
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Częstotliwość występów (w %):</label>
          <br />
          <input
            type="number"
            value={czestosc}
            onChange={(e) => setCzestosc(e.target.value)}
            min="0"
            max="100"
            required
          />
        </div>

        {/* Płaca miesięczna */}
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Płaca miesięczna:</label>
          <br />
          <input
            type="number"
            value={placa}
            onChange={(e) => setPlaca(e.target.value)}
            required
          />
        </div>

        {/* Kwota gotówkowa */}
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Kwota gotówkowa (opcjonalnie):</label>
          <br />
          <input
            type="number"
            value={kwotaGotowkowa}
            onChange={(e) => setKwotaGotowkowa(e.target.value)}
          />
        </div>

        {/* Opłata dla agenta */}
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Opłata dla agenta (opcjonalnie):</label>
          <br />
          <input
            type="number"
            value={oplataAgenta}
            onChange={(e) => setOplataAgenta(e.target.value)}
          />
        </div>

        {/* Premia za występ */}
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Premia za występ (opcjonalnie):</label>
          <br />
          <input
            type="number"
            value={premiaWystep}
            onChange={(e) => setPremiaWystep(e.target.value)}
          />
        </div>

        {/* Premia za bramkę */}
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Premia za bramkę (opcjonalnie):</label>
          <br />
          <input
            type="number"
            value={premiaBramka}
            onChange={(e) => setPremiaBramka(e.target.value)}
          />
        </div>

        {/* Premia za niewykorzystanego rezerwowego */}
        <div style={{ marginBottom: "0.5rem" }}>
          <label>
            Premia za niewykorzystanego rezerwowego (opcjonalnie):
          </label>
          <br />
          <input
            type="number"
            value={premiaRezerwowy}
            onChange={(e) => setPremiaRezerwowy(e.target.value)}
          />
        </div>

        {/* Uwagi */}
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Uwagi (opcjonalnie):</label>
          <br />
          <textarea
            value={uwagi}
            onChange={(e) => setUwagi(e.target.value)}
            rows={3}
            style={{ width: "100%" }}
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
          Zapisz ofertę
        </button>
        <button
          type="button"
          onClick={() => router.push("/oferty-klub-pilkarz")}
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
