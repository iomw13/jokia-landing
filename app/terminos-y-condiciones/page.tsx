import Navbar from "@/components/Navbar";
import TermsSection from "@/components/TermsSection";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

export default function TermsPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,#f4f1ff_0%,#e6e1ff_26%,#d2ccff_56%,#bfb6f3_100%)] dark:bg-[linear-gradient(180deg,#070a14_0%,#081a3a_48%,#1929e1_100%)]">
      <Navbar />
      <div className="pt-[160px] pb-20">
        <TermsSection />
      </div>
      <Footer />
      <Chatbot />
    </main>
  );
}
