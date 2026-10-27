"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote, Heart, CheckCircle, MessageSquarePlus } from "lucide-react";
import { REAL_TESTIMONIALS } from "@/config/cedimujerContent";

export const Testimonials: React.FC = () => {
  const handleDepositTestimonial = () => {
    window.dispatchEvent(
      new CustomEvent("cedimujer:navigate", {
        detail: {
          href: "#atencion-cliente",
          subKey: "testimonio",
        },
      })
    );
    const el = document.querySelector("#atencion-cliente");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="testimonios"
      className="scroll-mt-20 py-20 sm:py-24 bg-[#E6D9C8]/30 text-[#4A3A33] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EBCFC6] border border-[#D7A7A8] text-[#4A3A33] text-xs font-bold uppercase tracking-widest mb-4"
            >
              <Heart className="w-4 h-4 text-[#D7A7A8] fill-[#D7A7A8]" />
              <span>Testimonios Reales de Pacientes y Mamás</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl font-extrabold text-[#4A3A33] tracking-tight"
            >
              Experiencias Reales en CediMujer
            </motion.h2>
          </div>

          <button
            type="button"
            onClick={handleDepositTestimonial}
            className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#4A3A33] hover:bg-[#4A3A33]/90 text-[#F7F2EC] text-xs sm:text-sm font-extrabold shadow-md transition-all"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#8FC1BB]" />
            <span>Depositar un testimonio</span>
          </button>
        </div>

        {/* All 8 Literal Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REAL_TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              className={`p-6 sm:p-7 rounded-3xl bg-[#F7F2EC] border border-[#E6D9C8] hover:border-[#8FC1BB] shadow-md hover:shadow-xl flex flex-col justify-between relative group transition-all duration-300 ${
                idx === 1 ? "md:col-span-2 lg:col-span-2" : ""
              }`}
            >
              <Quote className="absolute top-5 right-5 w-8 h-8 text-[#E6D9C8] group-hover:text-[#8FC1BB]/40 transition-colors pointer-events-none" />

              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-[#D7A7A8] fill-[#D7A7A8]"
                    />
                  ))}
                </div>

                <p className="text-[#4A3A33] text-xs sm:text-sm font-semibold leading-relaxed italic">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E6D9C8] flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-black text-[#4A3A33] flex items-center gap-1.5">
                    <span>{t.name}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-[#8FC1BB] shrink-0" />
                  </h4>
                  <p className="text-[11px] text-[#8FC1BB] font-bold mt-0.5">
                    {t.serviceTag}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
