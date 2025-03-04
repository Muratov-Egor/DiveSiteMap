import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { DiveSitesProvider } from "./context/DiveSitesContext";

const robotoSans = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Dive sites map",
  description: "Карта дайв-сайтов для планирования погружений",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${robotoSans.variable} ${robotoMono.variable} antialiased w-screen h-screen`}
      >
        <DiveSitesProvider>
          {children}
        </DiveSitesProvider>
      </body>
    </html>
  );
}