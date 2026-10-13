"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { CertificationsMarquee } from "@/components/CertificationsMarquee";
import { Services } from "@/components/Services";
import { ImpactStats } from "@/components/ImpactStats";
import { Testimonials } from "@/components/Testimonials";
import { FacilitiesGallery } from "@/components/FacilitiesGallery";
import { LocationMap } from "@/components/LocationMap";
import { Footer } from "@/components/Footer";
import { AppointmentModal } from "@/components/AppointmentModal";
import { ZoomSquarePortal } from "@/components/ZoomSquarePortal";
import { SquareTransitionPortal } from "@/components/SquareTransitionPortal";
import { GestationalCalculator } from "@/components/GestationalCalculator";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("Ginecología Integral");
  const [currentView, setCurrentView] = useState<"home" | "calculator">("home");

  const handleOpenAppointment = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    setIsModalOpen(true);
  };

  const handleOpenCalculator = () => {
    // Scroll smoothly to top and transition seamless view
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentView("calculator");
  };

  const handleNavigateHome = (targetHash?: string) => {
    setCurrentView("home");
    setTimeout(() => {
      if (targetHash && targetHash !== "#inicio") {
        const el = document.querySelector(targetHash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 80);
  };

  return (
    <main className="min-h-screen bg-[#F7F2EC] text-[#4A3A33] overflow-x-clip">
      {/* Header Navbar with hide-on-scroll-down */}
      <Navbar
        onOpenAppointment={() => handleOpenAppointment()}
        onOpenCalculator={handleOpenCalculator}
        onNavigateHome={handleNavigateHome}
      />

      <AnimatePresence mode="wait">
        {currentView === "calculator" ? (
          <motion.div
            key="calculator-view"
            initial={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="pt-24 min-h-screen"
          >
            <GestationalCalculator
              onOpenAppointment={(srv) => handleOpenAppointment(srv)}
              onBackToHome={() => handleNavigateHome("#inicio")}
            />
          </motion.div>
        ) : (
          <motion.div
            key="home-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Hero Section with Walk-In Immersion Effect */}
            <Hero
              onOpenAppointment={() => handleOpenAppointment()}
              onOpenCalculator={handleOpenCalculator}
            />

            <motion.div
              initial={{ opacity: 0, y: 160 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.01 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-20 bg-[#F7F2EC] rounded-t-[2.5rem] shadow-[0_-30px_60px_rgba(74,58,51,0.15)]"
            >
            {/* Expanding Square Portal Divider #1 */}
            <SquareTransitionPortal
              badge="Acreditación Internacional"
              title="Respaldados por los Mejores Estándares Médicos"
              subtitle="Nuestros procesos de diagnóstico cuentan con certificación de calidad internacional ISO 9001."
              fromColor="#F7F2EC"
              toColor="#EBCFC6"
            />

            {/* Certifications Infinite Scroll Marquee */}
            <CertificationsMarquee />

            {/* Sobre CediMujer wrapped in Zoom Square Portal */}
            <ZoomSquarePortal id="nosotros" bgGradientFrom="#F7F2EC" bgGradientTo="#E6D9C8">
              <About />
            </ZoomSquarePortal>

            {/* Expanding Square Portal Divider #2 */}
            <SquareTransitionPortal
              badge="Tecnología de Vanguardia"
              title="Ultrasonografía 3D / 4D en Alta Definición"
              subtitle="Imágenes nítidas en tiempo real para el seguimiento morfológico del bebé y la prevención ginecológica."
              fromColor="#E6D9C8"
              toColor="#CFE6E2"
            />

            {/* Grid de Servicios Médicos wrapped in Zoom Square Portal */}
            <ZoomSquarePortal id="servicios" bgGradientFrom="#F7F2EC" bgGradientTo="#CFE6E2">
              <Services onSelectService={(serviceName) => handleOpenAppointment(serviceName)} />
            </ZoomSquarePortal>

            {/* Galería de Salas & Equipos Clínicos */}
            <ZoomSquarePortal id="instalaciones" bgGradientFrom="#F7F2EC" bgGradientTo="#E6D9C8">
              <FacilitiesGallery />
            </ZoomSquarePortal>

            {/* Cifras / Impacto Stats Reveal wrapped in Zoom Square Portal */}
            <ZoomSquarePortal id="impacto" bgGradientFrom="#F7F2EC" bgGradientTo="#E6D9C8">
              <ImpactStats />
            </ZoomSquarePortal>

            {/* Banner Call-To-Action to Gestational Calculator right in the page flow */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="relative rounded-3xl bg-gradient-to-r from-[#CFE6E2] via-[#EBCFC6] to-[#E6D9C8] p-8 sm:p-12 border border-[#8FC1BB]/40 shadow-xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-xl text-left">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/70 text-xs font-black text-[#4A3A33] uppercase tracking-wider mb-3">
                    Herramienta Especializada
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-black text-[#4A3A33] tracking-tight">
                    ¿Estás en la dulce espera? Calcula tus semanas de gestación
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-[#4A3A33] font-semibold leading-relaxed">
                    Accede a nuestra calculadora obstétrica para conocer tu fecha probable de parto, evolución semana a semana y las ecografías recomendadas por CediMujer.
                  </p>
                </div>
                <button
                  onClick={handleOpenCalculator}
                  className="px-8 py-4 rounded-full bg-[#4A3A33] hover:bg-[#4A3A33]/90 text-[#F7F2EC] font-black text-sm sm:text-base shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 shrink-0 border border-[#4A3A33]"
                >
                  Abrir Calculadora Gestacional →
                </button>
              </div>
            </section>

            {/* Testimonios Reales wrapped in Zoom Square Portal */}
            <ZoomSquarePortal bgGradientFrom="#F7F2EC" bgGradientTo="#EBCFC6">
              <Testimonials />
            </ZoomSquarePortal>

            {/* Expanding Square Portal Divider #3 */}
            <SquareTransitionPortal
              badge="Fácil Acceso & Parqueadero"
              title="Visita Nuestra Sede en la Zona Médica"
              subtitle="Instalaciones modernas diseñadas para brindarte máxima comodidad, privacidad y atención inmediata."
              fromColor="#EBCFC6"
              toColor="#CFE6E2"
            />

            {/* Location Map Section wrapped in Zoom Square Portal */}
            <ZoomSquarePortal id="ubicacion" bgGradientFrom="#F7F2EC" bgGradientTo="#E6D9C8">
              <LocationMap />
            </ZoomSquarePortal>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer & Contact info */}
      <Footer />

      {/* Interactive Appointment Modal */}
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialService={selectedService}
      />
    </main>
  );
}
