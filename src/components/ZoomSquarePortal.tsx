"use client";

import React from "react";

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
  bgGradientFrom = "#FAF7F2",
  bgGradientTo = "#E6D9C8",
}) => {
  return (
    <div
      id={id}
      className={`relative py-2 sm:py-4 overflow-hidden ${className}`}
    >
      {/* Whisper-soft organic ambient color wash (no enclosing box border) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-45 transition-colors duration-1000"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${bgGradientTo} 0%, ${bgGradientFrom} 75%, transparent 100%)`,
        }}
      />

      {/* Inner Content */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
};
