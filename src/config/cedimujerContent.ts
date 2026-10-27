import { ASSETS } from "./assets";

export interface ServiceItemDetail {
  id: string;
  title: string;
  subcategory: string;
  shortDescription: string;
  whatIsIt: string;
  howItIsDone: string;
  preparationAndIndications: string[];
  highlights: string[];
  image: string;
  recommendedSpecialist: string;
  durationOrTiming?: string;
}

export interface SpecialistProfile {
  id: string;
  name: string;
  role: string;
  credentials: string[];
  bio: string;
  specialties: string[];
  image: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  image: string;
  content: {
    intro: string;
    sections: {
      heading: string;
      body: string;
      bullets?: string[];
    }[];
    conclusion: string;
  };
  relatedService: string;
}

export interface TestimonialItem {
  id: number;
  name: string;
  comment: string;
  serviceTag: string;
  rating: number;
}

export const CONTACT_INFO = {
  whatsappDisplay: "+57 311 397 9905",
  whatsappRaw: "573113979905",
  whatsappUrl: "https://wa.me/573113979905?text=Hola%20CediMujer,%20deseo%20recibir%20asesor%C3%ADa%20o%20agendar%20una%20cita.",
  pbxDisplay: "+604 357 3010",
  pbxTel: "tel:+576043573010",
  addressFull: "Calle 75 sur No. 43 A -202 / CC. AVES MARÍA / local 341-342 (Sabaneta)",
  addressShort: "Cl. 75 Sur No. 43 A - 202, Local 341-342",
  mall: "Centro Comercial Aves María",
  city: "Sabaneta, Antioquia",
  email: "info@cedimujer.com",
  hours: {
    weekdays: "Lunes a Viernes: 7:00 AM - 6:00 PM",
    saturdays: "Sábados: 7:00 AM - 1:00 PM",
  },
  contactFormOptions: [
    {
      id: "contacto",
      label: "Escríbanos mensaje de contacto",
      description: "Solicita información sobre nuestras consultas, ecografías, tamizajes o convenios.",
      placeholder: "Escribe aquí tu consulta o solicitud de información...",
    },
    {
      id: "recomendar",
      label: "Recomendar nuestro sistema",
      description: "Comparte la experiencia de CediMujer con familiares o amigas que necesiten atención especializada.",
      placeholder: "Cuéntanos a quién deseas recomendar nuestro centro o por qué nos recomiendas...",
    },
    {
      id: "sugerencias",
      label: "Enviar sugerencias",
      description: "Tus ideas nos ayudan a mejorar continuamente nuestras instalaciones y atención médica.",
      placeholder: "Comparte tu sugerencia para seguir mejorando nuestro servicio...",
    },
    {
      id: "testimonio",
      label: "Depositar un testimonio",
      description: "Comparte tu experiencia con nuestros especialistas y ecografías para guiar a otras mamás y pacientes.",
      placeholder: "Cuéntanos cómo fue tu experiencia en CediMujer con nuestro equipo médico...",
    },
    {
      id: "reclamos",
      label: "Quejas y reclamos",
      description: "Canal oficial PQRSD gestionado con prioridad por nuestra administración y Asociación de Usuarios.",
      placeholder: "Describe detalladamente el motivo de tu queja o reclamo y fecha de atención...",
    },
  ],
};

// ============================================================================
// 2. MENÚ PRINCIPAL Y SECCIONES DE SERVICIOS
// ============================================================================

