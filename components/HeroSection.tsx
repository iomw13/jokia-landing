"use client";

import Image from "next/image";
import { useI18n } from "./I18nProvider";

export default function HeroSection() {
  const { messages } = useI18n();

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
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#050815_0%,#061638_45%,#061a3f_70%,#040613_100%)] opacity-30 dark:opacity-34" />
          <div className="hero-glow hero-glow-a" />
          <div className="hero-glow hero-glow-b" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/12 to-transparent dark:from-black/34 dark:via-black/10" />

          <div className="relative z-10 flex h-full items-center">
            <div className="mx-auto w-full max-w-6xl px-6">
              <div className="w-full max-w-[720px] px-5">
                <h1
                  className="hero-title hero-fade hero-delay-1 font-dm font-semibold leading-[0.98] tracking-[-0.04em] text-white"
                  suppressHydrationWarning
                >
                  <span className="block text-[clamp(2.3rem,3.4vw,3.4rem)] text-white/90">
                    {messages.hero.line1}
                  </span>
                  <span className="mt-2 block text-[clamp(3rem,4.9vw,4.9rem)]">
                    {messages.hero.line2Prefix}
                    <span className="hero-neon">{messages.hero.line2Accent}</span>
                    {messages.hero.line2Suffix}
                  </span>
                </h1>

                <p className="hero-subtitle hero-fade hero-delay-2 mt-5 max-w-[56ch] text-[16px] leading-7 text-white/70">
                  {messages.hero.subtitle}
                </p>

                <div className="hero-fade hero-delay-3 mt-9 flex flex-wrap items-center gap-3">
                  <a
                    href="#contacto"
                    className="cta-btn group inline-flex h-12 items-center gap-3 rounded-full border border-white/18 bg-[linear-gradient(135deg,rgba(255,255,255,0.10)_0%,rgba(123,92,255,0.14)_48%,rgba(25,41,225,0.12)_100%)] pl-6 pr-2 text-[15px] font-semibold leading-none tracking-[0.02em] text-white shadow-[0_18px_40px_rgba(0,0,0,0.18)] backdrop-blur-md transition-all duration-200 hover:-translate-y-px hover:bg-[linear-gradient(135deg,rgba(255,255,255,0.14)_0%,rgba(123,92,255,0.18)_48%,rgba(25,41,225,0.14)_100%)] hover:shadow-[0_22px_55px_rgba(0,0,0,0.22)] sm:h-[52px] sm:pl-7 sm:pr-2.5 sm:text-[16px]"
                  >
                    <span className="cta-text whitespace-nowrap">{messages.hero.ctaPrimary}</span>
                    <span className="cta-icon inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#7b5cff_0%,#1929e1_100%)] shadow-[0_10px_22px_rgba(123,92,255,0.28)] ring-inset ring-1 ring-white/25 transition-transform duration-200 group-hover:scale-105 sm:h-9 sm:w-9">
                      <svg
                        width="16"
                        height="19"
                        viewBox="0 0 16 19"
                        xmlns="http://www.w3.org/2000/svg"
                        className="cta-dots block text-white/95"
                        aria-hidden="true"
                      >
                        <circle cx="1.61321" cy="1.61321" r="1.5" fill="currentColor" />
                        <circle cx="5.73583" cy="1.61321" r="1.5" fill="currentColor" />
                        <circle cx="5.73583" cy="5.5566" r="1.5" fill="currentColor" />
                        <circle cx="9.85851" cy="5.5566" r="1.5" fill="currentColor" />
                        <circle cx="9.85851" cy="9.5" r="1.5" fill="currentColor" />
                        <circle cx="13.9811" cy="9.5" r="1.5" fill="currentColor" />
                        <circle cx="5.73583" cy="13.4434" r="1.5" fill="currentColor" />
                        <circle cx="9.85851" cy="13.4434" r="1.5" fill="currentColor" />
                        <circle cx="1.61321" cy="17.3868" r="1.5" fill="currentColor" />
                        <circle cx="5.73583" cy="17.3868" r="1.5" fill="currentColor" />
                      </svg>
                    </span>
                  </a>

                  <a
                    href="#proceso"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-white/18 bg-white/6 px-6 text-[15px] font-medium text-white/82 backdrop-blur-md transition-all duration-200 hover:bg-white/10 sm:h-[52px] sm:px-7 sm:text-[16px]"
                  >
                    {messages.hero.ctaSecondary}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <style jsx>{`
            .cta-dots {
              transform: translateX(0);
              opacity: 0.95;
              will-change: transform, opacity;
            }

            .cta-btn:hover .cta-dots {
              animation: ctaDots 1s linear infinite;
            }

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

            .hero-title {
              text-shadow: 0 18px 60px rgba(0, 0, 0, 0.42);
            }

            .hero-subtitle {
              text-shadow: 0 14px 44px rgba(0, 0, 0, 0.34);
            }

            .hero-neon {
              display: inline-block;
              color: #3b82f6;
              text-shadow: 0 18px 48px rgba(0, 0, 0, 0.28);
              will-change: color, text-shadow;
              animation: heroAccentColor 4.2s ease-in-out infinite;
            }

            :global(.dark) .hero-neon {
              background-image: linear-gradient(90deg, #2a7fff 0%, #7b5cff 45%, #00e1ff 100%);
              background-size: 220% 100%;
              background-position: 0% 50%;
              -webkit-background-clip: text;
              background-clip: text;
              color: transparent;
              text-shadow: none;
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

            @keyframes heroAccentColor {
              0%,
              100% {
                color: #3b82f6;
              }
              33% {
                color: #2563eb;
              }
              66% {
                color: #1d4ed8;
              }
            }

            @keyframes ctaDots {
              0% {
                opacity: 0.25;
                transform: translateX(0);
              }
              60% {
                opacity: 1;
              }
              100% {
                opacity: 0.9;
                transform: translateX(8px);
              }
            }

            @media (prefers-reduced-motion: reduce) {
              .hero-glow,
              .hero-neon,
              .hero-fade,
              .cta-dots {
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
