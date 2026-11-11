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
  duration = 2.0,
  suffix = "",
  prefix = "",
}) => {
  const [count, setCount] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

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
    <span ref={ref} className="font-serif font-normal tracking-tight">
      {prefix}
      {count.toLocaleString("es-CO")}
      {suffix}
    </span>
  );
};

export const ImpactStats: React.FC = () => {
  const icons = [CalendarCheck2, Activity, Baby];

  return (
    <section
      id="impacto"
      className="scroll-mt-20 pt-6 pb-4 sm:pt-10 sm:pb-8 text-[#4A3A33] relative"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="rounded-[2rem] bg-gradient-to-r from-[#EBCFC6]/55 via-[#F7F6F4] to-[#EBCFC6]/55 border border-[#D7A7A8]/60 shadow-[0_12px_36px_-18px_rgba(74,58,51,0.1)] grid grid-cols-3 divide-x divide-[#D7A7A8]/45 overflow-hidden"
        >
          {OFFICIAL_METRICS.map((stat, idx) => {
            const IconComp = icons[idx % icons.length];
            return (
              <div
                key={stat.id}
                className="py-5 px-2 sm:p-7 flex flex-col items-center text-center justify-center"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#EBCFC6]/75 text-[#4A3A33] flex items-center justify-center mb-2">
                  <IconComp className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.75] text-[#4A3A33]" />
                </div>

                <div className="text-xl sm:text-4xl lg:text-[2.75rem] text-[#4A3A33] leading-none">
                  <CountUpNumber
                    from={0}
                    to={stat.number}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    duration={2.2}
                  />
                </div>

                <h3 className="mt-1.5 sm:mt-2 font-sans text-[10px] sm:text-xs font-medium uppercase tracking-wider text-[#9A7B6C]">
                  {stat.label}
                </h3>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
