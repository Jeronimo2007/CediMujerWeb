"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Navigation,
  Clock,
  Phone,
  Star,
  Mail,
  MessageSquareHeart,
  Send,
  CheckCircle2,
  User,
} from "lucide-react";
import { CONTACT_INFO } from "@/config/cedimujerContent";

interface LocationMapProps {
  isStandalonePage?: boolean;
}

export const LocationMap: React.FC<LocationMapProps> = ({
  isStandalonePage = false,
}) => {
  const [selectedFormOption, setSelectedFormOption] = useState(
    CONTACT_INFO.contactFormOptions[0].id
  );
  const [activeTab, setActiveTab] = useState<"sede" | "form">("sede");
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
        setActiveTab("form");
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
      className={`scroll-mt-20 ${
        isStandalonePage ? "py-4 sm:py-8" : "py-10 sm:py-18"
      } text-[#4A3A33] relative overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-12">
        {/* Header & Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-center sm:text-left">
          {!isStandalonePage && (
            <div>
              <span className="inline-block text-[10px] font-medium uppercase tracking-[0.22em] text-[#9A7B6C] mb-1.5">
                C.C. Aves María · Local 341-342
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#4A3A33] tracking-tight">
                Ubicación y <span className="italic text-[#9A7B6C]">contacto</span>
              </h2>
            </div>
          )}

          {/* Unified Switcher for Mobile & Desktop */}
          <div className="inline-flex self-center sm:self-auto p-1 rounded-full bg-[#F9EAEA] border border-[#F3D9D9] gap-1">
            <button
              type="button"
              onClick={() => setActiveTab("sede")}
              className={`py-2 px-4 sm:px-5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all ${
                activeTab === "sede"
                  ? "bg-[#4A3A33] text-[#FDF6F6]"
                  : "text-[#4A3A33]/80"
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-[#D7A7A8]" />
              <span>Sede y Mapa</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("form")}
              className={`py-2 px-4 sm:px-5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all ${
                activeTab === "form"
                  ? "bg-[#4A3A33] text-[#FDF6F6]"
                  : "text-[#4A3A33]/80"
              }`}
            >
              <MessageSquareHeart className="w-3.5 h-3.5 text-[#D7A7A8]" />
              <span>Escríbenos (5)</span>
            </button>
          </div>
        </div>

        {/* PARTE 1: SEDE Y MAPA */}
        {activeTab === "sede" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 bg-white/85 rounded-[1.75rem] p-6 sm:p-8 border border-[#F3D9D9] flex flex-col justify-between divide-y divide-[#F3D9D9]"
            >
              <div className="pb-4 space-y-1">
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#D7A7A8]">
                  Sabaneta, Antioquia
                </span>
                <h3 className="font-serif text-2xl font-normal text-[#4A3A33]">
                  C.C. Aves María · Local 341-342
                </h3>
                <p className="text-xs text-[#9A7B6C] font-normal">
                  Calle 75 sur No. 43 A -202
                </p>
              </div>

              <div className="py-4 grid grid-cols-2 gap-3">
                <a
                  href={CONTACT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-[#F9EAEA] hover:bg-[#F3D9D9]/70 transition-colors"
                >
                  <span className="text-[10px] text-[#9A7B6C] font-medium uppercase tracking-wider flex items-center gap-1">
                    <Phone className="w-3 h-3 text-[#D7A7A8]" />
                    WhatsApp
                  </span>
                  <p className="font-serif text-sm sm:text-base text-[#4A3A33] mt-0.5">
                    {CONTACT_INFO.whatsappDisplay}
                  </p>
                </a>

                <a
                  href={CONTACT_INFO.pbxTel}
                  className="p-3 rounded-2xl bg-[#F9EAEA] hover:bg-[#F3D9D9]/70 transition-colors"
                >
                  <span className="text-[10px] text-[#9A7B6C] font-medium uppercase tracking-wider flex items-center gap-1">
                    <Phone className="w-3 h-3 text-[#D7A7A8]" />
                    PBX Fijo
                  </span>
                  <p className="font-serif text-sm sm:text-base text-[#4A3A33] mt-0.5">
                    {CONTACT_INFO.pbxDisplay}
                  </p>
                </a>
              </div>

              <div className="py-4 space-y-1.5 text-xs text-[#4A3A33]/85">
                <div className="flex items-center gap-1.5 text-[10px] text-[#9A7B6C] font-medium uppercase tracking-wider mb-1">
                  <Clock className="w-3 h-3 text-[#D7A7A8]" />
                  <span>Horarios</span>
                </div>
                <div className="flex justify-between">
                  <span>Lun – Vie</span>
                  <span className="font-medium text-[#4A3A33]">7:00 AM – 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sábados</span>
                  <span className="font-medium text-[#4A3A33]">7:00 AM – 1:00 PM</span>
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <a
                    href={CONTACT_INFO.googleReviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 group"
                  >
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 fill-[#D7A7A8] text-[#D7A7A8]"
                      />
                    ))}
                    <span className="font-medium text-[#4A3A33] ml-1 group-hover:text-[#D7A7A8] transition-colors underline decoration-[#D7A7A8]">
                      5.0 Google (Ver reseñas)
                    </span>
                  </a>
                  <span className="text-[11px] text-[#9A7B6C]">{CONTACT_INFO.email}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="https://maps.google.com/?q=CC+Aves+Maria+Parque+Comercial,+Cl.+75+Sur+%2343+A+-202,+Sabaneta,+Antioquia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-full bg-[#4A3A33] text-[#FDF6F6] font-medium text-xs flex items-center justify-center gap-1.5"
                  >
                    <Navigation className="w-3 h-3 text-[#F7D6D6]" />
                    <span>Google Maps</span>
                  </a>

                  <a
                    href="https://waze.com/ul?q=Aves+Maria+Parque+Comercial+Sabaneta"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-full bg-[#F9EAEA] text-[#4A3A33] border border-[#F3D9D9] font-medium text-xs flex items-center justify-center gap-1.5"
                  >
                    <Navigation className="w-3 h-3 text-[#D7A7A8]" />
                    <span>Waze</span>
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 relative min-h-[300px] sm:min-h-[420px] rounded-[1.75rem] overflow-hidden border border-[#F3D9D9]"
            >
              <iframe
                title="Ubicación CediMujer Sabaneta"
                src={mapEmbedUrl}
                className="w-full h-full min-h-[300px] sm:min-h-[420px] border-0"
                loading="lazy"
                allowFullScreen
              />
            </motion.div>
          </div>
        )}

        {/* PARTE 2: FORMULARIO DE ATENCIÓN AL USUARIO */}
        <div
          id="atencion-cliente"
          className={`${activeTab === "form" ? "block" : "hidden"} max-w-3xl mx-auto`}
        >
          <div className="flex flex-wrap justify-center gap-1.5 mb-6">
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
                  className={`px-3.5 py-2 rounded-full text-[11px] sm:text-xs font-medium transition-all border ${
                    isSelected
                      ? "bg-[#4A3A33] text-[#FDF6F6] border-[#4A3A33]"
                      : "bg-[#F9EAEA] text-[#4A3A33]/80 border-[#F3D9D9] hover:text-[#4A3A33]"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          <div className="bg-white/85 rounded-[1.75rem] p-5 sm:p-8 border border-[#F3D9D9]">
            {!formSubmitted ? (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 w-3.5 h-3.5 text-[#9A7B6C]" />
                    <input
                      type="text"
                      required
                      placeholder="Nombre completo"
                      value={formState.nombre}
                      onChange={(e) =>
                        setFormState({ ...formState, nombre: e.target.value })
                      }
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#FDF6F6] border border-[#F3D9D9] text-xs text-[#4A3A33] focus:outline-none focus:border-[#D7A7A8]"
                    />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3 w-3.5 h-3.5 text-[#9A7B6C]" />
                    <input
                      type="tel"
                      required
                      placeholder="Celular / WhatsApp"
                      value={formState.telefono}
                      onChange={(e) =>
                        setFormState({ ...formState, telefono: e.target.value })
                      }
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#FDF6F6] border border-[#F3D9D9] text-xs text-[#4A3A33] focus:outline-none focus:border-[#D7A7A8]"
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 w-3.5 h-3.5 text-[#9A7B6C]" />
                    <input
                      type="email"
                      required
                      placeholder="Correo electrónico"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#FDF6F6] border border-[#F3D9D9] text-xs text-[#4A3A33] focus:outline-none focus:border-[#D7A7A8]"
                    />
                  </div>
                </div>

                {selectedFormOption === "recomendar" && (
                  <input
                    type="text"
                    placeholder="Nombre o correo de quien recomiendas"
                    value={formState.destinatarioRecomendacion}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        destinatarioRecomendacion: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FDF6F6] border border-[#F3D9D9] text-xs text-[#4A3A33] focus:outline-none focus:border-[#D7A7A8]"
                  />
                )}

                <textarea
                  rows={3}
                  required
                  placeholder={activeOptionObj.placeholder}
                  value={formState.mensaje}
                  onChange={(e) =>
                    setFormState({ ...formState, mensaje: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FDF6F6] border border-[#F3D9D9] text-xs text-[#4A3A33] focus:outline-none focus:border-[#D7A7A8]"
                />

                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#4A3A33] hover:bg-[#4A3A33]/90 text-[#FDF6F6] font-medium text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-3.5 h-3.5 text-[#F7D6D6]" />
                  <span>( Enviar {activeOptionObj.label} )</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 className="w-8 h-8 text-[#D7A7A8] mx-auto" />
                <h4 className="font-serif text-xl text-[#4A3A33]">
                  Mensaje recibido
                </h4>
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
                  className="px-5 py-2 rounded-full bg-[#4A3A33] text-[#FDF6F6] text-xs font-medium"
                >
                  Enviar otro
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
