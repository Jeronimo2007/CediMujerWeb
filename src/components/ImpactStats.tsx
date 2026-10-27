"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CalendarCheck2, Activity, Baby } from "lucide-react";
import { OFFICIAL_METRICS } from "@/config/cedimujerContent";

interface CounterProps {
  from: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

const CountUpNumber: React.FC<CounterProps> = ({
  from = 0,
  to,
  duration = 2.2,
  suffix = "",
  prefix = "",
}) => {
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
      {count.toLocaleString("es-CO")}
      {suffix}
    </span>
  );
};

export const ImpactStats: React.FC = () => {
  const icons = [CalendarCheck2, Activity, Baby];
  const cardStyles = [
    { bgColor: "bg-[#CFE6E2]/45", borderColor: "border-[#8FC1BB]/50" },
    { bgColor: "bg-[#EBCFC6]/45", borderColor: "border-[#D7A7A8]/50" },
    { bgColor: "bg-[#E6D9C8]/55", borderColor: "border-[#9A7B6C]/40" },
  ];

  return (
    <section
      id="impacto"
      className="scroll-mt-20 py-16 sm:py-24 bg-[#E6D9C8]/40 text-[#4A3A33] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8FC1BB]/20 border border-[#8FC1BB] text-[#4A3A33] text-xs font-bold uppercase tracking-widest mb-4"
          >
            <span>Nuestra Trayectoria Real en Cifras</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-[#4A3A33] tracking-tight"
          >
            La Confianza de Miles de Mujeres y Familias en Sabaneta
          </motion.h2>
        </div>

        {/* 3 Official Counters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {OFFICIAL_METRICS.map((stat, idx) => {
            const IconComp = icons[idx % icons.length];
            const style = cardStyles[idx % cardStyles.length];
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, scale: 0.92, y: 25 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative p-8 sm:p-10 rounded-3xl ${style.bgColor} border-2 ${style.borderColor} hover:border-[#8FC1BB] shadow-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#8FC1BB] text-[#4A3A33] flex items-center justify-center font-bold shadow-md">
                    <IconComp className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-black text-[#9A7B6C] uppercase tracking-widest">
                    CediMujer 0{stat.id}
                  </span>
                </div>

                <div>
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#4A3A33]">
                    <CountUpNumber
                      from={0}
                      to={stat.number}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      duration={2.4}
                    />
                  </div>

                  <h3 className="mt-3 text-xl font-black text-[#4A3A33]">
                    {stat.label}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-[#9A7B6C] font-semibold leading-relaxed">
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
