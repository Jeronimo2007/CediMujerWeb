"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Target, HeartHandshake, Sparkles } from "lucide-react";

export const InstitutionalPhilosophy: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"mision" | "vision" | "valores">(
    "mision"
  );

  const values = [
    { label: "Íntegra", desc: "Ética y honestidad." },
    { label: "Idónea", desc: "Rigor científico." },
    { label: "Emprendedora", desc: "Innovación constante." },
    { label: "Comprometida", desc: "Calidez humana." },
  ];

  return (
    <div
      id="filosofia"
      className="scroll-mt-24 mt-10 sm:mt-14 pt-8 sm:pt-10 border-t border-[#F3D9D9]"
    >
      {/* Minimalist Pill Selector */}
      <div className="flex justify-center mb-6">
        <div className="grid grid-cols-3 sm:inline-flex p-1 rounded-full bg-[#F9EAEA] border border-[#F3D9D9] gap-1 w-full sm:w-auto max-w-sm sm:max-w-none">
          <button
            onClick={() => setActiveTab("mision")}
            className={`flex items-center justify-center gap-1.5 px-3 sm:px-5 py-2 rounded-full text-xs font-medium transition-all ${
              activeTab === "mision"
                ? "bg-[#4A3A33] text-[#FDF6F6]"
                : "text-[#9A7B6C] hover:text-[#4A3A33]"
            }`}
          >
            <Compass className="w-3.5 h-3.5 shrink-0 stroke-[1.75]" />
            <span>Misión</span>
          </button>

          <button
            onClick={() => setActiveTab("vision")}
            className={`flex items-center justify-center gap-1.5 px-3 sm:px-5 py-2 rounded-full text-xs font-medium transition-all ${
              activeTab === "vision"
                ? "bg-[#4A3A33] text-[#FDF6F6]"
                : "text-[#9A7B6C] hover:text-[#4A3A33]"
            }`}
          >
            <Target className="w-3.5 h-3.5 shrink-0 stroke-[1.75]" />
            <span>Visión 2030</span>
          </button>

          <button
            onClick={() => setActiveTab("valores")}
            className={`flex items-center justify-center gap-1.5 px-3 sm:px-5 py-2 rounded-full text-xs font-medium transition-all ${
              activeTab === "valores"
                ? "bg-[#4A3A33] text-[#FDF6F6]"
                : "text-[#9A7B6C] hover:text-[#4A3A33]"
            }`}
          >
            <HeartHandshake className="w-3.5 h-3.5 shrink-0 stroke-[1.75]" />
            <span>Valores</span>
          </button>
        </div>
      </div>

      {/* Concise Pastel Pink Panel */}
      <div className="max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === "mision" && (
            <motion.div
              key="mision"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
              className="bg-[#F9EAEA]/75 rounded-[1.75rem] p-6 sm:p-8 border border-[#F3D9D9] text-center"
            >
              <p className="font-serif text-base sm:text-xl text-[#4A3A33] font-normal italic leading-relaxed">
                &ldquo;Diagnóstico especializado en salud para la mujer con rigor científico, oportunidad, calidez y comodidad.&rdquo;
              </p>
            </motion.div>
          )}

          {activeTab === "vision" && (
            <motion.div
              key="vision"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
              className="bg-[#F9EAEA]/75 rounded-[1.75rem] p-6 sm:p-8 border border-[#F3D9D9] text-center"
            >
              <p className="font-serif text-base sm:text-xl text-[#4A3A33] font-normal italic leading-relaxed">
                &ldquo;Ser en 2030 el centro de referencia en diagnóstico en salud para la mujer en el sur del Valle de Aburrá.&rdquo;
              </p>
            </motion.div>
          )}

          {activeTab === "valores" && (
            <motion.div
              key="valores"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
              {values.map((v) => (
                <div
                  key={v.label}
                  className="bg-[#F9EAEA]/75 rounded-2xl p-4 border border-[#F3D9D9] text-center"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D7A7A8] mx-auto mb-1.5" />
                  <p className="font-serif text-base text-[#4A3A33]">
                    {v.label}
                  </p>
                  <p className="text-[11px] text-[#9A7B6C] mt-0.5">{v.desc}</p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
