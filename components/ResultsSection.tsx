"use client";

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
      <div className="pointer-events-none absolute inset-0 bg-transparent" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center lg:mb-16 animate-fade-in">
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
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {results.map((item, index) => (
            <div
              key={item.label}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white/70 p-6 shadow-sm backdrop-blur-xl transition-transform duration-300 animate-fade-in hover:border-jokia-primary/40 hover:shadow-xl hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 dark:hover:border-jokia-primary/40 will-change-transform transform hover:scale-[1.02] hover:-translate-y-0.5 hover:ring-2 hover:ring-jokia-primary/20"
              style={{ animationDelay: `${index * 0.1}s` }}
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

              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-jokia-primary/10 to-jokia-secondary/10 blur-2xl transition-opacity duration-300 opacity-60 group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent dark:from-white/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
