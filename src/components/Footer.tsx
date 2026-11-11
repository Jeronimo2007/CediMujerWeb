"use client";

import React from "react";
import Image from "next/image";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { ASSETS } from "@/config/assets";
import { CONTACT_INFO } from "@/config/cedimujerContent";
import type { AppSectionView } from "@/components/SectionPageView";

interface FooterProps {
  onNavigateHome?: (targetHash?: string) => void;
  onOpenCalculator?: () => void;
  onSelectSection?: (
    view: AppSectionView,
    subKey?: string,
    itemId?: string
  ) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateHome,
  onOpenCalculator,
  onSelectSection,
}) => {
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    subKey?: string
  ) => {
    e.preventDefault();
    if (onSelectSection) {
      if (href === "#embarazo") {
        onSelectSection("embarazo", subKey);
        return;
      }
      if (href === "#ginecologia") {
        onSelectSection("ginecologia", subKey);
        return;
      }
      if (href === "#telemedicina") {
        onSelectSection("telemedicina", subKey);
        return;
      }
      if (href === "#nosotros") {
        onSelectSection("quienes-somos", subKey);
        return;
      }
      if (href === "#blog-faq") {
        onSelectSection("blog", subKey);
        return;
      }
      if (href === "#atencion-cliente" || href === "#ubicacion") {
        onSelectSection("contacto", subKey);
        return;
      }
    }
    if (onNavigateHome) {
      onNavigateHome(href);
    }
  };

  return (
    <footer
      id="contacto"
      className="scroll-mt-20 bg-[#F9EAEA] text-[#4A3A33] border-t border-[#F3D9D9] pt-12 pb-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-[#F3D9D9]">
          {/* Brand Logo (Untouched) */}
          <div className="space-y-3">
            <a
              href="#inicio"
              onClick={(e) => handleLinkClick(e, "#inicio")}
              className="flex items-center w-fit"
            >
              <div className="relative h-10 w-36 sm:w-44">
                <Image
                  src={ASSETS.logo.primary}
                  alt="CediMujer"
                  fill
                  unoptimized
                  className="object-contain object-left"
                />
              </div>
            </a>

            <p className="text-xs text-[#4A3A33]/75 font-normal leading-relaxed max-w-xs">
              Te acompañamos en cada etapa de la vida. C.C. Aves María · Local 341-342, Sabaneta.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <a
                href={ASSETS.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram CediMujer"
                className="w-8 h-8 rounded-full bg-white/85 border border-[#F3D9D9] hover:border-[#4A3A33] text-[#4A3A33] flex items-center justify-center transition-all"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={ASSETS.socialLinks.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok CediMujer"
                className="w-8 h-8 rounded-full bg-white/85 border border-[#F3D9D9] hover:border-[#4A3A33] text-[#4A3A33] flex items-center justify-center transition-all"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.4a6.33 6.33 0 0 0-.85-.05A6.34 6.34 0 0 0 3.1 15.7a6.34 6.34 0 0 0 10.83 4.48 6.27 6.27 0 0 0 1.86-4.51v-6.6a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.97-.5z" />
                </svg>
              </a>
              <a
                href={ASSETS.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook CediMujer"
                className="w-8 h-8 rounded-full bg-white/85 border border-[#F3D9D9] hover:border-[#4A3A33] text-[#4A3A33] flex items-center justify-center transition-all"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={ASSETS.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube CediMujer"
                className="w-8 h-8 rounded-full bg-white/85 border border-[#F3D9D9] hover:border-[#4A3A33] text-[#4A3A33] flex items-center justify-center transition-all"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href={CONTACT_INFO.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Reseñas en Google CediMujer"
                title="Reseñas en Google"
                className="w-8 h-8 rounded-full bg-white/85 border border-[#F3D9D9] hover:border-[#4A3A33] text-[#4A3A33] flex items-center justify-center transition-all"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                </svg>
              </a>
              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp CediMujer"
                className="w-8 h-8 rounded-full bg-white/85 border border-[#F3D9D9] hover:border-[#4A3A33] text-[#4A3A33] flex items-center justify-center transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Secciones */}
          <div className="space-y-2.5">
            <h4 className="font-serif text-sm font-normal text-[#4A3A33]">
              Especialidades
            </h4>
            <ul className="space-y-1.5 text-xs text-[#4A3A33]/80">
              {[
                { label: "Embarazo y Ecografías", href: "#embarazo" },
                { label: "Ginecología Integral", href: "#ginecologia" },
                { label: "Tamizajes Preventivos", href: "#ginecologia", subKey: "ginecologia-tamizajes" },
                { label: "Telemedicina", href: "#telemedicina" },
                { label: "Especialistas", href: "#nosotros", subKey: "especialistas" },
                { label: "Guías y FAQ", href: "#blog-faq" },
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href, item.subKey)}
                    className="hover:text-[#4A3A33] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              {onOpenCalculator && (
                <li>
                  <button
                    type="button"
                    onClick={onOpenCalculator}
                    className="text-left text-[#9A7B6C] hover:text-[#4A3A33] font-medium"
                  >
                    Calculadora Gestacional →
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Contacto */}
          <div className="space-y-2.5">
            <h4 className="font-serif text-sm font-normal text-[#4A3A33]">
              Contacto Directo
            </h4>
            <ul className="space-y-2 text-xs text-[#4A3A33]/80">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D7A7A8] shrink-0 mt-0.5" />
                <span>{CONTACT_INFO.addressShort} · Sabaneta</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D7A7A8] shrink-0" />
                <a
                  href={CONTACT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#4A3A33] font-medium text-[#4A3A33]"
                >
                  WhatsApp: {CONTACT_INFO.whatsappDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D7A7A8] shrink-0" />
                <a
                  href={CONTACT_INFO.pbxTel}
                  className="hover:text-[#4A3A33] font-medium text-[#4A3A33]"
                >
                  PBX: {CONTACT_INFO.pbxDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D7A7A8] shrink-0" />
                <span>{CONTACT_INFO.email}</span>
              </li>
            </ul>
          </div>

          {/* Atención al Usuario */}
          <div className="space-y-2.5">
            <h4 className="font-serif text-sm font-normal text-[#4A3A33]">
              Atención al Usuario
            </h4>
            <ul className="space-y-1.5 text-xs text-[#4A3A33]/80">
              {CONTACT_INFO.contactFormOptions.map((opt) => (
                <li key={opt.id}>
                  <a
                    href="#atencion-cliente"
                    onClick={(e) =>
                      handleLinkClick(e, "#atencion-cliente", opt.id)
                    }
                    className="hover:text-[#4A3A33] transition-colors"
                  >
                    · {opt.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#9A7B6C] gap-2 text-center sm:text-left">
          <p>© {new Date().getFullYear()} CediMujer · Sabaneta, Antioquia.</p>
          <p>Calle 75 sur No. 43 A -202 · C.C. Aves María Local 341-342</p>
        </div>
      </div>
    </footer>
  );
};
