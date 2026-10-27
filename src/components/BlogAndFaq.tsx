"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Clock,
  ChevronRight,
  ChevronDown,
  HelpCircle,
  CheckCircle2,
  Calendar,
  X,
  Sparkles,
} from "lucide-react";
import {
  BLOG_ARTICLES,
  FAQ_ITEMS,
  BlogArticle,
} from "@/config/cedimujerContent";

interface BlogAndFaqProps {
  onOpenAppointment?: (serviceName?: string) => void;
}

export const BlogAndFaq: React.FC<BlogAndFaqProps> = ({ onOpenAppointment }) => {
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    const handleNav = (e: Event) => {
      const customEvent = e as CustomEvent<{
        href?: string;
        itemId?: string;
      }>;
      const { itemId } = customEvent.detail || {};
      if (itemId && itemId.startsWith("blog-")) {
        const found = BLOG_ARTICLES.find((a) => a.id === itemId);
        if (found) {
          setSelectedArticle(found);
        }
      }
    };
    window.addEventListener("cedimujer:navigate", handleNav);
    return () => window.removeEventListener("cedimujer:navigate", handleNav);
  }, []);

  return (
    <section
      id="blog-faq"
      className="scroll-mt-20 py-16 sm:py-24 bg-[#F7F2EC] text-[#4A3A33] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        {/* =================================================================
            PARTE A: ARTÍCULOS INFORMATIVOS Y BLOG MÉDICO DE CEDIMUJER
        ================================================================= */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#CFE6E2] border border-[#8FC1BB] text-[#4A3A33] text-xs font-black uppercase tracking-wider mb-3">
              <BookOpen className="w-4 h-4 text-[#4A3A33]" />
              <span>Educación para la Paciente · Blog CediMujer</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#4A3A33] tracking-tight">
              Información Médica, Blog y Preguntas Frecuentes
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#9A7B6C] font-semibold leading-relaxed">
              Guías educativas elaboradas por los especialistas de CediMujer para acompañarte, resolver tus dudas y promover el cuidado preventivo de tu salud.
            </p>
          </div>

          {/* 7 Official Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {BLOG_ARTICLES.map((article, idx) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.06 }}
                className={`group rounded-3xl bg-white border-2 border-[#E6D9C8] hover:border-[#8FC1BB] shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                  idx === 0 ? "md:col-span-2 lg:col-span-2" : ""
                }`}
              >
                <div>
                  <div className="relative h-52 sm:h-56 overflow-hidden bg-[#4A3A33]">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#4A3A33]/85 via-[#4A3A33]/25 to-transparent" />

                    <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-[#F7F2EC]/95 text-[#4A3A33] text-[11px] font-black border border-[#E6D9C8]">
                      {article.category}
                    </span>

                    <span className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-[#4A3A33]/90 text-[#F7F2EC] text-[10px] font-bold flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#8FC1BB]" />
                      {article.readTime}
                    </span>

                    <div className="absolute bottom-3.5 left-4 right-4">
                      <h3 className="text-lg sm:text-xl font-black text-[#F7F2EC] leading-snug group-hover:text-[#CFE6E2] transition-colors">
                        {article.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <p className="text-xs sm:text-sm text-[#4A3A33] font-semibold leading-relaxed">
                      {article.excerpt}
                    </p>
                    <p className="text-xs text-[#9A7B6C] font-medium leading-relaxed line-clamp-3">
                      {article.content.intro}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 flex items-center justify-between gap-3 border-t border-[#E6D9C8]/60">
                  <button
                    type="button"
                    onClick={() => setSelectedArticle(article)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#E6D9C8]/60 hover:bg-[#8FC1BB] text-[#4A3A33] font-extrabold text-xs transition-all flex items-center justify-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Leer Artículo Completo</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* =================================================================
            PARTE B: PREGUNTAS FRECUENTES (FAQ)
        ================================================================= */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBCFC6] border border-[#D7A7A8] text-[#4A3A33] text-xs font-black uppercase tracking-wider mb-2">
              <HelpCircle className="w-4 h-4 text-[#4A3A33]" />
              <span>Preguntas Frecuentes</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-[#4A3A33]">
              Resolvemos Tus Dudas Antes de la Cita
            </h3>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border-2 border-[#E6D9C8] overflow-hidden shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-[#E6D9C8]/25 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-extrabold text-[#4A3A33]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#8FC1BB] shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="px-6 pb-5 pt-1 border-t border-[#E6D9C8]/50 bg-[#F7F2EC]/60"
                      >
                        <p className="text-xs sm:text-sm text-[#4A3A33]/90 font-semibold leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* =====================================================================
          MODAL DE LECTURA DE ARTÍCULO DEL BLOG
      ===================================================================== */}
      <AnimatePresence>
        {selectedArticle && (
          <div
            onClick={() => setSelectedArticle(null)}
            className="fixed inset-0 z-50 bg-[#4A3A33]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[90dvh] overflow-y-auto bg-[#F7F2EC] border-2 border-[#E6D9C8] rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="relative h-56 sm:h-64 bg-[#4A3A33]">
                <Image
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A3A33] via-[#4A3A33]/40 to-transparent" />

                <button
                  type="button"
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-[#F7F2EC] text-[#4A3A33] hover:bg-[#EBCFC6] transition-colors shadow-lg"
                  aria-label="Cerrar artículo"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-5 left-6 right-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#8FC1BB] text-[#4A3A33] text-xs font-black uppercase tracking-wider mb-2">
                    {selectedArticle.category} • {selectedArticle.readTime}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#F7F2EC]">
                    {selectedArticle.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <p className="text-sm sm:text-base text-[#4A3A33] font-bold leading-relaxed bg-white p-5 rounded-2xl border border-[#E6D9C8]">
                  {selectedArticle.content.intro}
                </p>

                {selectedArticle.content.sections.map((sec, idx) => (
                  <div key={idx} className="space-y-3">
                    <h4 className="text-base sm:text-lg font-black text-[#4A3A33] flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#8FC1BB]" />
                      <span>{sec.heading}</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-[#4A3A33]/90 font-semibold leading-relaxed">
                      {sec.body}
                    </p>
                    {sec.bullets && (
                      <ul className="space-y-2 bg-white p-4 rounded-2xl border border-[#E6D9C8]">
                        {sec.bullets.map((b, bIdx) => (
                          <li
                            key={bIdx}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4A3A33] font-semibold"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#8FC1BB] shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}

                <div className="p-5 rounded-2xl bg-[#CFE6E2]/45 border border-[#8FC1BB]/50 space-y-3">
                  <p className="text-xs sm:text-sm font-bold text-[#4A3A33]">
                    {selectedArticle.content.conclusion}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      const srv = selectedArticle.relatedService;
                      setSelectedArticle(null);
                      if (onOpenAppointment) onOpenAppointment(srv);
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#4A3A33] hover:bg-[#4A3A33]/90 text-[#F7F2EC] font-extrabold text-xs inline-flex items-center justify-center gap-2 shadow-md"
                  >
                    <Calendar className="w-4 h-4 text-[#8FC1BB]" />
                    <span>Agendar: {selectedArticle.relatedService}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
