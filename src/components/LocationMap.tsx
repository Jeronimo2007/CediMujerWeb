"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Navigation, Clock, Phone, ExternalLink, ShieldCheck, Compass } from "lucide-react";

export const LocationMap: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const mapScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.0, 1.1]);

  const mapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.570273766782!2d-74.05601242416417!3d4.670498142646272!2m3!1f0!f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9a9416555555%3A0x123456789abcdef!2sAv.%20Carrera%2015%20%2393-47%2C%20Bogot%C3%A1!5e0!3m2!1ses!2sco!4v1700000000000!5m2!1ses!2sco";

  return (
    <section ref={containerRef} id="ubicacion" className="py-24 bg-[#F7F2EC] text-[#4A3A33] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8FC1BB]/20 border border-[#8FC1BB] text-[#4A3A33] text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Compass className="w-4 h-4 text-[#8FC1BB]" />
            <span>Ubicación & Contacto Directo</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-[#4A3A33] tracking-tight"
          >
            Visita Nuestra Sede Principal
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-[#9A7B6C] font-semibold text-base sm:text-lg"
          >
            Contamos con parqueadero privado, zona de acceso médico prioritario y la máxima comodidad para tu visita.
          </motion.p>
        </div>

        {/* Interactive Map Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 bg-[#E6D9C8]/40 border border-[#E6D9C8] rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-md space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#8FC1BB] text-[#4A3A33] flex items-center justify-center font-bold shadow-md">
                <MapPin className="w-6 h-6 text-[#4A3A33]" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-[#4A3A33]">Sede Central CediMujer</h3>
                <p className="text-xs text-[#8FC1BB] font-bold">Zona Médica & Diagnóstica</p>
              </div>
            </div>

            {/* Address */}
            <div className="p-4 rounded-2xl bg-[#F7F2EC] border border-[#E6D9C8] space-y-1">
              <span className="text-xs text-[#9A7B6C] font-bold uppercase tracking-wider block">Dirección</span>
              <p className="text-sm font-bold text-[#4A3A33]">
                Av. Carrera 15 # 93-47, Edificio CediMujer, Piso 4
              </p>
              <span className="text-xs text-[#9A7B6C] font-semibold">Bogotá, Colombia</span>
            </div>

            {/* Horarios */}
            <div className="p-4 rounded-2xl bg-[#F7F2EC] border border-[#E6D9C8] space-y-2">
              <div className="flex items-center gap-2 text-xs text-[#9A7B6C] font-bold uppercase tracking-wider">
                <Clock className="w-4 h-4 text-[#8FC1BB]" />
                <span>Horarios de Atención</span>
              </div>
              <div className="space-y-1 text-xs text-[#4A3A33] font-semibold">
                <div className="flex justify-between">
                  <span>Lunes a Viernes:</span>
                  <span className="font-extrabold text-[#4A3A33]">7:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sábados:</span>
                  <span className="font-extrabold text-[#4A3A33]">8:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between text-[#9A7B6C]">
                  <span>Urgencias 24/7:</span>
                  <span className="font-bold text-[#8FC1BB]">Disponible</span>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#F7F2EC] border border-[#E6D9C8]">
              <Phone className="w-5 h-5 text-[#8FC1BB]" />
              <div>
                <p className="text-xs text-[#9A7B6C] font-semibold">Central de Información</p>
                <p className="text-sm font-extrabold text-[#4A3A33]">+57 (601) 555-0199 / +57 300 987 6543</p>
              </div>
            </div>

            {/* Navigation Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href="https://maps.google.com/?q=Av.+Carrera+15+%2393-47,+Bogota"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-[#8FC1BB] hover:bg-[#8FC1BB]/90 text-[#4A3A33] font-extrabold text-xs flex items-center justify-center gap-2 transition-all duration-300 shadow-md border border-[#8FC1BB]"
              >
                <Navigation className="w-4 h-4" />
                <span>Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://waze.com/ul?q=CediMujer+Bogota"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-[#F7F2EC] hover:bg-[#E6D9C8] text-[#4A3A33] font-extrabold text-xs flex items-center justify-center gap-2 transition-all duration-300 border border-[#E6D9C8]"
              >
                <Navigation className="w-4 h-4 text-[#8FC1BB]" />
                <span>Abrir en Waze</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Right Map Canvas with Scroll Zoom Effect */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 relative h-[480px] sm:h-[560px] rounded-3xl overflow-hidden border border-[#E6D9C8] shadow-xl group"
          >
            <motion.div style={{ scale: mapScale }} className="w-full h-full relative">
              <iframe
                title="Ubicación CediMujer"
                src={mapEmbedUrl}
                className="w-full h-full border-0 transition-all duration-500"
                loading="lazy"
                allowFullScreen
              />
            </motion.div>

            {/* Floating Location Marker Card Overlay */}
            <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-xs bg-[#F7F2EC]/95 backdrop-blur-md border border-[#8FC1BB] p-4 rounded-2xl shadow-xl flex items-center gap-3 z-10">
              <div className="w-3 h-3 rounded-full bg-[#8FC1BB] animate-ping shrink-0" />
              <div className="text-left">
                <p className="text-xs font-extrabold text-[#4A3A33] flex items-center gap-1">
                  CediMujer Sede Principal
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8FC1BB]" />
                </p>
                <p className="text-[11px] text-[#9A7B6C] font-semibold">Entrada peatonal y parqueadero vehicular disponible</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
