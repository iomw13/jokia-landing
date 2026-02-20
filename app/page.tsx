"use client";

import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";

const AboutSection = dynamic(() => import("@/components/AboutSection"), {
  ssr: false,
});

const ServicesHorizontalSection = dynamic(
  () => import("@/components/ServicesHorizontalSection"),
  { ssr: false },
);

const ProcessSection = dynamic(() => import("@/components/ProcessSection"), {
  ssr: false,
});

const ResultsSection = dynamic(() => import("@/components/ResultsSection"), {
  ssr: false,
});

const BrandsSection = dynamic(() => import("@/components/BrandsSection"), {
  ssr: false,
});

const ContactSection = dynamic(() => import("@/components/ContactSection"), {
  ssr: false,
});

const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: false,
});

const Chatbot = dynamic(() => import("@/components/Chatbot"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-br from-white via-[#f5f3ff] to-white dark:from-jokia-darker dark:via-jokia-dark dark:to-jokia-darker" />
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-20 dark:opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(25, 41, 225, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(25, 41, 225, 0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 75% 75% at 50% 50%, black 20%, transparent 100%)",
        }}
      />
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-[#3A9AFF]/28 blur-[120px] dark:bg-[#3A9AFF]/32" />
        <div className="absolute -right-24 top-[70%] h-80 w-80 rounded-full bg-[#3A9AFF]/22 blur-[120px] dark:bg-[#3A9AFF]/28" />
        <div className="absolute left-1/2 top-[130%] h-80 w-80 -translate-x-1/2 rounded-full bg-[#3A9AFF]/22 blur-[120px] dark:bg-[#3A9AFF]/28" />
        <div className="absolute left-[12%] top-[95%] h-72 w-72 rounded-full bg-[#7C3AED]/22 blur-[120px] dark:bg-[#7C3AED]/32" />
        <div className="absolute right-[16%] top-[155%] h-72 w-72 rounded-full bg-[#7C3AED]/20 blur-[130px] dark:bg-[#7C3AED]/30" />
      </div>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesHorizontalSection />
      <ProcessSection />
      <ResultsSection />
      <BrandsSection />
      <ContactSection />
      <Footer />
      <Chatbot />
    </main>
  );
}
