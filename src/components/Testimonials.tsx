"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, CheckCircle } from "lucide-react";
import { REAL_TESTIMONIALS, CONTACT_INFO } from "@/config/cedimujerContent";
import { ASSETS } from "@/config/assets";

declare global {
  interface Window {
    instgrm?: {
      Embeds?: {
        process: () => void;
      };
    };
  }
}

const INSTAGRAM_REEL_EMBEDS = [
  {
    id: "DdtjUpLxQdQ",
    permalink:
      "https://www.instagram.com/reel/DdtjUpLxQdQ/?utm_source=ig_embed&utm_campaign=loading",
    title: "Testimonio en Video · Experiencia 1",
  },
  {
    id: "DdMNHsnRkpz",
    permalink:
      "https://www.instagram.com/reel/DdMNHsnRkpz/?utm_source=ig_embed&utm_campaign=loading",
    title: "Testimonio en Video · Experiencia 2",
  },
  {
    id: "DcgXS8NxaRa",
    permalink:
      "https://www.instagram.com/reel/DcgXS8NxaRa/?utm_source=ig_embed&utm_campaign=loading",
    title: "Testimonio en Video · Experiencia 3",
  },
];

export const Testimonials: React.FC = () => {
  useEffect(() => {
    const scriptId = "instagram-embed-script";
    const existingScript = document.getElementById(scriptId);

    if (!existingScript) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      script.onload = () => {
        window.instgrm?.Embeds?.process();
      };
      document.body.appendChild(script);
    } else {
      window.instgrm?.Embeds?.process();
    }

    const timer = setTimeout(() => {
      window.instgrm?.Embeds?.process();
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="testimonios"
      className="scroll-mt-20 py-10 sm:py-16 text-[#4A3A33] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Minimalist Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-center sm:text-left">
          <div>
            <span className="inline-block text-[10px] font-medium uppercase tracking-[0.22em] text-[#9A7B6C] mb-1.5">
              Historias Reales en Video y Escritas
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#4A3A33] tracking-tight">
              Experiencias en{" "}
              <span className="italic text-[#D7A7A8]">CediMujer</span>
            </h2>
          </div>

          <a
            href={CONTACT_INFO.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="self-center sm:self-auto px-5 py-2.5 rounded-full bg-[#EBCFC6]/65 hover:bg-[#4A3A33] text-[#4A3A33] hover:text-[#F7F6F4] border border-[#D7A7A8]/60 text-xs font-medium transition-all inline-flex items-center gap-1.5"
          >
            ( Dejar reseña en Google )
          </a>
        </div>

        {/* 1. Video Testimonials (3 Instagram Reels) - Sin recuadro, alineados y uno arriba del otro en celular */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start justify-items-center">
          {INSTAGRAM_REEL_EMBEDS.map((reel) => (
            <div
              key={reel.id}
              className="w-full max-w-[360px] flex justify-center"
            >
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={reel.permalink}
                data-instgrm-version="14"
                style={{
                  background: "transparent",
                  border: 0,
                  borderRadius: "0px",
                  boxShadow: "none",
                  margin: "0 auto",
                  maxWidth: "360px",
                  minWidth: "280px",
                  padding: 0,
                  width: "100%",
                }}
              >
                <div style={{ padding: "16px" }}>
                  <a
                    href={reel.permalink}
                    style={{
                      background: "transparent",
                      lineHeight: 0,
                      padding: "0 0",
                      textAlign: "center",
                      textDecoration: "none",
                      width: "100%",
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div
                      style={{
                        paddingTop: "8px",
                        color: "#4A3A33",
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: "13px",
                        fontWeight: 500,
                        lineHeight: "18px",
                      }}
                    >
                      Ver video testimonio en Instagram (@cedimujer_)
                    </div>
                  </a>
                </div>
              </blockquote>
            </div>
          ))}
        </div>

        {/* 2. Testimonios Escritos - Alineados, sin recuadro pesado y uno arriba del otro en celular */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-4 border-t border-[#D7A7A8]/35 items-start">
          {REAL_TESTIMONIALS.slice(0, 4).map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.04 }}
              className="flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2.5">
                <div className="flex items-center gap-0.5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 text-[#D7A7A8] fill-[#D7A7A8]"
                    />
                  ))}
                </div>
                <p className="font-serif italic text-sm text-[#4A3A33]/90 leading-relaxed">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Image
                  src={ASSETS.logo.emblem}
                  alt=""
                  width={18}
                  height={18}
                  className="w-4 h-4 object-contain shrink-0 opacity-85"
                />
                <div className="min-w-0">
                  <h4 className="font-serif text-sm font-normal text-[#4A3A33] truncate flex items-center gap-1">
                    <span className="truncate">{t.name}</span>
                    <CheckCircle className="w-3 h-3 text-[#D7A7A8] shrink-0" />
                  </h4>
                  <p className="text-[11px] text-[#9A7B6C] truncate">
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
