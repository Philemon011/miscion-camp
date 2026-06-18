import type { Metadata } from "next";
import { gilroy, anton } from "./fonts";
import Navbar from "@/components/Navbar";
import "./globals.css";

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
  metadataBase: new URL("https://miscion-camp.vercel.app"),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://miscion-camp.vercel.app",
    siteName: "MISCION CAMP 2026",
    title: "MISCION CAMP 2026 — Les Aigles de la Nouvelle Saison",
    description:
      "Du 03 au 08 août 2026 à Cotonou. Rejoins des centaines de jeunes pour 6 jours d'expérience spirituelle, de connexion et de transformation.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MISCION CAMP 2026 — Les Aigles de la Nouvelle Saison",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MISCION CAMP 2026 — Les Aigles de la Nouvelle Saison",
    description:
      "Du 03 au 08 août 2026 à Cotonou. 6 jours pour t'élever au-dessus de tout ce qui t'a retenu.",
    images: ["/og-image.jpg"],
  },


  icons: {
  icon: [
    { url: "/favicon.ico" },
    { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
  ],
  apple: [
    { url: "/apple-touch-icon.png", sizes: "180x180" },
  ],
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