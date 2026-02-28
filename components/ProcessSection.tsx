"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Diagnóstico",
    tag: "ANÁLISIS",
    description:
      "Analizamos tu mercado, competencia y audiencia para detectar oportunidades concretas y accionables.",
    detail: "Auditoría digital · Benchmarking · Mapa de oportunidades",
    image: "/procesos/diag.avif",
  },
  {
    number: "02",
    title: "Estrategia",
    tag: "PLANIFICACIÓN",
    description:
      "Definimos un plan claro, con objetivos medibles y criterios de éxito establecidos desde el inicio.",
    detail: "Roadmap · KPIs · Priorización de acciones",
    image: "/procesos/estra.avif",
  },
  {
    number: "03",
    title: "Ejecución",
    tag: "DESARROLLO",
    description:
      "Desarrollamos e implementamos cada solución con foco en el detalle, la funcionalidad y la calidad.",
    detail: "Diseño · Código · Integración · QA",
    image: "/procesos/ejec.avif",
  },
  {
    number: "04",
    title: "Optimización",
    tag: "MEJORA CONTINUA",
    description:
      "Evaluamos resultados, ajustamos y mejoramos de forma continua para lograr un mejor desempeño.",
    detail: "Métricas · A/B testing · Iteración",
    image: "/procesos/opti.avif",
  },
];

function StepRow({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      className={`ps-row ${isEven ? "ps-row--normal" : "ps-row--reverse"}`}
    >
      {/* Image */}
      <div className="ps-img-wrap">
        <img
          src={step.image}
          alt={step.title}
          className="ps-img"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Content */}
      <div className="ps-content">
        <div className="ps-top">
          <span className="ps-number">{step.number}</span>
          <span className="ps-tag">{step.tag}</span>
        </div>
        <h3 className="ps-step-title">{step.title}</h3>
        <p className="ps-desc">{step.description}</p>
        <div className="ps-badges">
          {step.detail.split(" · ").map((d) => (
            <span key={d} className="ps-badge">{d}</span>
          ))}
        </div>
      </div>

      {/* Connector line (not on last) */}
      {index < steps.length - 1 && (
        <div className="ps-connector" aria-hidden="true" />
      )}
    </motion.div>
  );
}

export default function ProcessSection() {
  return (
    <section id="proceso" className="py-28">
      <style>{`
        .ps-container {
          max-width: 1100px;
          margin: auto;
          padding: 0 24px;
        }

        /* HEADER */
        .ps-header {
          text-align: center;
          margin-bottom: 72px;
        }
        .ps-mono {
          font-size: 12px;
          letter-spacing: .2em;
          margin-bottom: 16px;
          display: block;
          color: #111827;
          opacity: .8;
        }
        .dark .ps-mono { color: rgba(255,255,255,0.65); }
        .ps-title-main {
          font-size: clamp(2.2rem, 4vw, 3rem);
          font-weight: 800;
        }
        .ps-title-main .black-light { color: #111827; }
        .dark .ps-title-main .black-light { color: #ffffff; }
        .ps-title-main .gradient {
          background: linear-gradient(90deg, #7c3aed, #a764ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* ROWS */
        .ps-steps {
          display: flex;
          flex-direction: column;
          gap: 0;
          position: relative;
        }

        /* Vertical line connecting all steps */
        .ps-steps::before {
          content: "";
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 1px;
          background: linear-gradient(180deg,
            transparent,
            rgba(124,58,237,0.25) 10%,
            rgba(124,58,237,0.25) 90%,
            transparent
          );
          transform: translateX(-50%);
          pointer-events: none;
        }

        .ps-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          padding: 56px 0;
          position: relative;
        }

        .ps-row--reverse {
          direction: rtl;
        }
        .ps-row--reverse > * {
          direction: ltr;
        }

        /* Dot on the center line */
        .ps-row::after {
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: linear-gradient(135deg, #7c3aed, #3B82F6);
          box-shadow: 0 0 0 4px rgba(124,58,237,0.12);
          z-index: 1;
        }

        /* Divider between steps */
        .ps-row + .ps-row {
          border-top: 1px solid rgba(124,58,237,0.08);
        }
        .dark .ps-row + .ps-row {
          border-top: 1px solid rgba(124,58,237,0.15);
        }

        /* IMAGE */
        .ps-img-wrap {
          border-radius: 20px;
          overflow: hidden;
          aspect-ratio: 4/3;
          box-shadow: 0 12px 40px rgba(0,0,0,0.08);
        }
        .dark .ps-img-wrap {
          box-shadow: 0 12px 40px rgba(0,0,0,0.3);
        }
        .ps-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 20px;
          transition: transform 0.4s ease;
        }
        .ps-img-wrap:hover .ps-img {
          transform: scale(1.03);
        }

        /* CONTENT */
        .ps-content {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .ps-top {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .ps-number {
          font-size: 13px;
          font-weight: 800;
          letter-spacing: .18em;
          color: #7c3aed;
        }

        .ps-tag {
          display: inline-block;
          padding: 4px 10px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .08em;
          border-radius: 10px;
          color: #7c3aed;
          background: rgba(139,92,246,0.08);
          border: 1px solid #A78BFA;
        }
        .dark .ps-tag {
          color: #c4b5fd;
          background: rgba(139,92,246,0.16);
          border-color: rgba(167,139,250,0.5);
        }

        .ps-step-title {
          font-size: clamp(1.8rem, 3vw, 2.4rem);
          font-weight: 800;
          color: #111827;
          line-height: 1.1;
          margin: 0;
        }
        .dark .ps-step-title { color: #ffffff; }

        .ps-desc {
          font-size: 16px;
          line-height: 1.65;
          color: #4B5563;
          margin: 0;
        }
        .dark .ps-desc { color: rgba(255,255,255,0.65); }

        .ps-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 4px;
        }

        .ps-badge {
          display: inline-flex;
          align-items: center;
          padding: 5px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          color: #6D28D9;
          background: rgba(139,92,246,0.07);
          border: 1px solid rgba(167,139,250,0.4);
        }
        .dark .ps-badge {
          color: #c4b5fd;
          background: rgba(139,92,246,0.14);
          border-color: rgba(167,139,250,0.35);
        }

        /* MOBILE */
        @media (max-width: 768px) {
          .ps-steps::before { display: none; }
          .ps-row {
            grid-template-columns: 1fr;
            gap: 24px;
            padding: 40px 0;
          }
          .ps-row::after { display: none; }
          .ps-row--reverse { direction: ltr; }
          .ps-img-wrap { aspect-ratio: 16/9; }
          .ps-row + .ps-row {
            border-top: 1px solid rgba(124,58,237,0.1);
          }
        }
      `}</style>

      <div className="ps-container">
        {/* Header */}
        <div className="ps-header">
          <span className="ps-mono">// proceso</span>
          <h2 className="ps-title-main">
            <span className="black-light">De la idea al</span>{" "}
            <span className="gradient">resultado real</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="ps-steps">
          {steps.map((step, i) => (
            <StepRow key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
