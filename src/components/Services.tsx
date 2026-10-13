"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Stethoscope, 
  Baby, 
  Activity, 
  Heart, 
  Sparkles, 
  ArrowUpRight, 
  Calendar,
  Microscope
} from "lucide-react";
import { ASSETS } from "@/config/assets";

interface ServicesProps {
  onSelectService?: (serviceName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const gridScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1.0, 0.96]);
  const imageZoom = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1.0, 1.15]);

  const serviceList = [
    {
      id: "ginecologia",
      title: "Ginecología Integral",
      category: "Salas de Atención",
      icon: Stethoscope,
      image: ASSETS.services.ginecologia,
      bgColor: "bg-[#EBCFC6]/40",
      borderColor: "border-[#D7A7A8]/40",
      description:
        "Consultas preventivas con equipamiento ginecológico moderno, citología, colposcopia y salud íntima especializada.",
      highlights: ["Papanicolaou y Citología", "Salud Hormonal", "Colposcopia de Alta Precisión"],
    },
    {
      id: "obstetricia",
      title: "Obstetricia & Control Prenatal",
      category: "Calidad Humana",
      icon: Baby,
      image: ASSETS.services.obstetricia,
      bgColor: "bg-[#CFE6E2]/40",
      borderColor: "border-[#8FC1BB]/40",
      description:
        "Acompañamiento médico cálido y riguroso durante cada etapa de tu gestación para cuidar a mamá y bebé.",
      highlights: ["Control de Alto Riesgo", "Monitoreo Fetal", "Plan de Parto Humanizado"],
    },
    {
      id: "ecografia",
      title: "Ecografía 3D / 4D HD",
      category: "Tecnología Médica",
      icon: Activity,
      image: ASSETS.services.ecografia,
      bgColor: "bg-[#E6D9C8]/40",
      borderColor: "border-[#9A7B6C]/40",
      description:
        "Equipos de ultrasonido médico de última generación para diagnósticos de alta resolución y seguimiento estructural.",
      highlights: ["Ecografía Genética 11-14 sem.", "Tamizaje Morfológico 20-24 sem.", "Ultrasonido 4D en Tiempo Real"],
    },
    {
      id: "mastologia",
      title: "Mastología & Salud Mamaria",
      category: "Equipos Diagnósticos",
      icon: Heart,
      image: ASSETS.services.mastologia,
      bgColor: "bg-[#EBCFC6]/40",
      borderColor: "border-[#D7A7A8]/40",
      description:
        "Evaluación especializada con tecnología diagnóstica avanzada para detección temprana y bienestar mamario integral.",
      highlights: ["Ecografía Mamaria de Alta Resolución", "Evaluación Precoz de Nódulos", "Asesoría Integral"],
    },
    {
      id: "endocrinologia",
      title: "Endocrinología Femenina",
      category: "Precisión Clínica",
      icon: Sparkles,
      image: ASSETS.services.endocrinologia,
      bgColor: "bg-[#CFE6E2]/40",
      borderColor: "border-[#8FC1BB]/40",
      description:
        "Control hormonal preciso, manejo integral de SOP, tiroides y balance metabólico en cada etapa femenina.",
      highlights: ["Tratamiento de SOP", "Control de Menopausia", "Balance Hormonal Personalizado"],
    },
    {
      id: "cirugia",
      title: "Cirugía Ginecológica Avanzada",
      category: "Salas Quirúrgicas",
      icon: Microscope,
      image: ASSETS.services.cirugia,
      bgColor: "bg-[#E6D9C8]/40",
      borderColor: "border-[#9A7B6C]/40",
      description:
        "Salas acondicionadas para procedimientos mínimamente invasivos con los más altos estándares de bioseguridad.",
      highlights: ["Laparoscopia Ginecológica", "Histeroscopia Diagnóstica", "Histerectomía Mínimamente Invasiva"],
    },
  ];

  return (
    <section ref={containerRef} id="servicios" className="py-24 bg-[#F7F2EC] text-[#4A3A33] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8FC1BB]/20 border border-[#8FC1BB] text-[#4A3A33] text-xs font-bold uppercase tracking-widest mb-4"
          >
            <span>Especialidades Médicas & Tecnología</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-[#4A3A33] tracking-tight"
          >
            Servicios Clínicos Especializados para Ti
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-[#9A7B6C] font-semibold text-base sm:text-lg"
          >
            Nuestras salas y equipos médicos propios reflejan el compromiso con la excelencia y el bienestar de cada paciente.
          </motion.p>
        </div>

        {/* Services Cards Grid */}
        <motion.div style={{ scale: gridScale }} className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 origin-center">
          {serviceList.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative ${service.bgColor} rounded-3xl overflow-hidden border ${service.borderColor} hover:border-[#8FC1BB] shadow-lg hover:shadow-xl transition-all duration-500 flex flex-col justify-between backdrop-blur-md`}
              >
                <div>
                  {/* Card Banner Image */}
                  <div className="relative h-48 overflow-hidden">
                    <motion.div style={{ scale: imageZoom }} className="w-full h-full relative">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        unoptimized
                        className="object-cover filter brightness-95 transition-all duration-300"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#4A3A33]/50 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Category Tag */}
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#F7F2EC]/90 backdrop-blur-md text-[11px] font-bold text-[#4A3A33] border border-[#E6D9C8]">
                      {service.category}
                    </span>

                    {/* Icon Badge */}
                    <div className="absolute -bottom-5 right-6 w-12 h-12 rounded-2xl bg-[#8FC1BB] text-[#4A3A33] flex items-center justify-center font-bold shadow-md group-hover:scale-110 transition-transform border border-[#8FC1BB]">
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-8">
                    <h3 className="text-xl font-bold text-[#4A3A33] group-hover:text-[#8FC1BB] transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="mt-3 text-[#9A7B6C] text-sm font-semibold leading-relaxed">
                      {service.description}
                    </p>

                    {/* Feature Highlights */}
                    <ul className="mt-6 space-y-2 border-t border-[#E6D9C8] pt-4">
                      {service.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-[#4A3A33] font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8FC1BB]"></span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTA Action */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => onSelectService && onSelectService(service.title)}
                    className="w-full py-3 rounded-2xl bg-[#F7F2EC] hover:bg-[#8FC1BB] text-[#4A3A33] font-extrabold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 border border-[#E6D9C8] group/btn"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Agendar Cita en Servicio</span>
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
