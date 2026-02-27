"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

export default function ProcessSection() {

  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    setCurrent(prev => (prev + 1) % steps.length);
  };

  const step = steps[current];
  const progress = ((current + 1) / steps.length) * 100;

  const transition = {
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1] as const
  }

  return (

    <section id="proceso" className="py-28">

      <style>{`

      .ps-container{
        max-width:1200px;
        margin:auto;
        padding:0 24px;
      }

      /* HEADER */

      .ps-header{
        text-align:center;
        margin-bottom:80px;
      }

      .ps-mono{
        font-size:12px;
        letter-spacing:.2em;
        margin-bottom:16px;
        display:block;
        color:#111827;
        opacity:.8;
      }
      .dark .ps-mono{ color:rgba(255,255,255,0.7); opacity:.65; }

      .ps-title-main{
        font-size:clamp(2.2rem,4vw,3rem);
        font-weight:800;
      }

      .ps-title-main .black-light{ color:#111827; }
      .dark .ps-title-main .black-light{ color:#ffffff; }

      .ps-title-main .gradient{
        background:linear-gradient(90deg,#7c3aed,#a764ff);
        -webkit-background-clip:text;
        -webkit-text-fill-color:transparent;
      }

      /* LAYOUT */

      .ps-layout{
        display:grid;
        justify-content:center;
        align-items:center;
        gap:40px;
      }

      @media(min-width:1024px){

        .ps-layout{
          grid-template-columns:480px 480px;
          gap:60px; /* espacio correcto entre card e imagen */
        }

      }

      /* CARD */

      .ps-deck{
        width:480px;
        height:500px;
        position:relative;
      }

      .ps-card{
        position:absolute;
        inset:0;
        border-radius:28px;
        background:#ffffff;
        color:#111827;
        border:1px solid rgba(30,58,138,0.15);
        box-shadow:0 20px 60px rgba(99,102,241,0.18);
        backdrop-filter: blur(4px);
        transition: box-shadow .25s, transform .25s, border-color .25s;
      }
      .ps-card::before{
        content:"";
        position:absolute;
        inset:-10%;
        border-radius:32px;
        background:radial-gradient(120% 120% at 0% 0%, rgba(99,165,255,0.28), transparent 60%);
        filter: blur(18px);
        z-index:0;
        pointer-events:none;
      }
      .ps-card:hover{
        box-shadow:0 30px 80px rgba(96,165,250,0.35), 0 12px 30px rgba(139,92,246,0.25);
        border-color: rgba(124,58,237,0.35);
        transform: translateY(-3px);
      }
      .dark .ps-card{
        background:#1b1528;
        color:#ffffff;
        border:1px solid rgba(124,58,237,0.5);
        box-shadow:0 20px 60px rgba(124,58,237,0.35);
      }

      .ps-inner{
        padding:40px;
        height:100%;
        display:flex;
        flex-direction:column;
        position:relative;
        z-index:1;
      }

      .ps-card-title{
        font-size:42px;
        font-weight:800;
        margin-bottom:16px;
        color:#7c3aed;
      }
      .dark .ps-card-title{ color:#ffffff; }

      .ps-touch{
        padding:10px 18px;
        font-size:13px;
        border-radius:10px;
        margin-top:16px;
        margin-bottom:16px;
        width:fit-content;
        background:linear-gradient(135deg, rgba(59,130,246,0.18), rgba(99,102,241,0.12));
        border:2px solid #3B82F6;
        cursor:pointer;
        color:#2563EB;
        box-shadow:0 0 12px rgba(59,130,246,0.35);
        transition:transform .2s ease, box-shadow .2s ease, border-color .2s ease, color .2s ease;
      }
      .dark .ps-touch{
        background:linear-gradient(135deg, rgba(59,130,246,0.22), rgba(99,102,241,0.18));
        border:2px solid #60A5FA;
        color:#ffffff;
        box-shadow:0 0 12px rgba(59,130,246,0.45);
      }
      .ps-touch:hover{
        transform:translateY(-2px);
        box-shadow:0 0 18px rgba(59,130,246,0.55), 0 0 12px rgba(99,102,241,0.45);
        border-color:#1D4ED8;
        color:#1D4ED8;
      }

      .ps-progress{
        height:6px;
        border-radius:999px;
        background:rgba(99,102,241,.18);
        overflow:hidden;
      }

      .ps-progress-fill{
        height:100%;
        background:linear-gradient(90deg,#3B82F6,#8B5CF6);
        box-shadow:0 0 14px rgba(139,92,246,0.35), 0 0 10px rgba(59,130,246,0.30) inset;
        will-change: width;
        border-radius:999px;
      }

      /* IMAGE */

      .ps-image-wrap{
        width:480px;
        height:500px;
        position:relative;
        border-radius:28px;
        overflow:hidden;
        box-shadow:none;
      }

      .ps-image{
        width:100%;
        height:100%;
        object-fit:cover;
        border-radius:28px;
        box-shadow:none;
      }

      /* TAGS */
      .ps-tag{
        display:inline-block;
        margin-top:6px;
        margin-bottom:10px;
        padding:6px 12px;
        font-size:12px;
        font-weight:700;
        letter-spacing:.08em;
        border-radius:14px;
        color:#7c3aed;
        background:rgba(139,92,246,0.08);
        border:1px solid #A78BFA;
        box-shadow:0 0 6px rgba(139,92,246,0.22);
        width:fit-content;
      }
      .dark .ps-tag{ color:#ffffff; background:rgba(139,92,246,0.16); border-color:#A78BFA; box-shadow:0 0 8px rgba(139,92,246,0.28); }
      .ps-badges{ display:flex; flex-wrap:wrap; gap:8px; margin-top:12px; }
      .ps-badge{
        display:inline-flex; align-items:center;
        padding:6px 12px;
        border-radius:14px;
        font-size:12px; font-weight:700;
        color:#7c3aed;
        background:rgba(139,92,246,0.08);
        border:1px solid #A78BFA;
        box-shadow:0 0 6px rgba(139,92,246,0.22);
      }
      .dark .ps-badge{ color:#ffffff; background:rgba(139,92,246,0.16); border-color:#A78BFA; box-shadow:0 0 8px rgba(139,92,246,0.28); }

      .ps-number{
        font-size:14px;
        font-weight:800;
        letter-spacing:.18em;
        color:#7c3aed;
      }

      `}</style>

      <div className="ps-container">

        {/* HEADER */}

        <div className="ps-header">

          <span className="ps-mono">
            // proceso
          </span>

          <h2 className="ps-title-main">
            <span className="black-light">
              De la idea al
            </span>{" "}
            <span className="gradient">
              resultado real
            </span>
          </h2>

        </div>


        {/* CONTENT */}

        <div className="ps-layout">


          {/* CARD */}

          <div className="ps-deck">

            <AnimatePresence mode="wait" initial={false}>

              <motion.div
                key={current}
                className="ps-card"
                initial={{ x: 80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -80, opacity: 0 }}
                transition={transition}
              >

                <div className="ps-inner">

                  <div className="ps-number">{step.number}</div>

                  <div className="ps-tag">{step.tag}</div>

                  <div className="ps-card-title">
                    {step.title}
                  </div>

                  <div style={{flex:1}}>
                    {step.description}
                  </div>

                  <div className="ps-badges">
                    {step.detail.split(" · ").map((d) => (
                      <span key={d} className="ps-badge">{d}</span>
                    ))}
                  </div>

                  <button
                    className="ps-touch"
                    onClick={handleNext}
                  >
                    click aquí →
                  </button>

                  <div className="ps-progress">

                    <motion.div
                      className="ps-progress-fill"
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: .4 }}
                    />

                  </div>

                </div>

              </motion.div>

            </AnimatePresence>

          </div>


          {/* IMAGE */}

          <div className="ps-image-wrap">

            <AnimatePresence mode="wait" initial={false}>

              <motion.img
                key={current}
                src={step.image}
                className="ps-image"
                initial={{ x: -80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 80, opacity: 0 }}
                transition={transition}
                loading="eager"
                decoding="async"
              />

            </AnimatePresence>

          </div>


        </div>

      </div>

    </section>

  );

}
