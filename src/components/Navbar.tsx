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
  Home,
} from "lucide-react";
import { ASSETS } from "@/config/assets";
import { CONTACT_INFO } from "@/config/cedimujerContent";
import type { AppSectionView } from "@/components/SectionPageView";

interface NavbarProps {
  currentView?: AppSectionView;
  onSelectSection?: (
    view: AppSectionView,
    subKey?: string,
    itemId?: string
  ) => void;
  onOpenAppointment?: (serviceName?: string) => void;
  onOpenCalculator?: () => void;
  onNavigateHome?: (targetHash?: string) => void;
}

interface SubMenuItem {
  label: string;
  viewId: AppSectionView;
  subKey?: string;
  itemId?: string;
  isCalculator?: boolean;
  badge?: string;
}

interface MenuGroup {
  name: string;
  viewId: AppSectionView;
  icon: React.ElementType;
  columns?: {
    heading: string;
    items: SubMenuItem[];
  }[];
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView = "home",
  onSelectSection,
  onOpenAppointment,
  onOpenCalculator,
  onNavigateHome,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDesktopDropdown, setOpenDesktopDropdown] = useState<string | null>(
    null
  );
  const [openMobileAccordion, setOpenMobileAccordion] = useState<string | null>(
    "Embarazo"
  );
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

          if (
            currentScrollY > 120 &&
            currentScrollY - prevScrollY > 20 &&
            !mobileMenuOpen
          ) {
            setIsVisible(false);
            setOpenDesktopDropdown(null);
          } else if (
            prevScrollY - currentScrollY > 10 ||
            currentScrollY <= 80
          ) {
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
      viewId: "embarazo",
      icon: Baby,
      columns: [
        {
          heading: "Consultas",
          items: [
            {
              label: "Consulta preconcepcional",
              viewId: "embarazo",
              subKey: "embarazo-consultas",
              itemId: "emb-consulta-preconcepcional",
            },
            {
              label: "Consulta de control prenatal - Control de embarazo",
              viewId: "embarazo",
              subKey: "embarazo-consultas",
              itemId: "emb-control-prenatal",
            },
            {
              label: "Anticoncepción posparto",
              viewId: "embarazo",
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
              viewId: "embarazo",
              subKey: "embarazo-bienestar",
              itemId: "emb-perfil-biofisico",
            },
            {
              label: "Doppler fetal",
              viewId: "embarazo",
              subKey: "embarazo-bienestar",
              itemId: "emb-doppler-fetal",
            },
            {
              label: "Monitoreo fetal electrónico",
              viewId: "embarazo",
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
              viewId: "embarazo",
              subKey: "embarazo-ecografias",
              badge: "HD Live",
            },
            {
              label: "Calculadora gestacional",
              viewId: "calculator",
              isCalculator: true,
              badge: "Interactivo",
            },
          ],
        },
      ],
    },
    {
      name: "Ginecología",
      viewId: "ginecologia",
      icon: Stethoscope,
      columns: [
        {
          heading: "Ecografías",
          items: [
            {
              label: "Ecografía pélvica transvaginal",
              viewId: "ginecologia",
              subKey: "ginecologia-ecografias",
              itemId: "gin-eco-transvaginal",
            },
            {
              label: "Ecografía pélvica suprapúbica",
              viewId: "ginecologia",
              subKey: "ginecologia-ecografias",
              itemId: "gin-eco-suprapubica",
            },
            {
              label: "Ecografía de piso pélvico",
              viewId: "ginecologia",
              subKey: "ginecologia-ecografias",
              itemId: "gin-eco-piso-pelvico",
            },
            {
              label: "Monitoreo de folículo",
              viewId: "ginecologia",
              subKey: "ginecologia-ecografias",
              itemId: "gin-monitoreo-foliculo",
            },
            {
              label: "Ecografía de mama o de seno",
              viewId: "ginecologia",
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
              viewId: "ginecologia",
              subKey: "ginecologia-consultas",
              itemId: "gin-consulta-preconcepcional",
            },
            {
              label: "Consulta Ginecológica",
              viewId: "ginecologia",
              subKey: "ginecologia-consultas",
              itemId: "gin-consulta-ginecologica",
            },
            {
              label: "Consulta de Planificación Familiar",
              viewId: "ginecologia",
              subKey: "ginecologia-consultas",
              itemId: "gin-consulta-planificacion",
            },
            {
              label: "Infertilidad",
              viewId: "ginecologia",
              subKey: "ginecologia-consultas",
              itemId: "gin-consulta-infertilidad",
            },
            {
              label: "Consulta de mama",
              viewId: "ginecologia",
              subKey: "ginecologia-consultas",
              itemId: "gin-consulta-mama",
            },
            {
              label: "Tamizaje Ginecológico Básico",
              viewId: "ginecologia",
              subKey: "ginecologia-tamizajes",
              itemId: "gin-tamizaje-basico",
              badge: "Paquete",
            },
            {
              label: "Tamizaje de mama",
              viewId: "ginecologia",
              subKey: "ginecologia-tamizajes",
              itemId: "gin-tamizaje-mama",
              badge: "Paquete",
            },
            {
              label: "Tamizaje Ginecológico Completo",
              viewId: "ginecologia",
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
              viewId: "ginecologia",
              subKey: "ginecologia-procedimientos",
              itemId: "gin-proc-colposcopia",
            },
            {
              label: "Toma de citología",
              viewId: "ginecologia",
              subKey: "ginecologia-procedimientos",
              itemId: "gin-proc-citologia",
            },
            {
              label: "Test de VPH o Papiloma virus",
              viewId: "ginecologia",
              subKey: "ginecologia-procedimientos",
              itemId: "gin-proc-test-vph",
            },
            {
              label: "Colocación o retiro de dispositivo intrauterino",
              viewId: "ginecologia",
              subKey: "ginecologia-procedimientos",
              itemId: "gin-proc-diu",
            },
            {
              label: "Colocación o retiro de implantes subdérmicos",
              viewId: "ginecologia",
              subKey: "ginecologia-procedimientos",
              itemId: "gin-proc-implante-subdermico",
            },
            {
              label: "Topicaciones",
              viewId: "ginecologia",
              subKey: "ginecologia-procedimientos",
              itemId: "gin-proc-topicaciones",
            },
          ],
        },
      ],
    },
    {
      name: "Telemedicina",
      viewId: "telemedicina",
      icon: Video,
      columns: [
        {
          heading: "Modalidades de Teleconsulta",
          items: [
            {
              label: "Teleconsulta con especialista en Ginecología",
              viewId: "telemedicina",
              subKey: "telemedicina",
              itemId: "tele-ginecologia",
            },
            {
              label: "Teleconsulta de planificación familiar",
              viewId: "telemedicina",
              subKey: "telemedicina",
              itemId: "tele-planificacion",
            },
            {
              label: "Teleconsulta de Infertilidad",
              viewId: "telemedicina",
              subKey: "telemedicina",
              itemId: "tele-infertilidad",
            },
          ],
        },
      ],
    },
    {
      name: "Quiénes Somos",
      viewId: "quienes-somos",
      icon: Building2,
      columns: [
        {
          heading: "Conoce Nuestra Institución",
          items: [
            {
              label: "Nuestra Sede (C.C. Aves María, Sabaneta)",
              viewId: "quienes-somos",
              subKey: "nuestra-sede",
            },
            {
              label: "Nuestra Institución (Misión, Visión y Valores)",
              viewId: "quienes-somos",
              subKey: "nuestra-institucion",
            },
            {
              label: "Especialistas (Equipo Médico CediMujer)",
              viewId: "quienes-somos",
              subKey: "especialistas",
            },
            {
              label: "Asociación de usuarios",
              viewId: "quienes-somos",
              subKey: "asociacion-usuarios",
            },
          ],
        },
      ],
    },
    {
      name: "Blog y FAQ",
      viewId: "blog",
      icon: BookOpen,
      columns: [
        {
          heading: "Artículos Informativos y Preguntas Frecuentes",
          items: [
            {
              label: "Colocación de dispositivo intrauterino Mirena",
              viewId: "blog",
              itemId: "blog-diu-mirena",
            },
            {
              label: "Las Ecografías durante el embarazo",
              viewId: "blog",
              itemId: "blog-ecografias-embarazo",
            },
            {
              label: "Prolapso genital femenino",
              viewId: "blog",
              itemId: "blog-prolapso-genital",
            },
            {
              label: "Menopausia",
              viewId: "blog",
              itemId: "blog-menopausia",
            },
            {
              label: "Cáncer de mama",
              viewId: "blog",
              itemId: "blog-cancer-mama",
            },
            {
              label: "¿Cómo combatir los cólicos menstruales?",
              viewId: "blog",
              itemId: "blog-colicos-menstruales",
            },
            {
              label: "Cáncer de Cérvix",
              viewId: "blog",
              itemId: "blog-cancer-cervix",
            },
          ],
        },
      ],
    },
    {
      name: "Contacto",
      viewId: "contacto",
      icon: MessageSquareHeart,
      columns: [
        {
          heading: "Atención al Cliente y Formulario Oficial",
          items: [
            {
              label: "Escríbanos mensaje de contacto",
              viewId: "contacto",
              subKey: "contacto",
            },
            {
              label: "Recomendar nuestro sistema",
              viewId: "contacto",
              subKey: "recomendar",
            },
            {
              label: "Enviar sugerencias",
              viewId: "contacto",
              subKey: "sugerencias",
            },
            {
              label: "Depositar un testimonio",
              viewId: "contacto",
              subKey: "testimonio",
            },
            {
              label: "Quejas y reclamos",
              viewId: "contacto",
              subKey: "reclamos",
            },
          ],
        },
      ],
    },
  ];

  const activeGroup =
    menuGroups.find((g) => g.name === openDesktopDropdown) || null;

  const handleSelectPageSection = (
    viewId: AppSectionView,
    subKey?: string,
    itemId?: string,
    isCalculator?: boolean
  ) => {
    setOpenDesktopDropdown(null);
    setMobileMenuOpen(false);

    if (isCalculator && onOpenCalculator) {
      onOpenCalculator();
      return;
    }

    if (onSelectSection) {
      onSelectSection(viewId, subKey, itemId);
    } else if (viewId === "home" && onNavigateHome) {
      onNavigateHome("#inicio");
    }
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
        className={`fixed top-2 sm:top-3.5 inset-x-0 z-50 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] px-3 sm:px-5 lg:px-6 max-w-[1360px] mx-auto will-change-transform ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-28 opacity-0 pointer-events-none"
        }`}
      >
        <div
          onMouseLeave={handleMouseLeaveGroup}
          className={`relative w-full flex items-center justify-between gap-2 xl:gap-3 px-3 sm:px-4 lg:px-4 xl:px-5 py-2 sm:py-2.5 rounded-2xl sm:rounded-full transition-shadow duration-300 border border-[#E6D9C8] backdrop-blur-md ${
            isScrolled
              ? "bg-[#F7F2EC]/95 shadow-xl shadow-[#4A3A33]/10"
              : "bg-[#F7F2EC]/95 shadow-lg shadow-[#4A3A33]/5"
          }`}
        >
          {/* Logo Brand */}
          <button
            type="button"
            onClick={() => handleSelectPageSection("home")}
            className="flex items-center shrink-0 group text-left"
          >
            <div className="relative h-8 w-24 sm:h-9 sm:w-28 xl:h-9 xl:w-32 flex items-center transition-transform duration-300 group-hover:scale-105">
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
          </button>

          {/* Desktop Navigation (lg and above) */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 bg-[#E6D9C8]/65 p-1 rounded-full border border-[#E6D9C8] shrink-0">
            <button
              type="button"
              onMouseEnter={() => setOpenDesktopDropdown(null)}
              onClick={() => handleSelectPageSection("home")}
              className={`inline-flex items-center gap-1 px-2 xl:px-2.5 2xl:px-3 py-1.5 text-[11px] xl:text-xs font-extrabold rounded-full transition-colors duration-150 whitespace-nowrap shrink-0 ${
                currentView === "home" && !openDesktopDropdown
                  ? "bg-[#4A3A33] text-[#F7F2EC] shadow-xs"
                  : "text-[#4A3A33] hover:bg-[#F7F2EC]"
              }`}
            >
              <Home className="w-3 h-3 shrink-0" />
              <span>Inicio</span>
            </button>

            {menuGroups.map((group) => {
              const isDropdownOpen = openDesktopDropdown === group.name;
              const isCurrentPage = currentView === group.viewId;
              return (
                <button
                  key={group.name}
                  type="button"
                  onMouseEnter={() => handleMouseEnterGroup(group.name)}
                  onClick={() => handleSelectPageSection(group.viewId)}
                  className={`inline-flex items-center gap-0.5 xl:gap-1 px-2 xl:px-2.5 2xl:px-3 py-1.5 text-[11px] xl:text-xs font-extrabold rounded-full transition-colors duration-150 whitespace-nowrap shrink-0 ${
                    isDropdownOpen
                      ? "bg-[#8FC1BB] text-[#4A3A33] shadow-xs"
                      : isCurrentPage
                      ? "bg-[#4A3A33] text-[#F7F2EC] shadow-xs"
                      : "text-[#4A3A33] hover:bg-[#F7F2EC]"
                  }`}
                >
                  <span>{group.name}</span>
                  {group.columns && (
                    <ChevronDown
                      className={`w-3 h-3 shrink-0 transition-transform duration-200 ${
                        isDropdownOpen
                          ? "rotate-180 text-[#4A3A33]"
                          : isCurrentPage
                          ? "text-[#8FC1BB]"
                          : "text-[#9A7B6C]"
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
              className={`px-2 xl:px-2.5 2xl:px-3 py-1.5 text-[11px] xl:text-xs font-extrabold rounded-full transition-colors duration-150 inline-flex items-center gap-1 whitespace-nowrap shrink-0 ${
                currentView === "calculator"
                  ? "bg-[#4A3A33] text-[#F7F2EC] shadow-xs"
                  : "text-[#4A3A33] bg-[#EBCFC6] hover:bg-[#D7A7A8]"
              }`}
            >
              <Calculator className="w-3 h-3 shrink-0" />
              <span>Calculadora</span>
            </button>
          </nav>

          {/* Action Buttons & Mobile/Tablet Menu Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setOpenDesktopDropdown(null);
                if (onOpenAppointment) onOpenAppointment();
              }}
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 xl:px-4 py-2 rounded-xl sm:rounded-full text-[11px] xl:text-xs font-extrabold text-[#4A3A33] bg-[#8FC1BB] hover:bg-[#8FC1BB]/90 shadow-md shadow-[#8FC1BB]/25 hover:scale-[1.02] active:scale-95 transition-all duration-200 border border-[#8FC1BB] whitespace-nowrap shrink-0"
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
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Desktop Mega-Dropdown Panel */}
          <AnimatePresence>
            {activeGroup && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                onMouseEnter={() => {
                  if (closeTimeoutRef.current)
                    clearTimeout(closeTimeoutRef.current);
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
                          Ir a la página de {activeGroup.name}
                        </h4>
                        <p className="text-[11px] text-[#9A7B6C] font-semibold">
                          Selecciona una subsección o procedimiento para abrir su página dedicada
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        handleSelectPageSection(activeGroup.viewId)
                      }
                      className="px-3.5 py-1.5 rounded-full bg-[#4A3A33] hover:bg-[#8FC1BB] text-[#F7F2EC] hover:text-[#4A3A33] text-xs font-extrabold transition-colors"
                    >
                      Ver toda la sección {activeGroup.name} →
                    </button>
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
                                onClick={() =>
                                  handleSelectPageSection(
                                    item.viewId,
                                    item.subKey,
                                    item.itemId,
                                    item.isCalculator
                                  )
                                }
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
                <button
                  type="button"
                  onClick={() => handleSelectPageSection("home")}
                  className="w-full px-4 py-3 rounded-2xl border border-[#E6D9C8] bg-white/80 flex items-center gap-2.5 font-extrabold text-sm text-[#4A3A33]"
                >
                  <Home className="w-4 h-4 text-[#8FC1BB]" />
                  <span>Página de Inicio</span>
                </button>

                {menuGroups.map((group) => {
                  const IconComp = group.icon;
                  const isExpanded = openMobileAccordion === group.name;
                  return (
                    <div
                      key={group.name}
                      className="rounded-2xl border border-[#E6D9C8] bg-white/70 overflow-hidden"
                    >
                      <div className="flex items-center justify-between px-4 py-2.5">
                        <button
                          type="button"
                          onClick={() => handleSelectPageSection(group.viewId)}
                          className="flex items-center gap-2.5 text-left font-extrabold text-sm text-[#4A3A33]"
                        >
                          <span className="p-1.5 rounded-lg bg-[#8FC1BB]/30 text-[#4A3A33]">
                            <IconComp className="w-4 h-4" />
                          </span>
                          <span>{group.name}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setOpenMobileAccordion(
                              isExpanded ? null : group.name
                            )
                          }
                          className="p-1.5 rounded-lg bg-[#E6D9C8]/50 text-[#4A3A33]"
                          aria-label={`Ver subsecciones de ${group.name}`}
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>

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
                                  onClick={() =>
                                    handleSelectPageSection(
                                      item.viewId,
                                      item.subKey,
                                      item.itemId,
                                      item.isCalculator
                                    )
                                  }
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
                    📞 WhatsApp: {CONTACT_INFO.whatsappDisplay} • PBX:{" "}
                    {CONTACT_INFO.pbxDisplay}
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
