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
}

type QuienesSomosTab =
  | "nuestra-institucion"
  | "nuestra-sede"
  | "especialistas"
  | "asociacion-usuarios";

export const About: React.FC<AboutProps> = ({ onOpenAppointment }) => {
  const [activeSubSection, setActiveSubSection] =
    useState<QuienesSomosTab>("nuestra-institucion");
  const [activePillar, setActivePillar] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1.0, 1.06]);

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
    icon: React.ElementType;
  }[] = [
    { id: "nuestra-institucion", label: "Nuestra Institución", icon: Building2 },
    { id: "nuestra-sede", label: "Nuestra Sede", icon: MapPin },
    { id: "especialistas", label: "Especialistas", icon: Stethoscope },
    { id: "asociacion-usuarios", label: "Asociación de usuarios", icon: Users },
  ];

  return (
    <section
      ref={sectionRef}
      id="nosotros"
      className="scroll-mt-20 py-16 sm:py-24 bg-[#E6D9C8]/50 text-[#4A3A33] relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#CFE6E2]/30 rounded-full [filter:blur(36px)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header + 4 Official Sub-Section Tabs */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBCFC6] border border-[#D7A7A8] text-[#4A3A33] text-xs font-black uppercase tracking-wider mb-3">
            <UserCheck className="w-4 h-4 text-[#8FC1BB]" />
            <span>Quiénes Somos · CediMujer Sabaneta</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#4A3A33] tracking-tight">
            Centro de Diagnóstico Especializado en{" "}
            <span className="text-[#8FC1BB]">Salud para la Mujer</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#9A7B6C] font-semibold">
            Desde mayo de 2008 cuidando integralmente a las mujeres de Medellín y el sur del Valle de Aburrá en todas las etapas de su vida.
          </p>
        </div>

        {/* Navigation Pills for the 4 Subsections of QUIÉNES SOMOS */}
        <div className="flex justify-center mb-10 sm:mb-14">
          <div className="grid grid-cols-2 lg:inline-flex p-1.5 rounded-2xl lg:rounded-full bg-[#F7F2EC] border-2 border-[#E6D9C8] gap-1.5 sm:gap-2 shadow-md w-full lg:w-auto">
            {subSectionButtons.map((btn) => {
              const IconComp = btn.icon;
              const isSelected = activeSubSection === btn.id;
              return (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => setActiveSubSection(btn.id)}
                  className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-xl lg:rounded-full text-xs sm:text-sm font-extrabold transition-all duration-300 ${
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
                  <span>{btn.label}</span>
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
              transition={{ duration: 0.35 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                {/* Left Images */}
                <div className="lg:col-span-6 relative">
                  <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#E6D9C8] h-[360px] sm:h-[500px]">
                    <motion.div style={{ scale: imageScale }} className="w-full h-full relative">
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

                  <div className="absolute top-5 left-5 z-20 bg-[#F7F2EC]/95 backdrop-blur-md border border-[#8FC1BB] p-3.5 rounded-2xl shadow-lg flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-white border border-[#8FC1BB]/40 flex items-center justify-center p-1 shrink-0">
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
                      <p className="text-base sm:text-lg font-black text-[#4A3A33]">Desde Mayo 2008</p>
                      <p className="text-xs text-[#9A7B6C] font-bold">Líderes en Ginecología y Ecografía</p>
                    </div>
                  </div>
                </div>

                {/* Right Text */}
                <div className="lg:col-span-6 space-y-5">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#CFE6E2] text-[#4A3A33] text-xs font-black uppercase tracking-wider">
                    {INSTITUCION_INFO.historyTitle}
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-black text-[#4A3A33] leading-tight">
                    Promoción, prevención y diagnóstico temprano en cada etapa femenina
                  </h3>

                  <div className="space-y-3 text-sm sm:text-base text-[#4A3A33]/90 font-medium leading-relaxed">
                    {INSTITUCION_INFO.historyParagraphs.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>

                  {/* Interactive Pillars */}
                  <div className="space-y-3 pt-2">
                    {pillars.map((pillar, idx) => {
                      const IconComp = pillar.icon;
                      const isActive = activePillar === idx;
                      return (
                        <div
                          key={pillar.title}
                          onClick={() => setActivePillar(idx)}
                          className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                            isActive
                              ? "bg-[#F7F2EC] border-[#8FC1BB] shadow-md"
                              : "bg-[#F7F2EC]/60 border-[#E6D9C8] hover:bg-[#F7F2EC]"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-xl ${
                                isActive
                                  ? "bg-[#8FC1BB] text-[#4A3A33]"
                                  : "bg-[#EBCFC6] text-[#4A3A33]"
                              }`}
                            >
                              <IconComp className="w-5 h-5" />
                            </div>
                            <h4 className="text-base font-extrabold text-[#4A3A33]">
                              {pillar.title}
                            </h4>
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
              transition={{ duration: 0.35 }}
              className="bg-[#F7F2EC] rounded-3xl p-6 sm:p-10 border border-[#E6D9C8] shadow-xl space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 space-y-5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8FC1BB]/30 text-[#4A3A33] text-xs font-black uppercase tracking-wider">
                    <MapPin className="w-3.5 h-3.5 text-[#4A3A33]" />
                    <span>Nuestra Sede en Sabaneta</span>
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-black text-[#4A3A33]">
                    Instalaciones Modernas en el Centro Comercial Aves María
                  </h3>
                  <p className="text-sm sm:text-base text-[#4A3A33]/90 font-semibold leading-relaxed">
                    Nuestra sede fue diseñada pensando en la tranquilidad, privacidad y bienestar de nuestras pacientes y sus familias. Contamos con recepción acogedora, sala de espera confortable, consultorios ginecológicos y obstétricos dotados con tecnología ecográfica Samsung HERA HD Live, pantallas de visualización para acompañantes y sala de procedimientos ambulatorios.
                  </p>

                  <div className="p-5 rounded-2xl bg-[#E6D9C8]/45 border border-[#E6D9C8] space-y-2.5 text-xs sm:text-sm font-bold text-[#4A3A33]">
                    <p className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#8FC1BB] shrink-0 mt-0.5" />
                      <span>
                        <strong>Dirección Oficial:</strong> {CONTACT_INFO.addressFull}
                      </span>
                    </p>
                    <p className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-[#8FC1BB] shrink-0" />
                      <span>
                        <strong>Teléfono Asesoría (Celular/WhatsApp):</strong>{" "}
                        {CONTACT_INFO.whatsappDisplay}
                      </span>
                    </p>
                    <p className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-[#D7A7A8] shrink-0" />
                      <span>
                        <strong>Teléfono Fijo (PBX):</strong> {CONTACT_INFO.pbxDisplay}
                      </span>
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                    {[
                      "Consultorios de Ginecología y Obstetricia",
                      "Sala de Ecografía 3D / 4D HD Live",
                      "Sala de Colposcopia y Procedimientos",
                      "Parqueadero Cubierto en C.C. Aves María",
                    ].map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-xs font-extrabold text-[#4A3A33]">
                        <CheckCircle2 className="w-4 h-4 text-[#8FC1BB] shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                  <div className="col-span-2 relative h-56 sm:h-64 rounded-2xl overflow-hidden border border-[#E6D9C8] shadow-md">
                    <Image
                      src="/assets/images/header.jpg"
                      alt="Fachada y Recepción CediMujer C.C. Aves María Locales 341-342"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-[#4A3A33]/90 text-[#F7F2EC] text-xs font-bold">
                      Recepción Principal · Local 341-342
                    </span>
                  </div>
                  <div className="relative h-44 rounded-2xl overflow-hidden border border-[#E6D9C8] shadow-md">
                    <Image
                      src="/assets/images/equipo2.jpg"
                      alt="Consultorio Ecográfico con Pantalla para Acompañantes"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#4A3A33]/90 text-[#F7F2EC] text-[10px] font-bold">
                      Sala de Ecografía HD
                    </span>
                  </div>
                  <div className="relative h-44 rounded-2xl overflow-hidden border border-[#E6D9C8] shadow-md">
                    <Image
                      src="/assets/images/equipo1.jpg"
                      alt="Equipo de Ultrasonografía Avanzada CediMujer"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#4A3A33]/90 text-[#F7F2EC] text-[10px] font-bold">
                      Tecnología 3D/4D HD Live
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* 3. ESPECIALISTAS */}
          {activeSubSection === "especialistas" && (
            <motion.div
              key="especialistas"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="space-y-8"
            >
              <div className="text-center max-w-2xl mx-auto">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#CFE6E2] text-[#4A3A33] text-xs font-black uppercase tracking-wider mb-2">
                  <Award className="w-3.5 h-3.5 text-[#4A3A33]" />
                  <span>Nuestro Equipo Médico</span>
                </span>
                <h3 className="text-2xl sm:text-4xl font-black text-[#4A3A33]">
                  Especialistas en Ginecología y Obstetricia
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#9A7B6C] font-semibold">
                  Profesionales de amplia trayectoria clínica comprometidos con un trato cálido, ético y riguroso.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {ESPECIALISTAS_CEDIMUJER.map((doc) => (
                  <div
                    key={doc.id}
                    className="rounded-3xl bg-[#F7F2EC] border-2 border-[#E6D9C8] hover:border-[#8FC1BB] p-6 sm:p-8 shadow-lg transition-all flex flex-col justify-between gap-6"
                  >
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-[#8FC1BB] shrink-0 shadow-md bg-[#4A3A33]">
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
                          <h4 className="text-lg sm:text-xl font-black text-[#4A3A33]">
                            {doc.name}
                          </h4>
                          <p className="text-xs font-bold text-[#8FC1BB] mt-0.5">
                            {doc.role}
                          </p>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-[#4A3A33]/90 font-semibold leading-relaxed">
                        {doc.bio}
                      </p>

                      {/* Credentials */}
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

                      {/* Areas of focus */}
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
                      <span>Agendar Cita con {doc.name.split(" ").slice(0, 3).join(" ")}</span>
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* 4. ASOCIACIÓN DE USUARIOS */}
          {activeSubSection === "asociacion-usuarios" && (
            <motion.div
              key="asociacion-usuarios"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="bg-[#F7F2EC] rounded-3xl p-6 sm:p-10 border border-[#E6D9C8] shadow-xl space-y-8"
            >
              <div className="max-w-3xl space-y-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBCFC6] text-[#4A3A33] text-xs font-black uppercase tracking-wider">
                  <Users className="w-3.5 h-3.5 text-[#4A3A33]" />
                  <span>{INSTITUCION_INFO.asociacionUsuarios.subtitle}</span>
                </span>
                <h3 className="text-2xl sm:text-4xl font-black text-[#4A3A33]">
                  {INSTITUCION_INFO.asociacionUsuarios.title}
                </h3>
                <p className="text-sm sm:text-base text-[#4A3A33]/90 font-semibold leading-relaxed">
                  {INSTITUCION_INFO.asociacionUsuarios.description}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Funciones */}
                <div className="p-6 rounded-2xl bg-white border border-[#E6D9C8] space-y-3">
                  <h4 className="text-base font-black text-[#4A3A33] flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#8FC1BB]" />
                    <span>Funciones de la Asociación</span>
                  </h4>
                  <ul className="space-y-2.5">
                    {INSTITUCION_INFO.asociacionUsuarios.functions.map((fn, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[#4A3A33] font-semibold leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-[#8FC1BB] shrink-0 mt-0.5" />
                        <span>{fn}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Derechos */}
                <div className="p-6 rounded-2xl bg-[#CFE6E2]/35 border border-[#8FC1BB]/40 space-y-3">
                  <h4 className="text-base font-black text-[#4A3A33] flex items-center gap-2">
                    <HeartHandshake className="w-5 h-5 text-[#4A3A33]" />
                    <span>Derechos de Nuestras Pacientes</span>
                  </h4>
                  <ul className="space-y-2.5">
                    {INSTITUCION_INFO.asociacionUsuarios.rights.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[#4A3A33] font-semibold leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-[#8FC1BB] shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deberes */}
                <div className="p-6 rounded-2xl bg-[#EBCFC6]/35 border border-[#D7A7A8]/50 space-y-3">
                  <h4 className="text-base font-black text-[#4A3A33] flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-[#4A3A33]" />
                    <span>Deberes de las Usuarias</span>
                  </h4>
                  <ul className="space-y-2.5">
                    {INSTITUCION_INFO.asociacionUsuarios.duties.map((d, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[#4A3A33] font-semibold leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-[#D7A7A8] shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#E6D9C8]/50 border border-[#E6D9C8] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h5 className="text-sm sm:text-base font-black text-[#4A3A33]">
                    ¿Deseas participar en la Asociación de Usuarios o enviar una sugerencia, testimonio o reclamo?
                  </h5>
                  <p className="text-xs text-[#9A7B6C] font-semibold mt-0.5">
                    Usa nuestro formulario oficial de Atención al Cliente o escríbenos a {CONTACT_INFO.email}.
                  </p>
                </div>
                <a
                  href="#atencion-cliente"
                  className="shrink-0 px-5 py-3 rounded-xl bg-[#4A3A33] hover:bg-[#4A3A33]/90 text-[#F7F2EC] text-xs font-extrabold flex items-center gap-2 shadow-sm"
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
