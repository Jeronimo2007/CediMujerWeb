"use client";

import React, { useState, useEffect } from "react";
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
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Smooth tolerance: only hide after scrolling down more than 15px past initial threshold
      if (currentScrollY > 100 && currentScrollY - lastScrollY > 15 && !mobileMenuOpen) {
        setIsVisible(false);
      } else if (lastScrollY - currentScrollY > 5 || currentScrollY <= 100) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        } ${
          isScrolled
            ? "bg-[#F7F2EC]/95 backdrop-blur-md py-2.5 shadow-lg shadow-[#4A3A33]/5 border-b border-[#E6D9C8]/80"
            : "bg-gradient-to-b from-[#F7F2EC]/90 via-[#F7F2EC]/60 to-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo Brand */}
          <a
            href="#inicio"
            onClick={(e) => handleLinkClick(e, "#inicio")}
            className="flex items-center gap-3 shrink-0 group"
          >
            <div className="relative h-10 sm:h-11 w-32 sm:w-40 flex items-center transition-transform duration-300 group-hover:scale-105">
              <Image
                src={ASSETS.logo.primary}
                alt="CediMujer - Salud Integral Femenina"
                fill
                priority
                unoptimized
                className="object-contain object-left"
              />
            </div>
          </a>

          {/* Desktop Navigation Links - Centered & perfectly proportioned */}
          <nav className="hidden xl:flex items-center space-x-1 bg-[#E6D9C8]/50 p-1.5 rounded-full border border-[#E6D9C8] backdrop-blur-md shadow-xs">
            {navLinks.map((link) =>
              link.isCalculator ? (
                <button
                  key={link.name}
                  onClick={onOpenCalculator}
                  className="px-3 py-1.5 text-xs font-bold text-[#4A3A33] hover:text-[#8FC1BB] bg-[#EBCFC6] hover:bg-[#D7A7A8] rounded-full transition-all duration-300 border border-[#D7A7A8]/50 shadow-xs"
                >
                  {link.name}
                </button>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="px-3 py-1.5 text-xs font-bold text-[#4A3A33] hover:text-[#8FC1BB] rounded-full hover:bg-[#F7F2EC] transition-all duration-300"
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
