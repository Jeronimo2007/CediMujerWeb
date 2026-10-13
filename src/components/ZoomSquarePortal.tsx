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

  const squareScale = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [0.94, 1.0, 1.02, 0.96]);
  const squareRadius = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], ["32px", "20px", "0px", "24px"]);
  const innerZoom = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0.96, 1.0, 1.02, 0.97]);

  return (
    <section ref={sectionRef} id={id} className={`relative py-8 overflow-hidden ${className}`}>
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#CFE6E2]/40 blur-[100px] pointer-events-none z-0" />

        {/* Square Frame Decorative Border Line */}
        <div className="absolute inset-0 border border-[#8FC1BB]/30 rounded-[inherit] pointer-events-none z-10" />

        {/* Inner Content Zooming with Camera Progress */}
        <motion.div style={{ scale: innerZoom }} className="relative z-10 w-full origin-center">
          {children}
        </motion.div>
      </motion.div>
    </section>
  );
};
