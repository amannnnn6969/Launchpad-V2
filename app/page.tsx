import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhoWeHelp from "@/components/WhoWeHelp";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import CtaBanner from "@/components/CtaBanner";
import { Footer } from "@/components/ui/footer-section";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <WhoWeHelp />
      <Services />
      <Portfolio />
      <Process />
      <Contact />
      <CtaBanner />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
