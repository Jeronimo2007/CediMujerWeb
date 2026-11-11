"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ASSETS } from "@/config/assets";

interface CurtainPreloaderProps {
  onComplete?: () => void;
  brandTitle?: string;
}

export const CurtainPreloader: React.FC<CurtainPreloaderProps> = ({
  onComplete,
  brandTitle = "Centro de Diagnóstico Especializado en Salud para la Mujer",
}) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let start: number | null = null;
    const duration = 1550; // smooth 1.55s progress fill
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const rawProgress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - rawProgress, 3);
      setProgress(Math.round(eased * 100));

      if (rawProgress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);

    const timerExit = setTimeout(() => {
      setIsVisible(false);
    }, 1750);

    const timerComplete = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2550);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      clearTimeout(timerExit);
      clearTimeout(timerComplete);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="editorial-silk-preloader"
          initial={{ opacity: 1, y: "0%" }}
          exit={{
            y: "-102%",
            transition: {
              duration: 0.85,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          onClick={() => setIsVisible(false)}
          className="fixed inset-0 z-[100] bg-[#FDF6F6] flex flex-col items-center justify-between px-6 py-8 sm:py-12 overflow-hidden select-none cursor-pointer"
        >
          {/* Whisper-soft Organic Pastel Pink Washes */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1.05, opacity: 0.7 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="absolute -top-24 -left-24 w-72 sm:w-[460px] h-72 sm:h-[460px] rounded-full bg-[#F5D6D6]/70 [filter:blur(80px)] pointer-events-none"
          />
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1.05, opacity: 0.6 }}
            transition={{ duration: 1.8, delay: 0.15, ease: "easeOut" }}
            className="absolute -bottom-24 -right-24 w-72 sm:w-[460px] h-72 sm:h-[460px] rounded-full bg-[#F7E0E0]/80 [filter:blur(80px)] pointer-events-none"
          />

          {/* Top Editorial Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative z-10 flex items-center gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[#9A7B6C] font-medium"
          >
            <span className="w-6 sm:w-10 h-px bg-[#EBC5C5]" />
            <span>Sabaneta · Desde 2008</span>
            <span className="w-6 sm:w-10 h-px bg-[#EBC5C5]" />
          </motion.div>

          {/* Center Botanical Arch & Brand Reveal */}
          <div className="relative z-10 flex flex-col items-center max-w-md w-full text-center my-auto">
            {/* Animated Minimalist Botanical Arch SVG Frame */}
            <div className="relative flex flex-col items-center justify-center px-8 py-10 sm:px-12 sm:py-12">
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 260 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Outer Delicate Arch */}
                <motion.path
                  d="M 20 280 L 20 130 A 110 110 0 0 1 240 130 L 240 280"
                  stroke="#EBC5C5"
                  strokeWidth="1"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.25, ease: "easeInOut" }}
                />
                {/* Inner Offset Pastel Rose Arch */}
                <motion.path
                  d="M 32 272 L 32 132 A 98 98 0 0 1 228 132 L 228 272"
                  stroke="#D7A7A8"
                  strokeWidth="0.9"
                  strokeDasharray="3 4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.8 }}
                  transition={{ duration: 1.4, delay: 0.15, ease: "easeInOut" }}
                />
                {/* Top Botanical Sparkle Accent */}
                <motion.circle
                  cx="130"
                  cy="20"
                  r="3"
                  fill="#D7A7A8"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                />
              </svg>

              {/* Brand Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
                className="relative w-44 sm:w-56 h-14 sm:h-16 mb-4"
              >
                <Image
                  src={ASSETS.logo.primary}
                  alt="CediMujer"
                  fill
                  priority
                  unoptimized
                  className="object-contain"
                />
              </motion.div>

              {/* Editorial Playfair Display Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.25, ease: "easeOut" }}
                className="font-serif italic text-lg sm:text-xl text-[#4A3A33] font-normal leading-snug"
              >
                Te acompañamos en cada etapa de la vida
              </motion.p>
            </div>

            {/* Silk-thin Horizontal Progress Line & Counter */}
            <div className="w-48 sm:w-56 mt-2 space-y-2">
              <div className="relative h-[1.5px] w-full bg-[#F3D9D9] rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#D7A7A8] via-[#9A7B6C] to-[#8FC1BB] rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] font-sans tracking-[0.18em] uppercase text-[#9A7B6C]">
                <span>Bienvenida</span>
                <span className="font-serif italic text-xs text-[#4A3A33]">
                  {progress}%
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Subtle Location Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative z-10 text-[10px] text-[#9A7B6C]/80 tracking-[0.16em] uppercase"
          >
            C.C. Aves María · Sabaneta
          </motion.div>

          {/* Soft Curved Bottom Edge when lifting up */}
          <svg
            className="absolute -bottom-8 sm:-bottom-12 left-0 w-full h-9 sm:h-13 text-[#FDF6F6] pointer-events-none"
            viewBox="0 0 1440 60"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 L1440,0 L1440,10 Q720,60 0,10 Z"
              fill="currentColor"
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
