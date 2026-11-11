"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  MapPin,
  Stethoscope,
  Award,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Users,
  ArrowUpRight,
} from "lucide-react";
import { ASSETS } from "@/config/assets";
import {
  ESPECIALISTAS_CEDIMUJER,
  INSTITUCION_INFO,
  CONTACT_INFO,
} from "@/config/cedimujerContent";

interface AboutProps {
  onOpenAppointment?: (serviceName?: string) => void;
  isStandalonePage?: boolean;
}

type QuienesSomosTab = "nuestra-institucion" | "nuestra-sede" | "especialistas";

export const About: React.FC<AboutProps> = ({
  onOpenAppointment,
  isStandalonePage = false,
}) => {
  const [activeSubSection, setActiveSubSection] =
    useState<QuienesSomosTab>("nuestra-institucion");
  const [expandedDoctorId, setExpandedDoctorId] = useState<string | null>(null);
  const [showAsociacionModal, setShowAsociacionModal] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const subSectionButtons: {
    id: QuienesSomosTab;
    label: string;
    icon: React.ElementType;
  }[] = [
    {
      id: "nuestra-institucion",
      label: "Esencia y Calidez",
      icon: Building2,
    },
    {
      id: "especialistas",
      label: "Nuestros Especialistas",
      icon: Stethoscope,
    },
    {
      id: "nuestra-sede",
      label: "Sede Aves María",
      icon: MapPin,
    },
  ];

  const esenciaSlides = [
    {
      id: "calidez",
      title: "Calidez",
      italicAccent: "Humana",
      image: ASSETS.about.mainImage,
      action: () => onOpenAppointment && onOpenAppointment(),
    },
    {
      id: "equipo",
      title: "Nuestros",
      italicAccent: "Especialistas",
      image: "/assets/images/unsplash-doctora.jpg",
      action: () => {
        setActiveSubSection("especialistas");
      },
    },
    {
      id: "tecnologia",
      title: "Tecnología",
      italicAccent: "3D/4D HD Live",
      image: "/assets/images/equipo2.jpg",
      action: () => {
        setActiveSubSection("nuestra-sede");
      },
    },
    {
      id: "sede",
      title: "Sede",
      italicAccent: "Aves María",
      image: "/assets/images/header.jpg",
      action: () => {
        setActiveSubSection("nuestra-sede");
      },
    },
  ];

  const sedeSlides = [
    {
      id: "recepcion",
      title: "Sede",
      italicAccent: "Sabaneta",
      image: "/assets/images/header.jpg",
      href: CONTACT_INFO.whatsappUrl,
    },
    {
      id: "ecografia-hd",
      title: "Ecografía",
      italicAccent: "3D/4D HD Live",
      image: "/assets/images/equipo2.jpg",
    },
    {
      id: "consultorios",
      title: "Consultorios",
      italicAccent: "Privados",
      image: "/assets/images/sala1.jpg",
    },
    {
      id: "sala-espera",
      title: "Ambiente",
      italicAccent: "Acogedor",
      image: "/assets/images/sala3.jpg",
    },
  ];

  const doctorImages: Record<string, string> = {
    "dr-diego-gaviria": "/assets/images/trabajo.jpg",
    "dra-durley-maya": "/assets/images/unsplash-doctora.jpg",
    "dra-claudia-gomez": "/assets/images/unsplash-ginecologia.jpg",
    "dr-enrique-olivares": "/assets/images/unsplash-cardio-consulta.jpg",
  };

  const baseCount =
    activeSubSection === "nuestra-institucion"
      ? esenciaSlides.length
      : activeSubSection === "especialistas"
        ? ESPECIALISTAS_CEDIMUJER.length
        : sedeSlides.length;

  const totalExtendedCount = baseCount * 3;
  const [rawActiveIndex, setRawActiveIndex] = useState<number>(baseCount);
  const activeLogicalIndex =
    ((rawActiveIndex % baseCount) + baseCount) % baseCount;

  const centerCardAt = useCallback(
    (rawIdx: number, behavior: ScrollBehavior = "smooth") => {
      const container = carouselRef.current;
      if (!container || totalExtendedCount === 0) return;
      const clampedIdx =
        ((rawIdx % totalExtendedCount) + totalExtendedCount) %
        totalExtendedCount;
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
    [totalExtendedCount]
  );

  // Recenter when switching tabs or on initial mount
  useEffect(() => {
    const timer = setTimeout(() => {
      centerCardAt(baseCount, "instant" as ScrollBehavior);
    }, 35);
    return () => clearTimeout(timer);
  }, [activeSubSection, baseCount, centerCardAt]);

  useEffect(() => {
    const handleNav = (e: Event) => {
      const customEvent = e as CustomEvent<{
        href?: string;
        subKey?: string;
      }>;
      const { subKey } = customEvent.detail || {};
      if (
        subKey === "nuestra-sede" ||
        subKey === "nuestra-institucion" ||
        subKey === "especialistas"
      ) {
        setActiveSubSection(subKey);
      } else if (subKey === "asociacion-usuarios") {
        setShowAsociacionModal(true);
      }
    };
    window.addEventListener("cedimujer:navigate", handleNav);
    return () => window.removeEventListener("cedimujer:navigate", handleNav);
  }, []);

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
      rawActiveIndex <= 0 ? baseCount * 2 - 1 : rawActiveIndex - 1;
    centerCardAt(nextIdx, "smooth");
  };

  const scrollNext = () => {
    const nextIdx =
      rawActiveIndex >= totalExtendedCount - 1
        ? baseCount
        : rawActiveIndex + 1;
    centerCardAt(nextIdx, "smooth");
  };

  const scrollToLogicalIndex = (logicalIdx: number) => {
    centerCardAt(baseCount + logicalIdx, "smooth");
  };

  const extendedEsencia = [
    ...esenciaSlides,
    ...esenciaSlides,
    ...esenciaSlides,
  ];
  const extendedEspecialistas = [
    ...ESPECIALISTAS_CEDIMUJER,
    ...ESPECIALISTAS_CEDIMUJER,
    ...ESPECIALISTAS_CEDIMUJER,
  ];
  const extendedSede = [...sedeSlides, ...sedeSlides, ...sedeSlides];

  return (
    <section
      id="nosotros"
      className={`scroll-mt-20 ${
        isStandalonePage ? "py-4 sm:py-10" : "py-10 sm:py-16"
      } text-[#4A3A33] relative w-full overflow-hidden`}
    >
      {/* Header inside max-w-7xl */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4 sm:mb-6 text-center md:text-left">
          {!isStandalonePage && (
            <div>
              <span className="inline-block text-[10px] font-medium uppercase tracking-[0.22em] text-[#9A7B6C] mb-1.5">
                Quiénes Somos · Desde Mayo 2008
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#4A3A33] tracking-tight">
                Salud femenina con{" "}
                <span className="italic text-[#D7A7A8]">sentido humano</span>
              </h2>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3">
            {/* Clean 3-Tab Pill Switcher */}
            <div className="inline-flex p-1 rounded-full bg-[#EBCFC6]/50 border border-[#D7A7A8]/60 gap-1 overflow-x-auto max-w-full no-scrollbar">
              {subSectionButtons.map((btn) => {
                const IconComp = btn.icon;
                const isSelected = activeSubSection === btn.id;
                return (
                  <button
                    key={btn.id}
                    type="button"
                    onClick={() => {
                      setActiveSubSection(btn.id);
                    }}
                    className={`shrink-0 flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                      isSelected
                        ? "bg-[#4A3A33] text-[#F7F6F4]"
                        : "text-[#4A3A33]/80 hover:text-[#4A3A33]"
                    }`}
                  >
                    <IconComp
                      className={`w-3.5 h-3.5 shrink-0 stroke-[1.75] ${
                        isSelected ? "text-[#EBCFC6]" : "text-[#D7A7A8]"
                      }`}
                    />
                    <span>{btn.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Carousel Prev / Next Arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={scrollPrev}
                aria-label="Anterior"
                className="w-10 h-10 rounded-full bg-[#EBCFC6]/70 hover:bg-[#4A3A33] text-[#4A3A33] hover:text-[#F7F6F4] border border-[#D7A7A8]/60 flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                aria-label="Siguiente"
                className="w-10 h-10 rounded-full bg-[#EBCFC6]/70 hover:bg-[#4A3A33] text-[#4A3A33] hover:text-[#F7F6F4] border border-[#D7A7A8]/60 flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Width Center-Focused Carousel */}
      <AnimatePresence mode="wait">
        {/* 1. ESENCIA Y CALIDEZ - CARRUSEL A TODO EL ANCHO (SOLO TÍTULO EN IMAGEN) */}
        {activeSubSection === "nuestra-institucion" && (
          <motion.div
            key="nuestra-institucion"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full"
          >
            <div
              ref={carouselRef}
              onScroll={handleScroll}
              className="w-full flex items-center gap-3 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar px-[11vw] sm:px-[calc(50vw-200px)] lg:px-[calc(50vw-240px)] py-6 sm:py-9"
            >
              {extendedEsencia.map((slide, index) => {
                const isCenter = index === rawActiveIndex;
                return (
                  <div
                    key={`${slide.id}-${index}`}
                    onClick={() => {
                      if (isCenter) {
                        slide.action();
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
                    <Image
                      src={slide.image}
                      alt={`${slide.title} ${slide.italicAccent}`}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 80vw, 480px"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3A2422]/85 via-[#4A3A33]/20 to-transparent group-hover:from-[#3A2422]/92 transition-all duration-500" />

                    {/* Only the Title Inside Image */}
                    <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 z-10 flex items-end justify-between gap-3">
                      <h3 className="text-[#F7F6F4] text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight leading-[1.08]">
                        <span className="font-sans font-light">
                          {slide.title}{" "}
                        </span>
                        <span className="font-serif italic font-normal text-[#EBCFC6]">
                          {slide.italicAccent}
                        </span>
                      </h3>
                      <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#EBCFC6] shrink-0 mb-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* 2. ESPECIALISTAS - CARRUSEL A TODO EL ANCHO CON CENTRO MÁS GRANDE */}
        {activeSubSection === "especialistas" && (
          <motion.div
            key="especialistas"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full"
          >
            <div
              ref={carouselRef}
              onScroll={handleScroll}
              className="w-full flex items-center gap-3 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar px-[11vw] sm:px-[calc(50vw-180px)] lg:px-[calc(50vw-200px)] py-6 sm:py-9"
            >
              {extendedEspecialistas.map((doc, index) => {
                const isCenter = index === rawActiveIndex;
                const isExpanded = expandedDoctorId === `${doc.id}-${index}`;
                const photoSrc = doctorImages[doc.id] || doc.image;
                return (
                  <div
                    key={`${doc.id}-${index}`}
                    onClick={() => {
                      if (!isCenter) {
                        centerCardAt(index, "smooth");
                      }
                    }}
                    className={`snap-center shrink-0 w-[78vw] sm:w-[360px] lg:w-[400px] rounded-[2rem] bg-[#F7F6F4] border overflow-hidden flex flex-col justify-between group cursor-pointer transition-all duration-500 ease-out ${
                      isCenter
                        ? "scale-100 sm:scale-105 opacity-100 z-20 border-[#D7A7A8] shadow-[0_24px_60px_-15px_rgba(74,58,51,0.3)]"
                        : "scale-[0.86] opacity-60 hover:opacity-85 z-10 border-[#D7A7A8]/40 shadow-none"
                    }`}
                  >
                    <div>
                      <div className="relative h-64 sm:h-72 overflow-hidden bg-[#EBCFC6]/50">
                        <Image
                          src={photoSrc}
                          alt={doc.name}
                          fill
                          unoptimized
                          className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#3A2422]/90 via-[#4A3A33]/25 to-transparent" />
                        <div className="absolute bottom-4 left-5 right-5 text-[#F7F6F4]">
                          <h4 className="font-serif text-xl sm:text-2xl font-normal leading-tight">
                            {doc.name}
                          </h4>
                        </div>
                      </div>

                      <div className="p-4 space-y-3">
                        <div className="flex flex-wrap gap-1">
                          {doc.specialties.slice(0, 2).map((spec, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 rounded-full bg-[#EBCFC6]/50 text-[10px] font-medium text-[#4A3A33]"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedDoctorId(
                              isExpanded ? null : `${doc.id}-${index}`
                            );
                          }}
                          className="w-full py-1 text-[11px] font-medium text-[#9A7B6C] hover:text-[#4A3A33] flex items-center justify-between border-t border-[#D7A7A8]/35"
                        >
                          <span>
                            {isExpanded
                              ? "Ocultar títulos"
                              : "Ver títulos académicos"}
                          </span>
                          <ChevronDown
                            className={`w-3.5 h-3.5 text-[#D7A7A8] transition-transform ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {isExpanded && (
                          <ul className="space-y-1.5 pt-1">
                            {doc.credentials.map((cred, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-1.5 text-[11px] text-[#4A3A33]/85"
                              >
                                <Award className="w-3 h-3 text-[#D7A7A8] shrink-0 mt-0.5" />
                                <span>{cred}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>

                    <div className="px-4 pb-4">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onOpenAppointment) {
                            onOpenAppointment(`Consulta con ${doc.name}`);
                          }
                        }}
                        className="w-full py-2.5 px-3 rounded-full bg-[#EBCFC6]/65 hover:bg-[#4A3A33] text-[#4A3A33] hover:text-[#F7F6F4] border border-[#D7A7A8]/60 font-medium text-xs transition-all flex items-center justify-center gap-1.5"
                      >
                        <Calendar className="w-3.5 h-3.5 text-[#D7A7A8]" />
                        <span>( Agendar Cita )</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* 3. NUESTRA SEDE - CARRUSEL A TODO EL ANCHO (SOLO TÍTULO EN IMAGEN) */}
        {activeSubSection === "nuestra-sede" && (
          <motion.div
            key="nuestra-sede"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full"
          >
            <div
              ref={carouselRef}
              onScroll={handleScroll}
              className="w-full flex items-center gap-3 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar px-[11vw] sm:px-[calc(50vw-200px)] lg:px-[calc(50vw-240px)] py-6 sm:py-9"
            >
              {extendedSede.map((slide, index) => {
                const isCenter = index === rawActiveIndex;
                return (
                  <div
                    key={`${slide.id}-${index}`}
                    onClick={() => {
                      if (isCenter) {
                        if (slide.href) {
                          window.open(
                            slide.href,
                            "_blank",
                            "noopener,noreferrer"
                          );
                        }
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
                    <Image
                      src={slide.image}
                      alt={`${slide.title} ${slide.italicAccent}`}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 80vw, 480px"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3A2422]/85 via-[#4A3A33]/20 to-transparent group-hover:from-[#3A2422]/92 transition-all duration-500" />

                    {/* Only the Title Inside Image */}
                    <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 z-10 flex items-end justify-between gap-3">
                      <h3 className="text-[#F7F6F4] text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight leading-[1.08]">
                        <span className="font-sans font-light">
                          {slide.title}{" "}
                        </span>
                        <span className="font-serif italic font-normal text-[#EBCFC6]">
                          {slide.italicAccent}
                        </span>
                      </h3>
                      {slide.href && (
                        <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#EBCFC6] shrink-0 mb-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Carousel Indicators + Discreet Asociación de Usuarios */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-center gap-2 mt-2">
          {Array.from({ length: baseCount }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToLogicalIndex(idx)}
              aria-label={`Ir a diapositiva ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeLogicalIndex === idx
                  ? "w-7 bg-[#4A3A33]"
                  : "w-2 bg-[#D7A7A8]/65 hover:bg-[#9A7B6C]"
              }`}
            />
          ))}
        </div>

        {/* Discreet Secondary Collapsible Link for Asociación de Usuarios */}
        <div className="mt-6 pt-4 border-t border-[#D7A7A8]/35 flex flex-col items-center">
          <button
            type="button"
            onClick={() => setShowAsociacionModal(!showAsociacionModal)}
            className="inline-flex items-center gap-2 text-xs font-normal text-[#9A7B6C] hover:text-[#4A3A33] transition-colors"
          >
            <Users className="w-3.5 h-3.5 text-[#D7A7A8]" />
            <span>
              {showAsociacionModal
                ? "( Ocultar Asociación de Usuarios · Derechos y Deberes )"
                : "( Asociación de Usuarios · Derechos y Deberes de la Paciente )"}
            </span>
          </button>

          <AnimatePresence>
            {showAsociacionModal && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="w-full overflow-hidden mt-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 rounded-[1.75rem] bg-[#EBCFC6]/35 border border-[#D7A7A8]/50">
                  <div>
                    <h4 className="font-serif text-base text-[#4A3A33] mb-2">
                      Derechos de la Paciente
                    </h4>
                    <ul className="space-y-1.5">
                      {INSTITUCION_INFO.asociacionUsuarios.rights
                        .slice(0, 3)
                        .map((r, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-xs text-[#4A3A33]/85"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#D7A7A8] shrink-0 mt-0.5" />
                            <span>{r}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-serif text-base text-[#4A3A33] mb-2">
                      Deberes de la Usuaria
                    </h4>
                    <ul className="space-y-1.5">
                      {INSTITUCION_INFO.asociacionUsuarios.duties
                        .slice(0, 3)
                        .map((d, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-xs text-[#4A3A33]/85"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#D7A7A8] shrink-0 mt-0.5" />
                            <span>{d}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
