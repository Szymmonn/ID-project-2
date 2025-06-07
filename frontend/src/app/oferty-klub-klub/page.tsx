// File: src/app/oferty-klub-klub/page.tsx
"use client"

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Oferta {
  id_oferty_dla_klubu: number;
  id_pilkarza: number;
  id_klubu: number;
  data_zlozenia_oferty: string;
  czy_zaakceptowana: boolean;
}

export default function OfertyListaPage() {
  const router = useRouter();

  // Stany listy + loading + error
  const [oferty, setOferty] = useState<Oferta[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Stany filtrów
  const [filtrPilkarza, setFiltrPilkarza] = useState<string>("");
  const [filtrKlubu, setFiltrKlubu] = useState<string>("");
  const [filtrZaakceptowane, setFiltrZaakceptowane] = useState<string>(""); // "", "true", "false"

  useEffect(() => {
    fetchOferty();
  }, []);

  const fetchOferty = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filtrPilkarza.trim() !== "") {
        params.append("id_pilkarza", filtrPilkarza.trim());
      }
      if (filtrKlubu.trim() !== "") {
        params.append("id_klubu", filtrKlubu.trim());
      }
      if (filtrZaakceptowane === "true" || filtrZaakceptowane === "false") {
        params.append("czy_zaakceptowana", filtrZaakceptowane);
      }
      const queryString = params.toString() ? `?${params.toString()}` : "";
      const url = `http://localhost:8000/api/oferty_transferowe_klub_klub/${queryString}`;
      const res = await axios.get<Oferta[]>(url);
      setOferty(res.data);
    } catch (e: any) {
      setError(e.response?.data?.detail || e.message);
      setOferty([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetchOferty();
  };

  // Usuwanie oferty
  const handleDelete = async (id: number) => {
    if (!confirm("Na pewno chcesz usunąć tę ofertę?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/oferty_transferowe_klub_klub/${id}`);
      fetchOferty();
    } catch (e: any) {
      alert("Błąd przy usuwaniu: " + (e.response?.data?.detail || e.message));
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Oferty Klub→Klub</h1>
        <button
          onClick={() => router.push("/oferty-klub-klub/dodaj")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Dodaj nową ofertę
        </button>
      </div>

      {/* Formularz filtrów */}
      <form
        onSubmit={handleFilterSubmit}
        className="border rounded p-4 grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <div>
          <label className="block text-sm font-medium">ID Piłkarza</label>
          <input
            type="number"
            value={filtrPilkarza}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFiltrPilkarza(e.target.value)
            }
            className="mt-1 block w-full border rounded p-1"
            placeholder="np. 3"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">ID Klubu</label>
          <input
            type="number"
            value={filtrKlubu}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFiltrKlubu(e.target.value)
            }
            className="mt-1 block w-full border rounded p-1"
            placeholder="np. 5"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Zaakceptowana?</label>
          <select
            value={filtrZaakceptowane}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setFiltrZaakceptowane(e.target.value)
            }
            className="mt-1 block w-full border rounded p-1"
          >
            <option value="">— dowolnie —</option>
            <option value="true">Tak</option>
            <option value="false">Nie</option>
          </select>
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            Filtruj
          </button>
        </div>
      </form>

      {/* Tabela ofert */}
      {loading && <p>Ładowanie ofert…</p>}
      {error && <p className="text-red-600">Błąd: {error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 border">ID Oferty</th>
                <th className="px-3 py-2 border">ID Piłkarza</th>
                <th className="px-3 py-2 border">ID Klubu</th>
                <th className="px-3 py-2 border">Data złożenia</th>
                <th className="px-3 py-2 border">Zaakceptowana</th>
                <th className="px-3 py-2 border">Opcje</th>
              </tr>
            </thead>
            <tbody>
              {oferty.map((o) => (
                <tr key={o.id_oferty_dla_klubu} className="hover:bg-gray-50">
                  <td className="px-3 py-2 border">{o.id_oferty_dla_klubu}</td>
                  <td className="px-3 py-2 border">{o.id_pilkarza}</td>
                  <td className="px-3 py-2 border">{o.id_klubu}</td>
                  <td className="px-3 py-2 border">{o.data_zlozenia_oferty}</td>
                  <td className="px-3 py-2 border">
                    {o.czy_zaakceptowana ? "Tak" : "Nie"}
                  </td>
                  <td className="px-3 py-2 border space-x-2">
                    <button
                      onClick={() =>
                        router.push(
                          `/oferty-klub-klub/${o.id_oferty_dla_klubu}/edytuj`
                        )
                      }
                      className="text-blue-600 hover:underline"
                    >
                      Edytuj
                    </button>
                    <button
                      onClick={() => handleDelete(o.id_oferty_dla_klubu)}
                      className="text-red-600 hover:underline ml-2"
                    >
                      Usuń
                    </button>
                  </td>
                </tr>
              ))}
              {oferty.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-3 py-2 border text-center text-gray-500"
                  >
                    Brak ofert do wyświetlenia.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
