"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

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
        className="mx-1 my-2 rounded-2xl border border-black/15 bg-white px-4 py-3 text-center text-[#070707] dark:border-white/15 dark:bg-white/5 dark:text-white"
      >
        <p className="text-sm font-semibold">✅ ¡Enviado!</p>
        <p className="mt-0.5 text-xs text-[#070707]/70 dark:text-white/70">Te respondemos en menos de 2 horas hábiles.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-1 my-2 rounded-2xl border border-black/15 bg-transparent p-4 text-[#070707] dark:border-white/15 dark:text-white"
    >
      <p className="mb-3 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#070707]/70 dark:text-white/70">
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
            className={`w-full rounded-xl border bg-transparent px-3 py-2 text-xs text-[#070707] placeholder:text-[#070707]/45 focus:border-[#7b5cff] focus:outline-none dark:text-white dark:placeholder:text-white/40 ${errors.nombre ? "border-red-500" : "border-black/20 dark:border-white/20"}`}
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
            className={`w-full rounded-xl border bg-transparent px-3 py-2 text-xs text-[#070707] placeholder:text-[#070707]/45 focus:border-[#7b5cff] focus:outline-none dark:text-white dark:placeholder:text-white/40 ${errors.telefono ? "border-red-500" : "border-black/20 dark:border-white/20"}`}
          />
          {errors.telefono && <p className="mt-0.5 text-xs text-red-400">{errors.telefono}</p>}
        </div>
        {/* Email */}
        <input
          type="email"
          placeholder="Email (opcional)"
          value={form.email}
          onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
          className="w-full rounded-xl border border-black/20 bg-transparent px-3 py-2 text-xs text-[#070707] placeholder:text-[#070707]/45 focus:border-[#1929e1] focus:outline-none dark:border-white/20 dark:text-white dark:placeholder:text-white/40"
        />
        {/* Tipo */}
        <select
          value={form.tipo}
          onChange={(e) => setForm(f => ({ ...f, tipo: e.target.value }))}
          className="w-full rounded-xl border border-black/20 bg-transparent px-3 py-2 text-xs text-[#070707]/80 focus:border-[#7b5cff] focus:outline-none dark:border-white/20 dark:text-white/80"
        >
          <option>Web / Landing</option>
          <option>Automatización (n8n / Notion / IA)</option>
          <option>Integraciones</option>
          <option>Chatbot con IA</option>
          <option>Otro</option>
        </select>
        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={status === "loading"}
          className="w-full rounded-xl bg-[#070707] py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-[#070707] dark:hover:bg-white/90"
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
  const [showNudge, setShowNudge] = useState(false);
  const [quickReplies, setQuickReplies] = useState<string[]>([
    "Quiero automatizar procesos",
    "Necesito una web que convierta",
    "Quiero agendar una llamada",
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

  useEffect(() => {
    if (!mounted) return;
    if (isOpen && showNudge) setShowNudge(false);
  }, [isOpen, mounted, showNudge]);

  useEffect(() => {
    if (!mounted) return;
    if (isOpen) { setShowNudge(false); return; }

    let t: number | null = null;
    const loop = () => {
      setShowNudge(true);
      t = window.setTimeout(() => {
        setShowNudge(false);
        t = window.setTimeout(loop, 3000);
      }, 5000);
    };

    loop();
    return () => {
      if (t) window.clearTimeout(t);
    };
  }, [isOpen, mounted]);

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

  const dismissNudge = () => {
    setShowNudge(false);
  };

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
        <div className="fixed right-8 bottom-8 z-[1001] flex flex-col items-end gap-3 pointer-events-none">
          {showScrollTop && !isOpen && (
            <button
              onClick={handleScrollTop}
              className="flex h-12 w-12 items-center justify-center pointer-events-auto rounded-full bg-gradient-to-br from-[#1929e1] to-[#7b5cff] text-white shadow-[0_14px_40px_rgba(25,41,225,0.28)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_18px_55px_rgba(123,92,255,0.34)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7b5cff]/50"
              aria-label="Volver arriba"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14" /><path d="M6 11l6-6 6 6" />
              </svg>
            </button>
          )}
          <div className="flex items-end gap-3 pointer-events-none">
            <AnimatePresence>
              {!isOpen && showNudge && (
                <motion.button
                  type="button"
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  onClick={() => { dismissNudge(); setIsOpen(true); }}
                  className="pointer-events-auto mb-1 max-w-[320px] text-left"
                >
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 2.8, ease: "easeInOut", repeat: Infinity }}
                    className="rounded-full border border-[#1929e1]/20 bg-[linear-gradient(135deg,#ffffff_0%,#ffd1ea_22%,#ffbcd9_42%,#efe2ff_70%,#dbeeff_100%)] px-6 py-3 text-[13px] font-semibold text-[#070707] shadow-[0_22px_65px_rgba(0,0,0,0.16),0_0_0_1px_rgba(25,41,225,0.12),0_0_26px_rgba(255,95,180,0.16)] dark:border-white/18 dark:bg-[linear-gradient(135deg,#0b0b12_0%,#16183a_45%,#0b0b12_100%)] dark:text-white dark:shadow-[0_26px_90px_rgba(0,0,0,0.68),0_0_28px_rgba(255,95,180,0.16)]"
                  >
                    Hola, escribime si necesitas ayuda :)
                  </motion.div>
                </motion.button>
              )}
            </AnimatePresence>

            <button
              onClick={() => { dismissNudge(); setIsOpen(!isOpen); }}
              className="group relative flex h-14 w-14 items-center justify-center pointer-events-auto overflow-hidden rounded-full border border-black/15 bg-[#f2f4f8] p-0 shadow-[0_14px_40px_rgba(123,92,255,0.18)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_18px_55px_rgba(25,41,225,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7b5cff]/40 dark:border-white/15 dark:bg-[#070707] dark:shadow-[0_14px_40px_rgba(0,0,0,0.45)]"
              aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
            >
              {isOpen ? (
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-[#070707] dark:text-white">
                  <path d="M18 6 6 18" />
                  <path d="M6 6l12 12" />
                </svg>
              ) : (
                <Image src="/bot.webp" alt="Bot" fill sizes="56px" className="object-cover" />
              )}
              <span className="sr-only">Chat</span>
            </button>
          </div>
        </div>,
        document.body,
      ) : null}

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Cerrar chat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="fixed inset-0 z-[998] cursor-default bg-black/25 backdrop-blur-[2px] dark:bg-black/55"
              onClick={() => setIsOpen(false)}
            />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-[999] flex w-96 max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-black/20 bg-[radial-gradient(820px_circle_at_12%_-12%,rgba(255,190,225,0.38),transparent_58%),radial-gradient(860px_circle_at_105%_14%,rgba(123,92,255,0.30),transparent_56%),radial-gradient(820px_circle_at_70%_118%,rgba(25,41,225,0.20),transparent_58%),linear-gradient(180deg,#ffffff_0%,#fff0f7_35%,#f0edff_68%,#e9f4ff_100%)] shadow-[0_26px_70px_rgba(0,0,0,0.22)] ring-1 ring-black/10 dark:border-white/15 dark:bg-[radial-gradient(900px_circle_at_18%_0%,rgba(123,92,255,0.16),transparent_52%),radial-gradient(900px_circle_at_95%_20%,rgba(25,41,225,0.14),transparent_56%),linear-gradient(180deg,#0b0b12_0%,#070707_100%)] dark:shadow-[0_26px_90px_rgba(0,0,0,0.65)] dark:ring-white/10"
            style={{ height: "600px", maxHeight: "calc(100vh - 8rem)" }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_circle_at_85%_0%,rgba(123,92,255,0.16),transparent_52%)] opacity-70 dark:opacity-70" />
            {/* Header */}
            <div className="relative flex items-center gap-3 border-b border-black/15 p-4 dark:border-white/15">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/15 bg-white/70 dark:border-white/15 dark:bg-white/5">
                <Image src="/bot.webp" alt="Bot" width={22} height={22} className="h-[22px] w-[22px]" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-[#070707] dark:text-white">Jokia Assistant</div>
                <div className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.12em] text-[#070707]/55 dark:text-white/55">
                  En línea · responde rápido
                </div>
              </div>
              {/* Clear chat */}
              <button
                onClick={() => {
                  window.localStorage.removeItem(LOCAL_STORAGE_KEY);
                  setMessages([{ role: "assistant", content: "¡Hola! 👋 Soy el asistente de Jokia. ¿Con quién hablo?" }]);
                  setQuickReplies(["Quiero automatizar procesos", "Necesito una web que convierta", "Quiero agendar una llamada"]);
                  setShowForm(false);
                }}
                className="ml-auto text-[11px] font-semibold uppercase tracking-[0.12em] text-[#070707]/45 hover:text-[#070707] dark:text-white/45 dark:hover:text-white transition-colors"
                title="Limpiar conversación"
              >
                ✕ limpiar
              </button>
            </div>

            {/* Messages */}
            <div className="relative flex-1 space-y-3 overflow-y-auto p-4 bg-transparent" style={{ WebkitOverflowScrolling: "touch" } as React.CSSProperties}>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <div className="mr-2 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl border border-black/15 bg-white/70 dark:border-white/15 dark:bg-white/5">
                      <Image src="/bot.webp" alt="Bot" width={18} height={18} className="h-[18px] w-[18px]" />
                    </div>
                  )}
                  <div className={`max-w-[80%] rounded-2xl border px-4 py-2.5 ${
                    message.role === "user"
                      ? "border-[#070707] bg-[#070707] text-white dark:border-white dark:bg-white dark:text-[#070707]"
                      : "border-black/15 bg-white text-[#070707] dark:border-white/15 dark:bg-white/5 dark:text-white"
                  }`}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </motion.div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl border border-black/15 bg-white/70 dark:border-white/15 dark:bg-white/5">
                    <Image src="/bot.webp" alt="Bot" width={18} height={18} className="h-[18px] w-[18px]" />
                  </div>
                  <div className="flex gap-2 rounded-2xl border border-black/15 bg-white px-4 py-3 text-xs text-[#070707]/70 dark:border-white/15 dark:bg-white/5 dark:text-white/70">
                    Escribiendo…
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
                  className="relative flex flex-wrap gap-2 border-t border-black/15 p-3 dark:border-white/15"
                >
                  {quickReplies.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => handleQuickReply(reply)}
                      className="rounded-full border border-black/15 bg-transparent px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#070707]/70 transition-colors hover:border-black/30 hover:text-[#070707] dark:border-white/15 dark:text-white/70 dark:hover:border-white/30 dark:hover:text-white"
                    >
                      {reply}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input */}
            <div className="relative border-t border-black/15 p-4 dark:border-white/15">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); void handleSend(); } }}
                  placeholder="Escribí tu mensaje..."
                  className="flex-1 rounded-2xl border border-black/20 bg-transparent px-4 py-3 text-sm text-[#070707] placeholder:text-[#070707]/45 focus:border-[#7b5cff] focus:outline-none dark:border-white/20 dark:text-white dark:placeholder:text-white/40"
                />
                <button
                  onClick={() => void handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl border border-[#070707] bg-[#070707] text-white transition-colors hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white dark:bg-white dark:text-[#070707] dark:hover:bg-white/90"
                >
                  ➤
                </button>
              </div>
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
