"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  X,
  Images,
} from "lucide-react";
import { ASSETS } from "@/config/assets";

interface CarouselSlide {
  id: number;
  title: string;
  tag: string;
  image: string;
  caption: string;
}

const CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    id: 1,
    title: "Sala de Ecografía 3D/4D HD Live",
    tag: "Ultrasonido Avanzado",
    image: "/assets/images/equipo2.jpg",
    caption: "Tecnología HD Live con pantalla dedicada para la paciente y su familia.",
  },
  {
    id: 2,
    title: "Consultorios Ginecológicos",
    tag: "Atención Privada",
    image: "/assets/images/sala1.jpg",
    caption: "Espacios privados y acogedores diseñados para tu comodidad.",
  },
  {
    id: 3,
    title: "Ultrasonido y Radiología General",
    tag: "Alta Definición",
    image: "/assets/images/equipo1.jpg",
    caption: "Equipos de alta resolución para diagnóstico integral y oportuno.",
  },
  {
    id: 4,
    title: "Unidad de Cardiodiagnóstico",
    tag: "Salud Cardiovascular",
    image: "/assets/images/unsplash-cardio-consulta.jpg",
    caption: "Electrocardiograma, Ecocardiograma Doppler y monitoreo de presión arterial.",
  },
  {
    id: 5,
    title: "Doppler y Monitoreo Materno-Fetal",
    tag: "Precisión Clínica",
    image: "/assets/images/equipo1vista2.jpg",
    caption: "Transductores especializados para estudios de detalle anatómico y Doppler.",
  },
  {
    id: 6,
    title: "Calidez y Sentido Humano",
    tag: "Especialistas",
    image: "/assets/images/trabajo.jpg",
    caption: "Acompañamiento cercano, cálido y ético en cada consulta.",
  },
  {
    id: 7,
    title: "Recepción Sede C.C. Aves María",
    tag: "Sabaneta · Local 341-342",
    image: "/assets/images/header.jpg",
    caption: "C.C. Aves María · Locales 341-342, Sabaneta.",
  },
  {
    id: 8,
    title: "Bienestar en Cada Etapa",
    tag: "Maternidad y Vida",
    image: "/assets/images/unsplash-maternidad.jpg",
    caption: "Te acompañamos con tecnología diagnóstica y calidez humana.",
  },
];

