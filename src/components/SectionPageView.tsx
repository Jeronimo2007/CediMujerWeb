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
  Layers,
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

type DetailTabKey = "que-es" | "como-se-hace" | "preparacion" | "beneficios";

/**
 * Splits a dense paragraph into clean, readable sentences/points
 * so mobile users never face a heavy wall of text, without losing any information.
 */
function splitIntoReadablePoints(text: string): string[] {
  return text
    .split(/(?<=\.)\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
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

  // Interactive detail tab inside the clinical sheet (keeps mobile super clean & digestible)
  const [detailTab, setDetailTab] = useState<DetailTabKey>("que-es");
  const [showAllExpanded, setShowAllExpanded] = useState(false);

  // Sync sub-section and featured item whenever props change
  useEffect(() => {
    setDetailTab("que-es");
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
    setDetailTab("que-es");
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
    setDetailTab("que-es");
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
      shortBadge: string;
      title: string;
      mobileTitle: string;
      subtitle: string;
      mobileSubtitle: string;
      image: string;
      icon: React.ElementType;
      accentBg: string;
    }
  > = {
    embarazo: {
      badge: "Unidad de Medicina Materno-Fetal y Obstetricia",
      shortBadge: "Medicina Materno-Fetal",
      title: "Embarazo: Consultas, Bienestar Fetal y Ecografías 3D/4D HD",
      mobileTitle: "Embarazo y Ecografías 3D/4D HD",
      subtitle:
        "Acompañamiento médico integral y humanizado en cada semana de tu gestación. Conoce en detalle nuestras consultas prenatales, pruebas de bienestar fetal, ecografías de tercer nivel y calculadora obstétrica.",
      mobileSubtitle:
        "Consultas prenatales, bienestar fetal y ecografías de alta definición semana a semana.",
      image: "/assets/images/equipo2.jpg",
      icon: Baby,
      accentBg: "from-[#CFE6E2]/70 via-[#F7F2EC] to-[#EBCFC6]/50",
    },
    ginecologia: {
      badge: "Unidad de Ginecología Integral y Diagnóstico",
      shortBadge: "Ginecología Integral",
      title: "Ginecología: Ecografías, Consultas, Tamizajes y Procedimientos",
      mobileTitle: "Ginecología y Diagnóstico",
      subtitle:
        "Cuidado especializado para cada etapa de la vida de la mujer. Explora qué es cada ecografía, consulta, paquete de tamizaje y procedimiento ambulatorio, y cómo los realiza el equipo de CediMujer.",
      mobileSubtitle:
        "Ecografías, consultas, paquetes preventivos de tamizaje y procedimientos ambulatorios.",
      image: "/assets/images/sala1.jpg",
      icon: Stethoscope,
      accentBg: "from-[#EBCFC6]/65 via-[#F7F2EC] to-[#E6D9C8]/60",
    },
    telemedicina: {
      badge: "Atención Médica Virtual CediMujer",
      shortBadge: "Consulta Virtual",
      title: "Telemedicina con Especialistas en Ginecología",
      mobileTitle: "Telemedicina CediMujer",
      subtitle:
        "Orientación médica especializada, lectura de exámenes, planificación familiar y asesoría en fertilidad por videollamada desde la comodidad y privacidad de tu hogar.",
      mobileSubtitle:
        "Videoconsulta especializada en ginecología, planificación familiar e infertilidad desde casa.",
      image: "/assets/images/trabajo.jpg",
      icon: Video,
      accentBg: "from-[#E6D9C8]/70 via-[#F7F2EC] to-[#CFE6E2]/60",
    },
    "quienes-somos": {
      badge: "Institución · Sede Sabaneta · Especialistas · Usuarios",
      shortBadge: "Desde Mayo 2008",
      title: "Quiénes Somos · Conoce CediMujer",
      mobileTitle: "Quiénes Somos",
      subtitle:
        "Desde mayo de 2008 brindando diagnóstico especializado en salud para la mujer en el Centro Comercial Aves María (Locales 341-342), Sabaneta.",
      mobileSubtitle:
        "Nuestra historia, sede en C.C. Aves María, equipo de especialistas y asociación de usuarios.",
      image: "/assets/images/header.jpg",
      icon: Building2,
      accentBg: "from-[#E6D9C8]/70 via-[#F7F2EC] to-[#EBCFC6]/50",
    },
    blog: {
      badge: "Educación Médica y Prevención Femenina",
      shortBadge: "Guías y Preguntas",
      title: "Información, Blog y Preguntas Frecuentes",
      mobileTitle: "Blog Médico y Preguntas",
      subtitle:
        "Artículos informativos redactados por nuestros especialistas para guiar a nuestras pacientes en el cuidado de su salud ginecológica, mamaria y prenatal.",
      mobileSubtitle:
        "Artículos educativos y respuestas claras de nuestros especialistas para tu salud.",
      image: "/assets/images/equipo1.jpg",
      icon: BookOpen,
      accentBg: "from-[#CFE6E2]/65 via-[#F7F2EC] to-[#E6D9C8]/55",
    },
    contacto: {
      badge: "Canales Oficiales de Atención al Usuario",
      shortBadge: "Sabaneta · C.C. Aves María",
      title: "Contacto, Ubicación y Atención al Cliente",
      mobileTitle: "Contacto y Ubicación",
      subtitle:
        "Comunícate a nuestra línea de Asesoría WhatsApp +57 311 397 9905, PBX +604 357 3010 o visítanos en el C.C. Aves María, Locales 341-342 (Sabaneta).",
      mobileSubtitle:
        "WhatsApp +57 311 397 9905 · PBX +604 357 3010 · C.C. Aves María Locales 341-342.",
      image: "/assets/images/header.jpg",
      icon: MessageSquareHeart,
      accentBg: "from-[#EBCFC6]/60 via-[#F7F2EC] to-[#CFE6E2]/60",
    },
  };

  const currentBanner = bannerConfig[view];
  const BannerIcon = currentBanner.icon;

  const detailTabs: {
    id: DetailTabKey;
    label: string;
    shortLabel: string;
    icon: React.ElementType;
  }[] = [
    {
      id: "que-es",
      label: "¿Qué es y en qué consiste?",
      shortLabel: "¿Qué es?",
      icon: Info,
    },
    {
      id: "como-se-hace",
      label: "¿Cómo se realiza en CediMujer?",
      shortLabel: "¿Cómo se hace?",
      icon: Microscope,
    },
    {
      id: "preparacion",
      label: "Preparación e Indicaciones",
      shortLabel: "Preparación",
      icon: Sparkles,
    },
    {
      id: "beneficios",
      label: "Ventajas en CediMujer",
      shortLabel: "Ventajas",
      icon: ShieldCheck,
    },
  ];

  // Helper to render the Master-Detail Interactive Clinical Explorer for Embarazo, Ginecologia, Telemedicina
  const renderInteractiveClinicalWorkspace = (
    items: ServiceItemDetail[],
    subsectionTitle: string,
    subsectionDescription: string
  ) => {
    const active =
      selectedItem && items.some((i) => i.id === selectedItem.id)
        ? selectedItem
        : items[0];

    const activeIndex = items.findIndex((i) => i.id === active?.id);
    const whatIsItPoints = active ? splitIntoReadablePoints(active.whatIsIt) : [];
    const howItIsDonePoints = active
      ? splitIntoReadablePoints(active.howItIsDone)
      : [];

    return (
      <div className="space-y-8 sm:space-y-12">
        {/* =================================================================
            SELECTOR MÓVIL DESLIZABLE (Solo en celular/tablet < lg)
            Evita tener una lista larga arriba y muestra chips limpios
        ================================================================= */}
        <div className="lg:hidden bg-white/90 rounded-2xl p-3.5 border border-[#E6D9C8] shadow-sm space-y-2.5">
          <div className="flex items-center justify-between gap-2 px-1">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#8FC1BB] block">
                {subsectionTitle}
              </span>
              <p className="text-xs font-extrabold text-[#4A3A33]">
                Estudio {activeIndex + 1} de {items.length} · Desliza para elegir:
              </p>
            </div>
            <span className="text-[11px] font-bold text-[#9A7B6C] shrink-0">
              ↔ Deslizar
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar snap-x">
            {items.map((item, idx) => {
              const isSelected = active?.id === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSelectedItem(item);
                    setDetailTab("que-es");
                  }}
                  className={`snap-start shrink-0 px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 border ${
                    isSelected
                      ? "bg-[#4A3A33] text-[#F7F2EC] border-[#4A3A33] shadow-sm"
                      : "bg-[#F7F2EC] text-[#4A3A33] border-[#E6D9C8]"
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-lg text-[10px] font-black flex items-center justify-center ${
                      isSelected
                        ? "bg-[#8FC1BB] text-[#4A3A33]"
                        : "bg-[#E6D9C8] text-[#4A3A33]"
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <span className="whitespace-nowrap">{item.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Master-Detail Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (Desktop Only): Interactive List of Items in this Subsection */}
          <div className="hidden lg:block lg:col-span-4 bg-white rounded-3xl p-6 border-2 border-[#E6D9C8] shadow-lg space-y-4 lg:sticky lg:top-24">
            <div className="pb-3 border-b border-[#E6D9C8]">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#8FC1BB]">
                Subsección Activa
              </span>
              <h3 className="text-xl font-black text-[#4A3A33] mt-0.5">
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
                    onClick={() => {
                      setSelectedItem(item);
                      setDetailTab("que-es");
                    }}
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
                      <span className="text-sm font-extrabold leading-snug truncate">
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

          {/* Right Column: Clean, Digestible Medical Sheet of Selected Item */}
          {active && (
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.22 }}
                  className="bg-white rounded-3xl sm:rounded-[2rem] border-2 border-[#E6D9C8] shadow-xl overflow-hidden"
                >
                  {/* Visual Image Header */}
                  <div className="relative h-52 sm:h-72 lg:h-80 bg-[#4A3A33]">
                    <Image
                      src={active.image}
                      alt={active.title}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#4A3A33] via-[#4A3A33]/40 to-transparent" />

                    <div className="absolute top-3.5 left-3.5 right-3.5 flex flex-wrap items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full bg-[#8FC1BB] text-[#4A3A33] text-[11px] sm:text-xs font-black uppercase tracking-wider shadow-md">
                        {active.subcategory}
                      </span>

                      {active.durationOrTiming && (
                        <span className="px-3 py-1 rounded-full bg-[#4A3A33]/90 text-[#F7F2EC] text-[11px] sm:text-xs font-bold flex items-center gap-1.5 border border-[#E6D9C8]/40">
                          <Clock className="w-3 h-3 text-[#8FC1BB]" />
                          {active.durationOrTiming}
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                      <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-[#F7F2EC] leading-tight">
                        {active.title}
                      </h2>
                      <p className="hidden sm:block mt-2 text-sm sm:text-base text-[#E6D9C8] font-semibold max-w-2xl">
                        {active.shortDescription}
                      </p>
                    </div>
                  </div>

                  {/* Main Body Container */}
                  <div className="p-4 sm:p-8 lg:p-10 space-y-5 sm:space-y-6">
                    {/* Mobile Short Summary Box (Clean & airy outside the image) */}
                    <p className="sm:hidden text-xs text-[#4A3A33] font-semibold leading-relaxed bg-[#F7F2EC] p-3.5 rounded-2xl border border-[#E6D9C8]">
                      {active.shortDescription}
                    </p>

                    {/* Compact Specialist & Quick Schedule Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-[#F7F2EC] border border-[#E6D9C8]">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-[#8FC1BB] text-[#4A3A33] shrink-0">
                          <UserCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-[#9A7B6C] block">
                            Realizado por
                          </span>
                          <p className="text-xs sm:text-sm font-extrabold text-[#4A3A33]">
                            {active.recommendedSpecialist}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onOpenAppointment(active.title)}
                        className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#8FC1BB] hover:bg-[#8FC1BB]/90 text-[#4A3A33] font-black text-xs flex items-center justify-center gap-2 shadow-xs transition-all shrink-0"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Agendar este servicio</span>
                      </button>
                    </div>

                    {/* =========================================================
                        NAVEGACIÓN POR PESTAÑAS INTERACTIVAS DE LA FICHA MÉDICA
                        Evita saturación visual en celular mostrando 1 tema a la vez
                        sin perder nada de información.
                    ========================================================= */}
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-[11px] font-black uppercase tracking-wider text-[#9A7B6C]">
                          Información Médica Detallada (Toca cada pestaña):
                        </span>
                        <button
                          type="button"
                          onClick={() => setShowAllExpanded(!showAllExpanded)}
                          className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-[#4A3A33] bg-[#E6D9C8]/50 hover:bg-[#E6D9C8] px-3 py-1 rounded-full transition-colors"
                        >
                          <Layers className="w-3 h-3 text-[#8FC1BB]" />
                          <span>
                            {showAllExpanded
                              ? "Ver por pestañas (Más limpio)"
                              : "Ver todo desplegado"}
                          </span>
                        </button>
                      </div>

                      {/* 4 Interactive Topic Pills */}
                      {!showAllExpanded && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-[#F7F2EC] border border-[#E6D9C8]">
                          {detailTabs.map((tab) => {
                            const TabIcon = tab.icon;
                            const isTabActive = detailTab === tab.id;
                            return (
                              <button
                                key={tab.id}
                                type="button"
                                onClick={() => setDetailTab(tab.id)}
                                className={`py-2.5 px-2.5 sm:px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
                                  isTabActive
                                    ? "bg-[#4A3A33] text-[#F7F2EC] shadow-sm"
                                    : "text-[#4A3A33] hover:bg-[#E6D9C8]/60"
                                }`}
                              >
                                <TabIcon
                                  className={`w-3.5 h-3.5 shrink-0 ${
                                    isTabActive
                                      ? "text-[#8FC1BB]"
                                      : "text-[#9A7B6C]"
                                  }`}
                                />
                                <span className="truncate">{tab.shortLabel}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* Tab Content Cards (Clean, structured sentences instead of walls of text) */}
                      <div className="space-y-4">
                        {/* 1. ¿Qué es y en qué consiste? */}
                        {(showAllExpanded || detailTab === "que-es") && (
                          <motion.div
                            key="tab-que-es"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.18 }}
                            className="p-4 sm:p-6 rounded-3xl bg-[#F7F2EC] border border-[#E6D9C8] space-y-3.5"
                          >
                            <div className="flex items-center gap-2.5 text-xs sm:text-base font-black text-[#4A3A33] uppercase tracking-wider">
                              <div className="p-2 rounded-xl bg-[#CFE6E2] text-[#4A3A33] shrink-0">
                                <Info className="w-4 h-4 sm:w-5 sm:h-5" />
                              </div>
                              <span>
                                ¿Qué es y en qué consiste {active.title.toLowerCase()}?
                              </span>
                            </div>

                            <div className="space-y-2.5">
                              {whatIsItPoints.map((sentence, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-start gap-2.5 bg-white/80 p-3 sm:p-3.5 rounded-2xl border border-[#E6D9C8]/70"
                                >
                                  <span className="w-5 h-5 rounded-full bg-[#CFE6E2] text-[#4A3A33] text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                                    ✓
                                  </span>
                                  <p className="text-xs sm:text-sm text-[#4A3A33] font-semibold leading-relaxed">
                                    {sentence}
                                  </p>
                                </div>
                              ))}
                            </div>

                            {!showAllExpanded && (
                              <div className="pt-1 flex justify-end">
                                <button
                                  type="button"
                                  onClick={() => setDetailTab("como-se-hace")}
                                  className="text-xs font-extrabold text-[#4A3A33] bg-[#CFE6E2]/70 hover:bg-[#8FC1BB] px-3.5 py-2 rounded-xl inline-flex items-center gap-1.5 transition-colors"
                                >
                                  <span>Siguiente: ¿Cómo se realiza?</span>
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}
                          </motion.div>
                        )}

                        {/* 2. ¿Cómo se realiza paso a paso en CediMujer? */}
                        {(showAllExpanded || detailTab === "como-se-hace") && (
                          <motion.div
                            key="tab-como-se-hace"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.18 }}
                            className="p-4 sm:p-6 rounded-3xl bg-gradient-to-br from-[#CFE6E2]/35 to-[#EBCFC6]/25 border border-[#8FC1BB]/50 space-y-3.5"
                          >
                            <div className="flex items-center gap-2.5 text-xs sm:text-base font-black text-[#4A3A33] uppercase tracking-wider">
                              <div className="p-2 rounded-xl bg-[#8FC1BB] text-[#4A3A33] shrink-0">
                                <Microscope className="w-4 h-4 sm:w-5 sm:h-5" />
                              </div>
                              <span>
                                ¿Cómo lo realiza paso a paso el equipo de CediMujer?
                              </span>
                            </div>

                            <div className="space-y-2.5">
                              {howItIsDonePoints.map((stepText, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-start gap-3 bg-white/90 p-3 sm:p-3.5 rounded-2xl border border-[#8FC1BB]/40"
                                >
                                  <span className="w-6 h-6 rounded-xl bg-[#4A3A33] text-[#8FC1BB] text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5">
                                    {idx + 1}
                                  </span>
                                  <p className="text-xs sm:text-sm text-[#4A3A33] font-semibold leading-relaxed">
                                    {stepText}
                                  </p>
                                </div>
                              ))}
                            </div>

                            {!showAllExpanded && (
                              <div className="pt-1 flex items-center justify-between gap-2">
                                <button
                                  type="button"
                                  onClick={() => setDetailTab("que-es")}
                                  className="text-xs font-bold text-[#9A7B6C] hover:text-[#4A3A33] px-2 py-1"
                                >
                                  ← Anterior
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setDetailTab("preparacion")}
                                  className="text-xs font-extrabold text-[#4A3A33] bg-[#8FC1BB]/80 hover:bg-[#8FC1BB] px-3.5 py-2 rounded-xl inline-flex items-center gap-1.5 transition-colors"
                                >
                                  <span>Siguiente: Preparación</span>
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}
                          </motion.div>
                        )}

                        {/* 3. Preparación e Indicaciones */}
                        {(showAllExpanded || detailTab === "preparacion") && (
                          <motion.div
                            key="tab-preparacion"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.18 }}
                            className="p-4 sm:p-6 rounded-3xl bg-[#F7F2EC] border border-[#E6D9C8] space-y-3.5"
                          >
                            <h4 className="text-xs sm:text-base font-black uppercase tracking-wider text-[#4A3A33] flex items-center gap-2">
                              <div className="p-2 rounded-xl bg-[#CFE6E2] text-[#4A3A33] shrink-0">
                                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#4A3A33]" />
                              </div>
                              <span>Preparación e Indicaciones para la Paciente</span>
                            </h4>

                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {active.preparationAndIndications.map(
                                (prep, idx) => (
                                  <li
                                    key={idx}
                                    className="flex items-start gap-2.5 bg-white p-3 rounded-2xl border border-[#E6D9C8] text-xs sm:text-sm text-[#4A3A33] font-semibold leading-relaxed"
                                  >
                                    <CheckCircle2 className="w-4 h-4 text-[#8FC1BB] shrink-0 mt-0.5" />
                                    <span>{prep}</span>
                                  </li>
                                )
                              )}
                            </ul>

                            {!showAllExpanded && (
                              <div className="pt-1 flex items-center justify-between gap-2">
                                <button
                                  type="button"
                                  onClick={() => setDetailTab("como-se-hace")}
                                  className="text-xs font-bold text-[#9A7B6C] hover:text-[#4A3A33] px-2 py-1"
                                >
                                  ← Anterior
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setDetailTab("beneficios")}
                                  className="text-xs font-extrabold text-[#4A3A33] bg-[#CFE6E2]/70 hover:bg-[#8FC1BB] px-3.5 py-2 rounded-xl inline-flex items-center gap-1.5 transition-colors"
                                >
                                  <span>Siguiente: Ventajas CediMujer</span>
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}
                          </motion.div>
                        )}

                        {/* 4. Ventajas en CediMujer Sabaneta */}
                        {(showAllExpanded || detailTab === "beneficios") && (
                          <motion.div
                            key="tab-beneficios"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.18 }}
                            className="p-4 sm:p-6 rounded-3xl bg-[#EBCFC6]/30 border border-[#D7A7A8]/50 space-y-3.5"
                          >
                            <h4 className="text-xs sm:text-base font-black uppercase tracking-wider text-[#4A3A33] flex items-center gap-2">
                              <div className="p-2 rounded-xl bg-[#EBCFC6] text-[#4A3A33] shrink-0">
                                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#4A3A33]" />
                              </div>
                              <span>Ventajas de realizarlo en CediMujer Sabaneta</span>
                            </h4>

                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {active.highlights.map((hl, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2.5 bg-white/90 p-3 rounded-2xl border border-[#D7A7A8]/40 text-xs sm:text-sm text-[#4A3A33] font-semibold leading-relaxed"
                                >
                                  <CheckCircle2 className="w-4 h-4 text-[#4A3A33] shrink-0 mt-0.5" />
                                  <span>{hl}</span>
                                </li>
                              ))}
                            </ul>

                            {!showAllExpanded && (
                              <div className="pt-1 flex justify-start">
                                <button
                                  type="button"
                                  onClick={() => setDetailTab("preparacion")}
                                  className="text-xs font-bold text-[#9A7B6C] hover:text-[#4A3A33] px-2 py-1"
                                >
                                  ← Volver a Preparación
                                </button>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Bottom CTA Action Bar */}
                    <div className="pt-3 border-t border-[#E6D9C8] flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                      <button
                        type="button"
                        onClick={() => onOpenAppointment(active.title)}
                        className="flex-1 py-3.5 sm:py-4 px-5 rounded-2xl bg-[#8FC1BB] hover:bg-[#8FC1BB]/90 text-[#4A3A33] font-black text-xs sm:text-sm shadow-md shadow-[#8FC1BB]/20 flex items-center justify-center gap-2 transition-all"
                      >
                        <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Agendar {active.title}</span>
                      </button>

                      <a
                        href={`https://wa.me/${
                          CONTACT_INFO.whatsappRaw
                        }?text=${encodeURIComponent(
                          `Hola CediMujer, deseo recibir asesoría o agendar el servicio de: ${active.title}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-3.5 sm:py-4 px-5 rounded-2xl bg-[#4A3A33] hover:bg-[#4A3A33]/90 text-[#F7F2EC] font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all"
                      >
                        <Phone className="w-4 h-4 text-[#8FC1BB]" />
                        <span>WhatsApp ({CONTACT_INFO.whatsappDisplay})</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* =================================================================
            VISTA RÁPIDA DE OTROS SERVICIOS DE LA SUBSECCIÓN
            En celular es un carrusel horizontal compacto; en escritorio grilla.
        ================================================================= */}
        <div className="pt-6 sm:pt-8 border-t border-[#E6D9C8]">
          <div className="flex items-center justify-between gap-2 mb-4 sm:mb-6">
            <h3 className="text-base sm:text-2xl font-black text-[#4A3A33]">
              Explorar más en {subsectionTitle} ({items.length})
            </h3>
            <span className="md:hidden text-[11px] font-bold text-[#9A7B6C]">
              Desliza →
            </span>
          </div>

          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 overflow-x-auto pb-2 md:pb-0 no-scrollbar snap-x">
            {items.map((item) => {
              const isCurrent = active?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedItem(item);
                    setDetailTab("que-es");
                    window.scrollTo({ top: 180, behavior: "smooth" });
                  }}
                  className={`snap-start shrink-0 w-72 md:w-auto cursor-pointer rounded-3xl bg-white border-2 p-4 sm:p-5 transition-all flex flex-col justify-between gap-3 shadow-xs hover:shadow-xl ${
                    isCurrent
                      ? "border-[#8FC1BB] ring-2 ring-[#8FC1BB]/40"
                      : "border-[#E6D9C8] hover:border-[#8FC1BB]"
                  }`}
                >
                  <div className="space-y-2.5">
                    <div className="relative h-36 sm:h-44 rounded-2xl overflow-hidden bg-[#4A3A33]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#4A3A33]/80 via-transparent to-transparent" />
                      <span className="absolute bottom-2.5 left-3 right-3 text-xs sm:text-sm font-black text-[#F7F2EC] leading-snug">
                        {item.title}
                      </span>
                    </div>
                    <p className="text-xs text-[#4A3A33]/85 font-semibold leading-relaxed line-clamp-2">
                      {item.shortDescription}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#E6D9C8]">
                    <span className="text-[11px] font-extrabold text-[#8FC1BB]">
                      {isCurrent ? "● Seleccionado" : "Ver ficha →"}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenAppointment(item.title);
                      }}
                      className="px-3 py-1 rounded-xl bg-[#8FC1BB]/30 hover:bg-[#8FC1BB] text-[#4A3A33] text-[11px] font-black transition-colors"
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
    <div className="pt-16 sm:pt-24 pb-16 min-h-screen bg-[#F7F2EC]">
      {/* =====================================================================
          HERO BANNER DE LA SECCIÓN INDEPENDIENTE
          En celular es compacto, limpio y deslizable; en escritorio amplio.
      ===================================================================== */}
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 mb-5 sm:mb-10">
        <div
          className={`relative rounded-3xl sm:rounded-[2.25rem] bg-gradient-to-br ${currentBanner.accentBg} border-2 border-[#E6D9C8] p-4 sm:p-8 lg:p-10 shadow-lg overflow-hidden`}
        >
          {/* Single-Row Scrollable Top Navigation Bar */}
          <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#E6D9C8]/80">
            <button
              type="button"
              onClick={onBackToHome}
              className="shrink-0 inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#F7F2EC] hover:bg-[#4A3A33] text-[#4A3A33] hover:text-[#F7F2EC] text-xs font-extrabold border border-[#E6D9C8] transition-all shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Inicio</span>
            </button>

            {/* Quick Section Switcher Pills (Horizontal Scroll on Mobile) */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
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
                  className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-extrabold transition-all whitespace-nowrap ${
                    view === sec.id
                      ? "bg-[#4A3A33] text-[#F7F2EC] shadow-2xs"
                      : "bg-white/75 text-[#4A3A33] hover:bg-white border border-[#E6D9C8]"
                  }`}
                >
                  {sec.label}
                </button>
              ))}
            </div>
          </div>

          {/* Section Title & Visual */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            <div className="lg:col-span-7 space-y-2.5 sm:space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/85 border border-[#8FC1BB] text-[#4A3A33] text-[10px] sm:text-xs font-black uppercase tracking-wider">
                <BannerIcon className="w-3.5 h-3.5 text-[#8FC1BB]" />
                <span className="sm:hidden">{currentBanner.shortBadge}</span>
                <span className="hidden sm:inline">{currentBanner.badge}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#4A3A33] tracking-tight leading-tight">
                <span className="sm:hidden">{currentBanner.mobileTitle}</span>
                <span className="hidden sm:inline">{currentBanner.title}</span>
              </h1>

              <p className="text-xs sm:text-base text-[#4A3A33]/85 font-semibold leading-relaxed">
                <span className="sm:hidden">{currentBanner.mobileSubtitle}</span>
                <span className="hidden sm:inline">{currentBanner.subtitle}</span>
              </p>

              <div className="hidden sm:flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => onOpenAppointment()}
                  className="px-5 py-2.5 rounded-full bg-[#8FC1BB] hover:bg-[#8FC1BB]/90 text-[#4A3A33] font-black text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Agendar Cita Ahora</span>
                </button>
                <a
                  href={CONTACT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-[#4A3A33] hover:bg-[#4A3A33]/90 text-[#F7F2EC] font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all"
                >
                  <Phone className="w-4 h-4 text-[#8FC1BB]" />
                  <span>Asesoría: {CONTACT_INFO.whatsappDisplay}</span>
                </a>
              </div>
            </div>

            {/* Banner Image (Hidden on small mobile so the content starts right away without scrolling) */}
            <div className="hidden lg:block lg:col-span-5">
              <div className="relative h-56 rounded-3xl overflow-hidden border-2 border-[#F7F2EC] shadow-xl bg-[#4A3A33]">
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
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* 1. VISTA COMPLETA: EMBARAZO */}
        {view === "embarazo" && (
          <div className="space-y-6 sm:space-y-10">
            {/* Subsection Tabs Bar (Clean horizontal pills on mobile) */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-5 border-2 border-[#E6D9C8] shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              <div className="hidden sm:block">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#9A7B6C]">
                  Categorías de Embarazo
                </span>
                <h2 className="text-base sm:text-lg font-black text-[#4A3A33]">
                  Selecciona una subsección
                </h2>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5">
                <button
                  type="button"
                  onClick={() => handleSelectEmbarazoSub("consultas")}
                  className={`shrink-0 px-3.5 sm:px-4 py-2.5 rounded-xl sm:rounded-2xl text-xs font-extrabold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                    embarazoSub === "consultas"
                      ? "bg-[#4A3A33] text-[#F7F2EC] shadow-sm"
                      : "bg-[#F7F2EC] text-[#4A3A33] hover:bg-[#CFE6E2]/50 border border-[#E6D9C8]"
                  }`}
                >
                  <Stethoscope className="w-3.5 h-3.5 text-[#8FC1BB]" />
                  <span>Consultas (3)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectEmbarazoSub("bienestar")}
                  className={`shrink-0 px-3.5 sm:px-4 py-2.5 rounded-xl sm:rounded-2xl text-xs font-extrabold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                    embarazoSub === "bienestar"
                      ? "bg-[#4A3A33] text-[#F7F2EC] shadow-sm"
                      : "bg-[#F7F2EC] text-[#4A3A33] hover:bg-[#CFE6E2]/50 border border-[#E6D9C8]"
                  }`}
                >
                  <HeartPulse className="w-3.5 h-3.5 text-[#8FC1BB]" />
                  <span>Bienestar Fetal (3)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectEmbarazoSub("ecografias")}
                  className={`shrink-0 px-3.5 sm:px-4 py-2.5 rounded-xl sm:rounded-2xl text-xs font-extrabold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                    embarazoSub === "ecografias"
                      ? "bg-[#4A3A33] text-[#F7F2EC] shadow-sm"
                      : "bg-[#F7F2EC] text-[#4A3A33] hover:bg-[#CFE6E2]/50 border border-[#E6D9C8]"
                  }`}
                >
                  <Activity className="w-3.5 h-3.5 text-[#8FC1BB]" />
                  <span>Ecografías (4)</span>
                </button>

                <button
                  type="button"
                  onClick={onOpenCalculator}
                  className="shrink-0 px-3.5 sm:px-4 py-2.5 rounded-xl sm:rounded-2xl text-xs font-extrabold flex items-center gap-1.5 bg-[#EBCFC6] hover:bg-[#D7A7A8] text-[#4A3A33] border border-[#D7A7A8] transition-all whitespace-nowrap"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Calculadora</span>
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
          <div className="space-y-6 sm:space-y-10">
            {/* Subsection Tabs Bar */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-5 border-2 border-[#E6D9C8] shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              <div className="hidden sm:block">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#9A7B6C]">
                  Categorías de Ginecología
                </span>
                <h2 className="text-base sm:text-lg font-black text-[#4A3A33]">
                  Explora nuestras 4 áreas especializadas
                </h2>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5">
                <button
                  type="button"
                  onClick={() => handleSelectGinecologiaSub("ecografias")}
                  className={`shrink-0 px-3.5 sm:px-4 py-2.5 rounded-xl sm:rounded-2xl text-xs font-extrabold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                    ginecologiaSub === "ecografias"
                      ? "bg-[#4A3A33] text-[#F7F2EC] shadow-sm"
                      : "bg-[#F7F2EC] text-[#4A3A33] hover:bg-[#CFE6E2]/50 border border-[#E6D9C8]"
                  }`}
                >
                  <Activity className="w-3.5 h-3.5 text-[#8FC1BB]" />
                  <span>Ecografías (5)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectGinecologiaSub("consultas")}
                  className={`shrink-0 px-3.5 sm:px-4 py-2.5 rounded-xl sm:rounded-2xl text-xs font-extrabold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                    ginecologiaSub === "consultas"
                      ? "bg-[#4A3A33] text-[#F7F2EC] shadow-sm"
                      : "bg-[#F7F2EC] text-[#4A3A33] hover:bg-[#CFE6E2]/50 border border-[#E6D9C8]"
                  }`}
                >
                  <Stethoscope className="w-3.5 h-3.5 text-[#8FC1BB]" />
                  <span>Consultas (5)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectGinecologiaSub("tamizajes")}
                  className={`shrink-0 px-3.5 sm:px-4 py-2.5 rounded-xl sm:rounded-2xl text-xs font-extrabold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                    ginecologiaSub === "tamizajes"
                      ? "bg-[#4A3A33] text-[#F7F2EC] shadow-sm"
                      : "bg-[#F7F2EC] text-[#4A3A33] hover:bg-[#CFE6E2]/50 border border-[#E6D9C8]"
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8FC1BB]" />
                  <span>Tamizajes (3)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectGinecologiaSub("procedimientos")}
                  className={`shrink-0 px-3.5 sm:px-4 py-2.5 rounded-xl sm:rounded-2xl text-xs font-extrabold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                    ginecologiaSub === "procedimientos"
                      ? "bg-[#4A3A33] text-[#F7F2EC] shadow-sm"
                      : "bg-[#F7F2EC] text-[#4A3A33] hover:bg-[#CFE6E2]/50 border border-[#E6D9C8]"
                  }`}
                >
                  <Microscope className="w-3.5 h-3.5 text-[#8FC1BB]" />
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
          <div className="space-y-6 sm:space-y-10">
            {renderInteractiveClinicalWorkspace(
              TELEMEDICINA_SERVICES,
              "Servicios de Telemedicina",
              "Teleconsulta con especialista en Ginecología, Planificación Familiar e Infertilidad."
            )}
          </div>
        )}

        {/* 4. VISTA COMPLETA: QUIÉNES SOMOS */}
        {view === "quienes-somos" && (
          <div className="space-y-10 -mt-4">
            <About onOpenAppointment={onOpenAppointment} isStandalonePage />
            <Testimonials />
          </div>
        )}

        {/* 5. VISTA COMPLETA: BLOG Y PREGUNTAS FRECUENTES */}
        {view === "blog" && (
          <div className="-mt-4">
            <BlogAndFaq onOpenAppointment={onOpenAppointment} isStandalonePage />
          </div>
        )}

        {/* 6. VISTA COMPLETA: CONTACTO Y ATENCIÓN AL CLIENTE */}
        {view === "contacto" && (
          <div className="-mt-4">
            <LocationMap isStandalonePage />
          </div>
        )}
      </div>
    </div>
  );
};
