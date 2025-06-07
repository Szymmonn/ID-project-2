// frontend/src/app/kluby-budzet/[idKlubu]/[data]/usun/page.tsx
"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function KlubBudzetUsunPage() {
  const router = useRouter();
  const params = useParams(); 
  // params będzie mieć kształt { idKlubu: "123", data: "2025-05-20" }

  const idKlubu = Number(params?.idKlubu);
  const dataDof = params?.data; // ciąg w formacie "YYYY-MM-DD"

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (Number.isInteger(idKlubu) && dataDof) {
      // Budujemy URL z query params do endpointu
      const url = `/api/kluby_budzet/?id_klubu=${idKlubu}&data_dofinansowania=${dataDof}`;
      fetch(url, { method: "DELETE" })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
          }
          // Po usunięciu wracamy na listę
          router.push("/kluby-budzet");
        })
        .catch((err) => {
          console.error("Błąd usuwania wpisu budżetu:", err);
          setError("Nie udało się usunąć wpisu budżetu. Spróbuj ponownie.");
        });
    } else {
      setError(
        "Brak poprawnych parametrów w ścieżce. Musi być /kluby-budzet/[idKlubu]/[data]/usun"
      );
    }
  }, [idKlubu, dataDof, router]);

  if (error) {
    return (
      <div>
        <h1>Błąd</h1>
        <p style={{ color: "red" }}>{error}</p>
        <button onClick={() => router.push("/kluby-budzet")}>
          Powrót do listy budżetu
        </button>
      </div>
    );
  }

  return <p>Usuwanie wpisu budżetu…</p>;
}
