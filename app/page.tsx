import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import ServicesHorizontalSection from "@/components/ServicesHorizontalSection";
import ProcessSection from "@/components/ProcessSection";
import ResultsSection from "@/components/ResultsSection";
import BrandsSection from "@/components/BrandsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ChatbotClient from "@/components/ChatbotClient";

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
      <ChatbotClient />
    </main>
  );
}
