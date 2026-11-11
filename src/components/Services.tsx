"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
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

  const totalUnits = careUnits.length;
  // Repeat 3x so left and right sides of the viewport are always filled around the centered card
  const extendedUnits = [...careUnits, ...careUnits, ...careUnits];

  const carouselRef = useRef<HTMLDivElement>(null);
  const [rawActiveIndex, setRawActiveIndex] = useState<number>(totalUnits);
  const activeLogicalIndex =
    ((rawActiveIndex % totalUnits) + totalUnits) % totalUnits;

  const centerCardAt = useCallback(
    (rawIdx: number, behavior: ScrollBehavior = "smooth") => {
      const container = carouselRef.current;
      if (!container) return;
      const clampedIdx =
        ((rawIdx % extendedUnits.length) + extendedUnits.length) %
        extendedUnits.length;
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
      setRawActiveIndex(clampedIdx);
    },
    [extendedUnits.length]
  );

  // Center initial card on mount & window resize
  useEffect(() => {
    const timer = setTimeout(() => {
      centerCardAt(totalUnits, "instant" as ScrollBehavior);
    }, 30);
    return () => clearTimeout(timer);
  }, [centerCardAt, totalUnits]);

  const handleScroll = () => {
    const container = carouselRef.current;
    if (!container) return;
    const containerCenter = container.scrollLeft + container.clientWidth / 2;

    let closestIdx = rawActiveIndex;
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

    if (closestIdx !== rawActiveIndex) {
      setRawActiveIndex(closestIdx);
    }
  };

  const scrollPrev = () => {
    const nextIdx =
      rawActiveIndex <= 0 ? totalUnits * 2 - 1 : rawActiveIndex - 1;
    centerCardAt(nextIdx, "smooth");
  };

  const scrollNext = () => {
    const nextIdx =
      rawActiveIndex >= extendedUnits.length - 1
        ? totalUnits
        : rawActiveIndex + 1;
    centerCardAt(nextIdx, "smooth");
  };

  const scrollToLogicalIndex = (logicalIdx: number) => {
    centerCardAt(totalUnits + logicalIdx, "smooth");
  };

  return (
    <section
      id="servicios"
      className="scroll-mt-20 py-10 sm:py-16 text-[#4A3A33] relative w-full overflow-hidden"
    >
      {/* Header inside max-w-7xl */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4 sm:mb-6 text-center sm:text-left">
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
      </div>

      {/* Full-Width Center-Focused Carousel (Extends across the entire screen width) */}
      <div
        ref={carouselRef}
        onScroll={handleScroll}
        className="w-full flex items-center gap-3 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar px-[11vw] sm:px-[calc(50vw-200px)] lg:px-[calc(50vw-240px)] py-6 sm:py-9"
      >
        {extendedUnits.map((unit, index) => {
          const IconComponent = unit.icon;
          const isCenter = index === rawActiveIndex;
          return (
            <div
              key={`${unit.id}-${index}`}
              onClick={() => {
                if (isCenter) {
                  if (onOpenSection) onOpenSection(unit.id);
                } else {
                  centerCardAt(index, "smooth");
                }
              }}
              className={`group relative snap-center shrink-0 w-[78vw] sm:w-[400px] lg:w-[480px] h-[360px] sm:h-[430px] lg:h-[470px] rounded-[2rem] overflow-hidden cursor-pointer border transition-all duration-500 ease-out ${
                isCenter
                  ? "scale-100 sm:scale-105 opacity-100 z-20 border-[#D7A7A8] shadow-[0_24px_60px_-15px_rgba(74,58,51,0.34)]"
                  : "scale-[0.86] opacity-60 hover:opacity-85 z-10 border-[#D7A7A8]/40 shadow-none"
              }`}
            >
              {/* Full-Bleed Protagonist Image */}
              <Image
                src={unit.image}
                alt={`${unit.title} ${unit.italicAccent}`}
                fill
                unoptimized
                sizes="(max-width: 640px) 80vw, 480px"
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
                <h3 className="text-[#F7F6F4] text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight leading-[1.08]">
                  <span className="font-sans font-light">{unit.title} </span>
                  <span className="font-serif italic font-normal text-[#EBCFC6]">
                    {unit.italicAccent}
                  </span>
                </h3>

                <button
                  type="button"
                  aria-label={`Abrir ${unit.title} ${unit.italicAccent}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onOpenSection) onOpenSection(unit.id);
                  }}
                  className="p-1"
                >
                  <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#EBCFC6] shrink-0 mb-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Carousel Indicators */}
      <div className="flex items-center justify-center gap-2 mt-2">
        {careUnits.map((unit, idx) => (
          <button
            key={unit.id}
            type="button"
            onClick={() => scrollToLogicalIndex(idx)}
            aria-label={`Ir a ${unit.title} ${unit.italicAccent}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeLogicalIndex === idx
                ? "w-7 bg-[#4A3A33]"
                : "w-2 bg-[#D7A7A8]/65 hover:bg-[#9A7B6C]"
            }`}
          />
        ))}
      </div>
    </section>
  );
};
