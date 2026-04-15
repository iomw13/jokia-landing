"use client";

import { useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useI18n } from "./I18nProvider";

type Step = {
  number: string;
  title: string;
  tag: string;
  description: string;
  detail: string;
  image: string;
};

function getImageRadius(index: number, totalSteps: number, isReverse: boolean): string {
  const first = index === 0;
  const last = index === totalSteps - 1;

  if (isReverse) {
    // imagen a la derecha → redondear esquinas derechas exteriores
    const tl = "0px";
    const tr = first ? "16px" : "0px";
    const br = last  ? "16px" : "0px";
    const bl = "0px";
    return `${tl} ${tr} ${br} ${bl}`;
  } else {
    // imagen a la izquierda → redondear esquinas izquierdas exteriores
    const tl = first ? "16px" : "0px";
    const tr = "0px";
    const br = "0px";
    const bl = last  ? "16px" : "0px";
    return `${tl} ${tr} ${br} ${bl}`;
  }
}

function StepRow({ step, index, totalSteps }: { step: Step; index: number; totalSteps: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isReverse = index % 2 !== 0;
  const imgRadius = getImageRadius(index, totalSteps, isReverse);
  const badgeHoverClass =
    "group-hover:scale-110 group-hover:bg-black/35 group-hover:text-white group-hover:ring-2 group-hover:ring-white/30 group-hover:shadow-[0_0_0_1px_rgba(255,255,255,0.20),0_0_22px_rgba(255,255,255,0.22)]";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      className="grid grid-cols-1 md:grid-cols-2"
    >
      {/* Imagen */}
      <div
        className={`group relative overflow-hidden aspect-[4/3] bg-[#f0f2f5] dark:bg-[#1a1a1a] ${isReverse ? "md:order-2" : ""}`}
        style={{ borderRadius: imgRadius }}
      >
        <img
          src={step.image}
          alt={step.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
        />
        <div
          className={`absolute top-3.5 ${isReverse ? "right-3.5" : "left-3.5"} flex h-[34px] w-[34px] items-center justify-center rounded-full bg-black/50 text-[11px] font-medium tracking-widest text-white backdrop-blur-md transition-all duration-200 ${badgeHoverClass}`}
          style={{ direction: "ltr" }}
        >
          {step.number}
        </div>
      </div>

      {/* Contenido: sin borde, sin fondo */}
      <div
        className={`flex flex-col justify-center gap-3 px-0 py-10 ${isReverse ? "md:order-1 md:pl-0 md:pr-12" : "md:order-2 md:pl-12 md:pr-0"}`}
      >
        <div className="flex items-center gap-2.5">
          <span className="text-[12px] font-medium tracking-[.18em] text-[#7b5cff]">
            {step.number}
          </span>
          <span className="inline-block rounded-full border border-black/[0.09] dark:border-white/[0.09] px-2.5 py-0.5 text-[10px] font-medium tracking-[.12em] uppercase text-black/45 dark:text-white/40">
            {step.tag}
          </span>
        </div>

        <h3 className="text-[clamp(1.8rem,3vw,2.4rem)] font-medium leading-[1.05] tracking-[-0.025em] text-[#070707] dark:text-white m-0 dark:[text-shadow:0_0_14px_rgba(255,255,255,0.18),0_0_34px_rgba(255,255,255,0.10)]">
          {step.title}
        </h3>

        <p className="text-sm leading-[1.7] text-black/55 dark:text-white/55 m-0">
          {step.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-1">
          {step.detail.split(" · ").map((d) => (
            <span
              key={d}
              className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.07] dark:border-white/[0.07] bg-black/[0.03] dark:bg-white/[0.04] px-3 py-1 text-[11px] text-black/55 dark:text-white/50"
            >
              <span className="w-1 h-1 rounded-full bg-[#7b5cff]/50 flex-shrink-0" />
              {d}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProcessSection() {
  const { messages } = useI18n();
  const steps = useMemo<Step[]>(() => messages.process.steps.map((s) => ({ ...s })), [messages.process.steps]);

  return (
    <section id="proceso" className="pt-16 pb-24">
      <div className="mx-auto max-w-[1100px] px-6">
        {/* Header */}
        <div className="border-t border-black/[0.09] dark:border-white/[0.09] pt-8 mb-10">
          <span className="block text-[11px] font-medium tracking-[.22em] uppercase text-black/35 dark:text-white/35 mb-3">
            {messages.process.kicker}
          </span>
          <h2 className="text-[clamp(2.2rem,4vw,3.2rem)] font-medium leading-[0.98] tracking-[-0.03em] text-[#070707] dark:text-white m-0">
            {messages.process.title1}
            <span className="border-b-[2.5px] border-[#7b5cff]/45 pb-0.5">
              {messages.process.title2}
            </span>
          </h2>
        </div>

        {/* Steps: gap 0 para que las imágenes se toquen */}
        <div className="flex flex-col gap-0">
          {steps.map((step, i) => (
            <StepRow key={step.number} step={step} index={i} totalSteps={steps.length} />
          ))}
        </div>
      </div>
    </section>
  );
} 
