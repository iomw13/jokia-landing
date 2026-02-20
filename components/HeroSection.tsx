"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-jokia-primary/20 border-t-jokia-primary" />
    </div>
  ),
});

export default function HeroSection() {
  const [shouldLoadSpline, setShouldLoadSpline] = useState(false);
  const splineContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!splineContainerRef.current || typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoadSpline(true);
        }
      },
      { rootMargin: "500px" },
    );

    observer.observe(splineContainerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative flex min-h-screen items-center pt-20 pb-0 lg:pt-24">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white via-[#f5f3ff] to-white dark:from-jokia-darker dark:via-jokia-dark dark:to-jokia-darker" />
      
      {/* Animated Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20 dark:opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(58, 154, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(58, 154, 255, 0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 75% 75% at 50% 50%, black 20%, transparent 100%)",
        }}
      />

      <div className="container relative z-0 mx-auto grid items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
        <div className="max-w-2xl">
          <div className="mb-4 animate-fade-in">
            <span className="inline-flex items-center gap-2 rounded-full border border-jokia-primary/20 bg-jokia-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-jokia-primary backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-jokia-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-jokia-primary"></span>
              </span>
              Agencia Digital · Córdoba, Argentina
            </span>
          </div>

          <h1 className="mb-3 text-4xl font-bold leading-[1.1] animate-fade-in delay-100 sm:text-5xl lg:text-6xl">
            <span className="block text-gray-900 dark:text-white">Sistemas e IA</span>
            <span className="block animate-gradient bg-gradient-to-r from-[#B517FF] via-[#3A9AFF] to-[#00ff00] bg-[length:200%_auto] bg-clip-text text-transparent">
              que convierten
            </span>
          </h1>

          <p className="mb-4 font-mono text-sm text-jokia-primary animate-fade-in delay-200">
            $jokia → diseñando futuros digitales
          </p>

          <p className="mb-6 max-w-xl text-base leading-relaxed text-gray-600 animate-fade-in delay-300 dark:text-white/70">
            Creamos experiencias digitales que no solo se ven extraordinarias —
            generan resultados medibles para marcas que se niegan a ser ordinarias.
          </p>

          <div className="flex flex-wrap gap-3 animate-fade-in delay-300">
            <a
              href="#contacto"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-jokia-primary to-jokia-secondary px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              <span className="relative z-10">Iniciar proyecto</span>
              <svg
                className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1"
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

            <a
              href="#servicios"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white/60 px-6 py-3 text-sm font-semibold text-gray-900 backdrop-blur-sm transition-all hover:border-jokia-primary/30 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-jokia-primary/30 dark:hover:bg-white/10"
            >
              Ver servicios
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
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-6 border-t border-gray-200 pt-6 animate-fade-in delay-300 dark:border-white/10">
            {[
              { value: "10+", label: "proyectos completados" },
              { value: "25K+", label: "impresiones generadas" },
              { value: "100%", label: "clientes satisfechos" },
            ].map((stat, index) => (
              <div key={index} className="flex flex-col">
                <span className="font-mono text-3xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </span>
                <span className="font-mono text-xs text-gray-500 dark:text-white/50">
                  // {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative flex items-end justify-center px-3 sm:px-4 lg:justify-end">
          <div
            ref={splineContainerRef}
            className="relative h-[500px] w-full max-w-[540px] sm:h-[560px] sm:max-w-[560px] md:h-[620px] md:max-w-[620px] lg:h-[80vh] lg:max-w-[680px] xl:h-[88vh] xl:max-w-[760px]"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-jokia-primary/20 via-jokia-secondary/20 to-transparent blur-3xl" />

            {shouldLoadSpline ? (
              <div className="pointer-events-auto relative h-full w-full translate-y-3 sm:translate-y-4 lg:translate-y-5">
                <Spline scene="https://prod.spline.design/bOR60Mh9yorxS7qm/scene.splinecode" />
              </div>
            ) : (
              <div className="pointer-events-none relative flex h-full w-full items-center justify-center translate-y-3 rounded-3xl bg-gradient-to-br from-jokia-primary/10 to-jokia-secondary/20 sm:translate-y-4 lg:translate-y-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/10 shadow-glow">
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-jokia-primary/20 border-t-jokia-primary" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Gradient Orb */}
      <div className="pointer-events-none absolute left-0 top-1/4 h-96 w-96 rounded-full bg-jokia-primary/10 blur-[120px] dark:bg-jokia-primary/20" />
    </section>
  );
}
