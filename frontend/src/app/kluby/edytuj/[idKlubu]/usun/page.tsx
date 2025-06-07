"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { deleteOne } from "@/api";

export default function KlubyUsunPage() {
  const router = useRouter();
  const params = useParams(); // { idKlubu: "123" }
  const idKlubu = Number(params?.idKlubu);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!idKlubu) {
      setError("Brak ID klubu w URL.");
      return;
    }

    // natychmiastowe usunięcie
    deleteOne("kluby", idKlubu)
      .then(() => {
        router.push("/kluby");
      })
      .catch((err) => {
        console.error("Błąd usuwania klubu:", err);
        setError("Nie udało się usunąć klubu. Spróbuj ponownie.");
      });
  }, [idKlubu, router]);

  if (error) {
    return (
      <div>
        <h1>Błąd</h1>
        <p style={{ color: "red" }}>{error}</p>
        <button onClick={() => router.push("/kluby")} style={{ marginTop: "1rem" }}>
          Powrót do listy klubów
        </button>
      </div>
    );
  }

  return <p>Usuwanie klubu…</p>;
}
