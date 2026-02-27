"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const brands = [
  { name: "Estética EA", category: "Estética Integral", index: "01" },
  { name: "Borcelle", category: "Retail & Moda", index: "02" },
  { name: "Abogada LM", category: "Servicios Legales", index: "03" },
  { name: "Jomabe", category: "Herrería", index: "04" },
  { name: "Bennu", category: "Insumos para estética", index: "05" },
  { name: "Essence", category: "Cosmética", index: "06" },
];

function BrandIcon({ category }: { category: string }) {
  const c = category.toLowerCase();
  if (c.includes("estética") || c.includes("insumo")) return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 3l1.6 3.2L17 8l-3.4 1.6L12 13l-1.6-3.4L7 8l3.4-1.8L12 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M6 15l.9 1.8L9 18l-2.1 1-1 2-1-2-2-1 2.1-.9L6 15z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
  if (c.includes("moda") || c.includes("retail")) return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M4 7a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.4.6l4.5 4.5a2 2 0 0 1 0 2.8l-6.3 6.3a2 2 0 0 1-2.8 0L4.6 14.4A2 2 0 0 1 4 13V7z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8" cy="9" r="1" fill="currentColor" />
    </svg>
  );
  if (c.includes("legal")) return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 5l6 12H6l6-12z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 13c0 1.7-1.6 3-3.5 3S1 14.7 1 13h7zM23 13c0 1.7-1.6 3-3.5 3S16 14.7 16 13h7z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
  if (c.includes("herrer")) return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  if (c.includes("cosm")) return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 3c3 3 6 6 6 9a6 6 0 1 1-12 0c0-3 3-6 6-9z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 2l8 5v10l-8 5-8-5V7l8-5z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/* ── Variants ── */
const headerVariant = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const dividerVariant = {
  hidden: { opacity: 0, scaleX: 0.3 },
  visible: { opacity: 1, scaleX: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.1 } },
};

const gridContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function BrandsSection() {
  const { ref: headerRef, isInView: headerInView } = useScrollReveal();
  const { ref: gridRef, isInView: gridInView } = useScrollReveal(0.1);

  return (
    <>
      <style>{`
        /* ── Tokens: LIGHT (default) ── */
        .bs {
          --n: 124, 58, 237;
          --bs-card-bg:       transparent;
          --bs-card-border:   rgba(124, 58, 237, 0.5);
          --bs-index:         rgba(59, 130, 246, 0.55);
          --bs-index-hover:   rgba(59, 130, 246, 0.9);
          --bs-name:          #1f2937;
          --bs-name-hover:    #1f2937;
          --bs-category:      rgba(15, 23, 42, 0.68);
          --bs-category-hover:rgba(59, 130, 246, 0.8);
          --bs-icon-bg:       rgba(124, 58, 237, 0.10);
          --bs-icon-border:   rgba(124, 58, 237, 0.35);
          --bs-icon-color:    rgba(124, 58, 237, 0.95);
          --bs-icon-bg-h:     rgba(59, 130, 246, 0.15);
          --bs-icon-border-h: rgba(59, 130, 246, 0.5);
          --bs-icon-color-h:  rgb(124, 58, 237);
          --bs-card-bg-h:     rgba(59, 130, 246, 0.07);
          --bs-card-border-h: rgba(124, 58, 237, 0.7);
          --bs-shadow-h:      rgba(59, 130, 246, 0.1);
          --bs-label:         rgba(15, 23, 42, 0.8);
          --bs-subtitle:      rgba(15, 23, 42, 0.72);
          --bs-title:         #1f2937;
          --bs-dot:           #7c3aed;
        }
        .dark .bs {
          --n: 59, 130, 246;
          --bs-card-bg:       rgba(255, 255, 255, 0.03);
          --bs-card-border:   rgba(29, 78, 216, 0.55);
          --bs-index:         rgba(var(--n), 0.45);
          --bs-index-hover:   rgba(var(--n), 0.85);
          --bs-name:          rgba(255, 255, 255, 0.88);
          --bs-name-hover:    #ffffff;
          --bs-category:      rgba(255, 255, 255, 0.3);
          --bs-category-hover:rgba(var(--n), 0.75);
          --bs-icon-bg:       rgba(var(--n), 0.07);
          --bs-icon-border:   rgba(var(--n), 0.18);
          --bs-icon-color:    rgba(var(--n), 0.7);
          --bs-icon-bg-h:     rgba(var(--n), 0.15);
          --bs-icon-border-h: rgba(var(--n), 0.5);
          --bs-icon-color-h:  rgb(14, 165, 233);
          --bs-card-bg-h:     rgba(var(--n), 0.08);
          --bs-card-border-h: rgba(29, 78, 216, 0.75);
          --bs-shadow-h:      rgba(var(--n), 0.12);
          --bs-label:         rgba(255, 255, 255, 0.55);
          --bs-subtitle:      rgba(255, 255, 255, 0.4);
          --bs-title:         #ffffff;
          --bs-dot:           #60a5fa;
        }
        .bs-divider {
          height: 1px;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(var(--n), 0.12) 15%,
            rgba(var(--n), 0.45) 50%,
            rgba(var(--n), 0.12) 85%,
            transparent 100%
          );
        }
        .bs-card {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;
          padding: 18px 18px 16px;
          background: var(--bs-card-bg);
          border: 1px solid var(--bs-card-border);
          border-radius: 20px;
          cursor: default;
          overflow: hidden;
          transition:
            background 0.4s ease,
            border-color 0.4s ease,
            transform 0.4s cubic-bezier(0.34, 1.4, 0.64, 1),
            box-shadow 0.4s ease;
          box-shadow:
            0 0 0 1px rgba(124, 58, 237, 0.25),
            0 0 12px rgba(124, 58, 237, 0.18);
        }
        .bs-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 20px;
          background: radial-gradient(ellipse at 50% 0%, rgba(var(--n), 0.08) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .bs-card:hover {
          background: var(--bs-card-bg-h);
          border-color: var(--bs-card-border-h);
          transform: translateY(-5px);
          box-shadow:
            0 0 0 1px rgba(var(--n), 0.08),
            0 8px 32px var(--bs-shadow-h),
            0 2px 8px rgba(0,0,0,0.08);
        }
        .bs-card:hover::before { opacity: 1; }
        .bs-index {
          font-family: ui-monospace, monospace;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.15em;
          color: var(--bs-index);
          transition: color 0.4s ease;
        }
        .bs-card:hover .bs-index { color: var(--bs-index-hover); }
        .bs-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px; height: 36px;
          border-radius: 12px;
          background: var(--bs-icon-bg);
          border: 1px solid var(--bs-icon-border);
          color: var(--bs-icon-color);
          transition:
            background 0.4s ease,
            border-color 0.4s ease,
            color 0.4s ease,
            box-shadow 0.4s ease,
            transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .bs-card:hover .bs-icon {
          background: var(--bs-icon-bg-h);
          border-color: var(--bs-icon-border-h);
          color: var(--bs-icon-color-h);
          box-shadow: 0 0 16px rgba(var(--n), 0.25);
          transform: rotate(15deg) scale(1.1);
        }
        .bs-name {
          font-size: 16px; font-weight: 600;
          letter-spacing: -0.01em;
          color: var(--bs-name); line-height: 1.2;
          transition: color 0.4s ease;
        }
        .bs-card:hover .bs-name { color: var(--bs-name-hover); }
        .bs-category {
          font-size: 11px; font-weight: 400;
          letter-spacing: 0.03em;
          color: var(--bs-category);
          transition: color 0.4s ease;
        }
        .bs-card:hover .bs-category { color: var(--bs-category-hover); }
        .bs-accent {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg,
            transparent,
            rgba(var(--n), 0.6),
            rgba(var(--n), 0.9),
            rgba(var(--n), 0.6),
            transparent
          );
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.45s cubic-bezier(0.34, 1.2, 0.64, 1);
          box-shadow: 0 0 8px rgba(var(--n), 0.5);
        }
        .bs-card:hover .bs-accent { transform: scaleX(1); }
        .bs-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--bs-dot);
          box-shadow: 0 0 8px var(--bs-dot);
          animation: bs-pulse 2.2s ease infinite;
          flex-shrink: 0;
        }
        @keyframes bs-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.65); }
        }
      `}</style>

      <section className="bs relative overflow-hidden py-20 lg:py-24" id="marcas">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <motion.div
            ref={headerRef as React.RefObject<HTMLDivElement>}
            variants={headerVariant}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            className="mb-12 flex flex-col items-center gap-3 text-center"
          >
            <div className="flex items-center gap-2.5">
              <div className="bs-dot" />
              <span
                className="font-mono text-xs font-semibold uppercase tracking-[0.18em]"
                style={{ color: "var(--bs-label)" }}
              >
                Marcas que confían en Jokia
              </span>
            </div>

            <h2
              className="text-3xl font-bold tracking-tight lg:text-4xl"
              style={{ color: "var(--bs-title)" }}
            >
              Clientes que{" "}
              <span style={{
                background: "linear-gradient(90deg, #7C3AED 0%, #C084FC 50%, #7C3AED 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                ya crecen con nosotros
              </span>
            </h2>

            <p className="max-w-md text-sm" style={{ color: "var(--bs-subtitle)" }}>
              Cada proyecto, una historia de crecimiento real.
            </p>
          </motion.div>

          {/* Divider top */}
          <motion.div
            variants={dividerVariant}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            className="bs-divider mb-10"
          />

          {/* Grid with stagger */}
          <motion.div
            ref={gridRef as React.RefObject<HTMLDivElement>}
            variants={gridContainer}
            initial="hidden"
            animate={gridInView ? "visible" : "hidden"}
            className="grid grid-cols-3 gap-3 lg:grid-cols-6 lg:gap-4"
          >
            {brands.map((brand) => (
              <motion.div
                key={brand.name}
                variants={cardVariant}
                className="bs-card"
              >
                <div className="flex w-full items-center justify-between">
                  <span className="bs-index">{brand.index}</span>
                </div>
                <div className="bs-icon">
                  <BrandIcon category={brand.category} />
                </div>
                <div>
                  <p className="bs-name">{brand.name}</p>
                  <p className="bs-category mt-1">{brand.category}</p>
                </div>
                <div className="bs-accent" />
              </motion.div>
            ))}
          </motion.div>

          {/* Divider bottom */}
          <motion.div
            variants={dividerVariant}
            initial="hidden"
            animate={gridInView ? "visible" : "hidden"}
            className="bs-divider mt-10"
          />
        </div>
      </section>
    </>
  );
}