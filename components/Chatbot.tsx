"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";

const LOCAL_STORAGE_KEY = "jokia-chat-history";
const WEBHOOK_URL = "https://jokia-n8n.5rasmy.easypanel.host/webhook/jokia-chat";
// Adjusted webhook URL to match the project context (was inmobiliaria-form-lead)
const FORM_WEBHOOK_URL = "https://jokia-n8n.5rasmy.easypanel.host/webhook/jokia-form-lead";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface FormData {
  nombre: string;
  telefono: string;
  email: string;
  tipo: string;
}

// ── Inline contact form ──────────────────────────────────────────
function ContactForm({ sessionId }: { sessionId: string }) {
  const [form, setForm] = useState<FormData>({ nombre: "", telefono: "", email: "", tipo: "Web / Landing" });
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = () => {
    const e: Partial<FormData> = {};
    if (!form.nombre.trim()) e.nombre = "Requerido";
    if (!form.telefono.trim()) e.telefono = "Requerido";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setStatus("loading");
    try {
      await fetch(FORM_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: form.nombre,
          telefono: form.telefono,
          email: form.email,
          tipo: form.tipo,
          sessionId,
          source: "jokia-landing", // Added source
          leadScore: 70,
          timestamp: new Date().toISOString(),
        }),
      });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-1 my-2 rounded-2xl border border-green-400/30 bg-green-500/10 px-4 py-3 text-center"
      >
        <p className="text-sm font-semibold text-green-400">✅ ¡Enviado!</p>
        <p className="mt-0.5 text-xs text-green-300/80">Te respondemos en menos de 2 horas hábiles.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-1 my-2 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md dark:bg-white/5"
    >
      <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-white/80">
        <span>📋</span> Dejanos tus datos
      </p>
      <div className="space-y-2">
        {/* Nombre */}
        <div>
          <input
            type="text"
            placeholder="Tu nombre *"
            value={form.nombre}
            onChange={(e) => { setForm(f => ({ ...f, nombre: e.target.value })); setErrors(er => ({ ...er, nombre: undefined })); }}
            className={`w-full rounded-xl border px-3 py-2 text-xs bg-white/50 dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30 focus:outline-none focus:ring-2 transition-all ${errors.nombre ? "border-red-400 focus:ring-red-400/20" : "border-gray-200 dark:border-white/10 focus:border-jokia-primary focus:ring-jokia-primary/20"}`}
          />
          {errors.nombre && <p className="mt-0.5 text-xs text-red-400">{errors.nombre}</p>}
        </div>
        {/* Teléfono */}
        <div>
          <input
            type="tel"
            placeholder="Teléfono / WhatsApp *"
            value={form.telefono}
            onChange={(e) => { setForm(f => ({ ...f, telefono: e.target.value })); setErrors(er => ({ ...er, telefono: undefined })); }}
            className={`w-full rounded-xl border px-3 py-2 text-xs bg-white/50 dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30 focus:outline-none focus:ring-2 transition-all ${errors.telefono ? "border-red-400 focus:ring-red-400/20" : "border-gray-200 dark:border-white/10 focus:border-jokia-primary focus:ring-jokia-primary/20"}`}
          />
          {errors.telefono && <p className="mt-0.5 text-xs text-red-400">{errors.telefono}</p>}
        </div>
        {/* Email */}
        <input
          type="email"
          placeholder="Email (opcional)"
          value={form.email}
          onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
          className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 px-3 py-2 text-xs text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30 focus:border-jokia-primary focus:outline-none focus:ring-2 focus:ring-jokia-primary/20 transition-all"
        />
        {/* Tipo */}
        <select
          value={form.tipo}
          onChange={(e) => setForm(f => ({ ...f, tipo: e.target.value }))}
          className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 px-3 py-2 text-xs text-gray-700 dark:text-white/80 focus:border-jokia-primary focus:outline-none focus:ring-2 focus:ring-jokia-primary/20 transition-all"
        >
          <option>Web / Landing</option>
          <option>Branding</option>
          <option>Automatización</option>
          <option>Chatbot con IA</option>
          <option>Otro</option>
        </select>
        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={status === "loading"}
          className="w-full rounded-xl bg-gradient-to-r from-jokia-primary to-jokia-secondary py-2.5 text-xs font-semibold text-white shadow-glow transition-all hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Enviando..." : "Quiero que me contacten 📩"}
        </button>
        {status === "error" && (
          <p className="text-center text-xs text-red-400">Hubo un error, intentá de nuevo.</p>
        )}
      </div>
    </motion.div>
  );
}

