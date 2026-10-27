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
  CheckCircle2,
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
    bgColor: string;
    borderColor: string;
    description: string;
    subsections: { label: string; subKey?: string; isCalc?: boolean }[];
  }[] = [
    {
      id: "embarazo",
      title: "Embarazo y Medicina Materno-Fetal",
      category: "Sección Independiente · 3 Subsecciones",
      icon: Baby,
      image: "/assets/images/equipo2.jpg",
      bgColor: "bg-[#CFE6E2]/45",
      borderColor: "border-[#8FC1BB]/50",
      description:
        "Acompañamiento integral durante toda tu gestación: consultas obstétricas, pruebas de bienestar fetal, ecografías 3D/4D HD Live y detalle anatómico.",
      subsections: [
        {
          label: "Consultas (Preconcepcional, Control prenatal, Posparto)",
          subKey: "embarazo-consultas",
        },
        {
          label: "Pruebas de bienestar fetal (Perfil, Doppler, Monitoreo)",
          subKey: "embarazo-bienestar",
        },
        {
          label: "Ecografías de embarazo (3D/4D HD, Tercer Nivel, Genética)",
          subKey: "embarazo-ecografias",
        },
        { label: "Calculadora gestacional interactiva", isCalc: true },
      ],
    },
    {
      id: "ginecologia",
      title: "Ginecología Integral y Procedimientos",
      category: "Sección Independiente · 4 Subsecciones",
      icon: Stethoscope,
      image: "/assets/images/sala1.jpg",
      bgColor: "bg-[#EBCFC6]/45",
      borderColor: "border-[#D7A7A8]/50",
      description:
        "Entra a nuestra sección exclusiva de Ginecología para conocer qué es y cómo se realiza cada ecografía, consulta, tamizaje preventivo y procedimiento.",
      subsections: [
        {
          label: "Ecografías (Transvaginal, Suprapúbica, Piso pélvico, Folículo, Mama)",
          subKey: "ginecologia-ecografias",
        },
        {
          label: "Consultas (Ginecológica, Planificación, Infertilidad, Mama)",
          subKey: "ginecologia-consultas",
        },
        {
          label: "Tamizajes (Básico, de Mama y Ginecológico Completo)",
          subKey: "ginecologia-tamizajes",
        },
        {
          label: "Procedimientos (Colposcopia, Citología, VPH, DIU, Implantes, Topicaciones)",
          subKey: "ginecologia-procedimientos",
        },
      ],
    },
    {
      id: "telemedicina",
      title: "Telemedicina con Especialistas",
      category: "Sección Independiente · 3 Modalidades",
      icon: Video,
      image: "/assets/images/trabajo.jpg",
      bgColor: "bg-[#E6D9C8]/50",
      borderColor: "border-[#9A7B6C]/40",
      description:
        "Atención virtual por videollamada con nuestros especialistas para orientación ginecológica, lectura de exámenes, planificación e infertilidad.",
      subsections: [
        {
          label: "Teleconsulta con especialista en Ginecología",
          subKey: "telemedicina",
        },
        {
          label: "Teleconsulta de planificación familiar",
          subKey: "telemedicina",
        },
        {
          label: "Teleconsulta de Infertilidad",
          subKey: "telemedicina",
        },
      ],
    },
    {
      id: "quienes-somos",
      title: "Quiénes Somos y Especialistas",
      category: "Sección Independiente · 4 Subsecciones",
      icon: Building2,
      image: "/assets/images/header.jpg",
      bgColor: "bg-[#CFE6E2]/45",
      borderColor: "border-[#8FC1BB]/50",
      description:
        "Conoce nuestra sede en el C.C. Aves María (Sabaneta), nuestra historia desde mayo de 2008, los perfiles de nuestros especialistas y la Asociación de Usuarios.",
      subsections: [
        { label: "Nuestra Sede (Locales 341-342)", subKey: "nuestra-sede" },
        {
          label: "Nuestra Institución (Misión, Visión y Valores)",
          subKey: "nuestra-institucion",
        },
        {
          label: "Especialistas (Dr. Diego Gaviria, Dra. Durley Maya y equipo)",
          subKey: "especialistas",
        },
        { label: "Asociación de usuarios", subKey: "asociacion-usuarios" },
      ],
    },
    {
      id: "blog",
      title: "Información, Blog y Preguntas Frecuentes",
      category: "Sección Independiente · 7 Artículos",
      icon: BookOpen,
      image: "/assets/images/equipo1.jpg",
      bgColor: "bg-[#EBCFC6]/45",
      borderColor: "border-[#D7A7A8]/50",
      description:
        "Guías educativas escritas por nuestros especialistas sobre DIU Mirena, ecografías del embarazo, prolapso genital, menopausia, cáncer de mama y cérvix.",
      subsections: [
        { label: "Colocación de DIU Mirena y Las Ecografías en el embarazo" },
        { label: "Prolapso genital femenino y Menopausia" },
        { label: "Prevención de Cáncer de mama y Cáncer de Cérvix" },
        { label: "¿Cómo combatir los cólicos menstruales? y FAQ" },
      ],
    },
    {
      id: "contacto",
      title: "Contacto y Atención al Cliente",
      category: "Sección Independiente · 5 Opciones",
      icon: MessageSquareHeart,
      image: "/assets/images/equipo1vista2.jpg",
      bgColor: "bg-[#E6D9C8]/50",
      borderColor: "border-[#9A7B6C]/40",
      description:
        "Líneas oficiales de asesoría WhatsApp (+57 311 397 9905), PBX (+604 357 3010), mapa de ubicación y formulario con 5 modalidades de atención al usuario.",
      subsections: [
        { label: "Escríbanos mensaje de contacto", subKey: "contacto" },
        { label: "Recomendar nuestro sistema", subKey: "recomendar" },
        { label: "Enviar sugerencias y Depositar un testimonio", subKey: "testimonio" },
        { label: "Quejas y reclamos (Canal PQRSD)", subKey: "reclamos" },
      ],
    },
  ];

  return (
    <section
      id="servicios"
      className="scroll-mt-20 py-16 sm:py-24 bg-[#F7F2EC] text-[#4A3A33] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8FC1BB]/20 border border-[#8FC1BB] text-[#4A3A33] text-xs font-bold uppercase tracking-widest mb-4"
          >
            <span>Secciones Principales e Independientes</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-[#4A3A33] tracking-tight"
          >
            Explora Cada Área Especializada de CediMujer
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-[#9A7B6C] font-semibold text-base sm:text-lg"
          >
            Haz clic en cualquiera de nuestras secciones o subsecciones para abrir su página completa con explicaciones detalladas, imágenes y preparación.
          </motion.p>
        </div>

        {/* Main Independent Section Cards Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {mainSections.map((sec, index) => {
            const IconComponent = sec.icon;
            return (
              <motion.div
                key={sec.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.07 }}
                className={`group relative ${sec.bgColor} rounded-3xl overflow-hidden border-2 ${sec.borderColor} hover:border-[#8FC1BB] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between`}
              >
                <div>
                  {/* Card Banner Image Wrapper */}
                  <div
                    onClick={() => onOpenSection && onOpenSection(sec.id)}
                    className="relative cursor-pointer"
                  >
                    <div className="relative h-48 overflow-hidden bg-[#4A3A33]">
                      <Image
                        src={sec.image}
                        alt={sec.title}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#4A3A33]/75 via-[#4A3A33]/20 to-transparent pointer-events-none" />

                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#F7F2EC]/95 text-[11px] font-extrabold text-[#4A3A33] border border-[#E6D9C8] shadow-sm">
                        {sec.category}
                      </span>
                    </div>

                    <div className="absolute -bottom-5 right-6 z-10 w-12 h-12 rounded-2xl bg-[#8FC1BB] text-[#4A3A33] flex items-center justify-center font-bold shadow-md group-hover:scale-110 transition-transform border-2 border-[#F7F2EC]">
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-7 pt-8">
                    <h3
                      onClick={() => onOpenSection && onOpenSection(sec.id)}
                      className="text-xl font-black text-[#4A3A33] group-hover:text-[#8FC1BB] transition-colors cursor-pointer"
                    >
                      {sec.title}
                    </h3>

                    <p className="mt-2.5 text-[#4A3A33]/85 text-xs sm:text-sm font-semibold leading-relaxed">
                      {sec.description}
                    </p>

                    {/* Clickable Sub-sections */}
                    <div className="mt-5 pt-4 border-t border-[#E6D9C8] space-y-1.5">
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#9A7B6C] block mb-2">
                        Subsecciones (Clic para abrir):
                      </span>
                      {sec.subsections.map((sub, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            if (sub.isCalc && onOpenCalculator) {
                              onOpenCalculator();
                            } else if (onOpenSection) {
                              onOpenSection(sec.id, sub.subKey);
                            }
                          }}
                          className="w-full text-left px-3 py-1.5 rounded-xl bg-[#F7F2EC]/80 hover:bg-[#8FC1BB]/40 text-xs text-[#4A3A33] font-bold flex items-center gap-2 transition-colors"
                        >
                          {sub.isCalc ? (
                            <Calculator className="w-3.5 h-3.5 text-[#8FC1BB] shrink-0" />
                          ) : (
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#8FC1BB] shrink-0" />
                          )}
                          <span className="truncate">{sub.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card CTA Action */}
                <div className="p-6 pt-0">
                  <button
                    type="button"
                    onClick={() => onOpenSection && onOpenSection(sec.id)}
                    className="w-full py-3.5 rounded-2xl bg-[#4A3A33] hover:bg-[#8FC1BB] text-[#F7F2EC] hover:text-[#4A3A33] font-extrabold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-sm group/btn"
                  >
                    <span>Entrar a {sec.title.split(" ")[0]}</span>
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
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
