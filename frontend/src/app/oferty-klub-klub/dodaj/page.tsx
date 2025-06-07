// File: src/app/oferty-klub-klub/create/page.tsx
"use client"

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Pilkarz {
  id_pilkarza: number;
  imie: string;
  nazwisko: string;
}
interface Klub {
  id_klubu: number;
  nazwa: string;
}
interface Agent {
  id_agenta: number;
  imie: string;
  nazwisko: string;
}

export default function OfertyCreatePage() {
  const router = useRouter();

  // Stany list, aby wypełnić selecty
  const [pilkarze, setPilkarze] = useState<Pilkarz[]>([]);
  const [kluby, setKluby] = useState<Klub[]>([]);
  const [agenci, setAgenci] = useState<Agent[]>([]);

  // Stany pól formularza
  const [idPilkarza, setIdPilkarza] = useState<string>("");
  const [idKlubu, setIdKlubu] = useState<string>("");
  const [dataZlozenia, setDataZlozenia] = useState<string>("");
  const [idAgenta1, setIdAgenta1] = useState<string>(""); // opcjonalnie
  const [idAgenta2, setIdAgenta2] = useState<string>(""); // opcjonalnie
  const [czyZaakceptowana, setCzyZaakceptowana] = useState<boolean>(false);
  const [doNegocjacji, setDoNegocjacji] = useState<boolean>(true);
  const [ktoSklada, setKtoSklada] = useState<string>("");
  const [zaplata, setZaplata] = useState<string>("0");
  const [iloscRat, setIloscRat] = useState<string>("1");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Przy montowaniu pobierz listy do selectów
  useEffect(() => {
    const fetchLists = async () => {
      try {
        const [pilRes, klubRes, agentRes] = await Promise.all([
          axios.get<Pilkarz[]>("http://localhost:8000/api/pilkarze/"),
          axios.get<Klub[]>("http://localhost:8000/api/kluby/"),
          axios.get<Agent[]>("http://localhost:8000/api/agenci/"),
        ]);
        setPilkarze(pilRes.data);
        setKluby(klubRes.data);
        setAgenci(agentRes.data);
      } catch (e) {
        console.error("Błąd pobierania list:", e);
      }
    };
    fetchLists();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Podstawowa walidacja
    if (!idPilkarza || !idKlubu || !dataZlozenia || !ktoSklada || !zaplata || !iloscRat) {
      setError("Wypełnij wszystkie wymagane pola oznaczone *");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        id_pilkarza: Number(idPilkarza),
        id_klubu: Number(idKlubu),
        data_zlozenia_oferty: dataZlozenia,
        id_agenta_klubu1: idAgenta1 ? Number(idAgenta1) : null,
        id_agenta_klubu2: idAgenta2 ? Number(idAgenta2) : null,
        czy_zaakceptowana: czyZaakceptowana,
        do_negocjacji: doNegocjacji,
        kto_sklada_oferte: ktoSklada,
        zaplata: Number(zaplata),
        ilosc_rat: Number(iloscRat),
      };
      await axios.post("http://localhost:8000/api/oferty_transferowe_klub_klub/", payload);
      router.push("/oferty-klub-klub");
    } catch (e: any) {
      setError(e.response?.data?.detail || e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dodaj nową ofertę Klub→Klub</h1>
      {error && <p className="mb-4 text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Select: Pilkarz */}
        <div>
          <label className="block font-medium">Piłkarz*</label>
          <select
            value={idPilkarza}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setIdPilkarza(e.target.value)}
            required
            className="mt-1 block w-full border rounded p-1"
          >
            <option value="">— wybierz piłkarza —</option>
            {pilkarze.map((p) => (
              <option key={p.id_pilkarza} value={p.id_pilkarza}>
                {p.imie} {p.nazwisko} (#{p.id_pilkarza})
              </option>
            ))}
          </select>
        </div>

        {/* Select: Klub */}
        <div>
          <label className="block font-medium">Klub*</label>
          <select
            value={idKlubu}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setIdKlubu(e.target.value)}
            required
            className="mt-1 block w-full border rounded p-1"
          >
            <option value="">— wybierz klub —</option>
            {kluby.map((k) => (
              <option key={k.id_klubu} value={k.id_klubu}>
                {k.nazwa} (#{k.id_klubu})
              </option>
            ))}
          </select>
        </div>

        {/* Data złożenia oferty */}
        <div>
          <label className="block font-medium">Data złożenia*</label>
          <input
            type="date"
            value={dataZlozenia}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setDataZlozenia(e.target.value)}
            required
            className="mt-1 block w-full border rounded p-1"
          />
        </div>

        {/* Select: Agent Klubu 1 (opcjonalnie) */}
        <div>
          <label className="block font-medium">Agent Klubu 1 (opcjonalnie)</label>
          <select
            value={idAgenta1}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setIdAgenta1(e.target.value)}
            className="mt-1 block w-full border rounded p-1"
          >
            <option value="">— brak —</option>
            {agenci.map((a) => (
              <option key={a.id_agenta} value={a.id_agenta}>
                {a.imie} {a.nazwisko} (#{a.id_agenta})
              </option>
            ))}
          </select>
        </div>

        {/* Select: Agent Klubu 2 (opcjonalnie) */}
        <div>
          <label className="block font-medium">Agent Klubu 2 (opcjonalnie)</label>
          <select
            value={idAgenta2}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setIdAgenta2(e.target.value)}
            className="mt-1 block w-full border rounded p-1"
          >
            <option value="">— brak —</option>
            {agenci.map((a) => (
              <option key={a.id_agenta} value={a.id_agenta}>
                {a.imie} {a.nazwisko} (#{a.id_agenta})
              </option>
            ))}
          </select>
        </div>

        {/* Czy zaakceptowana */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={czyZaakceptowana}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCzyZaakceptowana(e.target.checked)
            }
            id="accepted_create"
            className="mr-1"
          />
          <label htmlFor="accepted_create">Czy zaakceptowana?</label>
        </div>

        {/* Do negocjacji */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={doNegocjacji}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setDoNegocjacji(e.target.checked)
            }
            id="negocjacje_create"
            className="mr-1"
          />
          <label htmlFor="negocjacje_create">Do negocjacji?</label>
        </div>

        {/* Kto składa ofertę */}
        <div>
          <label className="block font-medium">Kto składa ofertę*</label>
          <input
            type="text"
            value={ktoSklada}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setKtoSklada(e.target.value)
            }
            required
            className="mt-1 block w-full border rounded p-1"
          />
        </div>

        {/* Zapłata */}
        <div>
          <label className="block font-medium">Zapłata (kwota)*</label>
          <input
            type="number"
            value={zaplata}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setZaplata(e.target.value)
            }
            required
            className="mt-1 block w-full border rounded p-1"
            min={0}
          />
        </div>

        {/* Ilość rat */}
        <div>
          <label className="block font-medium">Ilość rat*</label>
          <input
            type="number"
            value={iloscRat}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setIloscRat(e.target.value)
            }
            required
            className="mt-1 block w-full border rounded p-1"
            min={1}
          />
        </div>

        <div className="flex space-x-2 mt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Zapisywanie…" : "Zapisz"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/oferty-klub-klub")}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Anuluj
          </button>
        </div>
      </form>
    </div>
  );
}
