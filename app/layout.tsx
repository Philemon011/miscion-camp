import { gilroy, anton } from "./fonts";
import Navbar from "@/components/Navbar";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${gilroy.variable} ${anton.variable}`}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}