export const EMBARAZO_SERVICES: {
  consultas: ServiceItemDetail[];
  bienestarFetal: ServiceItemDetail[];
  ecografias: ServiceItemDetail[];
} = {
  consultas: [
    {
      id: "emb-consulta-preconcepcional",
      title: "Consulta preconcepcional",
      subcategory: "Consultas de Embarazo",
      shortDescription:
        "Evaluación médica integral antes de buscar el embarazo para identificar factores de riesgo y preparar tu cuerpo para una gestación sana.",
      whatIsIt:
        "Es una consulta especializada dirigida a la mujer o pareja que planea un embarazo en el corto o mediano plazo. El equipo de especialistas de CediMujer evalúa tu estado de salud general, antecedentes médicos, ginecológicos y nutricionales para asegurar las mejores condiciones antes de la concepción.",
      howItIsDone:
        "Durante la sesión, el especialista en Ginecología y Obstetricia realiza una historia clínica completa, examen físico integral, revisión del esquema de vacunación, solicitud de exámenes paraclínicos prenatales e inicio de suplementación con ácido fólico y micronutrientes esenciales para prevenir defectos del tubo neural en el bebé.",
      preparationAndIndications: [
        "Recomendada al menos 3 meses antes de buscar el embarazo.",
        "Asistir preferiblemente con tu pareja para evaluar antecedentes familiares conjuntos.",
        "Llevar resultados de citologías, ecografías o exámenes de laboratorio recientes.",
      ],
      highlights: [
        "Valoración de riesgo obstétrico previo",
        "Suplementación temprana con ácido fólico",
        "Chequeo ginecológico y paraclínico pregestacional",
      ],
      image: ASSETS.services.obstetricia,
      recommendedSpecialist: "Especialista en Ginecología y Obstetricia CediMujer",
      durationOrTiming: "Previo al embarazo (ideal 3 meses antes)",
    },
    {
      id: "emb-control-prenatal",
      title: "Consulta de control prenatal - Control de embarazo",
      subcategory: "Consultas de Embarazo",
      shortDescription:
        "Acompañamiento médico periódico, cálido y riguroso en cada trimestre para vigilar la salud de la mamá y el adecuado desarrollo del bebé.",
      whatIsIt:
        "El control prenatal en CediMujer es el conjunto de consultas médicas programadas y periódicas que permiten vigilar la evolución del embarazo, detectar oportunamente riesgos materno-fetales (como preeclampsia, diabetes gestacional o amenaza de parto pretérmino) y preparar a la madre y su familia para un parto seguro y feliz.",
      howItIsDone:
        "En cada consulta realizamos control de peso y presión arterial materna, medición de altura uterina, auscultación de la fetocardia (latidos del corazón del bebé), revisión detallada de exámenes de laboratorio y ecografías de cada trimestre, formulación de micronutrientes y educación sobre signos de alarma y lactancia.",
      preparationAndIndications: [
        "Iniciar tan pronto tengas una prueba de embarazo positiva.",
        "Llevar tu carné materno y todos los resultados de laboratorio y ecografías previas.",
        "Anotar tus dudas sobre síntomas, alimentación y preparación para el parto.",
      ],
      highlights: [
        "Seguimiento trimestre a trimestre con calidez humana",
        "Vigilancia de presión arterial, curva de peso y crecimiento fetal",
        "Orientación integral para el parto y el puerperio",
      ],
      image: "/assets/images/sala1.jpg",
      recommendedSpecialist: "Dr. Diego León Gaviria / Equipo Obstétrico CediMujer",
      durationOrTiming: "Mensual / Quincenal según semana gestacional",
    },
    {
      id: "emb-anticoncepcion-posparto",
      title: "Anticoncepción posparto",
      subcategory: "Consultas de Embarazo",
      shortDescription:
        "Asesoría médica personalizada para elegir e iniciar métodos de planificación seguros durante la lactancia materna y el puerperio.",
      whatIsIt:
        "Es la consulta especializada posterior al nacimiento del bebé enfocada en proteger la salud reproductiva de la madre, permitir una recuperación óptima entre embarazos (espaciamiento intergenésico) y seleccionar un método anticonceptivo 100% compatible con la lactancia materna.",
      howItIsDone:
        "El especialista evalúa tu recuperación posparto (cesárea o parto vaginal), verifica las categorías de elegibilidad médica de la OMS durante la lactancia y explica las opciones disponibles en CediMujer: dispositivos intrauterinos (Mirena, Kyleena, T de Cobre), implantes subdérmicos, métodos hormonales solo de progestágeno o métodos definitivos.",
      preparationAndIndications: [
        "Ideal realizarla en el control posparto (entre las 3 y 6 semanas tras el parto) o antes del alta.",
        "Informar si estás en lactancia materna exclusiva o mixta.",
        "Se puede programar la inserción inmediata de DIU o implante subdérmico en consultorio.",
      ],
      highlights: [
        "Métodos 100% seguros para la lactancia materna",
        "Opciones de larga duración (DIU Mirena / Implante subdérmico)",
        "Valoración integral del piso pélvico y recuperación materna",
      ],
      image: "/assets/images/sala2.jpg",
      recommendedSpecialist: "Especialistas en Ginecología y Obstetricia CediMujer",
      durationOrTiming: "Puerperio / Posparto",
    },
  ],
  bienestarFetal: [
    {
      id: "emb-perfil-biofisico",
      title: "Perfil biofísico fetal",
      subcategory: "Pruebas de Bienestar Fetal",
      shortDescription:
        "Evaluación ecográfica dinámica de la vitalidad y oxigenación del bebé mediante el análisis de sus movimientos, tono muscular, respiración y líquido amniótico.",
      whatIsIt:
        "El Perfil Biofísico Fetal es una prueba no invasiva de bienestar fetal que combina la ecografía en tiempo real con el monitoreo fetal para comprobar que el bebé recibe una adecuada oxigenación en el útero y que su sistema nervioso central funciona óptimamente.",
      howItIsDone:
        "Mediante ultrasonido de alta resolución durante 20 a 30 minutos, el especialista observa y puntúa cinco variables biofísicas del bebé: 1) Movimientos respiratorios fetales, 2) Movimientos corporales gruesos, 3) Tono muscular fetal (flexión y extensión de extremidades), 4) Volumen de líquido amniótico (ILA) y 5) Reactividad de la frecuencia cardíaca fetal.",
      preparationAndIndications: [
        "Se realiza habitualmente en el tercer trimestre (desde la semana 28-32 en adelante).",
        "Indicado en disminución de movimientos fetales, hipertensión materna, diabetes gestacional o embarazo prolongado.",
        "No requiere ayuno; se recomienda haber ingerido un alimento ligero antes del estudio.",
      ],
      highlights: [
        "Evaluación de 5 parámetros de vitalidad fetal",
        "Medición precisa del índice de líquido amniótico",
        "Totalmente seguro e indoloro para la mamá y el bebé",
      ],
      image: "/assets/images/equipo1.jpg",
      recommendedSpecialist: "Dr. Diego León Gaviria / Unidad de Diagnóstico Prenatal",
      durationOrTiming: "Tercer trimestre (20 - 30 min)",
    },
    {
      id: "emb-doppler-fetal",
      title: "Doppler fetal",
      subcategory: "Pruebas de Bienestar Fetal",
      shortDescription:
        "Estudio ecográfico avanzado a color que mide el flujo sanguíneo en el cordón umbilical, cerebro fetal y arterias uterinas maternas.",
      whatIsIt:
        "La Ecografía Doppler Fetal y Placentaria evalúa la circulación de la sangre entre la placenta y el bebé. Es el estudio de elección para vigilar el crecimiento fetal, verificar cómo está funcionando la placenta y detectar tempranamente riesgo de preeclampsia o restricción del crecimiento intrauterino (RCIU).",
      howItIsDone:
        "Utilizando nuestro ecógrafo de alta gama con tecnología Doppler Color y Doppler Pulsado, el especialista mide las ondas de velocidad de flujo e índices de resistencia en vasos sanguíneos clave: las arterias uterinas maternas, la arteria umbilical, la arteria cerebral media del bebé y el ductus venoso.",
      preparationAndIndications: [
        "Puede realizarse como tamizaje de preeclampsia en semana 11-14 y 20-24, o seguimiento en el tercer trimestre.",
        "Fundamental en embarazos gemelares, fetos pequeños para la edad gestacional o hipertensión materna.",
        "Llevar ecografías anteriores para comparar la curva de crecimiento fetal.",
      ],
      highlights: [
        "Estudio hemodinámico de arterias uterinas, umbilical y cerebral media",
        "Detección oportuna de insuficiencia placentaria y preeclampsia",
        "Entrega inmediata de informe médico detallado con gráficas",
      ],
      image: "/assets/images/equipo1vista3.jpg",
      recommendedSpecialist: "Dr. Diego León Gaviria / Especialistas en Ultrasonografía",
      durationOrTiming: "Según indicación médica (20 - 30 min)",
    },
    {
      id: "emb-monitoreo-fetal",
      title: "Monitoreo fetal electrónico",
      subcategory: "Pruebas de Bienestar Fetal",
      shortDescription:
        "Registro continuo y gráfico de los latidos cardíacos del bebé en relación con sus movimientos y las contracciones uterinas maternas.",
      whatIsIt:
        "También conocido como Cardiotocografía o Prueba sin Estrés (NST), el Monitoreo Fetal Electrónico evalúa la reserva de oxígeno y el bienestar del bebé al observar cómo se acelera su corazón cuando se mueve y si existen contracciones uterinas.",
      howItIsDone:
        "La mamá se recuesta cómodamente en una de nuestras salas tranquilas. Se colocan dos transductores suaves sobre el abdomen materno sujetos con bandas elásticas: uno registra la frecuencia cardíaca del bebé y el otro detecta la actividad o contracciones del útero, generando un trazado continuo durante 20 a 30 minutos.",
      preparationAndIndications: [
        "Indicado a partir de la semana 32-34 de gestación o según criterio del obstetra.",
        "No acudir en ayunas (ingerir alimentos previamente estimula la actividad del bebé).",
        "Procedimiento externo, cómodo, relajado y 100% seguro.",
      ],
      highlights: [
        "Evaluación en tiempo real de la reactividad cardíaca fetal",
        "Detección de contracciones uterinas tempranas",
        "Interpretación por médico especialista en Ginecología y Obstetricia",
      ],
      image: "/assets/images/equipo2.jpg",
      recommendedSpecialist: "Equipo de Ginecología y Obstetricia CediMujer",
      durationOrTiming: "Desde la semana 32 (20 - 30 min)",
    },
  ],
  ecografias: [
    {
      id: "emb-eco-transvaginal-datacion",
      title: "Ecografía Obstétrica Transvaginal y Cervicometría",
      subcategory: "Ecografías de Embarazo",
      shortDescription:
        "Confirmación temprana del embarazo, vitalidad del embrión, cálculo exacto de semanas de gestación y medición del cuello uterino.",
      whatIsIt:
        "Es la primera ecografía del embarazo (primer trimestre temprano). Permite confirmar que la gestación se encuentra dentro del útero, escuchar por primera vez el latido cardíaco embrionario, determinar si es un embarazo único o múltiple, establecer con máxima exactitud la edad gestacional y medir la longitud del cérvix (cervicometría) para descartar riesgo de parto prematuro.",
      howItIsDone:
        "Se realiza con un transductor endocavitario de alta frecuencia cubierto con protector estéril, de forma suave e indolora, logrando imágenes de altísima nitidez en las primeras semanas cuando el embrión mide apenas unos milímetros.",
      preparationAndIndications: [
        "Ideal entre las semanas 6 y 10 de gestación.",
        "La cervicometría también se realiza entre las semanas 18 y 24 para predecir riesgo de parto pretérmino.",
        "No requiere tener la vejiga llena.",
      ],
      highlights: [
        "Confirmación de latido embrionario y edad gestacional exacta",
        "Cervicometría para prevención de parto prematuro",
        "Alta resolución desde las primeras semanas",
      ],
      image: "/assets/images/equipo1.jpg",
      recommendedSpecialist: "Dr. Diego León Gaviria / Dra. Durley Maya Salazar",
      durationOrTiming: "Semanas 6 a 10 (y Cervicometría sem. 18-24)",
    },
    {
      id: "emb-eco-tamizaje-genetico",
      title: "Ecografía de Tamizaje Genético (Semana 11 - 13.6)",
      subcategory: "Ecografías de Embarazo",
      shortDescription:
        "Evaluación especializada del primer trimestre para medir la translucencia nucal, hueso nasal y marcadores tempranos de cromosomopatías.",
      whatIsIt:
        "Es una de las ecografías más importantes del embarazo. Se realiza estrictamente entre la semana 11 y la 13.6 (cuando el bebé mide entre 45 y 84 mm) para evaluar el riesgo de alteraciones cromosómicas (como Síndrome de Down, trisomía 18 y 13), revisar la anatomía fetal temprana y evaluar el Doppler de arterias uterinas.",
      howItIsDone:
        "Mediante ultrasonido de alta definición por vía abdominal (y transvaginal si la posición del bebé lo requiere), el especialista mide con precisión milimétrica el pliegue de la nuca del bebé (translucencia nucal), verifica la presencia del hueso nasal, el flujo en el ductus venoso, la válvula tricúspide y la frecuencia cardíaca fetal.",
      preparationAndIndications: [
        "Agendar estrictamente entre la semana 11 y 13 con 6 días.",
        "Puedes asistir acompañada de tu pareja o familiares para vivir la experiencia.",
        "Llevar ecografías previas si ya te realizaste una ecografía temprana.",
      ],
      highlights: [
        "Medición de Translucencia Nucal y Hueso Nasal",
        "Doppler de Ductus Venoso y Arterias Uterinas",
        "Valoración anatómica temprana del primer trimestre",
      ],
      image: "/assets/images/equipo1vista2.jpg",
      recommendedSpecialist: "Dr. Diego León Gaviria / Dra. Durley Maya Salazar",
      durationOrTiming: "Semana 11 a 13.6 de gestación",
    },
    {
      id: "emb-eco-detalle-anatomico",
      title: "Ecografía de Detalle Anatómico (Tercer Nivel / Morfológica)",
      subcategory: "Ecografías de Embarazo",
      shortDescription:
        "Estudio exhaustivo de tercer nivel órgano por órgano para evaluar el desarrollo estructural completo del bebé.",
      whatIsIt:
        "La Ecografía de Detalle Anatómico o Morfológica de Tercer Nivel es el examen diagnóstico más completo del segundo trimestre. En CediMujer revisamos minuciosamente cada estructura anatómica del bebé para descartar malformaciones congénitas y confirmar su adecuado crecimiento.",
      howItIsDone:
        "El especialista examina sistemáticamente el cráneo, estructuras cerebrales (neurosonografía básica), rostro y labio superior, columna vertebral en toda su extensión, pulmones, corazón fetal y sus cuatro cámaras, estómago, riñones, vejiga, pared abdominal, cordón umbilical, extremidades (manos y pies), ubicación de la placenta y volumen de líquido amniótico.",
      preparationAndIndications: [
        "Se realiza entre las semanas 18 y 26 de gestación (óptima visualización entre semanas 20 y 24).",
        "No aplicar cremas ni aceites en el abdomen 24 horas antes del examen para mejorar la nitidez acústica.",
        "Entrega de informe médico detallado de tercer nivel inmediatamente al finalizar.",
      ],
      highlights: [
        "Revisión detallada de cerebro, corazón, columna y órganos internos",
        "Tecnología de ultrasonido de alta definición Samsung HERA",
        "Explicación clara, paciente y humanizada para toda la familia",
      ],
      image: "/assets/images/trabajo.jpg",
      recommendedSpecialist: "Dr. Diego León Gaviria Méndez",
      durationOrTiming: "Semanas 18 a 26 (Ideal 20 a 24 sem.)",
    },
    {
      id: "emb-eco-3d-4d-hdlive",
      title: "Ecografía 3D / 4D con Tecnología HD Live",
      subcategory: "Ecografías de Embarazo",
      shortDescription:
        "Vive la experiencia inolvidable de conocer la carita, gestos, sonrisas y movimientos de tu bebé en tiempo real con textura realista HD Live.",
      whatIsIt:
        "En CediMujer transformamos la ecografía prenatal en un encuentro emocional inolvidable entre los padres, la familia y el bebé. La ecografía 3D obtiene imágenes tridimensionales estáticas de alta precisión, mientras que la tecnología 4D HD Live muestra al bebé en movimiento en tiempo real con iluminación virtual realista que resalta sus facciones, bostezos, sonrisas y gestos.",
      howItIsDone:
        "Además de realizar una valoración completa del crecimiento, peso fetal, posición, placenta y líquido amniótico en 2D, activamos el transductor volumétrico 3D/4D HD Live mientras la mamá y sus acompañantes observan al bebé en una pantalla gigante de alta definición. Nuestro equipo tiene toda la paciencia y dedicación para lograr que tu bebé muestre su carita.",
      preparationAndIndications: [
        "Edad gestacional ideal: entre las semanas 24 y 30 de embarazo (cuando hay buen líquido amniótico y facciones definidas).",
        "No aplicar cremas hidratantes ni aceites en el abdomen desde el día anterior.",
        "Incluye entrega de fotografías y registro multimedia de la sesión.",
      ],
      highlights: [
        "Tecnología 4D HD Live de textura e iluminación realista",
        "Pantalla adicional en consultorio para mamá y acompañantes",
        "Disponible paquete combinado: Detalle Anatómico + 3D/4D",
      ],
      image: "/assets/images/equipo2.jpg",
      recommendedSpecialist: "Dr. Diego León Gaviria Méndez",
      durationOrTiming: "Ideal entre semanas 24 y 30",
    },
  ],
};

