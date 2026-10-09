"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { CertificationsMarquee } from "@/components/CertificationsMarquee";
import { Services } from "@/components/Services";
import { ImpactStats } from "@/components/ImpactStats";
import { Testimonials } from "@/components/Testimonials";
import { LocationMap } from "@/components/LocationMap";
import { Footer } from "@/components/Footer";
import { AppointmentModal } from "@/components/AppointmentModal";
import { ZoomSquarePortal } from "@/components/ZoomSquarePortal";
import { SquareTransitionPortal } from "@/components/SquareTransitionPortal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("Ginecología Integral");

  const handleOpenAppointment = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#F7F2EC] text-[#4A3A33] overflow-x-hidden">
      {/* Header Navbar with hide-on-scroll-down */}
      <Navbar onOpenAppointment={() => handleOpenAppointment()} />

      {/* Hero Section */}
      <Hero onOpenAppointment={() => handleOpenAppointment()} />

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

      {/* Cifras / Impacto Stats Reveal wrapped in Zoom Square Portal */}
      <ZoomSquarePortal id="impacto" bgGradientFrom="#F7F2EC" bgGradientTo="#E6D9C8">
        <ImpactStats />
      </ZoomSquarePortal>

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
