"use client";

import { useState } from "react";
type SubmitStatus = "idle" | "success" | "error";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    empresa: "",
    mensaje: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://jokia-n8n.5rasmy.easypanel.host/webhook/jokia-formulario",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          nombre: "",
          apellido: "",
          email: "",
          telefono: "",
          empresa: "",
          mensaje: "",
        });
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
    <section
      className="relative overflow-hidden py-24 lg:py-32"
      id="contacto"
    >
      <div className="pointer-events-none absolute inset-0 bg-transparent" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="animate-fade-in">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-jokia-primary/20 bg-jokia-primary/10 px-4 py-1.5 text-sm font-medium uppercase tracking-wider text-jokia-primary">
              <span className="flex h-2 w-2">
                <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-jokia-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-jokia-primary" />
              </span>
              Plazas disponibles este mes
            </span>

            <h2 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white lg:text-5xl">
              ¿Listo para diseñar tu{" "}
              <span className="bg-gradient-to-r from-jokia-primary via-jokia-secondary to-jokia-primary bg-clip-text text-transparent">
                futuro digital
              </span>
              ? Escribinos.
            </h2>

            <p className="mb-8 text-lg text-gray-600 dark:text-white/70">
              Sin compromiso y sin propuestas genéricas. Estrategia real,
              diseñada para tu negocio.
            </p>

            <div className="space-y-4">
              <a
                href="mailto:contacto@jokia.agency"
                className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white/60 p-4 backdrop-blur-sm transition hover:border-jokia-primary/40 hover:bg-white/80 dark:border-white/10 dark:bg-white/5 dark:hover:border-jokia-primary/40 dark:hover:bg-white/10"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-jokia-primary/10 text-jokia-primary">
                  ✉️
                </div>
                <div>
                  <div className="text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-white/50">
                    IR AL MAIL
                  </div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    contacto@jokia.agency
                  </div>
                </div>
              </a>

              <a
                href="https://wa.me/5493547656447"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white/60 p-4 backdrop-blur-sm transition hover:border-jokia-primary/40 hover:bg-white/80 dark:border-white/10 dark:bg-white/5 dark:hover:border-jokia-primary/40 dark:hover:bg-white/10"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-jokia-primary/10 text-jokia-primary">
                  📱
                </div>
                <div>
                  <div className="text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-white/50">
                    IR AL WHATSAPP
                  </div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    +54 9 3547 656-447
                  </div>
                </div>
              </a>

              <div className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white/60 p-4 backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-jokia-primary/10 text-jokia-primary">
                  📍
                </div>
                <div>
                  <div className="text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-white/50">
                    UBICACIÓN
                  </div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    Trabajamos de forma remota para clientes de cualquier lugar.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-fade-in">
            <div className="rounded-3xl border border-white/30 bg-white/60 p-6 shadow-glass backdrop-blur-2xl dark:border-white/10 dark:bg-white/5 sm:p-8">
              <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                Hablemos de tu proyecto
              </h3>
              <p className="mb-6 text-base text-gray-600 dark:text-white/60">
                Completá el formulario y te respondemos en menos de 24hs.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium uppercase tracking-wider text-gray-700 dark:text-white/70">
                      Nombre
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nombre}
                      onChange={(e) =>
                        setFormData({ ...formData, nombre: e.target.value })
                      }
                      className="w-full rounded-full border border-gray-200 bg-white/60 px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm transition-all focus:border-jokia-primary focus:outline-none focus:ring-2 focus:ring-jokia-primary/20 dark:border-white/10 dark:bg-white/10 dark:text-white dark:placeholder-white/30"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium uppercase tracking-wider text-gray-700 dark:text-white/70">
                      Apellido
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.apellido}
                      onChange={(e) =>
                        setFormData({ ...formData, apellido: e.target.value })
                      }
                      className="w-full rounded-full border border-gray-200 bg-white/60 px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm transition-all focus:border-jokia-primary focus:outline-none focus:ring-2 focus:ring-jokia-primary/20 dark:border-white/10 dark:bg-white/10 dark:text-white dark:placeholder-white/30"
                      placeholder="Tu apellido"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium uppercase tracking-wider text-gray-700 dark:text-white/70">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full rounded-full border border-gray-200 bg-white/60 px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm transition-all focus:border-jokia-primary focus:outline-none focus:ring-2 focus:ring-jokia-primary/20 dark:border-white/10 dark:bg-white/10 dark:text-white dark:placeholder-white/30"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium uppercase tracking-wider text-gray-700 dark:text-white/70">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) =>
                      setFormData({ ...formData, telefono: e.target.value })
                    }
                    className="w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-gray-900 placeholder-gray-400 transition-all focus:border-jokia-primary focus:outline-none focus:ring-2 focus:ring-jokia-primary/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-white/30"
                    placeholder="+54 9 351 xxxxxx"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium uppercase tracking-wider text-gray-700 dark:text-white/70">
                    Servicio de interés
                  </label>
                  <select
                    value={formData.empresa}
                    onChange={(e) =>
                      setFormData({ ...formData, empresa: e.target.value })
                    }
                    className="w-full rounded-full border border-gray-200 bg-white/80 px-4 py-3 text-gray-900 shadow-sm transition-all focus:border-jokia-primary focus:outline-none focus:ring-2 focus:ring-jokia-primary/20"
                  >
                    <option value="">Seleccionar...</option>
                    <option>Branding & Identidad</option>
                    <option>Marketing Digital</option>
                    <option>Landing Page</option>
                    <option>Sistema POS</option>
                    <option>Automatización de procesos</option>
                    <option>Múltiples servicios</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-white/70">
                    Mensaje
                  </label>
                  <textarea
                    required
                    value={formData.mensaje}
                    onChange={(e) =>
                      setFormData({ ...formData, mensaje: e.target.value })
                    }
                    rows={4}
                    className="w-full rounded-3xl border border-gray-200 bg-white/60 px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm transition-all focus:border-jokia-primary focus:outline-none focus:ring-2 focus:ring-jokia-primary/20 dark:border-white/10 dark:bg-white/10 dark:text-white dark:placeholder-white/30"
                    placeholder="Contanos sobre tu proyecto, objetivos y timeline..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full bg-gradient-to-r from-jokia-primary to-jokia-secondary px-8 py-3.5 text-sm font-semibold text-white shadow-glow transition-all hover:translate-y-0.5 hover:shadow-glow-lg disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting
                    ? "Enviando..."
                    : submitStatus === "success"
                      ? "✓ Enviado correctamente"
                      : "Enviar mensaje →"}
                </button>

                {submitStatus === "error" && (
                  <p className="text-center text-sm text-red-500">
                    Error al enviar. Intentá de nuevo.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
