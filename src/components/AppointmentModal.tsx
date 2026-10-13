"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, User, Mail, Phone, CheckCircle2, Server } from "lucide-react";
import { ASSETS } from "@/config/assets";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  initialService = "Ginecología Integral",
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
  const [backendStatus, setBackendStatus] = useState<string | null>(null);
  const [loadingBackend, setLoadingBackend] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const testBackendConnection = async () => {
    setLoadingBackend(true);
    setBackendStatus(null);
    try {
      const res = await fetch("http://localhost:8000/api/health");
      const data = await res.json();
      setBackendStatus(`🟢 ${data.message} (${data.clinic})`);
    } catch {
      setBackendStatus("🔴 Error al conectar con el backend (Asegúrate de ejecutar FastAPI en el puerto 8000)");
    } finally {
      setLoadingBackend(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#4A3A33]/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-xl bg-[#F7F2EC] border border-[#E6D9C8] rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-[#E6D9C8] text-[#4A3A33] hover:bg-[#EBCFC6] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <div>
              <div className="flex items-center justify-between mb-4 pr-8">
                <div className="relative h-10 w-36 sm:w-44">
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
                <div className="p-2.5 rounded-2xl bg-[#8FC1BB] text-[#4A3A33] shadow-md">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-[#4A3A33]">Agendar Cita Médica</h3>
                  <p className="text-xs text-[#9A7B6C] font-semibold">Selecciona tu servicio y horario preferido</p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#4A3A33] uppercase tracking-wider mb-1.5">
                    Nombre Completo
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 w-4 h-4 text-[#9A7B6C]" />
                    <input
                      type="text"
                      required
                      placeholder="Ej. Dra. María González"
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#E6D9C8] text-[#4A3A33] placeholder-[#9A7B6C] focus:outline-none focus:border-[#8FC1BB] text-sm font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#4A3A33] uppercase tracking-wider mb-1.5">
                      Correo Electrónico
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3 w-4 h-4 text-[#9A7B6C]" />
                      <input
                        type="email"
                        required
                        placeholder="maria@ejemplo.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#E6D9C8] text-[#4A3A33] placeholder-[#9A7B6C] focus:outline-none focus:border-[#8FC1BB] text-sm font-semibold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#4A3A33] uppercase tracking-wider mb-1.5">
                      Teléfono / WhatsApp
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3 w-4 h-4 text-[#9A7B6C]" />
                      <input
                        type="tel"
                        required
                        placeholder="+57 300 123 4567"
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#E6D9C8] text-[#4A3A33] placeholder-[#9A7B6C] focus:outline-none focus:border-[#8FC1BB] text-sm font-semibold"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#4A3A33] uppercase tracking-wider mb-1.5">
                      Servicio de Interés
                    </label>
                    <select
                      value={formData.servicio}
                      onChange={(e) => setFormData({ ...formData, servicio: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E6D9C8] text-[#4A3A33] focus:outline-none focus:border-[#8FC1BB] text-sm font-semibold"
                    >
                      <option value="Ginecología Integral">Ginecología Integral</option>
                      <option value="Obstetricia & Control Prenatal">Obstetricia & Control Prenatal</option>
                      <option value="Ecografía 3D / 4D HD">Ecografía 3D / 4D HD</option>
                      <option value="Mastología & Salud Mamaria">Mastología & Salud Mamaria</option>
                      <option value="Endocrinología Femenina">Endocrinología Femenina</option>
                      <option value="Cirugía Mínimamente Invasiva">Cirugía Mínimamente Invasiva</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#4A3A33] uppercase tracking-wider mb-1.5">
                      Fecha Preferida
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.fecha}
                      onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E6D9C8] text-[#4A3A33] focus:outline-none focus:border-[#8FC1BB] text-sm font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4A3A33] uppercase tracking-wider mb-1.5">
                    Observaciones o Síntomas (Opcional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe brevemente el motivo de tu consulta..."
                    value={formData.mensaje}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E6D9C8] text-[#4A3A33] placeholder-[#9A7B6C] focus:outline-none focus:border-[#8FC1BB] text-sm font-semibold"
                  ></textarea>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-[#8FC1BB] hover:bg-[#8FC1BB]/90 text-[#4A3A33] font-extrabold text-sm shadow-md shadow-[#8FC1BB]/30 hover:scale-[1.02] active:scale-95 transition-all duration-300 border border-[#8FC1BB]"
                >
                  Confirmar Solicitud de Cita
                </button>
              </form>

              {/* Backend Test Connection */}
              <div className="mt-6 pt-4 border-t border-[#E6D9C8] flex flex-col gap-2">
                <button
                  onClick={testBackendConnection}
                  disabled={loadingBackend}
                  className="w-full py-2 px-3 rounded-xl bg-[#E6D9C8] hover:bg-[#EBCFC6] text-xs font-mono text-[#4A3A33] font-bold flex items-center justify-center gap-2 border border-[#E6D9C8]"
                >
                  <Server className="w-3.5 h-3.5 text-[#8FC1BB]" />
                  <span>{loadingBackend ? "Probando conexión con FastAPI..." : "Probar Conexión con Backend FastAPI"}</span>
                </button>

                {backendStatus && (
                  <p className="text-xs font-mono text-center p-2 rounded-lg bg-white border border-[#E6D9C8] text-[#4A3A33] font-semibold">
                    {backendStatus}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#CFE6E2] text-[#8FC1BB] flex items-center justify-center mx-auto mb-4 border border-[#8FC1BB]">
                <CheckCircle2 className="w-10 h-10 text-[#8FC1BB]" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#4A3A33]">¡Solicitud Recibida!</h3>
              <p className="mt-2 text-sm text-[#9A7B6C] font-semibold max-w-md mx-auto">
                Gracias, <strong className="text-[#4A3A33]">{formData.nombre}</strong>. Nuestro equipo de admisiones revisará tu solicitud para el servicio de <strong className="text-[#8FC1BB]">{formData.servicio}</strong> y te confirmaremos vía WhatsApp/correo a la brevedad.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="mt-6 px-6 py-2.5 rounded-xl bg-[#8FC1BB] text-[#4A3A33] font-extrabold text-xs uppercase tracking-wider hover:bg-[#8FC1BB]/90 shadow-md"
              >
                Cerrar Ventana
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
