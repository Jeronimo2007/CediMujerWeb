"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, Calendar } from "lucide-react";
import { ASSETS } from "@/config/assets";

interface NavbarProps {
  onOpenAppointment?: () => void;
  onOpenCalculator?: () => void;
  onNavigateHome?: (targetHash?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAppointment,
  onOpenCalculator,
  onNavigateHome,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const prevScrollY = lastScrollYRef.current;

          const scrolled = currentScrollY > 30;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));

          if (currentScrollY > 120 && currentScrollY - prevScrollY > 20 && !mobileMenuOpen) {
            setIsVisible(false);
          } else if (prevScrollY - currentScrollY > 10 || currentScrollY <= 80) {
            setIsVisible(true);
          }

          lastScrollYRef.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

  interface NavItem {
    name: string;
    href?: string;
    isCalculator?: boolean;
  }

  const navLinks: NavItem[] = [
    { name: "Inicio", href: "#inicio" },
    { name: "Sobre CediMujer", href: "#nosotros" },
    { name: "Servicios", href: "#servicios" },
    { name: "Instalaciones", href: "#instalaciones" },
    { name: "Calculadora", isCalculator: true },
    { name: "Impacto", href: "#impacto" },
    { name: "Certificaciones", href: "#certificaciones" },
    { name: "Ubicación", href: "#ubicacion" },
    { name: "Contacto", href: "#contacto" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href?: string) => {
    if (onNavigateHome) {
      e.preventDefault();
      onNavigateHome(href || "#inicio");
    }
  };

  return (
    <>
      <header
        className={`fixed top-2.5 sm:top-4 inset-x-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto will-change-transform ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-28 opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`flex items-center justify-between gap-2 sm:gap-3 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-2xl sm:rounded-full transition-all duration-300 border border-[#E6D9C8] backdrop-blur-md ${
            isScrolled
              ? "bg-[#F7F2EC]/95 shadow-xl shadow-[#4A3A33]/10"
              : "bg-[#F7F2EC]/95 shadow-lg shadow-[#4A3A33]/5"
          }`}
        >
          {/* Logo Brand */}
          <a
            href="#inicio"
            onClick={(e) => {
              setMobileMenuOpen(false);
              handleLinkClick(e, "#inicio");
            }}
            className="flex items-center gap-2 shrink-0 group"
          >
            <div className="relative h-9 w-32 sm:h-10 sm:w-36 xl:h-11 xl:w-40 flex items-center transition-transform duration-300 group-hover:scale-105">
              <Image
                src={ASSETS.logo.primary}
                alt="CediMujer - Salud Integral Femenina"
                fill
                priority
                decoding="async"
                unoptimized
                className="object-contain object-left"
              />
            </div>
          </a>

          {/* Desktop Navigation Links (xl and above) */}
          <nav className="hidden xl:flex items-center gap-0.5 bg-[#E6D9C8]/60 p-1 rounded-full border border-[#E6D9C8]/80">
            {navLinks.map((link) =>
              link.isCalculator ? (
                <button
                  key={link.name}
                  onClick={onOpenCalculator}
                  className="px-3 py-1.5 text-xs font-extrabold text-[#4A3A33] hover:text-[#4A3A33] bg-[#EBCFC6] hover:bg-[#D7A7A8] rounded-full transition-all duration-200 shadow-sm whitespace-nowrap"
                >
                  {link.name}
                </button>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="px-2.5 2xl:px-3 py-1.5 text-xs font-bold text-[#4A3A33] hover:text-[#8FC1BB] rounded-full hover:bg-[#F7F2EC] transition-all duration-200 whitespace-nowrap"
                >
                  {link.name}
                </a>
              )
            )}
          </nav>

          {/* Large Screens (lg - xl) Compact Navigation Links */}
          <nav className="hidden lg:flex xl:hidden items-center gap-0.5 bg-[#E6D9C8]/50 p-1 rounded-full border border-[#E6D9C8]">
            {navLinks.slice(0, 5).map((link) =>
              link.isCalculator ? (
                <button
                  key={link.name}
                  onClick={onOpenCalculator}
                  className="px-2.5 py-1.5 text-xs font-bold text-[#4A3A33] bg-[#EBCFC6] hover:bg-[#D7A7A8] rounded-full whitespace-nowrap transition-colors"
                >
                  {link.name}
                </button>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="px-2.5 py-1.5 text-xs font-semibold text-[#4A3A33] hover:text-[#8FC1BB] rounded-full hover:bg-[#F7F2EC] whitespace-nowrap transition-colors"
                >
                  {link.name}
                </a>
              )
            )}
          </nav>

          {/* Action Buttons & Mobile/Tablet Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <a
              href="https://wa.me/573009876543"
              target="_blank"
              rel="noopener noreferrer"
              title="Contacto Directo por WhatsApp"
              className="hidden 2xl:flex items-center gap-1.5 text-xs font-bold text-[#9A7B6C] hover:text-[#4A3A33] transition-colors whitespace-nowrap px-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#8FC1BB] shrink-0" />
              <span>Contacto Directo</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenAppointment) onOpenAppointment();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-full text-xs font-extrabold text-[#4A3A33] bg-[#8FC1BB] hover:bg-[#8FC1BB]/90 shadow-md shadow-[#8FC1BB]/25 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 border border-[#8FC1BB] whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#4A3A33] shrink-0" />
              <span className="hidden sm:inline">Agendar Cita</span>
              <span className="sm:hidden">Agendar</span>
            </button>

            {/* Menu Button for Mobile & Tablet (< xl) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl sm:rounded-full bg-[#E6D9C8] text-[#4A3A33] hover:bg-[#EBCFC6] transition-colors shrink-0"
              aria-label="Abrir menú de navegación"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile & Tablet Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop to close when tapping outside */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-[#4A3A33]/35 backdrop-blur-[2px] xl:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-x-3 sm:inset-x-6 top-[68px] sm:top-[76px] z-40 max-w-lg ml-auto bg-[#F7F2EC] border border-[#E6D9C8] rounded-3xl p-4 sm:p-6 xl:hidden shadow-2xl max-h-[calc(100dvh-84px)] overflow-y-auto"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {navLinks.map((link) =>
                  link.isCalculator ? (
                    <button
                      key={link.name}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        if (onOpenCalculator) onOpenCalculator();
                      }}
                      className="sm:col-span-2 text-left px-4 py-2.5 rounded-xl text-sm font-bold text-[#4A3A33] bg-[#EBCFC6]/70 hover:bg-[#EBCFC6] transition-colors flex items-center justify-between border border-[#D7A7A8]/50"
                    >
                      <span>Calculadora Gestacional</span>
                      <span className="text-[11px] bg-[#8FC1BB] text-[#4A3A33] px-2.5 py-0.5 rounded-full font-black">
                        Interactivo
                      </span>
                    </button>
                  ) : (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => {
                        setMobileMenuOpen(false);
                        handleLinkClick(e, link.href);
                      }}
                      className="px-4 py-2.5 rounded-xl text-sm font-bold text-[#4A3A33] hover:bg-[#E6D9C8]/70 transition-colors"
                    >
                      {link.name}
                    </a>
                  )
                )}
              </div>
              <div className="mt-3 pt-3 border-t border-[#E6D9C8] flex flex-col sm:flex-row gap-2.5">
                <a
                  href="https://wa.me/573009876543"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-extrabold text-[#4A3A33] bg-[#E6D9C8]/80 hover:bg-[#E6D9C8] border border-[#9A7B6C]/25 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#8FC1BB]" />
                  <span>WhatsApp Directo</span>
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenAppointment) onOpenAppointment();
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-extrabold text-[#4A3A33] bg-[#8FC1BB] hover:bg-[#8FC1BB]/90 shadow-md transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Agendar Cita Médica</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
