"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type StatKey = "projects" | "clients" | "satisfaction" | "automations";

const cubicOut = (t: number) => 1 - Math.pow(1 - t, 3);

export default function StatsSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const hasAnimatedRef = useRef(false);

  const targets = useMemo<Record<StatKey, number>>(
    () => ({ projects: 34, clients: 27, satisfaction: 99, automations: 120 }),
    [],
  );

  const finalStrings = useMemo<Record<StatKey, string>>(
    () => ({
      projects: `${targets.projects}+`,
      clients: `${targets.clients}+`,
      satisfaction: `${targets.satisfaction}%`,
      automations: `${targets.automations}+`,
    }),
    [targets],
  );

  const placeholders = useMemo<Record<StatKey, string>>(() => {
    const toPlaceholder = (s: string) =>
      s
        .split("")
        .map((ch) => (ch >= "0" && ch <= "9" ? "•" : ch))
        .join("");
    return {
      projects: toPlaceholder(finalStrings.projects),
      clients: toPlaceholder(finalStrings.clients),
      satisfaction: toPlaceholder(finalStrings.satisfaction),
      automations: toPlaceholder(finalStrings.automations),
    };
  }, [finalStrings]);

  const [displayValues, setDisplayValues] = useState<Record<StatKey, string>>(() => placeholders);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(Boolean(mq.matches));
    apply();
    if (mq.addEventListener) mq.addEventListener("change", apply);
    else mq.addListener(apply);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", apply);
      else mq.removeListener(apply);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || hasAnimatedRef.current) return;
    const node = containerRef.current;
    if (!node) return;

    let obs: IntersectionObserver | null = null;

    if (reducedMotion) {
      hasAnimatedRef.current = true;
      rafRef.current = window.requestAnimationFrame(() => {
        setDisplayValues(finalStrings);
        rafRef.current = null;
      });
      return () => {
        if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      };
    }

    const run = () => {
      const durationMs = 950;
      const startTime = window.performance.now();
      const randomDigit = () => String(Math.floor(Math.random() * 10));
      const keys = Object.keys(finalStrings) as StatKey[];
      const tick = (now: number) => {
        const t = Math.min(1, (now - startTime) / durationMs);
        const e = cubicOut(t);
        const next: Record<StatKey, string> = {
          projects: "",
          clients: "",
          satisfaction: "",
          automations: "",
        };
        for (const key of keys) {
          const finalValue = finalStrings[key];
          const revealCount = Math.floor(e * finalValue.length);
          let out = "";
          for (let i = 0; i < finalValue.length; i++) {
            const ch = finalValue[i] ?? "";
            if (i < revealCount) out += ch;
            else if (ch >= "0" && ch <= "9") out += randomDigit();
            else out += ch;
          }
          next[key] = out;
        }
        setDisplayValues(next);
        if (t < 1) rafRef.current = window.requestAnimationFrame(tick);
        else {
          setDisplayValues(finalStrings);
          rafRef.current = null;
        }
      };
      rafRef.current = window.requestAnimationFrame(tick);
    };

    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      hasAnimatedRef.current = true;
      run();
      return;
    }

    if (typeof window.IntersectionObserver === "undefined") {
      hasAnimatedRef.current = true;
      run();
      return;
    }

    obs = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        obs?.unobserve(node);
        hasAnimatedRef.current = true;
        run();
      },
      { threshold: 0.12, rootMargin: "0px 0px -20% 0px" },
    );

    obs.observe(node);
    return () => {
      obs?.disconnect();
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [finalStrings, reducedMotion]);

  const STATS: { key: StatKey; label: string }[] = [
    { key: "projects", label: "proyectos entregados" },
    { key: "clients", label: "clientes activos" },
    { key: "satisfaction", label: "satisfacción garantizada" },
    { key: "automations", label: "automatizaciones" },
  ];

  const SERVICES = [
    {
      label: "Página Web",
      desc: "Sitios rápidos, modernos y optimizados para convertir visitas en clientes.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      ),
      accent: "#7b5cff",
    },
    {
      label: "Automatización",
      desc: "Conectamos tus herramientas para que el trabajo repetitivo suceda solo.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      ),
      accent: "#1929e1",
    },
  ];

  return (
    <section id="resultados" className="pt-24 pb-14 text-[#070707] dark:text-white">
      <div className="mx-auto w-full max-w-6xl px-6" ref={containerRef}>
        <div className="text-center">
          <p
            className="mx-auto max-w-5xl text-[clamp(1.6rem,3.2vw,2.6rem)] font-medium leading-[1.18] tracking-[-0.02em] text-[#070707]/85 dark:text-white/85"
            style={{ fontFamily: "'DM Sans', ui-sans-serif, system-ui, -apple-system, sans-serif" }}
          >
            <span className="font-semibold text-[#070707] dark:text-white">Páginas web</span> que convierten y{" "}
            <span className="font-semibold text-[#070707] dark:text-white">automatizaciones</span> que liberan tu tiempo.{" "}
            <span className="font-semibold text-[#1929e1]">Un solo objetivo:</span> que tu negocio crezca sin que vos tengas que estar en todo.
          </p>

          <div className="mt-12 py-10">
            <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
              {STATS.map(({ key, label }) => (
                <div key={key} className="px-2 text-left md:px-6">
                  <div className="text-[clamp(2.3rem,3.6vw,3.2rem)] font-extrabold leading-none tracking-[-0.03em] text-[#1929e1] tabular-nums">
                    <span className="inline-block" style={{ minWidth: `${finalStrings[key].length}ch` }}>
                      {displayValues[key]}
                    </span>
                  </div>
                  <div className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#070707]/55 dark:text-white/55">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 divide-y divide-black/10 border-y border-black/10 dark:divide-white/10 dark:border-white/10 md:grid-cols-2 md:divide-x md:divide-y-0">
          {SERVICES.map(({ label, desc, icon, accent }) => (
            <div
              key={label}
              className="group px-0 py-10 md:px-8"
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 text-[#070707]/80 dark:border-white/10 dark:text-white/80"
                  style={{
                    color: accent,
                    boxShadow: "0 0 0 0 rgba(0,0,0,0)",
                  }}
                >
                  {icon}
                </div>
                <div
                  className="text-left"
                  style={{ fontFamily: "'DM Sans', ui-sans-serif, system-ui, -apple-system, sans-serif" }}
                >
                  <div className="text-[clamp(1.15rem,1.6vw,1.5rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#070707] transition-colors duration-300 group-hover:text-[#ff5fb4] dark:text-white dark:group-hover:text-[#ff5fb4]">
                    {label}
                  </div>
                  <div className="mt-2 text-[16px] leading-7 text-[#070707]/70 transition-colors duration-300 group-hover:text-[#070707]/85 dark:text-white/70 dark:group-hover:text-white/85">
                    {desc}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

