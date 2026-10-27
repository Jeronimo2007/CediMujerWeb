"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Menu,
  X,
  Calendar,
  ChevronDown,
  Baby,
  Stethoscope,
  Video,
  Building2,
  BookOpen,
  MessageSquareHeart,
  Calculator,
} from "lucide-react";
import { ASSETS } from "@/config/assets";
import { CONTACT_INFO } from "@/config/cedimujerContent";

interface NavbarProps {
  onOpenAppointment?: (serviceName?: string) => void;
  onOpenCalculator?: () => void;
  onNavigateHome?: (targetHash?: string) => void;
}

interface SubMenuItem {
  label: string;
  href: string;
  subKey?: string;
  itemId?: string;
  isCalculator?: boolean;
  badge?: string;
}

interface MenuGroup {
  name: string;
  href: string;
  icon: React.ElementType;
  columns?: {
    heading: string;
    items: SubMenuItem[];
  }[];
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAppointment,
  onOpenCalculator,
  onNavigateHome,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDesktopDropdown, setOpenDesktopDropdown] = useState<string | null>(null);
  const [openMobileAccordion, setOpenMobileAccordion] = useState<string | null>("Embarazo");
  const lastScrollYRef = useRef(0);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const prevScrollY = lastScrollYRef.current;

          const scrolled = currentScrollY > 30;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));

          if (currentScrollY > 120 && currentScrollY - prevScrollY > 20 && !mobileMenuOpen) {
            setIsVisible(false);
            setOpenDesktopDropdown(null);
          } else if (prevScrollY - currentScrollY > 10 || currentScrollY <= 80) {
            setIsVisible(true);
          }

          lastScrollYRef.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

  const menuGroups: MenuGroup[] = [
    {
      name: "Embarazo",
      href: "#embarazo",
      icon: Baby,
      columns: [
        {
          heading: "Consultas",
          items: [
            {
              label: "Consulta preconcepcional",
              href: "#embarazo",
              subKey: "embarazo-consultas",
              itemId: "emb-consulta-preconcepcional",
            },
            {
              label: "Consulta de control prenatal - Control de embarazo",
              href: "#embarazo",
              subKey: "embarazo-consultas",
              itemId: "emb-control-prenatal",
            },
            {
              label: "Anticoncepción posparto",
              href: "#embarazo",
              subKey: "embarazo-consultas",
              itemId: "emb-anticoncepcion-posparto",
            },
          ],
        },
        {
          heading: "Pruebas de bienestar fetal",
          items: [
            {
              label: "Perfil biofísico fetal",
              href: "#embarazo",
              subKey: "embarazo-bienestar",
              itemId: "emb-perfil-biofisico",
            },
            {
              label: "Doppler fetal",
              href: "#embarazo",
              subKey: "embarazo-bienestar",
              itemId: "emb-doppler-fetal",
            },
            {
              label: "Monitoreo fetal electrónico",
              href: "#embarazo",
              subKey: "embarazo-bienestar",
              itemId: "emb-monitoreo-fetal",
            },
          ],
        },
        {
          heading: "Otras secciones de embarazo",
          items: [
            {
              label: "Ecografías (3D/4D HD Live, Detalle Anatómico, Genética)",
              href: "#embarazo",
              subKey: "embarazo-ecografias",
              badge: "HD Live",
            },
            {
              label: "Calculadora gestacional",
              href: "#calculadora",
              isCalculator: true,
              badge: "Interactivo",
            },
          ],
        },
      ],
    },
    {
      name: "Ginecología",
      href: "#ginecologia",
      icon: Stethoscope,
      columns: [
        {
          heading: "Ecografías",
          items: [
            {
              label: "Ecografía pélvica transvaginal",
              href: "#ginecologia",
              subKey: "ginecologia-ecografias",
              itemId: "gin-eco-transvaginal",
            },
            {
              label: "Ecografía pélvica suprapúbica",
              href: "#ginecologia",
              subKey: "ginecologia-ecografias",
              itemId: "gin-eco-suprapubica",
            },
            {
              label: "Ecografía de piso pélvico",
              href: "#ginecologia",
              subKey: "ginecologia-ecografias",
              itemId: "gin-eco-piso-pelvico",
            },
            {
              label: "Monitoreo de folículo",
              href: "#ginecologia",
              subKey: "ginecologia-ecografias",
              itemId: "gin-monitoreo-foliculo",
            },
            {
              label: "Ecografía de mama o de seno",
              href: "#ginecologia",
              subKey: "ginecologia-ecografias",
              itemId: "gin-eco-mama",
            },
          ],
        },
        {
          heading: "Consultas y Tamizajes",
          items: [
            {
              label: "Consulta Preconcepcional",
              href: "#ginecologia",
              subKey: "ginecologia-consultas",
              itemId: "gin-consulta-preconcepcional",
            },
            {
              label: "Consulta Ginecológica",
              href: "#ginecologia",
              subKey: "ginecologia-consultas",
              itemId: "gin-consulta-ginecologica",
            },
            {
              label: "Consulta de Planificación Familiar",
              href: "#ginecologia",
              subKey: "ginecologia-consultas",
              itemId: "gin-consulta-planificacion",
            },
            {
              label: "Infertilidad",
              href: "#ginecologia",
              subKey: "ginecologia-consultas",
              itemId: "gin-consulta-infertilidad",
            },
            {
              label: "Consulta de mama",
              href: "#ginecologia",
              subKey: "ginecologia-consultas",
              itemId: "gin-consulta-mama",
            },
            {
              label: "Tamizaje Ginecológico Básico",
              href: "#ginecologia",
              subKey: "ginecologia-tamizajes",
              itemId: "gin-tamizaje-basico",
              badge: "Paquete",
            },
            {
              label: "Tamizaje de mama",
              href: "#ginecologia",
              subKey: "ginecologia-tamizajes",
              itemId: "gin-tamizaje-mama",
              badge: "Paquete",
            },
            {
              label: "Tamizaje Ginecológico Completo",
              href: "#ginecologia",
              subKey: "ginecologia-tamizajes",
              itemId: "gin-tamizaje-completo",
              badge: "4 en 1",
            },
          ],
        },
        {
          heading: "Procedimientos",
          items: [
            {
              label: "Colposcopia",
              href: "#ginecologia",
              subKey: "ginecologia-procedimientos",
              itemId: "gin-proc-colposcopia",
            },
            {
              label: "Toma de citología",
              href: "#ginecologia",
              subKey: "ginecologia-procedimientos",
              itemId: "gin-proc-citologia",
            },
            {
              label: "Test de VPH o Papiloma virus",
              href: "#ginecologia",
              subKey: "ginecologia-procedimientos",
              itemId: "gin-proc-test-vph",
            },
            {
              label: "Colocación o retiro de dispositivo intrauterino",
              href: "#ginecologia",
              subKey: "ginecologia-procedimientos",
              itemId: "gin-proc-diu",
            },
            {
              label: "Colocación o retiro de implantes subdérmicos",
              href: "#ginecologia",
              subKey: "ginecologia-procedimientos",
              itemId: "gin-proc-implante-subdermico",
            },
            {
              label: "Topicaciones",
              href: "#ginecologia",
              subKey: "ginecologia-procedimientos",
              itemId: "gin-proc-topicaciones",
            },
          ],
        },
      ],
    },
    {
      name: "Telemedicina",
      href: "#telemedicina",
      icon: Video,
      columns: [
        {
          heading: "Modalidades de Teleconsulta",
          items: [
            {
              label: "Teleconsulta con especialista en Ginecología",
              href: "#telemedicina",
              subKey: "telemedicina",
              itemId: "tele-ginecologia",
            },
            {
              label: "Teleconsulta de planificación familiar",
              href: "#telemedicina",
              subKey: "telemedicina",
              itemId: "tele-planificacion",
            },
            {
              label: "Teleconsulta de Infertilidad",
              href: "#telemedicina",
              subKey: "telemedicina",
              itemId: "tele-infertilidad",
            },
          ],
        },
      ],
    },
    {
      name: "Quiénes Somos",
      href: "#nosotros",
      icon: Building2,
      columns: [
        {
          heading: "Conoce Nuestra Institución",
          items: [
            {
              label: "Nuestra Sede (C.C. Aves María, Sabaneta)",
              href: "#nosotros",
              subKey: "nuestra-sede",
            },
            {
              label: "Nuestra Institución (Misión, Visión y Valores)",
              href: "#nosotros",
              subKey: "nuestra-institucion",
            },
            {
              label: "Especialistas (Equipo Médico CediMujer)",
              href: "#nosotros",
              subKey: "especialistas",
            },
            {
              label: "Asociación de usuarios",
              href: "#nosotros",
              subKey: "asociacion-usuarios",
            },
          ],
        },
      ],
    },
    {
      name: "Blog y FAQ",
      href: "#blog-faq",
      icon: BookOpen,
      columns: [
        {
          heading: "Artículos Informativos y Preguntas Frecuentes",
          items: [
            { label: "Colocación de dispositivo intrauterino Mirena", href: "#blog-faq", itemId: "blog-diu-mirena" },
            { label: "Las Ecografías durante el embarazo", href: "#blog-faq", itemId: "blog-ecografias-embarazo" },
            { label: "Prolapso genital femenino", href: "#blog-faq", itemId: "blog-prolapso-genital" },
            { label: "Menopausia", href: "#blog-faq", itemId: "blog-menopausia" },
            { label: "Cáncer de mama", href: "#blog-faq", itemId: "blog-cancer-mama" },
            { label: "¿Cómo combatir los cólicos menstruales?", href: "#blog-faq", itemId: "blog-colicos-menstruales" },
            { label: "Cáncer de Cérvix", href: "#blog-faq", itemId: "blog-cancer-cervix" },
          ],
        },
      ],
    },
    {
      name: "Contacto",
      href: "#atencion-cliente",
      icon: MessageSquareHeart,
      columns: [
        {
          heading: "Atención al Cliente y Formulario Oficial",
          items: [
            { label: "Escríbanos mensaje de contacto", href: "#atencion-cliente", subKey: "contacto" },
            { label: "Recomendar nuestro sistema", href: "#atencion-cliente", subKey: "recomendar" },
            { label: "Enviar sugerencias", href: "#atencion-cliente", subKey: "sugerencias" },
            { label: "Depositar un testimonio", href: "#atencion-cliente", subKey: "testimonio" },
            { label: "Quejas y reclamos", href: "#atencion-cliente", subKey: "reclamos" },
          ],
        },
      ],
    },
  ];

  const activeGroup = menuGroups.find((g) => g.name === openDesktopDropdown) || null;

  const triggerCustomNavigation = (
    e: React.MouseEvent,
    item: { href?: string; subKey?: string; itemId?: string; isCalculator?: boolean }
  ) => {
    e.preventDefault();
    setOpenDesktopDropdown(null);
    setMobileMenuOpen(false);

    if (item.isCalculator && onOpenCalculator) {
      onOpenCalculator();
      return;
    }

    if (onNavigateHome) {
      onNavigateHome(item.href || "#inicio");
    }

    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("cedimujer:navigate", {
          detail: {
            href: item.href,
            subKey: item.subKey,
            itemId: item.itemId,
          },
        })
      );
      if (item.href) {
        const targetEl = document.querySelector(item.href);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, 100);
  };

  const handleMouseEnterGroup = (name: string) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setOpenDesktopDropdown(name);
  };

  const handleMouseLeaveGroup = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDesktopDropdown(null);
    }, 140);
  };

  return (
    <>
      <header
        className={`fixed top-2 sm:top-3.5 inset-x-0 z-50 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto will-change-transform ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-28 opacity-0 pointer-events-none"
        }`}
      >
        <div
          onMouseLeave={handleMouseLeaveGroup}
          className={`relative w-full flex items-center justify-between gap-2 px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 rounded-2xl sm:rounded-full transition-shadow duration-300 border border-[#E6D9C8] backdrop-blur-md ${
            isScrolled
              ? "bg-[#F7F2EC]/95 shadow-xl shadow-[#4A3A33]/10"
              : "bg-[#F7F2EC]/95 shadow-lg shadow-[#4A3A33]/5"
          }`}
        >
          {/* Logo Brand */}
          <a
            href="#inicio"
            onClick={(e) => triggerCustomNavigation(e, { href: "#inicio" })}
            className="flex items-center shrink-0 group"
          >
            <div className="relative h-8 w-28 sm:h-9 sm:w-32 xl:h-10 xl:w-36 flex items-center transition-transform duration-300 group-hover:scale-105">
              <Image
                src={ASSETS.logo.primary}
                alt="CediMujer - Centro de Diagnóstico Especializado en Salud para la Mujer"
                fill
                priority
                decoding="async"
                unoptimized
                className="object-contain object-left"
              />
            </div>
          </a>

          {/* Desktop Navigation (lg and above) */}
          <nav className="hidden lg:flex items-center gap-0.5 bg-[#E6D9C8]/60 p-1 rounded-full border border-[#E6D9C8]/80 min-w-0">
            {menuGroups.map((group) => {
              const isOpen = openDesktopDropdown === group.name;
              return (
                <button
                  key={group.name}
                  type="button"
                  onMouseEnter={() => handleMouseEnterGroup(group.name)}
                  onClick={(e) => triggerCustomNavigation(e, { href: group.href })}
                  className={`inline-flex items-center gap-1 px-2.5 xl:px-3 py-1.5 text-[11px] xl:text-xs font-extrabold rounded-full transition-colors duration-150 whitespace-nowrap ${
                    isOpen
                      ? "bg-[#8FC1BB] text-[#4A3A33] shadow-xs"
                      : "text-[#4A3A33] hover:bg-[#F7F2EC]"
                  }`}
                >
                  <span>{group.name}</span>
                  {group.columns && (
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#4A3A33]" : "text-[#9A7B6C]"
                      }`}
                    />
                  )}
                </button>
              );
            })}

            <button
              type="button"
              onMouseEnter={() => setOpenDesktopDropdown(null)}
              onClick={onOpenCalculator}
              className="ml-0.5 px-2.5 xl:px-3 py-1.5 text-[11px] xl:text-xs font-extrabold text-[#4A3A33] bg-[#EBCFC6] hover:bg-[#D7A7A8] rounded-full transition-colors duration-150 inline-flex items-center gap-1 whitespace-nowrap"
            >
              <Calculator className="w-3 h-3 text-[#4A3A33] shrink-0" />
              <span>Calculadora</span>
            </button>
          </nav>

          {/* Action Buttons & Mobile/Tablet Menu Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={`WhatsApp Asesoría: ${CONTACT_INFO.whatsappDisplay}`}
              aria-label="WhatsApp Asesoría"
              className="hidden xl:inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#E6D9C8]/70 hover:bg-[#CFE6E2] text-[#4A3A33] border border-[#E6D9C8] transition-colors shrink-0"
            >
              <Phone className="w-4 h-4 text-[#4A3A33]" />
            </a>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setOpenDesktopDropdown(null);
                if (onOpenAppointment) onOpenAppointment();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl sm:rounded-full text-xs font-extrabold text-[#4A3A33] bg-[#8FC1BB] hover:bg-[#8FC1BB]/90 shadow-md shadow-[#8FC1BB]/25 hover:scale-[1.02] active:scale-95 transition-all duration-200 border border-[#8FC1BB] whitespace-nowrap shrink-0"
            >
              <Calendar className="w-3.5 h-3.5 text-[#4A3A33] shrink-0" />
              <span>Agendar Cita</span>
            </button>

            {/* Menu Button for Mobile & Tablet (< lg) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl sm:rounded-full bg-[#E6D9C8] text-[#4A3A33] hover:bg-[#EBCFC6] transition-colors shrink-0"
              aria-label="Abrir menú de navegación"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Desktop Mega-Dropdown Panel: Absolutely positioned below the pill so it NEVER jumps or shifts layout */}
          <AnimatePresence>
            {activeGroup && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                onMouseEnter={() => {
                  if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
                }}
                onMouseLeave={handleMouseLeaveGroup}
                className="hidden lg:block absolute left-0 right-0 top-full pt-2.5 z-50"
              >
                <div className="bg-[#F7F2EC] border-2 border-[#E6D9C8] rounded-3xl p-5 xl:p-6 shadow-2xl shadow-[#4A3A33]/20">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-[#E6D9C8]">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-[#8FC1BB] text-[#4A3A33]">
                        <activeGroup.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs xl:text-sm font-black text-[#4A3A33] uppercase tracking-wider">
                          Sección: {activeGroup.name}
                        </h4>
                        <p className="text-[11px] text-[#9A7B6C] font-semibold">
                          Haz clic en cualquier subsección para ir directamente a su contenido
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] font-bold text-[#9A7B6C]">
                      <span>WhatsApp: {CONTACT_INFO.whatsappDisplay}</span>
                      <span>•</span>
                      <span>PBX: {CONTACT_INFO.pbxDisplay}</span>
                    </div>
                  </div>

                  <div
                    className={`grid gap-5 ${
                      (activeGroup.columns?.length || 1) >= 3
                        ? "grid-cols-3"
                        : (activeGroup.columns?.length || 1) === 2
                        ? "grid-cols-2"
                        : "grid-cols-1"
                    }`}
                  >
                    {activeGroup.columns?.map((col) => (
                      <div key={col.heading} className="space-y-2">
                        <h5 className="text-[11px] font-black uppercase tracking-wider text-[#CFE6E2] bg-[#4A3A33] px-3 py-1 rounded-lg w-fit">
                          {col.heading}
                        </h5>
                        <ul
                          className={
                            (activeGroup.columns?.length || 1) === 1
                              ? "grid grid-cols-2 xl:grid-cols-3 gap-1.5"
                              : "space-y-1"
                          }
                        >
                          {col.items.map((item) => (
                            <li key={item.label}>
                              <button
                                type="button"
                                onClick={(e) => triggerCustomNavigation(e, item)}
                                className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-[#4A3A33] hover:bg-[#CFE6E2]/65 transition-colors flex items-center justify-between gap-2 group/item"
                              >
                                <span className="group-hover/item:translate-x-0.5 transition-transform">
                                  {item.label}
                                </span>
                                {item.badge && (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#EBCFC6] text-[#4A3A33] shrink-0">
                                    {item.badge}
                                  </span>
                                )}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Mobile & Tablet Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-[#4A3A33]/40 backdrop-blur-[2px] lg:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-x-3 sm:inset-x-6 top-[68px] sm:top-[76px] z-40 max-w-xl ml-auto bg-[#F7F2EC] border border-[#E6D9C8] rounded-3xl p-4 sm:p-6 lg:hidden shadow-2xl max-h-[calc(100dvh-84px)] overflow-y-auto"
            >
              <div className="space-y-2">
                {menuGroups.map((group) => {
                  const IconComp = group.icon;
                  const isExpanded = openMobileAccordion === group.name;
                  return (
                    <div
                      key={group.name}
                      className="rounded-2xl border border-[#E6D9C8] bg-white/70 overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setOpenMobileAccordion(isExpanded ? null : group.name)
                        }
                        className="w-full px-4 py-3 flex items-center justify-between text-left font-extrabold text-sm text-[#4A3A33] hover:bg-[#E6D9C8]/40 transition-colors"
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="p-1.5 rounded-lg bg-[#8FC1BB]/30 text-[#4A3A33]">
                            <IconComp className="w-4 h-4" />
                          </span>
                          <span>{group.name}</span>
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#9A7B6C] transition-transform ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {isExpanded && group.columns && (
                        <div className="px-4 pb-3 pt-1 space-y-3 border-t border-[#E6D9C8]/60 bg-[#F7F2EC]/60">
                          {group.columns.map((col) => (
                            <div key={col.heading} className="space-y-1">
                              <p className="text-[11px] font-black uppercase tracking-wider text-[#9A7B6C] px-2 pt-1">
                                {col.heading}
                              </p>
                              {col.items.map((item) => (
                                <button
                                  key={item.label}
                                  type="button"
                                  onClick={(e) => triggerCustomNavigation(e, item)}
                                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-[#4A3A33] hover:bg-[#CFE6E2]/60 flex items-center justify-between gap-2"
                                >
                                  <span>{item.label}</span>
                                  {item.badge && (
                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#EBCFC6] text-[#4A3A33] font-black">
                                      {item.badge}
                                    </span>
                                  )}
                                </button>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Contact Info & Action Buttons in Mobile Menu */}
              <div className="mt-4 pt-4 border-t border-[#E6D9C8] space-y-2.5">
                <div className="p-3 rounded-2xl bg-[#E6D9C8]/40 border border-[#E6D9C8] text-xs space-y-1">
                  <p className="font-extrabold text-[#4A3A33]">
                    📍 {CONTACT_INFO.addressFull}
                  </p>
                  <p className="font-bold text-[#9A7B6C]">
                    📞 WhatsApp: {CONTACT_INFO.whatsappDisplay} • PBX: {CONTACT_INFO.pbxDisplay}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <a
                    href={CONTACT_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-extrabold text-[#4A3A33] bg-[#E6D9C8]/80 hover:bg-[#E6D9C8] border border-[#9A7B6C]/25 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#8FC1BB]" />
                    <span>WhatsApp {CONTACT_INFO.whatsappDisplay}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (onOpenAppointment) onOpenAppointment();
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-extrabold text-[#4A3A33] bg-[#8FC1BB] hover:bg-[#8FC1BB]/90 shadow-md transition-colors"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Agendar Cita Médica</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
