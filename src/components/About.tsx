"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  ShieldCheck,
  HeartHandshake,
  Microscope,
  CheckCircle2,
  UserCheck,
  Building2,
  MapPin,
  Users,
  Stethoscope,
  Phone,
  Award,
  MessageSquareHeart,
  Calendar,
  ChevronDown,
} from "lucide-react";
import { ASSETS } from "@/config/assets";
import {
  ESPECIALISTAS_CEDIMUJER,
  INSTITUCION_INFO,
  CONTACT_INFO,
} from "@/config/cedimujerContent";
import { InstitutionalPhilosophy } from "@/components/InstitutionalPhilosophy";

interface AboutProps {
  onOpenAppointment?: (serviceName?: string) => void;
  isStandalonePage?: boolean;
}

type QuienesSomosTab =
  | "nuestra-institucion"
  | "nuestra-sede"
  | "especialistas"
  | "asociacion-usuarios";

export const About: React.FC<AboutProps> = ({
  onOpenAppointment,
  isStandalonePage = false,
}) => {
  const [activeSubSection, setActiveSubSection] =
    useState<QuienesSomosTab>("nuestra-institucion");
  const [activePillar, setActivePillar] = useState(0);
  const [showFullHistoryMobile, setShowFullHistoryMobile] = useState(false);
  const [expandedDoctorId, setExpandedDoctorId] = useState<string | null>(null);
  const [asociacionMobileTab, setAsociacionMobileTab] = useState<
    "funciones" | "derechos" | "deberes"
  >("funciones");

  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1.08, 1.0, 1.06]
  );

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
        subKey === "especialistas" ||
        subKey === "asociacion-usuarios"
      ) {
        setActiveSubSection(subKey);
      }
    };
    window.addEventListener("cedimujer:navigate", handleNav);
    return () => window.removeEventListener("cedimujer:navigate", handleNav);
  }, []);

  const pillars = [
    {
      title: "Enfoque Humanizado y Empático",
      icon: HeartHandshake,
      description:
        "Explicamos cada diagnóstico, ecografía y procedimiento de forma clara, paciente y cálida tanto para la mujer como para su familia.",
    },
    {
      title: "Diagnóstico de Alta Precisión (3D/4D HD Live)",
      icon: Microscope,
      description:
        "Equipos de ultrasonido de última generación para ecografías obstétricas de tercer nivel, ginecológicas, mamarias y de piso pélvico.",
    },
    {
      title: "Entorno Seguro y Confortable en Aves María",
      icon: ShieldCheck,
      description:
        "Consultorios modernos en el C.C. Aves María (Locales 341-342) en Sabaneta, con parqueadero, fácil acceso y total privacidad.",
    },
  ];

  const subSectionButtons: {
    id: QuienesSomosTab;
    label: string;
    shortLabel: string;
    icon: React.ElementType;
  }[] = [
    {
      id: "nuestra-institucion",
      label: "Nuestra Institución",
      shortLabel: "Institución",
      icon: Building2,
    },
    {
      id: "nuestra-sede",
      label: "Nuestra Sede",
      shortLabel: "Sede Sabaneta",
      icon: MapPin,
    },
    {
      id: "especialistas",
      label: "Especialistas",
      shortLabel: "Especialistas",
      icon: Stethoscope,
    },
    {
      id: "asociacion-usuarios",
      label: "Asociación de usuarios",
      shortLabel: "Asociación",
      icon: Users,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="nosotros"
      className={`scroll-mt-20 ${
        isStandalonePage
          ? "py-6 sm:py-12 rounded-3xl"
          : "py-14 sm:py-24"
      } bg-[#E6D9C8]/50 text-[#4A3A33] relative overflow-hidden`}
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#CFE6E2]/30 rounded-full [filter:blur(36px)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header (Hidden when inside standalone page to avoid duplicate giant headers on mobile) */}
        {!isStandalonePage && (
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBCFC6] border border-[#D7A7A8] text-[#4A3A33] text-xs font-black uppercase tracking-wider mb-3">
              <UserCheck className="w-4 h-4 text-[#8FC1BB]" />
              <span>Quiénes Somos · CediMujer Sabaneta</span>
            </div>
            <h2 className="text-2xl sm:text-5xl font-black text-[#4A3A33] tracking-tight">
              Centro de Diagnóstico Especializado en{" "}
              <span className="text-[#8FC1BB]">Salud para la Mujer</span>
            </h2>
            <p className="mt-2.5 text-xs sm:text-base text-[#9A7B6C] font-semibold">
              Desde mayo de 2008 cuidando integralmente a las mujeres de Medellín y el sur del Valle de Aburrá en todas las etapas de su vida.
            </p>
          </div>
        )}

        {/* Navigation Pills for the 4 Subsections of QUIÉNES SOMOS */}
        <div className="flex justify-center mb-7 sm:mb-12">
          <div className="grid grid-cols-2 lg:inline-flex p-1.5 rounded-2xl lg:rounded-full bg-[#F7F2EC] border-2 border-[#E6D9C8] gap-1.5 sm:gap-2 shadow-md w-full lg:w-auto">
            {subSectionButtons.map((btn) => {
              const IconComp = btn.icon;
              const isSelected = activeSubSection === btn.id;
              return (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => setActiveSubSection(btn.id)}
                  className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl lg:rounded-full text-xs sm:text-sm font-extrabold transition-all duration-300 ${
                    isSelected
                      ? "bg-[#4A3A33] text-[#F7F2EC] shadow-md scale-[1.01]"
                      : "text-[#4A3A33] hover:bg-[#E6D9C8]/60"
                  }`}
                >
                  <IconComp
                    className={`w-4 h-4 shrink-0 ${
                      isSelected ? "text-[#8FC1BB]" : "text-[#9A7B6C]"
                    }`}
                  />
                  <span className="sm:hidden">{btn.shortLabel}</span>
                  <span className="hidden sm:inline">{btn.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Animated Content for the 4 Subsections */}
        <AnimatePresence mode="wait">
          {/* 1. NUESTRA INSTITUCIÓN */}
          {activeSubSection === "nuestra-institucion" && (
            <motion.div
              key="nuestra-institucion"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-10 lg:gap-14 items-center">
                {/* Left Images */}
                <div className="lg:col-span-6 relative">
                  <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#E6D9C8] h-64 sm:h-[460px]">
                    <motion.div
                      style={{ scale: imageScale }}
                      className="w-full h-full relative"
                    >
                      <Image
                        src={ASSETS.about.mainImage}
                        alt="Equipo Médico CediMujer en Consulta"
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#4A3A33]/50 via-transparent to-transparent" />
                  </div>

                  <div className="hidden sm:block absolute -bottom-6 -right-6 w-52 h-52 rounded-2xl overflow-hidden border-4 border-[#F7F2EC] shadow-2xl z-10">
                    <Image
                      src={ASSETS.about.secondaryImage}
                      alt="Salas de Atención Médica CediMujer"
                      width={208}
                      height={208}
                      unoptimized
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="absolute top-4 left-4 z-20 bg-[#F7F2EC]/95 backdrop-blur-md border border-[#8FC1BB] p-2.5 sm:p-3.5 rounded-2xl shadow-lg flex items-center gap-2.5 sm:gap-3">
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white border border-[#8FC1BB]/40 flex items-center justify-center p-1 shrink-0">
                      <Image
                        src={ASSETS.logo.emblem}
                        alt="Emblema CediMujer"
                        width={36}
                        height={36}
                        unoptimized
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-sm sm:text-lg font-black text-[#4A3A33]">
                        Desde Mayo 2008
                      </p>
                      <p className="text-[11px] sm:text-xs text-[#9A7B6C] font-bold">
                        Líderes en Ginecología y Ecografía
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Text (Progressive Disclosure on Mobile) */}
                <div className="lg:col-span-6 space-y-4 sm:space-y-5">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#CFE6E2] text-[#4A3A33] text-xs font-black uppercase tracking-wider">
                    {INSTITUCION_INFO.historyTitle}
                  </span>
                  <h3 className="text-xl sm:text-4xl font-black text-[#4A3A33] leading-tight">
                    Promoción, prevención y diagnóstico temprano en cada etapa femenina
                  </h3>

                  {/* Desktop: show all paragraphs; Mobile: show 1st + expandable button */}
                  <div className="space-y-3 text-xs sm:text-base text-[#4A3A33]/90 font-medium leading-relaxed">
                    <p className="bg-[#F7F2EC]/80 sm:bg-transparent p-3.5 sm:p-0 rounded-2xl border border-[#E6D9C8] sm:border-0">
                      {INSTITUCION_INFO.historyParagraphs[0]}
                    </p>

                    <div
                      className={`${
                        showFullHistoryMobile ? "block" : "hidden sm:block"
                      } space-y-3`}
                    >
                      {INSTITUCION_INFO.historyParagraphs
                        .slice(1)
                        .map((p, idx) => (
                          <p
                            key={idx}
                            className="bg-[#F7F2EC]/80 sm:bg-transparent p-3.5 sm:p-0 rounded-2xl border border-[#E6D9C8] sm:border-0"
                          >
                            {p}
                          </p>
                        ))}
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setShowFullHistoryMobile(!showFullHistoryMobile)
                      }
                      className="sm:hidden inline-flex items-center gap-1.5 text-xs font-extrabold text-[#4A3A33] bg-[#CFE6E2]/70 px-3.5 py-2 rounded-xl"
                    >
                      <span>
                        {showFullHistoryMobile
                          ? "Mostrar menos"
                          : "Leer historia completa de CediMujer"}
                      </span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform ${
                          showFullHistoryMobile ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {/* Interactive Pillars (Accordion cards) */}
                  <div className="space-y-2.5 pt-1">
                    {pillars.map((pillar, idx) => {
                      const IconComp = pillar.icon;
                      const isActive = activePillar === idx;
                      return (
                        <div
                          key={pillar.title}
                          onClick={() => setActivePillar(idx)}
                          className={`p-3.5 sm:p-4 rounded-2xl cursor-pointer transition-all border ${
                            isActive
                              ? "bg-[#F7F2EC] border-[#8FC1BB] shadow-md"
                              : "bg-[#F7F2EC]/60 border-[#E6D9C8] hover:bg-[#F7F2EC]"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div
                                className={`p-2 rounded-xl shrink-0 ${
                                  isActive
                                    ? "bg-[#8FC1BB] text-[#4A3A33]"
                                    : "bg-[#EBCFC6] text-[#4A3A33]"
                                }`}
                              >
                                <IconComp className="w-4 h-4 sm:w-5 sm:h-5" />
                              </div>
                              <h4 className="text-xs sm:text-base font-extrabold text-[#4A3A33]">
                                {pillar.title}
                              </h4>
                            </div>
                            <ChevronDown
                              className={`w-4 h-4 text-[#9A7B6C] shrink-0 transition-transform ${
                                isActive ? "rotate-180 text-[#8FC1BB]" : ""
                              }`}
                            />
                          </div>
                          {isActive && (
                            <p className="mt-2.5 text-xs sm:text-sm text-[#9A7B6C] font-semibold pl-11 leading-relaxed">
                              {pillar.description}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Misión, Visión 2030 y Valores */}
              <InstitutionalPhilosophy />
            </motion.div>
          )}

          {/* 2. NUESTRA SEDE */}
          {activeSubSection === "nuestra-sede" && (
            <motion.div
              key="nuestra-sede"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-[#F7F2EC] rounded-3xl p-5 sm:p-10 border border-[#E6D9C8] shadow-xl space-y-6 sm:space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
                <div className="lg:col-span-6 space-y-4 sm:space-y-5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8FC1BB]/30 text-[#4A3A33] text-xs font-black uppercase tracking-wider">
                    <MapPin className="w-3.5 h-3.5 text-[#4A3A33]" />
                    <span>Nuestra Sede en Sabaneta</span>
                  </span>
                  <h3 className="text-xl sm:text-4xl font-black text-[#4A3A33]">
                    Instalaciones Modernas en el C.C. Aves María
                  </h3>
                  <p className="text-xs sm:text-base text-[#4A3A33]/90 font-semibold leading-relaxed">
                    Nuestra sede fue diseñada pensando en la tranquilidad, privacidad y bienestar de nuestras pacientes y sus familias. Contamos con recepción acogedora, sala de espera confortable, consultorios dotados con tecnología ecográfica Samsung HERA HD Live, pantallas para acompañantes y sala de procedimientos.
                  </p>

                  <div className="p-4 sm:p-5 rounded-2xl bg-[#E6D9C8]/45 border border-[#E6D9C8] space-y-2.5 text-xs sm:text-sm font-bold text-[#4A3A33]">
                    <p className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#8FC1BB] shrink-0 mt-0.5" />
                      <span>
                        <strong>Dirección:</strong> {CONTACT_INFO.addressFull}
                      </span>
                    </p>
                    <p className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-[#8FC1BB] shrink-0" />
                      <span>
                        <strong>WhatsApp Asesoría:</strong>{" "}
                        {CONTACT_INFO.whatsappDisplay}
                      </span>
                    </p>
                    <p className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-[#D7A7A8] shrink-0" />
                      <span>
                        <strong>PBX Fijo:</strong> {CONTACT_INFO.pbxDisplay}
                      </span>
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {[
                      "Consultorios de Ginecología y Obstetricia",
                      "Sala de Ecografía 3D / 4D HD Live",
                      "Sala de Colposcopia y Procedimientos",
                      "Parqueadero Cubierto en C.C. Aves María",
                    ].map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2 text-xs font-extrabold text-[#4A3A33] bg-white/70 p-2.5 rounded-xl border border-[#E6D9C8]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#8FC1BB] shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-6 grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="col-span-2 relative h-48 sm:h-64 rounded-2xl overflow-hidden border border-[#E6D9C8] shadow-md">
                    <Image
                      src="/assets/images/header.jpg"
                      alt="Fachada y Recepción CediMujer C.C. Aves María Locales 341-342"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-[#4A3A33]/90 text-[#F7F2EC] text-[11px] sm:text-xs font-bold">
                      Recepción Principal · Local 341-342
                    </span>
                  </div>
                  <div className="relative h-36 sm:h-44 rounded-2xl overflow-hidden border border-[#E6D9C8] shadow-md">
                    <Image
                      src="/assets/images/equipo2.jpg"
                      alt="Consultorio Ecográfico con Pantalla para Acompañantes"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-[#4A3A33]/90 text-[#F7F2EC] text-[10px] font-bold">
                      Sala Ecografía HD
                    </span>
                  </div>
                  <div className="relative h-36 sm:h-44 rounded-2xl overflow-hidden border border-[#E6D9C8] shadow-md">
                    <Image
                      src="/assets/images/equipo1.jpg"
                      alt="Equipo de Ultrasonografía Avanzada CediMujer"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-[#4A3A33]/90 text-[#F7F2EC] text-[10px] font-bold">
                      3D/4D HD Live
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* 3. ESPECIALISTAS (Con acordeón limpio en celular para evitar bloques densos) */}
          {activeSubSection === "especialistas" && (
            <motion.div
              key="especialistas"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 sm:space-y-8"
            >
              <div className="text-center max-w-2xl mx-auto">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#CFE6E2] text-[#4A3A33] text-xs font-black uppercase tracking-wider mb-2">
                  <Award className="w-3.5 h-3.5 text-[#4A3A33]" />
                  <span>Nuestro Equipo Médico</span>
                </span>
                <h3 className="text-xl sm:text-4xl font-black text-[#4A3A33]">
                  Especialistas en Ginecología y Obstetricia
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-[#9A7B6C] font-semibold">
                  Profesionales de amplia trayectoria clínica comprometidos con un trato cálido, ético y riguroso.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                {ESPECIALISTAS_CEDIMUJER.map((doc) => {
                  const isExpandedMobile = expandedDoctorId === doc.id;
                  return (
                    <div
                      key={doc.id}
                      className="rounded-3xl bg-[#F7F2EC] border-2 border-[#E6D9C8] hover:border-[#8FC1BB] p-5 sm:p-8 shadow-lg transition-all flex flex-col justify-between gap-4 sm:gap-6"
                    >
                      <div className="space-y-3.5 sm:space-y-4">
                        <div className="flex items-center sm:items-start gap-3.5 sm:gap-4">
                          <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-[#8FC1BB] shrink-0 shadow-md bg-[#4A3A33]">
                            <Image
                              src={doc.image}
                              alt={doc.name}
                              fill
                              unoptimized
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#EBCFC6] text-[#4A3A33] text-[10px] font-black uppercase tracking-wider mb-1">
                              Especialista CediMujer
                            </span>
                            <h4 className="text-base sm:text-xl font-black text-[#4A3A33] leading-snug">
                              {doc.name}
                            </h4>
                            <p className="text-xs font-bold text-[#8FC1BB] mt-0.5">
                              {doc.role}
                            </p>
                          </div>
                        </div>

                        {/* Areas of focus (Always visible as clean tags) */}
                        <div className="flex flex-wrap gap-1.5">
                          {doc.specialties.map((spec, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 rounded-xl bg-[#CFE6E2]/50 border border-[#8FC1BB]/40 text-[11px] font-bold text-[#4A3A33]"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>

                        {/* Mobile Expand Toggle Button */}
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedDoctorId(
                              isExpandedMobile ? null : doc.id
                            )
                          }
                          className="sm:hidden w-full py-2 px-3 rounded-xl bg-white border border-[#E6D9C8] text-xs font-extrabold text-[#4A3A33] flex items-center justify-between"
                        >
                          <span>
                            {isExpandedMobile
                              ? "Ocultar trayectoria y títulos"
                              : "Ver perfil académico y trayectoria"}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-[#8FC1BB] transition-transform ${
                              isExpandedMobile ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {/* Bio & Credentials (Collapsible on mobile, always visible on sm+) */}
                        <div
                          className={`${
                            isExpandedMobile ? "block" : "hidden sm:block"
                          } space-y-3.5`}
                        >
                          <p className="text-xs sm:text-sm text-[#4A3A33]/90 font-semibold leading-relaxed">
                            {doc.bio}
                          </p>

                          <div className="p-3.5 rounded-2xl bg-white border border-[#E6D9C8] space-y-1.5">
                            <p className="text-[11px] font-black uppercase tracking-wider text-[#9A7B6C]">
                              Formación Académica y Títulos
                            </p>
                            <ul className="space-y-1">
                              {doc.credentials.map((cred, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-2 text-xs text-[#4A3A33] font-bold"
                                >
                                  <Award className="w-3.5 h-3.5 text-[#8FC1BB] shrink-0 mt-0.5" />
                                  <span>{cred}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          onOpenAppointment &&
                          onOpenAppointment(`Consulta con ${doc.name}`)
                        }
                        className="w-full py-3 px-4 rounded-2xl bg-[#8FC1BB] hover:bg-[#8FC1BB]/90 text-[#4A3A33] font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>
                          Agendar con {doc.name.split(" ").slice(0, 3).join(" ")}
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* 4. ASOCIACIÓN DE USUARIOS (Con pestañas en celular para evitar 3 listas largas seguidas) */}
          {activeSubSection === "asociacion-usuarios" && (
            <motion.div
              key="asociacion-usuarios"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-[#F7F2EC] rounded-3xl p-5 sm:p-10 border border-[#E6D9C8] shadow-xl space-y-6 sm:space-y-8"
            >
              <div className="max-w-3xl space-y-2.5 sm:space-y-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBCFC6] text-[#4A3A33] text-xs font-black uppercase tracking-wider">
                  <Users className="w-3.5 h-3.5 text-[#4A3A33]" />
                  <span>{INSTITUCION_INFO.asociacionUsuarios.subtitle}</span>
                </span>
                <h3 className="text-xl sm:text-4xl font-black text-[#4A3A33]">
                  {INSTITUCION_INFO.asociacionUsuarios.title}
                </h3>
                <p className="text-xs sm:text-base text-[#4A3A33]/90 font-semibold leading-relaxed">
                  {INSTITUCION_INFO.asociacionUsuarios.description}
                </p>
              </div>

              {/* Mobile Tabs for Funciones / Derechos / Deberes */}
              <div className="lg:hidden grid grid-cols-3 gap-1.5 p-1.5 rounded-2xl bg-[#E6D9C8]/50 border border-[#E6D9C8]">
                <button
                  type="button"
                  onClick={() => setAsociacionMobileTab("funciones")}
                  className={`py-2 px-2 rounded-xl text-xs font-extrabold transition-all ${
                    asociacionMobileTab === "funciones"
                      ? "bg-[#4A3A33] text-[#F7F2EC] shadow-xs"
                      : "text-[#4A3A33]"
                  }`}
                >
                  Funciones
                </button>
                <button
                  type="button"
                  onClick={() => setAsociacionMobileTab("derechos")}
                  className={`py-2 px-2 rounded-xl text-xs font-extrabold transition-all ${
                    asociacionMobileTab === "derechos"
                      ? "bg-[#4A3A33] text-[#F7F2EC] shadow-xs"
                      : "text-[#4A3A33]"
                  }`}
                >
                  Derechos
                </button>
                <button
                  type="button"
                  onClick={() => setAsociacionMobileTab("deberes")}
                  className={`py-2 px-2 rounded-xl text-xs font-extrabold transition-all ${
                    asociacionMobileTab === "deberes"
                      ? "bg-[#4A3A33] text-[#F7F2EC] shadow-xs"
                      : "text-[#4A3A33]"
                  }`}
                >
                  Deberes
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Funciones */}
                <div
                  className={`${
                    asociacionMobileTab === "funciones"
                      ? "block"
                      : "hidden lg:block"
                  } p-5 sm:p-6 rounded-2xl bg-white border border-[#E6D9C8] space-y-3`}
                >
                  <h4 className="text-sm sm:text-base font-black text-[#4A3A33] flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#8FC1BB]" />
                    <span>Funciones de la Asociación</span>
                  </h4>
                  <ul className="space-y-2.5">
                    {INSTITUCION_INFO.asociacionUsuarios.functions.map(
                      (fn, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs text-[#4A3A33] font-semibold leading-relaxed"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#8FC1BB] shrink-0 mt-0.5" />
                          <span>{fn}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* Derechos */}
                <div
                  className={`${
                    asociacionMobileTab === "derechos"
                      ? "block"
                      : "hidden lg:block"
                  } p-5 sm:p-6 rounded-2xl bg-[#CFE6E2]/35 border border-[#8FC1BB]/40 space-y-3`}
                >
                  <h4 className="text-sm sm:text-base font-black text-[#4A3A33] flex items-center gap-2">
                    <HeartHandshake className="w-5 h-5 text-[#4A3A33]" />
                    <span>Derechos de Nuestras Pacientes</span>
                  </h4>
                  <ul className="space-y-2.5">
                    {INSTITUCION_INFO.asociacionUsuarios.rights.map((r, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs text-[#4A3A33] font-semibold leading-relaxed"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#8FC1BB] shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deberes */}
                <div
                  className={`${
                    asociacionMobileTab === "deberes"
                      ? "block"
                      : "hidden lg:block"
                  } p-5 sm:p-6 rounded-2xl bg-[#EBCFC6]/35 border border-[#D7A7A8]/50 space-y-3`}
                >
                  <h4 className="text-sm sm:text-base font-black text-[#4A3A33] flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-[#4A3A33]" />
                    <span>Deberes de las Usuarias</span>
                  </h4>
                  <ul className="space-y-2.5">
                    {INSTITUCION_INFO.asociacionUsuarios.duties.map((d, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs text-[#4A3A33] font-semibold leading-relaxed"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#D7A7A8] shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#E6D9C8]/50 border border-[#E6D9C8] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h5 className="text-xs sm:text-base font-black text-[#4A3A33]">
                    ¿Deseas participar en la Asociación de Usuarios o enviar una sugerencia, testimonio o reclamo?
                  </h5>
                  <p className="text-xs text-[#9A7B6C] font-semibold mt-0.5">
                    Usa nuestro formulario oficial de Atención al Cliente o escríbenos a {CONTACT_INFO.email}.
                  </p>
                </div>
                <a
                  href="#atencion-cliente"
                  onClick={(e) => {
                    e.preventDefault();
                    window.dispatchEvent(
                      new CustomEvent("cedimujer:navigate", {
                        detail: { href: "#atencion-cliente", subKey: "sugerencias" },
                      })
                    );
                  }}
                  className="w-full sm:w-auto justify-center shrink-0 px-5 py-3 rounded-xl bg-[#4A3A33] hover:bg-[#4A3A33]/90 text-[#F7F2EC] text-xs font-extrabold flex items-center gap-2 shadow-sm"
                >
                  <MessageSquareHeart className="w-4 h-4 text-[#8FC1BB]" />
                  <span>Ir a Atención al Usuario</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
