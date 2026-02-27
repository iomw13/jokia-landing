"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, MouseEvent, useEffect, useState } from "react";

const services = [
  {
    id: 1,
    category: "MARKETING INTELIGENTE",
    title: "Estrategias que crecen solas",
    description:
      "Sistemas de marketing basados en datos, automatización e IA para convertir clientes de forma eficiente.",
    tags: ["Campañas", "Funnels", "IA", "Reporting"],
    gradient: "from-blue-500 to-purple-500",
    icon: "📊",
    stat: { value: "+150%", label: "ROI promedio" },
  },
  {
    id: 2,
    category: "WEB & CONVERSIÓN",
    title: "Páginas que convierten",
    description:
      "Landing pages rápidas, claras y enfocadas en generar resultados reales.",
    tags: ["Landing pages", "UX/UI", "Copywriting"],
    gradient: "from-cyan-500 to-blue-500",
    icon: "💻",
    stat: { value: "95%", label: "Satisfacción" },
  },
  {
    id: 3,
    category: "POS & GESTIÓN",
    title: "Control total",
    description:
      "Sistemas de punto de venta para ordenar ventas, stock y reportes en tiempo real.",
    tags: ["POS", "Stock", "Integraciones"],
    gradient: "from-fuchsia-500 to-purple-500",
    icon: "🏪",
    stat: { value: "-40%", label: "Tiempo admin" },
  },
  {
    id: 4,
    category: "IDENTIDAD",
    title: "Marcas memorables",
    description:
      "Identidades sólidas que se reconocen en todos los puntos de contacto.",
    tags: ["Branding", "Logo", "Manual"],
    gradient: "from-orange-500 to-amber-500",
    icon: "🎨",
    stat: { value: "100%", label: "Único" },
  },
];

interface ServiceCardProps {
  service: typeof services[0];
  index: number;
}

function ServiceCardPremium({ service, index }: ServiceCardProps) {
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 3D Tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    const checkMobile = () => {
      if (typeof window === "undefined") return;
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    if (typeof window === "undefined") return;
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="group relative h-full">
        <div
          className={`absolute -inset-1 rounded-3xl bg-gradient-to-r ${service.gradient} opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-30`}
        />

        <div
          className="relative h-full overflow-hidden rounded-3xl border border-gray-200 bg-white/80 backdrop-blur-2xl transition-all duration-500 group-hover:border-gray-300 group-hover:shadow-2xl dark:border-white/10 dark:bg-white/5"
          style={{ transform: "translateZ(20px)" }}
        >
          <div className="relative p-8 pb-4">
            <div
              className={`mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${service.gradient} text-3xl shadow-lg`}
              style={{ transform: "translateZ(40px)" }}
            >
              {service.icon}
            </div>

            <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-white/50">
              {service.category}
            </span>

            <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
              {service.title}
            </h3>

            <p className="mb-6 text-sm text-gray-600 dark:text-white/70">
              {service.description}
            </p>

            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/60 px-4 py-2 backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
              <span
                className={`bg-gradient-to-r ${service.gradient} bg-clip-text text-2xl font-bold text-transparent`}
              >
                {service.stat.value}
              </span>
              <span className="text-xs text-gray-600 dark:text-white/60">
                {service.stat.label}
              </span>
            </div>
          </div>

          <div className="border-t border-gray-200 p-6 dark:border-white/10">
            <div className="flex flex-wrap gap-2">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 transition-all hover:bg-gray-200 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-all hover:gap-3 dark:bg-white dark:text-gray-900"
            >
              Más info
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      viewport={{ once: true, margin: "-50px" }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative h-full"
    >
      {/* Glow effect */}
      <div
        className={`absolute -inset-1 rounded-3xl bg-gradient-to-r ${service.gradient} opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-30`}
      />

      {/* Main card */}
      <div
        className="relative h-full overflow-hidden rounded-3xl border border-gray-200 bg-white/80 backdrop-blur-2xl transition-all duration-500 group-hover:border-gray-300 group-hover:shadow-2xl dark:border-white/10 dark:bg-white/5"
        style={{ transform: "translateZ(20px)" }}
      >
        {/* Top section with icon */}
        <div className="relative p-8 pb-4">
          {/* Icon */}
          <div
            className={`mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${service.gradient} text-3xl shadow-lg`}
            style={{ transform: "translateZ(40px)" }}
          >
            {service.icon}
          </div>

          {/* Category */}
          <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-white/50">
            {service.category}
          </span>

          {/* Title */}
          <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
            {service.title}
          </h3>

          {/* Description */}
          <p className="mb-6 text-sm text-gray-600 dark:text-white/70">
            {service.description}
          </p>

          {/* Stat badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/60 px-4 py-2 backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
            <span
              className={`bg-gradient-to-r ${service.gradient} bg-clip-text text-2xl font-bold text-transparent`}
            >
              {service.stat.value}
            </span>
            <span className="text-xs text-gray-600 dark:text-white/60">
              {service.stat.label}
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="border-t border-gray-200 p-6 dark:border-white/10">
          <div className="flex flex-wrap gap-2">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 transition-all hover:bg-gray-200 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Hover CTA */}
        <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-all hover:gap-3 dark:bg-white dark:text-gray-900"
          >
            Más info
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>

        {/* Light reflection */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
    </motion.div>
  );
}

export default function ServicesSectionPremium() {
  return (
    <section
      className="relative overflow-hidden py-24 lg:py-32"
      id="servicios"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-[#fafbfc] to-white dark:from-jokia-darker dark:via-jokia-dark dark:to-jokia-darker" />

      {/* Radial gradient */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-jokia-primary/5 blur-[100px]" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center animate-fade-in">
          <span className="mb-4 inline-block font-mono text-xs uppercase tracking-wider text-jokia-primary">
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
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <ServiceCardPremium
              key={service.id}
              service={service}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
