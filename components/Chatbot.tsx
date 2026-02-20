"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "¡Hola! 👋 Soy el asistente de Jokia. ¿En qué puedo ayudarte hoy?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://jokia-n8n.5rasmy.easypanel.host/webhook/jokia-chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: userMessage,
            history: messages,
          }),
        },
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.response) {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: data.response as string },
          ]);
        }
      } else {
        throw new Error("Error");
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Lo siento, hubo un error. Intentá de nuevo.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickReplies = ["Ver servicios", "Pedir presupuesto", "Contactar equipo"];

  return (
    <>
      {/* Chat trigger button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-jokia-primary to-jokia-secondary text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-2xl"
            >
              ✕
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-2xl"
            >
              💬
            </motion.span>
          )}
        </AnimatePresence>

        {/* Notification dot */}
        {!isOpen && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-4 w-4 rounded-full bg-green-500" />
          </span>
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-50 flex w-96 max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white/90 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/90"
            style={{ height: "600px", maxHeight: "calc(100vh - 8rem)" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-gray-200 bg-gradient-to-r from-jokia-primary/10 to-jokia-secondary/10 p-4 dark:border-white/10">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-jokia-primary to-jokia-secondary text-white">
                🤖
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 dark:text-white">
                  Jokia Assistant
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-white/60">
                  <span className="flex h-2 w-2">
                    <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>
                  En línea · responde rápido
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="mr-2 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-jokia-primary to-jokia-secondary text-sm">
                      🤖
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-jokia-primary to-jokia-secondary text-white"
                        : "border border-gray-200 bg-white/50 text-gray-900 dark:border-white/10 dark:bg-white/5 dark:text-white"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-jokia-primary to-jokia-secondary text-sm">
                    🤖
                  </div>
                  <div className="flex gap-1 rounded-2xl border border-gray-200 bg-white/50 px-4 py-3 dark:border-white/10 dark:bg-white/5">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-jokia-primary [animation-delay:-0.3s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-jokia-primary [animation-delay:-0.15s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-jokia-primary" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-2 border-t border-gray-200 p-3 dark:border-white/10">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => {
                      setInput(reply);
                      setTimeout(() => void handleSend(), 100);
                    }}
                    className="rounded-lg border border-gray-200 bg-white/50 px-3 py-1.5 text-xs font-medium text-gray-700 transition-all hover:border-jokia-primary hover:bg-jokia-primary/10 hover:text-jokia-primary dark:border-white/10 dark:bg-white/5 dark:text-white/70"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="border-t border-gray-200 p-4 dark:border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      void handleSend();
                    }
                  }}
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

