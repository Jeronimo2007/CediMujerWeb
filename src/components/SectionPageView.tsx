"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Baby,
  Stethoscope,
  Video,
  Building2,
  BookOpen,
  MessageSquareHeart,
  Calendar,
  Phone,
  CheckCircle2,
  Info,
  Microscope,
  Sparkles,
  Clock,
  UserCheck,
  Calculator,
  HeartPulse,
  Activity,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import {
  EMBARAZO_SERVICES,
  GINECOLOGIA_SERVICES,
  TELEMEDICINA_SERVICES,
  CONTACT_INFO,
  ServiceItemDetail,
} from "@/config/cedimujerContent";
import { About } from "@/components/About";
import { BlogAndFaq } from "@/components/BlogAndFaq";
import { LocationMap } from "@/components/LocationMap";
import { Testimonials } from "@/components/Testimonials";

export type AppSectionView =
  | "home"
  | "embarazo"
  | "ginecologia"
  | "telemedicina"
  | "quienes-somos"
  | "blog"
  | "contacto"
  | "calculator";

interface SectionPageViewProps {
  view: Exclude<AppSectionView, "home" | "calculator">;
  initialSubKey?: string;
  initialItemId?: string;
  onBackToHome: () => void;
  onChangeView: (
    nextView: AppSectionView,
    subKey?: string,
    itemId?: string
  ) => void;
  onOpenAppointment: (serviceName?: string) => void;
  onOpenCalculator: () => void;
}

