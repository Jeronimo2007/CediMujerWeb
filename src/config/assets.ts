/**
 * Configuración de Recursos y Multimedia de CediMujer
 * 
 * Para reemplazar las imágenes/videos de prueba con tus propios archivos locales:
 * 1. Guarda tus imágenes en: frontend/public/assets/images/
 * 2. Guarda tus videos en: frontend/public/assets/videos/
 * 3. Actualiza las rutas a continuación (ej. "/assets/images/mi-foto.jpg")
 */

export const ASSETS = {
  // Hero Video / Imagen de fondo
  hero: {
    // Si agregas un video local en /public/assets/videos/hero.mp4, cambia videoUrl por esa ruta
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-doctor-checking-a-patient-in-a-clinic-40822-large.mp4",
    fallbackImage: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1920",
  },
  
  // Sección Sobre Nosotros
  about: {
    mainImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1000",
    secondaryImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
  },

  // Imágenes de Servicios Médicos
  services: {
    ginecologia: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600",
    obstetricia: "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&q=80&w=600",
    ecografia: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600",
    mastologia: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600",
    endocrinologia: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600",
    cirugia: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=600",
  },

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
