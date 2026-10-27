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
import { SquareTransitionPortal } from "@/components/SquareTransitionPortal";
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

  // Listen to custom navigation events (e.g. "Depositar un testimonio" button in Testimonials)
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
    <main className="min-h-screen bg-[#F7F2EC] text-[#4A3A33] overflow-x-clip">
      {/* Cinematic Curtain Preloader Opening Effect */}
      <CurtainPreloader />

      {/* Header Navbar with Full-Page Section Navigation & Mega-Menu Dropdowns */}
      <Navbar
        currentView={currentView}
        onOpenAppointment={(srv) => handleOpenAppointment(srv)}
        onOpenCalculator={handleOpenCalculator}
        onSelectSection={handleSelectSection}
        onNavigateHome={handleNavigateHome}
      />

      {/* Floating Social Media Access (Instagram, TikTok, Facebook, YouTube) */}
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
            {/* Hero Section */}
            <Hero
              onOpenAppointment={() => handleOpenAppointment()}
              onOpenCalculator={handleOpenCalculator}
            />

            <div className="relative z-20 bg-[#F7F2EC] rounded-t-[2rem] sm:rounded-t-[2.5rem] shadow-[0_-20px_50px_rgba(74,58,51,0.12)]">
              {/* Expanding Square Portal Divider #1 */}
              <SquareTransitionPortal
                badge="Centro de Diagnóstico Especializado"
                title="Calidad Humana y Rigor Científico desde 2008"
                subtitle="Acompañamos a la mujer en cada etapa de su vida en nuestra sede del C.C. Aves María en Sabaneta."
                fromColor="#F7F2EC"
                toColor="#EBCFC6"
              />

              {/* Certifications Infinite Scroll Marquee */}
              <CertificationsMarquee />

              {/* Portal de Secciones Independientes: Embarazo, Ginecología, Telemedicina, Quiénes Somos, Blog y Contacto */}
              <ZoomSquarePortal bgGradientFrom="#F7F2EC" bgGradientTo="#CFE6E2">
                <Services
                  onSelectService={(serviceName) => handleOpenAppointment(serviceName)}
                  onOpenCalculator={handleOpenCalculator}
                  onOpenSection={handleSelectSection}
                />
              </ZoomSquarePortal>

              {/* Expanding Square Portal Divider #2 */}
              <SquareTransitionPortal
                badge="Nuestra Institución · Especialistas"
                title="Equipo Médico Especializado y Tecnología HD Live"
                subtitle="Conoce nuestra sede en el C.C. Aves María y a los especialistas de CediMujer."
                fromColor="#CFE6E2"
                toColor="#E6D9C8"
              />

              {/* Quiénes Somos: Nuestra Institución, Nuestra Sede, Especialistas y Asociación de Usuarios */}
              <ZoomSquarePortal bgGradientFrom="#F7F2EC" bgGradientTo="#E6D9C8">
                <About onOpenAppointment={(srv) => handleOpenAppointment(srv)} />
              </ZoomSquarePortal>

              {/* Galería de Salas & Equipos Clínicos */}
              <ZoomSquarePortal bgGradientFrom="#F7F2EC" bgGradientTo="#E6D9C8">
                <FacilitiesGallery />
              </ZoomSquarePortal>

              {/* Métricas Oficiales de CediMujer (+36.000 Citas, +30.000 Ecografías, +13.000 Mamás Gestantes) */}
              <ZoomSquarePortal bgGradientFrom="#F7F2EC" bgGradientTo="#E6D9C8">
                <ImpactStats />
              </ZoomSquarePortal>

              {/* Banner Call-To-Action to Gestational Calculator right in the page flow */}
              <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="relative rounded-3xl bg-gradient-to-r from-[#CFE6E2] via-[#EBCFC6] to-[#E6D9C8] p-6 sm:p-12 border border-[#8FC1BB]/40 shadow-xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
                  <div className="max-w-xl text-center md:text-left">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/75 text-xs font-black text-[#4A3A33] uppercase tracking-wider mb-3">
                      Herramienta Especializada de Embarazo
                    </span>
                    <h3 className="text-2xl sm:text-4xl font-black text-[#4A3A33] tracking-tight">
                      ¿Estás en embarazo? Calcula tus semanas de gestación
                    </h3>
                    <p className="mt-3 text-sm sm:text-base text-[#4A3A33] font-semibold leading-relaxed">
                      Accede a nuestra calculadora obstétrica para conocer tu fecha probable de parto, evolución semana a semana y las ecografías recomendadas por CediMujer.
                    </p>
                  </div>
                  <button
                    onClick={handleOpenCalculator}
                    className="w-full md:w-auto px-7 py-4 rounded-full bg-[#4A3A33] hover:bg-[#4A3A33]/90 text-[#F7F2EC] font-black text-sm sm:text-base shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 shrink-0 border border-[#4A3A33]"
                  >
                    Abrir Calculadora Gestacional →
                  </button>
                </div>
              </section>

              {/* Información, Blog (7 Artículos Oficiales) y Preguntas Frecuentes */}
              <ZoomSquarePortal bgGradientFrom="#F7F2EC" bgGradientTo="#CFE6E2">
                <BlogAndFaq onOpenAppointment={(srv) => handleOpenAppointment(srv)} />
              </ZoomSquarePortal>

              {/* Testimonios Literales Reales de CediMujer */}
              <ZoomSquarePortal bgGradientFrom="#F7F2EC" bgGradientTo="#EBCFC6">
                <Testimonials />
              </ZoomSquarePortal>

              {/* Expanding Square Portal Divider #3 */}
              <SquareTransitionPortal
                badge="C.C. Aves María · Local 341-342 (Sabaneta)"
                title="Contacto, Ubicación y Atención al Cliente"
                subtitle="Visítanos en la Calle 75 sur No. 43 A -202 o comunícate al WhatsApp +57 311 397 9905 y PBX +604 357 3010."
                fromColor="#EBCFC6"
                toColor="#CFE6E2"
              />

              {/* Location Map & Customer Service Form (5 Official Contact Options) */}
              <ZoomSquarePortal bgGradientFrom="#F7F2EC" bgGradientTo="#E6D9C8">
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

      {/* Ephemeral AI Assistant Chatbot (OpenRouter - Gemini 2.5 Flash Lite) */}
      <ChatBot
        onOpenAppointment={(srv) => handleOpenAppointment(srv)}
        onOpenCalculator={handleOpenCalculator}
      />
    </main>
  );
}
