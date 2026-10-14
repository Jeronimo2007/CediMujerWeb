"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Target,
  HeartHandshake,
  CheckCircle2,
  Sparkles,
  Award,
  Users,
} from "lucide-react";

export const InstitutionalPhilosophy: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"mision" | "vision" | "valores">("mision");

  const personalAttributes = [
    { label: "Íntegra", desc: "Ética, honestidad y rectitud en cada diagnóstico y trato hacia nuestras pacientes." },
    { label: "Idónea", desc: "Capacitación continua y rigor científico de alto nivel en salud femenina." },
    { label: "Emprendedora", desc: "Iniciativa, actualización tecnológica constante y búsqueda de soluciones." },
    { label: "Comprometida", desc: "Dedicación genuina hacia la salud y el bienestar de cada mujer." },
  ];

  const organizationalTraits = [
    "La pasión, compromiso, creatividad y alegría en lo que hacemos",
    "La oportunidad y calidez de nuestra respuesta",
    "La confiabilidad y profesionalismo",
    "El cumplimiento de altos estándares de calidad",
    "Ser abiertos al cambio",
    "El trabajo en equipo y el respeto por la individualidad",
  ];

  return (
    <div id="filosofia" className="mt-20 pt-16 border-t border-[#E6D9C8]">
      {/* Header Badge & Title */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#CFE6E2]/50 border border-[#8FC1BB]/40 text-[#4A3A33] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#8FC1BB]" />
          <span>Nuestra Identidad Institucional</span>
        </div>
        <h3 className="text-2xl sm:text-4xl font-extrabold text-[#4A3A33] tracking-tight">
          Misión, Visión & Valores
        </h3>
        <p className="mt-3 text-sm sm:text-base text-[#9A7B6C] font-semibold leading-relaxed">
          Los principios que guían nuestro compromiso médico diario con cada mujer en el sur del Valle de Aburrá.
        </p>
      </div>

      {/* Interactive Tabs Selector */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex p-1.5 rounded-full bg-[#E6D9C8]/60 border border-[#E6D9C8] gap-1 sm:gap-2 shadow-inner">
          <button
            onClick={() => setActiveTab("mision")}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
              activeTab === "mision"
                ? "bg-[#8FC1BB] text-[#4A3A33] shadow-md scale-102"
                : "text-[#9A7B6C] hover:text-[#4A3A33] hover:bg-[#F7F2EC]/60"
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Misión</span>
          </button>

          <button
            onClick={() => setActiveTab("vision")}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
              activeTab === "vision"
                ? "bg-[#8FC1BB] text-[#4A3A33] shadow-md scale-102"
                : "text-[#9A7B6C] hover:text-[#4A3A33] hover:bg-[#F7F2EC]/60"
            }`}
          >
            <Target className="w-4 h-4" />
            <span>Visión 2030</span>
          </button>

          <button
            onClick={() => setActiveTab("valores")}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
              activeTab === "valores"
                ? "bg-[#8FC1BB] text-[#4A3A33] shadow-md scale-102"
                : "text-[#9A7B6C] hover:text-[#4A3A33] hover:bg-[#F7F2EC]/60"
            }`}
          >
            <HeartHandshake className="w-4 h-4" />
            <span>Valores & Actitudes</span>
          </button>
        </div>
      </div>

      {/* Tab Panels with AnimatePresence */}
      <div className="max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === "mision" && (
            <motion.div
              key="mision"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="bg-[#F7F2EC] rounded-3xl p-8 sm:p-12 border border-[#E6D9C8] shadow-lg relative overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row items-start gap-8">
                <div className="w-16 h-16 rounded-2xl bg-[#8FC1BB] text-[#4A3A33] flex items-center justify-center shrink-0 shadow-md">
                  <Compass className="w-8 h-8" />
                </div>
                <div className="space-y-4 flex-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#8FC1BB]">
                    Propósito Fundamental
                  </span>
                  <h4 className="text-xl sm:text-2xl font-black text-[#4A3A33] leading-snug">
                    Nuestra Misión
                  </h4>
                  <p className="text-base sm:text-lg text-[#4A3A33] font-semibold leading-relaxed">
                    Brindar servicios especializados en el diagnóstico de salud para las mujeres del área de influencia, con integralidad y calidad, basada en el conocimiento científico, responsabilidad, oportunidad, calidez, comodidad y bajo costo.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-[#E6D9C8]">
                    {["Conocimiento Científico", "Responsabilidad & Oportunidad", "Calidez & Bajo Costo"].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-bold text-[#9A7B6C]">
                        <CheckCircle2 className="w-4 h-4 text-[#8FC1BB] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "vision" && (
            <motion.div
              key="vision"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="bg-[#F7F2EC] rounded-3xl p-8 sm:p-12 border border-[#E6D9C8] shadow-lg relative overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row items-start gap-8">
                <div className="w-16 h-16 rounded-2xl bg-[#D7A7A8] text-[#4A3A33] flex items-center justify-center shrink-0 shadow-md">
                  <Target className="w-8 h-8" />
                </div>
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#D7A7A8]">
                      Horizonte Estratégico
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#EBCFC6] text-[#4A3A33] text-xs font-black">
                      Meta 2030
                    </span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-black text-[#4A3A33] leading-snug">
                    Nuestra Visión
                  </h4>
                  <p className="text-base sm:text-lg text-[#4A3A33] font-semibold leading-relaxed">
                    Ser reconocidos en el 2030 como un centro de referencia, especializado en el diagnóstico en salud para la mujer en el sur del Valle de Aburrá.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-[#E6D9C8]">
                    <div className="p-3.5 rounded-2xl bg-[#E6D9C8]/40 border border-[#E6D9C8]">
                      <p className="text-xs font-bold text-[#8FC1BB] uppercase">Referente Regional</p>
                      <p className="text-xs text-[#4A3A33] font-semibold mt-1">Liderazgo en diagnóstico para el sur del Valle de Aburrá.</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-[#CFE6E2]/40 border border-[#8FC1BB]/30">
                      <p className="text-xs font-bold text-[#8FC1BB] uppercase">Alta Especialidad</p>
                      <p className="text-xs text-[#4A3A33] font-semibold mt-1">Tecnología diagnóstica al alcance de todas las mujeres.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "valores" && (
            <motion.div
              key="valores"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="space-y-6"
            >
              {/* Persona en CediMujer */}
              <div className="bg-[#F7F2EC] rounded-3xl p-6 sm:p-8 border border-[#E6D9C8] shadow-md">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-[#8FC1BB] text-[#4A3A33]">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#9A7B6C]">
                      ADN del Equipo Humano
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-[#4A3A33]">
                      Cada persona en CediMujer es:
                    </h4>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {personalAttributes.map((attr) => (
                    <div
                      key={attr.label}
                      className="p-4 rounded-2xl bg-[#E6D9C8]/40 border border-[#E6D9C8] hover:border-[#8FC1BB] transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#8FC1BB]/30 flex items-center justify-center text-[#4A3A33] font-black text-sm mb-2">
                        ✓
                      </div>
                      <p className="text-base font-extrabold text-[#4A3A33]">{attr.label}</p>
                      <p className="text-xs text-[#9A7B6C] font-semibold mt-1 leading-relaxed">
                        {attr.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lo que nos caracteriza */}
              <div className="bg-[#F7F2EC] rounded-3xl p-6 sm:p-8 border border-[#E6D9C8] shadow-md">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-[#D7A7A8] text-[#4A3A33]">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#9A7B6C]">
                      Cultura de Servicio
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-[#4A3A33]">
                      Nos caracterizamos por:
                    </h4>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {organizationalTraits.map((trait, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/70 border border-[#E6D9C8]"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#8FC1BB] shrink-0 mt-0.5" />
                      <p className="text-xs sm:text-sm text-[#4A3A33] font-semibold leading-relaxed">
                        {trait}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