export const GINECOLOGIA_SERVICES: {
  ecografias: ServiceItemDetail[];
  consultas: ServiceItemDetail[];
  tamizajes: ServiceItemDetail[];
  procedimientos: ServiceItemDetail[];
} = {
  ecografias: [
    {
      id: "gin-eco-transvaginal",
      title: "Ecografía pélvica transvaginal",
      subcategory: "Ecografías Ginecológicas",
      shortDescription:
        "Estudio ecográfico de máxima resolución para evaluar detalladamente el útero, endometrio, ovarios, trompas y cuello uterino.",
      whatIsIt:
        "La Ecografía Pélvica Transvaginal es el examen diagnóstico de primera elección en ginecología para visualizar con gran nitidez los órganos reproductivos internos. Permite diagnosticar miomas uterinos, pólipos endometriales, quistes de ovario, ovarios poliquísticos, adenomiosis, endometriosis, malformaciones uterinas y verificar la posición de dispositivos intrauterinos (DIU).",
      howItIsDone:
        "Con la paciente en posición ginecológica cómoda y en un ambiente de total privacidad, el especialista introduce suavemente un transductor endocavitario delgado recubierto con una funda protectora estéril y gel conductor. Al estar cerca del útero y los ovarios, ofrece imágenes de resolución superior sin molestias.",
      preparationAndIndications: [
        "Se realiza con la vejiga vacía (se te pedirá orinar justo antes de ingresar).",
        "Puede realizarse en cualquier día del ciclo menstrual, incluso con sangrado si el médico lo solicita.",
        "Entrega inmediata del reporte e imágenes diagnósticas.",
      ],
      highlights: [
        "Diagnóstico preciso de miomas, quistes, pólipos y endometrio",
        "Control de ubicación de dispositivo intrauterino (DIU)",
        "Realizada directamente por médico especialista en Ginecología",
      ],
      image: "/assets/images/equipo1.jpg",
      recommendedSpecialist: "Especialistas en Ginecología CediMujer",
      durationOrTiming: "15 - 20 minutos • Entrega inmediata",
    },
    {
      id: "gin-eco-suprapubica",
      title: "Ecografía pélvica suprapúbica",
      subcategory: "Ecografías Ginecológicas",
      shortDescription:
        "Ultrasonido pélvico realizado sobre la parte baja del abdomen, ideal para niñas, adolescentes o mujeres que no han iniciado vida sexual.",
      whatIsIt:
        "Es un estudio ecográfico no invasivo que permite visualizar el útero, el endometrio, los ovarios y la vejiga a través de la pared abdominal inferior. Está especialmente indicada en niñas, adolescentes, mujeres que no han tenido relaciones sexuales o para evaluar masas pélvicas y miomas de gran tamaño.",
      howItIsDone:
        "La paciente se recuesta boca arriba en la camilla. El especialista aplica gel tibio en la parte baja del abdomen (región suprapúbica) y desliza el transductor abdominal. Tener la vejiga llena actúa como una ventana acústica que desplaza el intestino y permite ver con claridad el útero y los ovarios.",
      preparationAndIndications: [
        "Requiere asistir con la vejiga llena: tomar de 4 a 6 vasos de agua 1 hora antes de la cita y no orinar.",
        "Estudio 100% externo, indoloro y libre de radiación.",
        "Acompañamiento cálido y respetuoso para niñas y adolescentes.",
      ],
      highlights: [
        "Examen externo por vía abdominal sin molestias",
        "Ideal para adolescentes y chequeo ginecológico no invasivo",
        "Evaluación panorámica de la pelvis femenina",
      ],
      image: "/assets/images/equipo1vista2.jpg",
      recommendedSpecialist: "Especialistas en Ginecología CediMujer",
      durationOrTiming: "15 - 20 minutos • Requiere vejiga llena",
    },
    {
      id: "gin-eco-piso-pelvico",
      title: "Ecografía de piso pélvico",
      subcategory: "Ecografías Ginecológicas",
      shortDescription:
        "Evaluación funcional y anatómica de la musculatura del suelo pélvico, vejiga, uretra y compartimentos vaginales.",
      whatIsIt:
        "La Ecografía de Piso Pélvico (transperineal / translabial y endovaginal) es un estudio especializado que evalúa la anatomía y el funcionamiento dinámico de los músculos elevadores del ano, el hiato urogenital, la vejiga, la uretra, el útero y el compartimento posterior. Es fundamental en el estudio de la incontinencia urinaria, prolapso genital (descenso de vejiga o útero) y disfunciones posparto.",
      howItIsDone:
        "El especialista realiza la evaluación en reposo y durante maniobras dinámicas (contracción del suelo pélvico y maniobra de Valsalva/pujo), empleando tecnología ecográfica 2D y reconstrucción 3D/4D para observar con precisión milimétrica el soporte de los órganos pélvicos y posibles mallas o cintas suburetrales.",
      preparationAndIndications: [
        "Indicada en sensación de peso o bulto vaginal, escapes de orina al toser o hacer ejercicio, y dolor pélvico crónico.",
        "No requiere ayuno ni preparación intestinal compleja.",
        "Permite planear el tratamiento rehabilitador o quirúrgico más adecuado.",
      ],
      highlights: [
        "Evaluación dinámica en reposo, contracción y pujo",
        "Diagnóstico preciso de prolapso genital e incontinencia urinaria",
        "Tecnología volumétrica 3D/4D del hiato urogenital",
      ],
      image: "/assets/images/equipo1vista3.jpg",
      recommendedSpecialist: "Dr. Diego León Gaviria / Equipo Ginecológico CediMujer",
      durationOrTiming: "20 - 30 minutos • Entrega inmediata",
    },
    {
      id: "gin-monitoreo-foliculo",
      title: "Monitoreo de folículo",
      subcategory: "Ecografías Ginecológicas",
      shortDescription:
        "Seguimiento ecográfico seriado de la ovulación y el grosor endometrial para identificar los días de mayor fertilidad.",
      whatIsIt:
        "También llamado Estudio Integral Folicular o Foliculograma, consiste en una serie de ecografías transvaginales realizadas en días específicos del ciclo menstrual para observar el crecimiento de los folículos ováricos hasta que alcanzan el tamaño preovulatorio (folículo dominante de 18 a 22 mm) y se produce la ovulación, además de medir la receptividad del endometrio.",
      howItIsDone:
        "Se inicia habitualmente entre el día 9 y 11 del ciclo menstrual y se repite cada 2 o 3 días según el crecimiento folicular observado. En cada sesión el especialista mide el número y diámetro de los folículos en ambos ovarios y el grosor y patrón trilaminar del endometrio, indicando a la pareja los días exactos de máxima probabilidad de embarazo.",
      preparationAndIndications: [
        "Conocer la fecha exacta del primer día de tu última menstruación.",
        "Fundamental en parejas que buscan embarazo de forma dirigida o bajo inducción de ovulación.",
        "Vejiga vacía al momento de cada control ecográfico.",
      ],
      highlights: [
        "Seguimiento seriado del folículo dominante y ovulación",
        "Medición del grosor y calidad del endometrio",
        "Orientación médica precisa de los días fértiles",
      ],
      image: "/assets/images/trabajo.jpg",
      recommendedSpecialist: "Especialistas en Fertilidad y Ginecología CediMujer",
      durationOrTiming: "Controles seriados durante el ciclo ovulatorio",
    },
    {
      id: "gin-eco-mama",
      title: "Ecografía de mama o de seno",
      subcategory: "Ecografías Ginecológicas",
      shortDescription:
        "Ultrasonido mamario y axilar de alta resolución para la detección temprana de quistes, fibroadenomas y nódulos mamarios.",
      whatIsIt:
        "La Ecografía de Mama (o de Seno) utiliza ondas de ultrasonido de alta frecuencia para explorar detalladamente el tejido mamario y las regiones axilares. Permite distinguir si un nódulo es líquido (quiste benigno) o sólido (como un fibroadenoma o lesión sospechosa), evaluar mamas densas, dolor mamario, secreciones por el pezón o el estado de implantes mamarios.",
      howItIsDone:
        "La paciente se recuesta descubriendo el tórax en un ambiente cálido y privado. El especialista aplica gel conductor y recorre de forma sistemática todos los cuadrantes de ambas mamas, la región retroareolar y ambas axilas con un transductor lineal de alta definición, clasificando los hallazgos según el sistema internacional BI-RADS.",
      preparationAndIndications: [
        "Estudio de primera línea en mujeres menores de 40 años y complemento indispensable de la mamografía después de los 40 años.",
        "No requiere ayuno; evita aplicar talcos, desodorantes en crema o lociones en el pecho y axilas el día del examen.",
        "Llevar ecografías de seno o mamografías anteriores para estudio comparativo.",
      ],
      highlights: [
        "Clasificación internacional BI-RADS de alta precisión",
        "Exploración bilateral completa de tejido mamario y axilas",
        "Sin radiación ni compresión dolorosa (ideal también en embarazo y lactancia)",
      ],
      image: "/assets/images/equipo2.jpg",
      recommendedSpecialist: "Equipo Médico CediMujer",
      durationOrTiming: "20 minutos • Entrega inmediata del informe",
    },
  ],
  consultas: [
    {
      id: "gin-consulta-preconcepcional",
      title: "Consulta Preconcepcional",
      subcategory: "Consultas Ginecológicas",
      shortDescription:
        "Preparación médica, nutricional y ginecológica integral para la mujer y su pareja antes de iniciar la búsqueda de un bebé.",
      whatIsIt:
        "Una valoración preventiva clave donde revisamos tu salud ginecológica, función tiroidea, reserva ovárica, estado inmunológico y hábitos de vida antes de quedar en embarazo, minimizando riesgos tanto para la futura mamá como para el bebé.",
      howItIsDone:
        "Incluye entrevista médica detallada, examen físico y ginecológico, revisión de citología y ecografía pélvica, prescripción de ácido fólico pre-gestacional y ordenamiento de perfil infeccioso y metabólico preconcepcional.",
      preparationAndIndications: [
        "Ideal acudir entre 3 y 6 meses antes de suspender el método anticonceptivo.",
        "Traer historial de vacunas y exámenes de laboratorio recientes.",
      ],
      highlights: [
        "Chequeo ginecológico previo a la gestación",
        "Optimización metabólica y suplementación con ácido fólico",
        "Asesoría sobre días fértiles y salud reproductiva",
      ],
      image: "/assets/images/sala1.jpg",
      recommendedSpecialist: "Especialistas en Ginecología y Obstetricia CediMujer",
    },
    {
      id: "gin-consulta-ginecologica",
      title: "Consulta Ginecológica",
      subcategory: "Consultas Ginecológicas",
      shortDescription:
        "Atención médica especializada e integral en todas las etapas de la mujer: adolescencia, edad reproductiva, climaterio y menopausia.",
      whatIsIt:
        "La consulta ginecológica en CediMujer está diseñada para escuchar, diagnosticar y tratar de manera integral cualquier condición de salud femenina: alteraciones del ciclo menstrual, síndrome de ovario poliquístico (SOP), infecciones vaginales recurrentes, dolor pélvico, endometriosis, miomatosis uterina, incontinencia urinaria y síntomas de la menopausia.",
      howItIsDone:
        "En un espacio de total empatía, respeto y confidencialidad, nuestras especialistas realizan una historia clínica detallada, examen físico mamario y ginecológico completo, y definen un plan diagnóstico o terapéutico claro y personalizado para tu bienestar.",
      preparationAndIndications: [
        "Recomendada al menos una vez al año como chequeo preventivo.",
        "Anotar la fecha de tu última menstruación y los síntomas o dudas que deseas consultar.",
        "Puedes complementarla el mismo día con ecografía transvaginal y citología (Tamizaje).",
      ],
      highlights: [
        "Atención sin prisas con explicaciones claras y humanas",
        "Manejo de alteraciones menstruales, SOP, miomas y menopausia",
        "Posibilidad de realizar ecografía y citología en la misma visita",
      ],
      image: "/assets/images/sala1.jpg",
      recommendedSpecialist: "Dr. Diego León Gaviria / Dra. Durley Maya / Dra. María Rosa Hernández / Dr. Enrique Olivares",
    },
    {
      id: "gin-consulta-planificacion",
      title: "Consulta de Planificación Familiar",
      subcategory: "Consultas Ginecológicas",
      shortDescription:
        "Asesoría médica personalizada para elegir el método anticonceptivo ideal según tu organismo, estilo de vida y proyectos.",
      whatIsIt:
        "Cada mujer es única y necesita un método de planificación que se adapte a su perfil hormonal, antecedentes médicos y preferencias. En esta consulta te orientamos científicamente sobre todos los métodos anticonceptivos modernos de corta y larga duración.",
      howItIsDone:
        "Evaluamos tus antecedentes personales, ciclo menstrual y objetivos reproductivos, explicándote los beneficios, efectividad y características de dispositivos intrauterinos hormonales (Mirena, Kyleena, Jaydess), T de Cobre, implantes subdérmicos (Jadelle, Implanon), anticonceptivos orales, inyectables o anillos vaginales.",
      preparationAndIndications: [
        "No requiere preparación especial.",
        "Si deseas colocación de DIU o implante subdérmico, podemos programarlo de forma rápida y segura en nuestra sede.",
      ],
      highlights: [
        "Elección personalizada según criterios médicos de la OMS",
        "Especialistas en sistemas intrauterinos (Mirena, Kyleena, T de Cobre)",
        "Implantes subdérmicos y anticoncepción libre de estrógenos",
      ],
      image: "/assets/images/sala2.jpg",
      recommendedSpecialist: "Equipo de Ginecología CediMujer",
    },
    {
      id: "gin-consulta-infertilidad",
      title: "Infertilidad",
      subcategory: "Consultas Ginecológicas",
      shortDescription:
        "Estudio diagnóstico integral y acompañamiento especializado para la mujer y la pareja con dificultad para lograr el embarazo.",
      whatIsIt:
        "Abordamos de manera cálida, estructurada y científica las causas femeninas y masculinas que dificultan la concepción (cuando ha transcurrido un año de búsqueda sin éxito, o 6 meses en mujeres mayores de 35 años), o en casos de pérdidas gestacionales recurrentes.",
      howItIsDone:
        "Evaluamos los factores clave de la fertilidad: factor ovulatorio y hormonal (reserva ovárica, tiroides, prolactina), factor uterino y tubárico (ecografía transvaginal de alta resolución, histerosonografía/histerosalpingografía) y factor masculino, guiando tratamientos de baja complejidad como inducción de ovulación y monitoreo folicular.",
      preparationAndIndications: [
        "Se recomienda asistir en pareja si es posible.",
        "Llevar todos los estudios previos hormonales, ecográficos o espermograma realizados.",
      ],
      highlights: [
        "Estudio integral del factor ovulatorio, uterino y endocrino",
        "Inducción de ovulación y monitoreo ecográfico folicular",
        "Acompañamiento empático y humano en el sueño de ser mamá",
      ],
      image: "/assets/images/trabajo.jpg",
      recommendedSpecialist: "Especialistas en Ginecología y Fertilidad CediMujer",
    },
    {
      id: "gin-consulta-mama",
      title: "Consulta de mama",
      subcategory: "Consultas Ginecológicas",
      shortDescription:
        "Valoración clínica especializada de los senos para prevención, estudio de dolor mamario (mastalgia), nódulos o secreciones.",
      whatIsIt:
        "Es la consulta médica enfocada en el cuidado preventivo de la salud mamaria y en la evaluación oportuna de cualquier síntoma o hallazgo en los senos: masas palpables, dolor mamario cíclico o no cíclico, quistes, fibroadenomas, cambios en la piel, retracción o secreción por el pezón.",
      howItIsDone:
        "El especialista evalúa tus factores de riesgo personales y familiares, realiza un examen físico clínico detallado de ambas mamas y regiones ganglionares axilares y supraclaviculares, interpreta tus estudios de imagen (ecografía mamaria y mamografía) y te enseña la técnica correcta del autoexamen mamario.",
      preparationAndIndications: [
        "Llevar los reportes e imágenes de ecografías de seno o mamografías anteriores.",
        "Acudir de inmediato si notas cualquier masa, hundimiento o secreción en el seno.",
      ],
      highlights: [
        "Examen clínico especializado de mamas y axilas",
        "Estudio de nódulos, fibroadenomas, quistes y mastalgia",
        "Integrable con Ecografía de Mama en la misma cita (Tamizaje de Mama)",
      ],
      image: "/assets/images/equipo2.jpg",
      recommendedSpecialist: "Especialistas en Ginecología CediMujer",
    },
  ],
  tamizajes: [
    {
      id: "gin-tamizaje-basico",
      title: "Tamizaje Ginecológico Básico",
      subcategory: "Tamizajes Preventivos",
      shortDescription:
        "Paquete preventivo integral que incluye: Consulta con Especialista en Ginecología + Toma de Citología + Ecografía Pélvica Transvaginal.",
      whatIsIt:
        "El Tamizaje Ginecológico Básico de CediMujer está diseñado para que realices tu chequeo anual completo en una sola visita, ahorrando tiempo y obteniendo un diagnóstico integral tanto del cuello uterino como del útero y los ovarios.",
      howItIsDone:
        "En una misma atención coordinada: 1) El especialista realiza tu Consulta Ginecológica completa y examen físico; 2) Se realiza la Toma de Citología cérvico-uterina para prevención de cáncer de cuello uterino; y 3) Se practica la Ecografía Pélvica Transvaginal de alta resolución para evaluar útero, endometrio y ovarios.",
      preparationAndIndications: [
        "No estar con el periodo menstrual (idealmente 4 a 5 días después de finalizado el sangrado).",
        "Evitar relaciones sexuales, duchas vaginales y aplicación de óvulos o cremas vaginales durante las 72 horas previas.",
        "Todo se realiza en una sola cita con nuestras especialistas.",
      ],
      highlights: [
        "Incluye: Consulta Ginecológica Especializada",
        "Incluye: Toma de Citología de cuello uterino",
        "Incluye: Ecografía Pélvica Transvaginal HD",
      ],
      image: "/assets/images/sala1.jpg",
      recommendedSpecialist: "Equipo de Ginecología CediMujer",
      durationOrTiming: "Chequeo Anual • 3 servicios en 1 sola cita",
    },
    {
      id: "gin-tamizaje-mama",
      title: "Tamizaje de mama",
      subcategory: "Tamizajes Preventivos",
      shortDescription:
        "Paquete especializado de salud mamaria que incluye: Consulta con Especialista en Ginecología + Ecografía de Mama (Seno).",
      whatIsIt:
        "El Tamizaje de Mama combina la valoración clínica presencial del médico especialista con la exploración por ultrasonido de alta resolución de ambos senos y axilas, permitiendo detectar precozmente quistes, fibroadenomas o lesiones no palpables.",
      howItIsDone:
        "En una sola cita el especialista realiza tu historia clínica enfocada en factores de riesgo mamario, practica la palpación clínica detallada de ambas mamas y axilas, y realiza inmediatamente la Ecografía Mamaria Bilateral de alta definición, entregándote el resultado y las recomendaciones al instante.",
      preparationAndIndications: [
        "No aplicar desodorante en crema, talcos ni lociones en los senos o axilas el día de la cita.",
        "Llevar estudios previos de mama (ecografías o mamografías anteriores) si los tienes.",
        "Recomendado anualmente para la detección temprana del cáncer de mama.",
      ],
      highlights: [
        "Incluye: Consulta Especializada de Mama y Ginecología",
        "Incluye: Ecografía de Mama o de Seno Bilateral",
        "Entrega inmediata del informe ecográfico y plan de cuidado",
      ],
      image: "/assets/images/equipo2.jpg",
      recommendedSpecialist: "Equipo de Ginecología CediMujer",
      durationOrTiming: "Prevención Mamaria • 2 servicios en 1 sola cita",
    },
    {
      id: "gin-tamizaje-completo",
      title: "Tamizaje Ginecológico Completo",
      subcategory: "Tamizajes Preventivos",
      shortDescription:
        "Nuestro chequeo femenino más completo: Consulta Ginecológica + Toma de Citología + Ecografía Pélvica Transvaginal + Ecografía de Mama.",
      whatIsIt:
        "Es el paquete insignia de prevención integral de CediMujer. Reúne en una única visita los cuatro pilares fundamentales del cuidado anual de la mujer para revisar cuello uterino, útero, ovarios y senos con tecnología de punta y acompañamiento médico experto.",
      howItIsDone:
        "Durante tu cita realizamos de forma integrada y cómoda: 1) Consulta con médico especialista en Ginecología, 2) Toma de Citología cérvico-uterina (o integrable con Test de VPH), 3) Ecografía Pélvica Transvaginal de alta definición y 4) Ecografía de Mama (Seno) bilateral.",
      preparationAndIndications: [
        "Asistir sin menstruación (al menos 4 días después de terminar el periodo).",
        "Abstinencia sexual y no usar óvulos, duchas ni cremas vaginales 72 horas antes.",
        "No aplicar cremas ni talcos en el pecho o axilas el día del chequeo.",
      ],
      highlights: [
        "Incluye: Consulta Especializada + Citología Cérvico-Uterina",
        "Incluye: Ecografía Pélvica Transvaginal + Ecografía de Mama",
        "El chequeo preventivo anual 360° más completo en Sabaneta",
      ],
      image: "/assets/images/trabajo.jpg",
      recommendedSpecialist: "Equipo de Especialistas CediMujer",
      durationOrTiming: "Chequeo Integral 4 en 1 en una sola cita",
    },
  ],
  procedimientos: [
    {
      id: "gin-proc-colposcopia",
      title: "Colposcopia",
      subcategory: "Procedimientos Ginecológicos",
      shortDescription:
        "Examen visual aumentado de alta precisión del cuello uterino, vagina y vulva para detectar y estudiar lesiones premalignas o por VPH.",
      whatIsIt:
        "La Colposcopia es un procedimiento diagnóstico ambulatorio, rápido y seguro en el que el médico especialista examina el cuello del útero (cérvix), la vagina y la vulva a través de un microscopio especial con luz de alta intensidad llamado colposcopio. Se indica principalmente cuando el resultado de la citología es anormal (ASCUS, LIE de bajo o alto grado), cuando el Test de VPH es positivo o ante sangrado con las relaciones sexuales.",
      howItIsDone:
        "Con la paciente en posición ginecológica, se coloca suavemente un espéculo vaginal y se observa el cuello uterino a través del colposcopio (que permanece fuera del cuerpo). El especialista aplica dos soluciones médicas suaves (ácido acético y solución de Lugol / test de Schiller) que tiñen temporalmente las células anormales, permitiendo identificar con total exactitud si existe alguna lesión y, de ser necesario, tomar una pequeña biopsia dirigida.",
      preparationAndIndications: [
        "No estar menstruando ni presentar sangrado vaginal activo el día del examen.",
        "Evitar relaciones sexuales, duchas vaginales, tampones y óvulos durante los 4 a 5 días previos.",
        "Traer obligatoriamente el reporte de la citología previa o resultado del Test de VPH.",
      ],
      highlights: [
        "Visualización microscópica de alta definición del cérvix",
        "Permite toma de biopsia dirigida si se identifican lesiones",
        "Realizada por especialistas diplomados en Patología Cervical y Colposcopia",
      ],
      image: "/assets/images/sala2.jpg",
      recommendedSpecialist: "Dra. Durley Maya Salazar / Especialistas CediMujer",
      durationOrTiming: "Procedimiento ambulatorio (15 - 20 min)",
    },
    {
      id: "gin-proc-citologia",
      title: "Toma de citología",
      subcategory: "Procedimientos Ginecológicos",
      shortDescription:
        "Prueba fundamental de tamizaje para la detección temprana de alteraciones celulares y prevención del cáncer de cuello uterino.",
      whatIsIt:
        "La Citología Cérvico-Uterina (prueba de Papanicolaou) es un examen sencillo y vital que recolecta células de la superficie externa (exocérvix) y del canal interno (endocérvix) del cuello uterino para analizarlas bajo el microscopio y detectar a tiempo cambios celulares pre-cancerosos causados por el Virus del Papiloma Humano (VPH) o infecciones cérvico-vaginales.",
      howItIsDone:
        "En una de nuestras salas de atención y con material 100% desechable y estéril, se introduce delicadamente un espéculo vaginal anatómico. Con una espátula suave y un citocepillo endocervical se toma una muestra superficial de células en pocos segundos, de manera prácticamente indolora, que luego es procesada por patología especializada.",
      preparationAndIndications: [
        "Acudir fuera del periodo menstrual (preferiblemente 5 días después de finalizado el sangrado).",
        "No haber tenido relaciones sexuales en las 72 horas previas al examen.",
        "No haberse aplicado óvulos, cremas ni duchas vaginales durante los 5 días anteriores.",
      ],
      highlights: [
        "Prevención oportuna del cáncer de cuello uterino",
        "Toma suave, rápida y con insumos estériles desechables",
        "Acompañamiento profesional e interpretación médica del resultado",
      ],
      image: "/assets/images/sala1.jpg",
      recommendedSpecialist: "Equipo de Salud Femenina CediMujer",
      durationOrTiming: "10 - 15 minutos • Procedimiento rápido",
    },
    {
      id: "gin-proc-test-vph",
      title: "Test de VPH o Papiloma virus",
      subcategory: "Procedimientos Ginecológicos",
      shortDescription:
        "Prueba molecular de ADN de alta sensibilidad para detectar la presencia de cepas de alto riesgo del Virus del Papiloma Humano.",
      whatIsIt:
        "El Test de VPH (Tipificación del Virus del Papiloma Humano) es una prueba molecular avanzada que detecta directamente el material genético (ADN/ARN) de los genotipos de VPH de alto riesgo oncogénico (como los tipos 16 y 18, entre otros) en el cuello uterino, incluso antes de que produzcan alteraciones visibles en la citología convencional.",
      howItIsDone:
        "Se toma de la misma forma rápida y sencilla que una citología: mediante la colocación suave de un espéculo, se recolecta una muestra celular del cuello uterino con un cepillo especial que se deposita en un medio líquido de transporte molecular para su análisis automatizado de alta precisión.",
      preparationAndIndications: [
        "Especialmente recomendado en mujeres a partir de los 30 años o como complemento a la citología (Co-testing).",
        "No acudir durante la menstruación.",
        "Evitar relaciones sexuales, óvulos y cremas vaginales 3 a 5 días antes de la toma.",
      ],
      highlights: [
        "Mayor sensibilidad diagnóstica para prevención de cáncer de cérvix",
        "Identificación molecular de cepas de alto riesgo (VPH 16, 18 y otros)",
        "Toma de muestra en medio líquido rápida e indolora",
      ],
      image: "/assets/images/equipo1.jpg",
      recommendedSpecialist: "Especialistas en Ginecología CediMujer",
      durationOrTiming: "10 - 15 minutos • Tamizaje molecular",
    },
    {
      id: "gin-proc-diu",
      title: "Colocación o retiro de dispositivo intrauterino",
      subcategory: "Procedimientos Ginecológicos",
      shortDescription:
        "Inserción o extracción segura en consultorio de sistemas intrauterinos hormonales (Mirena, Kyleena, Jaydess) o T de Cobre.",
      whatIsIt:
        "El Dispositivo Intrauterino (DIU) es uno de los métodos anticonceptivos reversibles de larga duración (LARC) más seguros y efectivos del mundo (>99% de eficacia). En CediMujer realizamos tanto la colocación como el retiro de dispositivos liberadores de levonorgestrel (Mirena, Kyleena, Jaydess —que además disminuyen el sangrado y los cólicos menstruales—) y dispositivos libres de hormonas (T de Cobre).",
      howItIsDone:
        "El procedimiento se realiza de manera ambulatoria en consultorio por el médico especialista en Ginecología. Previa valoración del útero (e histerometría), se inserta suavemente el dispositivo a través del canal cervical utilizando su aplicador estéril ultradelgado. En CediMujer podemos verificar por ecografía transvaginal que el dispositivo quede perfectamente posicionado. Para el retiro, se tracciona suavemente de los hilos guía en pocos segundos.",
      preparationAndIndications: [
        "Idealmente se coloca durante los primeros días de la menstruación (cuando el cuello uterino está más permeable) o habiendo descartado embarazo.",
        "Se recomienda tomar un analgésico antiinflamatorio 1 hora antes de la colocación según indicación médica.",
        "Procedimiento rápido de consultorio con retorno inmediato a tus actividades.",
      ],
      highlights: [
        "Inserción y retiro de DIU Mirena, Kyleena, Jaydess y T de Cobre",
        "Verificación ecográfica de la correcta posición intrauterina",
        "Protección anticonceptiva de 3, 5 hasta 8-10 años según el dispositivo",
      ],
      image: "/assets/images/sala2.jpg",
      recommendedSpecialist: "Dr. Diego León Gaviria / Dra. Durley Maya Salazar",
      durationOrTiming: "15 - 20 minutos en consultorio",
    },
    {
      id: "gin-proc-implante-subdermico",
      title: "Colocación o retiro de implantes subdérmicos",
      subcategory: "Procedimientos Ginecológicos",
      shortDescription:
        "Inserción o retiro con anestesia local de implantes anticonceptivos subdérmicos en el brazo (Jadelle, Implanon).",
      whatIsIt:
        "El implante subdérmico consiste en una o dos pequeñas varillas flexibles del tamaño de un fósforo que se colocan justo debajo de la piel en la cara interna del brazo. Libera de forma continua una dosis baja de progestina, brindando una eficacia anticonceptiva superior al 99% durante 3 a 5 años sin depender de la toma diaria de pastillas.",
      howItIsDone:
        "Es un procedimiento ambulatorio menor muy cómodo: el especialista realiza asepsia de la cara interna del brazo no dominante, aplica anestesia local para que no sientas dolor e introduce el implante bajo la piel con su aplicador estéril (o realiza una microincisión milimétrica para retirarlo), colocando finalmente un vendaje compresivo suave sin necesidad de puntos de sutura complejos.",
      preparationAndIndications: [
        "Descartar embarazo previamente o asistir en los primeros 5 días del ciclo menstrual.",
        "Mantener el vendaje seco durante las primeras 24 a 48 horas posteriores al procedimiento.",
        "Ideal también para mujeres en lactancia o que no pueden recibir estrógenos.",
      ],
      highlights: [
        "Procedimiento bajo anestesia local sin dolor",
        "Alta efectividad anticonceptiva de 3 a 5 años (Implanon / Jadelle)",
        "Retiro seguro y cambio inmediato si deseas continuar planificando",
      ],
      image: "/assets/images/sala1.jpg",
      recommendedSpecialist: "Especialistas en Ginecología CediMujer",
      durationOrTiming: "15 - 20 minutos • Con anestesia local",
    },
    {
      id: "gin-proc-topicaciones",
      title: "Topicaciones",
      subcategory: "Procedimientos Ginecológicos",
      shortDescription:
        "Tratamiento médico ambulatorio localizado para eliminar condilomas, verrugas genitales o lesiones benignas en cérvix, vagina o vulva.",
      whatIsIt:
        "Las Topicaciones Ginecológicas son un procedimiento terapéutico ambulatorio que consiste en la aplicación controlada y localizada de sustancias químicas médicas (como ácido tricloroacético concentrado u otros agentes cauterizantes) sobre lesiones superficiales en el cuello uterino, vagina, vulva o región perineal, tales como verrugas genitales (condilomas por VPH), granulomas o ectropión sintomático.",
      howItIsDone:
        "En consultorio y bajo visión directa o colposcópica para proteger el tejido sano circundante, el especialista aplica con un aplicador fino la sustancia médica directamente sobre cada lesión. Esto produce una coagulación química selectiva de las proteínas del tejido afectado, permitiendo que la lesión se desprenda y cicatrice con epitelio sano.",
      preparationAndIndications: [
        "Acudir sin sangrado menstrual activo.",
        "Evitar relaciones sexuales durante los días posteriores indicados por el especialista para favorecer la cicatrización.",
        "Según el número y tamaño de las lesiones, pueden requerirse una o varias sesiones de control.",
      ],
      highlights: [
        "Tratamiento focalizado, rápido y sin requerir quirófano",
        "Eliminación efectiva de condilomas y lesiones benignas superficiales",
        "Seguimiento médico especializado de la cicatrización",
      ],
      image: "/assets/images/sala2.jpg",
      recommendedSpecialist: "Dra. Durley Maya Salazar / Especialistas CediMujer",
      durationOrTiming: "15 minutos • Ambulatorio en consultorio",
    },
  ],
};

