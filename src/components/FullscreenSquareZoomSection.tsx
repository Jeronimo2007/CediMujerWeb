"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, Activity, ShieldCheck, Heart, ArrowRight, Award } from "lucide-react";

export const FullscreenSquareZoomSection: React.FC<{ onOpenAppointment?: () => void }> = ({
  onOpenAppointment,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 1. Clean Upright Square Expansion (No Rotation)
  // Box starts at scale 0.55 and expands smoothly to fill the screen (scale 1.1)
  const squareScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.55, 1.0, 1.1]);
  const squareRadius = useTransform(scrollYProgress, [0, 0.5, 1], ["32px", "0px", "0px"]);

  // 2. Full Page Color Morphing: Transitioning background colors as the square expands!
  const pageBgColor = useTransform(
    scrollYProgress,
    [0, 0.35, 0.7, 1],
    ["#020617", "#042f2e", "#064e3b", "#1e1b4b"]
  );

  // 3. Content Zooming: Text stays large, bold, centered, and 100% legible
  const contentScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.0, 1.05]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0.4, 1.0, 1.0, 0.9]);

  return (
    <div ref={containerRef} className="relative h-[220vh] bg-slate-950">
      {/* Sticky Fullscreen Track */}
      <motion.div
        style={{ backgroundColor: pageBgColor }}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center transition-colors duration-500"
      >
        {/* Dynamic Expanding Upright Square Portal Container */}
        <motion.div
          style={{
            scale: squareScale,
            borderRadius: squareRadius,
          }}
          className="relative w-full max-w-[1280px] h-[85vh] border-2 border-teal-400/40 shadow-2xl flex items-center justify-center p-6 sm:p-12 overflow-hidden bg-slate-900/90 backdrop-blur-xl origin-center"
        >
          {/* Internal Radiant Glow Lines */}
          <div className="absolute inset-0 bg-[radial-gradient(#2dd4bf_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-teal-500/30 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-500/30 rounded-full blur-[100px] pointer-events-none" />

          {/* Glowing Border Accents on the Growing Square */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-300" />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-300" />

          {/* Content Zooming Into Focus Inside the Square */}
          <motion.div
            style={{ scale: contentScale, opacity: contentOpacity }}
            className="relative z-10 text-center max-w-4xl mx-auto space-y-6 sm:space-y-8 flex flex-col items-center justify-center origin-center"
          >
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-300 text-xs sm:text-sm font-bold uppercase tracking-widest backdrop-blur-md shadow-lg">
              <Sparkles className="w-4 h-4 text-teal-400 animate-spin-slow" />
              <span>Portal de Innovación Médica Femenina</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] drop-shadow-lg">
              Transformando la Salud de la Mujer con{" "}
              <span className="bg-gradient-to-r from-teal-300 via-emerald-300 to-amber-300 bg-clip-text text-transparent">
                Tecnología y Calidez
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-slate-200 text-base sm:text-xl font-normal leading-relaxed max-w-2xl drop-shadow-sm">
              Al desplazarte hacia abajo, el portal geométrico se expande para transformar los colores de la pantalla y revelar nuestro estándar de atención clínica de vanguardia.
            </p>

            {/* 4 Feature Cards Inside the Expanding Square */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full pt-4">
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-teal-500/30 text-center space-y-2">
                <Activity className="w-6 h-6 text-teal-400 mx-auto" />
                <h4 className="text-sm font-bold text-white">Ecografía HD 4D</h4>
                <p className="text-[11px] text-slate-400">Imágenes ultra nítidas</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/30 text-center space-y-2">
                <ShieldCheck className="w-6 h-6 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-white">Certificación ISO</h4>
                <p className="text-[11px] text-slate-400">Calidad garantizada</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-rose-500/30 text-center space-y-2">
                <Heart className="w-6 h-6 text-rose-400 mx-auto" />
                <h4 className="text-sm font-bold text-white">Trato Empático</h4>
                <p className="text-[11px] text-slate-400">Atención sin prisas</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/30 text-center space-y-2">
                <Award className="w-6 h-6 text-amber-400 mx-auto" />
                <h4 className="text-sm font-bold text-white">18+ Años</h4>
                <p className="text-[11px] text-slate-400">Líderes clínicas</p>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={onOpenAppointment}
              className="mt-4 px-8 py-4 rounded-full text-sm sm:text-base font-extrabold text-slate-950 bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-300 hover:from-teal-300 hover:to-emerald-300 shadow-xl shadow-teal-500/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3"
            >
              <span>Conoce Más & Agenda Tu Cita</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};
