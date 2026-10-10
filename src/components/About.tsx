"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShieldCheck, Award, HeartHandshake, Microscope, CheckCircle2, UserCheck } from "lucide-react";
import { ASSETS } from "@/config/assets";

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const sectionScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.0, 0.98]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.0, 1.12]);

  const pillars = [
    {
      title: "Enfoque Humanizado",
      icon: HeartHandshake,
      description: "Escuchamos a cada paciente de manera individualizada, construyendo una relación de confianza mutua sin prisas ni formalismos fríos.",
    },
    {
      title: "Diagnóstico de Alta Precisión",
      icon: Microscope,
      description: "Equipos de ultrasonido y laboratorio con resolución HD para detectar a tiempo cualquier condición con la máxima fidelidad científica.",
    },
    {
      title: "Entorno Confortable",
      icon: ShieldCheck,
      description: "Espacios diseñados exclusivamente para brindarte máxima privacidad, serenidad y bienestar durante cada una de tus visitas.",
    },
  ];

  return (
    <section ref={sectionRef} id="nosotros" className="py-24 bg-[#E6D9C8]/50 text-[#4A3A33] relative overflow-hidden">
      {/* Background Decorative Blob */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#CFE6E2]/40 rounded-full blur-3xl pointer-events-none" />

      <motion.div style={{ scale: sectionScale }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 origin-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Images & Floating Badge */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#E6D9C8] group">
              <motion.img
                style={{ scale: imageScale }}
                src={ASSETS.about.mainImage}
                alt="Consulta Médica CediMujer"
                className="w-full h-[480px] sm:h-[540px] object-cover transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A3A33]/40 via-transparent to-transparent" />
            </div>

            {/* Secondary Image Overlay */}
            <div className="hidden sm:block absolute -bottom-8 -right-6 w-52 h-52 rounded-2xl overflow-hidden border-4 border-[#F7F2EC] shadow-xl z-10">
              <Image
                src={ASSETS.about.secondaryImage}
                alt="Tecnología Médica"
                width={208}
                height={208}
                unoptimized
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Experience Badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute top-6 left-6 z-20 bg-[#F7F2EC]/95 backdrop-blur-md border border-[#8FC1BB] p-4 rounded-2xl shadow-lg flex items-center gap-4 max-w-xs"
            >
              <div className="w-12 h-12 rounded-xl bg-[#8FC1BB] text-[#4A3A33] flex items-center justify-center font-bold">
                <Award className="w-6 h-6 text-[#4A3A33]" />
              </div>
              <div>
                <p className="text-xl font-extrabold text-[#4A3A33]">18+ Años</p>
                <p className="text-xs text-[#9A7B6C] font-semibold">Líderes en salud femenina</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side: Narrative Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBCFC6] border border-[#D7A7A8] text-[#4A3A33] text-xs font-bold uppercase tracking-wider w-fit mb-4">
              <UserCheck className="w-4 h-4 text-[#8FC1BB]" />
              <span>Conoce CediMujer</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#4A3A33] tracking-tight leading-tight">
              Un centro pensado por y para la{" "}
              <span className="text-[#8FC1BB]">salud de la mujer</span>
            </h2>

            <p className="mt-6 text-[#9A7B6C] text-base sm:text-lg font-medium leading-relaxed">
              En <strong className="text-[#4A3A33] font-bold">CediMujer</strong> entendemos que cada etapa en la vida de una mujer requiere atención especializada, empatía y el respaldo médica de más alto nivel. Nuestro centro nace con el propósito de centralizar en un solo lugar todas las especialidades clínicas de la mujer.
            </p>

            {/* Interactive Feature Tabs */}
            <div className="mt-8 space-y-4">
              {pillars.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                const isActive = activeTab === idx;
                return (
                  <div
                    key={pillar.title}
                    onClick={() => setActiveTab(idx)}
                    className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 border ${
                      isActive
                        ? "bg-[#F7F2EC] border-[#8FC1BB] shadow-md"
                        : "bg-[#E6D9C8]/60 border-[#E6D9C8] hover:bg-[#F7F2EC]/80"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-xl ${
                          isActive ? "bg-[#8FC1BB] text-[#4A3A33]" : "bg-[#EBCFC6] text-[#4A3A33]"
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-bold text-[#4A3A33]">{pillar.title}</h3>
                    </div>
                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-3 text-sm text-[#9A7B6C] font-semibold pl-11 leading-relaxed"
                      >
                        {pillar.description}
                      </motion.p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* List checklist */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                "Consulta Ginecológica Preventiva",
                "Control Prenatal de Alto Riesgo",
                "Mamografía y Ultrasonido HD",
                "Resultados y Diagnóstico Rápido",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8FC1BB] shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-[#4A3A33]">{item}</span>
                </div>
              ))}
            </div>

          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
