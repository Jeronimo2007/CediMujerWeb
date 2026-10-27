"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Baby,
  Stethoscope,
  Video,
  Activity,
  Sparkles,
  Calendar,
  CheckCircle2,
  Calculator,
  Info,
  Microscope,
  HeartPulse,
  ShieldCheck,
  ChevronRight,
  X,
  Phone,
  UserCheck,
  Clock,
} from "lucide-react";
import {
  EMBARAZO_SERVICES,
  GINECOLOGIA_SERVICES,
  TELEMEDICINA_SERVICES,
  CONTACT_INFO,
  ServiceItemDetail,
} from "@/config/cedimujerContent";

interface ServicesProps {
  onSelectService?: (serviceName: string) => void;
  onOpenCalculator?: () => void;
}

type EmbarazoTab = "consultas" | "bienestar" | "ecografias";
type GinecologiaTab = "ecografias" | "consultas" | "tamizajes" | "procedimientos";

export const Services: React.FC<ServicesProps> = ({
  onSelectService,
  onOpenCalculator,
}) => {
  const [embarazoTab, setEmbarazoTab] = useState<EmbarazoTab>("consultas");
  const [ginecologiaTab, setGinecologiaTab] = useState<GinecologiaTab>("ecografias");
  const [selectedDetailItem, setSelectedDetailItem] = useState<ServiceItemDetail | null>(null);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  // Listen for Navbar deep-navigation events
  useEffect(() => {
    const handleNav = (e: Event) => {
      const customEvent = e as CustomEvent<{
        href?: string;
        subKey?: string;
        itemId?: string;
      }>;
      const { subKey, itemId } = customEvent.detail || {};

      if (subKey === "embarazo-consultas") setEmbarazoTab("consultas");
      if (subKey === "embarazo-bienestar") setEmbarazoTab("bienestar");
      if (subKey === "embarazo-ecografias") setEmbarazoTab("ecografias");

      if (subKey === "ginecologia-ecografias") setGinecologiaTab("ecografias");
      if (subKey === "ginecologia-consultas") setGinecologiaTab("consultas");
      if (subKey === "ginecologia-tamizajes") setGinecologiaTab("tamizajes");
      if (subKey === "ginecologia-procedimientos") setGinecologiaTab("procedimientos");

      if (itemId) {
        setHighlightedId(itemId);
        const allItems = [
          ...EMBARAZO_SERVICES.consultas,
          ...EMBARAZO_SERVICES.bienestarFetal,
          ...EMBARAZO_SERVICES.ecografias,
          ...GINECOLOGIA_SERVICES.ecografias,
          ...GINECOLOGIA_SERVICES.consultas,
          ...GINECOLOGIA_SERVICES.tamizajes,
          ...GINECOLOGIA_SERVICES.procedimientos,
          ...TELEMEDICINA_SERVICES,
        ];
        const found = allItems.find((i) => i.id === itemId);
        if (found) {
          setTimeout(() => {
            const cardEl = document.getElementById(itemId);
            if (cardEl) {
              cardEl.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          }, 220);
        }
        setTimeout(() => setHighlightedId(null), 3500);
      }
    };

    window.addEventListener("cedimujer:navigate", handleNav);
    return () => window.removeEventListener("cedimujer:navigate", handleNav);
  }, []);

  const currentEmbarazoList =
    embarazoTab === "consultas"
      ? EMBARAZO_SERVICES.consultas
      : embarazoTab === "bienestar"
      ? EMBARAZO_SERVICES.bienestarFetal
      : EMBARAZO_SERVICES.ecografias;

  const currentGinecologiaList =
    ginecologiaTab === "ecografias"
      ? GINECOLOGIA_SERVICES.ecografias
      : ginecologiaTab === "consultas"
      ? GINECOLOGIA_SERVICES.consultas
      : ginecologiaTab === "tamizajes"
      ? GINECOLOGIA_SERVICES.tamizajes
      : GINECOLOGIA_SERVICES.procedimientos;

  const renderServiceCard = (item: ServiceItemDetail, accentVariant: "mint" | "rose" | "sand") => {
    const isHighlighted = highlightedId === item.id;
    const badgeColors =
      accentVariant === "mint"
        ? "bg-[#CFE6E2] text-[#4A3A33] border-[#8FC1BB]"
        : accentVariant === "rose"
        ? "bg-[#EBCFC6] text-[#4A3A33] border-[#D7A7A8]"
        : "bg-[#E6D9C8] text-[#4A3A33] border-[#9A7B6C]/40";

    return (
      <motion.article
        key={item.id}
        id={item.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className={`group rounded-3xl bg-[#F7F2EC] border-2 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-md hover:shadow-xl ${
          isHighlighted
            ? "border-[#8FC1BB] ring-4 ring-[#8FC1BB]/40 scale-[1.01]"
            : "border-[#E6D9C8] hover:border-[#8FC1BB]"
        }`}
      >
        <div>
          {/* Image Banner */}
          <div className="relative h-52 overflow-hidden bg-[#4A3A33]">
            <Image
              src={item.image}
              alt={item.title}
              fill
              unoptimized
              className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#4A3A33]/85 via-[#4A3A33]/25 to-transparent" />

            {/* Subcategory Pill */}
            <span
              className={`absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-[11px] font-extrabold border shadow-sm ${badgeColors}`}
            >
              {item.subcategory}
            </span>

            {item.durationOrTiming && (
              <span className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-[#4A3A33]/90 text-[#F7F2EC] text-[10px] font-bold flex items-center gap-1 border border-[#E6D9C8]/30">
                <Clock className="w-3 h-3 text-[#8FC1BB]" />
                {item.durationOrTiming}
              </span>
            )}

            {/* Title overlay on bottom of image */}
            <div className="absolute bottom-3.5 left-4 right-4">
              <h4 className="text-lg sm:text-xl font-black text-[#F7F2EC] leading-snug group-hover:text-[#CFE6E2] transition-colors">
                {item.title}
              </h4>
            </div>
          </div>

          {/* Explanatory Content Body */}
          <div className="p-5 sm:p-6 space-y-4">
            <p className="text-xs sm:text-sm text-[#4A3A33] font-bold leading-relaxed">
              {item.shortDescription}
            </p>

            {/* Explanatory Box 1: ¿Qué es? */}
            <div className="p-3.5 rounded-2xl bg-white/85 border border-[#E6D9C8] space-y-1.5">
              <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#8FC1BB]">
                <Info className="w-3.5 h-3.5 shrink-0" />
                <span>¿Qué es y para qué sirve?</span>
              </div>
              <p className="text-xs text-[#4A3A33]/90 font-medium leading-relaxed line-clamp-4">
                {item.whatIsIt}
              </p>
            </div>

            {/* Explanatory Box 2: ¿Cómo se realiza en CediMujer? */}
            <div className="p-3.5 rounded-2xl bg-[#E6D9C8]/35 border border-[#E6D9C8] space-y-1.5">
              <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#9A7B6C]">
                <Microscope className="w-3.5 h-3.5 text-[#4A3A33] shrink-0" />
                <span>¿Cómo se realiza en CediMujer?</span>
              </div>
              <p className="text-xs text-[#4A3A33]/90 font-medium leading-relaxed line-clamp-4">
                {item.howItIsDone}
              </p>
            </div>

            {/* Highlights Checklist */}
            <ul className="space-y-1.5 pt-1">
              {item.highlights.map((hl, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-xs text-[#4A3A33] font-semibold"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#8FC1BB] shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 sm:p-6 pt-0 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setSelectedDetailItem(item)}
              className="py-2.5 px-3 rounded-xl bg-[#E6D9C8]/70 hover:bg-[#EBCFC6] text-[#4A3A33] font-extrabold text-xs transition-colors flex items-center justify-center gap-1 border border-[#E6D9C8]"
            >
              <span>Ver Preparación</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => onSelectService && onSelectService(item.title)}
              className="py-2.5 px-3 rounded-xl bg-[#8FC1BB] hover:bg-[#8FC1BB]/90 text-[#4A3A33] font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm border border-[#8FC1BB]"
            >
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              <span>Agendar Cita</span>
            </button>
          </div>
        </div>
      </motion.article>
    );
  };

  return (
    <div id="servicios" className="scroll-mt-20 space-y-20 py-14 sm:py-20">
      {/* =====================================================================
          SECCIÓN 1: EMBARAZO (Consultas, Pruebas de Bienestar Fetal, Ecografías y Calculadora)
      ===================================================================== */}
      <section id="embarazo" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2.25rem] bg-gradient-to-br from-[#CFE6E2]/45 via-[#F7F2EC] to-[#EBCFC6]/35 border border-[#8FC1BB]/40 p-6 sm:p-10 lg:p-12 shadow-lg">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E6D9C8]">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8FC1BB]/25 border border-[#8FC1BB] text-[#4A3A33] text-xs font-black uppercase tracking-wider mb-3">
                <Baby className="w-4 h-4 text-[#4A3A33]" />
                <span>Sección 01 · Embarazo y Medicina Materno-Fetal</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-[#4A3A33] tracking-tight">
                Embarazo: Consultas, Bienestar Fetal y Ecografías
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#9A7B6C] font-semibold leading-relaxed">
                Acompañamos cada semana de tu gestación con calidez humana, explicaciones detalladas para toda la familia y tecnología de ultrasonido 3D/4D HD Live de última generación.
              </p>
            </div>

            {/* Sub-section Tabs for Embarazo */}
            <div className="flex flex-wrap gap-2 bg-[#E6D9C8]/60 p-1.5 rounded-2xl border border-[#E6D9C8]">
              <button
                type="button"
                onClick={() => setEmbarazoTab("consultas")}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 ${
                  embarazoTab === "consultas"
                    ? "bg-[#8FC1BB] text-[#4A3A33] shadow-md"
                    : "text-[#4A3A33] hover:bg-[#F7F2EC]"
                }`}
              >
                <Stethoscope className="w-4 h-4" />
                <span>Consultas (3)</span>
              </button>

              <button
                type="button"
                onClick={() => setEmbarazoTab("bienestar")}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 ${
                  embarazoTab === "bienestar"
                    ? "bg-[#8FC1BB] text-[#4A3A33] shadow-md"
                    : "text-[#4A3A33] hover:bg-[#F7F2EC]"
                }`}
              >
                <HeartPulse className="w-4 h-4" />
                <span>Pruebas de Bienestar Fetal (3)</span>
              </button>

              <button
                type="button"
                onClick={() => setEmbarazoTab("ecografias")}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 ${
                  embarazoTab === "ecografias"
                    ? "bg-[#8FC1BB] text-[#4A3A33] shadow-md"
                    : "text-[#4A3A33] hover:bg-[#F7F2EC]"
                }`}
              >
                <Activity className="w-4 h-4" />
                <span>Ecografías de Embarazo (4)</span>
              </button>
            </div>
          </div>

          {/* Cards Grid for Active Embarazo Subsection */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence mode="popLayout">
              {currentEmbarazoList.map((item) => renderServiceCard(item, "mint"))}
            </AnimatePresence>
          </div>

          {/* Otras secciones de embarazo: Ecografías + Calculadora Gestacional Highlight Bar */}
          <div className="mt-10 pt-8 border-t border-[#E6D9C8] grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-[#F7F2EC] border border-[#8FC1BB]/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
              <div className="space-y-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#8FC1BB]">
                  Otras Secciones de Embarazo · Ecografías
                </span>
                <h4 className="text-lg font-black text-[#4A3A33]">
                  Ecografías 3D/4D HD Live y Tercer Nivel (Detalle Anatómico)
                </h4>
                <p className="text-xs text-[#9A7B6C] font-semibold">
                  Conoce la carita de tu bebé con el Dr. Diego León Gaviria y nuestro equipo especializado.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEmbarazoTab("ecografias")}
                className="shrink-0 px-5 py-3 rounded-2xl bg-[#8FC1BB] hover:bg-[#8FC1BB]/90 text-[#4A3A33] font-extrabold text-xs transition-all shadow-sm"
              >
                Ver Ecografías Obstétricas →
              </button>
            </div>

            <div className="p-6 rounded-3xl bg-gradient-to-r from-[#EBCFC6]/70 to-[#CFE6E2]/70 border border-[#D7A7A8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
              <div className="space-y-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#4A3A33]">
                  Otras Secciones de Embarazo · Herramienta Interactiva
                </span>
                <h4 className="text-lg font-black text-[#4A3A33]">
                  Calculadora Gestacional CediMujer
                </h4>
                <p className="text-xs text-[#4A3A33]/85 font-semibold">
                  Calcula tus semanas exactas de embarazo, fecha probable de parto y ecografías sugeridas.
                </p>
              </div>
              <button
                type="button"
                onClick={onOpenCalculator}
                className="shrink-0 px-5 py-3 rounded-2xl bg-[#4A3A33] hover:bg-[#4A3A33]/90 text-[#F7F2EC] font-extrabold text-xs flex items-center gap-2 transition-all shadow-md"
              >
                <Calculator className="w-4 h-4 text-[#8FC1BB]" />
                <span>Abrir Calculadora</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECCIÓN 2: GINECOLOGÍA (Ecografías, Consultas, Tamizajes, Procedimientos)
      ===================================================================== */}
      <section id="ginecologia" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2.25rem] bg-gradient-to-br from-[#EBCFC6]/35 via-[#F7F2EC] to-[#E6D9C8]/50 border border-[#D7A7A8]/50 p-6 sm:p-10 lg:p-12 shadow-lg">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E6D9C8]">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBCFC6] border border-[#D7A7A8] text-[#4A3A33] text-xs font-black uppercase tracking-wider mb-3">
                <Stethoscope className="w-4 h-4 text-[#4A3A33]" />
                <span>Sección 02 · Ginecología Integral y Diagnóstico</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-[#4A3A33] tracking-tight">
                Ginecología: Ecografías, Consultas, Tamizajes y Procedimientos
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#9A7B6C] font-semibold leading-relaxed">
                Explora cada subsección para conocer qué es cada estudio o procedimiento, cómo lo realiza nuestro equipo de especialistas y cómo prepararte para tu visita.
              </p>
            </div>

            {/* Sub-section Tabs for Ginecología */}
            <div className="flex flex-wrap gap-2 bg-[#E6D9C8]/60 p-1.5 rounded-2xl border border-[#E6D9C8]">
              <button
                type="button"
                onClick={() => setGinecologiaTab("ecografias")}
                className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-1.5 ${
                  ginecologiaTab === "ecografias"
                    ? "bg-[#4A3A33] text-[#F7F2EC] shadow-md"
                    : "text-[#4A3A33] hover:bg-[#F7F2EC]"
                }`}
              >
                <Activity className="w-4 h-4 text-[#8FC1BB]" />
                <span>Ecografías (5)</span>
              </button>

              <button
                type="button"
                onClick={() => setGinecologiaTab("consultas")}
                className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-1.5 ${
                  ginecologiaTab === "consultas"
                    ? "bg-[#4A3A33] text-[#F7F2EC] shadow-md"
                    : "text-[#4A3A33] hover:bg-[#F7F2EC]"
                }`}
              >
                <Stethoscope className="w-4 h-4 text-[#8FC1BB]" />
                <span>Consultas (5)</span>
              </button>

              <button
                type="button"
                onClick={() => setGinecologiaTab("tamizajes")}
                className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-1.5 ${
                  ginecologiaTab === "tamizajes"
                    ? "bg-[#4A3A33] text-[#F7F2EC] shadow-md"
                    : "text-[#4A3A33] hover:bg-[#F7F2EC]"
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-[#8FC1BB]" />
                <span>Tamizajes (3)</span>
              </button>

              <button
                type="button"
                onClick={() => setGinecologiaTab("procedimientos")}
                className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-1.5 ${
                  ginecologiaTab === "procedimientos"
                    ? "bg-[#4A3A33] text-[#F7F2EC] shadow-md"
                    : "text-[#4A3A33] hover:bg-[#F7F2EC]"
                }`}
              >
                <Microscope className="w-4 h-4 text-[#8FC1BB]" />
                <span>Procedimientos (6)</span>
              </button>
            </div>
          </div>

          {/* Cards Grid for Active Ginecología Subsection */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence mode="popLayout">
              {currentGinecologiaList.map((item) => renderServiceCard(item, "rose"))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECCIÓN 3: TELEMEDICINA (Ginecología, Planificación Familiar, Infertilidad)
      ===================================================================== */}
      <section id="telemedicina" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2.25rem] bg-gradient-to-br from-[#E6D9C8]/60 via-[#F7F2EC] to-[#CFE6E2]/45 border border-[#9A7B6C]/30 p-6 sm:p-10 lg:p-12 shadow-lg">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E6D9C8]">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#CFE6E2] border border-[#8FC1BB] text-[#4A3A33] text-xs font-black uppercase tracking-wider mb-3">
                <Video className="w-4 h-4 text-[#4A3A33]" />
                <span>Sección 03 · Telemedicina CediMujer</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-[#4A3A33] tracking-tight">
                Teleconsulta con Especialistas desde Casa
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#9A7B6C] font-semibold leading-relaxed">
                Conéctate por videollamada con nuestro equipo de Ginecología para asesoría especializada, lectura de exámenes, planificación familiar o estudio de infertilidad sin desplazamientos.
              </p>
            </div>

            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#4A3A33] hover:bg-[#4A3A33]/90 text-[#F7F2EC] text-xs sm:text-sm font-extrabold shadow-md shrink-0"
            >
              <Phone className="w-4 h-4 text-[#8FC1BB]" />
              <span>Solicitar Teleconsulta: {CONTACT_INFO.whatsappDisplay}</span>
            </a>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {TELEMEDICINA_SERVICES.map((item) => renderServiceCard(item, "sand"))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          MODAL DETALLADO DE PROCEDIMIENTO / ECOGRAFÍA / SERVICIO
      ===================================================================== */}
      <AnimatePresence>
        {selectedDetailItem && (
          <div
            onClick={() => setSelectedDetailItem(null)}
            className="fixed inset-0 z-50 bg-[#4A3A33]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[90dvh] overflow-y-auto bg-[#F7F2EC] border-2 border-[#E6D9C8] rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* Modal Image Header */}
              <div className="relative h-56 sm:h-64 bg-[#4A3A33]">
                <Image
                  src={selectedDetailItem.image}
                  alt={selectedDetailItem.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A3A33] via-[#4A3A33]/40 to-transparent" />

                <button
                  type="button"
                  onClick={() => setSelectedDetailItem(null)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-[#F7F2EC] text-[#4A3A33] hover:bg-[#EBCFC6] transition-colors shadow-lg"
                  aria-label="Cerrar detalle"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-5 left-6 right-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#8FC1BB] text-[#4A3A33] text-xs font-black uppercase tracking-wider mb-2">
                    {selectedDetailItem.subcategory}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#F7F2EC]">
                    {selectedDetailItem.title}
                  </h3>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6">
                <div className="flex flex-wrap items-center gap-3 p-3.5 rounded-2xl bg-[#CFE6E2]/40 border border-[#8FC1BB]/40 text-xs font-bold text-[#4A3A33]">
                  <UserCheck className="w-4 h-4 text-[#8FC1BB] shrink-0" />
                  <span>Atendido por: {selectedDetailItem.recommendedSpecialist}</span>
                  {selectedDetailItem.durationOrTiming && (
                    <>
                      <span>•</span>
                      <span>{selectedDetailItem.durationOrTiming}</span>
                    </>
                  )}
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-black uppercase tracking-wider text-[#4A3A33] flex items-center gap-2">
                    <Info className="w-4 h-4 text-[#8FC1BB]" />
                    <span>¿Qué es y en qué consiste?</span>
                  </h4>
                  <p className="text-sm text-[#4A3A33]/90 font-semibold leading-relaxed bg-white p-4 rounded-2xl border border-[#E6D9C8]">
                    {selectedDetailItem.whatIsIt}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-black uppercase tracking-wider text-[#4A3A33] flex items-center gap-2">
                    <Microscope className="w-4 h-4 text-[#8FC1BB]" />
                    <span>¿Cómo se realiza según el protocolo de CediMujer?</span>
                  </h4>
                  <p className="text-sm text-[#4A3A33]/90 font-semibold leading-relaxed bg-white p-4 rounded-2xl border border-[#E6D9C8]">
                    {selectedDetailItem.howItIsDone}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-black uppercase tracking-wider text-[#4A3A33] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#8FC1BB]" />
                    <span>Preparación e Indicaciones para la Paciente</span>
                  </h4>
                  <ul className="space-y-2 bg-[#E6D9C8]/40 p-4 rounded-2xl border border-[#E6D9C8]">
                    {selectedDetailItem.preparationAndIndications.map((prep, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4A3A33] font-semibold"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#8FC1BB] shrink-0 mt-0.5" />
                        <span>{prep}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#E6D9C8] flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      const title = selectedDetailItem.title;
                      setSelectedDetailItem(null);
                      if (onSelectService) onSelectService(title);
                    }}
                    className="flex-1 py-3.5 px-6 rounded-2xl bg-[#8FC1BB] hover:bg-[#8FC1BB]/90 text-[#4A3A33] font-black text-sm shadow-md flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Agendar {selectedDetailItem.title}</span>
                  </button>

                  <a
                    href={`https://wa.me/${CONTACT_INFO.whatsappRaw}?text=${encodeURIComponent(
                      `Hola CediMujer, deseo recibir información y agendar el servicio de: ${selectedDetailItem.title}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3.5 px-6 rounded-2xl bg-[#4A3A33] hover:bg-[#4A3A33]/90 text-[#F7F2EC] font-black text-sm shadow-md flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-[#8FC1BB]" />
                    <span>Preguntar por WhatsApp</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
