import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "CediMujer | Centro de Salud Integral & Diagnóstico de la Mujer",
  description: "Centro médico especializado en ginecología, obstetricia, ecografía 3D/4D HD y salud integral femenina con tecnología avanzada y trato humano.",
  keywords: ["CediMujer", "Ginecología", "Obstetricia", "Ecografía 4D", "Salud Femenina", "Centro Médico Mujer"],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${montserrat.variable} ${playfair.variable}`}>
      <body className="antialiased bg-[#F7F2EC] text-[#4A3A33] selection:bg-[#8FC1BB] selection:text-[#4A3A33] font-sans">
        {children}
      </body>
    </html>
  );
}
