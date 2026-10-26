"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Baby,
  Heart,
  Sparkles,
  RefreshCw,
  Info,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  CalendarDays,
} from "lucide-react";

interface GestationalResult {
  currentWeeks: number;
  currentDays: number;
  trimester: 1 | 2 | 3;
  dueDate: string;
  conceptionDate: string;
  babyMilestone: string;
  recommendedStudies: string[];
  approxWeight: string;
  approxLength: string;
}

interface GestationalCalculatorProps {
  onOpenAppointment?: (serviceName?: string) => void;
  onBackToHome?: () => void;
}

export const GestationalCalculator: React.FC<GestationalCalculatorProps> = ({
  onOpenAppointment,
  onBackToHome,
}) => {
  const [calculationMode, setCalculationMode] = useState<"fur" | "eco">("fur");
  const [furDate, setFurDate] = useState<string>("");
  const [ecoDate, setEcoDate] = useState<string>("");
  const [ecoWeeks, setEcoWeeks] = useState<number>(12);
  const [ecoDays, setEcoDays] = useState<number>(0);
  const [cycleDays, setCycleDays] = useState<number>(28);
  const [result, setResult] = useState<GestationalResult | null>(null);
  const [error, setError] = useState<string>("");
  const resultRef = useRef<HTMLDivElement>(null);

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      let gestationalDays = 0;
      let dueDate = new Date();
      let conceptionDate = new Date();

      if (calculationMode === "fur") {
        if (!furDate) {
          setError("Por favor ingresa la fecha del primer día de tu última menstruación.");
          return;
        }

        const lmp = new Date(furDate + "T00:00:00");
        if (isNaN(lmp.getTime())) {
          setError("Fecha inválida.");
          return;
        }

        const diffTime = today.getTime() - lmp.getTime();
        gestationalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        // Adjust cycle difference from standard 28 days
        const cycleAdjustment = cycleDays - 28;
        gestationalDays -= cycleAdjustment;

        if (gestationalDays < 0) {
          setError("La fecha ingresada no puede ser futura.");
          return;
        }

        if (gestationalDays > 300) {
          setError("El tiempo excede un periodo gestacional estándar. Por favor verifica la fecha.");
          return;
        }

        // Due date: LMP + 280 days + cycle adjustment
        dueDate = new Date(lmp.getTime() + (280 + cycleAdjustment) * 24 * 60 * 60 * 1000);
        // Conception: LMP + 14 days + cycle adjustment
        conceptionDate = new Date(lmp.getTime() + (14 + cycleAdjustment) * 24 * 60 * 60 * 1000);
      } else {
        // Calculation from previous ultrasound
        if (!ecoDate) {
          setError("Por favor ingresa la fecha en que se realizó la ecografía.");
          return;
        }

        const eco = new Date(ecoDate + "T00:00:00");
        if (isNaN(eco.getTime())) {
          setError("Fecha de ecografía inválida.");
          return;
        }

        const daysSinceEco = Math.floor((today.getTime() - eco.getTime()) / (1000 * 60 * 60 * 24));
        if (daysSinceEco < 0) {
          setError("La fecha de la ecografía no puede ser posterior a hoy.");
          return;
        }

        const ecoAgeDays = ecoWeeks * 7 + ecoDays;
        gestationalDays = ecoAgeDays + daysSinceEco;

        if (gestationalDays > 300) {
          setError("El cálculo supera el rango de embarazo normal. Verifica los datos.");
          return;
        }

        const totalDaysRemaining = 280 - gestationalDays;
        dueDate = new Date(today.getTime() + totalDaysRemaining * 24 * 60 * 60 * 1000);
        conceptionDate = new Date(today.getTime() - (gestationalDays - 14) * 24 * 60 * 60 * 1000);
      }

      const currentWeeks = Math.floor(gestationalDays / 7);
      const currentDays = gestationalDays % 7;

      let trimester: 1 | 2 | 3 = 1;
      if (currentWeeks >= 28) {
        trimester = 3;
      } else if (currentWeeks >= 14) {
        trimester = 2;
      }

      // Milestones & recommendations per week
      let babyMilestone = "";
      let recommendedStudies: string[] = [];
      let approxWeight = "";
      let approxLength = "";

      if (currentWeeks < 12) {
        babyMilestone = "Los órganos vitales del bebé y su pequeño corazón ya laten rápidamente.";
        recommendedStudies = [
          "Ecografía Transvaginal Temprana / Confirmación",
          "Tamizaje Genético del Primer Trimestre (11 a 13.6 semanas)",
          "Perfil Prenatal Básico de Laboratorio",
        ];
        approxWeight = "~ 14 g";
        approxLength = "~ 5.4 cm";
      } else if (currentWeeks < 20) {
        babyMilestone = "El bebé ya puede oír los sonidos de tu cuerpo y hace movimientos de deglución.";
        recommendedStudies = [
          "Ecografía de Detalle Anatómico (Semana 18 a 22)",
          "Ecocardiografía Fetal Temprana",
          "Control Prenatal Ginecológico Mensual",
        ];
        approxWeight = "~ 300 g";
        approxLength = "~ 25 cm";
      } else if (currentWeeks < 28) {
        babyMilestone = "Pestañea, tiene huellas dactilares definidas y responde a tu voz y caricias.";
        recommendedStudies = [
          "Ecografía 3D / 4D HD Live (Ideal semanas 24 a 28)",
          "Tamizaje de Diabetes Gestacional (Test de O'Sullivan)",
          "Evaluación de Longitud Cervical",
        ];
        approxWeight = "~ 1.000 g";
        approxLength = "~ 37 cm";
      } else if (currentWeeks < 36) {
        babyMilestone = "Sus pulmones maduran y adopta la posición cefálica para el nacimiento.";
        recommendedStudies = [
          "Doppler Fetal y Perfil Biofísico",
          "Monitoreo Fetal sin Estrés (NST)",
          "Cultivo de Estreptococo Grupo B",
        ];
        approxWeight = "~ 2.500 g";
        approxLength = "~ 47 cm";
      } else {
        babyMilestone = "Totalmente formado y preparado para conocerte en cualquier momento.";
        recommendedStudies = [
          "Monitoreo Fetal Continuo",
          "Valoración de Líquido Amniótico y Placenta",
          "Consulta de Preparación para el Parto",
        ];
        approxWeight = "~ 3.200 g";
        approxLength = "~ 50 cm";
      }

      setResult({
        currentWeeks,
        currentDays,
        trimester,
        dueDate: formatDate(dueDate),
        conceptionDate: formatDate(conceptionDate),
        babyMilestone,
        recommendedStudies,
        approxWeight,
        approxLength,
      });

      if (typeof window !== "undefined" && window.innerWidth < 1024) {
        setTimeout(() => {
          resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 120);
      }
    } catch {
      setError("Ocurrió un error al calcular. Por favor verifica la información.");
    }
  };

  const reset = () => {
    setFurDate("");
    setEcoDate("");
    setResult(null);
    setError("");
  };

  return (
    <section id="calculadora" className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Badge & Title */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EBCFC6]/60 border border-[#D7A7A8]/40 text-[#4A3A33] text-xs font-bold mb-4 shadow-sm">
          <Baby className="w-4 h-4 text-[#8FC1BB]" />
          <span>Herramienta Obstétrica CediMujer</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-[#4A3A33] tracking-tight">
          Calculadora Gestacional & Semanas de Embarazo
        </h2>
        <p className="mt-4 text-sm sm:text-lg text-[#9A7B6C] font-semibold leading-relaxed">
          Conoce en qué semana de gestación te encuentras, tu fecha probable de parto y los estudios de diagnóstico recomendados para cada etapa.
        </p>

        {onBackToHome && (
          <div className="mt-5 flex justify-center">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#4A3A33] hover:text-[#4A3A33] bg-[#E6D9C8] hover:bg-[#8FC1BB]/40 px-4 py-2 rounded-full border border-[#9A7B6C]/30 transition-colors shadow-sm"
            >
              <span>← Volver a la vista principal</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Data input */}
        <div className="lg:col-span-5 bg-[#F7F2EC] rounded-3xl p-5 sm:p-8 border border-[#E6D9C8] shadow-xl">
          <div className="flex rounded-2xl bg-[#E6D9C8]/60 p-1 mb-6 border border-[#E6D9C8]">
            <button
              type="button"
              onClick={() => {
                setCalculationMode("fur");
                setResult(null);
              }}
              className={`flex-1 py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                calculationMode === "fur"
                  ? "bg-[#8FC1BB] text-[#4A3A33] shadow-md"
                  : "text-[#9A7B6C] hover:text-[#4A3A33]"
              }`}
            >
              Por Fecha Última Regla (FUR)
            </button>
            <button
              type="button"
              onClick={() => {
                setCalculationMode("eco");
                setResult(null);
              }}
              className={`flex-1 py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                calculationMode === "eco"
                  ? "bg-[#8FC1BB] text-[#4A3A33] shadow-md"
                  : "text-[#9A7B6C] hover:text-[#4A3A33]"
              }`}
            >
              Por Ecografía Previa
            </button>
          </div>

          <form onSubmit={calculate} className="space-y-5">
            {calculationMode === "fur" ? (
              <>
                <div>
                  <label className="block text-xs font-bold text-[#4A3A33] uppercase tracking-wider mb-2">
                    Primer día de la última menstruación (FUR)
                  </label>
                  <div className="relative">
                    <CalendarDays className="absolute left-3.5 top-3.5 w-4 h-4 text-[#9A7B6C] pointer-events-none" />
                    <input
                      type="date"
                      value={furDate}
                      onChange={(e) => setFurDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-[#E6D9C8] text-[#4A3A33] font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#8FC1BB] focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <p className="mt-1.5 text-xs text-[#9A7B6C]">
                    Introduce la fecha exacta del primer día de tu última regla.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-center gap-2 mb-2">
                    <label className="text-xs font-bold text-[#4A3A33] uppercase tracking-wider">
                      Duración del ciclo menstrual
                    </label>
                    <span className="text-xs font-black text-[#4A3A33] bg-[#8FC1BB]/40 border border-[#8FC1BB] px-2.5 py-0.5 rounded-md shrink-0 whitespace-nowrap">
                      {cycleDays} días
                    </span>
                  </div>
                  <input
                    type="range"
                    min="21"
                    max="35"
                    value={cycleDays}
                    onChange={(e) => setCycleDays(Number(e.target.value))}
                    className="w-full accent-[#8FC1BB] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-[#9A7B6C] mt-1 font-semibold">
                    <span>21 días</span>
                    <span>28 días (estándar)</span>
                    <span>35 días</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-bold text-[#4A3A33] uppercase tracking-wider mb-2">
                    Fecha en que se realizó la ecografía
                  </label>
                  <div className="relative">
                    <CalendarDays className="absolute left-3.5 top-3.5 w-4 h-4 text-[#9A7B6C] pointer-events-none" />
                    <input
                      type="date"
                      value={ecoDate}
                      onChange={(e) => setEcoDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-[#E6D9C8] text-[#4A3A33] font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#8FC1BB] focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#4A3A33] uppercase tracking-wider mb-2">
                      Semanas reportadas
                    </label>
                    <input
                      type="number"
                      min="4"
                      max="40"
                      value={ecoWeeks}
                      onChange={(e) => setEcoWeeks(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-2xl bg-white border border-[#E6D9C8] text-[#4A3A33] font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#8FC1BB]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#4A3A33] uppercase tracking-wider mb-2">
                      Días adicionales
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="6"
                      value={ecoDays}
                      onChange={(e) => setEcoDays(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-2xl bg-white border border-[#E6D9C8] text-[#4A3A33] font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#8FC1BB]"
                      required
                    />
                  </div>
                </div>
                <p className="text-xs text-[#9A7B6C]">
                  Ingresa la edad gestacional que indicó el informe ecográfico en esa fecha.
                </p>
              </>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-[#EBCFC6] border border-[#D7A7A8] text-[#4A3A33] text-xs font-bold"
              >
                {error}
              </motion.div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 py-3.5 px-6 rounded-2xl bg-[#8FC1BB] hover:bg-[#8FC1BB]/90 text-[#4A3A33] font-black text-sm shadow-lg shadow-[#8FC1BB]/30 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 border border-[#8FC1BB]"
              >
                <Sparkles className="w-4 h-4" />
                <span>Calcular Semanas</span>
              </button>

              <button
                type="button"
                onClick={reset}
                className="p-3.5 rounded-2xl bg-[#E6D9C8] hover:bg-[#EBCFC6] text-[#4A3A33] transition-colors"
                title="Reiniciar cálculo"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="mt-6 p-4 rounded-2xl bg-[#CFE6E2]/30 border border-[#8FC1BB]/30 flex items-start gap-3">
            <Info className="w-5 h-5 text-[#8FC1BB] shrink-0 mt-0.5" />
            <p className="text-xs text-[#9A7B6C] leading-relaxed">
              <strong className="text-[#4A3A33]">Nota médica:</strong> Esta herramienta brinda una estimación orientativa basada en la regla de Naegele y biometría fetal. La confirmación clínica definitiva debe ser evaluada por un especialista con ecografía de alta resolución en CediMujer.
            </p>
          </div>
        </div>

        {/* Right Output: Interactive Results */}
        <div ref={resultRef} className="lg:col-span-7 scroll-mt-24">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {/* Main Highlight Card */}
                <div className="bg-gradient-to-br from-[#F7F2EC] via-[#EBCFC6]/40 to-[#CFE6E2]/40 rounded-3xl p-6 sm:p-8 border border-[#D7A7A8]/40 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[#8FC1BB]/10 rounded-full blur-2xl pointer-events-none" />

                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#9A7B6C]">
                        Tiempo de Gestación Actual
                      </p>
                      <h3 className="text-3xl sm:text-5xl font-black text-[#4A3A33] mt-1">
                        {result.currentWeeks} <span className="text-lg sm:text-2xl font-bold text-[#8FC1BB]">semanas</span>{" "}
                        {result.currentDays > 0 && (
                          <span className="text-xl sm:text-3xl font-extrabold text-[#9A7B6C]">
                            + {result.currentDays} {result.currentDays === 1 ? "día" : "días"}
                          </span>
                        )}
                      </h3>
                    </div>

                    <div className="px-4 py-2 rounded-2xl bg-[#8FC1BB] text-[#4A3A33] font-black text-xs sm:text-sm shadow-md">
                      Trimestre {result.trimester}
                    </div>
                  </div>

                  {/* Progress Bar 40 weeks */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center gap-2 text-xs font-bold text-[#9A7B6C] mb-2">
                      <span className="whitespace-nowrap">Semana 1</span>
                      <span className="text-[#4A3A33] font-black text-center">
                        {Math.min(100, Math.round((result.currentWeeks / 40) * 100))}% <span className="hidden sm:inline">del embarazo </span>completado
                      </span>
                      <span className="whitespace-nowrap">Semana 40</span>
                    </div>
                    <div className="w-full h-3 bg-[#E6D9C8] rounded-full overflow-hidden p-0.5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${Math.min(100, Math.max(5, (result.currentWeeks / 40) * 100))}%`,
                        }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-[#8FC1BB] via-[#D7A7A8] to-[#9A7B6C] rounded-full"
                      />
                    </div>
                  </div>

                  {/* Estimated Dates */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E6D9C8]">
                    <div className="p-4 rounded-2xl bg-white/70 border border-[#E6D9C8]">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#9A7B6C] mb-1">
                        <Calendar className="w-4 h-4 text-[#8FC1BB]" />
                        <span>Fecha Probable de Parto (FPP)</span>
                      </div>
                      <p className="text-sm sm:text-base font-extrabold text-[#4A3A33] capitalize">
                        {result.dueDate}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/70 border border-[#E6D9C8]">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#9A7B6C] mb-1">
                        <Clock className="w-4 h-4 text-[#D7A7A8]" />
                        <span>Fecha Estimada de Concepción</span>
                      </div>
                      <p className="text-sm sm:text-base font-extrabold text-[#4A3A33] capitalize">
                        {result.conceptionDate}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Milestone & Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-3xl bg-[#F7F2EC] border border-[#E6D9C8] shadow-sm">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#9A7B6C] uppercase tracking-wider mb-2">
                      <Heart className="w-4 h-4 text-[#D7A7A8]" />
                      <span>Desarrollo del Bebé</span>
                    </div>
                    <p className="text-sm text-[#4A3A33] font-semibold leading-relaxed">
                      {result.babyMilestone}
                    </p>
                  </div>

                  <div className="p-5 rounded-3xl bg-[#F7F2EC] border border-[#E6D9C8] shadow-sm flex flex-col justify-center">
                    <p className="text-xs font-bold text-[#9A7B6C] uppercase tracking-wider mb-2">
                      Medidas Promedio Aproximadas
                    </p>
                    <div className="flex justify-around items-center pt-1">
                      <div className="text-center">
                        <p className="text-xs text-[#9A7B6C]">Longitud</p>
                        <p className="text-lg font-black text-[#4A3A33]">{result.approxLength}</p>
                      </div>
                      <div className="w-px h-8 bg-[#E6D9C8]" />
                      <div className="text-center">
                        <p className="text-xs text-[#9A7B6C]">Peso estimado</p>
                        <p className="text-lg font-black text-[#4A3A33]">{result.approxWeight}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recommended Clinic Tests */}
                <div className="p-6 rounded-3xl bg-[#CFE6E2]/40 border border-[#8FC1BB]/40 shadow-md">
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldCheck className="w-5 h-5 text-[#8FC1BB]" />
                    <h4 className="text-sm sm:text-base font-black text-[#4A3A33]">
                      Estudios Clínicos Recomendados en CediMujer para tu Semana
                    </h4>
                  </div>
                  <ul className="space-y-2 mb-5">
                    {result.recommendedStudies.map((study, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#4A3A33] font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-[#8FC1BB] shrink-0" />
                        <span>{study}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => onOpenAppointment && onOpenAppointment("Ecografía Obstétrica 3D / 4D")}
                    className="w-full py-3.5 px-6 rounded-2xl bg-[#4A3A33] hover:bg-[#4A3A33]/90 text-[#F7F2EC] font-black text-xs sm:text-sm shadow-md hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-[#8FC1BB]" />
                    <span>Agendar Ecografía de Control en CediMujer</span>
                    <ArrowRight className="w-4 h-4 text-[#8FC1BB]" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-[#F7F2EC] rounded-3xl p-8 sm:p-12 border border-[#E6D9C8] text-center flex flex-col items-center justify-center min-h-[460px] shadow-sm"
              >
                <div className="w-20 h-20 rounded-full bg-[#EBCFC6]/60 flex items-center justify-center mb-5 text-[#8FC1BB]">
                  <Baby className="w-10 h-10" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#4A3A33] mb-2">
                  Ingresa tus datos para ver el informe gestacional
                </h3>
                <p className="text-sm text-[#9A7B6C] max-w-md font-semibold leading-relaxed mb-6">
                  Calcula de manera precisa la edad de tu bebé, semanas de gestación, fecha de parto estimada y las revisiones sugeridas por nuestras especialistas.
                </p>
                <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
                  <div className="p-3 rounded-2xl bg-white border border-[#E6D9C8]">
                    <p className="text-xs text-[#9A7B6C] font-bold">1er Trimestre</p>
                    <p className="text-[11px] text-[#4A3A33] mt-0.5">Sem. 1 - 13</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-white border border-[#E6D9C8]">
                    <p className="text-xs text-[#9A7B6C] font-bold">2do Trimestre</p>
                    <p className="text-[11px] text-[#4A3A33] mt-0.5">Sem. 14 - 27</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-white border border-[#E6D9C8]">
                    <p className="text-xs text-[#9A7B6C] font-bold">3er Trimestre</p>
                    <p className="text-[11px] text-[#4A3A33] mt-0.5">Sem. 28 - 40</p>
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