export const TELEMEDICINA_SERVICES: ServiceItemDetail[] = [
  {
    id: "tele-ginecologia",
    title: "Teleconsulta con especialista en Ginecología",
    subcategory: "Telemedicina CediMujer",
    shortDescription:
      "Atención médica virtual interactiva con nuestros ginecólogos desde la comodidad de tu hogar para orientación, revisión de exámenes y formulación.",
    whatIsIt:
      "La Teleconsulta de Ginecología de CediMujer te conecta por videollamada privada y segura con nuestros médicos especialistas en Ginecología y Obstetricia. Es ideal para recibir orientación médica oportuna, lectura e interpretación de resultados de citología, biopsias, ecografías o laboratorios, ajuste de tratamientos hormonales y resolución de dudas sin necesidad de desplazarte.",
    howItIsDone:
      "Agendas tu cita virtual a través de nuestra línea de WhatsApp (+57 311 397 9905) o formulario web. A la hora programada te conectas por videollamada con el especialista, quien realiza la entrevista clínica, revisa tus estudios diagnósticos en pantalla y te envía a tu correo electrónico o WhatsApp el resumen de atención, órdenes médicas y fórmula médica oficial.",
    preparationAndIndications: [
      "Contar con conexión estable a internet desde tu celular o computador en un espacio privado.",
      "Enviar previamente por WhatsApp o correo los resultados de laboratorio o ecografías que deseas revisar.",
      "Tener a la mano el nombre de los medicamentos que tomas actualmente y la fecha de tu última menstruación.",
    ],
    highlights: [
      "Atención directa por Ginecólogos certificados de CediMujer",
      "Lectura de resultados de exámenes, citologías y ecografías",
      "Envío digital de fórmulas médicas y órdenes de laboratorio",
    ],
    image: "/assets/images/trabajo.jpg",
    recommendedSpecialist: "Equipo de Especialistas en Ginecología CediMujer",
    durationOrTiming: "Videoconsulta personalizada • Sin desplazamientos",
  },
  {
    id: "tele-planificacion",
    title: "Teleconsulta de planificación familiar",
    subcategory: "Telemedicina CediMujer",
    shortDescription:
      "Asesoría anticonceptiva virtual personalizada para elegir, iniciar o cambiar tu método de planificación familiar con respaldo médico.",
    whatIsIt:
      "Es una consulta virtual especializada enfocada en guiarte en la elección o seguimiento de tu método anticonceptivo. Nuestro especialista evalúa tu historia clínica y preferencias para recomendarte el método más seguro y efectivo, o resolver efectos secundarios de tu método actual.",
    howItIsDone:
      "Durante la videollamada, el ginecólogo aplica los criterios médicos de elegibilidad, te explica detalladamente cada alternativa (píldoras, inyectables, parche, anillo, implante subdérmico o dispositivos intrauterinos como Mirena y T de Cobre), emite la fórmula médica digital o deja programada tu cita presencial en Sabaneta si eliges la inserción de un DIU o implante.",
    preparationAndIndications: [
      "Conocer la fecha de tu última menstruación y qué métodos has utilizado antes.",
      "Informar si padeces migraña, hipertensión o si te encuentras en periodo de lactancia.",
    ],
    highlights: [
      "Asesoría experta sin salir de casa",
      "Formulación digital inmediata de anticonceptivos",
      "Programación prioritaria si deseas colocación de DIU o implante",
    ],
    image: "/assets/images/sala1.jpg",
    recommendedSpecialist: "Especialistas en Ginecología CediMujer",
    durationOrTiming: "Videoconsulta • Fórmula médica digital incluida",
  },
  {
    id: "tele-infertilidad",
    title: "Teleconsulta de Infertilidad",
    subcategory: "Telemedicina CediMujer",
    shortDescription:
      "Primera valoración o control virtual para parejas que buscan embarazo, revisión de estudios de fertilidad y plan diagnóstico.",
    whatIsIt:
      "La Teleconsulta de Infertilidad permite a la mujer y su pareja tener un primer acercamiento especializado o dar seguimiento a su estudio de fertilidad desde cualquier lugar. Evaluamos el tiempo de búsqueda, ciclos menstruales, antecedentes y exámenes previos para trazar una ruta clara hacia el embarazo.",
    howItIsDone:
      "En la sesión virtual conjunta con la pareja, el especialista analiza la historia reproductiva, revisa los perfiles hormonales, espermograma o ecografías previas, ordena los estudios complementarios necesarios en los días exactos del ciclo menstrual y coordina el inicio de monitoreo folicular ecográfico en nuestra sede.",
    preparationAndIndications: [
      "Recomendamos conectarse en pareja para evaluar los antecedentes de ambos.",
      "Tener digitalizados los resultados de laboratorio, hormonas o ecografías previas.",
    ],
    highlights: [
      "Orientación reproductiva inicial y revisión de paraclínicos",
      "Planificación de estudios según el día del ciclo menstrual",
      "Trato empático, confidencial y acompañamiento continuo",
    ],
    image: "/assets/images/equipo1vista2.jpg",
    recommendedSpecialist: "Especialistas en Ginecología y Fertilidad CediMujer",
    durationOrTiming: "Videoconsulta en pareja o individual",
  },
];

