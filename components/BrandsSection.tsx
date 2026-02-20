"use client";

const brands = [
  { name: "Estética EA" },
  { name: "Borcelle" },
  { name: "Abogada LM" },
  { name: "Jomabe" },
  { name: "Bennu" },
];

export default function BrandsSection() {
  return (
    <section className="relative overflow-hidden py-16" id="marcas">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-transparent" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center animate-fade-in">
          <h3 className="mb-8 text-lg font-semibold text-[#1929e1]">
            Marcas que confían en Jokia
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {brands.map((brand, index) => (
              <div
                key={brand.name}
                className="group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <button type="button" className="brand-btn">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M5 12h10M11 8l4 4-4 4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{brand.name}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .brand-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: inherit;
          cursor: pointer;
          font-weight: 500;
          font-size: 15px;
          padding: 0.8em 1.3em;
          color: white;
          background: linear-gradient(to right, #0d081a, #1929e1, #3b246a);
          border: none;
          letter-spacing: 0.05em;
          border-radius: 14px;
        }

        .brand-btn svg {
          width: 18px;
          height: 18px;
          transform: rotate(30deg);
          transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
        }

        .brand-btn span {
          transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
        }

        .brand-btn:hover svg {
          transform: translateX(5px) rotate(90deg);
        }

        .brand-btn:hover span {
          transform: translateX(7px);
        }
      `}</style>
    </section>
  );
}