export const SectionPageView: React.FC<SectionPageViewProps> = ({
  view,
  initialSubKey,
  initialItemId,
  onBackToHome,
  onChangeView,
  onOpenAppointment,
  onOpenCalculator,
}) => {
  // State for Embarazo subsections
  const [embarazoSub, setEmbarazoSub] = useState<
    "consultas" | "bienestar" | "ecografias"
  >("consultas");

  // State for Ginecologia subsections
  const [ginecologiaSub, setGinecologiaSub] = useState<
    "ecografias" | "consultas" | "tamizajes" | "procedimientos"
  >("ecografias");

  // Currently selected featured item for deep spotlight view
  const [selectedItem, setSelectedItem] = useState<ServiceItemDetail | null>(
    null
  );

  // Sync sub-section and featured item whenever props change
  useEffect(() => {
    if (view === "embarazo") {
      let targetSub: "consultas" | "bienestar" | "ecografias" = "consultas";
      if (initialSubKey === "embarazo-bienestar") targetSub = "bienestar";
      else if (initialSubKey === "embarazo-ecografias") targetSub = "ecografias";
      else if (initialSubKey === "embarazo-consultas") targetSub = "consultas";

      setEmbarazoSub(targetSub);

      const list =
        targetSub === "consultas"
          ? EMBARAZO_SERVICES.consultas
          : targetSub === "bienestar"
          ? EMBARAZO_SERVICES.bienestarFetal
          : EMBARAZO_SERVICES.ecografias;

      if (initialItemId) {
        const allEmb = [
          ...EMBARAZO_SERVICES.consultas,
          ...EMBARAZO_SERVICES.bienestarFetal,
          ...EMBARAZO_SERVICES.ecografias,
        ];
        const found = allEmb.find((i) => i.id === initialItemId);
        if (found) {
          setSelectedItem(found);
          return;
        }
      }
      setSelectedItem(list[0] || null);
    } else if (view === "ginecologia") {
      let targetSub:
        | "ecografias"
        | "consultas"
        | "tamizajes"
        | "procedimientos" = "ecografias";
      if (initialSubKey === "ginecologia-consultas") targetSub = "consultas";
      else if (initialSubKey === "ginecologia-tamizajes")
        targetSub = "tamizajes";
      else if (initialSubKey === "ginecologia-procedimientos")
        targetSub = "procedimientos";
      else if (initialSubKey === "ginecologia-ecografias")
        targetSub = "ecografias";

      setGinecologiaSub(targetSub);

      const list =
        targetSub === "ecografias"
          ? GINECOLOGIA_SERVICES.ecografias
          : targetSub === "consultas"
          ? GINECOLOGIA_SERVICES.consultas
          : targetSub === "tamizajes"
          ? GINECOLOGIA_SERVICES.tamizajes
          : GINECOLOGIA_SERVICES.procedimientos;

      if (initialItemId) {
        const allGin = [
          ...GINECOLOGIA_SERVICES.ecografias,
          ...GINECOLOGIA_SERVICES.consultas,
          ...GINECOLOGIA_SERVICES.tamizajes,
          ...GINECOLOGIA_SERVICES.procedimientos,
        ];
        const found = allGin.find((i) => i.id === initialItemId);
        if (found) {
          setSelectedItem(found);
          return;
        }
      }
      setSelectedItem(list[0] || null);
    } else if (view === "telemedicina") {
      if (initialItemId) {
        const found = TELEMEDICINA_SERVICES.find((i) => i.id === initialItemId);
        if (found) {
          setSelectedItem(found);
          return;
        }
      }
      setSelectedItem(TELEMEDICINA_SERVICES[0] || null);
    } else if (
      view === "quienes-somos" ||
      view === "blog" ||
      view === "contacto"
    ) {
      setTimeout(() => {
        window.dispatchEvent(
          new CustomEvent("cedimujer:navigate", {
            detail: {
              subKey: initialSubKey,
              itemId: initialItemId,
            },
          })
        );
      }, 60);
    }
  }, [view, initialSubKey, initialItemId]);

  const handleSelectEmbarazoSub = (
    sub: "consultas" | "bienestar" | "ecografias"
  ) => {
    setEmbarazoSub(sub);
    const list =
      sub === "consultas"
        ? EMBARAZO_SERVICES.consultas
        : sub === "bienestar"
        ? EMBARAZO_SERVICES.bienestarFetal
        : EMBARAZO_SERVICES.ecografias;
    setSelectedItem(list[0] || null);
  };

  const handleSelectGinecologiaSub = (
    sub: "ecografias" | "consultas" | "tamizajes" | "procedimientos"
  ) => {
    setGinecologiaSub(sub);
    const list =
      sub === "ecografias"
        ? GINECOLOGIA_SERVICES.ecografias
        : sub === "consultas"
        ? GINECOLOGIA_SERVICES.consultas
        : sub === "tamizajes"
        ? GINECOLOGIA_SERVICES.tamizajes
        : GINECOLOGIA_SERVICES.procedimientos;
    setSelectedItem(list[0] || null);
  };

  // Top Banner Configuration per Section
  const bannerConfig: Record<
    Exclude<AppSectionView, "home" | "calculator">,
    {
      badge: string;
      title: string;
      subtitle: string;
      image: string;
      icon: React.ElementType;
      accentBg: string;
    }
  > = {
    embarazo: {
      badge: "Unidad de Medicina Materno-Fetal y Obstetricia",
      title: "Embarazo: Consultas, Bienestar Fetal y Ecografías 3D/4D HD",
      subtitle:
        "Acompañamiento médico integral y humanizado en cada semana de tu gestación. Conoce en detalle nuestras consultas prenatales, pruebas de bienestar fetal, ecografías de tercer nivel y calculadora obstétrica.",
      image: "/assets/images/equipo2.jpg",
      icon: Baby,
      accentBg: "from-[#CFE6E2]/70 via-[#F7F2EC] to-[#EBCFC6]/50",
    },
    ginecologia: {
      badge: "Unidad de Ginecología Integral y Diagnóstico",
      title: "Ginecología: Ecografías, Consultas, Tamizajes y Procedimientos",
      subtitle:
        "Cuidado especializado para cada etapa de la vida de la mujer. Explora qué es cada ecografía, consulta, paquete de tamizaje y procedimiento ambulatorio, y cómo los realiza el equipo de CediMujer.",
      image: "/assets/images/sala1.jpg",
      icon: Stethoscope,
      accentBg: "from-[#EBCFC6]/65 via-[#F7F2EC] to-[#E6D9C8]/60",
    },
    telemedicina: {
      badge: "Atención Médica Virtual CediMujer",
      title: "Telemedicina con Especialistas en Ginecología",
      subtitle:
        "Orientación médica especializada, lectura de exámenes, planificación familiar y asesoría en fertilidad por videollamada desde la comodidad y privacidad de tu hogar.",
      image: "/assets/images/trabajo.jpg",
      icon: Video,
      accentBg: "from-[#E6D9C8]/70 via-[#F7F2EC] to-[#CFE6E2]/60",
    },
    "quienes-somos": {
      badge: "Institución · Sede Sabaneta · Especialistas · Usuarios",
      title: "Quiénes Somos · Conoce CediMujer",
      subtitle:
        "Desde mayo de 2008 brindando diagnóstico especializado en salud para la mujer en el Centro Comercial Aves María (Locales 341-342), Sabaneta.",
      image: "/assets/images/header.jpg",
      icon: Building2,
      accentBg: "from-[#E6D9C8]/70 via-[#F7F2EC] to-[#EBCFC6]/50",
    },
    blog: {
      badge: "Educación Médica y Prevención Femenina",
      title: "Información, Blog y Preguntas Frecuentes",
      subtitle:
        "Artículos informativos redactados por nuestros especialistas para guiar a nuestras pacientes en el cuidado de su salud ginecológica, mamaria y prenatal.",
      image: "/assets/images/equipo1.jpg",
      icon: BookOpen,
      accentBg: "from-[#CFE6E2]/65 via-[#F7F2EC] to-[#E6D9C8]/55",
    },
    contacto: {
      badge: "Canales Oficiales de Atención al Usuario",
      title: "Contacto, Ubicación y Atención al Cliente",
      subtitle:
        "Comunícate a nuestra línea de Asesoría WhatsApp +57 311 397 9905, PBX +604 357 3010 o visítanos en el C.C. Aves María, Locales 341-342 (Sabaneta).",
      image: "/assets/images/header.jpg",
      icon: MessageSquareHeart,
      accentBg: "from-[#EBCFC6]/60 via-[#F7F2EC] to-[#CFE6E2]/60",
    },
  };

  const currentBanner = bannerConfig[view];
  const BannerIcon = currentBanner.icon;

  // Helper to render the Master-Detail Interactive Clinical Explorer for Embarazo, Ginecologia, Telemedicina
  const renderInteractiveClinicalWorkspace = (
    items: ServiceItemDetail[],
    subsectionTitle: string,
    subsectionDescription: string
  ) => {
    const active = selectedItem && items.some((i) => i.id === selectedItem.id)
      ? selectedItem
      : items[0];

    return (
      <div className="space-y-12">
        {/* Master-Detail Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive List of Items in this Subsection */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-5 sm:p-6 border-2 border-[#E6D9C8] shadow-lg space-y-4 lg:sticky lg:top-24">
            <div className="pb-3 border-b border-[#E6D9C8]">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#8FC1BB]">
                Subsección Activa
              </span>
              <h3 className="text-lg sm:text-xl font-black text-[#4A3A33] mt-0.5">
                {subsectionTitle}
              </h3>
              <p className="text-xs text-[#9A7B6C] font-semibold mt-1">
                {subsectionDescription}
              </p>
            </div>

            <div className="space-y-2">
              {items.map((item, idx) => {
                const isSelected = active?.id === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedItem(item)}
                    className={`w-full text-left p-3.5 rounded-2xl transition-all duration-200 flex items-center justify-between gap-3 border ${
                      isSelected
                        ? "bg-[#4A3A33] text-[#F7F2EC] border-[#4A3A33] shadow-md scale-[1.01]"
                        : "bg-[#F7F2EC] text-[#4A3A33] border-[#E6D9C8] hover:bg-[#CFE6E2]/45 hover:border-[#8FC1BB]"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`w-7 h-7 rounded-xl text-xs font-black flex items-center justify-center shrink-0 ${
                          isSelected
                            ? "bg-[#8FC1BB] text-[#4A3A33]"
                            : "bg-[#E6D9C8] text-[#4A3A33]"
                        }`}
                      >
                        0{idx + 1}
                      </span>
                      <span className="text-xs sm:text-sm font-extrabold leading-snug truncate">
                        {item.title}
                      </span>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isSelected
                          ? "text-[#8FC1BB] translate-x-0.5"
                          : "text-[#9A7B6C]"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Direct WhatsApp Assistance Box */}
            <div className="p-4 rounded-2xl bg-[#CFE6E2]/40 border border-[#8FC1BB]/50 space-y-2">
              <p className="text-xs font-extrabold text-[#4A3A33]">
                ¿Necesitas orientación sobre estos servicios?
              </p>
              <p className="text-[11px] text-[#9A7B6C] font-semibold">
                Nuestra línea de Asesoría responde tus inquietudes sobre preparación y tarifas:
              </p>
              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-[#4A3A33] hover:bg-[#4A3A33]/90 text-[#F7F2EC] text-xs font-extrabold flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#8FC1BB]" />
                <span>WhatsApp: {CONTACT_INFO.whatsappDisplay}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Full Detailed Medical Sheet of Selected Item */}
          {active && (
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white rounded-[2rem] border-2 border-[#E6D9C8] shadow-xl overflow-hidden"
                >
                  {/* Large Feature Image Header */}
                  <div className="relative h-64 sm:h-80 lg:h-96 bg-[#4A3A33]">
                    <Image
                      src={active.image}
                      alt={active.title}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#4A3A33] via-[#4A3A33]/35 to-transparent" />

                    <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
                      <span className="px-3.5 py-1.5 rounded-full bg-[#8FC1BB] text-[#4A3A33] text-xs font-black uppercase tracking-wider shadow-md">
                        {active.subcategory}
                      </span>

                      {active.durationOrTiming && (
                        <span className="px-3.5 py-1.5 rounded-full bg-[#4A3A33]/90 text-[#F7F2EC] text-xs font-bold flex items-center gap-1.5 border border-[#E6D9C8]/40">
                          <Clock className="w-3.5 h-3.5 text-[#8FC1BB]" />
                          {active.durationOrTiming}
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-6 left-6 right-6">
                      <h2 className="text-2xl sm:text-4xl font-black text-[#F7F2EC] leading-tight">
                        {active.title}
                      </h2>
                      <p className="mt-2 text-xs sm:text-base text-[#E6D9C8] font-semibold max-w-2xl">
                        {active.shortDescription}
                      </p>
                    </div>
                  </div>

                  {/* Detailed Explanatory Sections */}
                  <div className="p-6 sm:p-10 space-y-8">
                    {/* Specialist Banner */}
                    <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#F7F2EC] border border-[#E6D9C8]">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-[#8FC1BB] text-[#4A3A33]">
                          <UserCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-[#9A7B6C] block">
                            Equipo Médico Responsable
                          </span>
                          <p className="text-xs sm:text-sm font-extrabold text-[#4A3A33]">
                            {active.recommendedSpecialist}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onOpenAppointment(active.title)}
                        className="px-5 py-2.5 rounded-xl bg-[#8FC1BB] hover:bg-[#8FC1BB]/90 text-[#4A3A33] font-black text-xs flex items-center gap-2 shadow-sm transition-all"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Agendar este servicio</span>
                      </button>
                    </div>

                    {/* 1. ¿Qué es y para qué sirve? */}
                    <div className="p-6 rounded-3xl bg-[#F7F2EC] border border-[#E6D9C8] space-y-3">
                      <div className="flex items-center gap-2.5 text-sm sm:text-base font-black text-[#4A3A33] uppercase tracking-wider">
                        <div className="p-2 rounded-xl bg-[#CFE6E2] text-[#4A3A33]">
                          <Info className="w-5 h-5" />
                        </div>
                        <span>¿Qué es y en qué consiste {active.title.toLowerCase()}?</span>
                      </div>
                      <p className="text-sm sm:text-base text-[#4A3A33]/90 font-semibold leading-relaxed">
                        {active.whatIsIt}
                      </p>
                    </div>

                    {/* 2. ¿Cómo se realiza en CediMujer? */}
                    <div className="p-6 rounded-3xl bg-gradient-to-br from-[#CFE6E2]/35 to-[#EBCFC6]/25 border border-[#8FC1BB]/50 space-y-3">
                      <div className="flex items-center gap-2.5 text-sm sm:text-base font-black text-[#4A3A33] uppercase tracking-wider">
                        <div className="p-2 rounded-xl bg-[#8FC1BB] text-[#4A3A33]">
                          <Microscope className="w-5 h-5" />
                        </div>
                        <span>¿Cómo se realiza paso a paso según el equipo de CediMujer?</span>
                      </div>
                      <p className="text-sm sm:text-base text-[#4A3A33]/90 font-semibold leading-relaxed">
                        {active.howItIsDone}
                      </p>
                    </div>

                    {/* 3. Preparación e Indicaciones + Beneficios */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-5 rounded-2xl bg-[#F7F2EC] border border-[#E6D9C8] space-y-3">
                        <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#4A3A33] flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-[#8FC1BB]" />
                          <span>Preparación e Indicaciones</span>
                        </h4>
                        <ul className="space-y-2.5">
                          {active.preparationAndIndications.map((prep, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4A3A33] font-semibold leading-relaxed"
                            >
                              <CheckCircle2 className="w-4 h-4 text-[#8FC1BB] shrink-0 mt-0.5" />
                              <span>{prep}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-5 rounded-2xl bg-[#EBCFC6]/30 border border-[#D7A7A8]/50 space-y-3">
                        <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#4A3A33] flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-[#4A3A33]" />
                          <span>Ventajas en CediMujer Sabaneta</span>
                        </h4>
                        <ul className="space-y-2.5">
                          {active.highlights.map((hl, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4A3A33] font-semibold leading-relaxed"
                            >
                              <CheckCircle2 className="w-4 h-4 text-[#4A3A33] shrink-0 mt-0.5" />
                              <span>{hl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Bottom CTA Action Bar */}
                    <div className="pt-4 border-t border-[#E6D9C8] flex flex-col sm:flex-row gap-3">
                      <button
                        type="button"
                        onClick={() => onOpenAppointment(active.title)}
                        className="flex-1 py-4 px-6 rounded-2xl bg-[#8FC1BB] hover:bg-[#8FC1BB]/90 text-[#4A3A33] font-black text-sm shadow-lg shadow-[#8FC1BB]/25 flex items-center justify-center gap-2 transition-all"
                      >
                        <Calendar className="w-5 h-5" />
                        <span>Agendar Cita para {active.title}</span>
                      </button>

                      <a
                        href={`https://wa.me/${
                          CONTACT_INFO.whatsappRaw
                        }?text=${encodeURIComponent(
                          `Hola CediMujer, deseo recibir asesoría o agendar el servicio de: ${active.title}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-4 px-6 rounded-2xl bg-[#4A3A33] hover:bg-[#4A3A33]/90 text-[#F7F2EC] font-black text-sm shadow-lg flex items-center justify-center gap-2 transition-all"
                      >
                        <Phone className="w-4 h-4 text-[#8FC1BB]" />
                        <span>Consultar por WhatsApp ({CONTACT_INFO.whatsappDisplay})</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Complete Visual Overview Grid of All Items in Subsection */}
        <div className="pt-8 border-t border-[#E6D9C8]">
          <h3 className="text-xl sm:text-2xl font-black text-[#4A3A33] mb-6">
            Todos los servicios de {subsectionTitle} ({items.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => {
              const isCurrent = active?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedItem(item);
                    window.scrollTo({ top: 260, behavior: "smooth" });
                  }}
                  className={`cursor-pointer rounded-3xl bg-white border-2 p-5 transition-all flex flex-col justify-between gap-4 shadow-sm hover:shadow-xl ${
                    isCurrent
                      ? "border-[#8FC1BB] ring-2 ring-[#8FC1BB]/40"
                      : "border-[#E6D9C8] hover:border-[#8FC1BB]"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="relative h-44 rounded-2xl overflow-hidden bg-[#4A3A33]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#4A3A33]/75 via-transparent to-transparent" />
                      <span className="absolute bottom-2.5 left-3 right-3 text-sm font-black text-[#F7F2EC]">
                        {item.title}
                      </span>
                    </div>
                    <p className="text-xs text-[#4A3A33]/90 font-semibold leading-relaxed">
                      {item.shortDescription}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#E6D9C8]">
                    <span className="text-xs font-extrabold text-[#8FC1BB]">
                      {isCurrent ? "● Viendo actualmente" : "Ver explicación completa →"}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenAppointment(item.title);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#8FC1BB]/30 hover:bg-[#8FC1BB] text-[#4A3A33] text-xs font-black transition-colors"
                    >
                      Agendar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="pt-20 sm:pt-24 pb-16 min-h-screen bg-[#F7F2EC]">
      {/* =====================================================================
          HERO BANNER DE LA SECCIÓN INDEPENDIENTE
      ===================================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        <div
          className={`relative rounded-[2.25rem] bg-gradient-to-br ${currentBanner.accentBg} border-2 border-[#E6D9C8] p-6 sm:p-10 lg:p-12 shadow-xl overflow-hidden`}
        >
          {/* Top Navigation Bar inside Section */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-[#E6D9C8]/80">
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F7F2EC] hover:bg-[#4A3A33] text-[#4A3A33] hover:text-[#F7F2EC] text-xs font-extrabold border border-[#E6D9C8] transition-all shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a Inicio</span>
            </button>

            {/* Quick Section Switcher Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {(
                [
                  { id: "embarazo", label: "Embarazo" },
                  { id: "ginecologia", label: "Ginecología" },
                  { id: "telemedicina", label: "Telemedicina" },
                  { id: "quienes-somos", label: "Quiénes Somos" },
                  { id: "blog", label: "Blog y FAQ" },
                  { id: "contacto", label: "Contacto" },
                ] as { id: AppSectionView; label: string }[]
              ).map((sec) => (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => onChangeView(sec.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-extrabold transition-all ${
                    view === sec.id
                      ? "bg-[#4A3A33] text-[#F7F2EC] shadow-xs"
                      : "bg-white/70 text-[#4A3A33] hover:bg-white border border-[#E6D9C8]"
                  }`}
                >
                  {sec.label}
                </button>
              ))}
            </div>
          </div>

          {/* Section Title & Visual */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 border border-[#8FC1BB] text-[#4A3A33] text-xs font-black uppercase tracking-wider">
                <BannerIcon className="w-4 h-4 text-[#8FC1BB]" />
                <span>{currentBanner.badge}</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-[#4A3A33] tracking-tight leading-tight">
                {currentBanner.title}
              </h1>
              <p className="text-sm sm:text-base text-[#4A3A33]/85 font-semibold leading-relaxed">
                {currentBanner.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onOpenAppointment()}
                  className="px-6 py-3 rounded-full bg-[#8FC1BB] hover:bg-[#8FC1BB]/90 text-[#4A3A33] font-black text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Agendar Cita Ahora</span>
                </button>
                <a
                  href={CONTACT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-full bg-[#4A3A33] hover:bg-[#4A3A33]/90 text-[#F7F2EC] font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all"
                >
                  <Phone className="w-4 h-4 text-[#8FC1BB]" />
                  <span>Asesoría: {CONTACT_INFO.whatsappDisplay}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative h-52 sm:h-64 rounded-3xl overflow-hidden border-2 border-[#F7F2EC] shadow-xl bg-[#4A3A33]">
                <Image
                  src={currentBanner.image}
                  alt={currentBanner.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A3A33]/65 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-4 text-xs font-bold text-[#F7F2EC]">
                  📍 {CONTACT_INFO.addressShort} · Sabaneta
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          CONTENIDO ESPECÍFICO DE CADA SECCIÓN DE PÁGINA COMPLETA
      ===================================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. VISTA COMPLETA: EMBARAZO */}
        {view === "embarazo" && (
          <div className="space-y-10">
            {/* Subsection Tabs Bar */}
            <div className="bg-white rounded-3xl p-4 sm:p-6 border-2 border-[#E6D9C8] shadow-md flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-[#9A7B6C]">
                  Subsecciones de Embarazo
                </span>
                <h2 className="text-lg sm:text-xl font-black text-[#4A3A33]">
                  Selecciona una categoría de embarazo para explorar sus estudios
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleSelectEmbarazoSub("consultas")}
                  className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all ${
                    embarazoSub === "consultas"
                      ? "bg-[#4A3A33] text-[#F7F2EC] shadow-md"
                      : "bg-[#F7F2EC] text-[#4A3A33] hover:bg-[#CFE6E2]/50 border border-[#E6D9C8]"
                  }`}
                >
                  <Stethoscope className="w-4 h-4 text-[#8FC1BB]" />
                  <span>Consultas (3)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectEmbarazoSub("bienestar")}
                  className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all ${
                    embarazoSub === "bienestar"
                      ? "bg-[#4A3A33] text-[#F7F2EC] shadow-md"
                      : "bg-[#F7F2EC] text-[#4A3A33] hover:bg-[#CFE6E2]/50 border border-[#E6D9C8]"
                  }`}
                >
                  <HeartPulse className="w-4 h-4 text-[#8FC1BB]" />
                  <span>Pruebas de Bienestar Fetal (3)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectEmbarazoSub("ecografias")}
                  className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all ${
                    embarazoSub === "ecografias"
                      ? "bg-[#4A3A33] text-[#F7F2EC] shadow-md"
                      : "bg-[#F7F2EC] text-[#4A3A33] hover:bg-[#CFE6E2]/50 border border-[#E6D9C8]"
                  }`}
                >
                  <Activity className="w-4 h-4 text-[#8FC1BB]" />
                  <span>Ecografías de Embarazo (4)</span>
                </button>

                <button
                  type="button"
                  onClick={onOpenCalculator}
                  className="px-4 py-3 rounded-2xl text-xs sm:text-sm font-extrabold flex items-center gap-2 bg-[#EBCFC6] hover:bg-[#D7A7A8] text-[#4A3A33] border border-[#D7A7A8] transition-all"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Calculadora Gestacional</span>
                </button>
              </div>
            </div>

            {embarazoSub === "consultas" &&
              renderInteractiveClinicalWorkspace(
                EMBARAZO_SERVICES.consultas,
                "Consultas de Embarazo",
                "Consulta preconcepcional, control prenatal periódico y anticoncepción posparto."
              )}

            {embarazoSub === "bienestar" &&
              renderInteractiveClinicalWorkspace(
                EMBARAZO_SERVICES.bienestarFetal,
                "Pruebas de Bienestar Fetal",
                "Perfil biofísico fetal, Doppler fetal placentario y Monitoreo fetal electrónico."
              )}

            {embarazoSub === "ecografias" &&
              renderInteractiveClinicalWorkspace(
                EMBARAZO_SERVICES.ecografias,
                "Ecografías durante el Embarazo",
                "Transvaginal y Cervicometría, Tamizaje Genético (11-13.6 sem), Detalle Anatómico (Tercer Nivel) y 3D/4D HD Live."
              )}
          </div>
        )}

        {/* 2. VISTA COMPLETA: GINECOLOGÍA */}
        {view === "ginecologia" && (
          <div className="space-y-10">
            {/* Subsection Tabs Bar */}
            <div className="bg-white rounded-3xl p-4 sm:p-6 border-2 border-[#E6D9C8] shadow-md flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-[#9A7B6C]">
                  Subsecciones de Ginecología
                </span>
                <h2 className="text-lg sm:text-xl font-black text-[#4A3A33]">
                  Explora nuestras 4 áreas especializadas de Ginecología
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleSelectGinecologiaSub("ecografias")}
                  className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all ${
                    ginecologiaSub === "ecografias"
                      ? "bg-[#4A3A33] text-[#F7F2EC] shadow-md"
                      : "bg-[#F7F2EC] text-[#4A3A33] hover:bg-[#CFE6E2]/50 border border-[#E6D9C8]"
                  }`}
                >
                  <Activity className="w-4 h-4 text-[#8FC1BB]" />
                  <span>Ecografías (5)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectGinecologiaSub("consultas")}
                  className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all ${
                    ginecologiaSub === "consultas"
                      ? "bg-[#4A3A33] text-[#F7F2EC] shadow-md"
                      : "bg-[#F7F2EC] text-[#4A3A33] hover:bg-[#CFE6E2]/50 border border-[#E6D9C8]"
                  }`}
                >
                  <Stethoscope className="w-4 h-4 text-[#8FC1BB]" />
                  <span>Consultas (5)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectGinecologiaSub("tamizajes")}
                  className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all ${
                    ginecologiaSub === "tamizajes"
                      ? "bg-[#4A3A33] text-[#F7F2EC] shadow-md"
                      : "bg-[#F7F2EC] text-[#4A3A33] hover:bg-[#CFE6E2]/50 border border-[#E6D9C8]"
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-[#8FC1BB]" />
                  <span>Tamizajes (3)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectGinecologiaSub("procedimientos")}
                  className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all ${
                    ginecologiaSub === "procedimientos"
                      ? "bg-[#4A3A33] text-[#F7F2EC] shadow-md"
                      : "bg-[#F7F2EC] text-[#4A3A33] hover:bg-[#CFE6E2]/50 border border-[#E6D9C8]"
                  }`}
                >
                  <Microscope className="w-4 h-4 text-[#8FC1BB]" />
                  <span>Procedimientos (6)</span>
                </button>
              </div>
            </div>

            {ginecologiaSub === "ecografias" &&
              renderInteractiveClinicalWorkspace(
                GINECOLOGIA_SERVICES.ecografias,
                "Ecografías Ginecológicas y Mamarias",
                "Ecografía pélvica transvaginal, suprapúbica, de piso pélvico, monitoreo de folículo y ecografía de mama o de seno."
              )}

            {ginecologiaSub === "consultas" &&
              renderInteractiveClinicalWorkspace(
                GINECOLOGIA_SERVICES.consultas,
                "Consultas Ginecológicas Especializadas",
                "Consulta Preconcepcional, Ginecológica, Planificación Familiar, Infertilidad y Consulta de mama."
              )}

            {ginecologiaSub === "tamizajes" &&
              renderInteractiveClinicalWorkspace(
                GINECOLOGIA_SERVICES.tamizajes,
                "Tamizajes Preventivos CediMujer",
                "Paquetes preventivos integrales en una sola cita: Básico, de Mama y Ginecológico Completo."
              )}

            {ginecologiaSub === "procedimientos" &&
              renderInteractiveClinicalWorkspace(
                GINECOLOGIA_SERVICES.procedimientos,
                "Procedimientos Ginecológicos Ambulatorios",
                "Colposcopia, Toma de citología, Test de VPH, Colocación/retiro de DIU, Implantes subdérmicos y Topicaciones."
              )}
          </div>
        )}

        {/* 3. VISTA COMPLETA: TELEMEDICINA */}
        {view === "telemedicina" && (
          <div className="space-y-10">
            {renderInteractiveClinicalWorkspace(
              TELEMEDICINA_SERVICES,
              "Servicios de Telemedicina",
              "Teleconsulta con especialista en Ginecología, Planificación Familiar e Infertilidad."
            )}
          </div>
        )}

        {/* 4. VISTA COMPLETA: QUIÉNES SOMOS */}
        {view === "quienes-somos" && (
          <div className="space-y-12 -mt-6">
            <About onOpenAppointment={onOpenAppointment} />
            <Testimonials />
          </div>
        )}

        {/* 5. VISTA COMPLETA: BLOG Y PREGUNTAS FRECUENTES */}
        {view === "blog" && (
          <div className="-mt-6">
            <BlogAndFaq onOpenAppointment={onOpenAppointment} />
          </div>
        )}

        {/* 6. VISTA COMPLETA: CONTACTO Y ATENCIÓN AL CLIENTE */}
        {view === "contacto" && (
          <div className="-mt-6">
            <LocationMap />
          </div>
        )}
      </div>
    </div>
  );
};
