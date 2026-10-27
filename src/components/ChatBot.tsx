"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Send,
  X,
  ShieldCheck,
  Stethoscope,
  RotateCcw,
  Calendar,
  Calculator,
  Lock,
  AlertCircle,
  ChevronRight,
  HeartHandshake,
  Baby,
  MessageCircleHeart,
} from "lucide-react";
import { ASSETS } from "@/config/assets";

interface ChatBotProps {
  onOpenAppointment?: (serviceName?: string) => void;
  onOpenCalculator?: () => void;
}

interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
  timestamp: string;
  isWelcome?: boolean;
}

type TopicCategory = "prevencion" | "embarazo" | "citas";

const TOPIC_SUGGESTIONS: Record<
  TopicCategory,
  { label: string; icon: React.ElementType; questions: string[] }
> = {
  prevencion: {
    label: "Salud & Prevención",
    icon: HeartHandshake,
    questions: [
      "¿Cada cuánto debo realizarme el chequeo ginecológico?",
      "¿Cómo debo prepararme para una citología o colposcopia?",
      "¿En qué consiste la valoración de Mastología y Salud Mamaria?",
    ],
  },
  embarazo: {
    label: "Embarazo & Ecografías",
    icon: Baby,
    questions: [
      "¿Qué diferencia hay entre la Ecografía 3D y 4D HD?",
      "¿En qué semanas se hacen las ecografías más importantes del embarazo?",
      "¿Qué incluye el control prenatal en CediMujer?",
    ],
  },
  citas: {
    label: "Sede, Horarios & Citas",
    icon: Calendar,
    questions: [
      "¿Dónde están ubicados en Sabaneta y qué horarios tienen?",
      "¿Qué especialidades médicas tienen disponibles en CediMujer?",
      "¿Cómo puedo agendar una cita prioritaria?",
    ],
  },
};

const SYSTEM_PROMPT = `Eres "Aura", la asistente virtual orientativa de Inteligencia Artificial de CediMujer (Centro de Diagnóstico y Salud Integral de la Mujer), ubicado en Sabaneta, Antioquia, Colombia.

INFORMACIÓN OFICIAL DE CEDIMUJER:
- Ubicación: Cl. 75 Sur #43 A -202, C.C. Aves María Parque Comercial, Sabaneta, Antioquia (con parqueadero privado y fácil acceso).
- Horarios de atención: Lunes a Viernes de 7:00 AM a 7:00 PM | Sábados de 8:00 AM a 2:00 PM.
- Contacto: Teléfono fijo +57 (604) 448-0202 | WhatsApp +57 300 987 6543 | Correo: contacto@cedimujer.com
- Trayectoria: Más de 18 años siendo líderes en salud integral femenina y diagnóstico de alta precisión con certificación ISO 9001.
- Servicios principales:
  1. Ginecología Integral: Consultas preventivas, citología/Papanicolaou, salud hormonal, colposcopia de alta precisión.
  2. Obstetricia & Control Prenatal: Acompañamiento gestacional, control de alto riesgo, monitoreo fetal, parto humanizado.
  3. Ecografía 3D / 4D HD: Ecografía genética (11-14 semanas), tamizaje morfológico (20-24 semanas), ultrasonido 4D en tiempo real de alta definición.
  4. Mastología & Salud Mamaria: Ecografía mamaria de alta resolución, detección precoz de nódulos y asesoría mamaria.
  5. Endocrinología Femenina: Manejo integral de SOP (Síndrome de Ovario Poliquístico), tiroides, menopausia y balance hormonal.
  6. Cirugía Ginecológica Avanzada: Laparoscopia ginecológica, histeroscopia diagnóstica y cirugía mínimamente invasiva.
- Herramientas en la web: Calculadora Gestacional interactiva y botón de agendamiento de citas en línea.

REGLAS ESTRICTAS DE COMPORTAMIENTO, PRIVACIDAD Y ÉTICA MÉDICA:
1. PRIVACIDAD EFÍMERA: Si la usuaria pregunta por sus datos, recuérdale con total seguridad que sus preguntas NO se almacenan, NO se guardan ni se comparten con nadie, y su información no se usa para ningún propósito.
2. AVISO DE IA Y RECOMENDACIÓN DE EXPERTO: Eres una Inteligencia Artificial con fines únicamente informativos y orientativos. NUNCA des un diagnóstico médico definitivo ni recetes medicamentos o dosis. Recuerda siempre de forma cálida y empática la importancia de acudir a consulta con un médico experto o especialista en CediMujer para una valoración profesional presencial.
3. ESTILO DE RESPUESTA: Responde en español con un tono cálido, empático, respetuoso, elegante y claro. Usa párrafos cortos y viñetas cuando sea útil. Mantén las respuestas concisas (máximo 2 o 3 párrafos breves) para que sean fáciles de leer en el chat.`;

