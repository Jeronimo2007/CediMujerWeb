"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
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
import {
  SectionPageView,
  type AppSectionView,
} from "@/components/SectionPageView";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(
    "Consulta Ginecológica"
  );
  const [currentView, setCurrentView] = useState<AppSectionView>("home");
  const [sectionSubKey, setSectionSubKey] = useState<string | undefined>(
    undefined
  );
  const [sectionItemId, setSectionItemId] = useState<string | undefined>(
    undefined
  );

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
      } else if (href === "#cardiodiagnostico") {
        handleSelectSection("cardiodiagnostico", subKey, itemId);
      } else if (href === "#ultrasonido-radiologia") {
        handleSelectSection("ultrasonido-radiologia", subKey, itemId);
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
    <main className="min-h-screen bg-[#F7F6F4] text-[#4A3A33] overflow-x-clip font-sans">
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
              {/* Cifras Oficiales de CediMujer justo debajo del Header */}
              <ImpactStats />

              {/* Nuestras Unidades de Cuidado (Imágenes Protagonistas) */}
              <ZoomSquarePortal bgGradientFrom="#F7F6F4" bgGradientTo="#EBCFC6">
                <Services
                  onSelectService={(serviceName) =>
                    handleOpenAppointment(serviceName)
                  }
                  onOpenCalculator={handleOpenCalculator}
                  onOpenSection={handleSelectSection}
                />
              </ZoomSquarePortal>

              {/* Calculadora Gestacional justo debajo de Nuestras Unidades de Cuidado */}
              <section className="py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div
                  onClick={handleOpenCalculator}
                  className="group relative h-64 sm:h-72 rounded-[2rem] overflow-hidden cursor-pointer border border-[#D7A7A8]/60 shadow-[0_16px_42px_-18px_rgba(74,58,51,0.18)] flex items-center"
                >
                  <Image
                    src="/assets/images/unsplash-bebe.jpg"
                    alt="Calculadora Gestacional CediMujer"
                    fill
                    unoptimized
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#3A2422]/90 via-[#4A3A33]/65 to-[#4A3A33]/25" />

                  <div className="relative z-10 px-6 sm:px-12 max-w-2xl space-y-3">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#EBCFC6]/90 text-[#4A3A33] text-[10px] font-medium uppercase tracking-[0.2em]">
                      Calculadora Obstétrica Interactiva
                    </span>
                    <h3 className="text-2xl sm:text-4xl font-light text-[#F7F6F4] leading-tight">
                      ¿Sabes cuántas semanas tiene tu{" "}
                      <span className="font-serif italic font-normal text-[#EBCFC6]">
                        bebé hoy?
                      </span>
                    </h3>
                    <p className="text-xs sm:text-sm text-[#F7F6F4]/85 font-light max-w-md">
                      Descubre tu fecha probable de parto, trimestre actual y qué ecografía te corresponde en segundos.
                    </p>
                    <div className="pt-1">
                      <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium tracking-wider text-[#EBCFC6] group-hover:text-[#F7F6F4] transition-colors">
                        <span className="text-[#D7A7A8]">(</span>
                        <span className="border-b border-[#EBCFC6]/60 pb-0.5">
                          Calcular mis semanas de embarazo
                        </span>
                        <span className="text-[#D7A7A8]">)</span>
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Salud Femenina con Sentido Humano (Imágenes Protagonistas) */}
              <ZoomSquarePortal bgGradientFrom="#F7F6F4" bgGradientTo="#EBCFC6">
                <About onOpenAppointment={(srv) => handleOpenAppointment(srv)} />
              </ZoomSquarePortal>

              {/* Galería de Espacios y Tecnología (Abre Carrusel Fullscreen) */}
              <ZoomSquarePortal bgGradientFrom="#F7F6F4" bgGradientTo="#E6D9C8">
                <FacilitiesGallery />
              </ZoomSquarePortal>

              {/* Experiencias en CediMujer (Videos Reels + Sobres Interactivos) */}
              <ZoomSquarePortal bgGradientFrom="#F7F6F4" bgGradientTo="#EBCFC6">
                <Testimonials />
              </ZoomSquarePortal>

              {/* Blog y Preguntas Frecuentes */}
              <ZoomSquarePortal bgGradientFrom="#F7F6F4" bgGradientTo="#EBCFC6">
                <BlogAndFaq
                  onOpenAppointment={(srv) => handleOpenAppointment(srv)}
                />
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
