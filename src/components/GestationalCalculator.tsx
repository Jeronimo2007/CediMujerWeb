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

        dueDate = new Date(lmp.getTime() + (280 + cycleAdjustment) * 24 * 60 * 60 * 1000);
        conceptionDate = new Date(lmp.getTime() + (14 + cycleAdjustment) * 24 * 60 * 60 * 1000);
      } else {
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
    <section id="calculadora" className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
        <span className="inline-block text-[10px] font-medium uppercase tracking-[0.22em] text-[#9A7B6C] mb-2">
          Herramienta Obstétrica
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#4A3A33] tracking-tight leading-tight">
          Calculadora <span className="italic text-[#D7A7A8]">gestacional</span>
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[#9A7B6C] font-normal leading-relaxed">
          Conoce tu semana de embarazo, fecha probable de parto y ecografías sugeridas.
        </p>

        {onBackToHome && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-xs font-medium text-[#4A3A33] bg-[#EBCFC6]/55 hover:bg-[#4A3A33] hover:text-[#F7F6F4] px-4 py-2 rounded-full border border-[#D7A7A8]/60 transition-colors"
            >
              <span>← Volver al inicio</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Form */}
        <div className="lg:col-span-5 bg-[#EBCFC6]/35 rounded-[2rem] p-5 sm:p-7 border border-[#D7A7A8]/55">
          <div className="flex rounded-full bg-[#F7F6F4] p-1 mb-5 border border-[#D7A7A8]/50">
            <button
              type="button"
              onClick={() => {
                setCalculationMode("fur");
                setResult(null);
              }}
              className={`flex-1 py-2 px-2 sm:px-3 rounded-full text-[11px] sm:text-xs font-medium transition-all ${
                calculationMode === "fur"
                  ? "bg-[#4A3A33] text-[#F7F6F4]"
                  : "text-[#9A7B6C] hover:text-[#4A3A33]"
              }`}
            >
              Última Regla (FUR)
            </button>
            <button
              type="button"
              onClick={() => {
                setCalculationMode("eco");
                setResult(null);
              }}
              className={`flex-1 py-2 px-2 sm:px-3 rounded-full text-[11px] sm:text-xs font-medium transition-all ${
                calculationMode === "eco"
                  ? "bg-[#4A3A33] text-[#F7F6F4]"
                  : "text-[#9A7B6C] hover:text-[#4A3A33]"
              }`}
            >
              Ecografía Previa
            </button>
          </div>

          <form onSubmit={calculate} className="space-y-5">
            {calculationMode === "fur" ? (
              <>
                <div>
                  <label className="block text-[11px] font-medium text-[#9A7B6C] uppercase tracking-wider mb-2">
                    Primer día de la última menstruación (FUR)
                  </label>
                  <div className="relative">
                    <CalendarDays className="absolute left-3.5 top-3.5 w-4 h-4 text-[#9A7B6C] pointer-events-none stroke-[1.75]" />
                    <input
                      type="date"
                      value={furDate}
                      onChange={(e) => setFurDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E6D9C8] text-[#4A3A33] font-normal text-sm focus:outline-none focus:border-[#8FC1BB] transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center gap-2 mb-2">
                    <label className="text-[11px] font-medium text-[#9A7B6C] uppercase tracking-wider">
                      Duración del ciclo menstrual
                    </label>
                    <span className="text-xs font-medium text-[#4A3A33] bg-[#CFE6E2]/50 px-2.5 py-0.5 rounded-full">
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
                  <div className="flex justify-between text-[11px] text-[#9A7B6C] mt-1 font-normal">
                    <span>21 días</span>
                    <span>28 días</span>
                    <span>35 días</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-[11px] font-medium text-[#9A7B6C] uppercase tracking-wider mb-2">
                    Fecha en que se realizó la ecografía
                  </label>
                  <div className="relative">
                    <CalendarDays className="absolute left-3.5 top-3.5 w-4 h-4 text-[#9A7B6C] pointer-events-none stroke-[1.75]" />
                    <input
                      type="date"
                      value={ecoDate}
                      onChange={(e) => setEcoDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E6D9C8] text-[#4A3A33] font-normal text-sm focus:outline-none focus:border-[#8FC1BB] transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-[#9A7B6C] uppercase tracking-wider mb-2">
                      Semanas reportadas
                    </label>
                    <input
                      type="number"
                      min="4"
                      max="40"
                      value={ecoWeeks}
                      onChange={(e) => setEcoWeeks(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E6D9C8] text-[#4A3A33] font-normal text-sm focus:outline-none focus:border-[#8FC1BB]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-[#9A7B6C] uppercase tracking-wider mb-2">
                      Días adicionales
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="6"
                      value={ecoDays}
                      onChange={(e) => setEcoDays(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E6D9C8] text-[#4A3A33] font-normal text-sm focus:outline-none focus:border-[#8FC1BB]"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {error && (
              <p className="text-xs font-medium text-[#D7A7A8]">
                {error}
              </p>
            )}

            <div className="flex gap-2.5 pt-2">
              <button
                type="submit"
                className="flex-1 py-3.5 px-6 rounded-full bg-[#4A3A33] hover:bg-[#4A3A33]/90 text-[#FAF7F2] font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#8FC1BB]" />
                <span>Calcular Semanas</span>
              </button>

              <button
                type="button"
                onClick={reset}
                className="p-3.5 rounded-full bg-[#FAF7F2] hover:bg-[#E6D9C8]/50 text-[#4A3A33] border border-[#E6D9C8] transition-colors"
                title="Reiniciar cálculo"
              >
                <RefreshCw className="w-4 h-4 stroke-[1.75]" />
              </button>
            </div>
          </form>

          <div className="mt-6 pt-5 border-t border-[#E6D9C8]/60 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-[#8FC1BB] shrink-0 mt-0.5 stroke-[1.75]" />
            <p className="text-[11px] text-[#9A7B6C] font-normal leading-relaxed">
              Esta herramienta brinda una estimación orientativa basada en la regla de Naegele. La confirmación clínica debe ser evaluada con ecografía en CediMujer.
            </p>
          </div>
        </div>

        {/* Right Output: Single Unified Minimalist Result Sheet */}
        <div ref={resultRef} className="lg:col-span-7 scroll-mt-24">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="bg-white/80 backdrop-blur-md rounded-[2rem] p-6 sm:p-10 border border-[#E6D9C8]/70 shadow-[0_15px_45px_-20px_rgba(74,58,51,0.06)] space-y-6 divide-y divide-[#E6D9C8]/60"
              >
                {/* Weeks & Progress */}
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#9A7B6C]">
                        Tiempo de Gestación Estimado
                      </p>
                      <h3 className="font-serif text-3xl sm:text-5xl font-normal text-[#4A3A33] mt-1">
                        {result.currentWeeks} <span className="italic text-xl sm:text-3xl text-[#9A7B6C]">semanas</span>{" "}
                        {result.currentDays > 0 && (
                          <span className="text-xl sm:text-2xl text-[#9A7B6C]">
                            + {result.currentDays} {result.currentDays === 1 ? "día" : "días"}
                          </span>
                        )}
                      </h3>
                    </div>

                    <span className="px-4 py-1.5 rounded-full bg-[#CFE6E2]/55 text-[#4A3A33] font-medium text-xs">
                      Trimestre {result.trimester}
                    </span>
                  </div>

                  {/* Subtle Progress Bar */}
                  <div>
                    <div className="flex justify-between items-center text-[11px] font-normal text-[#9A7B6C] mb-2">
                      <span>Semana 1</span>
                      <span className="text-[#4A3A33] font-medium">
                        {Math.min(100, Math.round((result.currentWeeks / 40) * 100))}% completado
                      </span>
                      <span>Semana 40</span>
                    </div>
                    <div className="w-full h-2 bg-[#FAF7F2] rounded-full overflow-hidden border border-[#E6D9C8]/60">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${Math.min(100, Math.max(5, (result.currentWeeks / 40) * 100))}%`,
                        }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-[#8FC1BB] to-[#D7A7A8] rounded-full"
                      />
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#9A7B6C] uppercase tracking-wider mb-1">
                        <Calendar className="w-3.5 h-3.5 text-[#8FC1BB]" />
                        <span>Fecha Probable de Parto</span>
                      </div>
                      <p className="font-serif text-base sm:text-lg font-normal text-[#4A3A33] capitalize">
                        {result.dueDate}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#9A7B6C] uppercase tracking-wider mb-1">
                        <Clock className="w-3.5 h-3.5 text-[#D7A7A8]" />
                        <span>Concepción Estimada</span>
                      </div>
                      <p className="font-serif text-base sm:text-lg font-normal text-[#4A3A33] capitalize">
                        {result.conceptionDate}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Milestone & Size */}
                <div className="pt-6 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                  <div className="sm:col-span-7 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#9A7B6C] uppercase tracking-wider">
                      <Heart className="w-3.5 h-3.5 text-[#D7A7A8]" />
                      <span>Desarrollo del Bebé</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#4A3A33]/85 font-normal leading-relaxed">
                      {result.babyMilestone}
                    </p>
                  </div>

                  <div className="sm:col-span-5 flex justify-around items-center sm:border-l border-[#E6D9C8]/60 sm:pl-6">
                    <div className="text-center">
                      <p className="text-[11px] text-[#9A7B6C]">Longitud</p>
                      <p className="font-serif text-lg sm:text-xl font-normal text-[#4A3A33]">{result.approxLength}</p>
                    </div>
                    <div className="w-px h-8 bg-[#E6D9C8]/60" />
                    <div className="text-center">
                      <p className="text-[11px] text-[#9A7B6C]">Peso aprox.</p>
                      <p className="font-serif text-lg sm:text-xl font-normal text-[#4A3A33]">{result.approxWeight}</p>
                    </div>
                  </div>
                </div>

                {/* Recommended Clinic Studies */}
                <div className="pt-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#8FC1BB] stroke-[1.75]" />
                    <h4 className="font-serif text-lg font-normal text-[#4A3A33]">
                      Estudios recomendados en CediMujer para tu etapa
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    {result.recommendedStudies.map((study, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#4A3A33]/85 font-normal">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8FC1BB] shrink-0 stroke-[1.75]" />
                        <span>{study}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2">
                    <button
                      onClick={() => onOpenAppointment && onOpenAppointment("Ecografía Obstétrica 3D / 4D")}
                      className="w-full py-3.5 px-6 rounded-full bg-[#4A3A33] hover:bg-[#4A3A33]/90 text-[#FAF7F2] font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-4 h-4 text-[#8FC1BB]" />
                      <span>Agendar Ecografía de Control en CediMujer</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#EBCFC6]" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white/60 backdrop-blur-sm rounded-[2rem] p-8 sm:p-12 border border-[#E6D9C8]/70 text-center flex flex-col items-center justify-center min-h-[420px]"
              >
                <div className="w-14 h-14 rounded-full bg-[#EBCFC6]/40 flex items-center justify-center mb-4 text-[#9A7B6C]">
                  <Baby className="w-7 h-7 stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-2xl font-normal text-[#4A3A33] mb-2">
                  Ingresa tus datos para ver tu guía gestacional
                </h3>
                <p className="text-xs sm:text-sm text-[#9A7B6C] max-w-md font-normal leading-relaxed mb-8">
                  Calcula de manera sencilla la edad gestacional de tu bebé, fecha probable de parto y las ecografías sugeridas por nuestras especialistas.
                </p>
                <div className="grid grid-cols-3 divide-x divide-[#E6D9C8]/70 w-full max-w-sm pt-4 border-t border-[#E6D9C8]/60">
                  <div className="px-2">
                    <p className="font-serif text-sm text-[#4A3A33]">1er Trimestre</p>
                    <p className="text-[11px] text-[#9A7B6C] mt-0.5">Sem. 1 – 13</p>
                  </div>
                  <div className="px-2">
                    <p className="font-serif text-sm text-[#4A3A33]">2do Trimestre</p>
                    <p className="text-[11px] text-[#9A7B6C] mt-0.5">Sem. 14 – 27</p>
                  </div>
                  <div className="px-2">
                    <p className="font-serif text-sm text-[#4A3A33]">3er Trimestre</p>
                    <p className="text-[11px] text-[#9A7B6C] mt-0.5">Sem. 28 – 40</p>
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
