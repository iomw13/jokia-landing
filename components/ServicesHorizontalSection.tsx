"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const services = [
  {
    title: "Estrategias que crecen solas",
    subtitle: "MARKETING INTELIGENTE & AUTOMATIZACIÓN",
    description:
      "Diseñamos sistemas de marketing basados en datos, automatización e IA para atraer, calificar y convertir clientes de forma eficiente.",
    tags: ["Campañas", "Funnels", "IA", "Automatización", "Reporting"],
    image: "/servicios/marketing.avif",
  },
  {
    title: "Páginas pensadas para convertir",
    subtitle: "WEB & CONVERSIÓN",
    description:
      "Creamos sitios y landing pages rápidas, claras y enfocadas en una sola acción: generar resultados reales.",
    tags: ["Landing pages", "UX/UI", "Copywriting", "Optimización"],
    image: "/servicios/landing.avif",
  },
  {
    title: "Control total de tu negocio",
    subtitle: "POS & SISTEMAS DE GESTIÓN",
    description:
      "Implementamos sistemas de punto de venta y gestión para ordenar ventas, stock y reportes en tiempo real.",
    tags: ["POS", "Stock", "Ventas", "Integraciones"],
    image: "/servicios/pos.avif",
  },
  {
    title: "Marcas memorables",
    subtitle: "IDENTIDAD DE MARCA",
    description:
      "Construimos identidades sólidas y coherentes que se reconocen en todos los puntos de contacto.",
    tags: ["Branding", "Logo", "Sistema visual", "Manual de marca"],
    image: "/servicios/branding.avif",
  },
  {
    title: "Experiencias modernas en la mesa",
    subtitle: "MENÚS DIGITALES",
    description:
      "Diseñamos menús digitales claros, rápidos y adaptados a mobile para mejorar la experiencia del cliente.",
    tags: ["QR", "Multi-sucursal", "Edición simple"],
    image: "/servicios/menu.avif",
  },
];

