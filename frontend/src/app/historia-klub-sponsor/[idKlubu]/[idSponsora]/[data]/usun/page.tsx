// frontend/src/app/historia-klub-sponsor/[idKlubu]/[idSponsora]/[data]/usun/page.tsx
"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function HistoriaKlubSponsorUsunPage() {
  const router = useRouter();
  const params = useParams();
  // params = { idKlubu: "123", idSponsora: "45", data: "2025-05-20" }
  const idKlubu = Number(params?.idKlubu);
  const idSponsora = Number(params?.idSponsora);
  const dataZawarcia = params?.data; // "YYYY-MM-DD"

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const url = `/api/historia_klub_sponsor/?id_klubu=${idKlubu}&id_sponsora=${idSponsora}&data_zawarcia_wspolpracy=${dataZawarcia}`;
    fetch(url, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        router.push("/historia-klub-sponsor");
      })
      .catch((err) => {
        console.error("Błąd usuwania wpisu historia klub→sponsor:", err);
        setError("Nie udało się usunąć wpisu historii. Spróbuj ponownie.");
      });
  }, [idKlubu, idSponsora, dataZawarcia, router]);

  if (error) {
    return (
      <div>
        <h1>Błąd</h1>
        <p style={{ color: "red" }}>{error}</p>
        <button onClick={() => router.push("/historia-klub-sponsor")}>
          Powrót do listy
        </button>
      </div>
    );
  }

  return <p>Usuwanie wpisu historii klub→sponsor…</p>;
}
