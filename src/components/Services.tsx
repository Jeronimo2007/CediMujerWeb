"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Baby,
  Stethoscope,
  Video,
  Building2,
  BookOpen,
  MessageSquareHeart,
  ArrowUpRight,
  Calculator,
} from "lucide-react";
import type { AppSectionView } from "@/components/SectionPageView";

interface ServicesProps {
  onSelectService?: (serviceName: string) => void;
  onOpenCalculator?: () => void;
  onOpenSection?: (
    view: AppSectionView,
    subKey?: string,
    itemId?: string
  ) => void;
}

export const Services: React.FC<ServicesProps> = ({
  onOpenCalculator,
  onOpenSection,
}) => {
  const mainSections: {
    id: AppSectionView;
    title: string;
    category: string;
    icon: React.ElementType;
    image: string;
    summary: string;
    chips: { label: string; subKey?: string; isCalc?: boolean }[];
  }[] = [
    {
      id: "embarazo",
      title: "Embarazo y Materno-Fetal",
      category: "Obstetricia",
      icon: Baby,
      image: "/assets/images/equipo2.jpg",
      summary: "Control prenatal, bienestar fetal y ecografía 3D/4D HD Live.",
      chips: [
        { label: "Consultas", subKey: "embarazo-consultas" },
        { label: "Bienestar Fetal", subKey: "embarazo-bienestar" },
        { label: "Ecografías 3D/4D", subKey: "embarazo-ecografias" },
        { label: "Calculadora", isCalc: true },
      ],
    },
    {
      id: "ginecologia",
      title: "Ginecología Integral",
      category: "Salud Femenina",
      icon: Stethoscope,
      image: "/assets/images/sala1.jpg",
      summary: "Ecografías, consultas, paquetes de tamizaje y procedimientos.",
      chips: [
        { label: "Ecografías", subKey: "ginecologia-ecografias" },
        { label: "Consultas", subKey: "ginecologia-consultas" },
        { label: "Tamizajes", subKey: "ginecologia-tamizajes" },
        { label: "Procedimientos", subKey: "ginecologia-procedimientos" },
      ],
    },
    {
      id: "telemedicina",
      title: "Telemedicina",
      category: "Consulta Virtual",
      icon: Video,
      image: "/assets/images/trabajo.jpg",
      summary: "Orientación por videollamada con nuestras especialistas.",
      chips: [
        { label: "Ginecología Virtual", subKey: "telemedicina" },
        { label: "Planificación", subKey: "telemedicina" },
        { label: "Infertilidad", subKey: "telemedicina" },
      ],
    },
    {
      id: "quienes-somos",
      title: "Quiénes Somos",
      category: "Desde 2008",
      icon: Building2,
      image: "/assets/images/header.jpg",
      summary: "Nuestra sede en Aves María, especialistas y valores.",
      chips: [
        { label: "Institución", subKey: "nuestra-institucion" },
        { label: "Sede Sabaneta", subKey: "nuestra-sede" },
        { label: "Especialistas", subKey: "especialistas" },
        { label: "Asociación", subKey: "asociacion-usuarios" },
      ],
    },
    {
      id: "blog",
      title: "Guías y Preguntas",
      category: "Educación",
      icon: BookOpen,
      image: "/assets/images/equipo1.jpg",
      summary: "Artículos médicos breves y dudas frecuentes antes de tu cita.",
      chips: [
        { label: "DIU Mirena" },
        { label: "Ecografías" },
        { label: "Salud Mamaria" },
        { label: "Preguntas FAQ" },
      ],
    },
    {
      id: "contacto",
      title: "Contacto y Ubicación",
      category: "Sede Aves María",
      icon: MessageSquareHeart,
      image: "/assets/images/equipo1vista2.jpg",
      summary: "WhatsApp, PBX, mapa interactivo y atención al usuario.",
      chips: [
        { label: "Escríbenos", subKey: "contacto" },
        { label: "Recomendar", subKey: "recomendar" },
        { label: "Testimonios", subKey: "testimonio" },
        { label: "PQRSD", subKey: "reclamos" },
      ],
    },
  ];

  return (
    <section
      id="servicios"
      className="scroll-mt-20 py-12 sm:py-20 text-[#4A3A33] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Minimalist Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
          <span className="inline-block text-[10px] font-medium uppercase tracking-[0.22em] text-[#9A7B6C] mb-2">
            Especialidades CediMujer
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#4A3A33] tracking-tight">
            Nuestras unidades de <span className="italic text-[#9A7B6C]">cuidado</span>
          </h2>
        </div>

        {/* Mobile-First Pastel Pink Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {mainSections.map((sec, index) => {
            const IconComponent = sec.icon;
            return (
              <motion.div
                key={sec.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative bg-white/85 backdrop-blur-sm rounded-[1.75rem] overflow-hidden border border-[#F3D9D9] hover:border-[#D7A7A8] shadow-[0_10px_30px_-15px_rgba(154,123,108,0.1)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Compact Image Header */}
                  <div
                    onClick={() => onOpenSection && onOpenSection(sec.id)}
                    className="relative h-40 sm:h-44 overflow-hidden bg-[#F7E0E0] cursor-pointer"
                  >
                    <Image
                      src={sec.image}
                      alt={sec.title}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#4A3A33]/65 via-transparent to-transparent pointer-events-none" />

                    <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-[#FDF6F6]/95 text-[10px] font-medium tracking-wider uppercase text-[#4A3A33]">
                      {sec.category}
                    </span>

                    <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between text-[#FDF6F6]">
                      <h3 className="font-serif text-xl sm:text-2xl font-normal leading-tight">
                        {sec.title}
                      </h3>
                      <div className="w-8 h-8 rounded-full bg-[#F7E0E0]/95 text-[#4A3A33] flex items-center justify-center shrink-0">
                        <IconComponent className="w-4 h-4 stroke-[1.75]" />
                      </div>
                    </div>
                  </div>

                  {/* Concise Body & Interactive Pastel Pink Pills */}
                  <div className="p-5 sm:p-6 space-y-4">
                    <p className="text-xs sm:text-[13px] text-[#4A3A33]/80 font-normal leading-relaxed">
                      {sec.summary}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {sec.chips.map((chip, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            if (chip.isCalc && onOpenCalculator) {
                              onOpenCalculator();
                            } else if (onOpenSection) {
                              onOpenSection(sec.id, chip.subKey);
                            }
                          }}
                          className="px-3 py-1.5 rounded-full bg-[#F9EAEA] hover:bg-[#4A3A33] text-[#4A3A33] hover:text-[#FDF6F6] border border-[#F2D4D4] text-[11px] font-medium transition-colors inline-flex items-center gap-1"
                        >
                          {chip.isCalc && (
                            <Calculator className="w-3 h-3 text-[#8FC1BB]" />
                          )}
                          <span>{chip.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Minimalist Footer Action */}
                <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                  <button
                    type="button"
                    onClick={() => onOpenSection && onOpenSection(sec.id)}
                    className="w-full py-2.5 px-4 rounded-full bg-[#FDF6F6] hover:bg-[#4A3A33] text-[#4A3A33] hover:text-[#FDF6F6] border border-[#F3D9D9] hover:border-[#4A3A33] font-medium text-xs tracking-wide transition-all flex items-center justify-center gap-1.5 group/btn"
                  >
                    <span>( Explorar )</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#D7A7A8] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
