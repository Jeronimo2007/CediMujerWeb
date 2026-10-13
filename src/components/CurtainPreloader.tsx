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
  const [phase, setPhase] = useState<"logo" | "opening" | "done">("logo");

  useEffect(() => {
    // Phase 1: show logo and gentle pulse for 1.3s
    const timerLogo = setTimeout(() => {
      setPhase("opening");
    }, 1200);

    // Phase 2: curtain split complete at 2.3s
    const timerDone = setTimeout(() => {
      setPhase("done");
      if (onComplete) onComplete();
    }, 2250);

    return () => {
      clearTimeout(timerLogo);
      clearTimeout(timerDone);
    };
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] pointer-events-none flex overflow-hidden">
        {/* Left Curtain Wing (Telón Izquierdo en Lino / Arena) */}
        <motion.div
          initial={{ x: "0%" }}
          animate={{ x: phase === "opening" ? "-100%" : "0%" }}
          transition={{
            duration: 1.05,
            ease: [0.76, 0, 0.24, 1], // cinematic bezier curve
          }}
          className="relative w-1/2 h-full bg-[#F7F2EC] flex flex-col justify-between items-end border-r border-[#E6D9C8]/60 shadow-[20px_0_40px_rgba(74,58,51,0.08)] will-change-transform"
        >
          {/* Subtle vertical texture / shade lines simulating velvet curtain folds */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#E6D9C8]/40 via-transparent to-[#CFE6E2]/25 opacity-70 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-[#4A3A33]/5 to-transparent pointer-events-none" />
        </motion.div>

        {/* Right Curtain Wing (Telón Derecho en Lino / Arena) */}
        <motion.div
          initial={{ x: "0%" }}
          animate={{ x: phase === "opening" ? "100%" : "0%" }}
          transition={{
            duration: 1.05,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="relative w-1/2 h-full bg-[#F7F2EC] flex flex-col justify-between items-start border-l border-[#E6D9C8]/60 shadow-[-20px_0_40px_rgba(74,58,51,0.08)] will-change-transform"
        >
          {/* Subtle vertical texture / shade lines */}
          <div className="absolute inset-0 bg-gradient-to-l from-[#E6D9C8]/40 via-transparent to-[#EBCFC6]/25 opacity-70 pointer-events-none" />
          <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-[#4A3A33]/5 to-transparent pointer-events-none" />
        </motion.div>

        {/* Central Logo & Welcome Presentation (Fades and scales gracefully just before curtains open) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 10 }}
          animate={{
            opacity: phase === "logo" ? 1 : 0,
            scale: phase === "logo" ? 1 : 1.08,
            y: phase === "logo" ? 0 : -20,
          }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 pointer-events-none"
        >
          <div className="relative w-52 sm:w-64 h-16 sm:h-20 mb-5">
            <Image
              src={ASSETS.logo.primary}
              alt="CediMujer"
              fill
              priority
              unoptimized
              className="object-contain"
            />
          </div>

          <div className="h-0.5 w-16 bg-[#8FC1BB] rounded-full mb-3" />

          <p className="text-xs sm:text-sm font-semibold tracking-wide text-[#9A7B6C] max-w-md">
            {brandTitle}
          </p>

          <div className="mt-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8FC1BB] animate-ping" />
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#4A3A33]/70">
              Bienvenida
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
