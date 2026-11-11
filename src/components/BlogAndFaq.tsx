"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Clock,
  ArrowUpRight,
  ChevronDown,
  HelpCircle,
  CheckCircle2,
  Calendar,
  X,
} from "lucide-react";
import {
  BLOG_ARTICLES,
  FAQ_ITEMS,
  BlogArticle,
} from "@/config/cedimujerContent";

interface BlogAndFaqProps {
  onOpenAppointment?: (serviceName?: string) => void;
  isStandalonePage?: boolean;
}

export const BlogAndFaq: React.FC<BlogAndFaqProps> = ({
  onOpenAppointment,
  isStandalonePage = false,
}) => {
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(
    null
  );
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<"blog" | "faq">("blog");

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
          setActiveTab("blog");
          setSelectedArticle(found);
        }
      }
    };
    window.addEventListener("cedimujer:navigate", handleNav);
    return () => window.removeEventListener("cedimujer:navigate", handleNav);
  }, []);

  useEffect(() => {
    if (!selectedArticle) return;
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
    };
  }, [selectedArticle]);

  return (
    <section
      id="blog-faq"
      className={`scroll-mt-20 ${
        isStandalonePage ? "py-4 sm:py-8" : "py-10 sm:py-18"
      } text-[#4A3A33] relative overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-12">
        {/* Header & Unified Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-center sm:text-left">
          {!isStandalonePage && (
            <div>
              <span className="inline-block text-[10px] font-medium uppercase tracking-[0.22em] text-[#9A7B6C] mb-1.5">
                Educación Médica
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#4A3A33] tracking-tight">
                Guías y <span className="italic text-[#9A7B6C]">preguntas</span>
              </h2>
            </div>
          )}

          {/* Clean Pill Switcher for Both Mobile & Desktop (Less Clutter on Page) */}
          <div className="inline-flex self-center sm:self-auto p-1 rounded-full bg-[#F9EAEA] border border-[#F3D9D9] gap-1">
            <button
              type="button"
              onClick={() => setActiveTab("blog")}
              className={`py-2 px-4 sm:px-5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all ${
                activeTab === "blog"
                  ? "bg-[#4A3A33] text-[#FDF6F6]"
                  : "text-[#4A3A33]/80 hover:text-[#4A3A33]"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#D7A7A8]" />
              <span>Artículos ({BLOG_ARTICLES.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("faq")}
              className={`py-2 px-4 sm:px-5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all ${
                activeTab === "faq"
                  ? "bg-[#4A3A33] text-[#FDF6F6]"
                  : "text-[#4A3A33]/80 hover:text-[#4A3A33]"
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#D7A7A8]" />
              <span>Preguntas FAQ ({FAQ_ITEMS.length})</span>
            </button>
          </div>
        </div>

        {/* PARTE A: ARTÍCULOS (Mobile Horizontal Swipe + Desktop Grid, Minimal Text) */}
        {activeTab === "blog" && (
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 overflow-x-auto sm:overflow-visible snap-x no-scrollbar pb-2 sm:pb-0">
            {BLOG_ARTICLES.map((article, idx) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                onClick={() => setSelectedArticle(article)}
                className={`snap-start shrink-0 w-[76vw] max-w-[290px] sm:w-auto sm:max-w-none group cursor-pointer rounded-[1.75rem] bg-white/85 border border-[#F3D9D9] hover:border-[#D7A7A8] shadow-[0_10px_28px_-16px_rgba(154,123,108,0.1)] transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                  idx === 0 ? "lg:col-span-2" : ""
                }`}
              >
                <div>
                  <div className="relative h-40 sm:h-44 overflow-hidden bg-[#F9EAEA]">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#4A3A33]/45 via-transparent to-transparent" />

                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#FDF6F6]/95 text-[#4A3A33] text-[10px] font-medium uppercase tracking-wider">
                      {article.category}
                    </span>

                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#FDF6F6]/95 text-[#9A7B6C] text-[10px] font-normal flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5 text-[#D7A7A8]" />
                      {article.readTime}
                    </span>
                  </div>

                  <div className="p-4 sm:p-5">
                    <h3 className="font-serif text-lg sm:text-xl font-normal text-[#4A3A33] leading-snug group-hover:text-[#9A7B6C] transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                  </div>
                </div>

                <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-2 flex items-center justify-between border-t border-[#F3D9D9]/60">
                  <span className="text-xs font-medium text-[#9A7B6C] group-hover:text-[#4A3A33] transition-colors">
                    ( Leer guía )
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#D7A7A8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* PARTE B: PREGUNTAS FRECUENTES */}
        {activeTab === "faq" && (
          <div className="max-w-3xl mx-auto bg-white/80 rounded-[1.75rem] p-5 sm:p-8 border border-[#F3D9D9]">
            <div className="divide-y divide-[#F3D9D9]">
              {FAQ_ITEMS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="py-1">
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full py-3.5 sm:py-4 text-left flex items-center justify-between gap-4 group"
                    >
                      <span className="font-serif text-base sm:text-lg font-normal text-[#4A3A33] group-hover:text-[#9A7B6C] transition-colors leading-snug">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#D7A7A8] shrink-0 transition-transform duration-200 ${
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
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="pb-4 text-xs sm:text-sm text-[#4A3A33]/80 font-normal leading-relaxed pr-4">
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
        )}
      </div>

      {/* MODAL DE LECTURA DE ARTÍCULO DEL BLOG */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {selectedArticle && (
              <div
                onClick={() => setSelectedArticle(null)}
                className="fixed inset-0 z-[110] bg-[#4A3A33]/55 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 12 }}
                  transition={{ duration: 0.25 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-2xl max-h-[88dvh] overflow-y-auto bg-[#FDF6F6] border border-[#F3D9D9] rounded-[2rem] shadow-2xl overflow-hidden"
                >
                  <div className="relative h-44 sm:h-56 bg-[#4A3A33]">
                    <Image
                      src={selectedArticle.image}
                      alt={selectedArticle.title}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#4A3A33]/90 via-[#4A3A33]/35 to-transparent" />

                    <button
                      type="button"
                      onClick={() => setSelectedArticle(null)}
                      className="absolute top-4 right-4 p-2 rounded-full bg-[#FDF6F6]/90 text-[#4A3A33] hover:bg-white transition-colors shadow-sm"
                      aria-label="Cerrar artículo"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <div className="absolute bottom-4 left-5 right-5 sm:bottom-6 sm:left-7 sm:right-7">
                      <span className="inline-block text-[#F7D6D6] text-[10px] font-medium uppercase tracking-[0.18em] mb-1">
                        {selectedArticle.category} · {selectedArticle.readTime}
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#FDF6F6] leading-tight">
                        {selectedArticle.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-5 sm:p-8 space-y-5">
                    <p className="font-serif text-sm sm:text-base text-[#4A3A33] font-normal italic leading-relaxed border-l-2 border-[#D7A7A8] pl-3.5">
                      {selectedArticle.content.intro}
                    </p>

                    {selectedArticle.content.sections.map((sec, idx) => (
                      <div key={idx} className="space-y-2">
                        <h4 className="font-serif text-base sm:text-lg font-normal text-[#4A3A33]">
                          {sec.heading}
                        </h4>
                        <p className="text-xs sm:text-sm text-[#4A3A33]/80 font-normal leading-relaxed">
                          {sec.body}
                        </p>
                        {sec.bullets && (
                          <ul className="space-y-1.5 pt-1">
                            {sec.bullets.map((b, bIdx) => (
                              <li
                                key={bIdx}
                                className="flex items-start gap-2 text-xs text-[#4A3A33]/85 font-normal"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#D7A7A8] shrink-0 mt-0.5" />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}

                    <div className="pt-4 border-t border-[#F3D9D9] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          const srv = selectedArticle.relatedService;
                          setSelectedArticle(null);
                          if (onOpenAppointment) onOpenAppointment(srv);
                        }}
                        className="w-full py-3 rounded-full bg-[#4A3A33] hover:bg-[#4A3A33]/90 text-[#FDF6F6] font-medium text-xs inline-flex items-center justify-center gap-2"
                      >
                        <Calendar className="w-3.5 h-3.5 text-[#F7D6D6]" />
                        <span>( Agendar: {selectedArticle.relatedService} )</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
};
