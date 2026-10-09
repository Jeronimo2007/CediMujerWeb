"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, ChevronDown, Sparkles, ArrowRight, ShieldCheck, Activity, HeartPulse } from "lucide-react";
import { ASSETS } from "@/config/assets";

interface HeroProps {
  onOpenAppointment?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAppointment }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Smooth scroll zoom
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.3]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-16 bg-[#F7F2EC]"
    >
      {/* Background Video / Image with Warm Light Overlay */}
      <motion.div
        style={{ scale: bgScale, y: bgY }}
        className="absolute inset-0 z-0 origin-center w-full h-full"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={ASSETS.hero.fallbackImage}
          className="w-full h-full object-cover filter brightness-95 opacity-40 mix-blend-multiply"
        >
          <source src={ASSETS.hero.videoUrl} type="video/mp4" />
        </video>
        {/* Soft Organic Gradients in Brand Palette (Lino, Arena, Agua, Nude Rosado) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F7F2EC] via-[#F7F2EC]/85 to-[#E6D9C8]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F7F2EC] via-transparent to-[#F7F2EC]/80" />
      </motion.div>

      {/* Floating Animated Organic Blobs (Surprise Effects) */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-10 w-96 h-96 bg-[#CFE6E2]/50 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -30, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-10 w-96 h-96 bg-[#EBCFC6]/50 rounded-full blur-3xl pointer-events-none"
      />

      {/* Hero Main Content */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left flex flex-col justify-center min-h-[calc(100vh-120px)]"
      >
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EBCFC6]/70 border border-[#D7A7A8]/50 text-[#4A3A33] text-xs sm:text-sm font-bold backdrop-blur-md mb-6 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-[#8FC1BB]" />
            <span>Centro Médico de Alta Especialidad en la Mujer</span>
            <span className="w-2 h-2 rounded-full bg-[#8FC1BB] animate-pulse"></span>
          </motion.div>

          {/* Main Headline in Cacao */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#4A3A33] tracking-tight leading-[1.1]"
          >
            Cuidado Médico Integral con{" "}
            <span className="bg-gradient-to-r from-[#8FC1BB] via-[#9A7B6C] to-[#D7A7A8] bg-clip-text text-transparent">
              Empatía y Ciencia
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-lg sm:text-xl text-[#9A7B6C] font-semibold leading-relaxed max-w-2xl"
          >
            En <strong className="text-[#4A3A33] font-bold">CediMujer</strong> combinamos tecnología diagnóstica de última generación con la calidez humana que mereces en cada etapa de tu vida.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 flex flex-wrap items-center justify-center md:justify-start gap-4"
          >
            <button
              onClick={onOpenAppointment}
              className="px-8 py-4 rounded-full text-base font-extrabold text-[#4A3A33] bg-[#8FC1BB] hover:bg-[#8FC1BB]/90 shadow-xl shadow-[#8FC1BB]/30 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 border border-[#8FC1BB]"
            >
              <Calendar className="w-5 h-5 text-[#4A3A33]" />
              <span>Agendar Cita Ahora</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#servicios"
              className="px-8 py-4 rounded-full text-base font-bold text-[#4A3A33] bg-[#E6D9C8] hover:bg-[#EBCFC6] border border-[#9A7B6C]/30 backdrop-blur-md transition-all duration-300 flex items-center gap-2"
            >
              <span>Explorar Servicios</span>
            </a>
          </motion.div>

          {/* Quick Value Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-4 pt-8 border-t border-[#E6D9C8]"
          >
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#EBCFC6]/40 border border-[#D7A7A8]/30">
              <div className="p-2.5 rounded-xl bg-[#8FC1BB] text-[#4A3A33]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs text-[#9A7B6C] uppercase tracking-wider font-semibold">Especialistas</p>
                <p className="text-sm font-bold text-[#4A3A33]">Certificadas</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#CFE6E2]/40 border border-[#8FC1BB]/30">
              <div className="p-2.5 rounded-xl bg-[#8FC1BB] text-[#4A3A33]">
                <Activity className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs text-[#9A7B6C] uppercase tracking-wider font-semibold">Tecnología</p>
                <p className="text-sm font-bold text-[#4A3A33]">Ecografía 3D/4D</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#EBCFC6]/40 border border-[#D7A7A8]/30 col-span-2 sm:col-span-1">
              <div className="p-2.5 rounded-xl bg-[#D7A7A8] text-[#4A3A33]">
                <HeartPulse className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs text-[#9A7B6C] uppercase tracking-wider font-semibold">Atención</p>
                <p className="text-sm font-bold text-[#4A3A33]">Personalizada</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.a
        href="#nosotros"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1, duration: 1 }, y: { repeat: Infinity, duration: 2 } }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 p-2.5 rounded-full bg-[#E6D9C8] border border-[#9A7B6C]/30 text-[#4A3A33] hover:bg-[#8FC1BB] transition-colors shadow-md"
        aria-label="Desplazarse hacia abajo"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.a>
    </section>
  );
};