// ── Main chatbot component ───────────────────────────────────────
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [quickReplies, setQuickReplies] = useState<string[]>([
    "¿Qué servicios ofrecen?",
    "¿Cuánto cuesta una web?",
    "Quiero un presupuesto",
  ]);
  const [showForm, setShowForm] = useState(false);
  const [sessionId] = useState(() => `jokia-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => { scrollToBottom(); }, [messages, showForm]);

  // Load history from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    setMounted(true);
    try {
      const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Message[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          return;
        }
      }
    } catch { /* ignore */ }
    setMessages([{
      role: "assistant",
      content: "¡Hola! 👋 Soy el asistente de Jokia. ¿Con quién hablo?",
    }]);
  }, []);

  // Save history to localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try { window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages)); }
    catch { /* ignore */ }
  }, [messages]);

  // Scroll to top button
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleScroll = () => setShowScrollTop(window.scrollY > 1);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleSend = async (overrideMessage?: string) => {
    const userMessage = (overrideMessage ?? input).trim();
    if (!userMessage || isLoading) return;
    setInput("");
    setShowForm(false);

    const nextHistory: Message[] = [...messages, { role: "user", content: userMessage }];
    setMessages(nextHistory);
    setIsLoading(true);

    // Hide quick replies after first user message
    setQuickReplies([]);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: nextHistory,
          sessionId,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Error");
      const data = await response.json() as {
        success?: boolean;
        response?: string;
        quickReplies?: string[];
        showForm?: boolean;
        metadata?: { intent?: string; leadScore?: number; isHotLead?: boolean };
      };

      if (data.response) {
        setMessages(prev => [...prev, { role: "assistant", content: data.response! }]);
      }
      if (data.quickReplies?.length) {
        setTimeout(() => setQuickReplies(data.quickReplies!), 300);
      }
      if (data.showForm) {
        setTimeout(() => setShowForm(true), 500);
      }
    } catch {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Lo siento, hubo un error. ¿Podés intentarlo de nuevo? 😊",
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickReply = (reply: string) => {
    setInput(reply);
    setTimeout(() => void handleSend(reply), 50);
  };

  return (
    <>
      {/* Floating controls */}
      {mounted ? createPortal(
        <div className="fixed right-8 bottom-8 z-[60] flex flex-col items-end gap-3 pointer-events-none">
          {showScrollTop && !isOpen && (
            <button
              onClick={handleScrollTop}
              className="flex h-12 w-12 items-center justify-center rounded-full pointer-events-auto border-2 border-[#7241FF] bg-transparent shadow-none transition-all duration-200 overflow-hidden hover:border-[#3B82F6] hover:shadow-[0_0_12px_rgba(59,130,246,0.45)]"
              aria-label="Volver arriba"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800 dark:text-white">
                <path d="M12 5v14" /><path d="M6 11l6-6 6 6" />
              </svg>
            </button>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-jokia-primary to-jokia-secondary shadow-glow transition-transform duration-200 hover:scale-105 relative overflow-hidden pointer-events-auto"
            aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
          >
            <Image src="/bot.webp" alt="Bot" fill className="object-cover" />
          </button>
        </div>,
        document.body,
      ) : null}

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-[999] flex w-96 max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-glass backdrop-blur-2xl dark:border-white/15 dark:bg-white/5"
            style={{ height: "600px", maxHeight: "calc(100vh - 8rem)" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-gray-200 bg-gradient-to-r from-jokia-primary/10 to-jokia-secondary/10 p-4 dark:border-white/10">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-jokia-primary to-jokia-secondary relative overflow-hidden">
                <Image src="/bot.webp" alt="Bot" fill className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 dark:text-white">Jokia Assistant</div>
                <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-white/60">
                  <span className="flex h-2 w-2">
                    <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-green-500 opacity-40" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>
                  En línea · responde rápido
                </div>
              </div>
              {/* Clear chat */}
              <button
                onClick={() => {
                  window.localStorage.removeItem(LOCAL_STORAGE_KEY);
                  setMessages([{ role: "assistant", content: "¡Hola! 👋 Soy el asistente de Jokia. ¿Con quién hablo?" }]);
                  setQuickReplies(["¿Qué servicios ofrecen?", "¿Cuánto cuesta una web?", "Quiero un presupuesto"]);
                  setShowForm(false);
                }}
                className="ml-auto text-xs text-gray-400 hover:text-gray-600 dark:text-white/30 dark:hover:text-white/60 transition-colors"
                title="Limpiar conversación"
              >
                ✕ limpiar
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto p-4 bg-gradient-to-b from-white/10 via-white/5 to-transparent dark:from-jokia-dark/40 dark:via-jokia-dark/60 dark:to-jokia-darker/80" style={{ WebkitOverflowScrolling: "touch" } as React.CSSProperties}>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <div className="mr-2 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-jokia-primary to-jokia-secondary relative overflow-hidden">
                      <Image src="/bot.webp" alt="Bot" fill className="object-cover" />
                    </div>
                  )}
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-jokia-primary to-jokia-secondary text-gray-800 shadow-glow dark:text-white"
                      : "border border-white/20 bg-white/15 text-gray-900 shadow-sm backdrop-blur-md dark:border-white/20 dark:bg-white/10 dark:text-white"
                  }`}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </motion.div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-jokia-primary to-jokia-secondary relative overflow-hidden">
                    <Image src="/bot.webp" alt="Bot" fill className="object-cover" />
                  </div>
                  <div className="flex gap-1 rounded-2xl border border-gray-200 bg-white/50 px-4 py-3 dark:border-white/10 dark:bg-white/5">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-jokia-primary [animation-delay:-0.3s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-jokia-primary [animation-delay:-0.15s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-jokia-primary" />
                  </div>
                </div>
              )}

              {/* Inline form */}
              <AnimatePresence>
                {showForm && <ContactForm sessionId={sessionId} />}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            <AnimatePresence>
              {quickReplies.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  className="flex flex-wrap gap-2 border-t border-gray-200 p-3 dark:border-white/10"
                >
                  {quickReplies.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => handleQuickReply(reply)}
                      className="rounded-lg border border-gray-200 bg-white/50 px-3 py-1.5 text-xs font-medium text-gray-700 transition-all hover:border-jokia-primary hover:bg-jokia-primary/10 hover:text-jokia-primary dark:border-white/10 dark:bg-white/5 dark:text-white/70"
                    >
                      {reply}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input */}
            <div className="border-t border-gray-200 p-4 dark:border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); void handleSend(); } }}
                  placeholder="Escribí tu mensaje..."
                  className="flex-1 rounded-xl border border-gray-200 bg-white/50 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-all focus:border-jokia-primary focus:outline-none focus:ring-2 focus:ring-jokia-primary/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-white/30"
                />
                <button
                  onClick={() => void handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-jokia-primary to-jokia-secondary text-white transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  ➤
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
