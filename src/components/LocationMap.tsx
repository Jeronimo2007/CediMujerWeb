"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Clock, Phone, ExternalLink, ShieldCheck, Compass, Star } from "lucide-react";

export const LocationMap: React.FC = () => {
  const mapEmbedUrl =
    "https://maps.google.com/maps?q=CC+Aves+Maria+Parque+Comercial,+Cl.+75+Sur+%2343+A+-202,+Sabaneta,+Antioquia&t=&z=16&ie=UTF8&iwloc=&output=embed";

  return (
    <section id="ubicacion" className="scroll-mt-20 py-16 sm:py-24 bg-[#F7F2EC] text-[#4A3A33] relative overflow-hidden">
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
            Visita Nuestra Sede
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
                <h3 className="text-xl font-extrabold text-[#4A3A33]">Nuestra Sede</h3>
                <p className="text-xs text-[#8FC1BB] font-bold">Zona Médica & Diagnóstica</p>
              </div>
            </div>

            {/* Address */}
            <div className="p-4 rounded-2xl bg-[#F7F2EC] border border-[#E6D9C8] space-y-1">
              <span className="text-xs text-[#9A7B6C] font-bold uppercase tracking-wider block">Dirección</span>
              <p className="text-sm font-bold text-[#4A3A33]">
                Cl. 75 Sur #43 A -202
              </p>
              <p className="text-xs text-[#8FC1BB] font-bold">
                C.C. Aves María Parque Comercial
              </p>
              <span className="text-xs text-[#9A7B6C] font-semibold">Sabaneta, Antioquia</span>
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
                  <span>Atención Prioritaria:</span>
                  <span className="font-bold text-[#8FC1BB]">Previa Cita</span>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#F7F2EC] border border-[#E6D9C8]">
              <Phone className="w-5 h-5 text-[#8FC1BB]" />
              <div>
                <p className="text-xs text-[#9A7B6C] font-semibold">Central de Información</p>
                <p className="text-sm font-extrabold text-[#4A3A33]">+57 (604) 448-0202 / +57 300 987 6543</p>
              </div>
            </div>

            {/* Rate Us on Google Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#CFE6E2]/50 via-[#EBCFC6]/40 to-[#E6D9C8]/40 border border-[#8FC1BB]/40 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs font-black text-[#4A3A33] ml-1">5.0</span>
                </div>
                <span className="text-[11px] font-bold text-[#8FC1BB] uppercase tracking-wider">Google Reviews</span>
              </div>
              <p className="text-xs text-[#4A3A33] font-semibold">
                ¿Fuiste atendida en CediMujer? Tu opinión ayuda a más mujeres a encontrar atención médica de calidad.
              </p>
              <a
                href="https://www.google.com/search?q=cedimujer&sca_esv=1504e24edcb19965&sxsrf=APpeQnub9H3ukkV8Ey_PWw979Iln_ury2Q%3A1791855506543&ei=kovNasHKIIqTwbkPj_SBmQU&biw=1470&bih=836&uact=5&oq=cedimujer&gs_lp=Egxnd3Mtd2l6LXNlcnAiCWNlZGltdWplcjIEECMYJzIGEAAYBxgeMgYQABgHGB4yBhAAGAcYHjIFEAAYgAQyBhAAGAcYHjIGEAAYBxgeMgYQABgHGB4yBhAAGAcYHjIGEAAYBxgeSOUMUJoCWNcLcAF4AZABAJgBgQGgAf0BqgEDMC4yuAEDyAEA-AEBmAIDoAKSAsICChAAGEcY1gQYsAPCAg0QABiABBiKBRhDGLADmAMAiAYBkAYEkgcDMS4yoAeeC7IHAzAuMrgHiwLCBwUwLjEuMsgHC4AIAQ&sclient=gws-wiz-serp#lrd=0x8e4683dea023ff4f:0xe8e476b5f8f6b103,3,,,,"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-[#4A3A33] hover:bg-[#4A3A33]/90 text-[#F7F2EC] font-bold text-xs flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:scale-[1.01]"
              >
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>Califícanos en Google</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#8FC1BB]" />
              </a>
            </div>

            {/* Navigation Action Buttons */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 pt-1">
              <a
                href="https://maps.google.com/?q=CC+Aves+Maria+Parque+Comercial,+Cl.+75+Sur+%2343+A+-202,+Sabaneta,+Antioquia"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-3 sm:px-4 rounded-xl bg-[#8FC1BB] hover:bg-[#8FC1BB]/90 text-[#4A3A33] font-extrabold text-xs flex items-center justify-center gap-1.5 sm:gap-2 transition-all duration-300 shadow-md border border-[#8FC1BB] whitespace-nowrap"
              >
                <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>Google Maps</span>
                <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
              </a>

              <a
                href="https://waze.com/ul?q=Aves+Maria+Parque+Comercial+Sabaneta"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-3 sm:px-4 rounded-xl bg-[#F7F2EC] hover:bg-[#E6D9C8] text-[#4A3A33] font-extrabold text-xs flex items-center justify-center gap-1.5 sm:gap-2 transition-all duration-300 border border-[#E6D9C8] whitespace-nowrap"
              >
                <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8FC1BB] shrink-0" />
                <span>Abrir en Waze</span>
                <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
              </a>
            </div>
          </motion.div>

          {/* Right Map Canvas */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 relative h-[360px] sm:h-[480px] lg:h-[560px] rounded-3xl overflow-hidden border border-[#E6D9C8] shadow-xl group"
          >
            <div className="w-full h-full relative">
              <iframe
                title="Ubicación CediMujer"
                src={mapEmbedUrl}
                className="w-full h-full border-0 transition-all duration-500"
                loading="lazy"
                allowFullScreen
              />
            </div>

            {/* Floating Location Marker Card Overlay */}
            <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-xs bg-[#F7F2EC]/95 backdrop-blur-md border border-[#8FC1BB] p-4 rounded-2xl shadow-xl flex items-center gap-3 z-10">
              <div className="w-3 h-3 rounded-full bg-[#8FC1BB] animate-ping shrink-0" />
              <div className="text-left">
                <p className="text-xs font-extrabold text-[#4A3A33] flex items-center gap-1">
                  Nuestra Sede
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
