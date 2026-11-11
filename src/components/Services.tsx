"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Baby,
  Stethoscope,
  HeartPulse,
  Scan,
  Video,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { AppSectionView } from "@/components/SectionPageView";

interface ServicesProps {
  onSelectService?: (serviceName: string) => void;
  onOpenCalculator?: () => void;
  onOpenSection?: (
    view: AppSectionView,
    subKey?: string,
    itemId?: string
  ) => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenSection }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const careUnits: {
    id: AppSectionView;
    title: string;
    italicAccent: string;
    icon: React.ElementType;
    image: string;
  }[] = [
    {
      id: "embarazo",
      title: "Embarazo y",
      italicAccent: "Materno-Fetal",
      icon: Baby,
      image: "/assets/images/unsplash-maternidad.jpg",
    },
    {
      id: "ginecologia",
      title: "Ginecología",
      italicAccent: "Integral",
      icon: Stethoscope,
      image: "/assets/images/unsplash-doctora.jpg",
    },
    {
      id: "cardiodiagnostico",
      title: "Cardio",
      italicAccent: "diagnóstico",
      icon: HeartPulse,
      image: "/assets/images/unsplash-cardio-consulta.jpg",
    },
    {
      id: "ultrasonido-radiologia",
      title: "Ultrasonido y",
      italicAccent: "Radiología General",
      icon: Scan,
      image: "/assets/images/equipo2.jpg",
    },
    {
      id: "telemedicina",
      title: "Telemedicina",
      italicAccent: "Especializada",
      icon: Video,
      image: "/assets/images/unsplash-ginecologia.jpg",
    },
  ];

  const handleScroll = () => {
    const container = carouselRef.current;
    if (!container) return;
    const firstCard = container.firstElementChild as HTMLElement | null;
    if (!firstCard) return;
    const gap = 20;
    const cardStep = firstCard.offsetWidth + gap;
    const index = Math.round(container.scrollLeft / cardStep);
    setActiveIndex(Math.max(0, Math.min(careUnits.length - 1, index)));
  };

  const scrollToIndex = (index: number) => {
    const container = carouselRef.current;
    if (!container) return;
    const clampedIndex =
      ((index % careUnits.length) + careUnits.length) % careUnits.length;
    const targetCard = container.children[clampedIndex] as
      | HTMLElement
      | undefined;
    if (targetCard) {
      container.scrollTo({
        left: targetCard.offsetLeft,
        behavior: "smooth",
      });
      setActiveIndex(clampedIndex);
    }
  };

  const scrollPrev = () => {
    scrollToIndex(activeIndex - 1);
  };

  const scrollNext = () => {
    scrollToIndex(activeIndex + 1);
  };

  return (
    <section
      id="servicios"
      className="scroll-mt-20 py-10 sm:py-16 text-[#4A3A33] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Minimalist Section Header + Carousel Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7 sm:mb-9 text-center sm:text-left">
          <div>
            <span className="inline-block text-[10px] font-medium uppercase tracking-[0.22em] text-[#9A7B6C] mb-1.5">
              Especialidades Médicas · Desliza o toca una unidad
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#4A3A33] tracking-tight">
              Nuestras unidades de{" "}
              <span className="italic text-[#D7A7A8]">cuidado</span>
            </h2>
          </div>

          <div className="flex items-center justify-center sm:justify-end gap-2">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Unidad anterior"
              className="w-10 h-10 rounded-full bg-[#EBCFC6]/70 hover:bg-[#4A3A33] text-[#4A3A33] hover:text-[#F7F6F4] border border-[#D7A7A8]/60 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Siguiente unidad"
              className="w-10 h-10 rounded-full bg-[#EBCFC6]/70 hover:bg-[#4A3A33] text-[#4A3A33] hover:text-[#F7F6F4] border border-[#D7A7A8]/60 flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Full-Bleed Image Protagonist Carousel (Only the Title Inside Each Image) */}
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pb-2"
        >
          {careUnits.map((unit, index) => {
            const IconComponent = unit.icon;
            return (
              <motion.div
                key={unit.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                onClick={() => onOpenSection && onOpenSection(unit.id)}
                className="group relative snap-start shrink-0 w-[84vw] sm:w-[340px] lg:w-[380px] h-[360px] sm:h-[420px] rounded-[2rem] overflow-hidden cursor-pointer border border-[#D7A7A8]/50 shadow-[0_16px_40px_-18px_rgba(74,58,51,0.2)]"
              >
                {/* Full-Bleed Protagonist Image */}
                <Image
                  src={unit.image}
                  alt={`${unit.title} ${unit.italicAccent}`}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 85vw, 380px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />

                {/* Subtle Editorial Gradient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#3A2422]/85 via-[#4A3A33]/20 to-transparent group-hover:from-[#3A2422]/92 transition-all duration-500" />

                {/* Top Right Icon */}
                <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-10">
                  <div className="w-9 h-9 rounded-full bg-[#EBCFC6]/90 backdrop-blur-md text-[#4A3A33] flex items-center justify-center shrink-0 group-hover:bg-[#4A3A33] group-hover:text-[#F7F6F4] transition-colors">
                    <IconComponent className="w-4 h-4 stroke-[1.75]" />
                  </div>
                </div>

                {/* Only the Title Inside Image */}
                <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 z-10 flex items-end justify-between gap-3">
                  <h3 className="text-[#F7F6F4] text-2xl sm:text-3xl font-light tracking-tight leading-[1.08]">
                    <span className="font-sans font-light">{unit.title} </span>
                    <span className="font-serif italic font-normal text-[#EBCFC6]">
                      {unit.italicAccent}
                    </span>
                  </h3>

                  <ArrowUpRight className="w-5 h-5 text-[#EBCFC6] shrink-0 mb-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Carousel Indicators */}
        <div className="flex items-center justify-center gap-2 mt-5">
          {careUnits.map((unit, idx) => (
            <button
              key={unit.id}
              type="button"
              onClick={() => scrollToIndex(idx)}
              aria-label={`Ir a ${unit.title} ${unit.italicAccent}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === idx
                  ? "w-7 bg-[#4A3A33]"
                  : "w-2 bg-[#D7A7A8]/65 hover:bg-[#9A7B6C]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
