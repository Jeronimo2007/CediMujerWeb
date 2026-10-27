"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Navigation,
  Clock,
  Phone,
  ExternalLink,
  ShieldCheck,
  Compass,
  Star,
  Mail,
  MessageSquareHeart,
  Send,
  CheckCircle2,
  User,
} from "lucide-react";
import { CONTACT_INFO } from "@/config/cedimujerContent";

export const LocationMap: React.FC = () => {
  const [selectedFormOption, setSelectedFormOption] = useState(
    CONTACT_INFO.contactFormOptions[0].id
  );
  const [formState, setFormState] = useState({
    nombre: "",
    telefono: "",
    email: "",
    destinatarioRecomendacion: "",
    mensaje: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const handleNav = (e: Event) => {
      const customEvent = e as CustomEvent<{
        href?: string;
        subKey?: string;
      }>;
      const { subKey } = customEvent.detail || {};
      if (
        subKey &&
        CONTACT_INFO.contactFormOptions.some((opt) => opt.id === subKey)
      ) {
        setSelectedFormOption(subKey);
        setFormSubmitted(false);
      }
    };
    window.addEventListener("cedimujer:navigate", handleNav);
    return () => window.removeEventListener("cedimujer:navigate", handleNav);
  }, []);

  const activeOptionObj =
    CONTACT_INFO.contactFormOptions.find((o) => o.id === selectedFormOption) ||
    CONTACT_INFO.contactFormOptions[0];

  const mapEmbedUrl =
    "https://maps.google.com/maps?q=CC+Aves+Maria+Parque+Comercial,+Cl.+75+Sur+%2343+A+-202,+Sabaneta,+Antioquia&t=&z=16&ie=UTF8&iwloc=&output=embed";

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section
      id="ubicacion"
      className="scroll-mt-20 py-16 sm:py-24 bg-[#F7F2EC] text-[#4A3A33] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        {/* =================================================================
            PARTE 1: UBICACIÓN E INFORMACIÓN DE CONTACTO OFICIAL
        ================================================================= */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8FC1BB]/20 border border-[#8FC1BB] text-[#4A3A33] text-xs font-bold uppercase tracking-widest mb-4"
            >
              <Compass className="w-4 h-4 text-[#8FC1BB]" />
              <span>Información de Contacto y Sede Sabaneta</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl font-extrabold text-[#4A3A33] tracking-tight"
            >
              Visita Nuestra Sede en C.C. Aves María
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-[#9A7B6C] font-semibold text-base sm:text-lg"
            >
              {CONTACT_INFO.addressFull}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Info Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 bg-[#E6D9C8]/40 border border-[#E6D9C8] rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-md space-y-5"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#8FC1BB] text-[#4A3A33] flex items-center justify-center font-bold shadow-md">
                  <MapPin className="w-6 h-6 text-[#4A3A33]" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-[#4A3A33]">
                    Sede CediMujer Sabaneta
                  </h3>
                  <p className="text-xs text-[#8FC1BB] font-bold">
                    Centro Comercial Aves María · Local 341-342
                  </p>
                </div>
              </div>

              {/* Dirección Oficial */}
              <div className="p-4 rounded-2xl bg-[#F7F2EC] border border-[#E6D9C8] space-y-1">
                <span className="text-xs text-[#9A7B6C] font-bold uppercase tracking-wider block">
                  Dirección Oficial
                </span>
                <p className="text-sm font-black text-[#4A3A33]">
                  {CONTACT_INFO.addressFull}
                </p>
              </div>

              {/* Teléfonos Reales */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={CONTACT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-[#F7F2EC] hover:bg-[#CFE6E2]/50 border border-[#8FC1BB]/50 transition-colors space-y-1"
                >
                  <span className="text-[11px] text-[#9A7B6C] font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#8FC1BB]" />
                    Asesoría (Celular / WhatsApp)
                  </span>
                  <p className="text-sm sm:text-base font-black text-[#4A3A33]">
                    {CONTACT_INFO.whatsappDisplay}
                  </p>
                </a>

                <a
                  href={CONTACT_INFO.pbxTel}
                  className="p-4 rounded-2xl bg-[#F7F2EC] hover:bg-[#EBCFC6]/50 border border-[#E6D9C8] transition-colors space-y-1"
                >
                  <span className="text-[11px] text-[#9A7B6C] font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#D7A7A8]" />
                    Teléfono Fijo (PBX)
                  </span>
                  <p className="text-sm sm:text-base font-black text-[#4A3A33]">
                    {CONTACT_INFO.pbxDisplay}
                  </p>
                </a>
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
                    <span className="font-extrabold text-[#4A3A33]">
                      7:00 AM - 6:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sábados:</span>
                    <span className="font-extrabold text-[#4A3A33]">
                      7:00 AM - 1:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between text-[#9A7B6C]">
                    <span>Correo Electrónico:</span>
                    <span className="font-bold text-[#4A3A33]">
                      {CONTACT_INFO.email}
                    </span>
                  </div>
                </div>
              </div>

              {/* Rate Us on Google Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#CFE6E2]/50 via-[#EBCFC6]/40 to-[#E6D9C8]/40 border border-[#8FC1BB]/40 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                    <span className="text-xs font-black text-[#4A3A33] ml-1">
                      5.0
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-[#8FC1BB] uppercase tracking-wider">
                    Google Reviews
                  </span>
                </div>
                <a
                  href="https://www.google.com/search?q=cedimujer#lrd=0x8e4683dea023ff4f:0xe8e476b5f8f6b103,3,,,,"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#4A3A33] hover:bg-[#4A3A33]/90 text-[#F7F2EC] font-bold text-xs flex items-center justify-center gap-2 transition-all duration-300 shadow-md"
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
                  className="py-3 px-3 sm:px-4 rounded-xl bg-[#8FC1BB] hover:bg-[#8FC1BB]/90 text-[#4A3A33] font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all duration-300 shadow-md border border-[#8FC1BB] whitespace-nowrap"
                >
                  <Navigation className="w-3.5 h-3.5 shrink-0" />
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>

                <a
                  href="https://waze.com/ul?q=Aves+Maria+Parque+Comercial+Sabaneta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-3 sm:px-4 rounded-xl bg-[#F7F2EC] hover:bg-[#E6D9C8] text-[#4A3A33] font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all duration-300 border border-[#E6D9C8] whitespace-nowrap"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#8FC1BB] shrink-0" />
                  <span>Abrir en Waze</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              </div>
            </motion.div>

            {/* Right Map Canvas */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 relative h-[360px] sm:h-[480px] lg:h-[580px] rounded-3xl overflow-hidden border border-[#E6D9C8] shadow-xl"
            >
              <iframe
                title="Ubicación CediMujer C.C. Aves María Sabaneta"
                src={mapEmbedUrl}
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
              />

              <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-sm bg-[#F7F2EC]/95 backdrop-blur-md border border-[#8FC1BB] p-4 rounded-2xl shadow-xl flex items-center gap-3 z-10">
                <div className="w-3 h-3 rounded-full bg-[#8FC1BB] animate-ping shrink-0" />
                <div className="text-left">
                  <p className="text-xs font-extrabold text-[#4A3A33] flex items-center gap-1">
                    C.C. Aves María · Local 341-342
                    <ShieldCheck className="w-3.5 h-3.5 text-[#8FC1BB]" />
                  </p>
                  <p className="text-[11px] text-[#9A7B6C] font-semibold">
                    Calle 75 sur No. 43 A -202 (Sabaneta)
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* =================================================================
            PARTE 2: FORMULARIO DE CONTACTO Y ATENCIÓN AL CLIENTE (5 OPCIONES)
        ================================================================= */}
        <div
          id="atencion-cliente"
          className="scroll-mt-24 rounded-[2.25rem] bg-gradient-to-br from-[#E6D9C8]/55 via-[#F7F2EC] to-[#CFE6E2]/45 border-2 border-[#E6D9C8] p-6 sm:p-10 lg:p-12 shadow-xl"
        >
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBCFC6] border border-[#D7A7A8] text-[#4A3A33] text-xs font-black uppercase tracking-wider mb-3">
              <MessageSquareHeart className="w-4 h-4 text-[#4A3A33]" />
              <span>Atención al Cliente y Participación del Usuario</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-[#4A3A33]">
              Formulario Oficial de Contacto, Sugerencias y Testimonios
            </h3>
            <p className="mt-2 text-xs sm:text-base text-[#9A7B6C] font-semibold">
              Selecciona el tipo de solicitud que deseas realizar. Nuestro equipo administrativo y médico te responderá oportunamente.
            </p>
          </div>

          {/* 5 Official Contact Options Selector */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 mb-8">
            {CONTACT_INFO.contactFormOptions.map((option) => {
              const isSelected = selectedFormOption === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    setSelectedFormOption(option.id);
                    setFormSubmitted(false);
                  }}
                  className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all border ${
                    isSelected
                      ? "bg-[#4A3A33] text-[#F7F2EC] border-[#4A3A33] shadow-md scale-[1.02]"
                      : "bg-white/80 text-[#4A3A33] border-[#E6D9C8] hover:border-[#8FC1BB]"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-[#E6D9C8] shadow-md">
            {!formSubmitted ? (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#CFE6E2]/35 border border-[#8FC1BB]/40">
                  <p className="text-xs font-black uppercase tracking-wider text-[#4A3A33]">
                    Modalidad seleccionada: {activeOptionObj.label}
                  </p>
                  <p className="text-xs text-[#9A7B6C] font-semibold mt-0.5">
                    {activeOptionObj.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#4A3A33] uppercase tracking-wider mb-1">
                      Nombre Completo
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3 w-4 h-4 text-[#9A7B6C]" />
                      <input
                        type="text"
                        required
                        placeholder="Tu nombre"
                        value={formState.nombre}
                        onChange={(e) =>
                          setFormState({ ...formState, nombre: e.target.value })
                        }
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#F7F2EC] border border-[#E6D9C8] text-xs sm:text-sm font-semibold text-[#4A3A33] focus:outline-none focus:border-[#8FC1BB]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#4A3A33] uppercase tracking-wider mb-1">
                      Celular / WhatsApp
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3 w-4 h-4 text-[#9A7B6C]" />
                      <input
                        type="tel"
                        required
                        placeholder="+57 311 000 0000"
                        value={formState.telefono}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            telefono: e.target.value,
                          })
                        }
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#F7F2EC] border border-[#E6D9C8] text-xs sm:text-sm font-semibold text-[#4A3A33] focus:outline-none focus:border-[#8FC1BB]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#4A3A33] uppercase tracking-wider mb-1">
                      Correo Electrónico
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3 w-4 h-4 text-[#9A7B6C]" />
                      <input
                        type="email"
                        required
                        placeholder="correo@ejemplo.com"
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#F7F2EC] border border-[#E6D9C8] text-xs sm:text-sm font-semibold text-[#4A3A33] focus:outline-none focus:border-[#8FC1BB]"
                      />
                    </div>
                  </div>
                </div>

                {selectedFormOption === "recomendar" && (
                  <div>
                    <label className="block text-xs font-bold text-[#4A3A33] uppercase tracking-wider mb-1">
                      Nombre o correo de la persona a quien recomiendas CediMujer
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Laura Gómez - laura@correo.com"
                      value={formState.destinatarioRecomendacion}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          destinatarioRecomendacion: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F7F2EC] border border-[#E6D9C8] text-xs sm:text-sm font-semibold text-[#4A3A33] focus:outline-none focus:border-[#8FC1BB]"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-[#4A3A33] uppercase tracking-wider mb-1">
                    {activeOptionObj.label}
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder={activeOptionObj.placeholder}
                    value={formState.mensaje}
                    onChange={(e) =>
                      setFormState({ ...formState, mensaje: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[#F7F2EC] border border-[#E6D9C8] text-xs sm:text-sm font-semibold text-[#4A3A33] focus:outline-none focus:border-[#8FC1BB]"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <p className="text-[11px] text-[#9A7B6C] font-semibold">
                    También puedes escribirnos directo por WhatsApp al{" "}
                    <strong className="text-[#4A3A33]">
                      {CONTACT_INFO.whatsappDisplay}
                    </strong>{" "}
                    o llamar al PBX{" "}
                    <strong className="text-[#4A3A33]">
                      {CONTACT_INFO.pbxDisplay}
                    </strong>
                    .
                  </p>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-[#8FC1BB] hover:bg-[#8FC1BB]/90 text-[#4A3A33] font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Enviar {activeOptionObj.label}</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#CFE6E2] text-[#4A3A33] flex items-center justify-center mx-auto border border-[#8FC1BB]">
                  <CheckCircle2 className="w-8 h-8 text-[#8FC1BB]" />
                </div>
                <h4 className="text-xl font-black text-[#4A3A33]">
                  ¡Hemos recibido tu mensaje ({activeOptionObj.label})!
                </h4>
                <p className="text-xs sm:text-sm text-[#9A7B6C] font-semibold max-w-md mx-auto">
                  Gracias, <strong className="text-[#4A3A33]">{formState.nombre}</strong>. Tu solicitud ha sido registrada en el sistema de Atención al Usuario de CediMujer.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormState({
                      nombre: "",
                      telefono: "",
                      email: "",
                      destinatarioRecomendacion: "",
                      mensaje: "",
                    });
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#4A3A33] text-[#F7F2EC] text-xs font-extrabold"
                >
                  Enviar otro mensaje
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