// ============================================================================
// QUIÉNES SOMOS - ESPECIALISTAS, SEDE, INSTITUCIÓN Y ASOCIACIÓN DE USUARIOS
// ============================================================================

export const ESPECIALISTAS_CEDIMUJER: SpecialistProfile[] = [
  {
    id: "dr-diego-gaviria",
    name: "Dr. Diego León Gaviria Méndez",
    role: "Médico Especialista en Ginecología y Obstetricia · Fundador",
    credentials: [
      "Médico y Cirujano — Universidad de Antioquia (1993)",
      "Especialista en Ginecología y Obstetricia — Universidad de Antioquia",
      "Especialista en Gerencia de IPS — Universidad CES (2008)",
    ],
    bio: "Reconocido por miles de familias en el Valle de Aburrá por su extraordinaria calidad humana, paciencia y dedicación en cada consulta y ecografía. Cuenta con más de tres décadas de experiencia clínica en el cuidado integral de la mujer y el diagnóstico prenatal de alta definición.",
    specialties: [
      "Ecografía Obstétrica de Tercer Nivel (Detalle Anatómico)",
      "Ecografía 3D / 4D con Tecnología HD Live",
      "Doppler Fetal y Bienestar Materno-Fetal",
      "Ginecología Integral y Ecografía de Piso Pélvico",
    ],
    image: "/assets/images/trabajo.jpg",
  },
  {
    id: "dra-durley-maya",
    name: "Dra. Durley Maya Salazar",
    role: "Médica Especialista en Ginecología y Obstetricia · Gerente",
    credentials: [
      "Médica y Cirujana — Universidad de Antioquia (2009)",
      "Especialista en Ginecología y Obstetricia — Universidad del Valle (2017)",
      "Diplomada en Colposcopia y Patología del Tracto Genital Inferior — Sociedad Argentina de PTGI y Colposcopia",
      "Diplomada en Ecografía Obstétrica — Unisanitas",
    ],
    bio: "Lidera la gestión clínica y científica de CediMujer combinando rigor diagnóstico con una atención cercana y empática. Especialista en prevención y manejo de patología cervical (VPH, colposcopia), ecografía obstétrica y ginecológica, y planificación familiar.",
    specialties: [
      "Colposcopia y Patología del Tracto Genital Inferior",
      "Ecografía Obstétrica y Ginecológica",
      "Control Prenatal y Planificación Familiar",
      "Tamizaje Ginecológico y Mamario",
    ],
    image: "/assets/images/sala1.jpg",
  },
  {
    id: "dra-maria-rosa-hernandez",
    name: "Dra. María Rosa Hernández Rizzo",
    role: "Médica Especialista en Ginecología y Obstetricia",
    credentials: [
      "Médica y Cirujana — Universidad Libre de Barranquilla (1997)",
      "Especialista en Ginecología y Obstetricia — Universidad CES (2005)",
    ],
    bio: "Especialista con amplia trayectoria en el acompañamiento integral de la mujer desde la adolescencia hasta la menopausia, control prenatal humanizado, asesoría anticonceptiva y procedimientos ginecológicos ambulatorios.",
    specialties: [
      "Consulta Ginecológica y Menopausia",
      "Control Prenatal y Embarazo",
      "Planificación Familiar e Inserción de DIU/Implantes",
      "Prevención Ginecológica Integral",
    ],
    image: "/assets/images/sala2.jpg",
  },
  {
    id: "dr-enrique-olivares",
    name: "Dr. Enrique Olivares Noguera",
    role: "Médico Especialista en Ginecología y Obstetricia",
    credentials: [
      "Médico y Cirujano General — Fundación Universitaria Juan N. Corpas",
      "Especialista en Ginecología y Obstetricia — Corporación Universitaria Remington",
    ],
    bio: "Comprometido con la atención médica humanizada, el diagnóstico oportuno de patologías ginecológicas, el seguimiento cuidadoso del embarazo y el bienestar integral de cada paciente y su familia.",
    specialties: [
      "Ginecología y Obstetricia Integral",
      "Control Prenatal y Pruebas de Bienestar Fetal",
      "Ecografía Ginecológica y Obstétrica",
      "Salud Reproductiva y Planificación",
    ],
    image: "/assets/images/equipo1.jpg",
  },
];

