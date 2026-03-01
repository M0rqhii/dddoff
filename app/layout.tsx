import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import ScrollAnimator from "@/components/ScrollAnimator";
import CookieConsent from "@/components/CookieConsent";
import { getContent } from "@/lib/content";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "DDDoff - Profesjonalna Dezynsekcja, Deratyzacja i Ozonowanie | Warszawa",
  description: "Profesjonalne usługi dezynsekcji, deratyzacji, dezynfekcji i ozonowania. Stała obsługa firm i klientów indywidualnych. Warszawa i Mazowsze. Dokumentacja SANEPID i HACCP.",
  keywords: "dezynsekcja, deratyzacja, dezynfekcja, ozonowanie, Warszawa, Mazowsze, DDD, SANEPID, HACCP",
  openGraph: {
    title: "DDDoff - Profesjonalna Dezynsekcja, Deratyzacja i Ozonowanie",
    description: "Stała obsługa firm i skuteczne usuwanie problemów sanitarnych. Warszawa i Mazowsze.",
    type: "website",
    locale: "pl_PL",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getContent();

  return (
    <html lang="pl">
      <body className={`${inter.variable} ${montserrat.variable} font-sans antialiased`}>
        {children}
        <CookieConsent data={content.cookieConsent} />
        <ScrollAnimator />
      </body>
    </html>
  );
}
