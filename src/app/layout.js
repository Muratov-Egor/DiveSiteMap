import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DiveSitesProvider } from "./context/DiveSitesContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dive sites map",
  description: "Карта дайв-сайтов для планирования погружений",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-screen h-screen`}
      >
        <DiveSitesProvider>
          {children}
        </DiveSitesProvider>
      </body>
    </html>
  );
}