/* ── Variants ── */
const headerVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const gridContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function ServicesHorizontalSection() {
  const { ref: headerRef, isInView: headerInView } = useScrollReveal();
  const { ref: gridRef, isInView: gridInView } = useScrollReveal(0.08);

  return (
    <>
      <style>{`
        /* ── Flip scene ── */
        .card-scene {
          perspective: 1800px;
          perspective-origin: 50% 50%;
        }
        .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.72s cubic-bezier(0.35, 0.0, 0.25, 1.0);
          will-change: transform;
        }
        .card-group:hover .card-inner {
          transform: rotateY(180deg);
        }

        /* ── Caras ── */
        .card-face {
          position: absolute;
          inset: 0;
          border-radius: 1.5rem;
          overflow: hidden;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .card-face--back {
          transform: rotateY(180deg);
        }

        /* ── Borde neon ── */
        .card-neon {
          position: absolute;
          inset: 0;
          border-radius: 1.5rem;
          pointer-events: none;
          z-index: 20;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          box-shadow:
            inset 0 0 0 1.5px rgba(186, 120, 255, 0.85),
            inset 0 0  8px rgba(186, 120, 255, 0.35),
               0  0 12px rgba(186, 120, 255, 0.55),
               0  0 26px rgba(186, 120, 255, 0.30),
               0  0 56px rgba(186, 120, 255, 0.10);
          transition: box-shadow 0.72s cubic-bezier(0.35, 0.0, 0.25, 1.0);
        }
        .card-neon--back { transform: rotateY(180deg); }
        .card-group:hover .card-neon {
          box-shadow:
            inset 0 0 0 1.5px rgba(196, 132, 255, 0.95),
            inset 0 0 14px  rgba(196, 132, 255, 0.50),
               0  0 18px  rgba(188, 120, 255, 0.80),
               0  0 42px  rgba(186, 120, 255, 0.55),
               0  0 88px  rgba(186, 120, 255, 0.18);
        }

        /* ── Grid bento ── */
        .services-grid {
          display: grid;
          grid-template-columns: 1fr;
          grid-auto-rows: 320px;
          gap: 1rem;
        }
        @media (min-width: 1100px) {
          .services-grid {
            grid-template-columns: repeat(7, minmax(0, 1fr));
            grid-template-rows: 380px 380px;
            gap: 1.5rem;
          }
          .card-pos-0 { grid-column: 1 / span 2; grid-row: 1; }
          .card-pos-1 { grid-column: 3 / span 2; grid-row: 1; }
          .card-pos-2 { grid-column: 5 / span 3; grid-row: 1 / span 2; }
          .card-pos-3 { grid-column: 1 / span 2; grid-row: 2; }
          .card-pos-4 { grid-column: 3 / span 2; grid-row: 2; }
        }
      `}</style>

      <section className="relative -mt-8 overflow-hidden py-24 lg:py-32" id="servicios">
        <div className="pointer-events-none absolute inset-0 bg-transparent" />

        <div className="container relative z-10 mx-auto -mt-8 px-2 sm:px-4 lg:px-6">

          {/* Header */}
          <motion.div
            ref={headerRef as React.RefObject<HTMLDivElement>}
            variants={headerVariant}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            className="mb-16 text-center"
          >
            <span className="mb-4 inline-block text-xs font-mono uppercase tracking-wider text-jokia-primary">
              // SERVICIOS
            </span>
            <h2 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white lg:text-5xl">
              Lo que hacemos{" "}
              <span className="bg-gradient-to-r from-jokia-primary via-jokia-secondary to-jokia-primary bg-clip-text text-transparent">
                extraordinariamente bien
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-white/70">
              Cada servicio diseñado para maximizar el impacto de tu marca en el
              ecosistema digital.
            </p>
          </motion.div>

          {/* Grid with stagger */}
          <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
            <motion.div
              ref={gridRef as React.RefObject<HTMLDivElement>}
              variants={gridContainer}
              initial="hidden"
              animate={gridInView ? "visible" : "hidden"}
              className="services-grid"
            >
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  variants={cardVariant}
                  className={`card-group relative h-full card-pos-${index}`}
                >
                  <div className="card-scene h-full w-full">
                    <div className="card-inner">
                      <div className="card-neon" />
                      <div className="card-neon card-neon--back" />

                      {/* ── FRONT ── */}
                      <div className="card-face bg-gray-900">
                        {service.image && (
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute inset-0 flex items-end">
                          <div className="w-full px-5 pb-6">
                            <span className="mb-1 inline-block text-[0.65rem] font-mono uppercase tracking-[0.25em] text-white/60">
                              {service.subtitle}
                            </span>
                            <h3 className="text-lg font-semibold text-white md:text-xl leading-snug">
                              {service.title}
                            </h3>
                          </div>
                        </div>
                      </div>

                      {/* ── BACK ── */}
                      <div className="card-face card-face--back">
                        {service.image && (
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="scale-110 object-cover blur-xl brightness-75"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/85" />
                        <div className="relative flex h-full flex-col items-center justify-center p-6 text-center">
                          <div className="space-y-3">
                            <span className="inline-block text-[0.7rem] font-mono uppercase tracking-[0.2em] text-jokia-primary/90">
                              {service.subtitle}
                            </span>
                            <h3 className="bg-gradient-to-r from-jokia-primary via-jokia-secondary to-jokia-primary bg-clip-text text-lg font-semibold text-transparent md:text-xl leading-snug">
                              {service.title}
                            </h3>
                            <p className="text-[0.85rem] leading-relaxed text-white/80 md:text-[0.9rem]">
                              {service.description}
                            </p>
                          </div>
                          <div className="mt-5 flex flex-wrap justify-center gap-2">
                            {service.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="rounded-lg border border-fuchsia-400/70 bg-fuchsia-500/20 px-2.5 py-0.5 text-[0.78rem] font-medium text-fuchsia-200 backdrop-blur-sm"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}