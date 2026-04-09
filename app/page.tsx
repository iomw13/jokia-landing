"use client";

import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";

const StatsSection = dynamic(() => import("@/components/StatsSection"), { ssr: false });
const ProcessSection = dynamic(() => import("@/components/ProcessSection"), { ssr: false });
const ContactSection = dynamic(() => import("@/components/ContactSection"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });
const Chatbot = dynamic(() => import("@/components/Chatbot"), { ssr: false });

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">

      <Navbar />
      <HeroSection />
      <StatsSection />
      <ProcessSection />
      <ContactSection />
      <Footer />
      <Chatbot />
    </main>
  );
}
