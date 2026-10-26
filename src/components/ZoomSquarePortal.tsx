"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ZoomSquarePortalProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  bgGradientFrom?: string;
  bgGradientTo?: string;
}

export const ZoomSquarePortal: React.FC<ZoomSquarePortalProps> = ({
  children,
  id,
  className = "",
  bgGradientFrom = "#F7F2EC",
  bgGradientTo = "#E6D9C8",
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const squareScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.985, 1.0, 1.0, 0.99]);
  const squareRadius = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], ["28px", "24px", "24px", "28px"]);

  return (
    <div ref={sectionRef} id={id} className={`relative py-4 sm:py-8 px-2 sm:px-4 overflow-hidden ${className}`}>
      {/* Background Color Shift Portal Container */}
      <motion.div
        style={{
          scale: squareScale,
          borderRadius: squareRadius,
        }}
        className="relative mx-auto max-w-[1400px] 2xl:max-w-[1640px] w-full transition-colors duration-700 overflow-hidden shadow-lg border border-[#E6D9C8]"
      >
        {/* Animated Background Color Gradient */}
        <div
          className="absolute inset-0 z-0 transition-colors duration-1000"
          style={{
            background: `radial-gradient(ellipse at center, ${bgGradientTo} 0%, ${bgGradientFrom} 100%)`,
          }}
        />

        {/* Square Portal Glow Ring Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] rounded-full bg-[#CFE6E2]/35 [filter:blur(36px)] pointer-events-none z-0" />

        {/* Square Frame Decorative Border Line */}
        <div className="absolute inset-0 border border-[#8FC1BB]/30 rounded-[inherit] pointer-events-none z-10" />

        {/* Inner Content */}
        <div className="relative z-10 w-full">
          {children}
        </div>
      </motion.div>
    </div>
  );
};
