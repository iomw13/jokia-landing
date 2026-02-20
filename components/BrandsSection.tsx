"use client";

const brands = [
  { name: "Essence", logo: "✨" },
  { name: "Borcelle", logo: "💎" },
  { name: "Abogada LM", logo: "⚖️" },
  { name: "Jomabe", logo: "🏢" },
  { name: "Bennu", logo: "🌟" },
];

export default function BrandsSection() {
  return (
    <section className="relative overflow-hidden py-16" id="marcas">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-white dark:bg-jokia-dark" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center animate-fade-in">
          <h3 className="mb-8 text-lg font-semibold text-jokia-primary">
            Marcas que confían en Jokia
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {brands.map((brand, index) => (
              <div
                key={brand.name}
                className="group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex h-16 w-24 items-center justify-center rounded-xl border border-gray-200 bg-white/60 backdrop-blur-sm transition-all duration-300 hover:border-jokia-primary/30 hover:bg-white dark:hover:bg-white/10 hover:shadow-lg dark:border-white/10 dark:bg-white/5 dark:hover:border-jokia-primary/30">
                  {/* Placeholder - replace with actual logos */}
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-2xl">{brand.logo}</span>
                    <span className="text-xs font-medium text-gray-600 dark:text-white/70">
                      {brand.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
