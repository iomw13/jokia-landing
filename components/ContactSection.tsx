"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type SubmitStatus = "idle" | "success" | "error";

// Íconos rediseñados — todos del mismo tamaño visual, centrados
const IconWhatsApp = () => (
  <svg fill="currentColor" viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

const IconInstagram = () => (
  <svg fill="currentColor" viewBox="0 0 448 512" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
  </svg>
);

const IconFacebook = () => (
  <svg fill="currentColor" viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const IconTikTok = () => (
  <svg fill="currentColor" viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2h3.2c.2 2.2 1.7 4.1 3.8 4.5V10c-1.4 0-2.7-.4-3.8-1.2v6.5c0 3.6-2.9 6.5-6.5 6.5S4.2 18.9 4.2 15.3c0-3.6 2.9-6.5 6.5-6.5.4 0 .9 0 1.3.1v3.6c-.4-.1-.8-.2-1.3-.2-1.6 0-2.9 1.3-2.9 2.9s1.3 2.9 2.9 2.9c1.7 0 3-1.4 3-3.4V2z" />
  </svg>
);

const SOCIALS = [
  { label: "WhatsApp", href: "https://wa.me/5493547656447", icon: <IconWhatsApp /> },
  { label: "Instagram", href: "https://www.instagram.com/jokia.ia/", icon: <IconInstagram /> },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61587477543232", icon: <IconFacebook /> },
  { label: "TikTok", href: "https://www.tiktok.com/@jokia.ia", icon: <IconTikTok /> },
];

export default function ContactSection() {
  const { ref: sectionRef, isInView } = useScrollReveal(0.08);
  const [formData, setFormData] = useState({
    nombre: "", apellido: "", email: "", telefono: "", mensaje: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("https://jokia-n8n.5rasmy.easypanel.host/webhook/jokia-formulario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitStatus("success");
        setFormData({ nombre: "", apellido: "", email: "", telefono: "", mensaje: "" });
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else throw new Error();
    } catch {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-neutral-800 bg-white px-4 py-3.5 text-[14px] text-neutral-900 placeholder:text-neutral-400 hover:border-[#7b5cff] focus:border-[#7b5cff] focus:outline-none transition-colors duration-150 dark:border-white/20 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40";

  const labelClass = "block mb-2 text-[11px] font-bold tracking-widest text-neutral-500 uppercase dark:text-white/55";

  return (
    <section id="contacto" className="border-y border-[#1929e1]/35 dark:border-[#1929e1]/25">
      <motion.div
        ref={sectionRef as React.RefObject<HTMLDivElement>}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-1 md:grid-cols-[2fr_3fr] min-h-screen md:divide-x md:divide-[#1929e1]/35 dark:md:divide-[#1929e1]/25"
      >

        {/* ── IZQUIERDA: imagen con slogan ── */}
        <div className="relative hidden min-h-[300px] md:block md:min-h-0">
          <img
            src="/hero/contact.avif"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
          <div className="absolute bottom-10 left-8 right-8 z-10">
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/50 mb-3">
              Jokia IA
            </p>
            <h3 className="text-[clamp(1.4rem,2.5vw,2rem)] font-bold leading-[1.2] tracking-[-0.02em] text-white">
              Tu próximo cliente<br />empieza acá.
            </h3>
            <p className="mt-3 text-[13px] text-white/50 leading-relaxed max-w-[260px]">
              Automatizamos tu negocio con inteligencia artificial.
            </p>
          </div>
        </div>

        {/* ── DERECHA: formulario ── */}
        <div className="flex items-center justify-center px-6 py-12 sm:px-10 lg:px-16 bg-[radial-gradient(900px_circle_at_18%_0%,rgba(123,92,255,0.44),transparent_48%),radial-gradient(900px_circle_at_90%_20%,rgba(25,41,225,0.36),transparent_52%),linear-gradient(180deg,#ffffff_0%,#e8ecff_100%)] dark:bg-[radial-gradient(900px_circle_at_18%_0%,rgba(123,92,255,0.24),transparent_50%),radial-gradient(900px_circle_at_90%_20%,rgba(25,41,225,0.22),transparent_54%),linear-gradient(180deg,#070707_0%,#050815_100%)]">
          <div className="w-full max-w-[560px]">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
              <div>
                <h2 className="text-[clamp(2.1rem,8vw,2.6rem)] font-extrabold tracking-[-0.04em] text-neutral-900 leading-[1.05] mb-3 dark:text-white">
                  Hablemos de<br />tu negocio.
                </h2>
                <p className="text-[14px] text-[#7b5cff] leading-relaxed dark:text-white/55">
                  Te respondemos en menos de 24 hs.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1 sm:justify-end">
                {SOCIALS.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="group relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-black/20 bg-[#f2ecff] text-[#070707] shadow-[0_10px_26px_rgba(123,92,255,0.22)] transition-all duration-200 hover:-translate-y-px hover:border-black/35 hover:shadow-[0_14px_34px_rgba(123,92,255,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7b5cff]/35 dark:border-white/15"
                  >
                    <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-[#1929e1]/10 via-transparent to-[#7b5cff]/10 opacity-80" />
                    <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100" style={{ boxShadow: "0 0 0 1px rgba(123,92,255,0.22), 0 10px 26px rgba(123,92,255,0.18)" }} />
                    <span className="relative z-10">{icon}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="border-t border-[#1929e1]/25 mt-7 mb-7" />

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Nombre</label>
                  <input type="text" required value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className={inputClass} placeholder="Juan" />
                </div>
                <div>
                  <label className={labelClass}>Apellido</label>
                  <input type="text" required value={formData.apellido}
                    onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                    className={inputClass} placeholder="García" />
                </div>
              </div>

              <div>
                <label className={labelClass}>Email</label>
                <input type="email" required value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={inputClass} placeholder="juan@email.com" />
              </div>

              <div>
                <label className={labelClass}>Teléfono</label>
                <input type="tel" value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  className={inputClass} placeholder="+54 9 351 xxxxxx" />
              </div>

              <div>
                <label className={labelClass}>¿En qué te podemos ayudar?</label>
                <textarea required rows={4} value={formData.mensaje}
                  onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                  className={inputClass} placeholder="Contanos sobre tu negocio..." />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full rounded-xl py-4 text-[15px] font-bold tracking-wide transition-all duration-200 disabled:opacity-50 ${
                  submitStatus === "success"
                    ? "bg-emerald-500 text-white"
                    : "border-2 border-[#070707] bg-transparent text-[#070707] hover:bg-[#070707] hover:text-white hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.14)] dark:border-white dark:bg-transparent dark:text-white dark:hover:bg-white dark:hover:text-[#070707]"
                }`}
              >
                {isSubmitting
                  ? "Enviando..."
                  : submitStatus === "success"
                  ? "✓ Mensaje enviado"
                  : "Empezar ahora →"}
              </button>

              {submitStatus === "error" && (
                <p className="text-center text-[12px] text-red-500">
                  Hubo un error. Escribinos por WhatsApp.
                </p>
              )}
            </form>

          </div>
        </div>

      </motion.div>
    </section>
  );
}
