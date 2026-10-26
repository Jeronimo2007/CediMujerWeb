"use client";

import React from "react";
import Image from "next/image";
import { Phone, Mail, MapPin, ArrowRight, MessageCircle } from "lucide-react";
import { ASSETS } from "@/config/assets";

interface FooterProps {
  onNavigateHome?: (targetHash?: string) => void;
  onOpenCalculator?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateHome, onOpenCalculator }) => {
  const [newsletterSubscribed, setNewsletterSubscribed] = React.useState(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (onNavigateHome) {
      e.preventDefault();
      onNavigateHome(href);
    }
  };

  return (
    <footer id="contacto" className="scroll-mt-20 bg-[#4A3A33] text-[#E6D9C8] border-t border-[#9A7B6C]/40 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#9A7B6C]/30">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href="#inicio"
              onClick={(e) => handleLinkClick(e, "#inicio")}
              className="flex items-center gap-3 group w-fit"
            >
              <div className="relative h-12 w-44 sm:w-52 flex items-center bg-[#F7F2EC] px-3 py-1.5 rounded-2xl shadow-md border border-[#8FC1BB]/30 transition-transform group-hover:scale-105">
                <Image
                  src={ASSETS.logo.primary}
                  alt="CediMujer - Salud Integral Femenina"
                  fill
                  unoptimized
                  className="object-contain p-1"
                />
              </div>
            </a>

            <p className="text-sm text-[#E6D9C8]/80 leading-relaxed max-w-sm">
              Centro médico especializado en la salud de la mujer. Diagnóstico por imágenes de alta precisión, control prenatal y consulta ginecológica avanzada con trato empático y humano.
            </p>

            <div className="pt-2 space-y-2">
              <span className="text-[11px] font-bold text-[#8FC1BB] uppercase tracking-wider block">
                Nuestras Redes Sociales
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href={ASSETS.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram CediMujer"
                  title="Instagram: @cedimujer_"
                  className="w-9 h-9 rounded-xl bg-[#9A7B6C]/30 border border-[#9A7B6C]/40 hover:border-[#dc2743] hover:bg-[#dc2743] text-[#F7F2EC] flex items-center justify-center transition-all duration-300 hover:scale-105"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                <a
                  href={ASSETS.socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok CediMujer"
                  title="TikTok: @cedimujer_"
                  className="w-9 h-9 rounded-xl bg-[#9A7B6C]/30 border border-[#9A7B6C]/40 hover:border-black hover:bg-black text-[#F7F2EC] flex items-center justify-center transition-all duration-300 hover:scale-105"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.4a6.33 6.33 0 0 0-.85-.05A6.34 6.34 0 0 0 3.1 15.7a6.34 6.34 0 0 0 10.83 4.48 6.27 6.27 0 0 0 1.86-4.51v-6.6a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.97-.5z"/>
                  </svg>
                </a>

                <a
                  href={ASSETS.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook CediMujer"
                  title="Facebook: CEDIMUJERSABANETA"
                  className="w-9 h-9 rounded-xl bg-[#9A7B6C]/30 border border-[#9A7B6C]/40 hover:border-[#1877F2] hover:bg-[#1877F2] text-[#F7F2EC] flex items-center justify-center transition-all duration-300 hover:scale-105"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                <a
                  href={ASSETS.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube CediMujer"
                  title="YouTube: @cedimujer"
                  className="w-9 h-9 rounded-xl bg-[#9A7B6C]/30 border border-[#9A7B6C]/40 hover:border-[#FF0000] hover:bg-[#FF0000] text-[#F7F2EC] flex items-center justify-center transition-all duration-300 hover:scale-105"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>

                <a
                  href={ASSETS.socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp CediMujer"
                  title="WhatsApp Directo"
                  className="w-9 h-9 rounded-xl bg-[#9A7B6C]/30 border border-[#9A7B6C]/40 hover:border-[#25D366] hover:bg-[#25D366] text-[#F7F2EC] flex items-center justify-center transition-all duration-300 hover:scale-105"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold text-[#F7F2EC] uppercase tracking-wider">Navegación</h4>
            <ul className="space-y-2.5 text-sm font-semibold">
              {[
                { label: "Inicio", href: "#inicio" },
                { label: "Sobre CediMujer", href: "#nosotros" },
                { label: "Misión y Valores", href: "#filosofia" },
                { label: "Servicios Médicos", href: "#servicios" },
                { label: "Instalaciones", href: "#instalaciones" },
                { label: "Nuestras Cifras", href: "#impacto" },
                { label: "Acreditaciones", href: "#certificaciones" },
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className="hover:text-[#8FC1BB] transition-colors"
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
                    className="text-left hover:text-[#8FC1BB] transition-colors text-[#8FC1BB] font-bold"
                  >
                    Calculadora Gestacional →
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold text-[#F7F2EC] uppercase tracking-wider">Contacto & Citas</h4>
            <ul className="space-y-3 text-sm font-semibold">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#8FC1BB] shrink-0 mt-0.5" />
                <span>Cl. 75 Sur #43 A -202, C.C. Aves María Parque Comercial, Sabaneta, Antioquia</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#8FC1BB] shrink-0" />
                <span>+57 (604) 448-0202 / +57 300 987 6543</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#8FC1BB] shrink-0" />
                <span>contacto@cedimujer.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold text-[#F7F2EC] uppercase tracking-wider">Boletín Médico</h4>
            <p className="text-xs text-[#E6D9C8]/80 font-medium">
              Recibe artículos sobre salud preventiva femenina y jornadas de salud.
            </p>
            {newsletterSubscribed ? (
              <p className="text-xs font-bold text-[#8FC1BB] bg-[#9A7B6C]/20 border border-[#8FC1BB]/40 rounded-xl px-3.5 py-2.5">
                ✓ ¡Gracias por suscribirte al boletín de CediMujer!
              </p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setNewsletterSubscribed(true);
                }}
                className="space-y-2"
              >
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Tu correo electrónico"
                    className="w-full pl-4 pr-11 py-2.5 rounded-xl bg-[#F7F2EC] border border-[#E6D9C8] text-[#4A3A33] placeholder-[#9A7B6C] focus:outline-none focus:border-[#8FC1BB] text-xs font-semibold"
                  />
                  <button
                    type="submit"
                    aria-label="Suscribirse al boletín"
                    className="absolute right-1.5 top-1.5 p-1.5 rounded-lg bg-[#8FC1BB] text-[#4A3A33] hover:bg-[#8FC1BB]/90 transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Disclaimer and Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#E6D9C8]/70 gap-4 font-semibold text-center md:text-left">
          <p>© {new Date().getFullYear()} CediMujer - Centro de Diagnóstico y Salud Integral de la Mujer. Todos los derechos reservados.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <a href="#nosotros" onClick={(e) => handleLinkClick(e, "#nosotros")} className="hover:text-[#F7F2EC] transition-colors">Nuestra Institución</a>
            <a href="#certificaciones" onClick={(e) => handleLinkClick(e, "#certificaciones")} className="hover:text-[#F7F2EC] transition-colors">Calidad Certificada</a>
            <a href="#ubicacion" onClick={(e) => handleLinkClick(e, "#ubicacion")} className="hover:text-[#F7F2EC] transition-colors">Sede Sabaneta</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
