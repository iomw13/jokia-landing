"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*<>/\\[]{}";

function useScramble(target: string, interval = 50, revealDelay = 1200) {
  const [display, setDisplay] = useState(target);
  const frameRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // ✅ FIX: revealedRef was missing its declaration
  const revealedRef = useRef(0);

  const scramble = useCallback(() => {
    if (frameRef.current) clearInterval(frameRef.current);
    revealedRef.current = 0;
    frameRef.current = setInterval(() => {
      const revealed = revealedRef.current;
      setDisplay(
        target.split("").map((char, i) => {
          if (char === " ") return " ";
          if (i < revealed) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join("")
      );
      if (revealedRef.current < target.length) {
        revealedRef.current += 1;
      } else {
        if (frameRef.current) clearInterval(frameRef.current);
        setDisplay(target);
      }
    }, interval);
  }, [target, interval]);

  useEffect(() => {
    const timeout = setTimeout(scramble, revealDelay);
    return () => { clearTimeout(timeout); if (frameRef.current) clearInterval(frameRef.current); };
  }, [scramble, revealDelay]);

  return { display, scramble };
}

function useCountUp(end: number, duration = 1800, delay = 400) {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (startedRef.current) return;
      startedRef.current = true;
      const startTime = performance.now();
      const step = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setCount(Math.floor(eased * end));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(timeout);
  }, [end, duration, delay]);
  return count;
}

function StatItem({ value, label, delay }: { value: string; label: string; delay: number }) {
  const match = value.match(/^(\d+)(\S*)$/);
  const numPart = match ? parseInt(match[1]) : 0;
  const suffix = match ? match[2] : "";
  const count = useCountUp(numPart, 1600, delay);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <span className="hgrad hs-stat-number" style={{ fontFamily: "ui-monospace, monospace" }}>
        {count}{suffix}
      </span>
      <span style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.35)", whiteSpace: "nowrap" as const, marginTop: 6, textAlign: "center" as const }}>
        <span style={{ color: "rgba(114,65,255,0.6)" }}>// </span>{label}
      </span>
    </div>
  );
}

const MARQUEE_ITEMS = [
  "Branding", "Marketing Digital", "Landing Pages", "Identidad Visual",
  "Estrategia Digital", "Web Design", "IA Aplicada", "Inteligencia Artificial",
  "UI/UX Design", "Automatizacion", "E-commerce", "SEO",
];

