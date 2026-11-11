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
  toColor = "#EBCFC6",
}) => {
  const portalRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: portalRef,
    offset: ["start end", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 0.5, 1], [12, 0, -8]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.6, 1, 1, 0.65]);

  return (
    <div
      ref={portalRef}
      className="relative py-12 sm:py-20 px-4 sm:px-6 overflow-hidden flex items-center justify-center"
    >
      {/* Delicate ambient aura in the background (no heavy box) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[640px] h-[180px] sm:h-[260px] rounded-full opacity-40 [filter:blur(64px)] pointer-events-none"
        style={{ backgroundColor: toColor }}
      />

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 text-center max-w-2xl mx-auto flex flex-col items-center"
      >
        {/* Minimalist vertical hairline */}
        <div className="w-px h-8 sm:h-10 bg-gradient-to-b from-transparent via-[#9A7B6C]/35 to-[#8FC1BB]/70 mb-4" />

        <div className="inline-flex items-center gap-2 text-[#9A7B6C] text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.22em] mb-3 font-sans">
          <Sparkles className="w-3 h-3 text-[#8FC1BB] shrink-0" />
          <span>{badge}</span>
        </div>

        <h3 className="font-serif text-2xl sm:text-4xl lg:text-[2.65rem] font-normal text-[#4A3A33] tracking-tight leading-[1.2]">
          {title}
        </h3>

        <p className="mt-3 text-[#9A7B6C] text-xs sm:text-base font-normal leading-relaxed max-w-xl font-sans">
          {subtitle}
        </p>

        <div className="mt-6 flex items-center gap-2 opacity-60">
          <span className="w-8 h-px bg-[#E6D9C8]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#8FC1BB]" />
          <span className="w-8 h-px bg-[#E6D9C8]" />
        </div>
      </motion.div>
    </div>
  );
};