export const INSTITUCION_INFO = {
  historyTitle: "Nuestra Historia desde Mayo de 2008",
  historyParagraphs: [
    "El Centro de Diagnóstico Especializado en Salud para la Mujer (CEDIMUJER) nació en mayo de 2008 por iniciativa de un grupo de profesionales especializados en Ginecología y Obstetricia con amplia experiencia en la ciudad de Medellín y el sur del Valle de Aburrá, con el propósito de brindar servicios médicos ambulatorios exclusivos y de alta calidad para la mujer.",
    "Nuestro objetivo fundamental es proveer a la mujer servicios de salud integrales enfocados en la promoción, la prevención, el diagnóstico temprano y un acompañamiento cálido en cada etapa de su vida: infancia, adolescencia, edad reproductiva, embarazo, menopausia y adultez mayor.",
    "Ubicados estratégicamente en el Centro Comercial Aves María (Locales 341-342) en Sabaneta, combinamos equipos de ultrasonografía de última generación con un trato cercano, claro y profundamente humano para la paciente y su familia.",
  ],
  asociacionUsuarios: {
    title: "Asociación de Usuarios de CediMujer",
    subtitle: "Participación Ciudadana, Derechos y Deberes en Salud",
    description:
      "La Asociación de Usuarios del Centro de Diagnóstico Especializado en Salud para la Mujer (CEDIMUJER) es una agrupación conformada por nuestras pacientes y usuarios que velan por la calidad del servicio, la defensa de los derechos en salud y el mejoramiento continuo de nuestra institución.",
    functions: [
      "Asesorar a los usuarios en el ejercicio de sus derechos y deberes dentro de la institución.",
      "Vigilar que la prestación de los servicios de salud en CediMujer cumpla con los estándares de oportunidad, calidez, ética y calidad científica.",
      "Participar en la revisión y seguimiento de las sugerencias, felicitaciones, peticiones, quejas y reclamos (PQRSD) depositados por las pacientes.",
      "Proponer iniciativas de mejora continua en la atención médica y administrativa para beneficio de toda la comunidad femenina.",
    ],
    rights: [
      "Recibir un trato digno, amable, respetuoso y sin discriminación por parte de todo el equipo humano.",
      "Recibir información clara, completa y comprensible sobre su diagnóstico, procedimientos, ecografías y opciones de tratamiento.",
      "Disfrutar de absoluta confidencialidad y privacidad sobre su historia clínica y estado de salud.",
      "Expresar libremente sus sugerencias, testimonios, quejas o reclamos y recibir respuesta oportuna.",
    ],
    duties: [
      "Suministrar información veraz, clara y completa sobre su estado de salud, antecedentes y medicamentos.",
      "Cumplir puntualmente con las citas programadas y con las indicaciones de preparación previa para ecografías o procedimientos.",
      "Brindar un trato respetuoso y cordial al personal médico, asistencial y administrativo, así como a las demás pacientes.",
      "Cuidar las instalaciones, equipos y recursos dispuestos por CediMujer para su comodidad.",
    ],
  },
};

