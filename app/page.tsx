"use client";

import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";

const AboutSection = dynamic(() => import("@/components/AboutSection"), { ssr: false });
const ServicesHorizontalSection = dynamic(() => import("@/components/ServicesHorizontalSection"), { ssr: false });
const ProcessSection = dynamic(() => import("@/components/ProcessSection"), { ssr: false });
const BrandsSection = dynamic(() => import("@/components/BrandsSection"), { ssr: false });
const ContactSection = dynamic(() => import("@/components/ContactSection"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });
const Chatbot = dynamic(() => import("@/components/Chatbot"), { ssr: false });

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">

      {/* ── Fondo base ─────────────────────────────────────────────────────
          Light: gradiente suave lila/blanco
          Dark:  oscuro profundo
      ─────────────────────────────────────────────────────────────────── */}
      <div className="pointer-events-none fixed inset-0 -z-20
        bg-[#f3f0ff]
        dark:bg-jokia-darker"
      />

      {/* ── Grid decorativo (más visible en ambos modos) ────────────────── */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-40 dark:opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(rgba(124,58,237,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.10) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 78% 78% at 50% 42%, black 24%, transparent 100%)",
        }}
      />

      {/* ── Orbs de color — cubren TODA la altura del documento ─────────────
          Usamos position: absolute (no fixed) dentro de un contenedor
          absolute que abarca todo el documento, así los orbs se posicionan
          relativos al contenido total y no al viewport.
          Opacidades más altas en claro, moderadas en oscuro.
      ─────────────────────────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">

        {/* — HERO zona (0–20%) ————————————————— */}
        {/* Violeta top-left */}
        <div className="absolute" style={{
          top: "2%", left: "-8%",
          width: 600, height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(194,59,255,0.28) 0%, transparent 70%)",
          filter: "blur(80px)",
        }} />
        {/* Azul top-right */}
        <div className="absolute" style={{
          top: "0%", right: "-10%",
          width: 500, height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(120,80,255,0.22) 0%, transparent 70%)",
          filter: "blur(90px)",
        }} />

        {/* — ABOUT / SERVICES zona (20–45%) ——————————————— */}
        {/* Azul centro-izquierda */}
        <div className="absolute" style={{
          top: "22%", left: "-5%",
          width: 500, height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(58,154,255,0.20) 0%, transparent 70%)",
          filter: "blur(100px)",
        }} />
        {/* Violeta centro-derecha */}
        <div className="absolute" style={{
          top: "30%", right: "-8%",
          width: 550, height: 550,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(194,59,255,0.18) 0%, transparent 70%)",
          filter: "blur(100px)",
        }} />

        {/* — PROCESS / BRANDS zona (45–65%) ——————————————— */}
        {/* Violeta izquierda */}
        <div className="absolute" style={{
          top: "48%", left: "5%",
          width: 480, height: 480,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.20) 0%, transparent 70%)",
          filter: "blur(90px)",
        }} />
        {/* Azul derecha */}
        <div className="absolute" style={{
          top: "55%", right: "0%",
          width: 480, height: 480,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(58,154,255,0.16) 0%, transparent 70%)",
          filter: "blur(100px)",
        }} />

        {/* — CONTACT zona — removido para evitar gradiente detrás del formulario */}

        {/* — FOOTER zona (85–100%) ——————————————————————— */}
        {/* Violeta bottom-left */}
        <div className="absolute" style={{
          top: "88%", left: "5%",
          width: 440, height: 440,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)",
          filter: "blur(80px)",
        }} />
        {/* Azul bottom-right */}
        <div className="absolute" style={{
          top: "90%", right: "5%",
          width: 400, height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(58,154,255,0.14) 0%, transparent 70%)",
          filter: "blur(90px)",
        }} />

      </div>

      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesHorizontalSection />
      <BrandsSection />
      <ProcessSection />
      <ContactSection />
      <Footer />
      <Chatbot />
    </main>
  );
}
