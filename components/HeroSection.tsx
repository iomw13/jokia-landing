"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <section id="inicio" className="bg-[#f2f4f8] dark:bg-[#070707] pt-24 pb-6">
      {/* Margen lateral pequeño, igual que en la referencia */}
      <div className="px-4 sm:px-5">
        {/* El rectángulo con bordes redondeados */}
        <div className="relative h-[clamp(600px,82vh,940px)] w-full overflow-hidden rounded-3xl shadow-2xl dark:shadow-black/50">
          <div className="absolute inset-0 dark:hidden">
            <Image
              src="/hero/mc.avif"
              alt="Hero background"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 hidden dark:block">
            <Image
              src="/hero/mo.avif"
              alt="Hero background"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#050815_0%,#061638_45%,#061a3f_70%,#040613_100%)] opacity-45 dark:opacity-55" />
          <div className="hero-glow hero-glow-a" />
          <div className="hero-glow hero-glow-b" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/56 via-black/22 to-transparent" />

          <div className="relative z-10 flex h-full items-center">
            <div className="w-full max-w-[680px] px-8 md:px-12">
              <h1
                className="hero-fade hero-delay-1 font-semibold leading-[0.98] tracking-[-0.04em] text-white"
                style={{ fontFamily: "'DM Sans', ui-sans-serif, system-ui, -apple-system, sans-serif" }}
              >
                <span className="block text-[clamp(2.1rem,3.2vw,3.2rem)] text-white/90">
                  Recuperá tu tiempo.
                </span>
                <span className="mt-2 block text-[clamp(2.8rem,4.6vw,4.6rem)]">
                  <span className="hero-neon">Multiplicá</span> tus ingresos.
                </span>
              </h1>

              <p className="hero-fade hero-delay-2 mt-5 max-w-[54ch] text-[15px] leading-7 text-white/58">
                Automatizamos lo que te roba horas y construimos webs que convierten visitas en clientes.
              </p>

              <div className="hero-fade hero-delay-3 mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="#contacto"
                  className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-[#0a0a14] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_18px_40px_rgba(255,255,255,0.16)]"
                >
                  Quiero resultados reales →
                </a>

                <a
                  href="#proceso"
                  className="inline-flex items-center justify-center rounded-full border border-white/18 bg-white/6 px-7 py-3.5 text-[15px] font-medium text-white/82 backdrop-blur-md transition-all duration-200 hover:bg-white/10"
                >
                  Ver cómo lo hacemos
                </a>
              </div>
            </div>
          </div>

          <style jsx>{`
            .hero-glow {
              position: absolute;
              pointer-events: none;
              border-radius: 9999px;
              filter: blur(52px);
              opacity: 0.9;
              transform: translateZ(0);
              will-change: transform, opacity;
              animation: heroGlowFloat 9s ease-in-out infinite alternate;
            }
            .hero-glow-a {
              right: -160px;
              top: -140px;
              width: 640px;
              height: 640px;
              background: radial-gradient(circle at 40% 40%, rgba(123, 92, 255, 0.42), transparent 62%);
            }
            .hero-glow-b {
              right: -220px;
              bottom: -220px;
              width: 720px;
              height: 720px;
              background: radial-gradient(circle at 35% 35%, rgba(0, 225, 255, 0.22), rgba(25, 41, 225, 0.18) 28%, transparent 64%);
              animation-duration: 10.5s;
              animation-delay: -1.5s;
            }

            .hero-neon {
              display: inline-block;
              background-image: linear-gradient(90deg, #2a7fff 0%, #7b5cff 45%, #00e1ff 100%);
              background-size: 220% 100%;
              background-position: 0% 50%;
              -webkit-background-clip: text;
              background-clip: text;
              color: transparent;
              filter: drop-shadow(0 10px 28px rgba(123, 92, 255, 0.22))
                drop-shadow(0 0 22px rgba(0, 225, 255, 0.14));
              will-change: background-position, filter;
              animation: heroNeonSweep 8s ease-in-out infinite;
            }

            .hero-fade {
              opacity: 0;
              transform: translateY(10px);
              animation: heroFadeIn 700ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
            }
            .hero-delay-1 {
              animation-delay: 90ms;
            }
            .hero-delay-2 {
              animation-delay: 190ms;
            }
            .hero-delay-3 {
              animation-delay: 290ms;
            }

            @keyframes heroNeonSweep {
              0% {
                background-position: 0% 50%;
              }
              50% {
                background-position: 100% 50%;
              }
              100% {
                background-position: 0% 50%;
              }
            }

            @keyframes heroGlowFloat {
              0% {
                transform: translate3d(0, 0, 0) scale(1);
                opacity: 0.85;
              }
              100% {
                transform: translate3d(-22px, 18px, 0) scale(1.04);
                opacity: 1;
              }
            }

            @keyframes heroFadeIn {
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            @media (prefers-reduced-motion: reduce) {
              .hero-glow,
              .hero-neon,
              .hero-fade {
                animation: none !important;
                opacity: 1 !important;
                transform: none !important;
              }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
