// frontend/src/app/historia-klub-liga/[idKlubu]/[idLigi]/[idSezonu]/usun/page.tsx
"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function HistoriaKlubLigaUsunPage() {
  const router = useRouter();
  const params = useParams();
  // params = { idKlubu: "123", idLigi: "45", idSezonu: "2024" }
  const idKlubu = Number(params?.idKlubu);
  const idLigi = Number(params?.idLigi);
  const idSezonu = Number(params?.idSezonu);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Budujemy URL z query params, bo API DELETE przyjmuje query:
    const url = `/api/historia_klub_liga/?id_klubu=${idKlubu}&id_ligi=${idLigi}&id_sezonu=${idSezonu}`;
    fetch(url, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        router.push("/historia-klub-liga");
      })
      .catch((err) => {
        console.error("Błąd usuwania wpisu historii:", err);
        setError("Nie udało się usunąć wpisu historii. Spróbuj ponownie.");
      });
  }, [idKlubu, idLigi, idSezonu, router]);

  if (error) {
    return (
      <div>
        <h1>Błąd</h1>
        <p style={{ color: "red" }}>{error}</p>
        <button onClick={() => router.push("/historia-klub-liga")}>
          Powrót do listy
        </button>
      </div>
    );
  }

  return <p>Usuwanie wpisu historii…</p>;
}
