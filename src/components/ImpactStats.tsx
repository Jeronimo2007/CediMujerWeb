"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Smile, Stethoscope, Award } from "lucide-react";

interface CounterProps {
  from: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

const CountUpNumber: React.FC<CounterProps> = ({ from = 0, to, duration = 2, suffix = "", prefix = "" }) => {
  const [count, setCount] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = Math.floor(from + (to - from) * easeProgress);
      
      setCount(currentVal);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [isInView, from, to, duration]);

  return (
    <span ref={ref} className="font-extrabold tracking-tight">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

export const ImpactStats: React.FC = () => {
  const stats = [
    {
      id: 1,
      label: "Pacientes Atendidas con Éxito",
      number: 15000,
      prefix: "+",
      suffix: "",
      icon: Users,
      bgColor: "bg-[#CFE6E2]/40",
      borderColor: "border-[#8FC1BB]/40",
      description: "Historias clínicas atendidas con absoluta confidencialidad y calidez.",
    },
    {
      id: 2,
      label: "Índice de Satisfacción",
      number: 99,
      prefix: "",
      suffix: "%",
      icon: Smile,
      bgColor: "bg-[#EBCFC6]/40",
      borderColor: "border-[#D7A7A8]/40",
      description: "Pacientes que recomiendan nuestros servicios a familiares y amigas.",
    },
    {
      id: 3,
      label: "Médicas Especialistas",
      number: 25,
      prefix: "+",
      suffix: "",
      icon: Stethoscope,
      bgColor: "bg-[#E6D9C8]/40",
      borderColor: "border-[#9A7B6C]/40",
      description: "Ginecólogas, obstetras, mastólogas y radiólogas de nivel superior.",
    },
    {
      id: 4,
      label: "Años de Trayectoria Clínica",
      number: 18,
      prefix: "+",
      suffix: "",
      icon: Award,
      bgColor: "bg-[#CFE6E2]/40",
      borderColor: "border-[#8FC1BB]/40",
      description: "Años brindando diagnósticos certeros e innovadores a la comunidad.",
    },
  ];

  return (
    <section id="impacto" className="scroll-mt-20 py-16 sm:py-24 bg-[#E6D9C8]/40 text-[#4A3A33] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8FC1BB]/20 border border-[#8FC1BB] text-[#4A3A33] text-xs font-bold uppercase tracking-widest mb-4"
          >
            <span>Nuestro Compromiso en Cifras</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-[#4A3A33] tracking-tight"
          >
            La Confianza de Miles de Mujeres Nos Respalda
          </motion.h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => {
            const IconComp = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`relative p-8 rounded-3xl ${stat.bgColor} border ${stat.borderColor} hover:border-[#8FC1BB] shadow-md hover:-translate-y-1.5 transition-transform duration-300 flex flex-col justify-between`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#8FC1BB] text-[#4A3A33] flex items-center justify-center font-bold shadow-md">
                    <IconComp className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-bold text-[#9A7B6C] uppercase tracking-widest">
                    0{stat.id}
                  </span>
                </div>

                <div>
                  <div className="text-4xl sm:text-5xl font-black text-[#4A3A33]">
                    <CountUpNumber
                      from={0}
                      to={stat.number}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      duration={2.5}
                    />
                  </div>

                  <h3 className="mt-3 text-lg font-bold text-[#4A3A33]">
                    {stat.label}
                  </h3>

                  <p className="mt-2 text-xs text-[#9A7B6C] font-semibold leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
