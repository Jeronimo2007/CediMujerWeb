"use client";

import React from "react";
import { Award, ShieldCheck, Star } from "lucide-react";
import { ASSETS } from "@/config/assets";

export const CertificationsMarquee: React.FC = () => {
  const list = [...ASSETS.certifications, ...ASSETS.certifications];

  return (
    <section id="certificaciones" className="py-14 bg-[#F7F2EC] border-y border-[#E6D9C8] overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-6">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#4A3A33] bg-[#8FC1BB]/20 px-4 py-1.5 rounded-full border border-[#8FC1BB]">
          <Award className="w-4 h-4 text-[#8FC1BB]" />
          <span>Acreditaciones & Certificaciones de Excelencia</span>
        </div>
      </div>

      {/* Infinite Scrolling Container */}
      <div className="relative w-full overflow-hidden flex items-center">
        {/* Gradient Fades on Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#F7F2EC] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#F7F2EC] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex items-center gap-6 py-2">
          {list.map((cert, index) => (
            <div
              key={`${cert.id}-${index}`}
              className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-[#E6D9C8]/40 border border-[#E6D9C8] hover:border-[#8FC1BB] shadow-sm backdrop-blur-md shrink-0 transition-all hover:scale-105 group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#8FC1BB] text-[#4A3A33] flex items-center justify-center font-bold shadow-sm">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-bold text-[#4A3A33] group-hover:text-[#8FC1BB] transition-colors">
                  {cert.name}
                </span>
                <span className="text-xs text-[#9A7B6C] font-semibold flex items-center gap-1">
                  <Star className="w-3 h-3 text-[#D7A7A8] fill-[#D7A7A8]" />
                  {cert.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
