"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, CheckCircle, MailOpen, Mail } from "lucide-react";
import { REAL_TESTIMONIALS, CONTACT_INFO } from "@/config/cedimujerContent";
import { ASSETS } from "@/config/assets";

export const Testimonials: React.FC = () => {
  const [openEnvelopeId, setOpenEnvelopeId] = useState<number>(
    REAL_TESTIMONIALS[0]?.id ?? 1
  );

  return (
    <section
      id="testimonios"
      className="scroll-mt-20 py-10 sm:py-16 text-[#4A3A33] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Minimalist Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12 text-center sm:text-left">
          <div>
            <span className="inline-block text-[10px] font-medium uppercase tracking-[0.22em] text-[#9A7B6C] mb-1.5">
              Historias de Pacientes · Toca un sobre para abrir
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#4A3A33] tracking-tight">
              Voces en <span className="italic text-[#D7A7A8]">CediMujer</span>
            </h2>
          </div>

          <a
            href={CONTACT_INFO.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="self-center sm:self-auto px-4 py-2 rounded-full bg-[#EBCFC6]/60 hover:bg-[#4A3A33] text-[#4A3A33] hover:text-[#F7F6F4] border border-[#D7A7A8]/60 text-xs font-medium transition-all inline-flex items-center gap-1.5"
          >
            ( Dejar mi historia )
          </a>
        </div>

        {/* Interactive Envelopes ("Abrir sobre con el nombre de la paciente y que empiece su historia" - Línea Gráfica CediMujer) */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-5 gap-4 overflow-x-auto md:overflow-visible snap-x no-scrollbar pb-2 md:pb-0">
          {REAL_TESTIMONIALS.map((t, idx) => {
            const isOpen = openEnvelopeId === t.id;
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                onClick={() => setOpenEnvelopeId(t.id)}
                className={`snap-start shrink-0 w-[82vw] max-w-[300px] md:w-auto md:max-w-none cursor-pointer rounded-[1.75rem] transition-all duration-300 relative overflow-hidden border ${
                  isOpen
                    ? "bg-[#F7F6F4] border-[#D7A7A8] shadow-[0_16px_38px_-18px_rgba(74,58,51,0.12)]"
                    : "bg-[#EBCFC6]/55 hover:bg-[#EBCFC6]/80 border-[#D7A7A8]/45"
                }`}
              >
                {/* Decorative Top Envelope Flap */}
                <div
                  className={`px-5 pt-4 pb-3 border-b transition-colors flex items-center justify-between gap-2 ${
                    isOpen
                      ? "bg-[#EBCFC6]/45 border-[#D7A7A8]/50"
                      : "bg-[#EBCFC6]/75 border-[#D7A7A8]/40"
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-[#F7F6F4] border border-[#D7A7A8]/60 flex items-center justify-center shrink-0">
                      <Image
                        src={ASSETS.logo.emblem}
                        alt=""
                        width={16}
                        height={16}
                        className="w-4 h-4 object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-serif text-sm font-normal text-[#4A3A33] truncate flex items-center gap-1">
                        <span className="truncate">{t.name}</span>
                        <CheckCircle className="w-3 h-3 text-[#D7A7A8] shrink-0" />
                      </h4>
                      <p className="text-[10px] text-[#9A7B6C] truncate">
                        {t.serviceTag}
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 w-6 h-6 rounded-full bg-[#F7F6F4]/80 flex items-center justify-center text-[#9A7B6C]">
                    {isOpen ? (
                      <MailOpen className="w-3.5 h-3.5 text-[#D7A7A8]" />
                    ) : (
                      <Mail className="w-3.5 h-3.5 text-[#9A7B6C]" />
                    )}
                  </span>
                </div>

                {/* Letter Body Inside Envelope */}
                <div className="p-5 flex flex-col justify-between min-h-[155px]">
                  <AnimatePresence mode="wait">
                    {isOpen ? (
                      <motion.div
                        key="open"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.22 }}
                        className="space-y-2.5"
                      >
                        <div className="flex items-center gap-0.5">
                          {[...Array(t.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3 h-3 text-[#D7A7A8] fill-[#D7A7A8]"
                            />
                          ))}
                        </div>
                        <p className="font-serif italic text-xs sm:text-[13px] text-[#4A3A33]/90 leading-relaxed line-clamp-5">
                          &ldquo;{t.comment}&rdquo;
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="closed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="my-auto py-4 text-center space-y-2"
                      >
                        <p className="font-serif italic text-sm text-[#4A3A33]">
                          Carta de {t.name.split(" ")[0]}
                        </p>
                        <span className="inline-block text-[10px] font-medium uppercase tracking-[0.18em] text-[#9A7B6C] border-b border-[#9A7B6C]/40 pb-0.5">
                          ( Abrir sobre )
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
