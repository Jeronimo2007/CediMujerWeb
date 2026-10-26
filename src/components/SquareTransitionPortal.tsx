"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";

interface SquareTransitionPortalProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  fromColor?: string;
  toColor?: string;
}

export const SquareTransitionPortal: React.FC<SquareTransitionPortalProps> = ({
  title = "Tecnología Diagnóstica de Vanguardia",
  subtitle = "Espacios diseñados para tu comodidad, privacidad y tranquilidad en cada etapa.",
  badge = "Experiencia CediMujer",
  fromColor = "#F7F2EC",
  toColor = "#EBCFC6",
}) => {
  const portalRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: portalRef,
    offset: ["start end", "end start"],
  });

  const squareScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.0, 0.92]);
  const squareRadius = useTransform(scrollYProgress, [0, 0.5, 1], ["32px", "24px", "32px"]);
  const textScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.0, 0.96]);

  return (
    <div ref={portalRef} className="relative py-10 sm:py-16 px-4 sm:px-6 bg-[#F7F2EC] overflow-hidden flex items-center justify-center">
      {/* Dynamic Expanding Square Portal Container */}
      <motion.div
        style={{
          scale: squareScale,
          borderRadius: squareRadius,
        }}
        className="relative w-full max-w-5xl min-h-[240px] sm:min-h-[320px] flex items-center justify-center px-5 py-8 sm:p-10 shadow-xl border border-[#8FC1BB] overflow-hidden origin-center"
      >
        {/* Background Color Gradient Morph */}
        <div
          className="absolute inset-0 z-0 transition-colors duration-700"
          style={{
            background: `radial-gradient(ellipse at center, ${toColor} 0%, ${fromColor} 100%)`,
          }}
        />

        {/* Square Portal Ambient Rays */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#CFE6E2]/40 rounded-full [filter:blur(36px)] pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#EBCFC6]/40 rounded-full [filter:blur(36px)] pointer-events-none" />

        {/* Content Inside Expanding Square */}
        <motion.div style={{ scale: textScale }} className="relative z-10 text-center max-w-2xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F2EC]/95 border border-[#8FC1BB] text-[#4A3A33] text-[11px] sm:text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-sm">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8FC1BB] shrink-0" />
            <span>{badge}</span>
          </div>

          <h3 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#4A3A33] tracking-tight leading-tight">
            {title}
          </h3>

          <p className="text-[#9A7B6C] text-sm sm:text-lg font-semibold leading-relaxed">
            {subtitle}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};
