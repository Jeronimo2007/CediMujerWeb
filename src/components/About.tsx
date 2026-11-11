"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  HeartHandshake,
  Microscope,
  CheckCircle2,
  Building2,
  MapPin,
  Users,
  Stethoscope,
  Phone,
  Award,
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
  const [expandedDoctorId, setExpandedDoctorId] = useState<string | null>(null);
  const [asociacionMobileTab, setAsociacionMobileTab] = useState<
    "funciones" | "derechos" | "deberes"
  >("funciones");

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
      title: "Empatía y Calidez",
      icon: HeartHandshake,
      desc: "Explicación clara y acompañamiento humano.",
    },
    {
      title: "3D/4D HD Live",
      icon: Microscope,
      desc: "Ultrasonido obstétrico y ginecológico de alta resolución.",
    },
    {
      title: "Sede Aves María",
      icon: ShieldCheck,
      desc: "Consultorios privados y confortables en Sabaneta.",
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
      shortLabel: "Sede",
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
      label: "Asociación de Usuarios",
      shortLabel: "Asociación",
      icon: Users,
    },
  ];

  return (
    <section
      id="nosotros"
      className={`scroll-mt-20 ${
        isStandalonePage ? "py-4 sm:py-10" : "py-12 sm:py-20"
      } text-[#4A3A33] relative overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Minimalist Section Header */}
        {!isStandalonePage && (
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
            <span className="inline-block text-[10px] font-medium uppercase tracking-[0.22em] text-[#9A7B6C] mb-2">
              Quiénes Somos · Desde 2008
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#4A3A33] tracking-tight">
              Salud femenina con <span className="italic text-[#9A7B6C]">sentido humano</span>
            </h2>
          </div>
        )}

        {/* Pastel Pink Navigation Pills */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="grid grid-cols-2 lg:inline-flex p-1.5 rounded-2xl lg:rounded-full bg-[#F9EAEA] border border-[#F3D9D9] gap-1.5 w-full lg:w-auto">
            {subSectionButtons.map((btn) => {
              const IconComp = btn.icon;
              const isSelected = activeSubSection === btn.id;
              return (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => setActiveSubSection(btn.id)}
                  className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 rounded-xl lg:rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                    isSelected
                      ? "bg-[#4A3A33] text-[#FDF6F6]"
                      : "text-[#4A3A33]/80 hover:text-[#4A3A33] hover:bg-white/60"
                  }`}
                >
                  <IconComp
                    className={`w-3.5 h-3.5 shrink-0 stroke-[1.75] ${
                      isSelected ? "text-[#F7D6D6]" : "text-[#D7A7A8]"
                    }`}
                  />
                  <span className="sm:hidden truncate">{btn.shortLabel}</span>
                  <span className="hidden sm:inline">{btn.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* 1. NUESTRA INSTITUCIÓN */}
          {activeSubSection === "nuestra-institucion" && (
            <motion.div
              key="nuestra-institucion"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center">
                <div className="lg:col-span-6 relative">
                  <div className="relative rounded-[1.75rem] overflow-hidden border border-[#F3D9D9] h-60 sm:h-80 shadow-sm">
                    <Image
                      src={ASSETS.about.mainImage}
                      alt="Equipo Médico CediMujer"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#4A3A33]/40 via-transparent to-transparent" />
                    <div className="absolute bottom-3.5 left-3.5 bg-[#FDF6F6]/95 backdrop-blur-md px-3.5 py-2 rounded-xl flex items-center gap-2.5 border border-[#F3D9D9]">
                      <Image
                        src={ASSETS.logo.emblem}
                        alt="Emblema CediMujer"
                        width={24}
                        height={24}
                        unoptimized
                        className="object-contain"
                      />
                      <span className="font-serif text-xs sm:text-sm text-[#4A3A33]">
                        CediMujer · Desde Mayo 2008
                      </span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 space-y-5">
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#4A3A33] leading-snug">
                    Promoción, prevención y diagnóstico temprano en cada etapa
                  </h3>

                  <p className="text-xs sm:text-sm text-[#4A3A33]/80 font-normal leading-relaxed">
                    Acompañamos a las mujeres de Medellín y el sur del Valle de Aburrá con tecnología de vanguardia y especialistas comprometidos con tu tranquilidad.
                  </p>

                  {/* 3 Visual Pastel Pink Pillar Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {pillars.map((pillar) => {
                      const IconComp = pillar.icon;
                      return (
                        <div
                          key={pillar.title}
                          className="p-4 rounded-2xl bg-[#F9EAEA]/80 border border-[#F3D9D9] space-y-1.5"
                        >
                          <IconComp className="w-4 h-4 text-[#D7A7A8] stroke-[1.75]" />
                          <h4 className="font-serif text-sm sm:text-base text-[#4A3A33]">
                            {pillar.title}
                          </h4>
                          <p className="text-[11px] text-[#9A7B6C] leading-snug">
                            {pillar.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <InstitutionalPhilosophy />
            </motion.div>
          )}

          {/* 2. NUESTRA SEDE */}
          {activeSubSection === "nuestra-sede" && (
            <motion.div
              key="nuestra-sede"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center"
            >
              <div className="lg:col-span-5 space-y-4">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-[#9A7B6C]">
                  <MapPin className="w-3.5 h-3.5 text-[#D7A7A8]" />
                  <span>C.C. Aves María · Local 341-342</span>
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#4A3A33]">
                  Sede Sabaneta
                </h3>
                <p className="text-xs sm:text-sm text-[#4A3A33]/80 leading-relaxed">
                  {CONTACT_INFO.addressFull}. Consultorios privados, sala de ecografía 3D/4D HD Live con pantalla para acompañantes y parqueadero cubierto.
                </p>

                <div className="flex flex-wrap gap-2.5 pt-1">
                  <a
                    href={CONTACT_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-full bg-[#4A3A33] text-[#FDF6F6] text-xs font-medium inline-flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#F7D6D6]" />
                    <span>WhatsApp: {CONTACT_INFO.whatsappDisplay}</span>
                  </a>
                  <a
                    href={CONTACT_INFO.pbxTel}
                    className="px-4 py-2.5 rounded-full bg-[#F9EAEA] border border-[#F3D9D9] text-[#4A3A33] text-xs font-medium inline-flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#D7A7A8]" />
                    <span>PBX: {CONTACT_INFO.pbxDisplay}</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-2 gap-3 sm:gap-4">
                <div className="col-span-2 relative h-44 sm:h-56 rounded-[1.5rem] overflow-hidden border border-[#F3D9D9]">
                  <Image
                    src="/assets/images/header.jpg"
                    alt="Recepción CediMujer"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-[#FDF6F6]/95 text-[#4A3A33] text-[10px] font-medium">
                    Recepción · Local 341-342
                  </span>
                </div>
                <div className="relative h-32 sm:h-40 rounded-[1.25rem] overflow-hidden border border-[#F3D9D9]">
                  <Image
                    src="/assets/images/equipo2.jpg"
                    alt="Sala Ecografía HD"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#FDF6F6]/95 text-[#4A3A33] text-[10px] font-medium">
                    Sala Ecografía HD
                  </span>
                </div>
                <div className="relative h-32 sm:h-40 rounded-[1.25rem] overflow-hidden border border-[#F3D9D9]">
                  <Image
                    src="/assets/images/sala1.jpg"
                    alt="Consultorio"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#FDF6F6]/95 text-[#4A3A33] text-[10px] font-medium">
                    Consultorios
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* 3. ESPECIALISTAS */}
          {activeSubSection === "especialistas" && (
            <motion.div
              key="especialistas"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
            >
              {ESPECIALISTAS_CEDIMUJER.map((doc) => {
                const isExpanded = expandedDoctorId === doc.id;
                return (
                  <div
                    key={doc.id}
                    className="rounded-[1.75rem] bg-white/85 border border-[#F3D9D9] p-5 sm:p-6 flex flex-col justify-between gap-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-3.5">
                        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border border-[#F3D9D9] shrink-0 bg-[#F9EAEA]">
                          <Image
                            src={doc.image}
                            alt={doc.name}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-serif text-base sm:text-xl font-normal text-[#4A3A33] leading-snug truncate">
                            {doc.name}
                          </h4>
                          <p className="text-[11px] font-medium text-[#9A7B6C] mt-0.5">
                            {doc.role}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {doc.specialties.slice(0, 3).map((spec, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-full bg-[#F9EAEA] text-[10px] font-medium text-[#4A3A33]"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setExpandedDoctorId(isExpanded ? null : doc.id)
                        }
                        className="w-full py-1.5 text-[11px] font-medium text-[#9A7B6C] hover:text-[#4A3A33] flex items-center justify-between border-t border-[#F3D9D9]/70"
                      >
                        <span>
                          {isExpanded ? "Ocultar títulos" : "Ver formación académica"}
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
                              className="flex items-start gap-2 text-[11px] text-[#4A3A33]/85"
                            >
                              <Award className="w-3.5 h-3.5 text-[#D7A7A8] shrink-0 mt-0.5" />
                              <span>{cred}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        onOpenAppointment &&
                        onOpenAppointment(`Consulta con ${doc.name}`)
                      }
                      className="w-full py-2.5 px-4 rounded-full bg-[#F9EAEA] hover:bg-[#4A3A33] text-[#4A3A33] hover:text-[#FDF6F6] border border-[#F3D9D9] font-medium text-xs transition-all flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#D7A7A8]" />
                      <span>
                        ( Agendar con {doc.name.split(" ").slice(0, 2).join(" ")} )
                      </span>
                    </button>
                  </div>
                );
              })}
            </motion.div>
          )}

          {/* 4. ASOCIACIÓN DE USUARIOS */}
          {activeSubSection === "asociacion-usuarios" && (
            <motion.div
              key="asociacion-usuarios"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Mobile Tabs */}
              <div className="lg:hidden grid grid-cols-3 gap-1 p-1 rounded-full bg-[#F9EAEA] border border-[#F3D9D9]">
                {(["funciones", "derechos", "deberes"] as const).map((tabKey) => (
                  <button
                    key={tabKey}
                    type="button"
                    onClick={() => setAsociacionMobileTab(tabKey)}
                    className={`py-2 px-2 rounded-full text-xs font-medium capitalize transition-all ${
                      asociacionMobileTab === tabKey
                        ? "bg-[#4A3A33] text-[#FDF6F6]"
                        : "text-[#4A3A33]/80"
                    }`}
                  >
                    {tabKey}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div
                  className={`${
                    asociacionMobileTab === "funciones" ? "block" : "hidden lg:block"
                  } p-5 sm:p-6 rounded-[1.75rem] bg-white/85 border border-[#F3D9D9] space-y-3`}
                >
                  <h4 className="font-serif text-lg text-[#4A3A33] pb-2 border-b border-[#F3D9D9]">
                    Funciones
                  </h4>
                  <ul className="space-y-2">
                    {INSTITUCION_INFO.asociacionUsuarios.functions
                      .slice(0, 4)
                      .map((fn, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs text-[#4A3A33]/85"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#D7A7A8] shrink-0 mt-0.5" />
                          <span>{fn}</span>
                        </li>
                      ))}
                  </ul>
                </div>

                <div
                  className={`${
                    asociacionMobileTab === "derechos" ? "block" : "hidden lg:block"
                  } p-5 sm:p-6 rounded-[1.75rem] bg-white/85 border border-[#F3D9D9] space-y-3`}
                >
                  <h4 className="font-serif text-lg text-[#4A3A33] pb-2 border-b border-[#F3D9D9]">
                    Derechos de la Paciente
                  </h4>
                  <ul className="space-y-2">
                    {INSTITUCION_INFO.asociacionUsuarios.rights
                      .slice(0, 4)
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

                <div
                  className={`${
                    asociacionMobileTab === "deberes" ? "block" : "hidden lg:block"
                  } p-5 sm:p-6 rounded-[1.75rem] bg-white/85 border border-[#F3D9D9] space-y-3`}
                >
                  <h4 className="font-serif text-lg text-[#4A3A33] pb-2 border-b border-[#F3D9D9]">
                    Deberes de la Usuaria
                  </h4>
                  <ul className="space-y-2">
                    {INSTITUCION_INFO.asociacionUsuarios.duties
                      .slice(0, 4)
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
    </section>
  );
};
