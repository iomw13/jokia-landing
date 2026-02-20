"use client";

import { motion } from "framer-motion";

const results = [
  {
    value: "25K+",
    label: "Impresiones totales",
    description:
      "Alcance orgánico en redes sociales y plataformas digitales.",
  },
  {
    value: "10+",
    label: "Proyectos completados",
    description:
      "Entregados en tiempo y presupuesto, desde startups hasta marcas establecidas.",
  },
  {
    value: "100%",
    label: "Clientes satisfechos",
    description:
      "Tasa de satisfacción basada en encuestas post-proyecto.",
  },
];

export default function ResultsSection() {
  return (
    <section
      className="relative overflow-hidden py-24 lg:py-32"
      id="results"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-[#f5f3ff] to-white dark:from-jokia-darker dark:via-jokia-dark dark:to-jokia-darker" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center lg:mb-16"
        >
          <span className="mb-4 inline-block text-xs font-mono uppercase tracking-wider text-jokia-primary">
            // RESULTADOS
          </span>

          <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white lg:text-5xl">
            Números que{" "}
            <span className="bg-gradient-to-r from-jokia-primary via-jokia-secondary to-jokia-primary bg-clip-text text-transparent">
              hablan solos
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-white/70">
            Resultados reales obtenidos junto a nuestros clientes, medidos para
            que cada decisión tenga respaldo en datos.
          </p>
        </motion.div>

        {/* Results grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {results.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white/70 p-6 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
            >
              <div className="mb-4 flex items-baseline gap-2">
                <span className="bg-gradient-to-r from-jokia-primary via-jokia-secondary to-jokia-primary bg-clip-text text-4xl font-bold text-transparent">
                  {item.value}
                </span>
              </div>

              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-800 dark:text-white">
                {item.label}
              </h3>

              <p className="text-sm text-gray-600 dark:text-white/70">
                {item.description}
              </p>

              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-jokia-primary/10 to-jokia-secondary/10 blur-2xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

