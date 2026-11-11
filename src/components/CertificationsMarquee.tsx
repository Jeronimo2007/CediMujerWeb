"use client";

import React from "react";
import { ShieldCheck } from "lucide-react";
import { ASSETS } from "@/config/assets";

export const CertificationsMarquee: React.FC = () => {
  const list = [...ASSETS.certifications, ...ASSETS.certifications];

  return (
    <section
      id="certificaciones"
      className="py-4 sm:py-5 bg-[#EBCFC6]/40 border-b border-[#D7A7A8]/40 overflow-hidden relative"
    >
      <div className="relative w-full overflow-hidden flex items-center">
        {/* Soft Pastel Pink Gradient Fades on Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#F7F6F4] via-[#F7F6F4]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#F7F6F4] via-[#F7F6F4]/80 to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex items-center gap-8 sm:gap-12 py-0.5">
          {list.map((cert, index) => (
            <div
              key={`${cert.id}-${index}`}
              className="flex items-center gap-2.5 shrink-0"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#D7A7A8] stroke-[1.75] shrink-0" />
              <span className="font-serif text-xs sm:text-sm font-normal text-[#4A3A33]">
                {cert.name}
              </span>
              <span className="ml-4 sm:ml-6 w-1 h-1 rounded-full bg-[#D7A7A8]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
