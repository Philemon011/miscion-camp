import type { Metadata } from "next";
import { gilroy, anton } from "./fonts";
import Navbar from "@/components/Navbar";
import "./globals.css";

const BASE_URL = "https://miscion-camp.vercel.app";

export const metadata: Metadata = {
  title: "MISCION CAMP 2026 — Les Aigles de la Nouvelle Saison",
  description:
    "Rejoins le MISCION CAMP 2026 du 03 au 08 août à Cotonou. 6 jours pour t'élever, te connecter et vivre une expérience qui va marquer ta saison.",
  keywords: [
    "MISCION CAMP",
    "camp jeunesse chrétien",
    "Cotonou",
    "Bénin",
    "conférence jeunesse",
    "Les Aigles de la Nouvelle Saison",
    "camp 2026",
  ],
  authors: [{ name: "MISCION" }],
  creator: "MISCION",
  metadataBase: new URL(BASE_URL),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: BASE_URL,
    siteName: "MISCION CAMP 2026",
    title: "MISCION CAMP 2026 — Les Aigles de la Nouvelle Saison",
    description:
      "Du 03 au 08 août 2026 à Cotonou. Rejoins des centaines de jeunes pour 6 jours d'expérience spirituelle, de connexion et de transformation.",
    images: [
      {
        url: `${BASE_URL}/og-image.jpg`,
        secureUrl: `${BASE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "MISCION CAMP 2026 — Les Aigles de la Nouvelle Saison",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MISCION CAMP 2026 — Les Aigles de la Nouvelle Saison",
    description:
      "Du 03 au 08 août 2026 à Cotonou. 6 jours pour t'élever au-dessus de tout ce qui t'a retenu.",
    images: [`${BASE_URL}/og-image.jpg`],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${gilroy.variable} ${anton.variable}`}>
      <body className="overflow-x-hidden">
        <Navbar />
        {children}
      </body>
    </html>
  );
}