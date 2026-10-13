"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, ChevronDown, Sparkles, ArrowRight, ShieldCheck, Activity, HeartPulse } from "lucide-react";
import { ASSETS } from "@/config/assets";

interface HeroProps {
  onOpenAppointment?: () => void;
  onOpenCalculator?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAppointment, onOpenCalculator }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // We track scroll progress across a generous 280vh track
  // This provides plenty of scroll distance so the zoom feels gradual, controlled and calm (not sudden or fast)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Pure optical zoom straight into the entrance logo (70% horizontal, 30% vertical)
  // By pinning transformOrigin to "70% 30%" and removing conflicting x/y translations,
  // the camera stays 100% steady on target without shaking, shifting sideways or jumping around!
  const imageScale = useTransform(scrollYProgress, [0, 0.85], [1.0, 1.85]);

  // Gentle rounded corners that form smoothly as you zoom in
  const imageBorderRadius = useTransform(scrollYProgress, [0, 0.3, 0.7, 0.95], ["0px", "28px", "36px", "0px"]);
  const imageInset = useTransform(scrollYProgress, [0, 0.3, 0.7, 0.95], ["0px", "14px", "18px", "0px"]);

  // The hero text card gracefully fades away early in the scroll so the viewer has full clear visibility of the clinic
  const textOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.28], [1, 0.97]);
  const textY = useTransform(scrollYProgress, [0, 0.28], [0, -30]);

  return (
    <div ref={containerRef} className="relative h-[260vh] sm:h-[280vh]">
      {/* Sticky viewport frame */}
      <section
        id="inicio"
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[#F7F2EC]"
      >
        {/* Background Image: Rock-steady zoom anchored directly to the CediMujer logo above the entrance */}
        <motion.div
          style={{
            scale: imageScale,
            transformOrigin: "70% 30%",
            borderRadius: imageBorderRadius,
            top: imageInset,
            bottom: imageInset,
            left: imageInset,
            right: imageInset,
          }}
          className="absolute z-0 overflow-hidden will-change-transform shadow-2xl transition-[border-radius] duration-200"
        >
          <Image
            src={ASSETS.hero.mainImage}
            alt="Instalaciones CediMujer - Centro de Diagnóstico"
            fill
            priority
            unoptimized
            className="object-cover object-center filter brightness-100 contrast-[1.02]"
          />

          {/* Very subtle vignette to retain full photo realism */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#F7F2EC]/50 via-transparent to-[#F7F2EC]/20 pointer-events-none" />
        </motion.div>

        {/* Ambient Glows */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 20, 0],
            y: [0, -15, 0],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-10 w-96 h-96 bg-[#CFE6E2]/25 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{
            scale: [1.15, 1, 1.15],
            x: [0, -20, 0],
            y: [0, 15, 0],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-12 right-10 w-96 h-96 bg-[#EBCFC6]/25 rounded-full blur-3xl pointer-events-none"
        />

        {/* Hero Content - Perfectly Centered & Responsive Card Styling */}
        <motion.div
          style={{ opacity: textOpacity, scale: textScale, y: textY }}
          className="relative z-10 max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center w-full"
        >
          {/* Main Card with clean solid/frosted brand styling in Lino */}
          <div className="w-full max-w-3xl 2xl:max-w-4xl bg-[#F7F2EC]/95 backdrop-blur-md p-6 sm:p-9 2xl:p-12 rounded-3xl border border-[#E6D9C8] shadow-2xl flex flex-col items-center text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EBCFC6] border border-[#D7A7A8] text-[#4A3A33] text-xs sm:text-sm font-bold mb-5 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-[#8FC1BB]" />
              <span className="capitalize">Centro de diagnóstico especializado en salud para la mujer</span>
              <span className="w-2 h-2 rounded-full bg-[#8FC1BB] animate-pulse"></span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-3xl sm:text-5xl lg:text-6xl 2xl:text-7xl font-black text-[#4A3A33] tracking-tight leading-[1.12]"
            >
              Cuidado Médico Integral con{" "}
              <span className="bg-gradient-to-r from-[#8FC1BB] via-[#9A7B6C] to-[#D7A7A8] bg-clip-text text-transparent">
                Empatía y Ciencia
              </span>
            </motion.h1>

            {/* Subtitle with seamless matching background */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-4 text-base sm:text-lg 2xl:text-xl text-[#4A3A33] font-medium leading-relaxed max-w-2xl 2xl:max-w-3xl"
            >
              En <strong className="text-[#4A3A33] font-black">CediMujer</strong> combinamos tecnología diagnóstica de última generación con la calidez humana que mereces en cada etapa de tu vida.
            </motion.p>

            {/* Action CTAs Centered */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full"
            >
              <button
                onClick={onOpenAppointment}
                className="px-7 py-3.5 2xl:px-8 2xl:py-4 rounded-full text-sm sm:text-base 2xl:text-lg font-extrabold text-[#4A3A33] bg-[#8FC1BB] hover:bg-[#8FC1BB]/90 shadow-xl shadow-[#8FC1BB]/30 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2.5 border border-[#8FC1BB]"
              >
                <Calendar className="w-5 h-5 text-[#4A3A33]" />
                <span>Agendar Cita</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {onOpenCalculator && (
                <button
                  onClick={onOpenCalculator}
                  className="px-6 py-3.5 2xl:px-7 2xl:py-4 rounded-full text-sm sm:text-base 2xl:text-lg font-extrabold text-[#4A3A33] bg-[#EBCFC6] hover:bg-[#D7A7A8] border border-[#D7A7A8] shadow-md hover:scale-105 transition-all duration-300 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#8FC1BB]" />
                  <span>Calculadora Gestacional</span>
                </button>
              )}

              <a
                href="#servicios"
                className="px-6 py-3.5 2xl:px-7 2xl:py-4 rounded-full text-sm sm:text-base 2xl:text-lg font-bold text-[#4A3A33] bg-[#E6D9C8] hover:bg-[#EBCFC6] border border-[#9A7B6C]/30 transition-all duration-300 flex items-center gap-2"
              >
                <span>Servicios</span>
              </a>
            </motion.div>

            {/* Quick Value Cards Centered & Harmonized */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full pt-5 border-t border-[#E6D9C8]"
            >
              <div className="flex items-center justify-center sm:justify-start gap-2.5 p-3 rounded-2xl bg-[#E6D9C8]/40 border border-[#E6D9C8]">
                <div className="p-2 rounded-xl bg-[#8FC1BB] text-[#4A3A33]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] 2xl:text-xs text-[#9A7B6C] uppercase tracking-wider font-bold">Especialistas</p>
                  <p className="text-xs sm:text-sm 2xl:text-base font-bold text-[#4A3A33]">Certificadas</p>
                </div>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-2.5 p-3 rounded-2xl bg-[#CFE6E2]/40 border border-[#8FC1BB]/30">
                <div className="p-2 rounded-xl bg-[#8FC1BB] text-[#4A3A33]">
                  <Activity className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] 2xl:text-xs text-[#9A7B6C] uppercase tracking-wider font-bold">Tecnología</p>
                  <p className="text-xs sm:text-sm 2xl:text-base font-bold text-[#4A3A33]">Ecografía 3D/4D</p>
                </div>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-2.5 p-3 rounded-2xl bg-[#EBCFC6]/40 border border-[#D7A7A8]/40">
                <div className="p-2 rounded-xl bg-[#D7A7A8] text-[#4A3A33]">
                  <HeartPulse className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] 2xl:text-xs text-[#9A7B6C] uppercase tracking-wider font-bold">Atención</p>
                  <p className="text-xs sm:text-sm 2xl:text-base font-bold text-[#4A3A33]">Personalizada</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll invitation */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 pointer-events-none"
        >
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#4A3A33] bg-[#E6D9C8]/90 px-3.5 py-1 rounded-full shadow-sm border border-[#9A7B6C]/20">
            Desplaza hacia abajo para ingresar a la clínica
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="p-2 rounded-full bg-[#E6D9C8] border border-[#9A7B6C]/30 text-[#4A3A33] shadow-md"
          >
            <ChevronDown className="w-5 h-5 text-[#8FC1BB]" />
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};
