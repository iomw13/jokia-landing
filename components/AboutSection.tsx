"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const codeLines = [
  { num: 1, code: "const jokia = {", indent: 0 },
  { num: 2, code: '  mission: "diseñar futuros",', indent: 1 },
  { num: 3, code: '  expertise: "10+ proyectos",', indent: 1 },
  { num: 4, code: '  impact: "25K+ impresiones",', indent: 1 },
  { num: 5, code: '  deliver: () => "resultados"', indent: 1 },
  { num: 6, code: "}; // Córdoba · est. 2026", indent: 0 },
];

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 3L6 14h5l-1 7 7-11h-5l1-7z" />
      </svg>
    ),
    title: "Performance-first",
    description: "Cada pixel tiene un propósito. Decisiones respaldadas por datos reales.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="7" />
        <circle cx="12" cy="12" r="3" />
        <path d="M19 5l-3.5 3.5" />
      </svg>
    ),
    title: "Conversión garantizada",
    description: "Diseñamos para resultados medibles, no solo para premios de diseño.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 15c4-1 7-4 8-8l2-2 1 1 1 1-2 2c-4 1-7 4-8 8L5 15z" />
        <path d="M9 19l1.5-1.5" />
        <path d="M13 5l2 2" />
      </svg>
    ),
    title: "Escala contigo",
    description: "Soluciones que crecen junto a tu negocio, con bases sólidas.",
  },
];

/* ── Variants ──────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay },
  }),
};

const codeLineVariant = {
  hidden: { opacity: 0, x: -14 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" as const, delay: i * 0.1 },
  }),
};

export default function AboutSection() {
  const { ref: leftRef, isInView: leftInView } = useScrollReveal();
  const { ref: rightRef, isInView: rightInView } = useScrollReveal();
  const { ref: codeRef, isInView: codeInView } = useScrollReveal(0.2);

  return (
    <section className="relative -mt-24 lg:-mt-32 overflow-visible py-16 lg:py-24" id="jokia">
      <div className="pointer-events-none absolute inset-0 bg-transparent" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* ── Left column ── */}
          <motion.div
            ref={leftRef as React.RefObject<HTMLDivElement>}
            initial="hidden"
            animate={leftInView ? "visible" : "hidden"}
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="mb-4 inline-block text-xs font-mono uppercase tracking-wider text-jokia-primary"
            >
              // SOBRE JOKIA
            </motion.span>

            <motion.h2
              variants={fadeUp}
              custom={0.08}
              className="mb-6 text-4xl font-bold leading-tight text-gray-900 dark:text-white lg:text-5xl"
            >
              Diseño, marketing y tecnología.{" "}
              <span className="bg-gradient-to-r from-jokia-primary via-jokia-secondary to-jokia-primary bg-clip-text text-transparent">
                Unidos en sistemas que convierten.
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              custom={0.16}
              className="mb-8 text-lg text-gray-600 dark:text-white/70"
            >
              Jokia es una agencia digital de alto rendimiento. Diseñamos y
              ejecutamos sistemas digitales pensados para escalar marcas.
            </motion.p>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={fadeUp}
                  custom={0.24 + index * 0.1}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-jokia-primary/10 text-xl text-gray-800 dark:text-white dark:bg-jokia-primary/20">
                      {feature.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-white/60">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Right column — code card ── */}
          <motion.div
            ref={rightRef as React.RefObject<HTMLDivElement>}
            variants={fadeUp}
            custom={0.12}
            initial="hidden"
            animate={rightInView ? "visible" : "hidden"}
          >
            <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white/60 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
              {/* Window controls */}
              <div className="mb-4 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
                <span className="ml-auto text-xs font-mono text-gray-500 dark:text-white/50">
                  jokia.config.js
                </span>
              </div>

              {/* Code lines — reveal one by one */}
              <div
                ref={codeRef as React.RefObject<HTMLDivElement>}
                className="space-y-1 font-mono text-sm"
              >
                {codeLines.map((line, i) => (
                  <motion.div
                    key={line.num}
                    custom={i}
                    variants={codeLineVariant}
                    initial="hidden"
                    animate={codeInView ? "visible" : "hidden"}
                    className="flex gap-4"
                  >
                    <span className="select-none text-gray-400 dark:text-white/30">
                      {line.num}
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {line.code.includes('"') ? (
                        <>
                          {line.code.split('"').map((part, j) => (
                            <span key={j}>
                              {j % 2 === 0 ? (
                                part
                              ) : (
                                <span className="text-green-600 dark:text-green-400">
                                  &quot;{part}&quot;
                                </span>
                              )}
                            </span>
                          ))}
                        </>
                      ) : (
                        line.code
                      )}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {["React", "Figma", "Motion", "SEO", "Analytics", "Branding"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-jokia-primary/20 bg-jokia-primary/10 px-3 py-1 text-xs font-medium text-jokia-primary"
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>

              {/* Mini stats */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-white/50 p-4 dark:bg-white/5">
                  <div className="text-2xl font-bold text-jokia-primary">10+</div>
                  <div className="text-xs text-gray-600 dark:text-white/50">Proyectos</div>
                </div>
                <div className="rounded-xl bg-white/50 p-4 dark:bg-white/5">
                  <div className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-2xl font-bold text-transparent">
                    100%
                  </div>
                  <div className="text-xs text-gray-600 dark:text-white/50">Satisfacción</div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
