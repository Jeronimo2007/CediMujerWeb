"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Eye, ShieldCheck, Microscope } from "lucide-react";
import { ASSETS } from "@/config/assets";

export const FacilitiesGallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const sectionScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1.0, 0.98]);

  return (
    <section ref={containerRef} id="instalaciones" className="py-24 bg-[#E6D9C8]/30 text-[#4A3A33] relative overflow-hidden">
      <motion.div style={{ scale: sectionScale }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 origin-center">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8FC1BB]/20 border border-[#8FC1BB] text-[#4A3A33] text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Microscope className="w-4 h-4 text-[#8FC1BB]" />
            <span>Nuestras Salas y Equipos</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-[#4A3A33] tracking-tight"
          >
            Espacios y Tecnología de CediMujer
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-[#9A7B6C] font-semibold text-base sm:text-lg"
          >
            Conoce de cerca nuestras salas acondicionadas para tu tranquilidad, los equipos de diagnóstico de alta resolución y nuestro equipo profesional en acción.
          </motion.p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {ASSETS.facilities.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => setActiveImage(item.image)}
              className="group relative h-72 sm:h-80 rounded-3xl overflow-hidden border border-[#E6D9C8] hover:border-[#8FC1BB] shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer bg-[#F7F2EC]"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                unoptimized
                className="object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A3A33]/80 via-[#4A3A33]/20 to-transparent pointer-events-none" />

              {/* Tag Badge */}
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#F7F2EC]/90 backdrop-blur-md text-[11px] font-extrabold text-[#4A3A33] border border-[#E6D9C8]">
                {item.tag}
              </span>

              {/* Quick View Button */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-[#8FC1BB] text-[#4A3A33] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                <Eye className="w-4 h-4" />
              </div>

              {/* Card Title & Info */}
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <h3 className="text-lg font-extrabold tracking-tight text-[#F7F2EC] group-hover:text-[#8FC1BB] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#E6D9C8] font-medium mt-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8FC1BB]" />
                  <span>Instalaciones CediMujer</span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal Lightbox for Fullscreen Image View */}
        <AnimatePresence>
          {activeImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveImage(null)}
              className="fixed inset-0 z-50 bg-[#4A3A33]/85 md:backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="relative max-w-5xl w-full h-[70vh] sm:h-[80vh] rounded-3xl overflow-hidden border border-[#E6D9C8] shadow-2xl [transform:translateZ(0)]"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={activeImage}
                  alt="Vista Ampliada CediMujer"
                  fill
                  decoding="async"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="object-contain bg-black/60"
                />
                <button
                  onClick={() => setActiveImage(null)}
                  className="absolute top-4 right-4 px-4 py-2 rounded-xl bg-[#8FC1BB] text-[#4A3A33] font-extrabold text-xs shadow-lg"
                >
                  Cerrar
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </section>
  );
};
