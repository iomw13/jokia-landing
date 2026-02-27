"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type SubmitStatus = "idle" | "success" | "error";

const SERVICES = [
  "Branding & Identidad",
  "Marketing Digital",
  "Landing Page",
  "Sistema POS",
  "Automatización",
  "Múltiples servicios",
];

const IconMail = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="3" />
    <path d="M2 7l10 7 10-7" />
  </svg>
);

const IconPhone = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6.6 10.8a15.8 15.8 0 006.6 6.6l2.2-2.2a1 1 0 011.1-.2 11.4 11.4 0 003.6.7 1 1 0 011 1V21a1 1 0 01-1 1A18 18 0 013 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.22 1.06L6.6 10.8z" />
  </svg>
);

const IconMapPin = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12l5 5L20 7" />
  </svg>
);

/* ── Variants ── */
const colVariant = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay },
  },
});

export default function ContactSection() {
  const { ref: sectionRef, isInView } = useScrollReveal(0.08);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    empresa: "",
    mensaje: "",
  });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [isPressed, setIsPressed] = useState(false);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const payload = { ...formData, empresa: selectedServices.join(", ") };

    try {
      const response = await fetch(
        "https://jokia-n8n.5rasmy.easypanel.host/webhook/jokia-formulario",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ nombre: "", apellido: "", email: "", telefono: "", empresa: "", mensaje: "" });
        setSelectedServices([]);
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        throw new Error("Error al enviar");
      }
    } catch {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        /* ══════════════════════════════════════════
           CSS VARIABLES
        ══════════════════════════════════════════ */
        .cs {
          /* Brand */
          --n-r: 124; --n-g: 58; --n-b: 237;
          --n2-r: 167; --n2-g: 100; --n2-b: 255;
          --n:  124, 58,  237;
          --n2: 167, 100, 255;

          /* Surface */
          --cs-page-bg:      #eef0f8;
          --cs-glass-bg:     rgba(255,255,255,0.92);
          --cs-glass-border: rgba(200,200,220,0.6);
          --cs-glass-shadow: 0 20px 60px rgba(124,58,237,0.10), 0 4px 16px rgba(0,0,0,0.06);

          /* Contact card (left column) */
          --cs-card-bg:      rgba(255,255,255,0.82);
          --cs-card-border:  rgba(var(--n), 0.22);
          --cs-card-shadow:  0 4px 20px rgba(124,58,237,0.10), 0 1px 4px rgba(0,0,0,0.05);

          /* Typography */
          --cs-title:        #0f172a;
          --cs-subtitle:     #475569;
          --cs-label:        #64748b;
          --cs-mono:         rgb(var(--n));

          /* Input — neumorphic light */
          --cs-input-bg:     #e8eaf2;
          --cs-input-color:  #1e293b;
          --cs-input-ph:     #94a3b8;
          --cs-input-shadow:
            inset 3px 3px 7px rgba(180,185,210,0.7),
            inset -3px -3px 7px rgba(255,255,255,0.9);
          --cs-input-shadow-focus:
            inset 3px 3px 7px rgba(180,185,210,0.6),
            inset -3px -3px 7px rgba(255,255,255,0.9),
            0 0 0 2.5px rgba(var(--n), 0.28);

          /* Chip */
          --cs-chip-bg:      #e8eaf2;
          --cs-chip-border:  rgba(200,200,220,0.5);
          --cs-chip-color:   #374151;
          --cs-chip-shadow:
            4px 4px 8px rgba(180,185,210,0.65),
            -4px -4px 8px rgba(255,255,255,0.9);
          --cs-chip-shadow-active:
            inset 3px 3px 7px rgba(160,165,195,0.65),
            inset -3px -3px 7px rgba(255,255,255,0.55);

          /* Link row */
          --cs-link-color:   #1e293b;
          --cs-link-label:   #64748b;

          /* Button */
          --cs-btn-shadow:
            5px 5px 12px rgba(100,80,200,0.35),
            -3px -3px 10px rgba(255,255,255,0.6),
            inset 0 1px 0 rgba(255,255,255,0.25);
          --cs-btn-shadow-hover:
            7px 7px 16px rgba(100,80,200,0.42),
            -4px -4px 12px rgba(255,255,255,0.65),
            inset 0 1px 0 rgba(255,255,255,0.28);
          --cs-btn-shadow-pressed:
            inset 4px 4px 10px rgba(80,40,180,0.45),
            inset -3px -3px 8px rgba(200,180,255,0.25);

          /* Divider */
          --cs-shimmer: rgba(var(--n), 0.15);
        }

        /* ── DARK MODE ───────────────────────────── */
        .dark .cs {
          --n-r: 99; --n-g: 102; --n-b: 241;
          --n:  99, 102, 241;
          --n2: 139, 92, 246;

          --cs-page-bg:      transparent;
          --cs-glass-bg:     rgba(255,255,255,0.04);
          --cs-glass-border: rgba(255,255,255,0.08);
          --cs-glass-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.3);

          --cs-card-bg:      rgba(255,255,255,0.03);
          --cs-card-border:  rgba(99,102,241,0.3);
          --cs-card-shadow:  0 4px 20px rgba(0,0,0,0.3);

          --cs-title:        #f1f5f9;
          --cs-subtitle:     #94a3b8;
          --cs-label:        #64748b;
          --cs-mono:         rgba(148,163,184,0.9);

          /* Input — flat dark */
          --cs-input-bg:     rgba(255,255,255,0.06);
          --cs-input-color:  rgba(241,245,249,0.92);
          --cs-input-ph:     rgba(148,163,184,0.55);
          --cs-input-shadow:
            inset 0 2px 6px rgba(0,0,0,0.35),
            inset 0 -1px 0 rgba(255,255,255,0.04);
          --cs-input-shadow-focus:
            inset 0 2px 6px rgba(0,0,0,0.3),
            0 0 0 2.5px rgba(var(--n), 0.35);

          /* Chip — BLUE solid in dark */
          --cs-chip-bg:      rgba(99,102,241,0.18);
          --cs-chip-border:  rgba(99,102,241,0.5);
          --cs-chip-color:   #e0e7ff;
          --cs-chip-shadow:  none;
          --cs-chip-shadow-active:
            inset 0 2px 8px rgba(0,0,0,0.4);

          --cs-link-color:   rgba(241,245,249,0.9);
          --cs-link-label:   rgba(148,163,184,0.7);

          --cs-btn-shadow:
            0 6px 20px rgba(var(--n), 0.4),
            inset 0 1px 0 rgba(255,255,255,0.12);
          --cs-btn-shadow-hover:
            0 10px 28px rgba(var(--n), 0.5),
            inset 0 1px 0 rgba(255,255,255,0.16);
          --cs-btn-shadow-pressed:
            0 2px 6px rgba(var(--n), 0.3),
            inset 0 3px 10px rgba(0,0,0,0.4);

          --cs-shimmer: rgba(var(--n), 0.25);
        }

        /* ══════════════════════════════════════════
           LAYOUT & BACKGROUND
        ══════════════════════════════════════════ */
        .cs-orb {
          position: absolute; border-radius: 50%;
          filter: blur(80px); pointer-events: none;
        }

        /* ══════════════════════════════════════════
           GLASS PANEL (form card)
        ══════════════════════════════════════════ */
        .cs-glass {
          background: var(--cs-glass-bg);
          backdrop-filter: blur(28px) saturate(1.6);
          -webkit-backdrop-filter: blur(28px) saturate(1.6);
          border: 1px solid var(--cs-glass-border);
          border-radius: 28px;
          box-shadow: var(--cs-glass-shadow);
          position: relative;
          overflow: hidden;
        }
        .cs-glass::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.55) 40%, transparent);
          pointer-events: none;
        }

        /* ══════════════════════════════════════════
           CONTACT INFO CONTAINER (left col)
        ══════════════════════════════════════════ */
        .cs-info-box {
          background: var(--cs-card-bg);
          border: 1px solid var(--cs-card-border);
          border-left: 3px solid rgba(var(--n), 0.6);
          border-radius: 20px;
          box-shadow: var(--cs-card-shadow);
          padding: 20px;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        /* ══════════════════════════════════════════
           INPUTS — NEUMORPHIC
        ══════════════════════════════════════════ */
        .cs-input {
          width: 100%;
          background: var(--cs-input-bg);
          border: 1.5px solid transparent;
          border-radius: 14px;
          padding: 12px 16px;
          font-size: 14px;
          font-weight: 500;
          color: var(--cs-input-color);
          outline: none;
          transition: box-shadow .25s ease, border-color .25s ease, background .25s ease;
          font-family: inherit;
          box-shadow: var(--cs-input-shadow);
        }
        .cs-input::placeholder {
          color: var(--cs-input-ph);
          font-weight: 400;
        }
        .cs-input:focus {
          border-color: rgba(var(--n), 0.4);
          box-shadow: var(--cs-input-shadow-focus);
        }
        .cs-textarea { resize: none; border-radius: 16px; min-height: 100px; }

        /* ══════════════════════════════════════════
           LABELS
        ══════════════════════════════════════════ */
        .cs-label {
          display: block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: var(--cs-label);
          margin-bottom: 7px;
          padding-left: 2px;
        }

        /* ══════════════════════════════════════════
           CHIPS — neumorphic light / blue dark
        ══════════════════════════════════════════ */
        .cs-chip {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 15px;
          border-radius: 1000px;
          font-size: 12.5px;
          font-weight: 600;
          cursor: pointer;
          border: 1px solid var(--cs-chip-border);
          background: var(--cs-chip-bg);
          color: var(--cs-chip-color);
          transition: all .22s cubic-bezier(0.34, 1.3, 0.64, 1);
          user-select: none;
          font-family: inherit;
          box-shadow: var(--cs-chip-shadow);
        }
        .cs-chip:hover:not(.active) {
          border-color: rgba(var(--n), 0.5);
          transform: translateY(-1px);
        }
        .cs-chip.active {
          background: rgba(var(--n), 0.14);
          border-color: rgba(var(--n), 0.65);
          color: rgb(var(--n));
          box-shadow: var(--cs-chip-shadow-active);
          transform: translateY(0);
        }
        /* Dark mode: chips always blue tinted */
        .dark .cs .cs-chip {
          background: var(--cs-chip-bg);
          color: var(--cs-chip-color);
          border-color: rgba(var(--n), 0.45);
          text-shadow: none;
        }
        .dark .cs .cs-chip:hover:not(.active) {
          background: rgba(var(--n), 0.28);
          border-color: rgba(var(--n), 0.7);
          color: #fff;
        }
        .dark .cs .cs-chip.active {
          background: rgba(var(--n), 0.38);
          border-color: rgba(var(--n), 0.85);
          color: #fff;
          box-shadow: 0 0 12px rgba(var(--n), 0.3);
        }

        .cs-chip-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: rgba(var(--n), 0.4);
          transition: background .22s, box-shadow .22s;
          flex-shrink: 0;
        }
        .cs-chip.active .cs-chip-dot {
          background: rgb(var(--n));
          box-shadow: 0 0 6px rgba(var(--n), 0.7);
        }

        /* ══════════════════════════════════════════
           CONTACT LINKS
        ══════════════════════════════════════════ */
        .cs-link {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 16px;
          border-radius: 16px;
          background: rgba(255,255,255,0.85);
          border: 1px solid rgba(200,200,220,0.55);
          box-shadow: 0 2px 10px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.04);
          text-decoration: none;
          color: inherit;
          transition: background .25s, border-color .25s, transform .25s cubic-bezier(0.34,1.3,0.64,1), box-shadow .25s;
        }
        .dark .cs .cs-link {
          background: rgba(255,255,255,0.055);
          border: 1px solid rgba(255,255,255,0.11);
          box-shadow: 0 2px 12px rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.2);
        }
        .cs-link:hover {
          background: rgba(var(--n), 0.07);
          border-color: rgba(var(--n), 0.35);
          transform: translateX(5px);
          box-shadow: 0 6px 20px rgba(var(--n), 0.14);
        }
        .dark .cs .cs-link:hover {
          background: rgba(var(--n), 0.14);
          border-color: rgba(var(--n), 0.4);
        }
        .cs-icon {
          width: 42px; height: 42px;
          border-radius: 12px;
          background: rgba(var(--n), 0.1);
          border: 1px solid rgba(var(--n), 0.2);
          display: flex; align-items: center; justify-content: center;
          color: rgb(var(--n));
          flex-shrink: 0;
          transition: background .25s, box-shadow .25s;
        }
        .cs-link:hover .cs-icon {
          background: rgba(var(--n), 0.18);
          box-shadow: 0 0 14px rgba(var(--n), 0.22);
        }
        .cs-link-label {
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: var(--cs-link-label);
          margin-bottom: 3px;
        }
        .cs-link-value {
          font-size: 14px; font-weight: 600;
          color: var(--cs-link-color);
        }

        /* ══════════════════════════════════════════
           SUBMIT BUTTON — NEUMORPHIC RAISED / PRESSED
        ══════════════════════════════════════════ */
        .cs-submit {
          width: 100%;
          display: flex; align-items: center; justify-content: center;
          gap: 10px;
          padding: 14px 24px;
          border: none;
          border-radius: 14px;
          font-size: 14.5px;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: #fff;
          cursor: pointer;
          font-family: inherit;
          background: linear-gradient(135deg, rgb(var(--n)) 0%, rgb(var(--n2)) 100%);
          box-shadow: var(--cs-btn-shadow);
          transition:
            transform .15s ease,
            box-shadow .15s ease,
            filter .15s ease;
          position: relative;
          overflow: hidden;
          outline: none;
        }
        .cs-submit::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(160deg, rgba(255,255,255,0.18) 0%, transparent 50%);
          pointer-events: none;
          transition: opacity .15s;
        }
        .cs-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: var(--cs-btn-shadow-hover);
          filter: brightness(1.05);
        }
        .cs-submit:active:not(:disabled),
        .cs-submit.pressed {
          transform: translateY(1px) scale(0.993);
          box-shadow: var(--cs-btn-shadow-pressed);
          filter: brightness(0.96);
        }
        .cs-submit:active:not(:disabled)::before,
        .cs-submit.pressed::before { opacity: 0; }
        .cs-submit:disabled { opacity: 0.5; cursor: not-allowed; }
        .cs-submit.success {
          background: linear-gradient(135deg, #3B82F6, #7C3AED);
          box-shadow: 0 4px 20px rgba(59,130,246,0.35);
        }

        /* ══════════════════════════════════════════
           BADGE
        ══════════════════════════════════════════ */
        .cs-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 14px; border-radius: 100px;
          background: rgba(var(--n), 0.08);
          border: 1px solid rgba(var(--n), 0.22);
          font-size: 11.5px; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: rgb(var(--n));
        }
        .ping-wrap { position: relative; width: 8px; height: 8px; flex-shrink: 0; }
        .ping-ring {
          position: absolute; inset: 0; border-radius: 50%;
          background: rgba(var(--n), 0.7);
          animation: cs-ping 1.8s ease infinite;
        }
        .ping-core { position: absolute; inset: 1px; border-radius: 50%; background: rgb(var(--n)); }
        @keyframes cs-ping {
          0%        { transform: scale(1);   opacity: .7; }
          75%, 100% { transform: scale(2.2); opacity: 0;  }
        }

        /* ══════════════════════════════════════════
           SHIMMER DIVIDER
        ══════════════════════════════════════════ */
        .cs-shimmer {
          height: 1px;
          background: linear-gradient(90deg,
            transparent, var(--cs-shimmer) 30%,
            rgba(var(--n), 0.3) 50%,
            var(--cs-shimmer) 70%, transparent
          );
          margin: 2px 0;
        }

        /* ══════════════════════════════════════════
           FADE IN
        ══════════════════════════════════════════ */
        @keyframes cs-fadein {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cs-fadein { opacity: 0; animation: cs-fadein .55s ease forwards; }

        /* gradient text */
        .cs-gradient-text {
          background: linear-gradient(90deg, rgb(var(--n)), rgb(var(--n2)));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* overflow-hidden garantiza que los orbs no se filtren hacia otras secciones */}
      <section className="cs relative overflow-hidden py-24 lg:py-32" id="contacto">
        {/* Orbs — contenidos dentro del section gracias a overflow-hidden */}
        <div className="cs-orb" style={{ width: 400, height: 400, background: "rgba(124,58,237,0.07)", top: "10%", right: -60 }} />
        <div className="cs-orb" style={{ width: 280, height: 280, background: "rgba(192,132,252,0.06)", bottom: "10%", left: -40 }} />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">

            {/* ── LEFT COLUMN ─────────────────────────────────────── */}
            <motion.div
              ref={sectionRef as React.RefObject<HTMLDivElement>}
              variants={colVariant(0)}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="flex flex-col justify-center"
            >
              <div className="cs-badge mb-5">
                <span className="ping-wrap">
                  <span className="ping-ring" />
                  <span className="ping-core" />
                </span>
                ¿Qué estás esperando?
              </div>

              <h2 className="mb-4 text-4xl font-bold leading-tight lg:text-5xl" style={{ color: "var(--cs-title)" }}>
                ¿Listo para diseñar tu{" "}
                <span className="cs-gradient-text">futuro digital</span>?
              </h2>

              <p className="mb-8 text-[15px] leading-relaxed" style={{ color: "var(--cs-subtitle)" }}>
                Sin compromiso y sin propuestas genéricas. Estrategia real,
                diseñada para tu negocio.
              </p>

              <div className="cs-shimmer mb-8" />

              {/* Contact info — each link is its own card */}
              <div className="flex flex-col gap-3">
                <a href="mailto:contacto@jokia.agency" className="cs-link">
                  <div className="cs-icon"><IconMail /></div>
                  <div>
                    <div className="cs-link-label">Email</div>
                    <div className="cs-link-value">contacto@jokia.agency</div>
                  </div>
                </a>
                <a href="https://wa.me/5493547656447" target="_blank" rel="noopener noreferrer" className="cs-link">
                  <div className="cs-icon"><IconPhone /></div>
                  <div>
                    <div className="cs-link-label">WhatsApp</div>
                    <div className="cs-link-value">+54 9 3547 656-447</div>
                  </div>
                </a>
                <div className="cs-link" style={{ cursor: "default" }}>
                  <div className="cs-icon"><IconMapPin /></div>
                  <div>
                    <div className="cs-link-label">Ubicación</div>
                    <div className="cs-link-value">Remoto · Clientes en todo el mundo</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── RIGHT COLUMN — FORM ─────────────────────────────── */}
            <motion.div
              variants={colVariant(0.14)}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <div className="cs-glass p-7 sm:p-9">
                <div className="mb-7">
                  <p className="mb-1 font-mono text-[11px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: "var(--cs-mono)" }}>
                    // nuevo proyecto
                  </p>
                  <h3 className="text-xl font-bold" style={{ color: "var(--cs-title)" }}>
                    Hablemos de tu proyecto
                  </h3>
                  <p className="mt-1.5 text-sm" style={{ color: "var(--cs-subtitle)" }}>
                    Te respondemos en menos de 24&nbsp;hs.
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="space-y-5">
                    {/* Service chips */}
                    <div>
                      <label className="cs-label">¿Qué servicio necesitás?</label>
                      <div className="flex flex-wrap gap-2">
                        {SERVICES.map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => toggleService(s)}
                            className={`cs-chip ${selectedServices.includes(s) ? "active" : ""}`}
                          >
                            <span className="cs-chip-dot" />
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Nombre / Apellido */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="cs-label">Nombre</label>
                        <input type="text" required value={formData.nombre}
                          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                          className="cs-input" placeholder="Tu nombre" />
                      </div>
                      <div>
                        <label className="cs-label">Apellido</label>
                        <input type="text" required value={formData.apellido}
                          onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                          className="cs-input" placeholder="Tu apellido" />
                      </div>
                    </div>

                    {/* Email / Teléfono */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="cs-label">Email</label>
                        <input type="email" required value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="cs-input" placeholder="tu@email.com" />
                      </div>
                      <div>
                        <label className="cs-label">Teléfono</label>
                        <input type="tel" value={formData.telefono}
                          onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                          className="cs-input" placeholder="+54 9 351 xxxxxx" />
                      </div>
                    </div>

                    {/* Mensaje */}
                    <div>
                      <label className="cs-label">Mensaje</label>
                      <textarea required value={formData.mensaje}
                        onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                        rows={4} className="cs-input cs-textarea"
                        placeholder="Contanos sobre tu proyecto, objetivos y timeline..." />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      onMouseDown={() => setIsPressed(true)}
                      onMouseUp={() => setIsPressed(false)}
                      onMouseLeave={() => setIsPressed(false)}
                      onTouchStart={() => setIsPressed(true)}
                      onTouchEnd={() => setIsPressed(false)}
                      className={`cs-submit ${submitStatus === "success" ? "success" : ""} ${isPressed ? "pressed" : ""}`}
                    >
                      {isSubmitting ? "Enviando..." :
                        submitStatus === "success"
                          ? <><IconCheck /> Enviado correctamente</>
                          : <>Enviar mensaje <IconArrow /></>
                      }
                    </button>

                    {submitStatus === "error" && (
                      <p className="text-center text-sm text-red-500">
                        Error al enviar. Intentá de nuevo.
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}