export const FacilitiesGallery: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<number>(0);

  const baseFacilities = ASSETS.facilities;
  const totalBase = baseFacilities.length;
  const extendedFacilities = [
    ...baseFacilities,
    ...baseFacilities,
    ...baseFacilities,
  ];
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [rawTrackIndex, setRawTrackIndex] = useState<number>(totalBase);
  const activeLogicalTrackIndex =
    ((rawTrackIndex % totalBase) + totalBase) % totalBase;

  const centerTrackCardAt = useCallback(
    (rawIdx: number, behavior: ScrollBehavior = "smooth") => {
      const container = trackRef.current;
      if (!container || extendedFacilities.length === 0) return;
      const clampedIdx =
        ((rawIdx % extendedFacilities.length) + extendedFacilities.length) %
        extendedFacilities.length;
      const targetCard = container.children[clampedIdx] as
        | HTMLElement
        | undefined;
      if (!targetCard) return;

      const scrollLeft =
        targetCard.offsetLeft -
        (container.clientWidth - targetCard.offsetWidth) / 2;

      container.scrollTo({
        left: scrollLeft,
        behavior,
      });
      setRawTrackIndex(clampedIdx);
    },
    [extendedFacilities.length]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      centerTrackCardAt(totalBase, "instant" as ScrollBehavior);
    }, 35);
    return () => clearTimeout(timer);
  }, [centerTrackCardAt, totalBase]);

  const handleTrackScroll = () => {
    const container = trackRef.current;
    if (!container) return;
    const containerCenter = container.scrollLeft + container.clientWidth / 2;

    let closestIdx = rawTrackIndex;
    let minDistance = Infinity;

    for (let i = 0; i < container.children.length; i++) {
      const child = container.children[i] as HTMLElement;
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const dist = Math.abs(containerCenter - childCenter);
      if (dist < minDistance) {
        minDistance = dist;
        closestIdx = i;
      }
    }

    if (closestIdx !== rawTrackIndex) {
      setRawTrackIndex(closestIdx);
    }
  };

  const scrollTrackPrev = () => {
    const nextIdx =
      rawTrackIndex <= 0 ? totalBase * 2 - 1 : rawTrackIndex - 1;
    centerTrackCardAt(nextIdx, "smooth");
  };

  const scrollTrackNext = () => {
    const nextIdx =
      rawTrackIndex >= extendedFacilities.length - 1
        ? totalBase
        : rawTrackIndex + 1;
    centerTrackCardAt(nextIdx, "smooth");
  };

  const isCarouselOpen = activeIndex !== null;

  const handleClose = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) =>
      prev === null
        ? 0
        : (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length
    );
  }, []);

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) =>
      prev === null ? 0 : (prev + 1) % CAROUSEL_SLIDES.length
    );
  }, []);

  // Lock page scroll & handle keyboard navigation while carousel is open
  useEffect(() => {
    if (!isCarouselOpen) return;

    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCarouselOpen, handleClose, handlePrev, handleNext]);

  const currentSlide =
    activeIndex !== null ? CAROUSEL_SLIDES[activeIndex] : null;

  return (
    <section
      id="instalaciones"
      className="scroll-mt-20 py-10 sm:py-16 text-[#4A3A33] relative w-full overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Minimalist Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4 sm:mb-6 text-center sm:text-left">
          <div>
            <span className="inline-block text-[10px] font-medium uppercase tracking-[0.22em] text-[#9A7B6C] mb-1.5">
              Sede Aves María · Toca la imagen central para ampliar
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#4A3A33] tracking-tight">
              Espacios y <span className="italic text-[#D7A7A8]">tecnología</span>
            </h2>
          </div>

          <div className="flex items-center justify-center sm:justify-end gap-2">
            <button
              type="button"
              onClick={scrollTrackPrev}
              aria-label="Espacio anterior"
              className="w-10 h-10 rounded-full bg-[#EBCFC6]/70 hover:bg-[#4A3A33] text-[#4A3A33] hover:text-[#F7F6F4] border border-[#D7A7A8]/60 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={scrollTrackNext}
              aria-label="Siguiente espacio"
              className="w-10 h-10 rounded-full bg-[#EBCFC6]/70 hover:bg-[#4A3A33] text-[#4A3A33] hover:text-[#F7F6F4] border border-[#D7A7A8]/60 flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Full-Width Center-Focused Carousel */}
      <div
        ref={trackRef}
        onScroll={handleTrackScroll}
        className="w-full flex items-center gap-3 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar px-[11vw] sm:px-[calc(50vw-200px)] lg:px-[calc(50vw-240px)] py-6 sm:py-9"
      >
        {extendedFacilities.map((item, idx) => {
          const isCenter = idx === rawTrackIndex;
          const logicalIdx = idx % totalBase;
          return (
            <div
              key={`${item.id}-${idx}`}
              onClick={() => {
                if (isCenter) {
                  setDirection(0);
                  setActiveIndex(logicalIdx);
                } else {
                  centerTrackCardAt(idx, "smooth");
                }
              }}
              className={`snap-center shrink-0 w-[78vw] sm:w-[400px] lg:w-[480px] h-[340px] sm:h-[410px] lg:h-[450px] group relative rounded-[2rem] overflow-hidden border transition-all duration-500 ease-out cursor-pointer bg-[#F9EAEA] ${
                isCenter
                  ? "scale-100 sm:scale-105 opacity-100 z-20 border-[#D7A7A8] shadow-[0_24px_60px_-15px_rgba(74,58,51,0.34)]"
                  : "scale-[0.86] opacity-60 hover:opacity-85 z-10 border-[#D7A7A8]/40 shadow-none"
              }`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                unoptimized
                sizes="(max-width: 640px) 80vw, 480px"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#3A2422]/85 via-[#4A3A33]/20 to-transparent pointer-events-none" />

              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#FDF6F6]/90 backdrop-blur-md text-[#4A3A33] flex items-center gap-1 text-[10px] font-medium">
                <Images className="w-3 h-3 text-[#D7A7A8] stroke-[1.75]" />
                <span>Ampliar</span>
              </div>

              <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6">
                <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-[#FDF6F6]">
                  {item.title}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Indicators */}
      <div className="flex items-center justify-center gap-2 mt-2">
        {baseFacilities.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => centerTrackCardAt(totalBase + idx, "smooth")}
            aria-label={`Ir a ${item.title}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeLogicalTrackIndex === idx
                ? "w-7 bg-[#4A3A33]"
                : "w-2 bg-[#D7A7A8]/65 hover:bg-[#9A7B6C]"
            }`}
          />
        ))}
      </div>

      {/* Dedicated Full-Screen Minimalist Image Carousel (Rendered in Portal) */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isCarouselOpen && currentSlide && activeIndex !== null && (
              <motion.div
                key="facilities-fullscreen-carousel"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="fixed inset-0 z-[120] bg-[#FDF6F6] text-[#4A3A33] flex flex-col justify-between overflow-hidden select-none"
              >
                {/* Top Minimalist Header Bar */}
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 pt-4 sm:pt-6 pb-3 flex items-center justify-between border-b border-[#F3D9D9] shrink-0">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#4A3A33] hover:text-[#9A7B6C] transition-colors group"
                  >
                    <ArrowLeft className="w-4 h-4 text-[#D7A7A8] transition-transform group-hover:-translate-x-0.5" />
                    <span>Volver</span>
                  </button>

                  <div className="flex items-center gap-4">
                    <span className="font-serif italic text-sm sm:text-base text-[#9A7B6C]">
                      0{activeIndex + 1} / 0{CAROUSEL_SLIDES.length}
                    </span>

                    <button
                      type="button"
                      onClick={handleClose}
                      aria-label="Cerrar carrusel"
                      className="w-9 h-9 rounded-full bg-white hover:bg-[#4A3A33] text-[#4A3A33] hover:text-[#FDF6F6] border border-[#F3D9D9] flex items-center justify-center transition-colors"
                    >
                      <X className="w-4 h-4 stroke-[1.75]" />
                    </button>
                  </div>
                </div>

                {/* Main Center Carousel Stage */}
                <div className="relative flex-1 w-full max-w-6xl mx-auto px-4 sm:px-14 py-4 flex flex-col items-center justify-center min-h-0">
                  {/* Left Arrow (Desktop & Tablet) */}
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Imagen anterior"
                    className="hidden sm:flex absolute left-3 lg:left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/90 hover:bg-[#4A3A33] text-[#4A3A33] hover:text-[#FAF7F2] border border-[#E6D9C8] shadow-sm items-center justify-center transition-all"
                  >
                    <ChevronLeft className="w-5 h-5 stroke-[1.75]" />
                  </button>

                  {/* Right Arrow (Desktop & Tablet) */}
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Siguiente imagen"
                    className="hidden sm:flex absolute right-3 lg:right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/90 hover:bg-[#4A3A33] text-[#4A3A33] hover:text-[#FAF7F2] border border-[#E6D9C8] shadow-sm items-center justify-center transition-all"
                  >
                    <ChevronRight className="w-5 h-5 stroke-[1.75]" />
                  </button>

                  {/* Image Container with Swipe Support */}
                  <div className="relative w-full h-full max-h-[58dvh] sm:max-h-[64dvh] rounded-[1.75rem] sm:rounded-[2.25rem] overflow-hidden border border-[#E6D9C8] bg-white shadow-[0_20px_60px_-20px_rgba(74,58,51,0.12)]">
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                      <motion.div
                        key={currentSlide.id}
                        custom={direction}
                        initial={{
                          opacity: 0,
                          x: direction > 0 ? 40 : direction < 0 ? -40 : 0,
                        }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{
                          opacity: 0,
                          x: direction > 0 ? -40 : direction < 0 ? 40 : 0,
                        }}
                        transition={{ duration: 0.28, ease: "easeOut" }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={(_, info) => {
                          if (info.offset.x < -50) handleNext();
                          else if (info.offset.x > 50) handlePrev();
                        }}
                        className="relative w-full h-full cursor-grab active:cursor-grabbing"
                      >
                        <Image
                          src={currentSlide.image}
                          alt={currentSlide.title}
                          fill
                          priority
                          unoptimized
                          className="object-cover"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Mobile Prev/Next Floating Buttons over Image Edges */}
                    <div className="sm:hidden absolute inset-x-3 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none z-20">
                      <button
                        type="button"
                        onClick={handlePrev}
                        aria-label="Anterior"
                        className="pointer-events-auto w-9 h-9 rounded-full bg-[#FAF7F2]/90 backdrop-blur-md text-[#4A3A33] border border-[#E6D9C8] shadow-sm flex items-center justify-center active:scale-95"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        aria-label="Siguiente"
                        className="pointer-events-auto w-9 h-9 rounded-full bg-[#FAF7F2]/90 backdrop-blur-md text-[#4A3A33] border border-[#E6D9C8] shadow-sm flex items-center justify-center active:scale-95"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Slide Title & Caption */}
                  <div className="mt-4 text-center max-w-xl mx-auto px-2 shrink-0">
                    <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#9A7B6C] block mb-1">
                      {currentSlide.tag}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#4A3A33] leading-snug">
                      {currentSlide.title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-[#4A3A33]/75 font-normal">
                      {currentSlide.caption}
                    </p>
                  </div>
                </div>

                {/* Bottom Thumbnail Strip */}
                <div className="w-full max-w-5xl mx-auto px-4 sm:px-8 pb-5 sm:pb-7 pt-2 shrink-0">
                  <div className="flex items-center justify-start sm:justify-center gap-2.5 overflow-x-auto no-scrollbar py-1">
                    {CAROUSEL_SLIDES.map((slide, idx) => {
                      const isActive = idx === activeIndex;
                      return (
                        <button
                          key={slide.id}
                          type="button"
                          onClick={() => {
                            setDirection(idx > activeIndex ? 1 : -1);
                            setActiveIndex(idx);
                          }}
                          className={`relative shrink-0 w-16 h-12 sm:w-20 sm:h-14 rounded-xl overflow-hidden transition-all duration-200 border ${
                            isActive
                              ? "border-[#4A3A33] ring-2 ring-[#8FC1BB]/60 scale-105 opacity-100"
                              : "border-[#E6D9C8] opacity-55 hover:opacity-90"
                          }`}
                        >
                          <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
};
