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
    <main className="relative min-h-screen">
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
