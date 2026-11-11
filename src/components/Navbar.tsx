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

          const scrolled = currentScrollY > 20;
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

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
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
    }, 150);
  };

  return (
    <>
      {/* Soft Dim Backdrop when Desktop Mega-Menu is Open */}
      <AnimatePresence>
        {activeGroup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpenDesktopDropdown(null)}
            className="hidden lg:block fixed inset-0 z-40 bg-[#4A3A33]/25 backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      {/* Open Architectural Full-Width Header Bar (Pastel Pink & Minimalist) */}
      <header
        onMouseLeave={handleMouseLeaveGroup}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        } ${
          openDesktopDropdown || mobileMenuOpen
            ? "bg-[#FDF6F6] border-b border-[#F3D9D9] shadow-[0_4px_24px_rgba(74,58,51,0.06)]"
            : isScrolled
            ? "bg-[#FDF6F6]/95 backdrop-blur-xl border-b border-[#F3D9D9] shadow-[0_4px_24px_rgba(74,58,51,0.05)]"
            : "bg-[#FDF6F6]/90 backdrop-blur-md border-b border-[#F3D9D9]/70"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* Logo Brand */}
          <button
            type="button"
            onClick={() => handleSelectPageSection("home")}
            className="flex items-center shrink-0 group text-left"
          >
            <div className="relative h-8 w-28 sm:h-10 sm:w-36 flex items-center transition-opacity duration-300 group-hover:opacity-85">
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

          {/* Desktop Navigation (Delicate Underline Links, No Boxes) */}
          <nav className="hidden lg:flex items-center gap-3.5 xl:gap-6 shrink-0">
            <button
              type="button"
              onMouseEnter={() => setOpenDesktopDropdown(null)}
              onClick={() => handleSelectPageSection("home")}
              className={`relative py-2 text-[11.5px] xl:text-[13px] font-normal tracking-wide transition-colors duration-200 whitespace-nowrap ${
                currentView === "home" && !openDesktopDropdown
                  ? "text-[#4A3A33] font-medium"
                  : "text-[#4A3A33]/75 hover:text-[#4A3A33]"
              }`}
            >
              <span>Inicio</span>
              {currentView === "home" && !openDesktopDropdown && (
                <span className="absolute bottom-0 inset-x-0 h-[1.5px] bg-[#8FC1BB] rounded-full" />
              )}
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
                  className={`relative py-2 inline-flex items-center gap-1 text-[11.5px] xl:text-[13px] font-normal tracking-wide transition-colors duration-200 whitespace-nowrap ${
                    isDropdownOpen || isCurrentPage
                      ? "text-[#4A3A33] font-medium"
                      : "text-[#4A3A33]/75 hover:text-[#4A3A33]"
                  }`}
                >
                  <span>{group.name}</span>
                  {group.columns && (
                    <ChevronDown
                      className={`w-3 h-3 shrink-0 transition-transform duration-200 ${
                        isDropdownOpen
                          ? "rotate-180 text-[#8FC1BB]"
                          : "text-[#9A7B6C]/70"
                      }`}
                    />
                  )}
                  {(isDropdownOpen || isCurrentPage) && (
                    <span className="absolute bottom-0 inset-x-0 h-[1.5px] bg-[#8FC1BB] rounded-full" />
                  )}
                </button>
              );
            })}

            <button
              type="button"
              onMouseEnter={() => setOpenDesktopDropdown(null)}
              onClick={onOpenCalculator}
              className={`relative py-2 text-[11.5px] xl:text-[13px] font-normal tracking-wide transition-colors duration-200 inline-flex items-center gap-1.5 whitespace-nowrap ${
                currentView === "calculator"
                  ? "text-[#4A3A33] font-medium"
                  : "text-[#9A7B6C] hover:text-[#4A3A33]"
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-[#8FC1BB] shrink-0 stroke-[1.75]" />
              <span>Calculadora</span>
              {currentView === "calculator" && (
                <span className="absolute bottom-0 inset-x-0 h-[1.5px] bg-[#8FC1BB] rounded-full" />
              )}
            </button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setOpenDesktopDropdown(null);
                if (onOpenAppointment) onOpenAppointment();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-medium text-[#4A3A33] bg-[#F7E0E0] hover:bg-[#4A3A33] hover:text-[#FDF6F6] border border-[#EBC5C5] transition-all duration-200 whitespace-nowrap shrink-0"
            >
              <span className="text-[#9A7B6C] group-hover:text-[#F7E0E0]">(</span>
              <span>Agendar Cita</span>
              <span className="text-[#9A7B6C] group-hover:text-[#F7E0E0]">)</span>
            </button>

            {/* Menu Button for Mobile & Tablet (< lg) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-[#4A3A33] hover:bg-[#F7E0E0]/60 transition-colors shrink-0"
              aria-label="Abrir menú de navegación"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 stroke-[1.75]" />
              ) : (
                <Menu className="w-5 h-5 stroke-[1.75]" />
              )}
            </button>
          </div>
        </div>

        {/* Seamless Edge-to-Edge Editorial Mega-Menu Panel (100% Solid Pastel Pink Background) */}
        <AnimatePresence>
          {activeGroup && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              onMouseEnter={() => {
                if (closeTimeoutRef.current)
                  clearTimeout(closeTimeoutRef.current);
              }}
              onMouseLeave={handleMouseLeaveGroup}
              className="hidden lg:block w-full bg-[#FDF6F6] border-b-2 border-[#F3D9D9] shadow-[0_24px_60px_-15px_rgba(74,58,51,0.16)]"
            >
              <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 mb-5 border-b border-[#F3D9D9]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#F7E0E0] flex items-center justify-center text-[#4A3A33]">
                      <activeGroup.icon className="w-4 h-4 stroke-[1.75]" />
                    </div>
                    <h4 className="font-serif text-xl font-normal text-[#4A3A33]">
                      {activeGroup.name}
                    </h4>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleSelectPageSection(activeGroup.viewId)
                    }
                    className="px-4 py-1.5 rounded-full bg-[#F7E0E0] hover:bg-[#4A3A33] text-xs font-medium text-[#4A3A33] hover:text-[#FDF6F6] border border-[#EBC5C5] transition-colors"
                  >
                    Explorar {activeGroup.name} →
                  </button>
                </div>

                <div
                  className={`grid gap-8 ${
                    (activeGroup.columns?.length || 1) >= 3
                      ? "grid-cols-3"
                      : (activeGroup.columns?.length || 1) === 2
                      ? "grid-cols-2"
                      : "grid-cols-1"
                  }`}
                >
                  {activeGroup.columns?.map((col) => (
                    <div key={col.heading} className="space-y-2.5">
                      <h5 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9A7B6C] pb-1.5 border-b border-[#F3D9D9]">
                        {col.heading}
                      </h5>
                      <ul
                        className={
                          (activeGroup.columns?.length || 1) === 1
                            ? "grid grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-1"
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
                              className="w-full text-left px-3 py-2 -mx-3 rounded-xl text-xs font-medium text-[#4A3A33] hover:bg-[#F7E0E0]/75 transition-colors flex items-center justify-between gap-2 group/item"
                            >
                              <span className="group-hover/item:translate-x-1 transition-transform">
                                {item.label}
                              </span>
                              {item.badge && (
                                <span className="px-2 py-0.5 rounded-full text-[9px] font-medium bg-[#F4D0D0] text-[#4A3A33] shrink-0">
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
              className="fixed inset-0 z-40 bg-[#4A3A33]/25 backdrop-blur-[2px] lg:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="fixed inset-x-0 top-16 sm:top-20 z-40 bg-[#FDF6F6] border-b border-[#F3D9D9] px-5 py-5 lg:hidden shadow-xl max-h-[calc(100dvh-64px)] overflow-y-auto"
            >
              <div className="divide-y divide-[#F3D9D9]">
                <button
                  type="button"
                  onClick={() => handleSelectPageSection("home")}
                  className="w-full py-3 flex items-center gap-2.5 font-medium text-sm text-[#4A3A33]"
                >
                  <Home className="w-4 h-4 text-[#8FC1BB] stroke-[1.75]" />
                  <span>Página de Inicio</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenCalculator) onOpenCalculator();
                  }}
                  className="w-full py-3 flex items-center justify-between gap-2.5 font-medium text-sm text-[#4A3A33]"
                >
                  <span className="flex items-center gap-2.5">
                    <Calculator className="w-4 h-4 text-[#8FC1BB] stroke-[1.75]" />
                    <span>Calculadora Gestacional</span>
                  </span>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#CFE6E2]/60 text-[#4A3A33] font-medium">
                    Interactivo
                  </span>
                </button>

                {menuGroups.map((group) => {
                  const IconComp = group.icon;
                  const isExpanded = openMobileAccordion === group.name;
                  return (
                    <div key={group.name} className="py-1.5">
                      <div className="flex items-center justify-between py-2">
                        <button
                          type="button"
                          onClick={() => handleSelectPageSection(group.viewId)}
                          className="flex items-center gap-2.5 text-left font-medium text-sm text-[#4A3A33]"
                        >
                          <IconComp className="w-4 h-4 text-[#9A7B6C] stroke-[1.75]" />
                          <span>{group.name}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setOpenMobileAccordion(
                              isExpanded ? null : group.name
                            )
                          }
                          className="p-1.5 rounded-full text-[#9A7B6C]"
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
                        <div className="pl-6 pr-2 pb-2 pt-1 space-y-2.5">
                          {group.columns.map((col) => (
                            <div key={col.heading} className="space-y-1">
                              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#9A7B6C] pt-1">
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
                                  className="w-full text-left py-1.5 text-xs font-normal text-[#4A3A33]/85 hover:text-[#4A3A33] flex items-center justify-between gap-2"
                                >
                                  <span>{item.label}</span>
                                  {item.badge && (
                                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#EBCFC6]/60 text-[#4A3A33] font-medium">
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

              <div className="mt-4 pt-4 border-t border-[#E6D9C8]/70 space-y-3">
                <div className="text-xs space-y-1 text-[#9A7B6C]">
                  <p className="font-medium text-[#4A3A33]">
                    {CONTACT_INFO.addressFull}
                  </p>
                  <p>
                    WhatsApp: {CONTACT_INFO.whatsappDisplay} · PBX:{" "}
                    {CONTACT_INFO.pbxDisplay}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <a
                    href={CONTACT_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-xs font-medium text-[#4A3A33] bg-[#E6D9C8]/50"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#8FC1BB]" />
                    <span>WhatsApp {CONTACT_INFO.whatsappDisplay}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (onOpenAppointment) onOpenAppointment();
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-xs font-medium text-[#FAF7F2] bg-[#4A3A33]"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#8FC1BB]" />
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
