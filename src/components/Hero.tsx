"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Calendar,
  ChevronDown,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Activity,
  HeartPulse,
  MapPin,
  Eye,
} from "lucide-react";
import { ASSETS } from "@/config/assets";

interface HeroProps {
  onOpenAppointment?: () => void;
  onOpenCalculator?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAppointment, onOpenCalculator }) => {
  const containerRef = useRef<HTMLElement>(null);
  const [peekClinic, setPeekClinic] = useState(false);

  // Bounded, device-stable scroll parallax across the Hero section (no sticky scroll-trap or distortion)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Gentle vertical parallax movement instead of unstable optical zoom
  const bgParallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const bgOverlayOpacity = useTransform(scrollYProgress, [0, 0.85], [0.15, 0.55]);

  return (
    <section
      ref={containerRef}
      id="inicio"
      className="relative min-h-[100svh] w-full flex flex-col justify-between overflow-hidden bg-[#F7F2EC] pt-[76px] sm:pt-24 lg:pt-28 pb-6 sm:pb-10"
    >
      {/* Framed Architectural Background Image with Stable Parallax & Gentle Ambient Drift */}
      <div className="absolute inset-2 sm:inset-4 md:inset-6 z-0 rounded-3xl overflow-hidden shadow-2xl border border-[#E6D9C8] bg-[#4A3A33]">
        <motion.div
          style={{ y: bgParallaxY }}
          animate={{
            scale: [1.04, 1.08, 1.04],
            x: ["0%", "-1.2%", "0.8%", "0%"],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-full h-[112%] -top-[6%] will-change-transform [transform:translateZ(0)]"
        >
          <Image
            src={ASSETS.hero.mainImage}
            alt="Instalaciones CediMujer - Centro de Diagnóstico"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[68%_center] sm:object-center filter brightness-[0.98] contrast-[1.03]"
          />
        </motion.div>

        {/* Soft Ambient Light Sweep Across the Image (Zero layout shift, works on all devices) */}
        <motion.div
          animate={{
            opacity: [0.15, 0.32, 0.15],
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-tr from-[#4A3A33]/35 via-transparent to-[#CFE6E2]/25 pointer-events-none"
        />

        {/* Progressive Scroll Veil */}
        <motion.div
          style={{ opacity: bgOverlayOpacity }}
          className="absolute inset-0 bg-[#4A3A33] pointer-events-none"
        />

        {/* Subtle Top & Bottom Framing Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#4A3A33]/50 via-transparent to-[#F7F2EC]/25 pointer-events-none" />
      </div>

      {/* Top Spacer for Vertical Balance on Tall Screens */}
      <div className="hidden sm:block" aria-hidden="true" />

      {/* Main Hero Content Container */}
      <div className="relative z-10 max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-auto w-full flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{
            opacity: peekClinic ? 0.12 : 1,
            scale: peekClinic ? 0.98 : 1,
            y: 0,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-3xl 2xl:max-w-4xl bg-[#F7F2EC]/95 backdrop-blur-md rounded-3xl border border-[#E6D9C8] shadow-2xl overflow-hidden flex flex-col items-center text-center"
        >
          {/* Mobile Panoramic Header Showcase (Displays the full uncropped clinic entrance on phones) */}
          <div className="relative w-full h-36 sm:h-44 md:hidden overflow-hidden border-b border-[#E6D9C8] bg-[#4A3A33]">
            <motion.div
              animate={{
                scale: [1.03, 1.08, 1.03],
                x: ["-1%", "1.5%", "-1%"],
              }}
              transition={{
                duration: 16,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-full h-full will-change-transform"
            >
              <Image
                src={ASSETS.hero.mainImage}
                alt="Recepción Principal CediMujer"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#4A3A33]/75 via-[#4A3A33]/15 to-transparent pointer-events-none" />

            {/* Overlaid Location & Speciality Pill on the Mobile Image Showcase */}
            <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between gap-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F7F2EC]/95 text-[#4A3A33] text-[11px] font-bold shadow-sm border border-[#E6D9C8] min-w-0">
                <Sparkles className="w-3 h-3 text-[#8FC1BB] shrink-0" />
                <span className="truncate">Salud Integral de la Mujer</span>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#4A3A33]/90 text-[#F7F2EC] text-[10px] font-semibold shrink-0">
                <MapPin className="w-2.5 h-2.5 text-[#8FC1BB]" />
                Sabaneta
              </span>
            </div>
          </div>

          {/* Card Body */}
          <div className="w-full p-4 sm:p-7 lg:p-9 2xl:p-11 flex flex-col items-center text-center">
            {/* Badge (Tablet & Desktop) */}
            <div className="hidden md:inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EBCFC6] border border-[#D7A7A8] text-[#4A3A33] text-xs sm:text-sm font-bold mb-4 shadow-sm">
              <Sparkles className="w-4 h-4 text-[#8FC1BB] shrink-0" />
              <span>Centro de Diagnóstico Especializado en Salud para la Mujer</span>
              <span className="w-2 h-2 rounded-full bg-[#8FC1BB] animate-pulse shrink-0" />
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-black text-[#4A3A33] tracking-tight leading-[1.14]">
              Cuidado Médico Integral con{" "}
              <span className="bg-gradient-to-r from-[#8FC1BB] via-[#9A7B6C] to-[#D7A7A8] bg-clip-text text-transparent">
                Empatía y Ciencia
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-2.5 sm:mt-4 text-xs sm:text-base lg:text-lg text-[#4A3A33]/90 font-medium leading-relaxed max-w-2xl">
              En <strong className="text-[#4A3A33] font-black">CediMujer</strong> combinamos tecnología diagnóstica de última generación con la calidez humana que mereces en cada etapa de tu vida.
            </p>

            {/* Action CTAs */}
            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-2.5 sm:gap-3.5 w-full">
              <button
                onClick={onOpenAppointment}
                className="w-full sm:w-auto justify-center px-6 py-3 sm:px-7 sm:py-3.5 rounded-2xl sm:rounded-full text-xs sm:text-base font-extrabold text-[#4A3A33] bg-[#8FC1BB] hover:bg-[#8FC1BB]/90 shadow-lg shadow-[#8FC1BB]/30 hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center gap-2 border border-[#8FC1BB]"
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#4A3A33]" />
                <span>Agendar Cita</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-2 sm:flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto">
                {onOpenCalculator && (
                  <button
                    onClick={onOpenCalculator}
                    className="justify-center px-3.5 py-2.5 sm:px-5 sm:py-3.5 rounded-xl sm:rounded-full text-xs sm:text-base font-extrabold text-[#4A3A33] bg-[#EBCFC6] hover:bg-[#D7A7A8] border border-[#D7A7A8] shadow-sm hover:scale-[1.02] transition-all duration-300 flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8FC1BB] shrink-0" />
                    <span className="truncate">Calculadora</span>
                  </button>
                )}

                <a
                  href="#servicios"
                  className="justify-center px-3.5 py-2.5 sm:px-5 sm:py-3.5 rounded-xl sm:rounded-full text-xs sm:text-base font-bold text-[#4A3A33] bg-[#E6D9C8] hover:bg-[#EBCFC6] border border-[#9A7B6C]/30 transition-all duration-300 flex items-center gap-1.5"
                >
                  <span>Servicios</span>
                </a>
              </div>
            </div>

            {/* Quick Value Cards (3 Columns on Mobile & Desktop for Compact Harmony) */}
            <div className="mt-4 sm:mt-6 grid grid-cols-3 gap-2 sm:gap-3 w-full pt-3.5 sm:pt-5 border-t border-[#E6D9C8]">
              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1.5 sm:gap-2.5 p-2 sm:p-3 rounded-2xl bg-[#E6D9C8]/45 border border-[#E6D9C8]">
                <div className="p-1.5 sm:p-2 rounded-xl bg-[#8FC1BB] text-[#4A3A33] shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-[9px] sm:text-[10px] text-[#9A7B6C] uppercase tracking-wider font-bold">
                    Especialistas
                  </p>
                  <p className="text-[11px] sm:text-sm font-bold text-[#4A3A33] leading-tight">
                    Certificadas
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1.5 sm:gap-2.5 p-2 sm:p-3 rounded-2xl bg-[#CFE6E2]/45 border border-[#8FC1BB]/30">
                <div className="p-1.5 sm:p-2 rounded-xl bg-[#8FC1BB] text-[#4A3A33] shrink-0">
                  <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-[9px] sm:text-[10px] text-[#9A7B6C] uppercase tracking-wider font-bold">
                    Tecnología
                  </p>
                  <p className="text-[11px] sm:text-sm font-bold text-[#4A3A33] leading-tight">
                    Ecografía 3D/4D
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1.5 sm:gap-2.5 p-2 sm:p-3 rounded-2xl bg-[#EBCFC6]/45 border border-[#D7A7A8]/40">
                <div className="p-1.5 sm:p-2 rounded-xl bg-[#D7A7A8] text-[#4A3A33] shrink-0">
                  <HeartPulse className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-[9px] sm:text-[10px] text-[#9A7B6C] uppercase tracking-wider font-bold">
                    Atención
                  </p>
                  <p className="text-[11px] sm:text-sm font-bold text-[#4A3A33] leading-tight">
                    Personalizada
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar: Scroll Invitation + Optional Clinic View Toggle on Desktop */}
      <div className="relative z-20 mt-4 sm:mt-6 px-4 flex items-center justify-center gap-3">
        <a
          href="#certificaciones"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F7F2EC]/95 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-[#4A3A33] shadow-md border border-[#E6D9C8] hover:border-[#8FC1BB] transition-colors"
        >
          <span>Conoce nuestras instalaciones</span>
          <motion.span
            animate={{ y: [0, 3, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="inline-flex text-[#8FC1BB]"
          >
            <ChevronDown className="w-4 h-4" />
          </motion.span>
        </a>

        <button
          type="button"
          onMouseEnter={() => setPeekClinic(true)}
          onMouseLeave={() => setPeekClinic(false)}
          onClick={() => setPeekClinic((prev) => !prev)}
          className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#4A3A33]/85 hover:bg-[#4A3A33] text-[#F7F2EC] text-[11px] font-semibold shadow-md border border-[#E6D9C8]/30 transition-all"
          title="Ver imagen de recepción completa"
        >
          <Eye className="w-3.5 h-3.5 text-[#8FC1BB]" />
          <span>{peekClinic ? "Mostrar Tarjeta" : "Ver Recepción"}</span>
        </button>
      </div>
    </section>
  );
};