const getCurrentTime = () => {
  const now = new Date();
  return now.toLocaleTimeString("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const createInitialMessages = (): ChatMessage[] => [
  {
    id: "welcome-msg",
    role: "assistant",
    timestamp: getCurrentTime(),
    isWelcome: true,
    content:
      "¡Hola! Bienvenida al espacio de orientación virtual de **CediMujer**. 🌷\n\nAntes de comenzar, quiero darte total tranquilidad:\n• **Privacidad absoluta:** Tus preguntas **no serán almacenadas, ni compartidas**, y tu información **no se usará para nada**. Esta conversación es 100% efímera.\n• **Orientación con IA:** Recuerda que soy un **chat de Inteligencia Artificial** informativo y **siempre es importante acudir a un médico experto** para cualquier diagnóstico o valoración clínica.\n\n¿En qué puedo orientarte hoy?",
  },
];

export const ChatBot: React.FC<ChatBotProps> = ({
  onOpenAppointment,
  onOpenCalculator,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showFloatingHint, setShowFloatingHint] = useState(true);
  const [activeCategory, setActiveCategory] =
    useState<TopicCategory>("prevencion");
  const [messages, setMessages] = useState<ChatMessage[]>(createInitialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setShowFloatingHint(false);
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Reset conversation completely (ephemeral memory wipe)
  const handleResetChat = () => {
    setIsResetting(true);
    setErrorBanner(null);
    setTimeout(() => {
      setMessages(createInitialMessages());
      setInputValue("");
      setIsResetting(false);
    }, 280);
  };

  const sendMessage = async (textToSend?: string) => {
    const rawText = (textToSend ?? inputValue).trim();
    if (!rawText || isLoading) return;

    setErrorBanner(null);
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: rawText,
      timestamp: getCurrentTime(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    if (!textToSend) {
      setInputValue("");
    }
    setIsLoading(true);

    const apiKey = process.env.NEXT_OPENROUTER_API_KEY?.trim();
    const model =
      process.env.NEXT_OPENROUTER_MODEL?.trim() ||
      "google/gemini-2.5-flash-lite";

    if (!apiKey) {
      setIsLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-missing-key-${Date.now()}`,
          role: "assistant",
          timestamp: getCurrentTime(),
          content:
            "⚙️ **Configuración pendiente:** Aún no se ha detectado la API Key de OpenRouter.\n\nPor favor abre el archivo `frontend/.env` (o las variables de entorno en Vercel), pega tu clave en `NEXT_OPENROUTER_API_KEY=tu_clave_aqui` y reinicia el servidor (`npm run dev`).\n\nMientras tanto, recuerda que puedes **Agendar tu Cita** directamente o usar nuestra **Calculadora Gestacional** con los botones de abajo.",
        },
      ]);
      return;
    }

    try {
      const apiMessages = [
        { role: "system", content: SYSTEM_PROMPT },
        ...updatedMessages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      ];

      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer":
              typeof window !== "undefined"
                ? window.location.origin
                : "https://cedimujer.com",
            "X-Title": "CediMujer - Orientacion Salud Femenina",
          },
          body: JSON.stringify({
            model,
            messages: apiMessages,
            temperature: 0.5,
            max_tokens: 550,
            provider: {
              data_collection: "deny",
            },
          }),
        }
      );

      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        const errMsg =
          errData?.error?.message ||
          `Error de conexión con OpenRouter (código ${response.status})`;
        throw new Error(errMsg);
      }

      const data = await response.json();
      const replyContent =
        data?.choices?.[0]?.message?.content?.trim() ||
        "Disculpa, no pude procesar tu consulta en este momento. Recuerda que puedes comunicarte directamente con nuestras especialistas o agendar tu cita.";

      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: replyContent,
          timestamp: getCurrentTime(),
        },
      ]);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "No fue posible conectar con el asistente.";
      setErrorBanner(message);
    } finally {
      setIsLoading(false);
    }
  };

  // Simple lightweight formatter for **bold** and bullet lines
  const renderFormattedContent = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, lineIdx) => {
      if (!line.trim()) {
        return <div key={lineIdx} className="h-2" />;
      }

      const isBullet =
        line.trim().startsWith("•") ||
        line.trim().startsWith("- ") ||
        line.trim().startsWith("* ");
      const cleanLine = isBullet
        ? line.trim().replace(/^[•\-*]\s*/, "")
        : line;

      const parts = cleanLine.split(/(\*\*.*?\*\*)/g);
      const renderedParts = parts.map((part, partIdx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={partIdx} className="font-extrabold text-[#4A3A33]">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <React.Fragment key={partIdx}>{part}</React.Fragment>;
      });

      if (isBullet) {
        return (
          <div key={lineIdx} className="flex items-start gap-2 my-1 pl-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8FC1BB] mt-1.5 shrink-0" />
            <span className="flex-1">{renderedParts}</span>
          </div>
        );
      }

      return (
        <p key={lineIdx} className="leading-relaxed">
          {renderedParts}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Launcher Area (Bottom-Right) */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2.5">
        {/* Novel Floating Welcome Bubble (Dismissible) */}
        <AnimatePresence>
          {!isOpen && showFloatingHint && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.92 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative max-w-[260px] sm:max-w-[290px] bg-[#F7F2EC]/95 backdrop-blur-md border border-[#8FC1BB] rounded-2xl rounded-br-sm p-3.5 shadow-xl shadow-[#4A3A33]/15 text-[#4A3A33]"
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowFloatingHint(false);
                }}
                aria-label="Cerrar aviso"
                className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-[#E6D9C8] text-[#4A3A33] hover:bg-[#EBCFC6] flex items-center justify-center shadow-sm border border-[#F7F2EC] transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              <div
                onClick={() => setIsOpen(true)}
                className="cursor-pointer space-y-1.5"
              >
                <div className="flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#CFE6E2] text-[#4A3A33] text-[10px] font-black uppercase tracking-wider">
                    <Lock className="w-2.5 h-2.5 text-[#4A3A33]" />
                    Chat 100% Anónimo
                  </span>
                  <span className="text-[10px] font-bold text-[#9A7B6C]">
                    • IA
                  </span>
                </div>
                <p className="text-xs font-extrabold text-[#4A3A33] leading-snug">
                  ¿Tienes dudas sobre tu salud o ecografías?
                </p>
                <p className="text-[11px] text-[#9A7B6C] font-semibold leading-tight">
                  Pregúntale a <strong className="text-[#4A3A33]">Aura IA</strong>. No guardamos ni compartimos tus preguntas.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Floating Orb Button */}
        <motion.button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          aria-label={
            isOpen
              ? "Cerrar asistente virtual CediMujer"
              : "Abrir asistente virtual CediMujer"
          }
          className="group relative flex items-center gap-3 pl-3.5 pr-4 py-3 rounded-full bg-gradient-to-r from-[#4A3A33] via-[#5c483f] to-[#4A3A33] text-[#F7F2EC] shadow-2xl shadow-[#4A3A33]/35 border-2 border-[#8FC1BB] transition-all duration-300"
        >
          {/* Subtle Breathing Aura */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#8FC1BB]/40 via-[#EBCFC6]/30 to-[#8FC1BB]/40 blur-md opacity-75 group-hover:opacity-100 transition-opacity pointer-events-none" />

          <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-[#8FC1BB] to-[#CFE6E2] text-[#4A3A33] shadow-inner shrink-0">
            {isOpen ? (
              <X className="w-5 h-5 stroke-[2.5]" />
            ) : (
              <MessageCircleHeart className="w-5 h-5 stroke-[2.2]" />
            )}
            {!isOpen && (
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#D7A7A8] border-2 border-[#4A3A33] animate-pulse" />
            )}
          </div>

          <div className="relative text-left pr-0.5">
            <div className="flex items-center gap-1.5">
              <span className="text-xs sm:text-sm font-black tracking-tight text-[#F7F2EC] font-title">
                Aura · CediMujer IA
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#8FC1BB]" />
            </div>
            <span className="block text-[10px] font-bold text-[#CFE6E2] tracking-wide">
              {isOpen ? "Cerrar orientación" : "Consulta privada • Sin registro"}
            </span>
          </div>
        </motion.button>
      </div>

      {/* Chat Window Modal / Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.section
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Ventana de Asistente Virtual Aura IA"
            className="fixed bottom-20 right-3 left-3 sm:left-auto sm:right-6 sm:bottom-24 z-50 sm:w-[430px] max-h-[82dvh] flex flex-col rounded-[2rem] bg-[#F7F2EC] border-2 border-[#E6D9C8] shadow-[0_25px_70px_rgba(74,58,51,0.28)] overflow-hidden"
          >
            {/* Top Header */}
            <div className="relative bg-gradient-to-r from-[#4A3A33] via-[#59463E] to-[#4A3A33] text-[#F7F2EC] px-5 pt-4 pb-3.5 border-b border-[#9A7B6C]/40">
              {/* Decorative Soft Glow */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#8FC1BB]/15 rounded-full blur-2xl pointer-events-none" />

              <div className="relative flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-2xl bg-[#F7F2EC] border-2 border-[#8FC1BB] p-1.5 flex items-center justify-center shadow-md shrink-0">
                    <Image
                      src={ASSETS.logo.emblem}
                      alt="Emblema CediMujer"
                      width={34}
                      height={34}
                      unoptimized
                      className="object-contain"
                    />
                    <span
                      title="Sesión privada activa"
                      className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#8FC1BB] border-2 border-[#4A3A33]"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-base sm:text-lg font-black text-[#F7F2EC] tracking-tight">
                        Aura · Asistente CediMujer
                      </h3>
                      <span className="px-2 py-0.5 rounded-full bg-[#8FC1BB]/20 border border-[#8FC1BB]/50 text-[#CFE6E2] text-[10px] font-extrabold uppercase tracking-wider">
                        IA
                      </span>
                    </div>
                    <p className="text-[11px] text-[#E6D9C8] font-semibold flex items-center gap-1">
                      <Lock className="w-3 h-3 text-[#8FC1BB]" />
                      <span>Modo Efímero: Cero datos guardados</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handleResetChat}
                    title="Reiniciar chat y borrar mensajes de la pantalla"
                    aria-label="Reiniciar chat"
                    className="p-2 rounded-xl bg-[#9A7B6C]/25 hover:bg-[#8FC1BB] text-[#F7F2EC] hover:text-[#4A3A33] border border-[#9A7B6C]/40 transition-all duration-200"
                  >
                    <RotateCcw
                      className={`w-4 h-4 ${isResetting ? "animate-spin" : ""}`}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    title="Cerrar ventana"
                    aria-label="Cerrar ventana"
                    className="p-2 rounded-xl bg-[#9A7B6C]/25 hover:bg-[#EBCFC6] text-[#F7F2EC] hover:text-[#4A3A33] border border-[#9A7B6C]/40 transition-all duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Persistent Privacy & Medical Disclaimer Banner at the Top of Every Chat */}
            <div className="bg-gradient-to-r from-[#CFE6E2]/70 via-[#EBCFC6]/55 to-[#E6D9C8]/70 px-4 py-2.5 border-b border-[#8FC1BB]/40">
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-xl bg-[#F7F2EC] border border-[#8FC1BB] text-[#4A3A33] shrink-0 mt-0.5 shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-[#8FC1BB]" />
                </div>
                <p className="text-[11px] leading-snug text-[#4A3A33] font-semibold">
                  <strong className="font-extrabold">
                    Privacidad & Aviso Médico:
                  </strong>{" "}
                  Tus preguntas{" "}
                  <span className="underline decoration-[#8FC1BB] font-bold">
                    no se almacenan ni comparten
                  </span>{" "}
                  y tu información no se usa para nada. Este es un chat de{" "}
                  <strong className="font-extrabold">IA orientativo</strong>;
                  acude siempre a un{" "}
                  <strong className="font-extrabold">médico experto</strong>.
                </p>
              </div>
            </div>

            {/* Scrollable Messages Area */}
            <div
              className={`flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gradient-to-b from-[#F7F2EC] via-[#F7F2EC] to-[#E6D9C8]/35 transition-opacity duration-200 ${
                isResetting ? "opacity-0" : "opacity-100"
              }`}
            >
              {messages.map((msg) => {
                const isUser = msg.role === "user";
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22 }}
                    className={`flex flex-col ${
                      isUser ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`max-w-[88%] rounded-2xl px-4 py-3 text-xs sm:text-[13px] font-semibold shadow-sm ${
                        isUser
                          ? "bg-[#4A3A33] text-[#F7F2EC] rounded-br-xs border border-[#4A3A33]"
                          : msg.isWelcome
                          ? "bg-white/95 text-[#4A3A33] rounded-bl-xs border-2 border-[#8FC1BB]/60 shadow-md"
                          : "bg-white/90 text-[#4A3A33] rounded-bl-xs border border-[#E6D9C8]"
                      }`}
                    >
                      {!isUser && (
                        <div className="flex items-center justify-between gap-2 mb-1.5 pb-1 border-b border-[#E6D9C8]/60">
                          <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-[#9A7B6C]">
                            <Sparkles className="w-3 h-3 text-[#8FC1BB]" />
                            Aura IA · Orientación CediMujer
                          </span>
                          <span className="text-[10px] font-bold text-[#9A7B6C]">
                            {msg.timestamp}
                          </span>
                        </div>
                      )}

                      <div className="space-y-1">
                        {isUser ? (
                          <p className="leading-relaxed whitespace-pre-wrap">
                            {msg.content}
                          </p>
                        ) : (
                          renderFormattedContent(msg.content)
                        )}
                      </div>

                      {isUser && (
                        <span className="block text-[9px] text-right text-[#E6D9C8]/80 mt-1 font-medium">
                          {msg.timestamp} • No guardado
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })}

              {/* Interactive Topic Explorer (Shown when conversation just started) */}
              {messages.length === 1 && !isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="rounded-2xl bg-[#E6D9C8]/45 border border-[#E6D9C8] p-3.5 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#4A3A33]">
                      Explora temas frecuentes
                    </span>
                    <span className="text-[10px] font-bold text-[#9A7B6C]">
                      Toca para preguntar
                    </span>
                  </div>

                  {/* Category Tabs */}
                  <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-[#F7F2EC] border border-[#E6D9C8]">
                    {(
                      Object.keys(TOPIC_SUGGESTIONS) as TopicCategory[]
                    ).map((catKey) => {
                      const cat = TOPIC_SUGGESTIONS[catKey];
                      const IconComp = cat.icon;
                      const isActive = activeCategory === catKey;
                      return (
                        <button
                          key={catKey}
                          type="button"
                          onClick={() => setActiveCategory(catKey)}
                          className={`flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg text-[10px] font-extrabold transition-all ${
                            isActive
                              ? "bg-[#8FC1BB] text-[#4A3A33] shadow-xs"
                              : "text-[#9A7B6C] hover:text-[#4A3A33]"
                          }`}
                        >
                          <IconComp className="w-3 h-3 shrink-0" />
                          <span className="truncate">{cat.label.split(" ")[0]}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Suggested Questions for Selected Category */}
                  <div className="space-y-1.5">
                    {TOPIC_SUGGESTIONS[activeCategory].questions.map(
                      (q, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => sendMessage(q)}
                          className="w-full text-left px-3 py-2 rounded-xl bg-[#F7F2EC] hover:bg-[#CFE6E2]/60 border border-[#E6D9C8] hover:border-[#8FC1BB] text-xs font-bold text-[#4A3A33] flex items-center justify-between gap-2 transition-all group"
                        >
                          <span className="leading-snug">{q}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-[#9A7B6C] group-hover:text-[#4A3A33] group-hover:translate-x-0.5 transition-transform shrink-0" />
                        </button>
                      )
                    )}
                  </div>
                </motion.div>
              )}

              {/* Loading Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start"
                >
                  <div className="bg-white/90 border border-[#E6D9C8] rounded-2xl rounded-bl-xs px-4 py-3 shadow-xs flex items-center gap-2.5">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#8FC1BB] animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-2 h-2 rounded-full bg-[#D7A7A8] animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-2 h-2 rounded-full bg-[#9A7B6C] animate-bounce" />
                    </div>
                    <span className="text-[11px] font-bold text-[#9A7B6C]">
                      Aura está redactando orientación...
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Error Banner */}
              {errorBanner && (
                <div className="rounded-2xl bg-[#EBCFC6]/70 border border-[#D7A7A8] p-3 flex items-start gap-2.5 text-xs text-[#4A3A33] font-semibold">
                  <AlertCircle className="w-4 h-4 text-[#4A3A33] shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-extrabold">Aviso de conexión:</p>
                    <p className="text-[11px] mt-0.5">{errorBanner}</p>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Expert Actions Bridge (Always reminds user they can consult a real specialist) */}
            <div className="px-4 py-2 bg-[#E6D9C8]/50 border-t border-[#E6D9C8] flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onOpenAppointment?.();
                }}
                className="flex-1 py-1.5 px-2.5 rounded-xl bg-[#F7F2EC] hover:bg-[#8FC1BB] text-[#4A3A33] border border-[#8FC1BB]/60 text-[11px] font-extrabold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
              >
                <Stethoscope className="w-3.5 h-3.5 text-[#8FC1BB] group-hover:text-[#4A3A33]" />
                <span>Agendar con Especialista</span>
              </button>

              {onOpenCalculator && (
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onOpenCalculator();
                  }}
                  className="py-1.5 px-2.5 rounded-xl bg-[#F7F2EC] hover:bg-[#EBCFC6] text-[#4A3A33] border border-[#E6D9C8] text-[11px] font-extrabold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Calculator className="w-3.5 h-3.5 text-[#9A7B6C]" />
                  <span>Calculadora</span>
                </button>
              )}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="p-3.5 bg-[#F7F2EC] border-t border-[#E6D9C8]"
            >
              <div className="relative flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isLoading}
                  placeholder="Escribe tu pregunta de forma anónima..."
                  className="w-full pl-4 pr-12 py-3 rounded-2xl bg-white border border-[#E6D9C8] focus:border-[#8FC1BB] focus:outline-none text-xs sm:text-sm font-semibold text-[#4A3A33] placeholder-[#9A7B6C] shadow-inner disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  aria-label="Enviar pregunta"
                  className="absolute right-1.5 p-2.5 rounded-xl bg-[#4A3A33] hover:bg-[#8FC1BB] text-[#F7F2EC] hover:text-[#4A3A33] disabled:opacity-40 disabled:hover:bg-[#4A3A33] disabled:hover:text-[#F7F2EC] transition-all duration-200 shadow-sm"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="mt-1.5 text-[10px] text-center text-[#9A7B6C] font-semibold">
                🔒 Sin almacenamiento de datos • IA orientativa (No reemplaza consulta médica)
              </p>
            </form>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};
