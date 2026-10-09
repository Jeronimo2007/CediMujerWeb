"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, Calendar, Heart } from "lucide-react";

interface NavbarProps {
  onOpenAppointment?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAppointment }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > 80 && currentScrollY > lastScrollY && !mobileMenuOpen) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

  const navLinks = [
    { name: "Inicio", href: "#inicio" },
    { name: "Sobre CediMujer", href: "#nosotros" },
    { name: "Servicios", href: "#servicios" },
    { name: "Impacto", href: "#impacto" },
    { name: "Certificaciones", href: "#certificaciones" },
    { name: "Ubicación", href: "#ubicacion" },
    { name: "Contacto", href: "#contacto" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 transform ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        } ${
          isScrolled
            ? "bg-[#F7F2EC]/90 backdrop-blur-md py-3 shadow-md border-b border-[#E6D9C8]"
            : "bg-gradient-to-b from-[#F7F2EC] via-[#F7F2EC]/80 to-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Brand */}
          <a href="#inicio" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-[#8FC1BB] flex items-center justify-center shadow-md shadow-[#8FC1BB]/30 group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 text-[#4A3A33] fill-[#4A3A33]/20" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-[#4A3A33] flex items-center gap-1.5">
                Cedi<span className="text-[#8FC1BB]">Mujer</span>
                <span className="w-2 h-2 rounded-full bg-[#D7A7A8] animate-pulse"></span>
              </span>
              <span className="text-[10px] tracking-wider uppercase text-[#9A7B6C] font-semibold">
                Salud Integral Femenina
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-[#E6D9C8]/40 p-1.5 rounded-full border border-[#E6D9C8] backdrop-blur-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm font-semibold text-[#4A3A33] hover:text-[#8FC1BB] rounded-full hover:bg-[#F7F2EC] transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+573000000000"
              className="flex items-center gap-2 text-xs font-bold text-[#9A7B6C] hover:text-[#4A3A33] transition-colors"
            >
              <Phone className="w-4 h-4 text-[#8FC1BB]" />
              <span>Emergencias 24/7</span>
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
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-base font-bold text-[#4A3A33] hover:bg-[#E6D9C8] hover:text-[#8FC1BB] transition-colors"
                >
                  {link.name}
                </a>
              ))}
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