export default function HeroSection() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [hasMouse, setHasMouse] = useState(false);
  const splineRef = useRef<HTMLDivElement | null>(null);
  const followRef = useRef<HTMLDivElement | null>(null);
  const { display: taglineDisplay, scramble: rescramble } = useScramble("$jokia creando futuros digitales", 38, 800);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1300px)");
    const handler = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsDesktop((e as MediaQueryList).matches);
    };
    handler(mq);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const handler = (e: MediaQueryListEvent | MediaQueryList) => {
      setHasMouse((e as MediaQueryList).matches);
    };
    handler(mq);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    return;
  }, [hasMouse]);

  return (
    <>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes gshift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes mscroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        .hf1 { opacity: 0; animation: fadeInUp 0.55s ease 0.05s forwards; }
        .hf2 { opacity: 0; animation: fadeInUp 0.55s ease 0.15s forwards; }
        .hf3 { opacity: 0; animation: fadeInUp 0.55s ease 0.25s forwards; }
        .hf4 { opacity: 0; animation: fadeInUp 0.55s ease 0.35s forwards; }

        .hgrad {
          background: linear-gradient(90deg, #8B5CF6, #2563EB, #1E40AF);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gshift 4s linear infinite;
          display: block;
        }
        .hs-stat-number {
          font-size: clamp(1.8rem, 3.5vw, 2.9rem);
          font-weight: 900;
          letter-spacing: -0.02em;
          line-height: 1;
        }

        /* ─── SECTION ─────────────────────────────────────────── */
        .hs {
          position: relative;
          width: 100%;
          background: #E8DEFF;
          display: flex;
          flex-direction: column;
          overflow-x: hidden;
        }
        .dark .hs { background: #030712; }

        .hs + * { position: relative; z-index: 1; margin-top: 0 !important; }

        /* ─── DESKTOP: full-viewport, grid layout ─────────────── */
        @media (min-width: 950px) {
          .hs {
            height: 100svh;
            min-height: 600px;
            overflow-y: visible;
          }
          .hs-grid {
            position: relative;
            z-index: 10;
            flex: 1 1 0%;
            min-height: 0;
            display: grid;
            grid-template-columns: 1fr 1fr;
            align-items: center;
            max-width: 1440px;
            width: 100%;
            margin: 0 auto;
            padding: 0 48px;
            gap: 0 48px;
            overflow: visible;
          }
          .hs-col-visual { display: block; }
        }

        /* ─── MOBILE: flex column, robot between text and marquee  */
        @media (max-width: 949.98px) {
          .hs {
            /* height auto — grows with content */
            min-height: 100svh;
          }
          .hs-grid {
            position: relative;
            z-index: 10;
            /* 
              3 rows: text | robot | (marquee is outside grid)
              We use flex so the robot block can sit naturally between content and marquee
            */
            display: flex;
            flex-direction: column;
            width: 100%;
            padding: 100px 24px 0;
          }
          .hs-col-visual { display: none; }
        }

        .hs-col-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          z-index: 15;
        }
        /* Light/dark contrast fixes */
        .hs .hf2 span:not(.hgrad) { color: #0a0a0a; }
        .dark .hs .hf2 span:not(.hgrad) { color: #ffffff; }
        .hs .hs-col-content p { color: rgba(0,0,0,0.72) !important; }
        .dark .hs .hs-col-content p { color: rgba(255,255,255,0.42) !important; }
        .hs .hs-btn1, .hs .hs-btn2 { color: #0a0a0a !important; background: rgba(255,255,255,0.7) !important; }
        .dark .hs .hs-btn1, .dark .hs .hs-btn2 { color: #ffffff !important; background: transparent !important; }
        .hs .hs-stats span:not(.hs-stat-number) { color: rgba(0,0,0,0.68) !important; }
        .dark .hs .hs-stats span:not(.hs-stat-number) { color: rgba(255,255,255,0.35) !important; }
        .hs .hs-mitem { color: #1E3A8A !important; opacity: 0.9; }
        .dark .hs .hs-mitem { color: rgba(255,255,255,0.3) !important; }

        /* ─── ROBOT CLIP ──────────────────────────────────────── */

        /* Desktop: absolutely positioned over the right half */
        .hs-robot-clip {
          position: absolute;
          top: 0;
          bottom: 50px;
          left: 38%;
          right: -2%;
          pointer-events: none;
          z-index: 5;
          overflow: hidden;
          background: #E8DEFF;
        }
        .dark .hs-robot-clip { background: #030712; }

        /* Mobile: in-flow block, INSIDE .hs-grid, after .hs-col-content */
        @media (max-width: 949.98px) {
          .hs-robot-clip {
            position: relative;
            left: auto;
            right: auto;
            top: auto;
            bottom: auto;
            width: 100%;
            height: 320px;
            margin-top: 16px;
            /* no overflow: hidden so iframe isn't clipped weirdly */
            overflow: visible;
            pointer-events: none;
            z-index: 5;
            order: 2; /* after text which has no explicit order (defaults to 0) */
          }
        }

        .hs-robot {
          position: absolute;
          inset: 0;
          pointer-events: auto;
          overflow: hidden;
        }

        .hs-robot-scale {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: auto;
        }

        .spline-wrapper {
          width: 100%;
          height: 100%;
          pointer-events: auto;
          position: relative;
        }

        .spline-iframe {
          position: absolute;
          inset: 0;
          width: 100% !important;
          height: 100% !important;
          border: 0 !important;
          background: transparent !important;
        }
        @media (min-width: 950px) {
          .spline-iframe {
            transform: scale(1.06) translateX(-2%);
            transform-origin: center;
          }
        }

        .spline-follow {
          position: absolute;
          inset: 0;
          will-change: transform;
          transform: perspective(900px);
          transition: transform 120ms ease;
          transform-origin: 50% 50%;
          backface-visibility: hidden;
        }
        /* Hide external Spline badge if injected outside iframe */
        a[href*="spline.design"] { display: none !important; pointer-events: none !important; }
        [aria-label*="Spline"] { display: none !important; pointer-events: none !important; }

        /* ─── GRADIENT MASKS (desktop only) ───────────────────── */
        .hs-mask-top,
        .hs-mask-left,
        .hs-mask-right,
        .hs-mask-bottom,
        .hs-glow-ground,
        .hs-glow-ground2,
        .hs-glow-ambient {
          display: none;
        }

        /* masks disabled to avoid visible gradients */

        /* ─── MARQUEE ─────────────────────────────────────────── */
        .hs-marquee {
          flex-shrink: 0;
          position: relative;
          z-index: 20;
          width: 100%;
          background: rgba(99, 165, 255, 0.12);
          border-top: 1px solid rgba(99, 165, 255, 0.25);
          overflow: hidden;
          padding: 13px 0;
          /* On mobile this naturally sits below the robot because robot is in-flow above */
          margin-top: 0;
        }
        .dark .hs-marquee {
          background: rgba(255,255,255,0.025);
          border-top: 1px solid rgba(255,255,255,0.07);
        }
        .hs-mtrack {
          display: flex;
          width: max-content;
          animation: mscroll 28s linear infinite;
        }
        .hs-mtrack:hover { animation-play-state: paused; }
        .hs-mgroup { display: flex; align-items: center; flex-shrink: 0; }
        .hs-mitem {
          display: flex; align-items: center; gap: 10px;
          padding: 0 22px;
          font-family: ui-monospace, monospace;
          font-size: 0.68rem; font-weight: 600;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: rgba(255,255,255,0.3); white-space: nowrap;
        }
        .hs-mdot { width: 4px; height: 4px; border-radius: 50%; background: #60A5FA; opacity: 0.9; flex-shrink: 0; }
        .dark .hs-mdot { background: #7241FF; opacity: 0.7; }

        /* ─── STATS ───────────────────────────────────────────── */
        .hs-stats {
          border-top: 1px solid rgba(255,255,255,0.1);
          padding-top: 20px; margin-top: 26px;
          display: flex; gap: 18px;
          justify-content: flex-start; align-items: flex-start;
          flex-wrap: nowrap; width: 100%;
        }
        @media (min-width: 950px) {
          .hs-stats { gap: 28px; }
        }
        @media (max-width: 949.98px) {
          .hs-stats { flex-wrap: wrap; width: 100%; justify-content: center; }
        }

        /* ─── BUTTONS ─────────────────────────────────────────── */
        .hs-btn1 {
          padding: 13px 22px; display: inline-flex; align-items: center; gap: 8px;
          color: #fff; font-weight: 600; font-size: 0.875rem; font-family: inherit;
          background: transparent; cursor: pointer;
          border-radius: 10px; border: 2px solid #7241FF;
          text-decoration: none; white-space: nowrap; transition: all 0.25s;
        }
        .hs-btn1:hover { box-shadow: 0 0 18px rgba(114,65,255,0.45); border-color: #8a5cff; transform: translateY(-2px); }
        .hs-btn2 {
          padding: 11px 20px; display: inline-flex; align-items: center; gap: 8px;
          color: #fff; font-weight: 600; font-size: 0.875rem; font-family: inherit;
          background: linear-gradient(135deg, rgba(59,130,246,0.08), rgba(124,58,237,0.08));
          border-radius: 10px; border: 2px solid #1E3A8A;
          text-decoration: none; white-space: nowrap; transition: all 0.25s;
        }
        .hs-btn2:hover { border-color: #3B82F6; box-shadow: 0 0 16px rgba(59,130,246,0.4); transform: translateY(-2px); }

        /* ─── ORBS ────────────────────────────────────────────── */
        .hs-orb1 { pointer-events:none; position:absolute; left:-80px; top:80px; width:320px; height:320px; border-radius:50%; background:rgba(114,65,255,0.12); filter:blur(100px); z-index: 1; }
        .hs-orb2 { display: none; }

        /* ─── DESKTOP ROBOT POSITION TWEAKS ───────────────────── */
        @media (min-width: 1300px) and (max-width: 1499px) { .hs-robot-clip { left: 36%; } }
        @media (min-width: 1500px) and (max-width: 1649px) { .hs-robot-clip { left: 38%; } }
        @media (min-width: 1650px) and (max-width: 1799px) { .hs-robot-clip { left: 40%; } }
        @media (min-width: 1800px) { .hs-robot-clip { left: 42%; } }
      `}</style>

      <section className="hs">
        <div className="hs-orb1" />
        

        {/*
          ✅ FIX RESPONSIVE:
          On mobile the grid is flex-column with 2 children:
            1. .hs-col-content  (text)
            2. .hs-robot-clip   (robot, position:relative, in-flow)
          The marquee (.hs-marquee) sits outside the grid so it's always last.
          On desktop the robot-clip is position:absolute so it overlays the right column.
        */}
        <div className="hs-grid">
          {/* ── Text content ── */}
          <div className="hs-col-content">
            <div className="hf1" style={{ marginBottom: 22 }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                borderRadius: 999, border: "1px solid rgba(114,65,255,0.25)",
                background: "rgba(114,65,255,0.06)", padding: "4px 12px",
                fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em",
                textTransform: "uppercase", color: "#7241FF"
              }}>
                <span style={{ position: "relative", display: "flex", width: 8, height: 8, flexShrink: 0 }}>
                  <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#7241FF", opacity: 0.75, animation: "ping 1.4s ease-in-out infinite" }} />
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#7241FF" }} />
                </span>
                Agencia Digital · Córdoba, Argentina
              </span>
            </div>

            <h1 className="hf2" style={{ margin: "0 0 14px", fontWeight: 800, lineHeight: 1.08, fontSize: "clamp(2.2rem, 4.5vw, 4.2rem)" }}>
              <span style={{ display: "block" }}>Sistemas e IA</span>
              <span className="hgrad">que convierten</span>
            </h1>

            <p className="hf3" onClick={rescramble} style={{ margin: "0 0 12px", cursor: "pointer", userSelect: "none", fontFamily: "ui-monospace, monospace", fontSize: "0.85rem" }} title="Click para re-codificar">
              <span style={{ color: "#444" }}>&gt;_</span>{" "}
              <span style={{ color: "#7241FF" }}>{taglineDisplay}</span>
              <span style={{ display: "inline-block", width: 2, height: 15, background: "#7241FF", marginLeft: 2, verticalAlign: "middle", animation: "blink 1s step-end infinite" }} />
            </p>

            <p className="hf3" style={{ margin: "0 0 28px", maxWidth: 500, fontSize: "1rem", lineHeight: 1.7, color: "rgba(255,255,255,0.42)" }}>
              Creamos experiencias digitales que no solo se ven extraordinarias —
              generan resultados medibles para marcas que se niegan a ser ordinarias.
            </p>

            <div className="hf4" style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <a href="#contacto" className="hs-btn1">
                Iniciar proyecto
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
              <a href="#servicios" className="hs-btn2">
                Ver servicios
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path d="M19 9l-7 7-7-7" /></svg>
              </a>
            </div>

            <div className="hs-stats hf4">
              <StatItem value="10+" label="PROYECTOS" delay={600} />
              <StatItem value="25K+" label="IMPRESIONES" delay={800} />
              <StatItem value="100%" label="SATISFECHOS" delay={1000} />
            </div>
          </div>

          {/* Placeholder column for desktop grid (robot is absolute over this) */}
          <div className="hs-col-visual" aria-hidden="true" />

          {/*
            ✅ Robot lives INSIDE .hs-grid so on mobile it flows between
            text and marquee. On desktop it's position:absolute so it
            overlays the right side without affecting grid flow.
          */}
          <div className="hs-robot-clip">
            <div className="hs-glow-ambient" />
            <div ref={splineRef} className="hs-robot">
              <div className="hs-robot-scale">
                <div className="spline-wrapper">
                  <div ref={followRef} className="spline-follow">
                    <iframe
                      src="https://my.spline.design/happyrobotbuttoncopy-DOihWYG6vDB2lLGH3Fjip2rQ/"
                      frameBorder="0"
                      className="spline-iframe"
                      title="Robot 3D"
                      allow="autoplay"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="hs-mask-top" />
            <div className="hs-mask-left" />
            <div className="hs-mask-right" />
            <div className="hs-mask-bottom" />
            <div className="hs-glow-ground2" />
            <div className="hs-glow-ground" />
          </div>
        </div>

        {/* Marquee always last, outside the grid */}
        <div className="hs-marquee">
          <div className="hs-mtrack" aria-hidden="true">
            {[0, 1].map((i) => (
              <div key={i} className="hs-mgroup">
                {MARQUEE_ITEMS.map((item) => (
                  <span key={item} className="hs-mitem">
                    <span className="hs-mdot" />
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
