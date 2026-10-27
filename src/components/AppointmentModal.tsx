"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  User,
  Mail,
  Phone,
  CheckCircle2,
  MessageCircle,
  MapPin,
} from "lucide-react";
import { ASSETS } from "@/config/assets";
import {
  CONTACT_INFO,
  EMBARAZO_SERVICES,
  GINECOLOGIA_SERVICES,
  TELEMEDICINA_SERVICES,
} from "@/config/cedimujerContent";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  initialService = "Consulta Ginecológica",
}) => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    servicio: initialService,
    fecha: "",
    mensaje: "",
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, servicio: initialService }));
    }
  }, [initialService, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (!isOpen) return null;

  const allServicesGrouped = [
    {
      group: "Embarazo - Consultas y Bienestar Fetal",
      items: [
        ...EMBARAZO_SERVICES.consultas.map((s) => s.title),
        ...EMBARAZO_SERVICES.bienestarFetal.map((s) => s.title),
        ...EMBARAZO_SERVICES.ecografias.map((s) => s.title),
      ],
    },
    {
      group: "Ginecología - Ecografías",
      items: GINECOLOGIA_SERVICES.ecografias.map((s) => s.title),
    },
    {
      group: "Ginecología - Consultas",
      items: GINECOLOGIA_SERVICES.consultas.map((s) => s.title),
    },
    {
      group: "Ginecología - Tamizajes Preventivos",
      items: GINECOLOGIA_SERVICES.tamizajes.map((s) => s.title),
    },
    {
      group: "Ginecología - Procedimientos",
      items: GINECOLOGIA_SERVICES.procedimientos.map((s) => s.title),
    },
    {
      group: "Telemedicina",
      items: TELEMEDICINA_SERVICES.map((s) => s.title),
    },
  ];

  const flatServiceTitles = allServicesGrouped.flatMap((g) => g.items);
  const isCustomService =
    formData.servicio && !flatServiceTitles.includes(formData.servicio);

  const whatsappDirectBookingUrl = `https://wa.me/${
    CONTACT_INFO.whatsappRaw
  }?text=${encodeURIComponent(
    `Hola CediMujer, mi nombre es ${
      formData.nombre || "[Nombre]"
    }. Deseo agendar una cita para: ${formData.servicio}${
      formData.fecha ? ` (Fecha preferida: ${formData.fecha})` : ""
    }.`
  )}`;

  return (
    <AnimatePresence>
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#4A3A33]/80 backdrop-blur-sm overflow-y-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-xl max-h-[92dvh] overflow-y-auto bg-[#F7F2EC] border border-[#E6D9C8] rounded-3xl p-5 sm:p-8 shadow-2xl [transform:translateZ(0)]"
        >
          {/* Sticky Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar ventana"
            className="sticky top-0 float-right z-20 p-2 rounded-full bg-[#E6D9C8] text-[#4A3A33] hover:bg-[#EBCFC6] transition-colors shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <div>
              <div className="flex items-center justify-between mb-3 pr-10">
                <div className="relative h-9 w-32 sm:h-10 sm:w-40">
                  <Image
                    src={ASSETS.logo.primary}
                    alt="Logo CediMujer"
                    fill
                    unoptimized
                    className="object-contain object-left"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 rounded-2xl bg-[#8FC1BB] text-[#4A3A33] shadow-md shrink-0">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#4A3A33]">
                    Agendar Cita en CediMujer
                  </h3>
                  <p className="text-xs text-[#9A7B6C] font-semibold flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#8FC1BB]" />
                    <span>{CONTACT_INFO.addressShort} · C.C. Aves María</span>
                  </p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="mt-4 sm:mt-5 space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-[#4A3A33] uppercase tracking-wider mb-1">
                    Nombre Completo
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 w-4 h-4 text-[#9A7B6C]" />
                    <input
                      type="text"
                      required
                      placeholder="Ej. María González"
                      value={formData.nombre}
                      onChange={(e) =>
                        setFormData({ ...formData, nombre: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#E6D9C8] text-[#4A3A33] placeholder-[#9A7B6C] focus:outline-none focus:border-[#8FC1BB] text-sm font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-[#4A3A33] uppercase tracking-wider mb-1">
                      Correo Electrónico
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3 w-4 h-4 text-[#9A7B6C]" />
                      <input
                        type="email"
                        required
                        placeholder="maria@ejemplo.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#E6D9C8] text-[#4A3A33] placeholder-[#9A7B6C] focus:outline-none focus:border-[#8FC1BB] text-sm font-semibold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#4A3A33] uppercase tracking-wider mb-1">
                      Teléfono / WhatsApp
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3 w-4 h-4 text-[#9A7B6C]" />
                      <input
                        type="tel"
                        required
                        placeholder="+57 311 000 0000"
                        value={formData.telefono}
                        onChange={(e) =>
                          setFormData({ ...formData, telefono: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#E6D9C8] text-[#4A3A33] placeholder-[#9A7B6C] focus:outline-none focus:border-[#8FC1BB] text-sm font-semibold"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-[#4A3A33] uppercase tracking-wider mb-1">
                      Servicio o Procedimiento
                    </label>
                    <select
                      value={formData.servicio}
                      onChange={(e) =>
                        setFormData({ ...formData, servicio: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E6D9C8] text-[#4A3A33] focus:outline-none focus:border-[#8FC1BB] text-xs sm:text-sm font-semibold"
                    >
                      {isCustomService && (
                        <option value={formData.servicio}>
                          {formData.servicio}
                        </option>
                      )}
                      {allServicesGrouped.map((grp) => (
                        <optgroup key={grp.group} label={grp.group}>
                          {grp.items.map((srv) => (
                            <option key={srv} value={srv}>
                              {srv}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#4A3A33] uppercase tracking-wider mb-1">
                      Fecha Preferida
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.fecha}
                      onChange={(e) =>
                        setFormData({ ...formData, fecha: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E6D9C8] text-[#4A3A33] focus:outline-none focus:border-[#8FC1BB] text-sm font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4A3A33] uppercase tracking-wider mb-1">
                    Observaciones o Semana Gestacional (Opcional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Indica motivo de consulta, semanas de embarazo o especialista de preferencia..."
                    value={formData.mensaje}
                    onChange={(e) =>
                      setFormData({ ...formData, mensaje: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-xl bg-white border border-[#E6D9C8] text-[#4A3A33] placeholder-[#9A7B6C] focus:outline-none focus:border-[#8FC1BB] text-sm font-semibold"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-[#8FC1BB] hover:bg-[#8FC1BB]/90 text-[#4A3A33] font-extrabold text-sm shadow-md shadow-[#8FC1BB]/30 hover:scale-[1.01] active:scale-95 transition-all duration-300 border border-[#8FC1BB]"
                >
                  Confirmar Solicitud de Cita
                </button>
              </form>

              {/* Direct WhatsApp & PBX Contact Bar */}
              <div className="mt-4 pt-3.5 border-t border-[#E6D9C8] flex flex-col sm:flex-row gap-2">
                <a
                  href={whatsappDirectBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#4A3A33] hover:bg-[#4A3A33]/90 text-xs text-[#F7F2EC] font-bold flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#8FC1BB]" />
                  <span>Agendar por WhatsApp ({CONTACT_INFO.whatsappDisplay})</span>
                </a>
                <a
                  href={CONTACT_INFO.pbxTel}
                  className="py-2.5 px-3 rounded-xl bg-[#E6D9C8] hover:bg-[#EBCFC6] text-xs text-[#4A3A33] font-bold flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#4A3A33]" />
                  <span>PBX: {CONTACT_INFO.pbxDisplay}</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#CFE6E2] text-[#8FC1BB] flex items-center justify-center mx-auto mb-2 border border-[#8FC1BB]">
                <CheckCircle2 className="w-10 h-10 text-[#8FC1BB]" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#4A3A33]">
                ¡Solicitud de Cita Lista!
              </h3>
              <p className="text-sm text-[#9A7B6C] font-semibold max-w-md mx-auto">
                Gracias, <strong className="text-[#4A3A33]">{formData.nombre}</strong>. Hemos registrado tu solicitud para{" "}
                <strong className="text-[#4A3A33]">{formData.servicio}</strong>. También puedes enviarla directamente a nuestra línea de Asesoría por WhatsApp para confirmación inmediata:
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                <a
                  href={whatsappDirectBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-[#8FC1BB] text-[#4A3A33] font-extrabold text-xs uppercase tracking-wider hover:bg-[#8FC1BB]/90 shadow-md inline-flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Confirmar por WhatsApp ({CONTACT_INFO.whatsappDisplay})</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="px-6 py-3 rounded-xl bg-[#E6D9C8] text-[#4A3A33] font-extrabold text-xs uppercase tracking-wider hover:bg-[#EBCFC6]"
                >
                  Cerrar Ventana
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
