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
  Scan,
} from "lucide-react";
import {
  EMBARAZO_SERVICES,
  GINECOLOGIA_SERVICES,
  TELEMEDICINA_SERVICES,
  CARDIODIAGNOSTICO_SERVICES,
  ULTRASONIDO_RADIOLOGIA_SERVICES,
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
  | "cardiodiagnostico"
  | "ultrasonido-radiologia"
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

function splitIntoReadablePoints(text: string): string[] {
  return text
    .split(/(?<=\.)\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .slice(0, 2);
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
  const [embarazoSub, setEmbarazoSub] = useState<
    "consultas" | "bienestar" | "ecografias"
  >("consultas");

  const [ginecologiaSub, setGinecologiaSub] = useState<
    "ecografias" | "consultas" | "tamizajes" | "procedimientos"
  >("ecografias");

  const [selectedItem, setSelectedItem] = useState<ServiceItemDetail | null>(
    null
  );

  const [detailTab, setDetailTab] = useState<DetailTabKey>("que-es");
  const [showAllExpanded, setShowAllExpanded] = useState(false);

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
    } else if (view === "cardiodiagnostico") {
      if (initialItemId) {
        const found = CARDIODIAGNOSTICO_SERVICES.find(
          (i) => i.id === initialItemId
        );
        if (found) {
          setSelectedItem(found);
          return;
        }
      }
      setSelectedItem(CARDIODIAGNOSTICO_SERVICES[0] || null);
    } else if (view === "ultrasonido-radiologia") {
      if (initialItemId) {
        const found = ULTRASONIDO_RADIOLOGIA_SERVICES.find(
          (i) => i.id === initialItemId
        );
        if (found) {
          setSelectedItem(found);
          return;
        }
      }
      setSelectedItem(ULTRASONIDO_RADIOLOGIA_SERVICES[0] || null);
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
      badge: "Unidad Materno-Fetal",
      shortBadge: "Materno-Fetal",
      title: "Embarazo y Ecografías 3D/4D HD",
      mobileTitle: "Embarazo y Ecografías",
      subtitle:
        "Consultas prenatales, bienestar fetal y ecografías de tercer nivel semana a semana.",
      mobileSubtitle:
        "Consultas, bienestar fetal y ecografías 3D/4D HD.",
      image: "/assets/images/equipo2.jpg",
      icon: Baby,
      accentBg: "from-[#EBCFC6]/55 via-[#F7F6F4] to-[#EBCFC6]/30",
    },
    ginecologia: {
      badge: "Ginecología Integral",
      shortBadge: "Ginecología",
      title: "Ginecología y Diagnóstico Especializado",
      mobileTitle: "Ginecología Integral",
      subtitle:
        "Ecografías, consultas especializadas, paquetes de tamizaje y atención en consultorio.",
      mobileSubtitle:
        "Ecografías, consultas y tamizajes preventivos.",
      image: "/assets/images/unsplash-doctora.jpg",
      icon: Stethoscope,
      accentBg: "from-[#EBCFC6]/55 via-[#F7F6F4] to-[#E6D9C8]/35",
    },
    cardiodiagnostico: {
      badge: "Salud Cardiovascular",
      shortBadge: "Cardiodiagnóstico",
      title: "Unidad de Cardiodiagnóstico",
      mobileTitle: "Cardiodiagnóstico",
      subtitle:
        "Electrocardiograma, Ecocardiograma Transtorácico Doppler Color y Monitoreo 24h (MAPA / Holter).",
      mobileSubtitle:
        "Ecocardiograma, ECG de reposo y monitoreo 24h.",
      image: "/assets/images/unsplash-cardio-consulta.jpg",
      icon: HeartPulse,
      accentBg: "from-[#EBCFC6]/55 via-[#F7F6F4] to-[#CFE6E2]/35",
    },
    "ultrasonido-radiologia": {
      badge: "Imágenes Diagnósticas",
      shortBadge: "Ultrasonido y Radiología",
      title: "Ultrasonido y Radiología General",
      mobileTitle: "Ultrasonido y Radiología",
      subtitle:
        "Ecografía abdominal, renal, tiroides, tejidos blandos y Doppler vascular con equipos de alta definición.",
      mobileSubtitle:
        "Ecografías generales, Doppler vascular y estudios de imagen.",
      image: "/assets/images/equipo2.jpg",
      icon: Scan,
      accentBg: "from-[#EBCFC6]/55 via-[#F7F6F4] to-[#E6D9C8]/35",
    },
    telemedicina: {
      badge: "Atención Virtual",
      shortBadge: "Teleconsulta",
      title: "Telemedicina Ginecológica",
      mobileTitle: "Telemedicina",
      subtitle:
        "Orientación médica, lectura de exámenes, planificación e infertilidad por videollamada.",
      mobileSubtitle:
        "Videoconsulta en ginecología, planificación e infertilidad.",
      image: "/assets/images/trabajo.jpg",
      icon: Video,
      accentBg: "from-[#EBCFC6]/45 via-[#F7F6F4] to-[#CFE6E2]/30",
    },
    "quienes-somos": {
      badge: "Desde Mayo 2008 · Sabaneta",
      shortBadge: "Desde 2008",
      title: "Quiénes Somos · CediMujer",
      mobileTitle: "Quiénes Somos",
      subtitle:
        "Diagnóstico especializado en salud femenina en C.C. Aves María, Sabaneta.",
      mobileSubtitle:
        "Sede C.C. Aves María, especialistas y asociación de usuarios.",
      image: "/assets/images/header.jpg",
      icon: Building2,
      accentBg: "from-[#EBCFC6]/50 via-[#F7F6F4] to-[#E6D9C8]/30",
    },
    blog: {
      badge: "Guía de Salud Femenina",
      shortBadge: "Guías y FAQ",
      title: "Blog Médico y Preguntas Frecuentes",
      mobileTitle: "Blog y Preguntas",
      subtitle:
        "Artículos breves y respuestas claras de nuestras especialistas.",
      mobileSubtitle:
        "Artículos educativos y respuestas rápidas.",
      image: "/assets/images/equipo1.jpg",
      icon: BookOpen,
      accentBg: "from-[#EBCFC6]/45 via-[#F7F6F4] to-[#E6D9C8]/30",
    },
    contacto: {
      badge: "Canales de Atención",
      shortBadge: "C.C. Aves María",
      title: "Contacto y Ubicación",
      mobileTitle: "Contacto y Sede",
      subtitle:
        "WhatsApp +57 311 397 9905 · PBX +604 357 3010 · C.C. Aves María Locales 341-342.",
      mobileSubtitle:
        "WhatsApp +57 311 397 9905 · C.C. Aves María Locales 341-342.",
      image: "/assets/images/header.jpg",
      icon: MessageSquareHeart,
      accentBg: "from-[#EBCFC6]/50 via-[#F7F6F4] to-[#CFE6E2]/25",
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

  // Minimalist Master-Detail Clinical Workspace (Without nested boxes around every sentence)
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
        {/* Mobile Horizontal Chip Selector */}
        <div className="lg:hidden space-y-2">
          <div className="flex items-center justify-between gap-2 px-1">
            <p className="text-xs font-medium text-[#4A3A33]">
              {subsectionTitle} ({activeIndex + 1}/{items.length})
            </p>
            <span className="text-[11px] font-normal text-[#9A7B6C]">
              Desliza →
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
                  className={`snap-start shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-2 border ${
                    isSelected
                      ? "bg-[#4A3A33] text-[#FAF7F2] border-[#4A3A33]"
                      : "bg-white/80 text-[#4A3A33]/80 border-[#E6D9C8]"
                  }`}
                >
                  <span className="text-[10px] opacity-70 shrink-0">0{idx + 1}</span>
                  <span className="whitespace-nowrap max-w-[230px] sm:max-w-none truncate">{item.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Master-Detail Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (Desktop): Minimalist Unboxed Hairline List inside a single soft card */}
          <div className="hidden lg:block lg:col-span-4 bg-[#EBCFC6]/35 backdrop-blur-sm rounded-[2rem] p-6 border border-[#D7A7A8]/55 space-y-4 lg:sticky lg:top-24">
            <div className="pb-3 border-b border-[#D7A7A8]/45">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#9A7B6C]">
                Subsección Activa
              </span>
              <h3 className="font-serif text-xl font-normal text-[#4A3A33] mt-0.5">
                {subsectionTitle}
              </h3>
              <p className="text-xs text-[#9A7B6C] font-normal mt-1">
                {subsectionDescription}
              </p>
            </div>

            <div className="divide-y divide-[#D7A7A8]/35">
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
                    className={`w-full text-left py-3 px-2.5 rounded-xl transition-all duration-200 flex items-center justify-between gap-3 ${
                      isSelected
                        ? "bg-[#EBCFC6]/70 text-[#4A3A33] font-medium"
                        : "text-[#4A3A33]/80 hover:text-[#4A3A33] hover:bg-[#F7F6F4]"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`text-[11px] font-medium shrink-0 ${
                          isSelected ? "text-[#D7A7A8]" : "text-[#9A7B6C]"
                        }`}
                      >
                        0{idx + 1}
                      </span>
                      <span className="text-xs sm:text-sm leading-snug truncate">
                        {item.title}
                      </span>
                    </div>
                    <ChevronRight
                      className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                        isSelected
                          ? "text-[#4A3A33] translate-x-0.5"
                          : "text-[#9A7B6C]/60"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-[#D7A7A8]/45 space-y-2">
              <p className="text-xs font-medium text-[#4A3A33]">
                ¿Dudas sobre tarifas o preparación?
              </p>
              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-full bg-[#F7F6F4] hover:bg-[#4A3A33] text-[#4A3A33] hover:text-[#F7F6F4] border border-[#D7A7A8]/60 text-xs font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#D7A7A8]" />
                <span>WhatsApp: {CONTACT_INFO.whatsappDisplay}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Soft Apunte Médico / Checklist Sheet */}
          {active && (
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                  className="bg-[#F7F6F4] rounded-[2rem] border border-[#D7A7A8]/60 shadow-[0_15px_45px_-20px_rgba(74,58,51,0.08)] overflow-hidden"
                >
                  {/* Visual Image Header */}
                  <div className="relative h-48 sm:h-64 bg-[#EBCFC6]/45">
                    <Image
                      src={active.image}
                      alt={active.title}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#4A3A33]/85 via-[#4A3A33]/30 to-transparent" />

                    <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full bg-[#F7F6F4]/95 text-[#4A3A33] text-[10px] sm:text-[11px] font-medium uppercase tracking-wider">
                        {active.subcategory}
                      </span>

                      {active.durationOrTiming && (
                        <span className="px-3 py-1 rounded-full bg-[#4A3A33]/85 text-[#F7F6F4] text-[10px] sm:text-[11px] font-normal flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-[#EBCFC6]" />
                          {active.durationOrTiming}
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-4 left-5 right-5 sm:bottom-6 sm:left-8 sm:right-8">
                      <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#F7F6F4] leading-tight">
                        {active.title}
                      </h2>
                      <p className="hidden sm:block mt-1.5 text-xs sm:text-sm text-[#F7F6F4]/85 font-normal max-w-2xl line-clamp-2">
                        {active.shortDescription}
                      </p>
                    </div>
                  </div>

                  {/* Main Body Container (Apunte Médico / Checklist de Indicaciones) */}
                  <div className="p-5 sm:p-8 space-y-5">
                    <p className="sm:hidden text-xs text-[#4A3A33]/85 font-normal leading-relaxed">
                      {active.shortDescription}
                    </p>

                    {/* Specialist & Schedule Strip */}
                    <div className="pb-4 border-b border-[#D7A7A8]/45 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <UserCheck className="w-4 h-4 text-[#D7A7A8] shrink-0 stroke-[1.75]" />
                        <div>
                          <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#9A7B6C] block">
                            Realizado por
                          </span>
                          <p className="text-xs sm:text-sm font-medium text-[#4A3A33]">
                            {active.recommendedSpecialist}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onOpenAppointment(active.title)}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#4A3A33] hover:bg-[#4A3A33]/90 text-[#F7F6F4] font-medium text-xs flex items-center justify-center gap-2 transition-all shrink-0"
                      >
                        <Calendar className="w-3.5 h-3.5 text-[#EBCFC6]" />
                        <span>( Agendar )</span>
                      </button>
                    </div>

                    {/* Interactive Topic Tabs */}
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#9A7B6C]">
                          Apunte Médico · Checklist de Indicaciones
                        </span>
                        <button
                          type="button"
                          onClick={() => setShowAllExpanded(!showAllExpanded)}
                          className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#9A7B6C] hover:text-[#4A3A33] transition-colors"
                        >
                          <Layers className="w-3 h-3 text-[#D7A7A8]" />
                          <span>
                            {showAllExpanded
                              ? "Ver por pestañas"
                              : "Ver todo"}
                          </span>
                        </button>
                      </div>

                      {!showAllExpanded && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 rounded-2xl sm:rounded-full bg-[#EBCFC6]/45 border border-[#D7A7A8]/55">
                          {detailTabs.map((tab) => {
                            const TabIcon = tab.icon;
                            const isTabActive = detailTab === tab.id;
                            return (
                              <button
                                key={tab.id}
                                type="button"
                                onClick={() => setDetailTab(tab.id)}
                                className={`py-2 px-3 rounded-xl sm:rounded-full text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                                  isTabActive
                                    ? "bg-[#4A3A33] text-[#F7F6F4]"
                                    : "text-[#4A3A33]/75 hover:text-[#4A3A33]"
                                }`}
                              >
                                <TabIcon
                                  className={`w-3.5 h-3.5 shrink-0 stroke-[1.75] ${
                                    isTabActive
                                      ? "text-[#EBCFC6]"
                                      : "text-[#9A7B6C]"
                                  }`}
                                />
                                <span className="truncate">{tab.shortLabel}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* Unboxed Editorial Tab Content */}
                      <div className="space-y-6 divide-y divide-[#E6D9C8]/50">
                        {/* 1. ¿Qué es? */}
                        {(showAllExpanded || detailTab === "que-es") && (
                          <motion.div
                            key="tab-que-es"
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.18 }}
                            className="pt-2 space-y-3.5"
                          >
                            <h4 className="font-serif text-lg sm:text-xl font-normal text-[#4A3A33]">
                              ¿Qué es y en qué consiste {active.title.toLowerCase()}?
                            </h4>

                            <div className="space-y-2.5">
                              {whatIsItPoints.map((sentence, idx) => (
                                <p
                                  key={idx}
                                  className="text-xs sm:text-sm text-[#4A3A33]/85 font-normal leading-relaxed flex items-start gap-2.5"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#8FC1BB] shrink-0 mt-2" />
                                  <span>{sentence}</span>
                                </p>
                              ))}
                            </div>

                            {!showAllExpanded && (
                              <div className="pt-2 flex justify-end">
                                <button
                                  type="button"
                                  onClick={() => setDetailTab("como-se-hace")}
                                  className="text-xs font-medium text-[#9A7B6C] hover:text-[#4A3A33] inline-flex items-center gap-1 transition-colors"
                                >
                                  <span>Siguiente: ¿Cómo se realiza?</span>
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}
                          </motion.div>
                        )}

                        {/* 2. ¿Cómo se realiza? */}
                        {(showAllExpanded || detailTab === "como-se-hace") && (
                          <motion.div
                            key="tab-como-se-hace"
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.18 }}
                            className="pt-4 space-y-3.5"
                          >
                            <h4 className="font-serif text-lg sm:text-xl font-normal text-[#4A3A33]">
                              ¿Cómo lo realiza paso a paso el equipo de CediMujer?
                            </h4>

                            <div className="space-y-3">
                              {howItIsDonePoints.map((stepText, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-start gap-3"
                                >
                                  <span className="font-serif text-sm text-[#8FC1BB] font-normal shrink-0 mt-0.5">
                                    0{idx + 1}.
                                  </span>
                                  <p className="text-xs sm:text-sm text-[#4A3A33]/85 font-normal leading-relaxed">
                                    {stepText}
                                  </p>
                                </div>
                              ))}
                            </div>

                            {!showAllExpanded && (
                              <div className="pt-2 flex items-center justify-between gap-2">
                                <button
                                  type="button"
                                  onClick={() => setDetailTab("que-es")}
                                  className="text-xs font-normal text-[#9A7B6C] hover:text-[#4A3A33]"
                                >
                                  ← Anterior
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setDetailTab("preparacion")}
                                  className="text-xs font-medium text-[#9A7B6C] hover:text-[#4A3A33] inline-flex items-center gap-1 transition-colors"
                                >
                                  <span>Siguiente: Preparación</span>
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}
                          </motion.div>
                        )}

                        {/* 3. Preparación */}
                        {(showAllExpanded || detailTab === "preparacion") && (
                          <motion.div
                            key="tab-preparacion"
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.18 }}
                            className="pt-4 space-y-3.5"
                          >
                            <h4 className="font-serif text-lg sm:text-xl font-normal text-[#4A3A33]">
                              Preparación e indicaciones para la paciente
                            </h4>

                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {active.preparationAndIndications.map(
                                (prep, idx) => (
                                  <li
                                    key={idx}
                                    className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4A3A33]/85 font-normal leading-relaxed"
                                  >
                                    <CheckCircle2 className="w-4 h-4 text-[#8FC1BB] shrink-0 mt-0.5 stroke-[1.75]" />
                                    <span>{prep}</span>
                                  </li>
                                )
                              )}
                            </ul>

                            {!showAllExpanded && (
                              <div className="pt-2 flex items-center justify-between gap-2">
                                <button
                                  type="button"
                                  onClick={() => setDetailTab("como-se-hace")}
                                  className="text-xs font-normal text-[#9A7B6C] hover:text-[#4A3A33]"
                                >
                                  ← Anterior
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setDetailTab("beneficios")}
                                  className="text-xs font-medium text-[#9A7B6C] hover:text-[#4A3A33] inline-flex items-center gap-1 transition-colors"
                                >
                                  <span>Siguiente: Ventajas CediMujer</span>
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}
                          </motion.div>
                        )}

                        {/* 4. Ventajas */}
                        {(showAllExpanded || detailTab === "beneficios") && (
                          <motion.div
                            key="tab-beneficios"
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.18 }}
                            className="pt-4 space-y-3.5"
                          >
                            <h4 className="font-serif text-lg sm:text-xl font-normal text-[#4A3A33]">
                              Ventajas de realizarlo en CediMujer Sabaneta
                            </h4>

                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {active.highlights.map((hl, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4A3A33]/85 font-normal leading-relaxed"
                                >
                                  <CheckCircle2 className="w-4 h-4 text-[#D7A7A8] shrink-0 mt-0.5 stroke-[1.75]" />
                                  <span>{hl}</span>
                                </li>
                              ))}
                            </ul>

                            {!showAllExpanded && (
                              <div className="pt-2 flex justify-start">
                                <button
                                  type="button"
                                  onClick={() => setDetailTab("preparacion")}
                                  className="text-xs font-normal text-[#9A7B6C] hover:text-[#4A3A33]"
                                >
                                  ← Volver a Preparación
                                </button>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="pt-5 border-t border-[#E6D9C8]/60 flex flex-col sm:flex-row gap-3">
                      <button
                        type="button"
                        onClick={() => onOpenAppointment(active.title)}
                        className="flex-1 py-3.5 px-6 rounded-full bg-[#4A3A33] hover:bg-[#4A3A33]/90 text-[#FAF7F2] font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
                      >
                        <Calendar className="w-4 h-4 text-[#8FC1BB]" />
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
                        className="py-3.5 px-6 rounded-full bg-[#FAF7F2] hover:bg-[#E6D9C8]/50 text-[#4A3A33] border border-[#E6D9C8] font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
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

        {/* Quick Related Studies Strip */}
        <div className="pt-8 border-t border-[#E6D9C8]/60">
          <div className="flex items-center justify-between gap-2 mb-5">
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#4A3A33]">
              Explorar más en {subsectionTitle} ({items.length})
            </h3>
            <span className="md:hidden text-[11px] font-normal text-[#9A7B6C]">
              Desliza →
            </span>
          </div>

          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 overflow-x-auto pb-2 md:pb-0 no-scrollbar snap-x">
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
                  className={`snap-start shrink-0 w-72 md:w-auto cursor-pointer rounded-[1.75rem] bg-white/75 border p-5 transition-all flex flex-col justify-between gap-3 ${
                    isCurrent
                      ? "border-[#8FC1BB]"
                      : "border-[#E6D9C8]/70 hover:border-[#8FC1BB]/60"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="relative h-36 sm:h-40 rounded-2xl overflow-hidden bg-[#E6D9C8]/30">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#4A3A33]/70 via-transparent to-transparent" />
                      <span className="absolute bottom-3 left-3.5 right-3.5 font-serif text-sm sm:text-base font-normal text-[#FAF7F2] leading-snug">
                        {item.title}
                      </span>
                    </div>
                    <p className="text-xs text-[#4A3A33]/75 font-normal leading-relaxed line-clamp-2">
                      {item.shortDescription}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#E6D9C8]/50">
                    <span className="text-[11px] font-medium text-[#9A7B6C]">
                      {isCurrent ? "● Seleccionado" : "Ver guía →"}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenAppointment(item.title);
                      }}
                      className="px-3.5 py-1 rounded-full bg-[#FAF7F2] hover:bg-[#4A3A33] text-[#4A3A33] hover:text-[#FAF7F2] border border-[#E6D9C8] text-[11px] font-medium transition-colors"
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
    <div className="pt-20 sm:pt-24 pb-16 min-h-screen bg-[#F7F6F4]">
      {/* Open Editorial Section Header (Unboxed) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        <div className="pb-8 sm:pb-12 border-b border-[#D7A7A8]/50">
          {/* Top Navigation Strip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8 pb-4 border-b border-[#D7A7A8]/40">
            <button
              type="button"
              onClick={onBackToHome}
              className="self-start sm:self-auto shrink-0 inline-flex items-center gap-2 text-[#4A3A33]/75 hover:text-[#4A3A33] text-xs font-medium tracking-wide transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
              <span>Volver al inicio</span>
            </button>

            <div className="flex items-center gap-4 sm:gap-5 overflow-x-auto no-scrollbar py-0.5 w-full sm:w-auto">
              {(
                [
                  { id: "embarazo", label: "Embarazo" },
                  { id: "ginecologia", label: "Ginecología" },
                  { id: "cardiodiagnostico", label: "Cardiodiagnóstico" },
                  { id: "ultrasonido-radiologia", label: "Ultrasonido y Radiología" },
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
                  className={`relative shrink-0 py-1 text-xs transition-colors whitespace-nowrap ${
                    view === sec.id
                      ? "text-[#4A3A33] font-medium"
                      : "text-[#4A3A33]/60 hover:text-[#4A3A33] font-normal"
                  }`}
                >
                  {sec.label}
                  {view === sec.id && (
                    <span className="absolute bottom-0 inset-x-0 h-[1.5px] bg-[#D7A7A8] rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Section Title & Visual */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
              <div className="inline-flex items-center gap-2 sm:gap-2.5 text-[#9A7B6C] text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.16em] sm:tracking-[0.24em]">
                <span className="w-5 sm:w-6 h-[1px] bg-[#9A7B6C]/60 shrink-0" />
                <BannerIcon className="w-3.5 h-3.5 text-[#8FC1BB] stroke-[1.75] shrink-0" />
                <span className="sm:hidden">{currentBanner.shortBadge}</span>
                <span className="hidden sm:inline">{currentBanner.badge}</span>
              </div>

              <h1 className="font-serif text-2xl sm:text-4xl lg:text-[3rem] font-normal text-[#4A3A33] tracking-tight leading-[1.15]">
                <span className="sm:hidden">{currentBanner.mobileTitle}</span>
                <span className="hidden sm:inline">{currentBanner.title}</span>
              </h1>

              <p className="text-xs sm:text-base text-[#4A3A33]/75 font-light leading-relaxed max-w-xl">
                <span className="sm:hidden">{currentBanner.mobileSubtitle}</span>
                <span className="hidden sm:inline">{currentBanner.subtitle}</span>
              </p>

              <div className="flex flex-wrap items-center gap-3 sm:gap-5 pt-1 sm:pt-2">
                <button
                  type="button"
                  onClick={() => onOpenAppointment()}
                  className="px-5 sm:px-6 py-2.5 rounded-full bg-[#4A3A33] hover:bg-[#3A2D27] text-[#FAF7F2] font-medium text-xs tracking-wide flex items-center gap-2 transition-all"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#8FC1BB]" />
                  <span>Agendar Cita</span>
                </button>
                <a
                  href={CONTACT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 text-[#4A3A33]/85 hover:text-[#4A3A33] font-medium text-xs tracking-wide flex items-center gap-2 border-b border-[#4A3A33]/25 hover:border-[#4A3A33] transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-[#8FC1BB]" />
                  <span>Asesoría: {CONTACT_INFO.whatsappDisplay}</span>
                </a>
              </div>
            </div>

            <div className="hidden lg:block lg:col-span-5">
              <div className="relative h-60 rounded-t-[6rem] rounded-b-[1.75rem] overflow-hidden border border-[#E6D9C8]/80 shadow-[0_20px_50px_-20px_rgba(74,58,51,0.12)] bg-[#E6D9C8]/40">
                <Image
                  src={currentBanner.image}
                  alt={currentBanner.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A3A33]/50 via-transparent to-transparent" />
                <span className="absolute bottom-3.5 left-5 text-xs font-normal text-[#FAF7F2]">
                  {CONTACT_INFO.addressShort} · Sabaneta
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. EMBARAZO */}
        {view === "embarazo" && (
          <div className="space-y-8 sm:space-y-10">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => handleSelectEmbarazoSub("consultas")}
                className={`px-5 py-2.5 rounded-full text-xs font-medium flex items-center gap-2 transition-all ${
                  embarazoSub === "consultas"
                    ? "bg-[#4A3A33] text-[#FAF7F2]"
                    : "bg-white/75 text-[#4A3A33]/80 hover:bg-white border border-[#E6D9C8]"
                }`}
              >
                <Stethoscope className="w-3.5 h-3.5 text-[#8FC1BB]" />
                <span>Consultas (3)</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectEmbarazoSub("bienestar")}
                className={`px-5 py-2.5 rounded-full text-xs font-medium flex items-center gap-2 transition-all ${
                  embarazoSub === "bienestar"
                    ? "bg-[#4A3A33] text-[#FAF7F2]"
                    : "bg-white/75 text-[#4A3A33]/80 hover:bg-white border border-[#E6D9C8]"
                }`}
              >
                <HeartPulse className="w-3.5 h-3.5 text-[#8FC1BB]" />
                <span>Bienestar Fetal (3)</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectEmbarazoSub("ecografias")}
                className={`px-5 py-2.5 rounded-full text-xs font-medium flex items-center gap-2 transition-all ${
                  embarazoSub === "ecografias"
                    ? "bg-[#4A3A33] text-[#FAF7F2]"
                    : "bg-white/75 text-[#4A3A33]/80 hover:bg-white border border-[#E6D9C8]"
                }`}
              >
                <Activity className="w-3.5 h-3.5 text-[#8FC1BB]" />
                <span>Ecografías (4)</span>
              </button>

              <button
                type="button"
                onClick={onOpenCalculator}
                className="px-5 py-2.5 rounded-full text-xs font-medium flex items-center gap-2 bg-[#EBCFC6]/55 hover:bg-[#EBCFC6]/85 text-[#4A3A33] border border-[#D7A7A8]/50 transition-all"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Calculadora Gestacional</span>
              </button>
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

        {/* 2. GINECOLOGÍA */}
        {view === "ginecologia" && (
          <div className="space-y-8 sm:space-y-10">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => handleSelectGinecologiaSub("ecografias")}
                className={`px-5 py-2.5 rounded-full text-xs font-medium flex items-center gap-2 transition-all ${
                  ginecologiaSub === "ecografias"
                    ? "bg-[#4A3A33] text-[#FAF7F2]"
                    : "bg-white/75 text-[#4A3A33]/80 hover:bg-white border border-[#E6D9C8]"
                }`}
              >
                <Activity className="w-3.5 h-3.5 text-[#8FC1BB]" />
                <span>Ecografías (5)</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectGinecologiaSub("consultas")}
                className={`px-5 py-2.5 rounded-full text-xs font-medium flex items-center gap-2 transition-all ${
                  ginecologiaSub === "consultas"
                    ? "bg-[#4A3A33] text-[#FAF7F2]"
                    : "bg-white/75 text-[#4A3A33]/80 hover:bg-white border border-[#E6D9C8]"
                }`}
              >
                <Stethoscope className="w-3.5 h-3.5 text-[#8FC1BB]" />
                <span>Consultas (5)</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectGinecologiaSub("tamizajes")}
                className={`px-5 py-2.5 rounded-full text-xs font-medium flex items-center gap-2 transition-all ${
                  ginecologiaSub === "tamizajes"
                    ? "bg-[#4A3A33] text-[#FAF7F2]"
                    : "bg-white/75 text-[#4A3A33]/80 hover:bg-white border border-[#E6D9C8]"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#8FC1BB]" />
                <span>Tamizajes (3)</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectGinecologiaSub("procedimientos")}
                className={`px-5 py-2.5 rounded-full text-xs font-medium flex items-center gap-2 transition-all ${
                  ginecologiaSub === "procedimientos"
                    ? "bg-[#4A3A33] text-[#FAF7F2]"
                    : "bg-white/75 text-[#4A3A33]/80 hover:bg-white border border-[#E6D9C8]"
                }`}
              >
                <Microscope className="w-3.5 h-3.5 text-[#8FC1BB]" />
                <span>Procedimientos (6)</span>
              </button>
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

        {/* 3. CARDIODIAGNÓSTICO */}
        {view === "cardiodiagnostico" && (
          <div className="space-y-8 sm:space-y-10">
            {renderInteractiveClinicalWorkspace(
              CARDIODIAGNOSTICO_SERVICES,
              "Estudios de Cardiodiagnóstico",
              "Electrocardiograma de reposo, Ecocardiograma Transtorácico Doppler Color y Monitoreo 24h (MAPA / Holter)."
            )}
          </div>
        )}

        {/* 4. ULTRASONIDO Y RADIOLOGÍA GENERAL */}
        {view === "ultrasonido-radiologia" && (
          <div className="space-y-8 sm:space-y-10">
            {renderInteractiveClinicalWorkspace(
              ULTRASONIDO_RADIOLOGIA_SERVICES,
              "Ultrasonido y Radiología General",
              "Ecografía abdominal, renal, tiroides, tejidos blandos y Doppler vascular periférico."
            )}
          </div>
        )}

        {/* 5. TELEMEDICINA */}
        {view === "telemedicina" && (
          <div className="space-y-8 sm:space-y-10">
            {renderInteractiveClinicalWorkspace(
              TELEMEDICINA_SERVICES,
              "Servicios de Telemedicina",
              "Teleconsulta con especialista en Ginecología, Planificación Familiar e Infertilidad."
            )}
          </div>
        )}

        {/* 4. QUIÉNES SOMOS */}
        {view === "quienes-somos" && (
          <div className="space-y-10 -mt-4">
            <About onOpenAppointment={onOpenAppointment} isStandalonePage />
            <Testimonials />
          </div>
        )}

        {/* 5. BLOG Y PREGUNTAS FRECUENTES */}
        {view === "blog" && (
          <div className="-mt-4">
            <BlogAndFaq onOpenAppointment={onOpenAppointment} isStandalonePage />
          </div>
        )}

        {/* 6. CONTACTO Y ATENCIÓN AL CLIENTE */}
        {view === "contacto" && (
          <div className="-mt-4">
            <LocationMap isStandalonePage />
          </div>
        )}
      </div>
    </div>
  );
};