// ============================================================================
// 3. SECCIÓN DE INFORMACIÓN, BLOG Y PREGUNTAS FRECUENTES (Temas Oficiales)
// ============================================================================

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: "blog-diu-mirena",
    title: "Colocación de dispositivo intrauterino Mirena",
    category: "Planificación Familiar",
    readTime: "4 min de lectura",
    excerpt:
      "Conoce qué es el sistema intrauterino liberador de levonorgestrel (Mirena), cómo se coloca en consultorio y sus beneficios anticonceptivos y terapéuticos.",
    image: "/assets/images/sala2.jpg",
    relatedService: "Colocación o retiro de dispositivo intrauterino",
    content: {
      intro:
        "El dispositivo intrauterino Mirena es un sistema anticonceptivo reversible de larga duración (SIU-LNG) con forma de 'T' flexible que se coloca dentro del útero y libera de manera local y constante una pequeña cantidad de la hormona levonorgestrel.",
      sections: [
        {
          heading: "¿Por qué es uno de los métodos más recomendados?",
          body: "Además de ofrecer una eficacia anticonceptiva superior al 99% (comparable a la ligadura de trompas pero totalmente reversible), Mirena actúa localmente en el endometrio ofreciendo importantes beneficios para la salud ginecológica:",
          bullets: [
            "Protección anticonceptiva continua de larga duración (5 a 8 años).",
            "Reducción de hasta un 90% en la cantidad y duración del sangrado menstrual (tratamiento de elección en menorragia o sangrado abundante).",
            "Disminución significativa de los cólicos menstruales (dismenorrea) y del dolor asociado a endometriosis o adenomiosis.",
            "No contiene estrógenos, por lo que puede utilizarse durante la lactancia materna.",
          ],
        },
        {
          heading: "¿Cómo se realiza la colocación en CediMujer?",
          body: "En CediMujer el procedimiento es realizado directamente por el médico especialista en Ginecología de forma ambulatoria en consultorio. Dura apenas unos minutos: tras realizar una valoración pélvica y limpiar el cuello uterino con solución antiséptica, se introduce suavemente el dispositivo mediante un tubo aplicador estéril muy delgado. Posteriormente, verificamos su adecuada ubicación mediante ecografía transvaginal.",
        },
      ],
      conclusion:
        "Si buscas un método cómodo, seguro y que además mejore tus periodos menstruales, agenda tu consulta de planificación familiar o colocación de DIU con nuestros especialistas.",
    },
  },
  {
    id: "blog-ecografias-embarazo",
    title: "Las Ecografías durante el embarazo",
    category: "Embarazo y Control Prenatal",
    readTime: "5 min de lectura",
    excerpt:
      "Guía completa sobre las ecografías esenciales en el primer, segundo y tercer trimestre de gestación para cuidar la salud de tu bebé.",
    image: "/assets/images/equipo1.jpg",
    relatedService: "Ecografía de Detalle Anatómico (Tercer Nivel / Morfológica)",
    content: {
      intro:
        "Las ecografías prenatales utilizan ondas de ultrasonido (totalmente seguras y libres de radiación tanto para la madre como para el bebé) que nos permiten vigilar el crecimiento, la anatomía y el bienestar fetal en cada etapa de la gestación.",
      sections: [
        {
          heading: "¿Cuáles son las ecografías clave en cada trimestre?",
          body: "En CediMujer acompañamos tu embarazo con tecnología de alta resolución en los momentos fundamentales:",
          bullets: [
            "1. Ecografía Transvaginal Temprana (Semanas 6 a 10): Confirma la ubicación intrauterina del embarazo, el número de embriones, los latidos del corazón y calcula con exactitud las semanas de gestación.",
            "2. Ecografía de Tamizaje Genético (Semanas 11 a 13.6): Evalúa la translucencia nucal, el hueso nasal, el ductus venoso y las arterias uterinas para determinar el riesgo temprano de alteraciones cromosómicas y preeclampsia.",
            "3. Ecografía de Detalle Anatómico o Tercer Nivel (Semanas 18 a 26, ideal 20 a 24): Examina órgano por órgano (cerebro, rostro, corazón, columna, riñones y extremidades) para descartar malformaciones congénitas.",
            "4. Ecografía 3D/4D HD Live (Ideal semanas 24 a 30) y Pruebas de Bienestar (Tercer Trimestre): Permite ver los rasgos y gestos de la carita del bebé en tiempo real, vigilar su curva de peso, líquido amniótico, perfil biofísico y Doppler fetal.",
          ],
        },
      ],
      conclusion:
        "Cada ecografía en CediMujer es realizada con paciencia, calidez humana y explicaciones detalladas para que tú y tu familia vivan un embarazo tranquilo y feliz.",
    },
  },
  {
    id: "blog-prolapso-genital",
    title: "Prolapso genital femenino",
    category: "Piso Pélvico y Ginecología",
    readTime: "4 min de lectura",
    excerpt:
      "¿Sientes sensación de peso o bulto vaginal? Descubre qué es el prolapso de órganos pélvicos, por qué ocurre y cómo se diagnostica.",
    image: "/assets/images/equipo1vista3.jpg",
    relatedService: "Ecografía de piso pélvico",
    content: {
      intro:
        "El prolapso genital femenino ocurre cuando los músculos, ligamentos y tejidos que conforman el piso pélvico se debilitan o distienden, provocando que uno o más órganos pélvicos (la vejiga, el útero o el recto) desciendan hacia o a través del canal vaginal.",
      sections: [
        {
          heading: "Causas y síntomas más frecuentes",
          body: "El debilitamiento del suelo pélvico suele estar relacionado con los embarazos y partos vaginales, los cambios hormonales de la menopausia, el envejecimiento natural, el estreñimiento crónico, la tos crónica o el levantamiento frecuente de peso.",
          bullets: [
            "Sensación de peso, presión o 'bulto' en la zona vaginal (especialmente al final del día).",
            "Escapes involuntarios de orina (incontinencia urinaria de esfuerzo) o dificultad para vaciar completamente la vejiga.",
            "Molestias o incomodidad durante las relaciones sexuales.",
            "Dolor lumbar bajo o pélvico que mejora al recostarse.",
          ],
        },
        {
          heading: "Diagnóstico especializado en CediMujer",
          body: "En CediMujer contamos con Consulta Ginecológica especializada y Ecografía de Piso Pélvico de alta resolución para evaluar de forma precisa qué compartimento está afectado y definir el tratamiento ideal: desde rehabilitación de piso pélvico y pesarios hasta corrección quirúrgica.",
        },
      ],
      conclusion:
        "El prolapso genital no es algo con lo que debas resignarte a vivir. Consultar a tiempo devuelve tu comodidad y calidad de vida.",
    },
  },
  {
    id: "blog-menopausia",
    title: "Menopausia",
    category: "Salud Hormonal y Climaterio",
    readTime: "4 min de lectura",
    excerpt:
      "Una nueva etapa de plenitud: comprende los cambios hormonales de la menopausia, cómo aliviar los sofocos y proteger tu salud ósea y cardiovascular.",
    image: "/assets/images/trabajo.jpg",
    relatedService: "Consulta Ginecológica",
    content: {
      intro:
        "La menopausia es una etapa fisiológica natural en la vida de toda mujer que se confirma tras 12 meses consecutivos sin menstruación, generalmente entre los 45 y 55 años, debido al cese gradual de la producción de estrógenos y progesterona por los ovarios.",
      sections: [
        {
          heading: "¿Qué síntomas pueden presentarse en el climaterio?",
          body: "La disminución de estrógenos genera cambios en distintos sistemas del organismo que varían de una mujer a otra:",
          bullets: [
            "Sofocos o calores súbitos y sudoración nocturna.",
            "Alteraciones en el patrón del sueño y cambios en el estado de ánimo.",
            "Sequedad vaginal, disminución de la lubricación o molestias urinarias (síndrome genitourinario de la menopausia).",
            "Aumento del riesgo de descalcificación ósea (osteopenia/osteoporosis) y cambios metabólicos.",
          ],
        },
        {
          heading: "Acompañamiento integral en CediMujer",
          body: "Mediante el control ginecológico anual y nuestro Tamizaje Ginecológico Completo evaluamos tu salud mamaria, endometrial, ósea y metabólica, ofreciendo alternativas personalizadas (hormonales y no hormonales, hidratantes locales y hábitos saludables) para que vivas esta etapa con plenitud y bienestar.",
        },
      ],
      conclusion:
        "La menopausia es el inicio de una etapa que merece vivirse con salud, vitalidad y acompañamiento médico cercano.",
    },
  },
  {
    id: "blog-cancer-mama",
    title: "Cáncer de mama",
    category: "Prevención y Salud Mamaria",
    readTime: "5 min de lectura",
    excerpt:
      "La detección temprana salva vidas: aprende a identificar los signos de alarma y la importancia de la ecografía de seno y el tamizaje anual.",
    image: "/assets/images/equipo2.jpg",
    relatedService: "Tamizaje de mama",
    content: {
      intro:
        "El cáncer de mama es el tipo de cáncer más frecuente en las mujeres a nivel mundial, pero cuando se detecta en sus etapas iniciales mediante chequeos preventivos e imágenes diagnósticas, las probabilidades de curación superan el 90%.",
      sections: [
        {
          heading: "Signos de alarma que debes vigilar",
          body: "Además de realizar el autoexamen mamario mensual (7 días después del inicio de tu periodo), debes acudir a consulta especializada si notas cualquiera de estos cambios:",
          bullets: [
            "Aparición de un bulto, nódulo o engrosamiento en el seno o en la axila.",
            "Cambios en el tamaño, forma o contorno de una de las mamas.",
            "Hundimiento o retracción del pezón, o secreción espontánea (especialmente si es sanguinolenta o transparente).",
            "Enrojecimiento, descamación o aspecto de 'piel de naranja' en la piel del seno.",
          ],
        },
        {
          heading: "El papel de la Ecografía de Mama y el Tamizaje",
          body: "La ecografía mamaria de alta resolución es fundamental para detectar lesiones milimétricas que aún no son palpables, diferenciar quistes de nódulos sólidos y estudiar mamas densas en mujeres jóvenes y adultas, complementando a la mamografía.",
        },
      ],
      conclusion:
        "En CediMujer contamos con el paquete de Tamizaje de Mama (Consulta Especializada + Ecografía de Seno) para cuidar tu salud mamaria en una sola visita.",
    },
  },
  {
    id: "blog-colicos-menstruales",
    title: "¿Cómo combatir los cólicos menstruales?",
    category: "Bienestar Menstrual",
    readTime: "4 min de lectura",
    excerpt:
      "Consejos médicos prácticos para aliviar el dolor menstrual (dismenorrea) y saber cuándo un cólico intenso requiere evaluación ecográfica.",
    image: "/assets/images/sala1.jpg",
    relatedService: "Ecografía pélvica transvaginal",
    content: {
      intro:
        "Los cólicos menstruales (conocidos médicamente como dismenorrea) son causados por las contracciones del útero mediadas por sustancias llamadas prostaglandinas durante el desprendimiento del endometrio. Aunque una molestia leve puede ser común, el dolor intenso que incapacita tu vida diaria NO debe normalizarse.",
      sections: [
        {
          heading: "Dismenorrea primaria vs. secundaria",
          body: "Es fundamental diferenciar el dolor menstrual funcional de aquel causado por condiciones ginecológicas tratables:",
          bullets: [
            "Dismenorrea primaria: Dolor menstrual sin una patología pélvica subyacente, frecuente en adolescentes y mujeres jóvenes.",
            "Dismenorrea secundaria: Dolor provocado por condiciones como endometriosis, adenomiosis, miomas uterinos, pólipos o quistes ováricos, que se diagnostican mediante Ecografía Pélvica Transvaginal.",
          ],
        },
        {
          heading: "Recomendaciones para aliviar los cólicos",
          body: "Aplicar calor local (bolsa térmica tibia) en el abdomen bajo, mantener actividad física regular, hidratarse adecuadamente, reducir el consumo de cafeína y sal en los días previos, y acudir al ginecólogo para recibir manejo antiinflamatorio específico o regulación hormonal personalizada.",
        },
      ],
      conclusion:
        "Si tus cólicos son fuertes o se acompañan de sangrado abundante, agenda una Consulta Ginecológica y Ecografía Transvaginal en CediMujer.",
    },
  },
  {
    id: "blog-cancer-cervix",
    title: "Cáncer de Cérvix",
    category: "Prevención Ginecológica",
    readTime: "5 min de lectura",
    excerpt:
      "El cáncer de cuello uterino es 100% prevenible si se detecta a tiempo: conoce la relación con el VPH, la citología, el Test de VPH y la colposcopia.",
    image: "/assets/images/equipo1vista2.jpg",
    relatedService: "Tamizaje Ginecológico Básico",
    content: {
      intro:
        "El cáncer de cérvix (cuello del útero) se desarrolla lentamente a lo largo de varios años a partir de lesiones premalignas (displasias o NIC) causadas en más del 95% de los casos por la infección persistente de cepas de alto riesgo del Virus del Papiloma Humano (VPH).",
      sections: [
        {
          heading: "¿Cómo podemos prevenirlo eficazmente?",
          body: "Gracias a que las lesiones pre-cancerosas tardan años en evolucionar y no suelen dar síntomas al inicio, contamos con herramientas médicas altamente efectivas en CediMujer:",
          bullets: [
            "Toma periódica de Citología Cérvico-Uterina para identificar cambios celulares tempranos.",
            "Test de VPH (Tipificación molecular) para detectar la presencia del virus de alto riesgo antes de que altere las células.",
            "Colposcopia de alta precisión para examinar con aumento el cuello uterino cuando una citología o prueba de VPH resulta positiva.",
            "Vacunación contra el VPH y uso de métodos de barrera.",
          ],
        },
      ],
      conclusion:
        "Realizar tu chequeo ginecológico anual en CediMujer es el acto de amor propio más importante para prevenir el cáncer de cuello uterino.",
    },
  },
];

