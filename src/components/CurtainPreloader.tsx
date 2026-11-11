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
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timerExit = setTimeout(() => {
      setIsVisible(false);
    }, 1500);

    const timerComplete = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2300);

    return () => {
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

          {/* Center Brand Logo Reveal (Sin marco, solo el logo) */}
          <div className="relative z-10 flex flex-col items-center justify-center my-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
              className="relative w-52 sm:w-64 h-16 sm:h-20"
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
          </div>

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
