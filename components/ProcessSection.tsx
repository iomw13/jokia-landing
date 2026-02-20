"use client";

const steps = [
  {
    number: "01",
    title: "Diagnóstico",
    description:
      "Analizamos tu mercado, competencia y audiencia para detectar oportunidades concretas y accionables.",
  },
  {
    number: "02",
    title: "Estrategia",
    description:
      "Definimos un plan claro, con objetivos medibles y criterios de éxito establecidos desde el inicio.",
  },
  {
    number: "03",
    title: "Ejecución",
    description:
      "Desarrollamos e implementamos cada solución con foco en el detalle, la funcionalidad y la calidad.",
  },
  {
    number: "04",
    title: "Optimización",
    description:
      "Evaluamos resultados, ajustamos y mejoramos de forma continua para lograr un mejor desempeño.",
  },
];

export default function ProcessSection() {
  return (
    <section
      className="relative overflow-hidden py-24 lg:py-32"
      id="proceso"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-[#faf9fc] to-white dark:from-jokia-darker dark:via-jokia-dark dark:to-jokia-darker" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center animate-fade-in">
          <span className="mb-4 inline-block text-xs font-mono uppercase tracking-wider text-jokia-primary">
            // PROCESO
          </span>

          <h2 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white lg:text-5xl">
            Cómo convertimos ideas en impacto
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Number circle */}
              <div className="mb-6 flex items-center">
                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-jokia-primary/20 to-jokia-secondary/20 font-mono text-2xl font-bold text-jokia-primary backdrop-blur-sm">
                    {step.number}
                  </div>
                  {/* Connecting line (except last) */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-full top-1/2 hidden h-px w-full bg-gradient-to-r from-jokia-primary/30 to-transparent lg:block" />
                  )}
                </div>
              </div>

              {/* Content */}
              <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                {step.title}
              </h3>

              <p className="text-gray-600 dark:text-white/70">
                {step.description}
              </p>

              <div className="mt-4 h-1 w-12 rounded-full bg-gradient-to-r from-jokia-primary to-jokia-secondary opacity-50" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
