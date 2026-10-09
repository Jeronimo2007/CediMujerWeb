"use client";

import React from "react";
import { Heart, Phone, Mail, MapPin, ArrowRight, Share2, Globe, MessageCircle } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer id="contacto" className="bg-[#4A3A33] text-[#E6D9C8] border-t border-[#9A7B6C]/40 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#9A7B6C]/30">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#inicio" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#8FC1BB] flex items-center justify-center shadow-md">
                <Heart className="w-5 h-5 text-[#4A3A33] fill-[#4A3A33]/20" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold tracking-tight text-[#F7F2EC]">
                  Cedi<span className="text-[#8FC1BB]">Mujer</span>
                </span>
                <span className="text-[10px] tracking-wider uppercase text-[#E6D9C8] font-semibold">
                  Salud Integral Femenina
                </span>
              </div>
            </a>

            <p className="text-sm text-[#E6D9C8]/80 leading-relaxed max-w-sm">
              Centro médico especializado en la salud de la mujer. Diagnóstico por imágenes de alta precisión, control prenatal y consulta ginecológica avanzada con trato empático y humano.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="#" aria-label="Web" className="w-9 h-9 rounded-xl bg-[#9A7B6C]/30 border border-[#9A7B6C]/40 hover:border-[#8FC1BB] text-[#F7F2EC] hover:text-[#8FC1BB] flex items-center justify-center transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" aria-label="WhatsApp" className="w-9 h-9 rounded-xl bg-[#9A7B6C]/30 border border-[#9A7B6C]/40 hover:border-[#8FC1BB] text-[#F7F2EC] hover:text-[#8FC1BB] flex items-center justify-center transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Compartir" className="w-9 h-9 rounded-xl bg-[#9A7B6C]/30 border border-[#9A7B6C]/40 hover:border-[#8FC1BB] text-[#F7F2EC] hover:text-[#8FC1BB] flex items-center justify-center transition-colors">
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold text-[#F7F2EC] uppercase tracking-wider">Navegación</h4>
            <ul className="space-y-2.5 text-sm font-semibold">
              {["Inicio", "Sobre CediMujer", "Servicios Médicos", "Nuestras Cifras", "Acreditaciones"].map((item, index) => (
                <li key={index}>
                  <a href={`#${item.toLowerCase().replace(/ /g, "")}`} className="hover:text-[#8FC1BB] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold text-[#F7F2EC] uppercase tracking-wider">Contacto & Citas</h4>
            <ul className="space-y-3 text-sm font-semibold">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#8FC1BB] shrink-0 mt-0.5" />
                <span>Av. Principal de Ciencias Médicas, Edif. CediMujer, Piso 4</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#8FC1BB] shrink-0" />
                <span>+57 (601) 555-0199 / +57 300 987 6543</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#8FC1BB] shrink-0" />
                <span>contacto@cedimujer.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold text-[#F7F2EC] uppercase tracking-wider">Boletín Médico</h4>
            <p className="text-xs text-[#E6D9C8]/80 font-medium">
              Recibe artículos sobre salud preventiva femenina y jornadas de salud.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F7F2EC] border border-[#E6D9C8] text-[#4A3A33] placeholder-[#9A7B6C] focus:outline-none focus:border-[#8FC1BB] text-xs font-semibold"
                />
                <button
                  type="submit"
                  aria-label="Suscribirse al boletín"
                  className="absolute right-1.5 top-1.5 p-1.5 rounded-lg bg-[#8FC1BB] text-[#4A3A33] hover:bg-[#8FC1BB]/90 transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Bottom Disclaimer and Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#E6D9C8]/70 gap-4 font-semibold">
          <p>© {new Date().getFullYear()} CediMujer - Centro de Diagnóstico y Salud Integral de la Mujer. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#F7F2EC] transition-colors">Términos & Condiciones</a>
            <a href="#" className="hover:text-[#F7F2EC] transition-colors">Política de Privacidad</a>
            <a href="#" className="hover:text-[#F7F2EC] transition-colors">Aviso Legal Médico</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
