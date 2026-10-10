"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote, Heart, CheckCircle } from "lucide-react";

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Dra. Valeria Mendoza",
      treatment: "Control Prenatal & Ecografía 4D",
      comment:
        "La atención en CediMujer durante todo mi embarazo fue maravillosa. Ver la carita de mi bebé en ecografía 4D HD con tanta nitidez y el trato tan empático de las médicas me dio total tranquilidad.",
      rating: 5,
    },
    {
      name: "Camila Rivas",
      treatment: "Ginecología Integral & Salud Hormonal",
      comment:
        "Llevaba tiempo buscando un equipo de ginecólogas que realmente escucharan y explicaran cada detalle. En CediMujer encontré profesionalismo, puntualidad y la tecnología más moderna.",
      rating: 5,
    },
    {
      name: "Lucía Fernández",
      treatment: "Cirugía Mínimamente Invasiva",
      comment:
        "Me realizaron una laparoscopia ginecológica y la recuperación fue sorprendentemente rápida y sin dolor innecesario. Eternamente agradecida con todo el equipo médico.",
      rating: 5,
    },
  ];

  return (
    <section className="py-24 bg-[#E6D9C8]/30 text-[#4A3A33] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EBCFC6] border border-[#D7A7A8] text-[#4A3A33] text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Heart className="w-4 h-4 text-[#D7A7A8] fill-[#D7A7A8]" />
            <span>Testimonios Reales</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-[#4A3A33] tracking-tight"
          >
            Historias de Salud y Tranquilidad
          </motion.h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-[#F7F2EC] border border-[#E6D9C8] hover:border-[#8FC1BB] shadow-md hover:shadow-xl flex flex-col justify-between relative group transition-all duration-300"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-[#E6D9C8] group-hover:text-[#8FC1BB]/40 transition-colors pointer-events-none" />

              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#D7A7A8] fill-[#D7A7A8]" />
                  ))}
                </div>

                <p className="text-[#4A3A33] text-sm font-semibold leading-relaxed italic">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[#E6D9C8] flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-[#4A3A33] flex items-center gap-2">
                    {t.name}
                    <CheckCircle className="w-4 h-4 text-[#8FC1BB]" />
                  </h4>
                  <p className="text-xs text-[#8FC1BB] font-bold">{t.treatment}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
