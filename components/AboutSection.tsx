"use client";

const codeLines = [
  { num: 1, code: "const jokia = {", indent: 0 },
  { num: 2, code: '  mission: "diseñar futuros",', indent: 1 },
  { num: 3, code: '  expertise: "10+ proyectos",', indent: 1 },
  { num: 4, code: '  impact: "25K+ impresiones",', indent: 1 },
  { num: 5, code: '  deliver: () => "resultados"', indent: 1 },
  { num: 6, code: "}; // Córdoba · est. 2026", indent: 0 },
];

const baseTickerItems = [
  "• LANDING PAGES",
  "• IDENTIDAD VISUAL",
  "• ESTRATEGIA DIGITAL",
  "• WEB DESIGN",
  "• IA APLICADA",
  "• INTELIGENCIA ARTIFICIAL",
  "• BRANDING",
  "• MARKETING DIGITAL",
];

const tickerItems = [
  ...baseTickerItems,
  ...baseTickerItems,
  ...baseTickerItems,
];

const features = [
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13 3L6 14h5l-1 7 7-11h-5l1-7z" />
      </svg>
    ),
    title: "Performance-first",
    description:
      "Cada pixel tiene un propósito. Decisiones respaldadas por datos reales.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="7" />
        <circle cx="12" cy="12" r="3" />
        <path d="M19 5l-3.5 3.5" />
      </svg>
    ),
    title: "Conversión garantizada",
    description:
      "Diseñamos para resultados medibles, no solo para premios de diseño.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 15c4-1 7-4 8-8l2-2 1 1 1 1-2 2c-4 1-7 4-8 8L5 15z" />
        <path d="M9 19l1.5-1.5" />
        <path d="M13 5l2 2" />
      </svg>
    ),
    title: "Escala contigo",
    description:
      "Soluciones que crecen junto a tu negocio, con bases sólidas.",
  },
];

export default function AboutSection() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32" id="jokia">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-transparent" />

      {/* Ticker tape */}
      <div className="absolute top-0 left-0 right-0 z-20 h-10 overflow-hidden bg-[#050b1a]">
        <div className="flex animate-scroll whitespace-nowrap py-2 text-xs font-mono uppercase tracking-wider text-jokia-primary/60">
          {[0, 1].map((loopIndex) => (
            <div key={loopIndex} className="flex">
              {tickerItems.map((item, index) => (
                <span key={`${loopIndex}-${index}`} className="px-4">
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="animate-fade-in">
            <span className="mb-4 inline-block text-xs font-mono uppercase tracking-wider text-jokia-primary">
              {/* // SOBRE JOKIA */}
              // SOBRE JOKIA
            </span>

            <h2 className="mb-6 text-4xl font-bold leading-tight text-gray-900 dark:text-white lg:text-5xl">
              Diseño, marketing y tecnología.{" "}
              <span className="bg-gradient-to-r from-jokia-primary via-jokia-secondary to-jokia-primary bg-clip-text text-transparent">
                Unidos en sistemas que convierten.
              </span>
            </h2>

            <p className="mb-8 text-lg text-gray-600 dark:text-white/70">
              Jokia es una agencia digital de alto rendimiento. Diseñamos y
              ejecutamos sistemas digitales pensados para escalar marcas.
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="flex gap-4 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-jokia-primary/10 text-xl dark:bg-jokia-primary/20">
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
                </div>
              ))}
            </div>
          </div>

          <div className="animate-fade-in">
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

              <div className="space-y-1 font-mono text-sm">
                {codeLines.map((line) => (
                  <div key={line.num} className="flex gap-4 animate-fade-in">
                    <span className="select-none text-gray-400 dark:text-white/30">
                      {line.num}
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {line.code.includes('"') ? (
                        <>
                          {line.code.split('"').map((part, i) => (
                            <span key={i}>
                              {i % 2 === 0 ? (
                                part
                              ) : (
                                <span className="text-green-600 dark:text-green-400">
                                  "{part}"
                                </span>
                              )}
                            </span>
                          ))}
                        </>
                      ) : (
                        line.code
                      )}
                    </span>
                  </div>
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
                  <div className="text-2xl font-bold text-jokia-primary">
                    10+
                  </div>
                  <div className="text-xs text-gray-600 dark:text-white/50">
                    Proyectos
                  </div>
                </div>
                <div className="rounded-xl bg-white/50 p-4 dark:bg-white/5">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-2xl font-bold text-transparent">
                    100%
                  </div>
                  <div className="text-xs text-gray-600 dark:text-white/50">
                    Satisfacción
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .animate-scroll {
          animation: scroll 45s linear infinite;
          will-change: transform;
        }
      `}</style>
    </section>
  );
}
