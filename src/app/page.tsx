"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { CertificationsMarquee } from "@/components/CertificationsMarquee";
import { Services } from "@/components/Services";
import { ImpactStats } from "@/components/ImpactStats";
import { BlogAndFaq } from "@/components/BlogAndFaq";
import { Testimonials } from "@/components/Testimonials";
import { FacilitiesGallery } from "@/components/FacilitiesGallery";
import { LocationMap } from "@/components/LocationMap";
import { Footer } from "@/components/Footer";
import { AppointmentModal } from "@/components/AppointmentModal";
import { ZoomSquarePortal } from "@/components/ZoomSquarePortal";
import { GestationalCalculator } from "@/components/GestationalCalculator";
import { CurtainPreloader } from "@/components/CurtainPreloader";
import { SocialMediaBar } from "@/components/SocialMediaBar";
import { ChatBot } from "@/components/ChatBot";
import { SectionPageView, type AppSectionView } from "@/components/SectionPageView";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("Consulta Ginecológica");
  const [currentView, setCurrentView] = useState<AppSectionView>("home");
  const [sectionSubKey, setSectionSubKey] = useState<string | undefined>(undefined);
  const [sectionItemId, setSectionItemId] = useState<string | undefined>(undefined);

  const handleOpenAppointment = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    setIsModalOpen(true);
  };

  const handleSelectSection = (
    view: AppSectionView,
    subKey?: string,
    itemId?: string
  ) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentView(view);
    setSectionSubKey(subKey);
    setSectionItemId(itemId);
  };

  const handleOpenCalculator = () => {
    handleSelectSection("calculator");
  };

  const handleNavigateHome = (targetHash?: string) => {
    setCurrentView("home");
    setSectionSubKey(undefined);
    setSectionItemId(undefined);
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

  useEffect(() => {
    const handleCustomNavigate = (event: Event) => {
      const customEvent = event as CustomEvent<{
        href?: string;
        subKey?: string;
        itemId?: string;
      }>;
      const href = customEvent.detail?.href;
      const subKey = customEvent.detail?.subKey;
      const itemId = customEvent.detail?.itemId;

      if (href === "#atencion-cliente" || href === "#ubicacion") {
        handleSelectSection("contacto", subKey, itemId);
      } else if (href === "#embarazo") {
        handleSelectSection("embarazo", subKey, itemId);
      } else if (href === "#ginecologia") {
        handleSelectSection("ginecologia", subKey, itemId);
      } else if (href === "#telemedicina") {
        handleSelectSection("telemedicina", subKey, itemId);
      } else if (href === "#nosotros") {
        handleSelectSection("quienes-somos", subKey, itemId);
      } else if (href === "#blog-faq") {
        handleSelectSection("blog", subKey, itemId);
      }
    };

    window.addEventListener("cedimujer:navigate", handleCustomNavigate);
    return () => {
      window.removeEventListener("cedimujer:navigate", handleCustomNavigate);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#FDF6F6] text-[#4A3A33] overflow-x-clip font-sans">
      {/* Editorial Pastel Pink Preloader */}
      <CurtainPreloader />

      {/* Header Navbar */}
      <Navbar
        currentView={currentView}
        onOpenAppointment={(srv) => handleOpenAppointment(srv)}
        onOpenCalculator={handleOpenCalculator}
        onSelectSection={handleSelectSection}
        onNavigateHome={handleNavigateHome}
      />

      {/* Floating Social Media Access */}
      <SocialMediaBar />

      <AnimatePresence mode="wait">
        {currentView === "calculator" ? (
          <motion.div
            key="calculator-view"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="pt-20 sm:pt-24 min-h-screen"
          >
            <GestationalCalculator
              onOpenAppointment={(srv) => handleOpenAppointment(srv)}
              onBackToHome={() => handleNavigateHome("#inicio")}
            />
          </motion.div>
        ) : currentView !== "home" ? (
          <motion.div
            key={`section-view-${currentView}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="min-h-screen"
          >
            <SectionPageView
              view={currentView}
              initialSubKey={sectionSubKey}
              initialItemId={sectionItemId}
              onBackToHome={() => handleNavigateHome("#inicio")}
              onChangeView={(sec, subKey, itemId) =>
                handleSelectSection(sec, subKey, itemId)
              }
              onOpenAppointment={(srv) => handleOpenAppointment(srv)}
              onOpenCalculator={handleOpenCalculator}
            />
          </motion.div>
        ) : (
          <motion.div
            key="home-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* Minimalist Full-Bleed Hero Section */}
            <Hero
              onOpenAppointment={() => handleOpenAppointment()}
              onOpenCalculator={handleOpenCalculator}
            />

            <div className="relative z-20 bg-[#F7F6F4]">
              {/* Línea móvil de certificaciones justo debajo del Hero */}
              <CertificationsMarquee />

              {/* Métricas Oficiales de CediMujer justo debajo de la línea móvil */}
              <ImpactStats />

              {/* Unidades y Especialidades */}
              <ZoomSquarePortal bgGradientFrom="#F7F6F4" bgGradientTo="#EBCFC6">
                <Services
                  onSelectService={(serviceName) => handleOpenAppointment(serviceName)}
                  onOpenCalculator={handleOpenCalculator}
                  onOpenSection={handleSelectSection}
                />
              </ZoomSquarePortal>

              {/* Quiénes Somos: Institución, Sede, Especialistas y Asociación */}
              <ZoomSquarePortal bgGradientFrom="#F7F6F4" bgGradientTo="#EBCFC6">
                <About onOpenAppointment={(srv) => handleOpenAppointment(srv)} />
              </ZoomSquarePortal>

              {/* Galería de Salas & Equipos Clínicos (Abre Carrusel Fullscreen) */}
              <ZoomSquarePortal bgGradientFrom="#F7F6F4" bgGradientTo="#E6D9C8">
                <FacilitiesGallery />
              </ZoomSquarePortal>

              {/* Compact Pastel Pink Call-To-Action to Gestational Calculator */}
              <section className="py-8 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                <div className="relative rounded-[2rem] bg-gradient-to-r from-[#EBCFC6]/70 via-[#F7F6F4] to-[#EBCFC6]/85 p-6 sm:p-10 border border-[#D7A7A8]/65 shadow-[0_12px_36px_-18px_rgba(154,123,108,0.12)] flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
                  <div>
                    <span className="inline-block text-[10px] font-medium text-[#9A7B6C] uppercase tracking-[0.2em] mb-1">
                      Herramienta Obstétrica
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#4A3A33] leading-snug">
                      ¿Estás en embarazo?{" "}
                      <span className="italic text-[#D7A7A8]">
                        Calcula tus semanas hoy
                      </span>
                    </h3>
                  </div>
                  <button
                    onClick={handleOpenCalculator}
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#4A3A33] hover:bg-[#4A3A33]/90 text-[#F7F6F4] font-medium text-xs sm:text-sm tracking-wide transition-all shrink-0"
                  >
                    ( Abrir Calculadora )
                  </button>
                </div>
              </section>

              {/* Blog y Preguntas Frecuentes */}
              <ZoomSquarePortal bgGradientFrom="#F7F6F4" bgGradientTo="#EBCFC6">
                <BlogAndFaq onOpenAppointment={(srv) => handleOpenAppointment(srv)} />
              </ZoomSquarePortal>

              {/* Testimonios Reales */}
              <ZoomSquarePortal bgGradientFrom="#F7F6F4" bgGradientTo="#EBCFC6">
                <Testimonials />
              </ZoomSquarePortal>

              {/* Ubicación y Atención al Usuario */}
              <ZoomSquarePortal bgGradientFrom="#F7F6F4" bgGradientTo="#E6D9C8">
                <LocationMap />
              </ZoomSquarePortal>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer & Contact info */}
      <Footer
        onNavigateHome={handleNavigateHome}
        onOpenCalculator={handleOpenCalculator}
        onSelectSection={handleSelectSection}
      />

      {/* Interactive Appointment Modal */}
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialService={selectedService}
      />

      {/* Ephemeral AI Assistant Chatbot (OpenRouter) */}
      <ChatBot
        onOpenAppointment={(srv) => handleOpenAppointment(srv)}
        onOpenCalculator={handleOpenCalculator}
      />
    </main>
  );
}
