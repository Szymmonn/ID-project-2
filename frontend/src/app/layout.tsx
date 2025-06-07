// frontend/src/app/layout.tsx
import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Football Transfers Dashboard",
  description: "Prosty frontend do edycji danych z bazy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body>
        {/* Prosta nawigacja */}
        <nav
          style={{
            padding: "1rem",
            backgroundColor: "#f5f5f5",
            color: "#000",
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <Link href="/pilkarze">Piłkarze</Link>
          <Link href="/pozycje">Pozycje</Link>
          <Link href="/kluby">Kluby</Link>
          <Link href="/agenci">Agenci</Link>
          <Link href="/sponsorzy">Sponsorzy</Link>
          <Link href="/trasferroom-sprzedaz">Transferroom – Sprzedaż</Link>
          <Link href="/transferroom-poszukiwania">Transferroom – Poszukiwania</Link>
          <Link href="/ligi">Ligi</Link>
          <Link href="/sezony">Sezony</Link>
          <Link href="/stadiony">Stadiony</Link>
          <Link href="/kluby-budzet">Kluby – Budżet</Link>
          <Link href="/historia-klub-liga">Historia Klub–Liga</Link>
          <Link href="/historia-klub-sponsor">Historia Klub–Sponsor</Link>
          <Link href="/oferty-klub-klub">Oferty Klub→Klub</Link>
          <Link href="/oferty-klub-pilkarz">Oferty Klub→Piłkarz</Link>
          <Link href="/pilkarze-pozycja">Pilkarze→Pozycje</Link>
          <Link href="/mecze">Mecze</Link>
          <Link href="/słowniki">Słowniki (np. zalety / wady)</Link>
          <Link href="/skauci">Skauci</Link>
          <Link href="/historia-skauci-kluby">Historia Skauci–Kluby</Link>
          <Link href="/skaut-raport">Skaut Raport</Link>
          <Link href="/raporty">Raporty</Link>
          <Link href="/licencje">Licencje</Link>
          <Link href="/managerzy">Managerzy</Link>
          <Link href="/oferty-managerow">Oferty Managerów</Link>
          <Link href="/kraje">Kraje</Link>
        </nav>

        <main style={{ padding: "1rem" }}>{children}</main>
      </body>
    </html>
  );
}
