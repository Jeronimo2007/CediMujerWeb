/**
 * Configuración de Recursos y Multimedia de CediMujer
 * 
 * Imágenes locales mapeadas desde frontend/public/assets/images/:
 * - Header / Hero: header.jpg
 * - Sobre CediMujer: trabajo.jpg (demuestra calidad humana y profesionalismo), sala1.jpg
 * - Equipos e Instalaciones: equipo1.jpg, equipo2.jpg, equipo1vista2.jpg, equipo1vista3.jpg, sala2.jpg
 * - Logos corporativos: logosinfondo#1.jpeg, logo#1.jpg, logo#2.jpeg, logo#3.jpeg
 */

export const ASSETS = {
  // Logos corporativos oficiales
  logo: {
    primary: "/assets/images/logo-cedimujer.png",
    primaryHd: "/assets/images/logo-cedimujer-hd.png",
    emblem: "/assets/images/logo-emblem.png",
    transparent: "/assets/images/logo-cedimujer.png",
    badge: "/assets/images/logo#1.jpg",
    square: "/assets/images/logo#2.jpeg",
    banner: "/assets/images/logo#3.jpeg",
  },

  // Hero Video / Imagen de fondo
  hero: {
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-doctor-checking-a-patient-in-a-clinic-40822-large.mp4",
    fallbackImage: "/assets/images/header.jpg",
    mainImage: "/assets/images/header.jpg",
  },
  
  // Sección Sobre Nosotros (instalaciones y equipo de trabajo)
  about: {
    mainImage: "/assets/images/trabajo.jpg", // Calidad del equipo médico en consulta
    secondaryImage: "/assets/images/sala1.jpg", // Instalaciones y salas de la clínica
  },

  // Imágenes de Servicios Médicos y Tecnología de la Clínica
  services: {
    ginecologia: "/assets/images/sala1.jpg", // Sala de consulta ginecológica
    obstetricia: "/assets/images/trabajo.jpg", // Atención personalizada y calidez
    ecografia: "/assets/images/equipo1.jpg", // Equipo de ultrasonido y ecografía de alta tecnología
    mastologia: "/assets/images/equipo2.jpg", // Tecnología diagnóstica avanzada
    endocrinologia: "/assets/images/equipo1vista2.jpg", // Monitoreo y equipos especializados
    cirugia: "/assets/images/sala2.jpg", // Sala quirúrgica / procedimientos clínicos
  },

  // Galería de Equipos e Instalaciones
  facilities: [
    { id: 1, title: "Consultorios y Salas Clínicas", image: "/assets/images/sala1.jpg", tag: "Salas de Atención" },
    { id: 2, title: "Quirófano y Procedimientos", image: "/assets/images/sala2.jpg", tag: "Instalaciones" },
    { id: 3, title: "Tecnología de Ultrasonido HD", image: "/assets/images/equipo1.jpg", tag: "Equipos" },
    { id: 4, title: "Diagnóstico Clínico Avanzado", image: "/assets/images/equipo2.jpg", tag: "Equipos" },
    { id: 5, title: "Monitoreo y Precisión", image: "/assets/images/equipo1vista2.jpg", tag: "Equipos" },
    { id: 6, title: "Atención Médica Humanizada", image: "/assets/images/trabajo.jpg", tag: "Nuestro Equipo" },
  ],

  // Logotipos / Certificaciones para el Marquee
  certifications: [
    { id: 1, name: "Sociedad Médica de Ginecología", tag: "Certificación Oro" },
    { id: 2, name: "ISO 9001:2015 Calidad Médica", tag: "Acreditación Internacional" },
    { id: 3, name: "Red de Salud Integral de la Mujer", tag: "Miembro Oficial" },
    { id: 4, name: "Federación Médica Internacional", tag: "Excelencia Clínica" },
    { id: 5, name: "Centro de Ultrasonografía Avanzada", tag: "Sello de Garantía" },
    { id: 6, name: "Colegio de Obstetricia y Salud", tag: "Miembro Honorario" }
  ]
};
