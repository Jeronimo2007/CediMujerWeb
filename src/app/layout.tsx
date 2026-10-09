import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CediMujer | Centro de Salud Integral & Diagnóstico de la Mujer",
  description: "Centro médico especializado en ginecología, obstetricia, ecografía 3D/4D HD y salud integral femenina con tecnología avanzada y trato humano.",
  keywords: ["CediMujer", "Ginecología", "Obstetricia", "Ecografía 4D", "Salud Femenina", "Centro Médico Mujer"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased bg-slate-950 text-slate-100 selection:bg-teal-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
