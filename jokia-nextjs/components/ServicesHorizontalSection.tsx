"use client";

import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const services = [
  {
    title: "Estrategias que crecen solas",
    subtitle: "MARKETING INTELIGENTE & AUTOMATIZACIÓN",
    description:
      "Diseñamos sistemas de marketing basados en datos, automatización e IA para atraer, calificar y convertir clientes de forma eficiente.",
    tags: ["Campañas", "Funnels", "IA", "Automatización", "Reporting"],
    image: "https://jokia.agency/src/imagenes/marketing.avif",
    gradient: "from-blue-500/20 to-purple-500/20",
  },
  {
    title: "Páginas pensadas para convertir",
    subtitle: "WEB & CONVERSIÓN",
    description:
      "Creamos sitios y landing pages rápidas, claras y enfocadas en una sola acción: generar resultados reales.",
    tags: ["Landing pages", "UX/UI", "Copywriting", "Optimización"],
    image: "https://jokia.agency/src/imagenes/landing.avif",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "Control total de tu negocio",
    subtitle: "POS & SISTEMAS DE GESTIÓN",
    description:
      "Implementamos sistemas de punto de venta y gestión para ordenar ventas, stock y reportes en tiempo real.",
    tags: ["POS", "Stock", "Ventas", "Integraciones"],
    image: "https://jokia.agency/src/imagenes/pos.avif",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    title: "Marcas memorables",
    subtitle: "IDENTIDAD DE MARCA",
    description:
      "Construimos identidades sólidas y coherentes que se reconocen en todos los puntos de contacto.",
    tags: ["Branding", "Logo", "Sistema visual", "Manual de marca"],
    image: "https://jokia.agency/src/imagenes/branding.avif",
    gradient: "from-orange-500/20 to-red-500/20",
  },
  {
    title: "Experiencias modernas en la mesa",
    subtitle: "MENÚS DIGITALES",
    description:
      "Diseñamos menús digitales claros, rápidos y adaptados a mobile para mejorar la experiencia del cliente.",
    tags: ["QR", "Multi-sucursal", "Edición simple"],
    image: "https://jokia.agency/src/imagenes/menu.avif",
    gradient: "from-pink-500/20 to-purple-500/20",
  },
];

const layoutClasses = [
  "md:col-span-2",
  "md:col-span-2 md:row-span-2",
  "md:col-span-1",
  "md:col-span-1",
  "md:col-span-4",
];

export default function ServicesHorizontalSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={containerRef}
      className="relative -mt-8 overflow-hidden py-24 lg:py-32"
      id="servicios"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#f5f3ff] to-white dark:from-transparent dark:via-jokia-darker dark:to-jokia-dark" />

      <div className="container relative z-10 mx-auto -mt-8 px-2 sm:px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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

        <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
          <div className="grid auto-rows-[260px] gap-4 md:auto-rows-[320px] md:grid-cols-4 md:gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`group relative h-full ${layoutClasses[index] ?? "md:col-span-2"}`}
              >
                <div className="relative h-full w-full rounded-3xl border border-gray-200 bg-transparent shadow-sm transition-all duration-500 hover:border-gray-300 hover:shadow-2xl dark:border-white/10 dark:hover:border-white/20 [perspective:1600px]">
                  <div className="relative h-full w-full rounded-3xl [transform-style:preserve-3d] transition-transform duration-700 group-hover:[transform:rotateY(180deg)]">
                    {/* Front: imagen + overlay de título */}
                    <div className="absolute inset-0 overflow-hidden rounded-3xl bg-gray-900 [backface-visibility:hidden]">
                      {service.image && (
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute inset-0 flex items-end">
                        <div className="w-full px-5 pb-5">
                          <span className="mb-1 inline-block text-[0.65rem] font-mono uppercase tracking-[0.25em] text-white/70">
                            {service.subtitle}
                          </span>
                          <h3 className="text-lg font-semibold text-white md:text-xl">
                            {service.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Back: misma imagen blureada + texto encima */}
                    <div className="absolute inset-0 overflow-hidden rounded-3xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      {service.image && (
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="scale-110 object-cover blur-lg"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/80" />

                      <div className="relative flex h-full flex-col p-5 md:p-6">
                        <div className="space-y-2 md:space-y-3">
                          <span className="inline-block text-[0.7rem] font-mono uppercase tracking-[0.2em] text-jokia-primary/90">
                            {service.subtitle}
                          </span>

                          <h3 className="bg-gradient-to-r from-jokia-primary via-jokia-secondary to-jokia-primary bg-clip-text text-lg font-semibold text-transparent md:text-xl">
                            {service.title}
                          </h3>

                          <p className="text-[0.8rem] leading-relaxed text-white/85 md:text-[0.9rem]">
                            {service.description}
                          </p>
                        </div>

                        <div className="mt-auto flex flex-wrap gap-1.5 pt-3 md:gap-2">
                          {service.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-lg border border-white/30 bg-white/15 px-2.5 py-0.5 text-[0.75rem] font-medium text-white/90"
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
          </div>
        </div>
      </div>
    </section>
  );
}
