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
        className={`fixed top-3 sm:top-4 inset-x-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto will-change-transform ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-24 opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`flex items-center justify-between gap-4 px-4 sm:px-6 py-3.5 sm:py-4 rounded-3xl sm:rounded-full transition-all duration-300 border border-[#E6D9C8] ${
            isScrolled
              ? "bg-[#F7F2EC] md:backdrop-blur-md md:bg-[#F7F2EC]/95 shadow-xl shadow-[#4A3A33]/8"
              : "bg-[#F7F2EC]/98 md:backdrop-blur-sm md:bg-[#F7F2EC]/90 shadow-lg shadow-[#4A3A33]/5"
          }`}
        >
          {/* Logo Brand - Slightly larger & crisp */}
          <a
            href="#inicio"
            onClick={(e) => handleLinkClick(e, "#inicio")}
            className="flex items-center gap-3 shrink-0 group"
          >
            <div className="relative h-11 sm:h-12 w-36 sm:w-44 flex items-center transition-transform duration-300 group-hover:scale-105">
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

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1.5 bg-[#E6D9C8]/60 p-1.5 rounded-full border border-[#E6D9C8]/80">
            {navLinks.map((link) =>
              link.isCalculator ? (
                <button
                  key={link.name}
                  onClick={onOpenCalculator}
                  className="px-4 py-2 text-xs lg:text-sm font-bold text-[#4A3A33] hover:text-[#8FC1BB] bg-[#EBCFC6] hover:bg-[#D7A7A8] rounded-full transition-all duration-200 shadow-sm"
                >
                  {link.name}
                </button>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="px-3.5 py-2 text-xs lg:text-sm font-bold text-[#4A3A33] hover:text-[#8FC1BB] rounded-full hover:bg-[#F7F2EC] transition-all duration-200"
                >
                  {link.name}
                </a>
              )
            )}
          </nav>

          {/* Medium Screens (md - lg) Navigation Links */}
          <nav className="hidden md:flex xl:hidden items-center space-x-1 bg-[#E6D9C8]/50 p-1 rounded-full border border-[#E6D9C8] backdrop-blur-md">
            {navLinks.slice(0, 5).map((link) =>
              link.isCalculator ? (
                <button
                  key={link.name}
                  onClick={onOpenCalculator}
                  className="px-2.5 py-1 text-xs font-bold text-[#4A3A33] hover:text-[#8FC1BB] bg-[#EBCFC6] rounded-full"
                >
                  {link.name}
                </button>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="px-2.5 py-1 text-xs font-semibold text-[#4A3A33] hover:text-[#8FC1BB] rounded-full hover:bg-[#F7F2EC]"
                >
                  {link.name}
                </a>
              )
            )}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://wa.me/573009876543"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-bold text-[#9A7B6C] hover:text-[#4A3A33] transition-colors"
            >
              <Phone className="w-4 h-4 text-[#8FC1BB]" />
              <span>Contacto Directo</span>
            </a>

            <button
              onClick={onOpenAppointment}
              className="relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-extrabold text-[#4A3A33] bg-[#8FC1BB] hover:bg-[#8FC1BB]/90 shadow-md shadow-[#8FC1BB]/30 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 border border-[#8FC1BB]"
            >
              <Calendar className="w-4 h-4 text-[#4A3A33]" />
              <span>Agendar Cita</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-[#E6D9C8] text-[#4A3A33] hover:bg-[#EBCFC6] transition-colors"
            aria-label="Abrir menú de navegación"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[72px] z-40 bg-[#F7F2EC]/98 backdrop-blur-xl border-b border-[#E6D9C8] p-6 md:hidden shadow-2xl"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) =>
                link.isCalculator ? (
                  <button
                    key={link.name}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (onOpenCalculator) onOpenCalculator();
                    }}
                    className="text-left px-4 py-3 rounded-xl text-base font-bold text-[#4A3A33] bg-[#EBCFC6]/60 hover:bg-[#EBCFC6] transition-colors flex items-center justify-between"
                  >
                    <span>{link.name}</span>
                    <span className="text-xs bg-[#8FC1BB] text-[#4A3A33] px-2 py-0.5 rounded-full font-black">Nuevo</span>
                  </button>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      handleLinkClick(e, link.href);
                    }}
                    className="px-4 py-3 rounded-xl text-base font-bold text-[#4A3A33] hover:bg-[#E6D9C8] hover:text-[#8FC1BB] transition-colors"
                  >
                    {link.name}
                  </a>
                )
              )}
              <div className="pt-4 border-t border-[#E6D9C8] flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenAppointment) onOpenAppointment();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-extrabold text-[#4A3A33] bg-[#8FC1BB] shadow-md"
                >
                  <Calendar className="w-4 h-4" />
                  Agendar Cita Médica
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
