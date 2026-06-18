import { gilroy, anton } from "./fonts";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${gilroy.variable} ${anton.variable}`}>
      <body>{children}</body>
    </html>
  );
}