export const FAQ_ITEMS = [
  {
    question: "¿Cómo debo prepararme para una Toma de Citología, Test de VPH o Colposcopia?",
    answer:
      "Debes acudir fuera de tu periodo menstrual (idealmente 4 a 5 días después de finalizado el sangrado), evitar tener relaciones sexuales durante las 72 horas previas y no aplicar óvulos, cremas ni duchas vaginales en los 5 días anteriores al examen. Si vas a realizarte una Colposcopia, recuerda traer el resultado de tu citología o prueba de VPH previa.",
  },
  {
    question: "¿En qué semana del embarazo se recomienda realizar la Ecografía 3D/4D HD Live y la de Detalle Anatómico?",
    answer:
      "La Ecografía de Detalle Anatómico (Tercer Nivel) se realiza entre las semanas 18 y 26 de gestación (siendo ideal entre las semanas 20 y 24). Por su parte, la Ecografía 3D/4D con tecnología HD Live para ver la carita y gestos del bebé con mayor definición se recomienda especialmente entre las semanas 24 y 30. En CediMujer también contamos con paquetes combinados.",
  },
  {
    question: "¿Qué incluye exactamente el Tamizaje Ginecológico Básico y el Tamizaje Completo?",
    answer:
      "El Tamizaje Ginecológico Básico incluye 3 servicios en una sola cita: Consulta con Especialista en Ginecología + Toma de Citología + Ecografía Pélvica Transvaginal. El Tamizaje Ginecológico Completo incluye además la Ecografía de Mama (Seno), brindándote 4 estudios preventivos integrales en una misma visita.",
  },
  {
    question: "¿Dónde está ubicada la sede de CediMujer y cuáles son los teléfonos reales de atención?",
    answer:
      "Estamos ubicados en Sabaneta (Antioquia), en la Calle 75 sur No. 43 A - 202, Centro Comercial Aves María, locales 341-342. Puedes comunicarte a nuestra línea de Asesoría y WhatsApp al +57 311 397 9905 o a nuestro teléfono fijo PBX +604 357 3010.",
  },
  {
    question: "¿Cómo funciona el servicio de Telemedicina en CediMujer?",
    answer:
      "Ofrecemos Teleconsulta con especialista en Ginecología, Teleconsulta de Planificación Familiar y Teleconsulta de Infertilidad. Te conectas por videollamada con nuestros especialistas para recibir orientación médica, lectura de exámenes o ecografías y envío digital de fórmulas y órdenes médicas.",
  },
];

// ============================================================================
// 4. TESTIMONIOS LITERALES (Copiados de la web oficial de CediMujer)
// ============================================================================

export const REAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 1,
    name: "Sara Vanessa Orjuela Ramirez",
    serviceTag: "Ecografía 3D / 4D HD Live",
    rating: 5,
    comment:
      "Gracias por la atención, fue una experiencia maravillosa la que vivimos viendo a nuestro bebé en ecografía 3D, el doctor muy paciente y explica detalladamente.",
  },
  {
    id: 2,
    name: "Adriana Patricia Velasquez Ramirez",
    serviceTag: "Control de Embarazo & Ecografía",
    rating: 5,
    comment:
      "Agradecimientos a todo el personal que labora en tan bella y humana institución, en mis dos embarazos siempre he recurrido a ustedes porque me siento tranquila, el pasado 09 de Mayo nos atendió el Dr. Diego Leon Gaviria y siempre ha pesar del aislamiento, y del caos por el que estamos pasando, nos atendió como siempre con calidad, servicio, amabilidad; no hay palabras para elogiar la prestación del servicio...",
  },
  {
    id: 3,
    name: "Daniela Castañeda",
    serviceTag: "Ecografía Obstétrica · Dr. Diego León Gaviria",
    rating: 5,
    comment:
      "Gracias a CediMujer y al Dr. Diego Leon Gaviria, excelente atención, la experiencia de conocer a mi bebé fue espectacular el Dr Diego muy amable, simpático y profesional hizo todo lo posible por que mi bebé mostrara su carita. Mil gracias a todos!",
  },
  {
    id: 4,
    name: "Manuela Gómez Barbery",
    serviceTag: "Atención Especializada · Dr. Diego Gaviria",
    rating: 5,
    comment:
      "Quiero felicitarlos por la excelente calidad humana en el trato a los pacientes, el doctor Diego Gaviria, maravilloso, me voy 100% satisfecha y feliz.",
  },
  {
    id: 5,
    name: "Angela María Saldarriaga Bolivar",
    serviceTag: "Ecografía Prenatal",
    rating: 5,
    comment:
      "Feliz de ver a mi hijo Samuel. y me encantó la ternura del doctor al referirse a mi hijo que excelente experiencia.",
  },
  {
    id: 6,
    name: "Andrea del pilar Duran acosta",
    serviceTag: "Ecografía & Instalaciones CediMujer",
    rating: 5,
    comment:
      "Excelente atención, son demasiado amables. Cuentan con equipos modernos e instalaciones muy acogedoras. Gracias por la experiencia de ver a mi bebé.",
  },
  {
    id: 7,
    name: "Jeniffer Carvajal",
    serviceTag: "Diagnóstico Ecográfico",
    rating: 5,
    comment:
      "Muy buen servicio .. el doctor muy querido y las chicas muy atentas ! las imágenes muy bonitas y Súper puntuales.",
  },
  {
    id: 8,
    name: "Karen Osorio",
    serviceTag: "Experiencia CediMujer 100% Recomendado",
    rating: 5,
    comment:
      "Hoy 21/01/23 tuvimos la oportunidad de conocer este lugar, un lugar agradable, un espacio relajado, personas con demasiada humanizacion con un excelente servicio... CEDI MUJER QUEDAR RECOMENDADO 100% MUCHAS GRACIAS.",
  },
];

// ============================================================================
// 5. MÉTRICAS MOSTRADAS EN LA WEB (Contadores Oficiales)
// ============================================================================

export const OFFICIAL_METRICS = [
  {
    id: 1,
    label: "Citas Realizadas",
    number: 36000,
    prefix: "+",
    suffix: "",
    description: "Consultas ginecológicas, controles prenatales y valoraciones especializadas con calidad humana.",
  },
  {
    id: 2,
    label: "Ecografías Realizadas",
    number: 30000,
    prefix: "+",
    suffix: "",
    description: "Estudios diagnósticos obstétricos 3D/4D HD Live, detalle anatómico, mamarios y pélvicos.",
  },
  {
    id: 3,
    label: "Mamás Gestantes",
    number: 13000,
    prefix: "+",
    suffix: "",
    description: "Familias y futuras mamás acompañadas con amor, paciencia y rigor científico en su embarazo.",
  },
];
