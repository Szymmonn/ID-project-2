// frontend/src/app/pilkarze-pozycja/[idPilkarza]/usun/page.tsx
"use client";

import { useRouter, useSearchParams, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PilkarzPozycjaUsunPage() {
  const router = useRouter();
  const params = useParams();             // { idPilkarza: "123" }
  const searchParams = useSearchParams(); // grab ?id_pozycja=…

  const idPilkarza = Number(params?.idPilkarza);
  const idPozycjiParam = searchParams?.get("id_pozycja");
  const idPozycji = idPozycjiParam ? Number(idPozycjiParam) : null;

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (idPilkarza && idPozycji !== null) {
      const url = `/api/pilkarz_pozycja/?id_pilkarza=${idPilkarza}&id_pozycja=${idPozycji}`;
      fetch(url, { method: "DELETE" })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
          }
          router.push("/pilkarze-pozycja");
        })
        .catch((err) => {
          console.error("Błąd usuwania relacji:", err);
          setError("Nie udało się usunąć relacji. Spróbuj ponownie.");
        });
    } else {
      setError("Brak ID piłkarza lub ID pozycji w parametrze URL.");
    }
  }, [idPilkarza, idPozycji, router]);

  if (error) {
    return (
      <div>
        <h1>Błąd</h1>
        <p style={{ color: "red" }}>{error}</p>
        <button onClick={() => router.push("/pilkarze-pozycja")}>
          Powrót do listy
        </button>
      </div>
    );
  }

  return <p>Usuwanie relacji piłkarz→pozycja…</p>;
}
