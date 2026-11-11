"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ASSETS } from "@/config/assets";

interface HeroProps {
  onOpenAppointment?: () => void;
  onOpenCalculator?: () => void;
}

const HERO_SLIDES = [
  {
    id: "maternidad",
    src: "/assets/images/unsplash-maternidad.jpg",
    alt: "Te acompañamos en cada etapa de la vida · CediMujer",
  },
  {
    id: "principal",
    src: ASSETS.hero.mainImage,
    alt: "CediMujer · Salud Integral para la Mujer",
  },
  {
    id: "ecografia",
    src: "/assets/images/trabajo.jpg",
    alt: "Calidez Humana y Tecnología Diagnóstica en CediMujer",
  },
  {
    id: "bebe",
    src: "/assets/images/unsplash-bebe.jpg",
    alt: "Bienestar Fetal y Ecografía 3D/4D HD Live",
  },
];

export const Hero: React.FC<HeroProps> = ({
  onOpenAppointment,
  onOpenCalculator,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="inicio"
      className="relative min-h-[100svh] w-full flex flex-col justify-between overflow-hidden bg-[#3B2825] pt-24 sm:pt-32 pb-12 sm:pb-16"
    >
      {/* Full-Bleed Editorial Background Image */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={HERO_SLIDES[activeSlide].id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="relative w-full h-full"
          >
            <Image
              src={HERO_SLIDES[activeSlide].src}
              alt={HERO_SLIDES[activeSlide].alt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center brightness-[0.88] contrast-[1.02]"
            />
          </motion.div>
        </AnimatePresence>

        {/* Warm Pastel Rose & Cacao Scrim aligned with Línea Gráfica CediMujer */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#4A3A33]/85 via-[#4A3A33]/55 to-[#4A3A33]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#4A3A33]/80 via-transparent to-[#4A3A33]/35" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#EBCFC6]/25 [filter:blur(90px)] pointer-events-none" />
      </div>

      {/* Main Minimalist Editorial Content (Inspired by Reference Layout) */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full my-auto pt-8 sm:pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-4xl"
        >
          {/* Editorial Headline */}
          <h1 className="text-[#F7F6F4] tracking-tight leading-[1.04] select-none">
            <span className="block font-sans font-light text-[2.35rem] sm:text-6xl md:text-7xl lg:text-[5.25rem]">
              Te acompañamos
            </span>
            <span className="block font-sans font-light text-[2.35rem] sm:text-6xl md:text-7xl lg:text-[5.25rem] mt-0.5 sm:mt-1">
              en cada etapa
            </span>
            <span className="block font-serif italic font-normal text-[#EBCFC6] text-[2.65rem] sm:text-[4.25rem] md:text-[5rem] lg:text-[5.65rem] mt-0.5 sm:mt-1">
              de la vida
            </span>
          </h1>

          {/* Offset Minimalist Subcopy & Bracketed CTA (Matches Reference Composition) */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: "easeOut" }}
            className="mt-8 sm:mt-12 sm:ml-24 md:ml-44 lg:ml-56 max-w-sm sm:max-w-md space-y-6"
          >
            <p className="text-xs sm:text-sm md:text-[15px] text-[#F7F6F4]/90 font-light leading-relaxed font-sans">
              En CediMujer combinamos tecnología diagnóstica de última generación con la calidez humana que mereces en cada etapa de tu vida.
            </p>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1">
              <button
                type="button"
                onClick={onOpenAppointment}
                className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium tracking-wider text-[#F7F6F4] hover:text-[#EBCFC6] transition-all duration-300"
              >
                <span className="text-[#D7A7A8] group-hover:-translate-x-0.5 transition-transform">
                  (
                </span>
                <span className="border-b border-transparent group-hover:border-[#EBCFC6] pb-0.5">
                  Agendar Cita
                </span>
                <span className="text-[#D7A7A8] group-hover:translate-x-0.5 transition-transform">
                  )
                </span>
              </button>

              {onOpenCalculator && (
                <button
                  type="button"
                  onClick={onOpenCalculator}
                  className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-normal tracking-wider text-[#EBCFC6]/90 hover:text-[#F7F6F4] transition-all duration-300"
                >
                  <span className="text-[#D7A7A8]/85 group-hover:-translate-x-0.5 transition-transform">
                    (
                  </span>
                  <span>Calculadora Gestacional</span>
                  <span className="text-[#D7A7A8]/85 group-hover:translate-x-0.5 transition-transform">
                    )
                  </span>
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle Bottom Indicator */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full flex items-center justify-between text-[10px] sm:text-xs text-[#F7F6F4]/70 font-light tracking-widest uppercase">
        <span>C.C. Aves María · Sabaneta</span>

        <div className="flex items-center gap-2">
          {HERO_SLIDES.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveSlide(idx)}
              aria-label={`Ver imagen ${idx + 1}`}
              className={`h-1 rounded-full transition-all duration-300 ${
                activeSlide === idx
                  ? "w-6 bg-[#EBCFC6]"
                  : "w-1.5 bg-[#F7F6F4]/40 hover:bg-[#F7F6F4]/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
